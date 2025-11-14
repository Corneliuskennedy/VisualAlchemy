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
 * Creates a beautiful, premium gradient background similar to Monopo's website.
 * Uses canvas rendering for smooth, animated gradients with multiple color stops.
 * 
 * Premium, expensive-looking gradient that fills the viewport beautifully.
 */
export function MonopoGradient({
  color1 = '#80f6ff',
  color2 = '#3b488c',
  color3 = '#884ef4',
  color4 = '#d73c3c',
  colorSize = 0.8,
  colorSpacing = 0.5,
  colorRotation = 1.2,
  displacement = 1.5,
  seed = 3915.38625,
  position = [0, 0],
  zoom = 1.0,
  spacing = 3.0,
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

    // Set canvas size (high DPI for retina displays)
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    updateCanvasSize();

    // Parse colors to RGB
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const colors = [color1, color2, color3, color4].map(hexToRgb);

    // Interpolate between two colors
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    
    // Smooth interpolation function
    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    
    // Get color at position (0-1)
    const getColor = (t: number) => {
      // Normalize t to 0-1 range
      t = ((t % 1) + 1) % 1;
      
      // Map to 4-color cycle
      const segment = t * 4;
      const segmentIndex = Math.floor(segment);
      const localT = smoothstep(segment - segmentIndex);
      
      const c1 = colors[segmentIndex % 4];
      const c2 = colors[(segmentIndex + 1) % 4];
      
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
      
      time += 0.01; // Slow, smooth animation
      
      // Clear with a subtle base color
      ctx.fillStyle = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;
      ctx.fillRect(0, 0, width, height);
      
      // Create image data for pixel manipulation
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Center point for radial-like effect
      const centerX = width / 2 + position[0] * width;
      const centerY = height / 2 + position[1] * height;
      
      // Render gradient pixel by pixel
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x / width) * 2 - 1;
          const ny = (y / height) * 2 - 1;
          
          // Apply zoom
          const zx = nx / zoom;
          const zy = ny / zoom;
          
          // Apply rotation
          const cos = Math.cos(colorRotation);
          const sin = Math.sin(colorRotation);
          const rx = zx * cos - zy * sin;
          const ry = zx * sin + zy * cos;
          
          // Distance from center (for radial effect)
          const dist = Math.sqrt(rx * rx + ry * ry);
          
          // Create wave pattern with multiple frequencies
          const wave1 = Math.sin(rx * spacing + time) * 0.5 + 0.5;
          const wave2 = Math.sin(ry * spacing * 0.7 + time * 0.8) * 0.5 + 0.5;
          const wave3 = Math.sin(dist * spacing * 2 + time * 1.2) * 0.5 + 0.5;
          
          // Combine waves for complex pattern
          const pattern = (wave1 + wave2 + wave3) / 3;
          
          // Add displacement/noise for texture
          const noise = (Math.sin(rx * displacement * 10) + Math.cos(ry * displacement * 10)) * 0.1;
          const finalT = Math.max(0, Math.min(1, pattern + noise));
          
          // Get color
          const color = getColor(finalT * colorSpacing);
          
          // Write to image data
          const index = (y * width + x) * 4;
          data[index] = color.r;     // R
          data[index + 1] = color.g; // G
          data[index + 2] = color.b; // B
          data[index + 3] = 255;     // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      rafId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
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
