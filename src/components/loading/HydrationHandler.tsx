/**
 * Hydration Handler
 * 
 * Handles smooth hydration and prevents layout shifts
 * Marks HTML as loaded after hydration completes
 */

'use client';

import { useEffect } from 'react';

export const HydrationHandler: React.FC = () => {
  useEffect(() => {
    // Mark HTML as loaded immediately - no delay
    document.documentElement.classList.add('loaded');
  }, []);

  return null;
};

export default HydrationHandler;

