/**
 * Floating Particles Component
 * Creates animated floating particles for visual interest
 * Adds emotional depth and movement to backgrounds
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  color?: string;
  isDark?: boolean;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 15,
  className = '',
  color = '#4585f4',
  isDark = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    // Generate particles with random positions
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 5,
      opacity: isDark ? Math.random() * 0.3 + 0.1 : Math.random() * 0.2 + 0.05,
    }));

    setParticles(newParticles);
  }, [count, isDark]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => {
        const randomX = Math.random() * 20 - 10;
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            }}
            animate={{
              y: [0, -30, -60, -30, 0],
              x: [0, randomX, randomX * 0.5, randomX, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 1.8, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.1, 1.3, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;

