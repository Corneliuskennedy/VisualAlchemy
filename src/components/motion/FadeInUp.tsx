'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: boolean;
}

/**
 * FadeInUp - Scrollytelling Motion Component
 * 
 * Reveals elements by fading them in and sliding them up smoothly.
 * Uses useInView to trigger animation when element scrolls into viewport.
 * Supports staggered animations for children.
 */
export function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  stagger = false 
}: FadeInUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px',
    amount: 0.2 
  });

  const variants: any = {
    hidden: { 
      opacity: 0, 
      y: 20, // More subtle: reduced from 40 to 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration || 0.4, // Default to 0.4s (was 0.6s)
        delay,
        ease: [0.4, 0, 0.2, 1] // Smooth easing
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // More subtle: reduced from 0.15 to 0.08
        delayChildren: delay
      }
    }
  };

  if (stagger && Array.isArray(children)) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {children.map((child, index) => (
          <motion.div key={index} variants={variants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

