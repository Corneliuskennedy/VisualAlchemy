import { useState, useEffect } from 'react';

/**
 * Hook to check if the viewport is a large screen (min-width: 1025px)
 */
export function useIsLargeScreen(): boolean {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1025px)').matches : false
  );

  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    
    // Set initial value
    setIsLargeScreen(mediaQuery.matches);

    // Create event listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isLargeScreen;
}
