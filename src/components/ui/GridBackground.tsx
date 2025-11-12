'use client';

import { lazy, Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { useTheme } from 'next-themes';

// Lazy load tech elements
const TechElements = lazy(() => import('./TechElements'));

// Uniform static grid with consistent spacing and opacity - theme aware
const StaticGrid = ({ className = '', highContrast = false, isDark = false }: { className?: string, highContrast?: boolean, isDark?: boolean }) => {
  // Use Octomatic blue (#4585f4) for both themes, adjust opacity for visibility
  const octomaticBlue = '69,133,244'; // RGB values for #4585f4
  const gridColorLarge = isDark ? `rgba(${octomaticBlue},0.15)` : `rgba(${octomaticBlue},0.25)`;
  const gridColorSmall = isDark ? `rgba(${octomaticBlue},0.08)` : `rgba(${octomaticBlue},0.15)`;
  
  const baseOpacityLarge = isDark ? (highContrast ? 0.3 : 0.2) : (highContrast ? 0.3 : 0.25);
  const baseOpacitySmall = isDark ? (highContrast ? 0.15 : 0.1) : (highContrast ? 0.2 : 0.15);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main grid with uniform 60px spacing */}
      <div
        className="
          absolute inset-0
          bg-[size:60px_60px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ 
          opacity: baseOpacityLarge,
          backgroundImage: `linear-gradient(${gridColorLarge} 1px, transparent 1px), linear-gradient(90deg, ${gridColorLarge} 1px, transparent 1px)`,
        }}
      />
      
      {/* Subtle accent grid for depth */}
      <div
        className="
          absolute inset-0
          bg-[size:20px_20px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ 
          opacity: baseOpacitySmall,
          backgroundImage: `linear-gradient(${gridColorSmall} 1px, transparent 1px), linear-gradient(90deg, ${gridColorSmall} 1px, transparent 1px)`,
        }}
      />
    </div>
  );
};

// Lazy load the interactive grid
const InteractiveGrid = lazy(() => import('./InteractiveGrid'));

interface GridBackgroundProps {
  className?: string;
  showTechElements?: boolean;
  techElementsDensity?: 'low' | 'medium' | 'high';
  highContrast?: boolean;
  disableInteractive?: boolean;
}

/**
 * GridBackground - Creates an interactive grid that appears on hover
 * Usage: Place this component inside an absolute positioned div:
 * <div className="absolute inset-0 pointer-events-none z-0">
 *   <GridBackground />
 * </div>
 */
const GridBackground = ({ 
  className,
  showTechElements = false, // Set default to false for a more minimal look
  techElementsDensity = 'low',
  highContrast = true, // Default to high contrast for consistency
  disableInteractive = false
}: GridBackgroundProps) => {
  const isLargeScreen = useIsLargeScreen();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme (handle hydration) - memoized to prevent unnecessary recalculations
  const currentTheme = useMemo(() => {
    return mounted ? (resolvedTheme || theme || 'light') : 'light';
  }, [mounted, resolvedTheme, theme]);
  
  const isDark = useMemo(() => currentTheme === 'dark', [currentTheme]);

  // Use static grid if interactive is disabled or on small screens
  if (disableInteractive || !isLargeScreen) {
    return <StaticGrid className={className} highContrast={highContrast} isDark={isDark} />;
  }

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<StaticGrid className={className} highContrast={highContrast} isDark={isDark} />}>
        <InteractiveGrid className={className} highContrast={highContrast} isDark={isDark} />
        
        {/* Add tech elements only if explicitly requested */}
        {showTechElements && (
          <Suspense fallback={null}>
            <TechElements 
              className="z-20" 
              density={techElementsDensity}
              elementsType="mixed"
              showGlow
            />
          </Suspense>
        )}
      </Suspense>
    </div>
  );
};

export default GridBackground;