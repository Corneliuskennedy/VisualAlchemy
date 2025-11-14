'use client';

import { useReducedMotion, type Variants } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Optimized animation variants hook
 * 
 * Provides performance-optimized animation variants that:
 * - Respect user's reduced motion preference
 * - Use optimal easing curves
 * - Minimize GPU work
 * - Ensure 60fps performance
 */

// Premium easing curve as cubic-bezier tuple
const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export function useOptimizedAnimations() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08, // More subtle: reduced from 0.12 to 0.08
        delayChildren: prefersReducedMotion ? 0 : 0.05, // More subtle: reduced from 0.08 to 0.05
      },
    },
  }), [prefersReducedMotion]);

  const itemVariants = useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 12, // More subtle: reduced from 25 to 12
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4, // Slightly faster: 0.4s instead of 0.5s
        ease: PREMIUM_EASE,
      },
    },
  }), [prefersReducedMotion]);

  const heroTitleVariants = useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20, // More subtle: reduced from 30 to 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6, // Slightly faster: 0.6s instead of 0.7s
        ease: PREMIUM_EASE,
      },
    },
  }), [prefersReducedMotion]);

  const cardVariants = useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 16, // More subtle: reduced from 30 to 16
      scale: prefersReducedMotion ? 1 : 0.98, // More subtle: reduced from 0.96 to 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4, // Slightly faster: 0.4s instead of 0.5s
        ease: PREMIUM_EASE,
      },
    },
    hover: prefersReducedMotion ? {} : {
      y: -4, // More subtle: reduced from -6 to -4
      scale: 1.01,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      },
    },
  }), [prefersReducedMotion]);

  const fadeInUp = useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 12, // More subtle: reduced from 25 to 12
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4, // Slightly faster: 0.4s instead of 0.5s
        ease: PREMIUM_EASE,
      },
    },
  }), [prefersReducedMotion]);

  return {
    containerVariants,
    itemVariants,
    heroTitleVariants,
    cardVariants,
    fadeInUp,
    prefersReducedMotion,
  };
}



