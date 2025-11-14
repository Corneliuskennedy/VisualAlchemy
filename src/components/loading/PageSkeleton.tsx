/**
 * Page Skeleton Loader
 * 
 * Smooth, cohesive loading state for initial page load
 * Prevents layout shifts and provides visual continuity
 * 
 * Technical Showcase:
 * - Progressive loading
 * - Layout shift prevention
 * - Smooth transitions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen relative font-archivo bg-background">
      {/* Background Grid Skeleton */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-5" />

      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 w-full">
          {/* Title Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-4xl mx-auto" />
            <div className="h-6 md:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-3xl mx-auto" />
          </motion.div>

          {/* Subtitle Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="h-5 md:h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-2xl mx-auto" />
            <div className="h-5 md:h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-xl mx-auto" />
          </motion.div>

          {/* CTA Button Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="h-12 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="h-12 md:h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-2xl mx-auto" />
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse max-w-xl mx-auto" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                className="h-64 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageSkeleton;

