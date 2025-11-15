import { useEffect, useRef } from "react";

// Global set to track initialized namespaces across all components
// Only create on client side to prevent SSR issues
const getGlobalInitialized = (): Set<string> => {
  if (typeof window === 'undefined') {
    return new Set<string>();
  }
  if (!(globalThis as any).__calInitialized) {
    (globalThis as any).__calInitialized = new Set<string>();
  }
  return (globalThis as any).__calInitialized;
};

export const useCal = (namespace: string, config: any = {}) => {
  // TEMPORARILY DISABLED: Cal.com causing SSR build errors
  // Will be re-enabled once we fix the webpack bundling issue
  // The buttons still have data-cal-* attributes and will work if Cal.com is initialized via script tag
  return;
  
  /* DISABLED CODE - Re-enable once SSR issue is fixed
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // SSR safety check - only run on client
    if (typeof window === 'undefined') {
      return;
    }
    
    const globalInitialized = getGlobalInitialized();
    
    // Prevent multiple initializations globally and per component
    if (hasInitialized.current || globalInitialized.has(namespace)) {
      return;
    }
    
    hasInitialized.current = true;
    globalInitialized.add(namespace);
    
    (async function () {
      try {
        // Dynamically import Cal.com only on client side to avoid SSR issues
        // This will fail silently during SSR if webpack IgnorePlugin is used
        const calModule = await import("@calcom/embed-react").catch(() => null);
        if (!calModule) {
          // Cal.com not available (likely SSR or build-time)
          return;
        }
        
        const { getCalApi } = calModule;
        if (!getCalApi) {
          return;
        }
        
        const cal = await getCalApi({ namespace });
        // Check if cal is a function before calling
        if (cal && typeof cal === 'function') {
          cal("ui", config);
          
          // Only log in development mode
          if (process.env.NODE_ENV === 'development') {
            console.log(`📅 Cal.com initialized: ${namespace}`);
          }
        } else {
          console.warn(`Cal.com API returned non-function for ${namespace}:`, cal);
        }
        
      } catch (error) {
        // Silently fail during SSR/build - Cal.com is client-only
        if (typeof window === 'undefined') {
          return;
        }
        console.error(`Failed to initialize Cal.com for ${namespace}:`, error);
        // Remove from global set on error so it can be retried
        if (typeof window !== 'undefined') {
          const globalInitialized = getGlobalInitialized();
          globalInitialized.delete(namespace);
        }
        hasInitialized.current = false;
      }
    })();
  }, [namespace]); // Remove config from dependencies to prevent re-initialization
  */
};

export const useCalWorkshop = () => {
  useCal("automation-strategy-workshop", {
    hideEventTypeDetails: false,
    layout: "month_view"
  });
};

export const useCalIntroCall = () => {
  useCal("intro-call-30-minutes", {
    hideEventTypeDetails: false,
    layout: "month_view"
  });
}; 