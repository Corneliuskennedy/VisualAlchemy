'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, ReactNode } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  children?: ReactNode;
  fill?: boolean;
}

/**
 * ParallaxImage - Scroll-Linked Parallax Component
 * 
 * Creates an elegant parallax effect where the image moves more slowly
 * than the page scroll, creating depth and visual interest.
 * The image is slightly taller than its container and transforms based on scroll progress.
 */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  priority = false,
  children,
  fill = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform the image's y position based on scroll progress
  // Negative values move the image up (creating parallax effect)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{ y }}
        className="will-change-transform"
      >
        {fill || (!width || !height) ? (
          <div className={`relative ${className}`} style={width && height ? { width, height } : { aspectRatio: '16/9' }}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority={priority}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

