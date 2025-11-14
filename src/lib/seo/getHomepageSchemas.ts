/**
 * Generate Homepage Structured Data Schemas
 * 
 * Server-side function to generate structured data for homepage.
 * This ensures Google's crawler can see the structured data.
 */

const BASE_URL = 'https://www.octomatic.ai';

export function getHomepageSchemas() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Octomatic",
    "alternateName": "Octomatic AI Automation",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/logo/octomatic-800.png`,
      "width": 800,
      "height": 400
    },
    "description": "Leading AI automation agency in Amsterdam helping businesses scale smarter with custom automation solutions",
    "foundingDate": "2019",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe haven 27A",
      "addressLocality": "Naarden",
      "addressRegion": "Noord-Holland",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+316-46402090",
      "contactType": "customer service",
      "email": "kennet@octomatic.ai"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    "name": "Octomatic Amsterdam",
    "url": BASE_URL,
    "telephone": "+316-46402090",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe haven 27A",
      "addressLocality": "Naarden",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3676,
      "longitude": 4.9041
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Octomatic",
    "publisher": { "@id": `${BASE_URL}/#organization` }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": BASE_URL,
    "url": BASE_URL,
    "name": "Build. Optimize. Create. | Octomatic",
    "description": "We build the automated systems and create the engaging content that drives intelligent growth.",
    "isPartOf": { "@id": `${BASE_URL}/#website` }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }]
  };

  return [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    webPageSchema,
    breadcrumbSchema
  ];
}

