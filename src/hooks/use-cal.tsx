import { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";

// Global set to track initialized namespaces across all components
const globalInitialized = new Set<string>();

export const useCal = (namespace: string, config: any = {}) => {
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // Prevent multiple initializations globally and per component
    if (hasInitialized.current || globalInitialized.has(namespace)) {
      return;
    }
    
    hasInitialized.current = true;
    globalInitialized.add(namespace);
    
    (async function () {
      try {
        const cal = await getCalApi({ namespace });
        cal("ui", config);
        
        // Only log in development mode
        if (process.env.NODE_ENV === 'development') {
          console.log(`📅 Cal.com initialized: ${namespace}`);
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