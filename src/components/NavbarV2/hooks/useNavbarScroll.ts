/**
 * Navbar Scroll Hook
 * Handles scroll-based behavior for navbar visibility
 * Premium "soft close doors" effect - hides when sections are about to clash
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UseNavbarScrollOptions {
  threshold?: number;
  hideOnScrollDown?: boolean;
  showOnScrollUp?: boolean;
  clashDetectionDistance?: number; // Distance before clash to start hiding
}

export function useNavbarScroll(options: UseNavbarScrollOptions = {}) {
  const {
    threshold = 100,
    hideOnScrollDown = true,
    showOnScrollUp = true,
    clashDetectionDistance = 120, // Start hiding 120px before clash
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const navbarHeight = 80; // Approximate navbar height

  // Check if navbar is about to clash with content sections
  const checkClash = useCallback(() => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Find first content section that's approaching navbar
    const sections = document.querySelectorAll('section[id], section[class*="snap-start"]');
    
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + currentScrollY;
      
      // Check if section is approaching navbar position
      // Start hiding when section is within clashDetectionDistance of navbar
      if (rect.top < clashDetectionDistance && rect.top > -rect.height) {
        return true; // Clash detected
      }
    }
    
    return false;
  }, [clashDetectionDistance]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;
        const scrollSpeed = Math.abs(scrollDifference);
        const willClash = checkClash();

        // Update scrolled state
        setIsScrolled(currentScrollY > threshold);

        // Elite scroll behavior - smooth and premium
        if (!prefersReducedMotion) {
          // Always show when scrolling up (any amount)
          if (showOnScrollUp && scrollDifference < -2) {
            setIsVisible(true);
          }
          // Hide on scroll down only when:
          // 1. Scrolling down fast enough (smooth threshold)
          // 2. Past initial threshold
          // 3. Either about to clash OR scrolling fast
          else if (hideOnScrollDown && scrollDifference > 3 && currentScrollY > threshold) {
            if (willClash || scrollSpeed > 8) {
              setIsVisible(false);
            }
          }
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold, hideOnScrollDown, showOnScrollUp, prefersReducedMotion, checkClash]);

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



