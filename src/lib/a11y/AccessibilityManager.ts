/**
 * Accessibility Manager
 * Manages accessibility preferences and applies them globally
 */

export interface AccessibilityPreferences {
  fontSize: 'smaller' | 'normal' | 'larger';
  highContrast: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
};

const STORAGE_KEY = 'octomatic-accessibility-preferences';

export class AccessibilityManager {
  private preferences: AccessibilityPreferences;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.preferences = this.loadPreferences();
    this.applyPreferences();
  }

  /**
   * Load preferences from localStorage
   */
  private loadPreferences(): AccessibilityPreferences {
    if (typeof window === 'undefined') {
      return DEFAULT_PREFERENCES;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('[AccessibilityManager] Failed to load preferences:', error);
    }

    return DEFAULT_PREFERENCES;
  }

  /**
   * Save preferences to localStorage
   */
  private savePreferences(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferences));
    } catch (error) {
      console.warn('[AccessibilityManager] Failed to save preferences:', error);
    }
  }

  /**
   * Apply preferences to the document
   */
  applyPreferences(): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Remove all accessibility classes
    root.classList.remove(
      'a11y-font-smaller',
      'a11y-font-normal',
      'a11y-font-larger',
      'a11y-high-contrast',
      'a11y-reduced-motion',
      'a11y-focus-indicators'
    );

    // Apply font size
    root.classList.add(`a11y-font-${this.preferences.fontSize}`);

    // Apply high contrast
    if (this.preferences.highContrast) {
      root.classList.add('a11y-high-contrast');
    }

    // Apply reduced motion
    if (this.preferences.reducedMotion) {
      root.classList.add('a11y-reduced-motion');
    }

    // Apply focus indicators
    if (this.preferences.focusIndicators) {
      root.classList.add('a11y-focus-indicators');
    } else {
      // Remove focus indicators if disabled
      root.classList.remove('a11y-focus-indicators');
    }

    // Notify listeners
    this.notifyListeners();
  }

  /**
   * Get current preferences
   */
  getPreferences(): AccessibilityPreferences {
    return { ...this.preferences };
  }

  /**
   * Update preferences
   */
  updatePreferences(updates: Partial<AccessibilityPreferences>): void {
    this.preferences = { ...this.preferences, ...updates };
    this.savePreferences();
    this.applyPreferences();
  }

  /**
   * Reset to default preferences
   */
  reset(): void {
    this.preferences = { ...DEFAULT_PREFERENCES };
    this.savePreferences();
    this.applyPreferences();
  }

  /**
   * Subscribe to preference changes
   */
  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }
}

// Singleton instance
let managerInstance: AccessibilityManager | null = null;

export function getAccessibilityManager(): AccessibilityManager {
  if (!managerInstance) {
    managerInstance = new AccessibilityManager();
  }
  return managerInstance;
}


