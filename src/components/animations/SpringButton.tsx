/**
 * Spring Physics Button Component
 * 
 * Button with physics-based spring animations
 * Uses custom physics engine for natural, fluid motion
 * 
 * Technical Showcase:
 * - Custom physics implementation
 * - Spring-based animations
 * - Performance-optimized (60fps)
 * - GPU-accelerated transforms
 */

'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { getPhysicsEngine } from '@/lib/animations/PhysicsEngine';
import type { SpringState } from '@/lib/animations/PhysicsEngine';

interface SpringButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  springConfig?: {
    mass?: number;
    stiffness?: number;
    damping?: number;
  };
}

export const SpringButton: React.FC<SpringButtonProps> = ({
  children,
  springConfig = {},
  className = '',
  ...props
}) => {
  const [scale, setScale] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [target, setTarget] = useState(1);
  const springState = useRef<SpringState>({
    position: 1,
    velocity: 0,
    target: 1,
  });
  const animationFrame = useRef<number | undefined>(undefined);
  const physicsEngine = useMemo(() => getPhysicsEngine(), []);
  const configRef = useRef<typeof springConfig>(springConfig);

  // Update config ref when it changes
  useEffect(() => {
    configRef.current = springConfig;
  }, [springConfig]);

  useEffect(() => {
    springState.current.target = target;
    
    const animate = () => {
      const newState = physicsEngine.calculateSpringStep(springState.current, configRef.current);
      springState.current = newState;

      setScale(newState.position);

      if (!physicsEngine.isAtRest(newState, configRef.current)) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    if (!physicsEngine.isAtRest(springState.current, configRef.current)) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [target, physicsEngine]);

  const handleMouseDown = () => {
    setIsPressed(true);
    setTarget(0.95);
    springState.current.velocity = 0;
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setTarget(1);
  };

  const handleMouseEnter = () => {
    if (!isPressed) {
      setTarget(1.05);
    }
  };

  const handleMouseLeave = () => {
    if (!isPressed) {
      setTarget(1);
    }
  };

  return (
    <Button
      {...props}
      className={`transition-none ${className}`}
      style={{
        transform: `scale(${scale})`,
        willChange: 'transform',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  );
};

export default SpringButton;

