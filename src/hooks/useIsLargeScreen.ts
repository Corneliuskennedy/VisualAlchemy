import { useState, useEffect } from 'react';

/**
 * Hook to check if the viewport is a large screen (min-width: 1025px)
 */
export function useIsLargeScreen(): boolean {
  // Always start with false to ensure server/client consistency
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
