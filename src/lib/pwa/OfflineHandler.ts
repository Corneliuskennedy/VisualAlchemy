/**
 * Offline Handler
 * 
 * Manages offline functionality and sync
 * Handles background sync for form submissions
 * 
 * Technical Showcase:
 * - Background Sync API
 * - IndexedDB for offline storage
 * - Service Worker integration
 * - Offline-first architecture
 */

'use client';

interface OfflineFormSubmission {
  id: string;
  formData: Record<string, any>;
  timestamp: number;
  url: string;
  retries: number;
}

const DB_NAME = 'octomatic-offline';
const DB_VERSION = 1;
const STORE_NAME = 'form-submissions';

class OfflineHandler {
  private db: IDBDatabase | null = null;
  private isOnline: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      this.initDB();
      this.setupListeners();
    }
  }

  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[OfflineHandler] Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('retries', 'retries', { unique: false });
        }
      };
    });
  }

  private setupListeners(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingSubmissions();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Register background sync if available
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // Background sync will be triggered by service worker
      });
    }
  }

  /**
   * Store form submission for offline sync
   */
  async storeFormSubmission(formData: Record<string, any>, url: string): Promise<string> {
    if (!this.db) {
      await this.initDB();
    }

    const submission: OfflineFormSubmission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      formData,
      timestamp: Date.now(),
      url,
      retries: 0,
    };

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(submission);

      request.onsuccess = () => {
        // Try to sync immediately if online
        if (this.isOnline) {
          this.syncSubmission(submission.id).catch(() => {
            // Will retry later
          });
        }
        resolve(submission.id);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Sync a single submission
   */
  private async syncSubmission(id: string): Promise<boolean> {
    if (!this.db) return false;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = async () => {
        const submission = request.result as OfflineFormSubmission;
        if (!submission) {
          resolve(true); // Already synced
          return;
        }

        try {
          // Attempt to submit form
          const response = await fetch(submission.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission.formData),
          });

          if (response.ok) {
            // Remove from storage
            const deleteRequest = store.delete(id);
            deleteRequest.onsuccess = () => {
              resolve(true);
            };
            deleteRequest.onerror = () => {
              reject(deleteRequest.error);
            };
          } else {
            // Increment retries
            submission.retries += 1;
            if (submission.retries < 3) {
              const updateRequest = store.put(submission);
              updateRequest.onsuccess = () => resolve(false);
              updateRequest.onerror = () => reject(updateRequest.error);
            } else {
              // Max retries reached, keep for manual review
              resolve(false);
            }
          }
        } catch (error) {
          // Network error, will retry later
          submission.retries += 1;
          if (submission.retries < 3) {
            const updateRequest = store.put(submission);
            updateRequest.onsuccess = () => resolve(false);
            updateRequest.onerror = () => reject(updateRequest.error);
          } else {
            resolve(false);
          }
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Sync all pending submissions
   */
  async syncPendingSubmissions(): Promise<void> {
    if (!this.db || !this.isOnline) return;

    const transaction = this.db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = async () => {
      const submissions = request.result as OfflineFormSubmission[];
      
      for (const submission of submissions) {
        try {
          await this.syncSubmission(submission.id);
        } catch (error) {
          console.error('[OfflineHandler] Failed to sync submission:', error);
        }
      }
    };
  }

  /**
   * Get pending submissions count
   */
  async getPendingCount(): Promise<number> {
    if (!this.db) return 0;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        resolve(0);
      };
    });
  }

  /**
   * Check if online
   */
  getOnlineStatus(): boolean {
    return this.isOnline;
  }
}

// Singleton instance
let offlineHandlerInstance: OfflineHandler | null = null;

export const getOfflineHandler = (): OfflineHandler => {
  if (!offlineHandlerInstance) {
    offlineHandlerInstance = new OfflineHandler();
  }
  return offlineHandlerInstance;
};

export default getOfflineHandler;

