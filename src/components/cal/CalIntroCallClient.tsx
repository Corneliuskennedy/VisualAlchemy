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
  
  // DISABLED CODE REMOVED - contained import("@calcom/embed-react") which webpack was analyzing
  // Will restore once we implement proper client-only solution
}

