'use client';

import { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  className?: string;
  highContrast?: boolean;
  isDark?: boolean;
}

const InteractiveGrid = ({ className = '', highContrast = false, isDark = false }: InteractiveGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);

  // Use Octomatic blue (#4585f4) for both themes
  const octomaticBlue = '69,133,244'; // RGB values for #4585f4
  const gridColorLarge = isDark ? `rgba(${octomaticBlue},0.15)` : `rgba(${octomaticBlue},0.25)`;
  const gridColorSmall = isDark ? `rgba(${octomaticBlue},0.08)` : `rgba(${octomaticBlue},0.15)`;

  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid) return;

    // Adjust opacity based on theme - use higher opacity for light mode visibility
    const baseOpacity = isDark 
      ? (highContrast ? '0.4' : '0.3')
      : (highContrast ? '0.35' : '0.25');
    const baseOpacitySmall = isDark 
      ? (highContrast ? '0.25' : '0.2')
      : (highContrast ? '0.25' : '0.15');
    const hoverOpacity = isDark 
      ? (highContrast ? '0.6' : '0.5')
      : (highContrast ? '0.5' : '0.4');
    const hoverOpacitySmall = isDark 
      ? (highContrast ? '0.4' : '0.3')
      : (highContrast ? '0.3' : '0.25');
    
    grid.style.opacity = baseOpacity;
    smallGrid.style.opacity = baseOpacitySmall;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Set a larger radius with more feathering for the hover effect
      const radius = 250; // Increased from 200 for more subtle spread
      
      // Set the position for both grids
      grid.style.setProperty('--mouse-x', `${mouseX}px`);
      grid.style.setProperty('--mouse-y', `${mouseY}px`);
      grid.style.setProperty('--radius', `${radius}px`);
      smallGrid.style.setProperty('--mouse-x', `${mouseX}px`);
      smallGrid.style.setProperty('--mouse-y', `${mouseY}px`);
      smallGrid.style.setProperty('--radius', `${radius}px`);
      
      // Increase opacity when mouse is over the area
      grid.style.opacity = hoverOpacity;
      smallGrid.style.opacity = hoverOpacitySmall;
    };
    
    const handleMouseLeave = () => {
      // When mouse leaves, return to base opacity
      grid.style.opacity = baseOpacity;
      smallGrid.style.opacity = baseOpacitySmall;
    };

    // Add listeners to the document and grid element
    document.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (grid) {
        grid.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [highContrast, isDark]);

  const baseOpacityValue = isDark 
    ? (highContrast ? 0.4 : 0.3)
    : (highContrast ? 0.35 : 0.25);
  const baseOpacitySmallValue = isDark 
    ? (highContrast ? 0.25 : 0.2)
    : (highContrast ? 0.25 : 0.15);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Large grid - 75px */}
      <div
        ref={gridRef}
        className="
          absolute inset-0
          bg-[size:75px_75px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-10
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '250px',
          opacity: baseOpacityValue,
          backgroundImage: `linear-gradient(${gridColorLarge} 1px, transparent 1px), linear-gradient(90deg, ${gridColorLarge} 1px, transparent 1px)`,
        } as React.CSSProperties}
      />
      
      {/* Small grid - 15px */}
      <div
        ref={smallGridRef}
        className="
          absolute inset-0
          bg-[size:15px_15px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-5
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '250px',
          opacity: baseOpacitySmallValue,
          backgroundImage: `linear-gradient(${gridColorSmall} 1px, transparent 1px), linear-gradient(90deg, ${gridColorSmall} 1px, transparent 1px)`,
        } as React.CSSProperties}
      />
    </div>
  );
};

export default InteractiveGrid; 