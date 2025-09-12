import { useEffect, useRef, useCallback } from 'react';

// Simple scroll animation hook
export const useScrollAnimation = (options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  duration?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef(false);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
    duration = 300
  } = options || {};

  const animateElement = useCallback((element: Element, isVisible: boolean) => {
    if (isVisible) {
      element.classList.add('animate-fade-in');
      element.classList.remove('opacity-0');
    } else if (!once) {
      element.classList.remove('animate-fade-in');
      element.classList.add('opacity-0');
    }
  }, [once]);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Set initial state
    currentElement.classList.add('opacity-0');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          if (once && hasAnimatedRef.current && isVisible) {
            return;
          }
          
          if (isVisible) {
            hasAnimatedRef.current = true;
            animateElement(entry.target, true);
            
            if (once) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!once) {
            animateElement(entry.target, false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(currentElement);

    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
      }
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, once, animateElement]);

  return elementRef;
};

// Simple hook for multiple elements
export const useScrollAnimationMultiple = (
  count: number,
  options?: {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
    staggerDelay?: number;
    duration?: number;
  }
) => {
  const elementRefs = useRef<(HTMLDivElement | null)[]>(new Array(count).fill(null));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatedElements = useRef<Set<Element>>(new Set());

  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
    staggerDelay = 100,
    duration = 300
  } = options || {};

  const animateElement = useCallback((element: Element, index: number, isVisible: boolean) => {
    if (isVisible) {
      const delay = index * staggerDelay;
      
      setTimeout(() => {
        element.classList.add('animate-fade-in');
        element.classList.remove('opacity-0');
      }, delay);
      
    } else if (!once) {
      element.classList.remove('animate-fade-in');
      element.classList.add('opacity-0');
    }
  }, [staggerDelay, once]);

  useEffect(() => {
    const elements = elementRefs.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    // Set initial states
    elements.forEach((element) => {
      if (element) {
        element.classList.add('opacity-0');
      }
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          const elementIndex = elements.indexOf(entry.target as HTMLDivElement);
          
          if (elementIndex === -1) return;
          
          if (once && animatedElements.current.has(entry.target) && isVisible) {
            return;
          }
          
          if (isVisible) {
            animatedElements.current.add(entry.target);
            animateElement(entry.target, elementIndex, true);
            
            if (once) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!once) {
            animateElement(entry.target, elementIndex, false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [count, threshold, rootMargin, once, animateElement]);

  const setElementRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    elementRefs.current[index] = element;
  }, []);

  return { setElementRef, elementRefs: elementRefs.current };
};