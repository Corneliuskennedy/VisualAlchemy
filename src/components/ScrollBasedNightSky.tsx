'use client';

import { useEffect, useRef } from 'react';

export default function GlobalInteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid) return;

    // Base opacity settings for a subtle but visible grid
    const baseOpacity = '0.15';
    const baseOpacitySmall = '0.1';
    const hoverOpacity = '0.4';
    const hoverOpacitySmall = '0.25';
    
    grid.style.opacity = baseOpacity;
    smallGrid.style.opacity = baseOpacitySmall;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Larger radius for more dramatic effect
      const radius = 300;
      
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

    // Add listeners to the document for global effect
    document.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (grid) {
        grid.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {/* Base background layer */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      
      {/* Large grid - 75px */}
      <div
        ref={gridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.2)_1px,transparent_1px)]
          bg-[size:75px_75px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-10
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '300px',
          opacity: 0.15,
        } as React.CSSProperties}
      />
      
      {/* Small grid - 15px */}
      <div
        ref={smallGridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.12)_1px,transparent_1px)]
          bg-[size:15px_15px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-5
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '300px',
          opacity: 0.1,
        } as React.CSSProperties}
      />
    </div>
  );
}
