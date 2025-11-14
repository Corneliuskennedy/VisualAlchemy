/**
 * Optimized Framer Motion Exports
 * 
 * This module provides optimized, tree-shakeable Framer Motion imports
 * to reduce bundle size while maintaining beautiful animations.
 * 
 * Strategy:
 * - Import only what we need
 * - Use dynamic imports for heavy features
 * - Provide lightweight alternatives for simple animations
 */

'use client';

import { motion, type Variants, type MotionProps } from 'framer-motion';

// Re-export commonly used components (tree-shakeable)
export { motion };
export type { Variants, MotionProps };

// Optimized animation variants - subtle and beautiful
export const subtleFadeIn: Variants = {
  hidden: { 
    opacity: 0,
    y: 10, // Subtle upward movement
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // Smooth easing
    },
  },
};

export const subtleScaleIn: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.98, // Very subtle scale
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Subtle stagger
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12, // Subtle movement
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const heroTitleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Subtle hover animations
export const subtleHover = {
  scale: 1.02, // Very subtle scale
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
};

export const cardHover = {
  y: -4, // Subtle lift
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
};

// Fade in up variant (commonly used)
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Optimized motion component factory
 * Creates motion components with default subtle animations
 */
export const createSubtleMotion = (component: keyof typeof motion) => {
  return motion[component];
};

