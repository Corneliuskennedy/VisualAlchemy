/**
 * Server-Side Structured Data Component
 * 
 * Uses Next.js Script component with beforeInteractive strategy
 * to ensure structured data is in the initial HTML for Google crawlers.
 * 
 * This is critical for SEO - Google's crawler doesn't execute JavaScript,
 * so client-side injection won't be seen.
 */

import Script from 'next/script';

interface ServerStructuredDataProps {
  schemas: object[];
}

export function ServerStructuredData({ schemas }: ServerStructuredDataProps) {
  // Generate JSON-LD string
  const jsonLd = schemas.length === 1 
    ? JSON.stringify(schemas[0])
    : JSON.stringify(schemas);

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`structured-data-${index}`}
          id={`structured-data-server-${index}`}
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

