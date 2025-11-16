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
  
  // DISABLED CODE REMOVED - contained import("@calcom/embed-react") which webpack was analyzing
  // Will restore once we implement proper client-only solution
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