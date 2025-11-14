/**
 * Smooth Load Hook
 * 
 * Manages smooth loading states with progressive enhancement
 * Prevents layout shifts and provides cohesive loading experience
 * 
 * Technical Showcase:
 * - Progressive loading
 * - Layout shift prevention
 * - Smooth state management
 */

'use client';

import { useState, useEffect, useRef } from 'react';

interface UseSmoothLoadOptions {
  minLoadTime?: number;
  dependencies?: any[];
  onLoadComplete?: () => void;
}

export function useSmoothLoad(options: UseSmoothLoadOptions = {}) {
  const { minLoadTime = 400, dependencies = [], onLoadComplete } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const startTimeRef = useRef(Date.now());
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    startTimeRef.current = Date.now();

    // Check if all dependencies are ready
    const checkReady = () => {
      if (!mountedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        if (mountedRef.current) {
          setIsLoading(false);
          setTimeout(() => {
            if (mountedRef.current) {
              setIsReady(true);
              onLoadComplete?.();
            }
          }, 100); // Small delay for smooth transition
        }
      }, remaining);
    };

    // If no dependencies, just wait for min load time
    if (dependencies.length === 0) {
      checkReady();
    } else {
      // Wait for dependencies to be ready
      const allReady = dependencies.every((dep) => dep !== undefined && dep !== null);
      if (allReady) {
        checkReady();
      }
    }

    return () => {
      mountedRef.current = false;
    };
  }, [minLoadTime, onLoadComplete, ...dependencies]);

  return {
    isLoading,
    isReady,
    progress: isLoading ? Math.min(100, ((Date.now() - startTimeRef.current) / minLoadTime) * 100) : 100,
  };
}

export default useSmoothLoad;

