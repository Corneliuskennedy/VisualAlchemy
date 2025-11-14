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

  // Set up smooth mouse interaction for elegant grid reveal
  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid || !mounted) return;

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle with requestAnimationFrame for smooth performance
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = grid.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Smooth interpolation for buttery movement
        const smoothX = lastX + (mouseX - lastX) * 0.3;
        const smoothY = lastY + (mouseY - lastY) * 0.3;
        lastX = smoothX;
        lastY = smoothY;
        
        // Optimal radius for visible, elegant reveal
        const radius = 350;
        
        // Set the position for both grids with smooth interpolation
        grid.style.setProperty('--mouse-x', `${smoothX}px`);
        grid.style.setProperty('--mouse-y', `${smoothY}px`);
        grid.style.setProperty('--radius', `${radius}px`);
        smallGrid.style.setProperty('--mouse-x', `${smoothX}px`);
        smallGrid.style.setProperty('--mouse-y', `${smoothY}px`);
        smallGrid.style.setProperty('--radius', `${radius}px`);
        
        rafId = null;
      });
    };

    // Add listener to document for global effect
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mounted]);

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
      
      {/* Large grid - 75px - Beautiful hexagonal pattern reveal */}
      <div
        ref={gridRef}
        className="
          absolute inset-0
          bg-[size:75px_75px]
          z-10
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '350px',
          opacity: isDark ? 0.18 : 0.22,
          backgroundImage: `linear-gradient(${gridColorLarge} 1px, transparent 1px), linear-gradient(90deg, ${gridColorLarge} 1px, transparent 1px)`,
          maskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.1) 65%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.1) 65%, transparent 85%)',
          transition: 'mask-image 0.1s ease-out',
        } as React.CSSProperties}
      />
      
      {/* Small grid - 15px - Subtle detail layer */}
      <div
        ref={smallGridRef}
        className="
          absolute inset-0
          bg-[size:15px_15px]
          z-5
        "
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--radius': '350px',
          opacity: isDark ? 0.12 : 0.15,
          backgroundImage: `linear-gradient(${gridColorSmall} 1px, transparent 1px), linear-gradient(90deg, ${gridColorSmall} 1px, transparent 1px)`,
          maskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.08) 65%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.08) 65%, transparent 85%)',
          transition: 'mask-image 0.1s ease-out',
        } as React.CSSProperties}
      />
    </div>
  );
}
