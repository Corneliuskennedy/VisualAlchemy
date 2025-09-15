import { lazy, Suspense, useEffect, useRef } from 'react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

// Lazy load tech elements
const TechElements = lazy(() => import('./TechElements'));

// Uniform static grid with consistent spacing and opacity
const StaticGrid = ({ className = '', highContrast = false }: { className?: string, highContrast?: boolean }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main grid with uniform 60px spacing */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.15)_1px,transparent_1px)]
          bg-[size:60px_60px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ opacity: highContrast ? 0.3 : 0.2 }}
      />
      
      {/* Subtle accent grid for depth */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.08)_1px,transparent_1px)]
          bg-[size:20px_20px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ opacity: highContrast ? 0.15 : 0.1 }}
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

  // Use static grid if interactive is disabled or on small screens
  if (disableInteractive || !isLargeScreen) {
    return <StaticGrid className={className} highContrast={highContrast} />;
  }

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<StaticGrid className={className} highContrast={highContrast} />}>
        <InteractiveGrid className={className} highContrast={highContrast} />
        
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