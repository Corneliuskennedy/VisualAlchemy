'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

/**
 * SSR-safe theme hook that prevents hydration mismatches
 * 
 * This hook ensures that:
 * 1. Server-side render always uses light theme (default)
 * 2. Client-side hydration matches server render initially
 * 3. Theme updates happen smoothly after hydration
 * 
 * @returns {Object} Theme state with SSR-safe values
 */
export function useThemeSafe() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Set mounted state after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update theme state after mount
  useEffect(() => {
    if (mounted) {
      const shouldBeDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
      setIsDark(shouldBeDark);
    }
  }, [theme, systemTheme, mounted]);

  return {
    theme: mounted ? (theme || 'light') : 'light', // Default to light for SSR
    isDark: mounted ? isDark : false, // Default to false for SSR
    mounted,
    systemTheme: mounted ? systemTheme : undefined,
  };
}



