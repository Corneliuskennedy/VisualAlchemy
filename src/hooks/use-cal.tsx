import { useEffect, useRef } from "react";

// Global set to track initialized namespaces across all components
const globalInitialized = new Set<string>();

export const useCal = (namespace: string, config: any = {}) => {
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // SSR safety check - only run on client
    if (typeof window === 'undefined') {
      return;
    }
    
    // Prevent multiple initializations globally and per component
    if (hasInitialized.current || globalInitialized.has(namespace)) {
      return;
    }
    
    hasInitialized.current = true;
    globalInitialized.add(namespace);
    
    (async function () {
      try {
        // Dynamically import Cal.com only on client side to avoid SSR issues
        const { getCalApi } = await import("@calcom/embed-react");
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
        console.error(`Failed to initialize Cal.com for ${namespace}:`, error);
        // Remove from global set on error so it can be retried
        globalInitialized.delete(namespace);
        hasInitialized.current = false;
      }
    })();
  }, [namespace]); // Remove config from dependencies to prevent re-initialization
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