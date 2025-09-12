import { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  className?: string;
  highContrast?: boolean;
}

const InteractiveGrid = ({ className = '', highContrast = false }: InteractiveGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid) return;

    // Set a higher base opacity for static display, but reduce overall brightness
    const baseOpacity = highContrast ? '0.4' : '0.3';
    const baseOpacitySmall = highContrast ? '0.25' : '0.2';
    const hoverOpacity = highContrast ? '0.6' : '0.5';
    const hoverOpacitySmall = highContrast ? '0.4' : '0.3';
    
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
  }, [highContrast]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Large grid - 75px */}
      <div
        ref={gridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.15)_1px,transparent_1px)]
          bg-[size:75px_75px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-10
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '250px',
          opacity: highContrast ? 0.4 : 0.3,
        } as React.CSSProperties}
      />
      
      {/* Small grid - 15px */}
      <div
        ref={smallGridRef}
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(69,133,244,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(69,133,244,0.08)_1px,transparent_1px)]
          bg-[size:15px_15px]
          [mask-image:radial-gradient(circle_var(--radius)_at_var(--mouse-x)_var(--mouse-y),#fff_20%,transparent_80%)]
          transition-opacity duration-300 ease-in-out
          z-5
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '250px',
          opacity: highContrast ? 0.25 : 0.2,
        } as React.CSSProperties}
      />
    </div>
  );
};

export default InteractiveGrid; 