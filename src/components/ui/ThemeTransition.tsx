'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface ThemeTransitionProps {
  children: React.ReactNode;
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevThemeRef = useRef<string | undefined>(theme);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect theme changes and trigger smooth transition
  useEffect(() => {
    if (mounted && theme && prevThemeRef.current && prevThemeRef.current !== theme) {
      console.log('[ThemeTransition] Theme change detected', {
        from: prevThemeRef.current,
        to: theme,
        duration: prefersReducedMotion ? 150 : 400,
        timestamp: new Date().toISOString(),
      });
      setIsTransitioning(true);
      // Optimized duration for smooth 60fps transition
      const duration = prefersReducedMotion ? 150 : 400;
      const timer = setTimeout(() => {
        console.log('[ThemeTransition] Transition complete', {
          theme,
          timestamp: new Date().toISOString(),
        });
        setIsTransitioning(false);
      }, duration);
      return () => clearTimeout(timer);
    }
    prevThemeRef.current = theme;
  }, [theme, mounted, prefersReducedMotion]);

  // Don't render animations until mounted or if user prefers reduced motion
  if (!mounted || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Unified theme transition overlay - replaces navbar overlay */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="theme-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
            }}
            exit={{ 
              opacity: 0,
            }}
            transition={{ 
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1], // Optimized cubic-bezier for 60fps
            }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ 
              willChange: 'opacity',
              transform: 'translateZ(0)', // Force GPU acceleration
              background: theme === 'dark' 
                ? 'rgba(0, 0, 0, 0.15)' // Subtle overlay for dark theme
                : 'rgba(255, 255, 255, 0.15)', // Subtle overlay for light theme
              backdropFilter: 'blur(1px)', // Very subtle blur for polish
              WebkitBackdropFilter: 'blur(1px)', // Safari support
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Content wrapper with optimized opacity transition */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0.95 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1], // Optimized cubic-bezier for smooth 60fps
        }}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          willChange: isTransitioning ? 'opacity' : 'auto', // Optimize performance
          transform: isTransitioning ? 'translateZ(0)' : 'none', // Force GPU acceleration during transition
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

