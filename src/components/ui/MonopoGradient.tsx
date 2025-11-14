'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface MonopoGradientProps {
  /**
   * Gradient colors (4 colors for smooth transitions)
   */
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  
  /**
   * Size of each color segment (0-1)
   */
  colorSize?: number;
  
  /**
   * Spacing between color segments (0-1)
   */
  colorSpacing?: number;
  
  /**
   * Rotation of the gradient (radians)
   */
  colorRotation?: number;
  
  /**
   * Spread of colors (blend amount)
   */
  colorSpread?: number;
  
  /**
   * Offset for gradient position (x, y)
   */
  colorOffset?: [number, number];
  
  /**
   * Displacement amount for noise/distortion
   */
  displacement?: number;
  
  /**
   * Seed for random generation (for consistency)
   */
  seed?: number;
  
  /**
   * Position offset (x, y)
   */
  position?: [number, number];
  
  /**
   * Zoom level
   */
  zoom?: number;
  
  /**
   * Spacing between gradient elements
   */
  spacing?: number;
  
  /**
   * Enable parallax scroll effect
   */
  parallax?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
}

/**
 * MonopoGradient Component
 * 
 * Creates a dynamic, procedural gradient background similar to Monopo's website.
 * Uses canvas rendering for smooth, animated gradients with multiple color stops.
 * 
 * Based on Monopo's <monopo-gradient> web component, adapted for React/Next.js.
 */
export interface MonopoGradientProps {
  /**
   * Gradient colors (4 colors for smooth transitions)
   */
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  
  /**
   * Size of each color segment (0-1)
   */
  colorSize?: number;
  
  /**
   * Spacing between color segments (0-1)
   */
  colorSpacing?: number;
  
  /**
   * Rotation of the gradient (radians)
   */
  colorRotation?: number;
  
  /**
   * Spread of colors (blend amount)
   */
  colorSpread?: number;
  
  /**
   * Offset for gradient position (x, y)
   */
  colorOffset?: [number, number];
  
  /**
   * Displacement amount for noise/distortion
   */
  displacement?: number;
  
  /**
   * Seed for random generation (for consistency)
   */
  seed?: number;
  
  /**
   * Position offset (x, y)
   */
  position?: [number, number];
  
  /**
   * Zoom level
   */
  zoom?: number;
  
  /**
   * Spacing between gradient elements
   */
  spacing?: number;
  
  /**
   * Enable parallax scroll effect
   */
  parallax?: boolean;
  
  /**
   * Additional className
   */
  className?: string;
}

export function MonopoGradient({
  color1 = '#80f6ff',
  color2 = '#3b488c',
  color3 = '#884ef4',
  color4 = '#d73c3c',
  colorSize = 0.8,
  colorSpacing = 0.33,
  colorRotation = 1.24840734641021,
  colorSpread = 10,
  colorOffset = [-0.973876953125, -0.755390625],
  displacement = 2.155714285714285,
  seed = 3915.38625,
  position = [-1.8283292510943407, 1.3235562192065857],
  zoom = 0.75,
  spacing = 4.24,
  parallax = true,
  className = '',
}: MonopoGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax transform based on scroll
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [0, -100] : [0, 0]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (high DPI for retina displays)
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Parse colors
    const colors = [color1, color2, color3, color4].map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    });

    // Simple random function with seed
    let seedValue = seed;
    const random = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    // Create gradient function
    const createGradient = (x: number, y: number, time: number) => {
      const width = rect.width;
      const height = rect.height;
      
      // Apply position offset
      const offsetX = (colorOffset[0] + position[0]) * width * zoom;
      const offsetY = (colorOffset[1] + position[1]) * height * zoom;
      
      // Normalize coordinates
      const nx = (x + offsetX) / (width * zoom * spacing);
      const ny = (y + offsetY) / (height * zoom * spacing);
      
      // Apply rotation
      const cos = Math.cos(colorRotation);
      const sin = Math.sin(colorRotation);
      const rx = nx * cos - ny * sin;
      const ry = nx * sin + ny * cos;
      
      // Add time-based animation
      const animatedX = rx + time * 0.001;
      const animatedY = ry + time * 0.0005;
      
      // Create smooth color transitions
      const t = (Math.sin(animatedX * colorSpacing) + 1) / 2;
      const t2 = (Math.sin(animatedY * colorSpacing) + 1) / 2;
      
      // Blend colors based on position
      const blend = (t: number) => {
        if (t < colorSize) {
          const localT = t / colorSize;
          return {
            r: colors[0].r + (colors[1].r - colors[0].r) * localT,
            g: colors[0].g + (colors[1].g - colors[0].g) * localT,
            b: colors[0].b + (colors[1].b - colors[0].b) * localT,
          };
        } else if (t < colorSize * 2) {
          const localT = (t - colorSize) / colorSize;
          return {
            r: colors[1].r + (colors[2].r - colors[1].r) * localT,
            g: colors[1].g + (colors[2].g - colors[1].g) * localT,
            b: colors[1].b + (colors[2].b - colors[1].b) * localT,
          };
        } else if (t < colorSize * 3) {
          const localT = (t - colorSize * 2) / colorSize;
          return {
            r: colors[2].r + (colors[3].r - colors[2].r) * localT,
            g: colors[2].g + (colors[3].g - colors[2].g) * localT,
            b: colors[2].b + (colors[3].b - colors[2].b) * localT,
          };
        } else {
          const localT = (t - colorSize * 3) / colorSize;
          return {
            r: colors[3].r + (colors[0].r - colors[3].r) * localT,
            g: colors[3].g + (colors[0].g - colors[3].g) * localT,
            b: colors[3].b + (colors[0].b - colors[3].b) * localT,
          };
        }
      };
      
      const color = blend((t + t2) / 2);
      
      // Apply displacement/noise
      const noise = (Math.sin(rx * displacement) + Math.cos(ry * displacement)) / 2;
      const finalT = Math.max(0, Math.min(1, (t + t2) / 2 + noise * 0.1));
      
      return blend(finalT);
    };

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      
      time += 16; // ~60fps
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Create image data for pixel manipulation
      const imageData = ctx.createImageData(rect.width, rect.height);
      const data = imageData.data;
      
      // Render gradient pixel by pixel
      for (let y = 0; y < rect.height; y++) {
        for (let x = 0; x < rect.width; x++) {
          const color = createGradient(x, y, time);
          const index = (y * rect.width + x) * 4;
          
          data[index] = color.r;     // R
          data[index + 1] = color.g;  // G
          data[index + 2] = color.b;  // B
          data[index + 3] = 255;      // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${newRect.width}px`;
      canvas.style.height = `${newRect.height}px`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    mounted,
    color1,
    color2,
    color3,
    color4,
    colorSize,
    colorSpacing,
    colorRotation,
    colorSpread,
    colorOffset,
    displacement,
    seed,
    position,
    zoom,
    spacing,
  ]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        y: parallaxY,
        opacity,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: 'normal',
        }}
      />
    </motion.div>
  );
}

