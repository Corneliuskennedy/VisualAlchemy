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
  grain?: boolean;
  className?: string;
}

/**
 * Premium Monopo-style Gradient with Grain Texture
 * 
 * Creates a beautiful, expensive-looking gradient with subtle grain texture.
 * Smooth, visible gradients that look premium and professional.
 */
export function MonopoGradient({
  color1 = '#0ea5e9',
  color2 = '#0284c7',
  color3 = '#0369a1',
  color4 = '#075985',
  colorSize = 0.8,
  colorSpacing = 1.5,
  colorRotation = 0.8,
  displacement = 0.5,
  seed = 3915.38625,
  position = [0, 0],
  zoom = 1.0,
  spacing = 1.8,
  parallax = true,
  grain = true,
  className = '',
}: MonopoGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
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

  // Generate grain texture
  useEffect(() => {
    if (!mounted || !grainCanvasRef.current || !grain) return;

    const canvas = grainCanvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const updateGrainSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    updateGrainSize();

    // Create grain texture
    const generateGrain = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Simple random function
      let seedValue = seed;
      const random = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return (seedValue / 233280) * 2 - 1; // -1 to 1
      };
      
      for (let i = 0; i < data.length; i += 4) {
        const value = random() * 30; // Grain intensity
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // Low opacity for subtle grain
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    generateGrain();

    const handleResize = () => {
      updateGrainSize();
      generateGrain();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, grain, seed]);

  // Main gradient rendering
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Smooth interpolation
    const lerp = (a: number, b: number, t: number) => {
      // Ease in-out for smoother transitions
      const smoothT = t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
      return a + (b - a) * smoothT;
    };
    
    // Get color from gradient position (0-1)
    const getColor = (t: number) => {
      t = ((t % 1) + 1) % 1; // Normalize to 0-1
      
      // Map through 4 colors
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
      
      time += 0.003; // Very slow, smooth animation
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Render gradient
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Normalized coordinates
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
          
          // Create beautiful, visible wave patterns
          // Multiple frequencies for rich, organic gradients
          const wave1 = Math.sin(rx * spacing * 1.5 + time) * 0.5 + 0.5;
          const wave2 = Math.sin(ry * spacing * 1.2 + time * 0.6) * 0.5 + 0.5;
          const wave3 = Math.sin((rx + ry) * spacing * 0.8 + time * 1.1) * 0.5 + 0.5;
          const wave4 = Math.sin((rx - ry) * spacing * 1.1 + time * 0.9) * 0.5 + 0.5;
          
          // Combine with weighted average for rich, visible gradients
          const pattern = wave1 * 0.3 + wave2 * 0.25 + wave3 * 0.25 + wave4 * 0.2;
          
          // Subtle displacement for texture
          const noise = (Math.sin(rx * displacement * 6) + Math.cos(ry * displacement * 6)) * 0.03;
          
          // Final value
          const finalT = Math.max(0, Math.min(1, pattern + noise));
          
          // Get color
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
      {/* Main gradient canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: 'normal',
        }}
      />
      
      {/* Grain texture overlay */}
      {grain && (
        <canvas
          ref={grainCanvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
