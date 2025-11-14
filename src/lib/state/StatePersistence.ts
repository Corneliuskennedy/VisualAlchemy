/**
 * State Persistence
 * 
 * Persists state to localStorage/IndexedDB
 * Provides undo/redo functionality
 * 
 * Technical Showcase:
 * - State persistence
 * - Undo/redo patterns
 * - History management
 */

'use client';

import { useState, useCallback, useRef } from 'react';

interface StateHistory<T> {
  past: T[];
  present: T;
  future: T[];
}

export class StatePersistence<T> {
  private history: StateHistory<T>;
  private maxHistorySize: number;
  private storageKey: string;
  private storage: Storage;

  constructor(
    initialState: T,
    storageKey: string,
    maxHistorySize: number = 50
  ) {
    this.maxHistorySize = maxHistorySize;
    this.storageKey = storageKey;
    this.storage = typeof window !== 'undefined' ? localStorage : ({} as Storage);

    // Load from storage or use initial state
    const saved = this.load();
    this.history = saved || {
      past: [],
      present: initialState,
      future: [],
    };
  }

  /**
   * Update state
   */
  setState(newState: T): void {
    // Add current state to history
    const newPast = [...this.history.past, this.history.present].slice(
      -this.maxHistorySize
    );

    this.history = {
      past: newPast,
      present: newState,
      future: [], // Clear future when new action is performed
    };

    this.save();
  }

  /**
   * Undo last action
   */
  undo(): T | null {
    if (this.history.past.length === 0) {
      return null;
    }

    const previous = this.history.past[this.history.past.length - 1];
    const newPast = this.history.past.slice(0, -1);

    this.history = {
      past: newPast,
      present: previous,
      future: [this.history.present, ...this.history.future],
    };

    this.save();
    return previous;
  }

  /**
   * Redo last undone action
   */
  redo(): T | null {
    if (this.history.future.length === 0) {
      return null;
    }

    const next = this.history.future[0];
    const newFuture = this.history.future.slice(1);

    this.history = {
      past: [...this.history.past, this.history.present],
      present: next,
      future: newFuture,
    };

    this.save();
    return next;
  }

  /**
   * Get current state
   */
  getState(): T {
    return this.history.present;
  }

  /**
   * Check if undo is possible
   */
  canUndo(): boolean {
    return this.history.past.length > 0;
  }

  /**
   * Check if redo is possible
   */
  canRedo(): boolean {
    return this.history.future.length > 0;
  }

  /**
   * Clear history
   */
  clear(): void {
    this.history = {
      past: [],
      present: this.history.present,
      future: [],
    };
    this.save();
  }

  /**
   * Save to storage
   */
  private save(): void {
    try {
      this.storage.setItem(
        this.storageKey,
        JSON.stringify({
          present: this.history.present,
          past: this.history.past.slice(-10), // Only save last 10 for storage efficiency
        })
      );
    } catch (error) {
      console.warn('[StatePersistence] Failed to save:', error);
    }
  }

  /**
   * Load from storage
   */
  private load(): StateHistory<T> | null {
    try {
      const saved = this.storage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          past: parsed.past || [],
          present: parsed.present,
          future: [],
        };
      }
    } catch (error) {
      console.warn('[StatePersistence] Failed to load:', error);
    }
    return null;
  }
}

/**
 * React hook for state persistence with undo/redo
 */
export function usePersistedState<T>(
  initialState: T,
  storageKey: string,
  maxHistorySize: number = 50
): [
  T,
  (newState: T) => void,
  {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    clear: () => void;
  }
] {
  const persistenceRef = useRef<StatePersistence<T> | null>(null);

  if (!persistenceRef.current) {
    persistenceRef.current = new StatePersistence(
      initialState,
      storageKey,
      maxHistorySize
    );
  }

  const persistence = persistenceRef.current;
  const [state, setState] = useState<T>(persistence.getState());

  const updateState = useCallback(
    (newState: T) => {
      persistence.setState(newState);
      setState(newState);
    },
    [persistence]
  );

  const undo = useCallback(() => {
    const previous = persistence.undo();
    if (previous !== null) {
      setState(previous);
    }
  }, [persistence]);

  const redo = useCallback(() => {
    const next = persistence.redo();
    if (next !== null) {
      setState(next);
    }
  }, [persistence]);

  return [
    state,
    updateState,
    {
      undo,
      redo,
      canUndo: persistence.canUndo(),
      canRedo: persistence.canRedo(),
      clear: () => {
        persistence.clear();
        setState(persistence.getState());
      },
    },
  ];
}

export default StatePersistence;

