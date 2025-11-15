'use client';

import { useEffect } from 'react';

/**
 * CriticalCSS Component
 * 
 * Inlines critical CSS and defers non-critical CSS loading
 * This improves FCP and LCP by reducing render-blocking CSS
 */
export function CriticalCSS() {
  useEffect(() => {
    // Defer non-critical CSS loading
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    
    linkElements.forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      // Only defer if not already loaded
      if (!linkElement.dataset.deferred && linkElement.href) {
        linkElement.media = 'print';
        linkElement.onload = () => {
          linkElement.media = 'all';
        };
        linkElement.dataset.deferred = 'true';
      }
    });
  }, []);

  return null;
}

/**
 * Critical CSS styles that should be inlined in the <head>
 * These are extracted from globals.css and are above-the-fold critical styles
 */
export const criticalCSS = `
/* Critical CSS - Above the fold styles */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
  --font-archivo: 'Archivo', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-archivo);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Critical hero styles */
h1 {
  font-family: var(--font-archivo);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

/* Prevent layout shift */
img {
  max-width: 100%;
  height: auto;
}

/* Critical loading state */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
`;


