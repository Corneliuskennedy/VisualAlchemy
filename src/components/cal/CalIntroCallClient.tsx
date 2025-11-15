'use client';

import { useEffect } from 'react';

/**
 * Client-only component for Cal.com initialization
 * Prevents SSR issues by only running on client side
 */
export function CalIntroCallClient() {
  // TEMPORARILY DISABLED: Cal.com causing SSR build errors
  // Will be re-enabled once we fix the webpack bundling issue
  // The buttons still have data-cal-* attributes and will work if Cal.com is initialized via script tag
  return null;
  
  /* DISABLED CODE - Re-enable once SSR issue is fixed
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') {
      return;
    }

    // Dynamically import and initialize Cal.com
    import('@/hooks/use-cal').then(({ useCalIntroCall }) => {
      // This will be called but hooks can't be called conditionally
      // So we'll handle initialization directly here
      const initCal = async () => {
        try {
          const { getCalApi } = await import("@calcom/embed-react");
          const cal = await getCalApi({ namespace: "intro-call-30-minutes" });
          if (cal && typeof cal === 'function') {
            cal("ui", {
              hideEventTypeDetails: false,
              layout: "month_view"
            });
          }
        } catch (error) {
          console.error('Failed to initialize Cal.com:', error);
        }
      };
      
      initCal();
    });
  }, []);
  */
}

