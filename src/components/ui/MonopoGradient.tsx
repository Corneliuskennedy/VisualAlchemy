'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

export interface MonopoGradientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  colorSize?: number;
  colorSpacing?: number;
  colorRotation?: number;
  colorSpread?: number; // NEW: Controls color blending/spreading (Monopo: 10)
  colorOffset?: [number, number]; // NEW: Offsets color pattern origin (Monopo: [-0.97, -0.76])
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
 * Premium Monopo-style Gradient with Edge Blending
 * 
 * Creates a beautiful, expensive-looking gradient that fades to background color at edges.
 * This creates a "floating" effect - the gradient appears contained and intentional.
 * 
 * Key Features:
 * - Edge blending: Fades to background color (dark/light mode aware)
 * - Grain texture: Subtle grain overlay for premium feel
 * - Smooth gradients: Multiple wave frequencies for organic patterns
 * - Monopo-inspired: Based on actual Monopo parameters
 */
export function MonopoGradient({
  color1 = '#80f6ff',
  color2 = '#3b488c',
  color3 = '#884ef4',
  color4 = '#d73c3c',
  colorSize = 0.8,
  colorSpacing = 0.33, // Monopo's tight spacing
  colorRotation = 1.24840734641021, // Monopo's rotation
  colorSpread = 10, // Monopo's color spread for blending
  colorOffset = [-0.973876953125, -0.755390625], // Monopo's color offset
  displacement = 3.5585714285714367, // Monopo's displacement (updated to match)
  seed = 3915.38625,
  position = [-1.8283292510943407, 1.3235562192065857],
  zoom = 0.75, // Monopo's zoom
  spacing = 4.24, // Monopo's spacing
  parallax = true,
  grain = true,
  className = '',
}: MonopoGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [0, -50] : [0, 0]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Detect background color (dark/light mode)
  const isDark = resolvedTheme === 'dark' || theme === 'dark';
  const bgColor = isDark 
    ? { r: 4, g: 4, b: 4 } // #040404 - dark mode background
    : { r: 255, g: 255, b: 255 }; // #FFFFFF - light mode background

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

    const generateGrain = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Seeded random for consistency
      let seedValue = seed;
      const random = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return (seedValue / 233280) * 2 - 1;
      };
      
      // Generate grain - more intense for premium look
      for (let i = 0; i < data.length; i += 4) {
        const value = random() * 40; // Higher intensity
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 20; // Slightly more visible
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

  // Main gradient rendering with edge blending
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

    // Smooth interpolation with ease-in-out
    const lerp = (a: number, b: number, t: number) => {
      const smoothT = t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
      return a + (b - a) * smoothT;
    };
    
    // Get color from gradient position (0-1) with colorSpread for blending
    const getColor = (t: number) => {
      t = ((t % 1) + 1) % 1; // Normalize to 0-1
      
      // Apply colorSpread: wider blending area for smoother transitions
      // Higher spread = more color mixing, smoother gradients
      const spreadFactor = colorSpread / 10; // Normalize spread (Monopo uses 10)
      const adjustedT = t * (1 + spreadFactor * 0.5); // Extend range for blending
      
      // Map through 4 colors with Monopo's tight spacing
      const segment = adjustedT * 4;
      const i = Math.floor(segment) % 4;
      const localT = segment - Math.floor(segment);
      
      // Smoothstep for smoother color transitions
      const smoothT = localT < 0.5 
        ? 2 * localT * localT 
        : 1 - Math.pow(-2 * localT + 2, 2) / 2;
      
      const c1 = colors[i];
      const c2 = colors[(i + 1) % 4];
      
      // Blend with adjacent colors for smoother transitions (colorSpread effect)
      const c0 = colors[(i - 1 + 4) % 4];
      const c3 = colors[(i + 2) % 4];
      
      // Multi-color blending for smoother gradients
      let blendedColor;
      if (localT < 0.3 && i > 0) {
        // Blend with previous color
        const blendT = localT / 0.3;
        blendedColor = {
          r: lerp(c0.r, c1.r, blendT),
          g: lerp(c0.g, c1.g, blendT),
          b: lerp(c0.b, c1.b, blendT),
        };
      } else if (localT > 0.7 && i < 3) {
        // Blend with next color
        const blendT = (localT - 0.7) / 0.3;
        blendedColor = {
          r: lerp(c1.r, c2.r, blendT),
          g: lerp(c1.g, c2.g, blendT),
          b: lerp(c1.b, c2.b, blendT),
        };
      } else {
        // Standard interpolation
        blendedColor = {
          r: lerp(c1.r, c2.r, smoothT),
          g: lerp(c1.g, c2.g, smoothT),
          b: lerp(c1.b, c2.b, smoothT),
        };
      }
      
      return {
        r: Math.round(blendedColor.r),
        g: Math.round(blendedColor.g),
        b: Math.round(blendedColor.b),
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
      
      time += 0.002; // Very slow, smooth animation
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Center point for radial edge blending
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
      
      // Render gradient with edge blending
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Normalized coordinates
          const nx = (x / width - 0.5) * 2;
          const ny = (y / height - 0.5) * 2;
          
          // Apply zoom (Monopo's 0.75)
          const zx = nx / zoom;
          const zy = ny / zoom;
          
          // Apply rotation (Monopo's rotation)
          const cos = Math.cos(colorRotation);
          const sin = Math.sin(colorRotation);
          const rx = zx * cos - zy * sin;
          const ry = zx * sin + zy * cos;
          
          // Apply position offset + colorOffset (Monopo's color pattern offset)
          const px = rx + position[0] + colorOffset[0];
          const py = ry + position[1] + colorOffset[1];
          
          // Create wave patterns (Monopo's approach)
          const wave1 = Math.sin(px * spacing + time) * 0.5 + 0.5;
          const wave2 = Math.sin(py * spacing * 0.7 + time * 0.8) * 0.5 + 0.5;
          const wave3 = Math.sin((px + py) * spacing * 0.5 + time * 1.2) * 0.5 + 0.5;
          
          // Combine waves
          const pattern = (wave1 + wave2 + wave3) / 3;
          
          // Add displacement/noise (Monopo's high displacement)
          const noise = (Math.sin(px * displacement * 8) + Math.cos(py * displacement * 8)) * 0.05;
          const finalT = Math.max(0, Math.min(1, pattern + noise));
          
          // Get gradient color
          const gradientColor = getColor(finalT * colorSpacing);
          
          // Calculate distance from center for edge blending
          const distX = x - centerX;
          const distY = y - centerY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          
          // Edge fade factor (0 = center, 1 = edge)
          // Start fading at 60% from center, full fade at edge
          const fadeStart = maxDist * 0.6;
          const fadeEnd = maxDist;
          const edgeFactor = dist < fadeStart 
            ? 0 
            : Math.min(1, (dist - fadeStart) / (fadeEnd - fadeStart));
          
          // Smooth edge fade curve
          const smoothEdgeFactor = edgeFactor * edgeFactor * (3 - 2 * edgeFactor);
          
          // Blend gradient color with background color at edges
          const finalColor = {
            r: Math.round(gradientColor.r * (1 - smoothEdgeFactor) + bgColor.r * smoothEdgeFactor),
            g: Math.round(gradientColor.g * (1 - smoothEdgeFactor) + bgColor.g * smoothEdgeFactor),
            b: Math.round(gradientColor.b * (1 - smoothEdgeFactor) + bgColor.b * smoothEdgeFactor),
          };
          
          // Write pixel
          const index = (y * width + x) * 4;
          data[index] = finalColor.r;
          data[index + 1] = finalColor.g;
          data[index + 2] = finalColor.b;
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
    colorSpread,
    colorOffset,
    displacement,
    seed,
    position,
    zoom,
    spacing,
    bgColor,
    isDark,
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
      {/* Main gradient canvas - Oversized like Monopo (3x width, centered) */}
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          width: '300%',  // 3x wider like Monopo
          height: '100%',
          left: '50%',
          top: 0,
          transform: 'translate3d(-50%, 0, 0)',  // Center the oversized gradient
          mixBlendMode: 'normal',
        }}
      />
      
      {/* Grain texture overlay - Also oversized to match gradient */}
      {grain && (
        <canvas
          ref={grainCanvasRef}
          className="absolute opacity-40"
          style={{
            width: '300%',  // Match gradient size
            height: '100%',
            left: '50%',
            top: 0,
            transform: 'translate3d(-50%, 0, 0)',  // Center like gradient
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
