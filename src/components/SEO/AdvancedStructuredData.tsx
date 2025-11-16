import React, { useEffect } from 'react';
import { generateFAQSchema, homepageFAQs } from '@/lib/seo/GEOSEO';
import { generateKnowledgeGraphConnections } from '@/lib/seo/EntityFirstSEO';
import { MultiSchemaInjector } from './StructuredDataInjector';

interface AdvancedStructuredDataProps {
  pageType: string;
  url: string;
  title: string;
  description: string;
  language?: string;
}

export function AdvancedStructuredData({ 
  pageType, 
  url, 
  title, 
  description, 
  language = 'en' 
}: AdvancedStructuredDataProps) {
  const baseUrl = 'https://www.octomatic.ai';
  
  // Organization Schema (appears on all pages)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Octomatic",
    "alternateName": "Octomatic AI Automation",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo/octomatic-800.png`,
      "width": 800,
      "height": 400
    },
    "description": "Leading AI automation agency in Amsterdam helping businesses scale smarter with custom automation solutions",
    "foundingDate": "2019",
    "numberOfEmployees": "5-10",
    "industry": "Business Automation",
    "knowsAbout": [
      "AI Automation",
      "Business Process Automation", 
      "Workflow Optimization",
      "CRM Implementation",
      "GDPR Compliance",
      "Custom AI Solutions"
    ],
    "sameAs": [
      "https://www.linkedin.com/company/octomatic-ai/",
      "https://twitter.com/octomatic_ai"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe haven 27A",
      "addressLocality": "Naarden",
      "addressRegion": "Noord-Holland",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3676,
      "longitude": 4.9041
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+316-46402090",
        "contactType": "customer service",
        "availableLanguage": ["English", "Dutch"],
        "areaServed": "NL",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "ContactPoint",
        "email": "hello@octomatic.ai",
        "contactType": "sales",
        "availableLanguage": ["English", "Dutch"],
        "areaServed": ["NL", "EU"]
      },
      {
        "@type": "ContactPoint",
        "url": "https://wa.me/31646402090",
        "contactType": "customer support",
        "name": "WhatsApp Support",
        "availableLanguage": ["English", "Dutch"],
        "areaServed": "NL"
      }
    ]
  };

  // LocalBusiness Schema (for Amsterdam targeting)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "parentOrganization": { "@id": `${baseUrl}/#organization` },
    "name": "Octomatic Amsterdam",
    "image": `${baseUrl}/logo/octomatic-800.png`,
    "url": baseUrl,
    "telephone": "+316-46402090",
    "email": "kennet@octomatic.ai",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nieuwe haven 27A",
      "addressLocality": "Naarden",
      "addressRegion": "Noord-Holland",
      "postalCode": "1411 SG",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3676,
      "longitude": 4.9041
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "serviceArea": [
      {
        "@type": "City",
        "name": "Amsterdam"
      },
      {
        "@type": "Country",
        "name": "Netherlands"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation Consulting",
            "description": "Custom AI automation solutions for business process optimization"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Implementation",
            "description": "Sales system buildouts that scale like 8-figure organizations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Workflow Optimization",
            "description": "Process automation and workflow streamlining services"
          }
        }
      ]
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Octomatic",
    "description": "AI Automation Agency in Amsterdam",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  // Add breadcrumb items based on URL
  if (url !== '/') {
    const pathSegments = url.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      const segmentUrl = `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`;
      const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": segmentUrl
      });
    });
  }

  // Page-specific schemas
  const getPageSpecificSchema = () => {
    switch (pageType) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          "url": url,
          "name": title,
          "description": description,
          "isPartOf": { "@id": `${baseUrl}/#website` },
          "about": { "@id": `${baseUrl}/#organization` },
          "mainEntity": { "@id": `${baseUrl}/#organization` }
        };
        
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": url,
          "name": title,
          "description": description,
          "url": url,
          "provider": { "@id": `${baseUrl}/#organization` },
          "areaServed": {
            "@type": "Country",
            "name": "Netherlands"
          },
          "serviceType": "Business Automation"
        };
        
      case 'contact':
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": url,
          "name": title,
          "description": description,
          "url": url,
          "isPartOf": { "@id": `${baseUrl}/#website` },
          "mainEntity": { "@id": `${baseUrl}/#organization` }
        };
        
      case 'blog':
        return {
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": url,
          "name": title,
          "description": description,
          "url": url,
          "publisher": { "@id": `${baseUrl}/#organization` },
          "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US'
        };
        
      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          "url": url,
          "name": title,
          "description": description,
          "isPartOf": { "@id": `${baseUrl}/#website` }
        };
    }
  };

  // FAQ Schema for pages with FAQ content
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI automation combines artificial intelligence with business process automation to streamline workflows, reduce manual tasks, and improve operational efficiency."
        }
      },
      {
        "@type": "Question", 
        "name": "How can AI automation help my Amsterdam business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI automation can help Amsterdam businesses by optimizing workflows, improving customer service, reducing operational costs, and enabling scalable growth through intelligent process automation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ROI of AI automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses see ROI within 3-6 months of implementing AI automation, with typical returns ranging from 200-500% through cost savings and efficiency gains."
        }
      }
    ]
  };

  const schemas: any[] = [
    organizationSchema,
    localBusinessSchema, 
    websiteSchema,
    breadcrumbSchema,
    getPageSpecificSchema()
  ];

  // Add FAQ schema for homepage and service pages (GEO optimization)
  if (pageType === 'home' || pageType === 'service') {
    schemas.push(faqSchema);
  }

  // Add FAQ schema for GEO (Generative Engine Optimization) - 2025 SEO standard
  if (pageType === 'home') {
    const geoFAQSchema = generateFAQSchema(homepageFAQs, url);
    schemas.push(geoFAQSchema);
  }

  // Add Knowledge Graph connections for Entity-First SEO
  if (pageType === 'home') {
    const knowledgeGraphSchemas = generateKnowledgeGraphConnections();
    schemas.push(...knowledgeGraphSchemas);
  }

  // Inject structured data scripts directly (replaces Helmet)
  useEffect(() => {
    schemas.forEach((schema, index) => {
      const scriptId = `advanced-structured-data-${index}`;
      let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(schema);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      schemas.forEach((_, index) => {
        const scriptId = `advanced-structured-data-${index}`;
        const scriptElement = document.getElementById(scriptId);
        if (scriptElement) {
          scriptElement.remove();
        }
      });
    };
  }, [schemas]);

  return (
    <>
      {/* Direct injection for App Router compatibility */}
      <MultiSchemaInjector 
        schemas={schemas.map((schema, index) => ({
          id: `advanced-${index}`,
          data: schema,
        }))}
      />
    </>
  );
} 