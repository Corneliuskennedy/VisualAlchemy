'use client';

import { useState, useEffect, useRef } from 'react';
// DISABLED: ThemeProvider - using hardcoded dark theme for now
// import { useTheme } from 'next-themes';

/**
 * SSR-safe theme hook that prevents hydration mismatches
 * Optimized to prevent unnecessary re-renders
 * 
 * DISABLED: ThemeProvider - currently hardcoded to dark theme
 * Will be re-enabled when light theme is added
 * 
 * This hook ensures that:
 * 1. Server-side render always uses dark theme (hardcoded)
 * 2. Client-side hydration matches server render initially
 * 3. Theme updates happen smoothly after hydration (disabled for now)
 * 4. Only re-renders when theme actually changes (disabled for now)
 * 
 * @returns {Object} Theme state with SSR-safe values
 */
export function useThemeSafe() {
  // DISABLED: ThemeProvider - hardcoded to dark theme
  const theme = 'dark';
  const systemTheme = 'dark';
  
  const mountedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const isDarkRef = useRef(true); // Always dark
  const previousThemeRef = useRef<string | undefined>(theme);
  const previousSystemThemeRef = useRef<string | undefined>(systemTheme);

  // Single effect: Set mounted once
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setMounted(true);
    }
    
    // DISABLED: Theme change detection - ThemeProvider is disabled
    // Theme is hardcoded to 'dark'
    // Calculate dark mode state
    // const shouldBeDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
    
    // Only update if theme actually changed
    // if (previousThemeRef.current !== theme || previousSystemThemeRef.current !== systemTheme) {
    //   isDarkRef.current = shouldBeDark;
    //   previousThemeRef.current = theme;
    //   previousSystemThemeRef.current = systemTheme;
    // }
  }, []); // Empty deps since theme is constant

  // Return stable values - always dark theme
  return {
    theme: 'dark', // Hardcoded to dark
    isDark: true, // Always dark
    mounted,
    systemTheme: 'dark', // Hardcoded to dark
  };
}



