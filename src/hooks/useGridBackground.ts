import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsLargeScreen } from './useIsLargeScreen.js';

export function useGridBackground() {
  const [GridBackground, setGridBackground] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLargeScreen = useIsLargeScreen();

  useEffect(() => {
    let mounted = true;
    
    const loadGridBackground = useCallback(async () => {
      if (!isLargeScreen) {
        setGridBackground(null);
        return;
      }

      try {
        setIsLoading(true);
        const mod = await import("../components/ui/GridBackground");
        if (mounted) {
          setGridBackground(() => mod.default);
        }
      } catch (err) {
        console.error("Error loading GridBackground:", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }, [isLargeScreen]);

    loadGridBackground();

    return () => {
      mounted = false;
    };
  }, [isLargeScreen]);

  return { GridBackground, isLoading, isLargeScreen };
} 