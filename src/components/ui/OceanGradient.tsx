'use client';

import { MonopoGradient, MonopoGradientProps } from './MonopoGradient';

/**
 * OceanGradient Component
 * 
 * Pre-configured ocean-themed gradient with deep blues, teals, and turquoise.
 * Includes a contrasty accent color for visual interest.
 * Perfect for hero sections, backgrounds, and water-themed designs.
 */
export function OceanGradient({
  variant = 'deep',
  ...props
}: Omit<MonopoGradientProps, 'color1' | 'color2' | 'color3' | 'color4'> & {
  /**
   * Ocean gradient variant
   * - 'deep': Deep ocean blues with cyan accent
   * - 'tropical': Bright tropical waters with teal accent
   * - 'sunset': Ocean sunset with warm orange accent
   * - 'arctic': Cool arctic ocean with ice blue accent
   */
  variant?: 'deep' | 'tropical' | 'sunset' | 'arctic';
}) {
  // Ocean color palettes with contrasty accent colors
  const palettes = {
    deep: {
      color1: '#0ea5e9',      // Sky blue (surface)
      color2: '#0284c7',       // Ocean blue
      color3: '#0369a1',       // Deep blue
      color4: '#00d9ff',       // Bright cyan accent (contrasty)
    },
    tropical: {
      color1: '#06b6d4',       // Bright cyan
      color2: '#0891b2',       // Turquoise
      color3: '#0e7490',       // Teal
      color4: '#14b8a6',       // Emerald accent (contrasty)
    },
    sunset: {
      color1: '#f0f9ff',       // Light sky
      color2: '#38bdf8',       // Sky blue
      color3: '#0284c7',       // Ocean blue
      color4: '#f97316',       // Orange accent (contrasty)
    },
    arctic: {
      color1: '#e0f2fe',       // Ice blue
      color2: '#7dd3fc',       // Light blue
      color3: '#0ea5e9',       // Ocean blue
      color4: '#06b6d4',       // Cyan accent (contrasty)
    },
  };

  const colors = palettes[variant];

  return (
    <MonopoGradient
      {...colors}
      colorSize={0.85}
      colorSpacing={1.5}
      colorRotation={0.8}
      displacement={0.5}
      zoom={1.0}
      spacing={1.8}
      grain={true}
      {...props}
    />
  );
}

export const OceanGradientPreset = OceanGradient;
