import React, { useEffect, useRef } from 'react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface GridBackgroundProps {
  className?: string;
  color?: string;
  opacity?: number;
  density?: number;
  animated?: boolean;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  className = '',
  color = '#4585f4',
  opacity = 0.15,
  density = 40,
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isLargeScreen = useIsLargeScreen();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Reduce density on mobile for better performance
  const actualDensity = isLargeScreen ? density : Math.floor(density / 2);
  
  // Disable animation if user prefers reduced motion
  const shouldAnimate = animated && !prefersReducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      if (!containerRef.current || !canvas) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    
    updateCanvasSize();
    
    // Handle resize
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      updateCanvasSize();
      drawGrid(0);
      
      if (shouldAnimate) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Draw grid function
    const drawGrid = (offset: number) => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calculate grid spacing
      const spacing = Math.max(10, Math.min(width, height) / actualDensity);
      
      // Set line style
      ctx.strokeStyle = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      for (let x = offset % spacing; x <= width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = offset % spacing; y <= height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };
    
    // Animation function
    let lastTime = 0;
    const speed = 15; // pixels per second
    
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Calculate offset based on time
      const offset = (time / (1000 / speed)) % 50;
      
      drawGrid(offset);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initial draw
    drawGrid(0);
    
    // Start animation if enabled
    if (shouldAnimate) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [color, opacity, actualDensity, shouldAnimate]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ contain: 'strict' }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: shouldAnimate ? 'transform' : 'auto'
        }}
      />
    </div>
  );
};

export default React.memo(GridBackground);
