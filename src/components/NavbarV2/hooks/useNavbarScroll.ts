/**
 * Navbar Scroll Hook
 * Handles scroll-based behavior for navbar visibility
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UseNavbarScrollOptions {
  threshold?: number;
  hideOnScrollDown?: boolean;
  showOnScrollUp?: boolean;
}

export function useNavbarScroll(options: UseNavbarScrollOptions = {}) {
  const {
    threshold = 100,
    hideOnScrollDown = true,
    showOnScrollUp = true,
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;

        // Update scrolled state
        setIsScrolled(currentScrollY > threshold);

        // Handle visibility based on scroll direction
        if (!prefersReducedMotion) {
          if (hideOnScrollDown && scrollDifference > 5 && currentScrollY > threshold) {
            setIsVisible(false);
          } else if (showOnScrollUp && scrollDifference < -5) {
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold, hideOnScrollDown, showOnScrollUp, prefersReducedMotion]);

  useEffect(() => {
    // Initialize scroll position
    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > threshold);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, threshold]);

  return {
    isVisible,
    isScrolled,
  };
}



