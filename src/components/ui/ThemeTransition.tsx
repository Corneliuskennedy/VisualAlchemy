'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
// DISABLED: ThemeProvider - using hardcoded dark theme for now
// import { useTheme } from 'next-themes';

interface ThemeTransitionProps {
  children: React.ReactNode;
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  // DISABLED: ThemeProvider - hardcoded to dark theme
  const theme = 'dark';
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevThemeRef = useRef<string | undefined>(theme);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // DISABLED: Theme change detection - ThemeProvider is disabled
  // Theme is hardcoded to 'dark' for now
  // useEffect(() => {
  //   if (mounted && theme && prevThemeRef.current && prevThemeRef.current !== theme) {
  //     console.log('[ThemeTransition] Theme change detected', {
  //       from: prevThemeRef.current,
  //       to: theme,
  //       duration: prefersReducedMotion ? 150 : 400,
  //       timestamp: new Date().toISOString(),
  //     });
  //     setIsTransitioning(true);
  //     // Optimized duration for smooth 60fps transition
  //     const duration = prefersReducedMotion ? 150 : 400;
  //     const timer = setTimeout(() => {
  //       console.log('[ThemeTransition] Transition complete', {
  //         theme,
  //         timestamp: new Date().toISOString(),
  //       });
  //       setIsTransitioning(false);
  //     }, duration);
  //     return () => clearTimeout(timer);
  //   }
  //   prevThemeRef.current = theme;
  // }, [theme, mounted, prefersReducedMotion]);

  // CRITICAL CLS FIX: Don't render animations until mounted or if user prefers reduced motion
  // Also disable overlay transitions that cause flashing
  if (!mounted || prefersReducedMotion) {
    return <>{children}</>;
  }

  // CRITICAL CLS FIX: Disable opacity transitions that cause flashing
  // Theme changes should be instant, not animated
  return (
    <>
      {/* REMOVED: Theme transition overlay - causes flashing and CLS */}
      {/* Content wrapper - no opacity animation to prevent CLS */}
      <div
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          /* Removed will-change and transform - causes layout shifts */
        }}
      >
        {children}
      </div>
    </>
  );
}

