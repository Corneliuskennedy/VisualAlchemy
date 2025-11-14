/**
 * Smooth Loader Component
 * 
 * Provides smooth transitions between loading and loaded states
 * Prevents jarring content shifts
 * 
 * Technical Showcase:
 * - Smooth state transitions
 * - Layout shift prevention
 * - Progressive enhancement
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageSkeleton } from './PageSkeleton';

interface SmoothLoaderProps {
  children: React.ReactNode;
  isLoading?: boolean;
  minLoadTime?: number; // Minimum time to show loader (prevents flash)
  className?: string;
}

export const SmoothLoader: React.FC<SmoothLoaderProps> = ({
  children,
  isLoading: externalIsLoading,
  minLoadTime = 300,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Use external loading state if provided
    if (externalIsLoading !== undefined) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      const timer = setTimeout(() => {
        setIsLoading(externalIsLoading);
      }, remaining);

      return () => clearTimeout(timer);
    } else {
      // Auto-hide after minimum load time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadTime);

      return () => clearTimeout(timer);
    }
  }, [externalIsLoading, minLoadTime, startTime]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50"
          >
            <PageSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmoothLoader;

