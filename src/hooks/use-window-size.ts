import { useState, useEffect, useCallback } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200); // 200ms debounce
    };
  }, []);

  useEffect(() => {
    const resizeListener = handleResize();
    window.addEventListener('resize', resizeListener, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [handleResize]);

  return windowSize;
} 