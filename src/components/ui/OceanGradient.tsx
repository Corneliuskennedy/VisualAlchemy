'use client';

import { MonopoGradient, MonopoGradientProps } from './MonopoGradient';

/**
 * OceanGradient Component
 * 
 * Pre-configured ocean-themed gradient with deep blues, teals, and turquoise.
 * Perfect for hero sections, backgrounds, and water-themed designs.
 * 
 * Based on MonopoGradient with ocean color palette.
 */
export function OceanGradient({
  variant = 'deep',
  ...props
}: Omit<MonopoGradientProps, 'color1' | 'color2' | 'color3' | 'color4'> & {
  /**
   * Ocean gradient variant
   * - 'deep': Deep ocean blues (default)
   * - 'tropical': Bright tropical waters
   * - 'sunset': Ocean sunset with warm tones
   * - 'arctic': Cool arctic ocean
   */
  variant?: 'deep' | 'tropical' | 'sunset' | 'arctic';
}) {
  // Ocean color palettes
  const palettes = {
    deep: {
      color1: '#0ea5e9',      // Sky blue (surface)
      color2: '#0284c7',       // Ocean blue
      color3: '#0369a1',       // Deep blue
      color4: '#075985',       // Deepest blue
    },
    tropical: {
      color1: '#06b6d4',       // Bright cyan
      color2: '#0891b2',       // Turquoise
      color3: '#0e7490',       // Teal
      color4: '#155e75',       // Deep teal
    },
    sunset: {
      color1: '#f0f9ff',       // Light sky
      color2: '#38bdf8',       // Sky blue
      color3: '#0284c7',       // Ocean blue
      color4: '#075985',       // Deep blue
    },
    arctic: {
      color1: '#e0f2fe',       // Ice blue
      color2: '#7dd3fc',       // Light blue
      color3: '#0ea5e9',       // Ocean blue
      color4: '#0369a1',       // Deep blue
    },
  };

  const colors = palettes[variant];

  return (
    <MonopoGradient
      {...colors}
      colorSize={0.85}
      colorSpacing={0.6}
      colorRotation={1.2}
      displacement={1.5}
      zoom={1.0}
      spacing={3.5}
      {...props}
    />
  );
}

/**
 * OceanGradientPreset - Quick preset component
 * 
 * Usage:
 * <OceanGradientPreset variant="deep" />
 */
export const OceanGradientPreset = OceanGradient;

