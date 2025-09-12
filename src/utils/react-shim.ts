import React from 'react';

// Safely determine if we're in a browser context
const isBrowser = typeof window !== 'undefined';

// Export a safe version of useLayoutEffect that works in both browser and SSR contexts
export const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

// Safely expose React for legacy scripts that might need it
if (isBrowser) {
  try {
    // Define React on window if not already defined
    if (!window.React) {
      Object.defineProperty(window, 'React', {
        value: React,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }

    // Ensure critical React APIs are available
    const requiredApis = ['createContext', 'useContext', 'useState', 'useEffect', 'useLayoutEffect'];
    requiredApis.forEach(api => {
      if (!(React as any)[api]) {
        throw new Error(`Critical React API missing: ${api}`);
      }
    });
  } catch (e) {
    throw new Error(`Failed to initialize React: ${e}`);
  }
}

// Export React to ensure it's treated as a module
export default React; 