/**
 * Hero Visual Elements
 * Subtle floating UI elements that tell a story without words
 * Suggests quality, craftsmanship, and technical excellence
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Zap, Layers, CheckCircle2 } from 'lucide-react';

interface FloatingElement {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export const HeroVisualElements: React.FC = () => {
  const elements: FloatingElement[] = [
    { id: 1, icon: Code, x: 10, y: 20, delay: 0, duration: 6, size: 24 },
    { id: 2, icon: Sparkles, x: 85, y: 15, delay: 1, duration: 7, size: 20 },
    { id: 3, icon: Zap, x: 15, y: 75, delay: 2, duration: 5, size: 22 },
    { id: 4, icon: Layers, x: 80, y: 70, delay: 1.5, duration: 6.5, size: 18 },
    { id: 5, icon: CheckCircle2, x: 50, y: 10, delay: 0.5, duration: 7.5, size: 16 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.08, 0.05, 0.08, 0],
              scale: [0, 1, 1.02, 1, 0],
              y: [0, -15, -30, -45, -60],
              rotate: [0, 2, -2, 3, 0],
            }}
            transition={{
              duration: element.duration * 2,
              delay: element.delay,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div
              className="text-[#4585f4]/8 dark:text-[#6B8AE6]/10"
              style={{
                width: `${element.size}px`,
                height: `${element.size}px`,
                filter: 'blur(1px)',
              }}
            >
              <Icon className="w-full h-full" />
            </div>
          </motion.div>
        );
      })}
      
      {/* Ultra-subtle code-like lines - Barely visible elegance */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#4585f4]/4 to-transparent dark:via-[#6B8AE6]/5"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: [0, 0.15, 0],
          scaleX: [0, 1, 1.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-[#4585f4]/4 to-transparent dark:via-[#6B8AE6]/5"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: [0, 0.15, 0],
          scaleX: [0, 1, 1.05],
        }}
        transition={{
          duration: 15,
          delay: 4,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
};

export default HeroVisualElements;

