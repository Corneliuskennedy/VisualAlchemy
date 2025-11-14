/**
 * Optimistic UI Updates
 * 
 * Provides optimistic update functionality for better UX
 * Updates UI immediately, then syncs with server
 * 
 * Technical Showcase:
 * - Optimistic UI patterns
 * - Error handling and rollback
 * - State synchronization
 */

'use client';

import { useState, useCallback, useRef } from 'react';

interface OptimisticUpdate<T> {
  id: string;
  optimisticData: T;
  rollback: () => void;
  timestamp: number;
}

export class OptimisticUpdateManager<T> {
  private updates = new Map<string, OptimisticUpdate<T>>();
  private listeners = new Set<() => void>();

  /**
   * Register an optimistic update
   */
  register(
    id: string,
    optimisticData: T,
    rollback: () => void
  ): void {
    this.updates.set(id, {
      id,
      optimisticData,
      rollback,
      timestamp: Date.now(),
    });

    this.notifyListeners();
  }

  /**
   * Confirm an update (remove from optimistic state)
   */
  confirm(id: string): void {
    this.updates.delete(id);
    this.notifyListeners();
  }

  /**
   * Rollback an update
   */
  rollback(id: string): void {
    const update = this.updates.get(id);
    if (update) {
      update.rollback();
      this.updates.delete(id);
      this.notifyListeners();
    }
  }

  /**
   * Rollback all updates
   */
  rollbackAll(): void {
    this.updates.forEach((update) => update.rollback());
    this.updates.clear();
    this.notifyListeners();
  }

  /**
   * Get all pending updates
   */
  getPendingUpdates(): OptimisticUpdate<T>[] {
    return Array.from(this.updates.values());
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

/**
 * React hook for optimistic updates
 */
export function useOptimisticUpdate<T>(
  initialData: T,
  updateFn: (data: T) => Promise<T>
): [T, (optimisticData: T) => Promise<void>, boolean] {
  const [data, setData] = useState<T>(initialData);
  const [isUpdating, setIsUpdating] = useState(false);
  const rollbackRef = useRef<T | null>(null);

  const update = useCallback(
    async (optimisticData: T) => {
      // Store current data for rollback
      rollbackRef.current = data;

      // Optimistically update UI
      setData(optimisticData);
      setIsUpdating(true);

      try {
        // Perform actual update
        const result = await updateFn(optimisticData);
        setData(result);
      } catch (error) {
        // Rollback on error
        if (rollbackRef.current !== null) {
          setData(rollbackRef.current);
        }
        throw error;
      } finally {
        setIsUpdating(false);
        rollbackRef.current = null;
      }
    },
    [data, updateFn]
  );

  return [data, update, isUpdating];
}

export default OptimisticUpdateManager;

