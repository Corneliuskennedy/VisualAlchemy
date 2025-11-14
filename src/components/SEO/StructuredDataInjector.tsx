/**
 * StructuredDataInjector Component
 * 
 * Directly injects JSON-LD structured data into the document head.
 * Works around react-helmet-async limitations in Next.js App Router.
 * 
 * This component ensures structured data is properly rendered for SEO.
 * 
 * @component
 */

'use client';

import { useEffect, useRef } from 'react';

interface StructuredDataInjectorProps {
  /**
   * Structured data object or array of objects
   */
  data: object | object[];
  
  /**
   * Unique ID for the script element
   */
  id?: string;
  
  /**
   * Key to force re-render when data changes
   */
  key?: string;
}

export function StructuredDataInjector({ 
  data, 
  id = 'structured-data-main' 
}: StructuredDataInjectorProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Remove existing script if present
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    
    // Append to head
    document.head.appendChild(script);
    scriptRef.current = script;

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      scriptRef.current = null;
    };
  }, [data, id]);

  // This component doesn't render anything
  return null;
}

/**
 * MultiSchemaInjector - For injecting multiple schemas
 */
interface MultiSchemaInjectorProps {
  schemas: Array<{ id: string; data: object }>;
}

export function MultiSchemaInjector({ schemas }: MultiSchemaInjectorProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove all existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      // Only remove our injected scripts (keep others if any)
      if (script.id && script.id.startsWith('structured-data-')) {
        script.remove();
      }
    });

    // Inject all schemas
    schemas.forEach(({ id, data }) => {
      const script = document.createElement('script');
      script.id = `structured-data-${id}`;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      schemas.forEach(({ id }) => {
        const script = document.getElementById(`structured-data-${id}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [schemas]);

  return null;
}

export default StructuredDataInjector;

