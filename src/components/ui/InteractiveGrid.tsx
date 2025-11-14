'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface InteractiveGridProps {
  className?: string;
  highContrast?: boolean;
  isDark?: boolean;
}

const InteractiveGrid = ({ className = '', highContrast = false, isDark = false }: InteractiveGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const smallGridRef = useRef<HTMLDivElement>(null);

  // Use Octomatic blue (#4585f4) for both themes
  // Standardized opacity ratios: Light mode effects are 1.5x more visible for visual consistency
  const octomaticBlue = '69,133,244'; // RGB values for #4585f4
  const gridColorLarge = isDark ? `rgba(${octomaticBlue},0.2)` : `rgba(${octomaticBlue},0.3)`;
  const gridColorSmall = isDark ? `rgba(${octomaticBlue},0.1)` : `rgba(${octomaticBlue},0.15)`;

  useEffect(() => {
    const grid = gridRef.current;
    const smallGrid = smallGridRef.current;
    if (!grid || !smallGrid) return;

    // Visible base opacity - present but refined
    const baseOpacity = isDark 
      ? (highContrast ? 0.25 : 0.18)
      : (highContrast ? 0.3 : 0.22);
    const baseOpacitySmall = isDark 
      ? (highContrast ? 0.18 : 0.12)
      : (highContrast ? 0.22 : 0.15);
    
    // More pronounced hover opacity - clear, beautiful reveal
    const hoverOpacity = isDark 
      ? (highContrast ? 0.55 : 0.45)
      : (highContrast ? 0.6 : 0.5);
    const hoverOpacitySmall = isDark 
      ? (highContrast ? 0.45 : 0.38)
      : (highContrast ? 0.5 : 0.42);
    
    grid.style.opacity = baseOpacity.toString();
    smallGrid.style.opacity = baseOpacitySmall.toString();

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
        
        // Gentle opacity increase on hover
        grid.style.opacity = hoverOpacity.toString();
        smallGrid.style.opacity = hoverOpacitySmall.toString();
        
        rafId = null;
      });
    };
    
    const handleMouseLeave = () => {
      // Smooth fade back to base opacity
      grid.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      smallGrid.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      grid.style.opacity = baseOpacity.toString();
      smallGrid.style.opacity = baseOpacitySmall.toString();
      
      // Reset transition after fade
      setTimeout(() => {
        grid.style.transition = '';
        smallGrid.style.transition = '';
      }, 800);
    };

    // Add listeners to the document for global effect
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [highContrast, isDark]);

  const baseOpacityValue = isDark 
    ? (highContrast ? 0.25 : 0.18)
    : (highContrast ? 0.3 : 0.22);
  const baseOpacitySmallValue = isDark 
    ? (highContrast ? 0.18 : 0.12)
    : (highContrast ? 0.22 : 0.15);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
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
          opacity: baseOpacityValue,
          backgroundImage: `linear-gradient(${gridColorLarge} 1px, transparent 1px), linear-gradient(90deg, ${gridColorLarge} 1px, transparent 1px)`,
          filter: isDark ? 'none' : 'blur(0.3px)',
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
          opacity: baseOpacitySmallValue,
          backgroundImage: `linear-gradient(${gridColorSmall} 0.5px, transparent 0.5px), linear-gradient(90deg, ${gridColorSmall} 0.5px, transparent 0.5px)`,
          filter: isDark ? 'none' : 'blur(0.2px)',
          maskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.08) 65%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.08) 65%, transparent 85%)',
          transition: 'mask-image 0.1s ease-out',
        } as React.CSSProperties}
      />
      
    </div>
  );
};

export default InteractiveGrid; 