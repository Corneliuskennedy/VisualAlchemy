/**
 * Server-Side Structured Data Scripts
 * 
 * This component renders structured data server-side so Google's crawler can see it.
 * Uses Next.js Script component with beforeInteractive strategy.
 * 
 * IMPORTANT: This must be used in a server component or layout.
 */

import Script from 'next/script';

interface Schema {
  [key: string]: any;
}

interface ServerStructuredDataScriptsProps {
  schemas: Schema[];
}

export function ServerStructuredDataScripts({ schemas }: ServerStructuredDataScriptsProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`server-structured-data-${index}`}
          id={`server-structured-data-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

