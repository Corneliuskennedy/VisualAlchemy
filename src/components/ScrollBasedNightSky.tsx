'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';

export default function GlobalInteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(false); // Use ref to store current theme state for event handlers
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine current theme (handle hydration) - memoized to prevent unnecessary recalculations
  const currentTheme = useMemo(() => {
    return mounted ? (resolvedTheme || theme || 'light') : 'light';
  }, [mounted, resolvedTheme, theme]);
  
  const isDark = useMemo(() => currentTheme === 'dark', [currentTheme]);

  // Update ref when theme changes
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up event listeners once when mounted
  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid || !mounted) return;

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
      
      // Increase opacity when mouse is over the area - use ref for current theme
      const hoverOpacity = isDarkRef.current ? '0.4' : '0.15';
      const hoverOpacitySmall = isDarkRef.current ? '0.25' : '0.1';
      grid.style.opacity = hoverOpacity;
      smallGrid.style.opacity = hoverOpacitySmall;
    };
    
    const handleMouseLeave = () => {
      // When mouse leaves, return to base opacity - use ref for current theme
      const baseOpacity = isDarkRef.current ? '0.15' : '0.08';
      const baseOpacitySmall = isDarkRef.current ? '0.1' : '0.05';
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
  }, [mounted]); // Only depend on mounted - set up listeners once

  // Update opacity when theme changes (separate effect)
  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid || !mounted) return;

    // Adjust opacity based on theme - lighter grids need higher opacity on white background
    const baseOpacity = isDark ? '0.15' : '0.08';
    const baseOpacitySmall = isDark ? '0.1' : '0.05';
    
    grid.style.opacity = baseOpacity;
    smallGrid.style.opacity = baseOpacitySmall;
  }, [mounted, isDark]); // Update opacity when theme changes

  // Adjust grid colors for light mode - use darker blue with higher opacity for better visibility on white
  const gridColorLarge = isDark ? 'rgba(69,133,244,0.2)' : 'rgba(59,130,246,0.18)';
  const gridColorSmall = isDark ? 'rgba(69,133,244,0.12)' : 'rgba(59,130,246,0.12)';

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {/* Base background layer - theme aware */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDark ? 'bg-[#0A0A0A]' : 'bg-white'
      }`} />
      
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
          '--radius': '300px',
          opacity: isDark ? 0.15 : 0.15,
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
          '--radius': '300px',
          opacity: isDark ? 0.1 : 0.1,
          backgroundImage: `linear-gradient(${gridColorSmall} 1px, transparent 1px), linear-gradient(90deg, ${gridColorSmall} 1px, transparent 1px)`,
        } as React.CSSProperties}
      />
    </div>
  );
}
