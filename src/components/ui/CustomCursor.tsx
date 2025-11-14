'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  label?: string;
}

/**
 * CustomCursor - Context-Aware Custom Cursor Component
 * 
 * Creates a premium, tactile cursor that:
 * - Smoothly follows mouse with spring physics
 * - Detects interactive elements (a, button, data-cursor)
 * - Scales and inverts on hover using mix-blend-mode
 * - Displays contextual labels when hovering
 */
export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth following
  const springConfig = { stiffness: 500, damping: 30 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor');

      if (isInteractive) {
        const label = target.getAttribute('data-cursor-label') || 
                     (target.tagName === 'A' ? 'View' : 
                      target.tagName === 'BUTTON' ? 'Click' : undefined);
        
        setCursorState({
          x: e.clientX,
          y: e.clientY,
          isHovering: true,
          label,
        });
      }
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isHovering: false, label: undefined }));
    };

    // Add event listeners to all interactive elements
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], [data-cursor-hover]'
      );

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter as EventListener);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    addInteractiveListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      observer.disconnect();
      
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], [data-cursor-hover]'
      );
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Hide default cursor on desktop (not touch devices)
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      document.body.style.cursor = 'none';
      return () => {
        document.body.style.cursor = '';
      };
    }
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: cursorState.isHovering ? 2 : 1,
        backgroundColor: cursorState.isHovering ? '#ffffff' : '#4585f4',
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-current" />
      {cursorState.label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
                     text-xs font-medium text-white bg-black/80 px-3 py-1 rounded-full"
        >
          {cursorState.label}
        </motion.div>
      )}
    </motion.div>
  );
}

