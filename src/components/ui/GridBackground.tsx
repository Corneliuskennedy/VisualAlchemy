/**
 * GridBackground Component
 * 
 * Creates an interactive, animated grid background with:
 * - Static grid for mobile/small screens (performance)
 * - Interactive grid for desktop (mouse-responsive)
 * - Floating particles for visual interest
 * - Animated gradients and corner glows
 * - Theme-aware (light/dark mode)
 * 
 * Performance optimizations:
 * - Lazy loading of heavy components
 * - GPU-accelerated animations
 * - Reduced motion support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showTechElements=false] - Show floating tech elements
 * @param {'low'|'medium'|'high'} [props.techElementsDensity='low'] - Density of tech elements
 * @param {boolean} [props.highContrast=true] - Higher contrast for visibility
 * @param {boolean} [props.disableInteractive=false] - Disable interactive grid
 * @returns {JSX.Element} Grid background component
 */

'use client';

import { lazy, Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
// DISABLED: ThemeProvider - using hardcoded dark theme
// import { useTheme } from 'next-themes';

// Lazy load tech elements
const TechElements = lazy(() => import('./TechElements'));
const FloatingParticles = lazy(() => import('./FloatingParticles'));

/**
 * StaticGrid Component
 * 
 * Static grid background for mobile/small screens.
 * Optimized for performance with CSS-only animations.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.highContrast=false] - Higher contrast mode
 * @param {boolean} [props.isDark=false] - Dark theme mode
 * @returns {JSX.Element} Static grid component
 */
const StaticGrid = ({ className = '', highContrast = false, isDark = false }: { className?: string, highContrast?: boolean, isDark?: boolean }) => {
  // Use Octomatic blue (#4585f4) for both themes
  // Standardized opacity ratios: Light mode effects are 1.5x more visible for visual consistency
  const octomaticBlue = '69,133,244'; // RGB values for #4585f4
  
  // Grid colors - matched visual weight (light mode 1.5x opacity for consistency)
  const gridColorLarge = isDark ? `rgba(${octomaticBlue},0.2)` : `rgba(${octomaticBlue},0.3)`;
  const gridColorSmall = isDark ? `rgba(${octomaticBlue},0.1)` : `rgba(${octomaticBlue},0.15)`;
  
  // Base opacity - matched visual weight
  const baseOpacityLarge = isDark ? (highContrast ? 0.25 : 0.2) : (highContrast ? 0.35 : 0.3);
  const baseOpacitySmall = isDark ? (highContrast ? 0.15 : 0.1) : (highContrast ? 0.2 : 0.15);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main grid with uniform 60px spacing - Enhanced */}
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
          filter: isDark ? 'none' : 'blur(0.3px)',
        }}
      />
      
      {/* Subtle accent grid for depth - Enhanced */}
      <div
        className="
          absolute inset-0
          bg-[size:20px_20px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ 
          opacity: baseOpacitySmall,
          backgroundImage: `linear-gradient(${gridColorSmall} 0.5px, transparent 0.5px), linear-gradient(90deg, ${gridColorSmall} 0.5px, transparent 0.5px)`,
          filter: isDark ? 'none' : 'blur(0.2px)',
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
 * GridBackground - Main component
 * 
 * Creates an interactive grid background that responds to mouse movement.
 * Automatically switches to static grid on small screens for performance.
 * 
 * @example
 * ```tsx
 * <div className="absolute inset-0 pointer-events-none z-0">
 *   <GridBackground highContrast={true} />
 * </div>
 * ```
 */
const GridBackground = ({ 
  className,
  showTechElements = false, // Set default to false for a more minimal look
  techElementsDensity = 'low',
  highContrast = true, // Default to high contrast for consistency
  disableInteractive = false
}: GridBackgroundProps) => {
  const isLargeScreen = useIsLargeScreen();
  // DISABLED: ThemeProvider - hardcoded to dark theme
  // const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // DISABLED: ThemeProvider - always use dark theme
  const currentTheme = useMemo(() => {
    return 'dark'; // Always dark theme
  }, []);
  
  const isDark = useMemo(() => true, []); // Always dark

  // Use static grid if interactive is disabled or on small screens
  if (disableInteractive || !isLargeScreen) {
    return (
      <>
        <StaticGrid className={className} highContrast={highContrast} isDark={isDark} />
        <Suspense fallback={null}>
          <FloatingParticles 
            count={isDark ? 15 : 12}
            color="#4585f4"
            isDark={isDark}
          />
        </Suspense>
      </>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<StaticGrid className={className} highContrast={highContrast} isDark={isDark} />}>
        <InteractiveGrid className={className} highContrast={highContrast} isDark={isDark} />
        
        {/* Floating particles for extra visual interest */}
        <Suspense fallback={null}>
          <FloatingParticles 
            count={isDark ? 20 : 15}
            color="#4585f4"
            isDark={isDark}
          />
        </Suspense>
        
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