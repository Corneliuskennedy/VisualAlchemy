import * as React from "react"

// Align with Tailwind's default breakpoints for consistency
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => window.innerWidth < BREAKPOINTS.md;

    let timeoutId: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(checkMobile()), 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    setIsMobile(checkMobile());

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return !!isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Changed to be more precise: anything below xl breakpoint
    const checkTablet = () => window.innerWidth < BREAKPOINTS.xl;

    let timeoutId: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsTablet(checkTablet()), 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    setIsTablet(checkTablet());

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return !!isTablet;
}
