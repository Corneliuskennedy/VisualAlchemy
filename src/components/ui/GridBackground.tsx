import { lazy, Suspense, useEffect, useRef } from 'react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

// Lazy load tech elements
const TechElements = lazy(() => import('./TechElements'));

// Minimal static grid that only shows on interaction
const StaticGrid = ({ className = '', highContrast = false }: { className?: string, highContrast?: boolean }) => {
  const largeGridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set a visible base opacity for static grids (reduced for subtlety)
    if (largeGridRef.current) {
      largeGridRef.current.style.opacity = highContrast ? '0.35' : '0.25';
    }
    if (smallGridRef.current) {
      smallGridRef.current.style.opacity = highContrast ? '0.2' : '0.15';
    }
  }, [highContrast]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Minimal static grid with subtle blue lines */}
      <div
        ref={largeGridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.12)_1px,transparent_1px)]
          bg-[size:75px_75px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ opacity: highContrast ? 0.35 : 0.25 }}
      />
      
      {/* Smaller grid for consistency with InteractiveGrid */}
      <div
        ref={smallGridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.08)_1px,transparent_1px)]
          bg-[size:15px_15px]
          transition-opacity duration-500
          pointer-events-none
        "
        style={{ opacity: highContrast ? 0.2 : 0.15 }}
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
  highContrast = true // Default to high contrast for consistency
}: GridBackgroundProps) => {
  const isLargeScreen = useIsLargeScreen();

  if (!isLargeScreen) {
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