/**
 * Behavior Tracking Hook
 * 
 * Tracks user behavior for intent detection
 * Records scroll, click, hover, and navigation events
 * 
 * Technical Showcase:
 * - Real-time behavior tracking
 * - Privacy-compliant (client-side only)
 * - Performance-optimized (throttled events)
 */

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { getIntentDetector } from '@/lib/personalization/IntentDetector';
import { BehaviorSignal } from '@/lib/personalization/types';

export const useBehaviorTracking = () => {
  const pathname = usePathname();
  const detector = getIntentDetector();

  // Throttle function for performance
  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    return (...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Track scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      const timeDelta = currentTime - lastScrollTime;
      const scrollSpeed = timeDelta > 0 ? scrollDelta / (timeDelta / 1000) : 0; // px/s

      const signal: BehaviorSignal = {
        type: 'scroll',
        value: scrollSpeed,
        metadata: {
          scrollY: currentScrollY,
          scrollDepth: (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
        },
        timestamp: Date.now(),
      };

      detector.recordSignal(signal);

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    }, 100); // Throttle to 100ms

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detector, throttle]);

  // Track clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target;
      if (target && target instanceof HTMLElement) {
        const signal: BehaviorSignal = {
          type: 'click',
          metadata: {
            target: target.tagName,
            text: target.textContent?.substring(0, 50),
            href: (target as HTMLAnchorElement).href || undefined,
            dataCta: target.getAttribute('data-cta') || undefined,
          },
          timestamp: Date.now(),
        };

        detector.recordSignal(signal);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [detector]);

  // Track hovers (on CTA buttons)
  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an HTMLElement and has the data-cta attribute
      if (target && target instanceof HTMLElement && target.hasAttribute('data-cta')) {
        const signal: BehaviorSignal = {
          type: 'hover',
          metadata: {
            target: target.tagName,
            dataCta: target.getAttribute('data-cta'),
          },
          timestamp: Date.now(),
        };

        detector.recordSignal(signal);
      }
    };

    document.addEventListener('mouseenter', handleHover, true);
    return () => document.removeEventListener('mouseenter', handleHover, true);
  }, [detector]);

  // Track navigation
  useEffect(() => {
    const signal: BehaviorSignal = {
      type: 'navigation',
      metadata: {
        path: pathname,
      },
      timestamp: Date.now(),
    };

    detector.recordSignal(signal);
  }, [pathname, detector]);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const timeOnPage = (Date.now() - startTime) / 1000; // seconds
      
      const signal: BehaviorSignal = {
        type: 'time-on-page',
        value: timeOnPage,
        timestamp: Date.now(),
      };

      detector.recordSignal(signal);
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [pathname, detector]);

  // Track content views (when sections come into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const signal: BehaviorSignal = {
              type: 'content-view',
              metadata: {
                content: entry.target.textContent?.substring(0, 100),
                section: entry.target.id || entry.target.className,
              },
              timestamp: Date.now(),
            };

            detector.recordSignal(signal);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section, [data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [pathname, detector]);
};

export default useBehaviorTracking;

