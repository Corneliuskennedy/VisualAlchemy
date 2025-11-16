/**
 * Entity-First SEO Implementation (2025 Standards)
 * 
 * Implements knowledge graph optimization and entity relationships
 * for better search engine understanding and AI citation optimization.
 * 
 * Key Features:
 * - Person schema for team members (E-E-A-T signals)
 * - Entity relationships (worksFor, knowsAbout, hasCredential)
 * - Knowledge graph connections
 * - Consistent entity naming
 */

import { Author } from '@/types/author';

const BASE_URL = 'https://www.octomatic.ai';

/**
 * Generate Person schema for team members
 * Critical for E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
 * 
 * @param {Author} author - Author/team member data
 * @returns {object} Person schema object
 */
export function generatePersonSchema(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person/${author.slug}`,
    "name": author.name,
    "jobTitle": author.title,
    "description": author.bio,
    "image": {
      "@type": "ImageObject",
      "url": `${BASE_URL}${author.imagePath}`,
      "width": 800,
      "height": 800
    },
    "url": `${BASE_URL}/author/${author.slug}`,
    "worksFor": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Octomatic",
      "url": BASE_URL
    },
    "knowsAbout": author.expertise || [
      "AI Automation",
      "Business Process Optimization",
      "GDPR Compliance",
      "Workflow Automation"
    ],
    "hasCredential": author.qualifications?.map(qual => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional",
      "description": qual
    })) || [],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": author.location || "Naarden",
      "addressRegion": "Noord-Holland",
      "addressCountry": "NL"
    },
    "sameAs": Object.values(author.socialProfiles || {}).filter(Boolean),
    "email": author.email,
    "alumniOf": author.qualifications?.filter(q => q.includes("University") || q.includes("College")).map(qual => ({
      "@type": "EducationalOrganization",
      "name": qual.split("(")[1]?.replace(")", "") || qual
    })) || []
  };
}

/**
 * Generate Organization schema with enhanced entity relationships
 * 
 * @param {object} options - Organization options
 * @returns {object} Enhanced Organization schema
 */
export function generateEnhancedOrganizationSchema(options: {
  language?: 'en' | 'nl';
  includeEmployees?: boolean;
  employees?: Author[];
} = {}) {
  const { language = 'en', includeEmployees = false, employees = [] } = options;
  
  const baseSchema = {
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
      "height": 156
    },
    "description": language === 'nl'
      ? "Toonaangevend AI automatiseringsbureau in Amsterdam dat bedrijven helpt slimmer te schalen met aangepaste automatiseringsoplossingen."
      : "Leading AI automation agency in Amsterdam helping businesses scale smarter with custom automation solutions.",
    "foundingDate": "2019",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amsterdam",
        "addressRegion": "Noord-Holland",
        "addressCountry": "NL"
      }
    },
    "numberOfEmployees": "5-10",
    "industry": "Business Automation",
    "knowsAbout": [
      "AI Automation",
      "Business Process Automation",
      "Workflow Optimization",
      "CRM Implementation",
      "GDPR Compliance",
      "Custom AI Solutions",
      "Cursor AI Development",
      "Next.js Development",
      "TypeScript Development"
    ],
    "award": [
      "Best Business Process Optimization 2024"
    ],
    "sameAs": [
      "https://www.linkedin.com/company/octomatic-ai/",
      "https://twitter.com/octomatic_ai",
      "https://www.facebook.com/octomatic.ai"
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
    }
  };

  // Add employee relationships for Entity-First SEO
  if (includeEmployees && employees.length > 0) {
    return {
      ...baseSchema,
      "employee": employees.map(emp => ({
        "@type": "Person",
        "@id": `${BASE_URL}/#person/${emp.slug}`,
        "name": emp.name,
        "jobTitle": emp.title
      }))
    };
  }

  return baseSchema;
}

/**
 * Generate Service schema with entity relationships
 * 
 * @param {object} service - Service data
 * @returns {object} Service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
  offers?: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType,
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Octomatic"
    },
    "areaServed": (service.areaServed || ["Amsterdam", "Netherlands"]).map(area => ({
      "@type": "Place",
      "name": area
    })),
    "offers": service.offers || {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR"
    }
  };
}

/**
 * Generate Knowledge Graph connections
 * Creates relationships between entities for better search understanding
 * 
 * @returns {object[]} Array of entity relationship schemas
 */
export function generateKnowledgeGraphConnections() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Octomatic Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "AI Automation",
            "url": `${BASE_URL}/optimize`
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "MVP Development",
            "url": `${BASE_URL}/build`
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Website Development",
            "url": BASE_URL
          }
        }
      ]
    }
  ];
}


