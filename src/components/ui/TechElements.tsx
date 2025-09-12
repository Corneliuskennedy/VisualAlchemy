import { useEffect, useRef, useState } from 'react';

interface TechElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  elementsType?: 'dots' | 'squares' | 'circuits' | 'mixed';
  showGlow?: boolean;
}

/**
 * TechElements - Adds floating technology-inspired elements to backgrounds
 * Can be used with GridBackground for extra visual interest
 */
const TechElements: React.FC<TechElementsProps> = ({
  className = '',
  density = 'low',
  elementsType = 'mixed',
  showGlow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  
  // Get number of elements based on density
  const getElementCount = () => {
    switch(density) {
      case 'low': return 10;
      case 'medium': return 20;
      case 'high': return 35;
      default: return 10;
    }
  };
  
  // Generate random position within container
  const getRandomPosition = (containerWidth: number, containerHeight: number) => {
    return {
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
    };
  };
  
  // Generate random size for element
  const getRandomSize = () => {
    return Math.random() * 20 + 5; // Between 5 and 25
  };
  
  // Generate random animation delay
  const getRandomDelay = () => {
    return Math.random() * 10; // Between 0 and 10 seconds
  };
  
  // Generate element based on type
  const generateElement = (
    type: 'dot' | 'square' | 'circuit', 
    x: number, 
    y: number, 
    size: number, 
    delay: number,
    index: number
  ) => {
    const baseClasses = `
      absolute 
      opacity-30 
      pointer-events-none 
      z-10
    `;
    
    const glowClass = showGlow ? 'filter blur-[1px]' : '';
    
    switch(type) {
      case 'dot':
        return (
          <div
            key={`dot-${index}`}
            className={`
              ${baseClasses}
              ${glowClass}
              rounded-full
              bg-octo-blue
              animate-pulse-slow
            `}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size / 2}px`,
              height: `${size / 2}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      
      case 'square':
        return (
          <div
            key={`square-${index}`}
            className={`
              ${baseClasses}
              ${glowClass}
              border 
              border-octo-blue
              animate-float
            `}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      
      case 'circuit':
        // Create more complex circuit-like element
        return (
          <div
            key={`circuit-${index}`}
            className={`
              ${baseClasses}
              ${glowClass}
              animate-float-delayed
            `}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size * 1.5}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          >
            <div className="absolute left-0 top-1/2 w-full h-[1px] bg-octo-blue opacity-60" />
            <div className="absolute left-1/4 top-0 w-[1px] h-full bg-octo-blue opacity-60" />
            <div className="absolute right-1/4 top-0 w-[1px] h-1/2 bg-octo-blue opacity-60" />
            <div className="absolute right-1/4 top-1/2 w-1/4 h-[1px] bg-octo-blue opacity-60" />
            <div className="absolute left-1/4 top-1/4 w-[3px] h-[3px] rounded-full bg-octo-blue opacity-80" />
            <div className="absolute right-1/4 top-1/2 w-[3px] h-[3px] rounded-full bg-octo-blue opacity-80" />
          </div>
        );
    }
  };
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    const elementCount = getElementCount();
    const newElements: React.ReactNode[] = [];
    
    for (let i = 0; i < elementCount; i++) {
      const { x, y } = getRandomPosition(width, height);
      const size = getRandomSize();
      const delay = getRandomDelay();
      
      let type: 'dot' | 'square' | 'circuit';
      
      if (elementsType === 'dots') {
        type = 'dot';
      } else if (elementsType === 'squares') {
        type = 'square';
      } else if (elementsType === 'circuits') {
        type = 'circuit';
      } else {
        // Mixed - randomly select a type
        const typeIndex = Math.floor(Math.random() * 3);
        type = ['dot', 'square', 'circuit'][typeIndex] as 'dot' | 'square' | 'circuit';
      }
      
      newElements.push(generateElement(type, x, y, size, delay, i));
    }
    
    setElements(newElements);
  }, [density, elementsType]);
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {elements}
    </div>
  );
};

export default TechElements; 