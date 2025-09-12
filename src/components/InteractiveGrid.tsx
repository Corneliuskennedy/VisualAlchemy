import React, { useEffect, useRef, useState, useCallback } from 'react';
import throttle from 'lodash.throttle';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

interface InteractiveGridProps {
  className?: string;
  density?: number;
  opacity?: number;
  color?: string;
  highlightColor?: string;
  interactive?: boolean;
  animationDuration?: number;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  className = '',
  density = 30,
  opacity = 0.3,
  color = '#4585f4',
  highlightColor = '#ffffff',
  interactive = true,
  animationDuration = 1000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useIsLargeScreen();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  // Intersection observer for performance
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Canvas setup and drawing
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !containerRef.current) return;
    
    const updateCanvas = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      
      drawGrid(ctx, rect.width, rect.height);
    };
    
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      
      const gridSize = Math.max(20, Math.min(60, width / density));
      
      // Draw grid lines
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      
      ctx.stroke();
      
      // Draw highlighted points
      if (interactive && mousePosition) {
        ctx.fillStyle = highlightColor;
        const radius = 100;
        
        for (let x = 0; x <= width; x += gridSize) {
          for (let y = 0; y <= height; y += gridSize) {
            const distance = Math.sqrt((x - mousePosition.x) ** 2 + (y - mousePosition.y) ** 2);
            if (distance <= radius) {
              const intensity = 1 - (distance / radius);
              ctx.globalAlpha = intensity * 0.6;
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      
      ctx.globalAlpha = 1;
    };
    
    updateCanvas();
    
    const handleResize = throttle(updateCanvas, 100);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, density, opacity, color, highlightColor, interactive, mousePosition]);

  // Mouse event handlers
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !interactive) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }, 50),
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePosition(null);
  }, []);

  // Don't render on small screens
  if (!isLargeScreen) {
    return (
      <div 
        ref={containerRef}
        className={`absolute inset-0 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default InteractiveGrid; 