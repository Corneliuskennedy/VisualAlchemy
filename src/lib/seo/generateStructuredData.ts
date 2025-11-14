/**
 * Generate Structured Data for Server-Side Rendering
 * 
 * This function generates structured data that can be used in Next.js Metadata API
 * for server-side rendering, ensuring Google can crawl it.
 */

export interface StructuredDataOptions {
  pageType?: 'home' | 'blog' | 'blogPost' | 'about' | 'contact' | 'service' | 'report' | 'article';
  url: string;
  title: string;
  description: string;
  language?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
}

const BASE_URL = 'https://www.octomatic.ai';

export function generateStructuredDataSchemas(options: StructuredDataOptions) {
  const {
    pageType = 'home',
    url,
    title,
    description,
    language = 'en',
    author,
    publishedTime,
    modifiedTime,
    image,
  } = options;

  const schemas: object[] = [];

  // Organization Schema (always included)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Octomatic",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo/octomatic-800.webp`,
    "description": "AI automation solutions for Dutch businesses",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe Haven 27A",
      "addressLocality": "Naarden",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-6-46402090",
      "contactType": "Customer Service",
      "email": "kennet@octomatic.ai"
    },
    "sameAs": [
      "https://www.linkedin.com/company/octomatic",
      "https://twitter.com/octomaticai"
    ]
  };
  schemas.push(organizationSchema);

  // LocalBusiness Schema (for GEO optimization)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    "name": "Octomatic",
    "image": `${BASE_URL}/logo/octomatic-800.webp`,
    "url": BASE_URL,
    "telephone": "+31-6-46402090",
    "email": "kennet@octomatic.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe Haven 27A",
      "addressLocality": "Naarden",
      "addressRegion": "North Holland",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.2958,
      "longitude": 5.1636
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    }
  };
  schemas.push(localBusinessSchema);

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Octomatic",
    "description": description,
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  schemas.push(websiteSchema);

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      }
    ]
  };
  schemas.push(breadcrumbSchema);

  // Page-specific schemas
  if (pageType === 'home') {
    // WebPage Schema for homepage
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      "url": url,
      "name": title,
      "description": description,
      "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
      "isPartOf": {
        "@id": `${BASE_URL}/#website`
      },
      "about": {
        "@id": `${BASE_URL}/#organization`
      },
      "primaryImageOfPage": image ? {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      } : undefined
    };
    schemas.push(webPageSchema);

    // FAQPage Schema for GEO optimization
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Octomatic offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Octomatic offers AI automation solutions for Dutch businesses, including process optimization, workflow automation, and custom AI systems."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Octomatic located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Octomatic is located in Naarden, Netherlands, serving businesses throughout the Netherlands."
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  if (pageType === 'blogPost' || pageType === 'article') {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": pageType === 'blogPost' ? "BlogPosting" : "Article",
      "headline": title,
      "description": description,
      "image": image ? {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      } : undefined,
      "author": {
        "@type": "Person",
        "name": author || "Octomatic Team"
      },
      "publisher": {
        "@id": `${BASE_URL}/#organization`
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };
    schemas.push(articleSchema);
  }

  return schemas;
}

/**
 * Generate JSON-LD string for Next.js Metadata API
 */
export function generateStructuredDataJSONLD(options: StructuredDataOptions): string {
  const schemas = generateStructuredDataSchemas(options);
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}

