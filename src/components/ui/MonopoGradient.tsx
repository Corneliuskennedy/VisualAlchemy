'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface MonopoGradientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  colorSize?: number;
  colorSpacing?: number;
  colorRotation?: number;
  displacement?: number;
  seed?: number;
  position?: [number, number];
  zoom?: number;
  spacing?: number;
  parallax?: boolean;
  className?: string;
}

/**
 * Premium Monopo-style Gradient
 * 
 * Creates a beautiful, expensive-looking gradient background.
 * Uses optimized canvas rendering for smooth, visible gradients.
 */
export function MonopoGradient({
  color1 = '#80f6ff',
  color2 = '#3b488c',
  color3 = '#884ef4',
  color4 = '#d73c3c',
  colorSize = 0.8,
  colorSpacing = 1.0,
  colorRotation = 0.5,
  displacement = 1.0,
  seed = 3915.38625,
  position = [0, 0],
  zoom = 1.0,
  spacing = 2.0,
  parallax = true,
  className = '',
}: MonopoGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [0, -50] : [0, 0]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    updateCanvasSize();

    // Parse colors
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const colors = [color1, color2, color3, color4].map(hexToRgb);

    // Smooth color interpolation
    const lerp = (a: number, b: number, t: number) => {
      const smoothT = t * t * (3 - 2 * t); // Smoothstep
      return a + (b - a) * smoothT;
    };
    
    // Get color from gradient (0-1 maps through all 4 colors)
    const getColor = (t: number) => {
      t = ((t % 1) + 1) % 1; // Normalize to 0-1
      
      // Map to 4-color gradient
      const segment = t * 4;
      const i = Math.floor(segment) % 4;
      const localT = segment - Math.floor(segment);
      
      const c1 = colors[i];
      const c2 = colors[(i + 1) % 4];
      
      return {
        r: Math.round(lerp(c1.r, c2.r, localT)),
        g: Math.round(lerp(c1.g, c2.g, localT)),
        b: Math.round(lerp(c1.b, c2.b, localT)),
      };
    };

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width === 0 || height === 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      
      time += 0.005; // Slow animation
      
      // Create image data
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Render with optimized algorithm
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Normalized coordinates centered at origin
          const nx = (x / width - 0.5) * 2;
          const ny = (y / height - 0.5) * 2;
          
          // Apply zoom
          const zx = nx / zoom;
          const zy = ny / zoom;
          
          // Apply rotation
          const cos = Math.cos(colorRotation);
          const sin = Math.sin(colorRotation);
          const rx = zx * cos - zy * sin;
          const ry = zx * sin + zy * cos;
          
          // Create beautiful wave pattern
          // Multiple frequencies for complex, organic look
          const wave1 = Math.sin(rx * spacing * 2 + time) * 0.5 + 0.5;
          const wave2 = Math.sin(ry * spacing * 1.5 + time * 0.7) * 0.5 + 0.5;
          const wave3 = Math.sin((rx + ry) * spacing + time * 1.2) * 0.5 + 0.5;
          
          // Combine waves with different weights for organic feel
          const pattern = wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25;
          
          // Add subtle noise for texture
          const noise = (Math.sin(rx * displacement * 8) + Math.cos(ry * displacement * 8)) * 0.05;
          
          // Final value for color lookup
          const finalT = Math.max(0, Math.min(1, pattern + noise));
          
          // Map to color gradient
          const color = getColor(finalT * colorSpacing);
          
          // Write pixel
          const index = (y * width + x) * 4;
          data[index] = color.r;
          data[index + 1] = color.g;
          data[index + 2] = color.b;
          data[index + 3] = 255;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
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
    displacement,
    seed,
    position,
    zoom,
    spacing,
  ]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{
        y: parallaxY,
        opacity,
        zIndex: 0,
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
