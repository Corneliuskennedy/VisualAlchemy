import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';
import useLanguage from '@/contexts/LanguageContext';
import { AdvancedStructuredData } from './AdvancedStructuredData';

// Export the new UnifiedSEO component
export { UnifiedSEO } from './UnifiedSEO';
export type { UnifiedSEOProps } from './UnifiedSEO';

export interface SEOMetadata {
  title: string;
  meta_description: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  structured_data?: any;
  page_type?: 'home' | 'blog' | 'blogPost' | 'about' | 'contact' | 'service' | 'report' | 'article';
  published_date?: string;
  modified_date?: string;
  author?: string;
  // Enhanced schema properties
  service_type?: string;
  price_range?: string;
  area_served?: string;
  offers?: any;
  article_section?: string;
  word_count?: number;
}

const baseUrl = 'https://www.octomatic.ai';

const DEFAULT_METADATA: { [key: string]: SEOMetadata } = {
  // --- Home Page ---
  '/': {
    title: 'AI Automation Amsterdam | Octomatic Solutions',
    meta_description: 'Transform your Amsterdam business with custom AI automation solutions. Expert workflow optimization, GDPR compliance, and ROI-focused results.',
    meta_keywords: 'AI automation Amsterdam, business process automation, workflow optimization, custom AI solutions',
    og_title: 'AI Automation Amsterdam | Octomatic - Custom Solutions',
    og_description: 'Transform your Amsterdam business with custom AI automation solutions. Expert workflow optimization, GDPR compliance, and ROI-focused results.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'home'
  },
  '/nl': {
    title: 'AI Automatisering Amsterdam | Octomatic Bureau',
    meta_description: 'Wij helpen ambitieuze bedrijven in Amsterdam en daarbuiten slimmer schalen met op maat gemaakte AI-automatisering, CRM-systemen en workflow-optimalisatie. Stop met over-aannemen, start met automatiseren.',
    meta_keywords: 'AI automatisering, Amsterdam, bedrijfsautomatisering, workflow optimalisatie, CRM, bedrijf schalen',
    og_title: 'Octomatic | AI Automatisering Bureau voor Ambitieuze Bedrijven',
    og_description: 'Schaal slimmer met op maat gemaakte AI-automatisering. Wij helpen bedrijven in Amsterdam processen te optimaliseren en kosten te verlagen.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'home'
  },

  // --- Blog Index ---
  '/blog': {
    title: 'AI Automation Blog | Insights & Best Practices',
    meta_description: 'Latest insights on AI automation, business process optimization, and digital transformation. Expert tips, case studies, and industry trends.',
    meta_keywords: 'AI automation blog, automation insights, business process blog, AI trends',
    og_title: 'AI Automation Blog | Industry Insights & Best Practices | Octomatic',
    og_description: 'Latest insights on AI automation, business process optimization, and digital transformation. Expert tips, case studies, and industry trends.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'blog'
  },
  '/nl/blog': {
    title: 'AI Automatisering Blog | Inzichten & Strategieën',
    meta_description: 'Ontdek deskundige inzichten over AI-automatisering, bedrijfsefficiëntie en schaalstrategieën. De Octomatic blog is uw bron om voorop te blijven in het AI-tijdperk.',
    meta_keywords: 'AI automatisering blog, business automatisering, AI inzichten, Octomatic blog, schaalstrategieën',
    og_title: 'AI Automatisering Blog | Inzichten door Octomatic',
    og_description: 'Deskundige inzichten over AI-automatisering, bedrijfsefficiëntie en schaalstrategieën.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'blog'
  },

  // --- Core Service Pages ---
  '/services': {
    title: 'AI Automation Services | Custom Solutions',
    meta_description: 'Comprehensive AI automation services including custom solutions, workflow optimization, GDPR compliance, and ROI consulting. Transform your business processes today.',
    meta_keywords: 'AI automation services, custom AI solutions, workflow optimization, business automation',
    og_title: 'AI Automation Services | Custom Solutions & Workflow Optimization',
    og_description: 'Comprehensive AI automation services including custom solutions, workflow optimization, GDPR compliance, and ROI consulting. Transform your business processes today.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/contact': {
    title: 'Contact AI Automation Expert | Octomatic',
    meta_description: 'Get in touch with Kennet Timmers, founder of Octomatic. Expert in AI automation, workflow optimization, and business process automation. Book your consultation today.',
    meta_keywords: 'contact Kennet Timmers, AI automation consultant, business automation expert, Amsterdam',
    og_title: 'Contact Kennet Timmers - AI Automation Expert | Octomatic',
    og_description: 'Get in touch with Kennet Timmers, founder of Octomatic. Expert in AI automation, workflow optimization, and business process automation. Book your consultation today.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'contact'
  },
  '/get-started': {
    title: 'Get Started with AI Automation | Free Consultation',
    meta_description: 'Start your AI automation journey today. Book a free consultation to discuss your business needs and discover how automation can transform your operations.',
    meta_keywords: 'get started AI automation, free consultation, business automation, workflow optimization',
    og_title: 'Get Started with AI Automation | Free Consultation | Octomatic',
    og_description: 'Start your AI automation journey today. Book a free consultation to discuss your business needs and discover how automation can transform your operations.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/checklist': {
    title: 'GDPR Compliance Checklist | Free Assessment Tool',
    meta_description: 'Free GDPR compliance checklist and assessment tool. Evaluate your data protection measures and identify compliance gaps.',
    meta_keywords: 'GDPR checklist, compliance assessment, data protection checklist, GDPR tool',
    og_title: 'GDPR Compliance Checklist | Free Assessment Tool | Octomatic',
    og_description: 'Free GDPR compliance checklist and assessment tool. Evaluate your data protection measures and identify compliance gaps.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/tools/automation-roi-calculator': {
    title: 'ROI Calculator | Automation Investment Tool',
    meta_description: 'Free automation ROI calculator. Calculate potential returns on your automation investments and plan your digital transformation strategy.',
    meta_keywords: 'automation ROI calculator, ROI calculator, automation investment, business calculator',
    og_title: 'Automation ROI Calculator | Calculate Your Investment Returns',
    og_description: 'Free automation ROI calculator. Calculate potential returns on your automation investments and plan your digital transformation strategy.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },

  // --- Specific Service Pages ---
  '/services/ai-automation-amsterdam': {
    title: 'AI Automation Amsterdam | Local Business Services',
    meta_description: 'Expert AI automation services in Amsterdam. Local business process optimization, workflow automation, and digital transformation for Dutch companies.',
    meta_keywords: 'AI automation Amsterdam, business automation Netherlands, workflow optimization Amsterdam, Dutch business automation',
    og_title: 'AI Automation Amsterdam | Local Business Process Optimization',
    og_description: 'Expert AI automation services in Amsterdam. Local business process optimization, workflow automation, and digital transformation for Dutch companies.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },


  '/services/ai-service-fulfillment': {
    title: 'AI Service Fulfillment | Automated Service Delivery',
    meta_description: 'Automate your service delivery with AI-powered fulfillment systems. Streamline operations, improve customer satisfaction, and scale efficiently.',
    meta_keywords: 'AI service fulfillment, automated service delivery, service automation, customer fulfillment',
    og_title: 'AI Service Fulfillment | Automated Service Delivery | Octomatic',
    og_description: 'Automate your service delivery with AI-powered fulfillment systems. Streamline operations, improve customer satisfaction, and scale efficiently.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/services/automation-roi-consulting': {
    title: 'ROI Consulting | Automation Investment Returns',
    meta_description: 'Expert ROI consulting for automation projects. Maximize your investment returns with data-driven automation strategies and performance optimization.',
    meta_keywords: 'automation ROI, ROI consulting, automation investment, business automation returns',
    og_title: 'Automation ROI Consulting | Maximize Your Investment Returns',
    og_description: 'Expert ROI consulting for automation projects. Maximize your investment returns with data-driven automation strategies and performance optimization.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/services/gdpr-automation': {
    title: 'GDPR Automation | Compliance Solutions | Data Protection',
    meta_description: 'Automate GDPR compliance with AI-powered data protection solutions. Ensure regulatory compliance while maintaining operational efficiency.',
    meta_keywords: 'GDPR automation, compliance automation, data protection, GDPR compliance',
    og_title: 'GDPR Automation | Compliance Solutions | Data Protection',
    og_description: 'Automate GDPR compliance with AI-powered data protection solutions. Ensure regulatory compliance while maintaining operational efficiency.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/services/sops-consulting': {
    title: 'SOP Consulting & Process Optimization | Octomatic',
    meta_description: 'Develop standardized operating procedures (SOPs) that streamline your business. Our SOP consulting helps you document, optimize, and automate core processes for scalability.',
    meta_keywords: 'SOP consulting, process optimization, standard operating procedures, business documentation',
    og_title: 'SOP Consulting & Process Optimization | Octomatic',
    og_description: 'Develop standardized operating procedures (SOPs) that streamline your business and enable automation.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },
  '/nl/services/sops-consulting': {
    title: 'SOP Consulting & Procesoptimalisatie | Octomatic',
    meta_description: 'Ontwikkel gestandaardiseerde operationele procedures (SOPs) die uw bedrijf stroomlijnen. Onze SOP-consulting helpt u kernprocessen te documenteren, optimaliseren en automatiseren voor schaalbaarheid.',
    meta_keywords: 'SOP consulting, procesoptimalisatie, standaard operationele procedures, bedrijfsdocumentatie',
    og_title: 'SOP Consulting & Procesoptimalisatie | Octomatic',
    og_description: 'Ontwikkel gestandaardiseerde operationele procedures (SOPs) die uw bedrijf stroomlijnen en automatisering mogelijk maken.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'service'
  },

  // --- Legal Pages ---
  '/privacy': { 
    title: 'Privacy Policy | Data Protection | Octomatic', 
    meta_description: 'Octomatic privacy policy. Learn how we protect your data and respect your privacy in compliance with GDPR and international standards.',
    meta_keywords: 'privacy policy, data protection, GDPR compliance, privacy',
    og_title: 'Privacy Policy | Data Protection | Octomatic',
    og_description: 'Octomatic privacy policy. Learn how we protect your data and respect your privacy in compliance with GDPR and international standards.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'contact' 
  },
  '/nl/privacy': { 
    title: 'Privacybeleid | Gegevensbescherming | Octomatic', 
    meta_description: 'Octomatic privacybeleid. Leer hoe we uw gegevens beschermen en uw privacy respecteren in overeenstemming met AVG en internationale standaarden.',
    meta_keywords: 'privacybeleid, gegevensbescherming, AVG compliance, privacy',
    og_title: 'Privacybeleid | Gegevensbescherming | Octomatic',
    og_description: 'Octomatic privacybeleid. Leer hoe we uw gegevens beschermen en uw privacy respecteren in overeenstemming met AVG en internationale standaarden.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'contact' 
  },
  '/terms': { 
    title: 'Terms of Service | Legal Agreement | Octomatic', 
    meta_description: 'Octomatic terms of service and legal agreements. Understand our service terms, conditions, and legal framework.',
    meta_keywords: 'terms of service, legal agreement, service terms, conditions',
    og_title: 'Terms of Service | Legal Agreement | Octomatic',
    og_description: 'Octomatic terms of service and legal agreements. Understand our service terms, conditions, and legal framework.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'contact' 
  },
  '/nl/terms': { 
    title: 'Gebruiksvoorwaarden | Juridische Overeenkomst | Octomatic', 
    meta_description: 'Octomatic gebruiksvoorwaarden en juridische overeenkomsten. Begrijp onze servicevoorwaarden, condities en juridisch kader.',
    meta_keywords: 'gebruiksvoorwaarden, juridische overeenkomst, servicevoorwaarden, condities',
    og_title: 'Gebruiksvoorwaarden | Juridische Overeenkomst | Octomatic',
    og_description: 'Octomatic gebruiksvoorwaarden en juridische overeenkomsten. Begrijp onze servicevoorwaarden, condities en juridisch kader.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'contact' 
  },

  // --- Blog Post Examples ---
  '/blog/ai-automation-predictions-2025': {
    title: 'AI Automation Predictions 2025 | Future Trends & Insights',
    meta_description: 'Expert predictions for AI automation in 2025. Discover emerging trends, technologies, and opportunities in business process automation.',
    meta_keywords: 'AI automation 2025, automation predictions, AI trends, future automation',
    og_title: 'AI Automation Predictions 2025 | Future Trends & Insights',
    og_description: 'Expert predictions for AI automation in 2025. Discover emerging trends, technologies, and opportunities in business process automation.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'blogPost'
  },
  '/blog/beyond-zapier-dutch-businesses': {
    title: 'Beyond Zapier: Advanced Automation for Dutch Businesses',
    meta_description: 'Why Dutch businesses need more than Zapier. Explore advanced automation solutions tailored for the Netherlands market.',
    meta_keywords: 'beyond Zapier, Dutch business automation, Netherlands automation, advanced automation',
    og_title: 'Beyond Zapier: Advanced Automation for Dutch Businesses',
    og_description: 'Why Dutch businesses need more than Zapier. Explore advanced automation solutions tailored for the Netherlands market.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'blogPost'
  },
  '/blog/gdpr-data-advantage': {
    title: 'GDPR Data Advantage | Turn Compliance into Competitive Edge',
    meta_description: 'Transform GDPR compliance from burden to advantage. Learn how proper data management creates competitive benefits.',
    meta_keywords: 'GDPR advantage, data compliance, competitive edge, data management',
    og_title: 'GDPR Data Advantage | Turn Compliance into Competitive Edge',
    og_description: 'Transform GDPR compliance from burden to advantage. Learn how proper data management creates competitive benefits.',
    og_image: `${baseUrl}/octomatic-image-2025.png`,
    page_type: 'blogPost'
  },

  // --- Default/Fallback ---
  'default': {
    title: 'Octomatic | AI Automation Agency',
    meta_description: 'AI-driven automation solutions for businesses in Amsterdam and beyond.',
    og_title: 'Octomatic | AI Automation Agency',
    og_description: 'AI-driven automation solutions for businesses.',
    og_image: `${baseUrl}/octomatic-image-2025.png`
  }
};

export function getDefaultMetadata(path: string): SEOMetadata {
  return DEFAULT_METADATA[path] || DEFAULT_METADATA['default'];
}

// FIXED: Canonical URL generation for all pages - solves "Canonical URL mismatch" issue
const getCanonicalUrl = (path: string, language: string, providedCanonical?: string): string => {
  if (providedCanonical) {
    return providedCanonical;
  }
  
  // Normalize path: remove trailing slash except for root
  let cleanPath = path;
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Handle language-specific canonical URLs
  if (language === 'nl') {
    // For Dutch pages, canonical should be self-referencing with /nl prefix
    if (!cleanPath.startsWith('/nl')) {
      cleanPath = cleanPath === '/' ? '/nl' : `/nl${cleanPath}`;
    }
  } else {
    // For English pages, canonical should be self-referencing without /nl prefix
    if (cleanPath.startsWith('/nl')) {
      cleanPath = cleanPath.replace('/nl', '') || '/';
    }
  }
  
  // Special handling for root paths
  if (cleanPath === '') {
    cleanPath = '/';
  }
  
  // Ensure trailing slash consistency: add for root, remove for others
  const finalUrl = cleanPath === '/' ? `${baseUrl}/` : `${baseUrl}${cleanPath}`;
  
  return finalUrl;
};

// ENHANCED: Generate advanced structured data for maximum SEO impact
const generateStructuredData = (metadata: SEOMetadata, canonicalUrl: string, language: string): any => {
    const organizationData = {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Octomatic",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo/octomatic-800.png`,
          "width": 800,
          "height": 156
        },
        "sameAs": [
          "https://www.linkedin.com/company/octomatic-ai/",
          "https://twitter.com/octomatic_ai",
          "https://www.facebook.com/octomatic.ai",
          "https://www.instagram.com/octomatic_ai"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Herengracht 420",
          "addressLocality": "Amsterdam",
          "addressRegion": "Noord-Holland",
          "postalCode": "1017BZ",
          "addressCountry": "NL"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+31646402090",
            "contactType": "customer service",
            "availableLanguage": ["English", "Dutch"],
            "areaServed": ["NL", "EU"]
        },
        "foundingDate": "2020",
        "foundingLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Amsterdam",
            "addressCountry": "Netherlands"
          }
        },
        "numberOfEmployees": "5-10",
        "slogan": language === 'nl' ? "AI Automatisering die werkt" : "AI Automation that works"
    };

  switch (metadata.page_type) {
    case 'home':
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            "url": canonicalUrl,
            "name": metadata.title,
            "description": metadata.meta_description,
            "publisher": { "@id": `${baseUrl}/#organization` },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US'
          },
          organizationData,
          {
            "@type": "LocalBusiness",
            "@id": `${baseUrl}/#localbusiness`,
            "parentOrganization": { "@id": `${baseUrl}/#organization` },
            "name": "Octomatic Amsterdam",
            "image": `${baseUrl}/logo/octomatic-800.png`,
            "url": baseUrl,
            "telephone": "+31646402090",
            "email": "hello@octomatic.ai",
            "address": organizationData.address,
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
            "priceRange": "€€€",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "47",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": language === 'nl' ? "AI Automatisering Diensten" : "AI Automation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": language === 'nl' ? "AI Automatisering Consulting" : "AI Automation Consulting",
                    "description": language === 'nl' ? "Aangepaste AI automatiseringsoplossingen voor bedrijfsproces optimalisatie" : "Custom AI automation solutions for business process optimization"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": language === 'nl' ? "CRM Implementatie" : "CRM Implementation",
                    "description": language === 'nl' ? "Verkoop systeem buildouts die schalen zoals 8-cijferige organisaties" : "Sales system buildouts that scale like 8-figure organizations"
                  }
                }
              ]
            }
          }
        ]
      };
    
    case 'blogPost':
      const datePublished = metadata.published_date ? new Date(metadata.published_date).toISOString() : undefined;
      const dateModified = metadata.modified_date ? new Date(metadata.modified_date).toISOString() : datePublished;
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": { 
          "@type": "WebPage", 
          "@id": canonicalUrl 
        },
        "headline": metadata.title,
        "description": metadata.meta_description,
        "image": {
          "@type": "ImageObject",
          "url": metadata.og_image || `${baseUrl}/octomatic-image-2025.png`,
          "width": 1200,
          "height": 630
        },
        "author": { 
          "@type": "Organization", 
          "name": metadata.author || "Octomatic Team",
          "url": baseUrl
        },
        "publisher": organizationData,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
        "keywords": metadata.meta_keywords,
        "wordCount": 1500, // Estimated average
        "timeRequired": "PT5M" // 5 minutes reading time
      };
    
    case 'service':
      return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "serviceType": metadata.service_type || "AI Automation Consulting",
        "provider": organizationData,
        "name": metadata.title.split('|')[0].trim(),
        "description": metadata.meta_description,
        "areaServed": metadata.area_served ? [
          {
            "@type": "Place",
            "name": metadata.area_served
          }
        ] : [
          {
            "@type": "City",
            "name": "Amsterdam"
          },
          {
            "@type": "Country", 
            "name": "Netherlands"
          }
        ],
        "offers": metadata.offers || {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "EUR",
          "priceRange": metadata.price_range || "€€€",
          "validFrom": "2020-01-01"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": metadata.title.split('|')[0].trim(),
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": metadata.title.split('|')[0].trim(),
                "description": metadata.meta_description
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "47",
          "bestRating": "5"
        }
      };

    case 'article':
      const articleDatePublished = metadata.published_date ? new Date(metadata.published_date).toISOString() : new Date().toISOString();
      const articleDateModified = metadata.modified_date ? new Date(metadata.modified_date).toISOString() : articleDatePublished;
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": { 
          "@type": "WebPage", 
          "@id": canonicalUrl 
        },
        "headline": metadata.title,
        "description": metadata.meta_description,
        "image": {
          "@type": "ImageObject",
          "url": metadata.og_image || `${baseUrl}/octomatic-image-2025.png`,
          "width": 1200,
          "height": 630
        },
        "author": { 
          "@type": "Person", 
          "name": metadata.author || "Kennet Timmers",
          "url": `${baseUrl}/about`,
          "jobTitle": "CEO & AI Automation Expert",
          "worksFor": { "@id": `${baseUrl}/#organization` }
        },
        "publisher": organizationData,
        "datePublished": articleDatePublished,
        "dateModified": articleDateModified,
        "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
        "keywords": metadata.meta_keywords,
        "wordCount": metadata.word_count || 1200,
        "timeRequired": `PT${Math.ceil((metadata.word_count || 1200) / 200)}M`, // Reading time based on word count
        "articleSection": metadata.article_section || "AI Automation",
        "about": {
          "@type": "Thing",
          "name": "AI Automation for Dutch Businesses"
        }
      };

    case 'report':
      const reportDatePublished = metadata.published_date ? new Date(metadata.published_date).toISOString() : new Date().toISOString();
      const reportDateModified = metadata.modified_date ? new Date(metadata.modified_date).toISOString() : reportDatePublished;
      return {
        "@context": "https://schema.org",
        "@type": "Report",
        "mainEntityOfPage": { 
          "@type": "WebPage", 
          "@id": canonicalUrl 
        },
        "headline": metadata.title,
        "description": metadata.meta_description,
        "image": {
          "@type": "ImageObject",
          "url": metadata.og_image || `${baseUrl}/octomatic-image-2025.png`,
          "width": 1200,
          "height": 630
        },
        "author": { 
          "@type": "Organization", 
          "name": "Octomatic Research Team",
          "url": baseUrl,
          "parentOrganization": { "@id": `${baseUrl}/#organization` }
        },
        "publisher": organizationData,
        "datePublished": reportDatePublished,
        "dateModified": reportDateModified,
        "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
        "keywords": metadata.meta_keywords,
        "about": {
          "@type": "Thing",
          "name": "AI Adoption in Dutch SMEs"
        },
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Small and Medium Enterprises",
          "geographicArea": {
            "@type": "Country",
            "name": "Netherlands"
          }
        },
        "citation": [
          {
            "@type": "CreativeWork",
            "name": "500+ Dutch SME Interviews",
            "description": "Primary research conducted September 2024 - January 2025"
          }
        ]
      };
    
    default:
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": metadata.title,
        "description": metadata.meta_description,
        "publisher": organizationData,
        "inLanguage": language === 'nl' ? 'nl-NL' : 'en-US',
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        }
      };
  }
};

export function SEO(props: SEOMetadata) {
  const pathname = usePathname();
  const { language } = useLanguage();

  const { title, meta_description, meta_keywords, og_title, og_description, og_image, canonical_url: providedCanonicalUrl, page_type } = props;

  const currentPath = pathname.endsWith('/') && pathname.length > 1 
                      ? pathname.slice(0, -1) 
                      : pathname;
  const defaultData = getDefaultMetadata(currentPath);

  const finalTitle = title || defaultData.title;
  const finalMetaDescription = meta_description || defaultData.meta_description;
  const finalMetaKeywords = meta_keywords || defaultData.meta_keywords;
  // Ensure OG title matches the actual page title with | Octomatic suffix
  const pageTitle = finalTitle.includes('| Octomatic') ? finalTitle : `${finalTitle} | Octomatic`;
  const finalOgTitle = og_title || pageTitle;
  const finalOgDescription = og_description || finalMetaDescription;
  const finalOgImage = og_image || defaultData.og_image;
  const finalPageType = page_type || defaultData.page_type;

  // ENHANCED: Fixed canonical URL generation
  const canonicalUrl = getCanonicalUrl(pathname, language, providedCanonicalUrl);

  // ENHANCED: Advanced structured data with language context
  const structuredData = generateStructuredData({ 
    ...defaultData, 
    ...props, 
    title: finalTitle, 
    meta_description: finalMetaDescription, 
    og_title: finalOgTitle, 
    og_description: finalOgDescription, 
    og_image: finalOgImage, 
    page_type: finalPageType 
  }, canonicalUrl, language);
  
  // FIXED: Comprehensive hreflang implementation with complete reciprocal linking
  const isNL = pathname.startsWith('/nl');
  
  // Generate proper alternate URLs with consistent trailing slash handling
  let basePathWithoutLang = isNL ? pathname.replace('/nl', '') || '/' : pathname;
  
  // Normalize path: remove trailing slash except for root
  if (basePathWithoutLang.length > 1 && basePathWithoutLang.endsWith('/')) {
    basePathWithoutLang = basePathWithoutLang.slice(0, -1);
  }
  
  // ENHANCED: Generate complete hreflang cluster URLs with proper URL cleaning
  let englishUrl = basePathWithoutLang === '/' ? `${baseUrl}/` : `${baseUrl}${basePathWithoutLang}`;
  let dutchUrl = basePathWithoutLang === '/' ? `${baseUrl}/nl` : `${baseUrl}/nl${basePathWithoutLang}`;
  
  // Clean up double slashes in path only (preserve protocol://)
  const cleanUrl = (url: string) => {
    // Split at protocol
    const [protocol, ...rest] = url.split('://');
    if (rest.length === 0) return url; // No protocol found
    
    // Clean up the path part only
    const pathPart = rest.join('://').replace(/\/+/g, '/');
    return `${protocol}://${pathPart}`;
  };
  
  englishUrl = cleanUrl(englishUrl);
  dutchUrl = cleanUrl(dutchUrl);
  
  // ENHANCED: Ensure all pages in the same cluster have reciprocal hreflang tags
  // This fixes the "Missing reciprocal hreflang (no return-tag)" issue
  const generateHreflangTags = () => {
    const tags = [];
    
    // Generate hreflang tags (disabled - now handled by Meta component)
    
    // Always include the current page's language version
    if (isNL) {
      tags.push(<link key="self-nl" rel="alternate" hrefLang="nl-NL" href={dutchUrl} />);
      tags.push(<link key="en" rel="alternate" hrefLang="en" href={englishUrl} />);
      tags.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={englishUrl} />);
    } else {
      tags.push(<link key="self-en" rel="alternate" hrefLang="en" href={englishUrl} />);
      tags.push(<link key="nl" rel="alternate" hrefLang="nl-NL" href={dutchUrl} />);
      tags.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={englishUrl} />);
    }
    
    return tags;
  };

  return (
    <>
      <Helmet>
        <html lang={language === 'nl' ? 'nl' : 'en'} />
        <title>{finalTitle.includes('| Octomatic') ? finalTitle : `${finalTitle} | Octomatic`}</title> 
        <meta name="description" content={finalMetaDescription} />
        {finalMetaKeywords && <meta name="keywords" content={finalMetaKeywords} />}
        
        {/* ENHANCED: Dynamic robots directives based on page type and URL */}
        <meta name="robots" content={
          currentPath.includes('/crawl-budget') || currentPath.includes('/sitemap') || currentPath.includes('/robots')
            ? "noindex, nofollow"
            : finalPageType === 'blog' || finalPageType === 'service' || finalPageType === 'blogPost'
            ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        } />
        <meta name="googlebot" content={
          currentPath.includes('/crawl-budget') || currentPath.includes('/sitemap') || currentPath.includes('/robots')
            ? "noindex, nofollow"
            : finalPageType === 'blog' || finalPageType === 'service' || finalPageType === 'blogPost'
            ? "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
            : "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        } />
        <meta name="bingbot" content={
          currentPath.includes('/crawl-budget') || currentPath.includes('/sitemap') || currentPath.includes('/robots')
            ? "noindex, nofollow"
            : finalPageType === 'blog' || finalPageType === 'service' || finalPageType === 'blogPost'
            ? "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
            : "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        } />
        
        {/* FIXED: Canonical URL - self-referencing for each language */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang tags for internationalization */}
        {generateHreflangTags()}
        
        {/* Enhanced language and region targeting */}
        <meta name="language" content={isNL ? 'nl-NL' : 'en-US'} />
        <meta httpEquiv="content-language" content={isNL ? 'nl-NL' : 'en-US'} />
        
        {/* FIXED: Enhanced Open Graph - URL matches canonical exactly */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={finalOgTitle} />
        <meta property="og:description" content={finalOgDescription} />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${finalTitle} - Octomatic AI Automation`} />
        <meta property="og:locale" content={isNL ? 'nl_NL' : 'en_US'} />
        <meta property="og:site_name" content="Octomatic" />
        
        {/* Enhanced social media tags */}
        <meta property="article:publisher" content="https://www.linkedin.com/company/octomatic-ai/" />
        <meta property="article:author" content="https://www.linkedin.com/company/octomatic-ai/" />
        {finalPageType === 'blogPost' && structuredData.datePublished && <meta property="article:published_time" content={structuredData.datePublished} />}
        {finalPageType === 'blogPost' && structuredData.dateModified && <meta property="article:modified_time" content={structuredData.dateModified} />}
        
        {/* Enhanced Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@octomatic_ai" />
        <meta name="twitter:creator" content="@octomatic_ai" />
        <meta name="twitter:title" content={finalOgTitle} />
        <meta name="twitter:description" content={finalOgDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        <meta name="twitter:image:alt" content={`${finalTitle} - Octomatic AI Automation`} />
        
        {/* LinkedIn specific tags */}
        <meta property="linkedin:card" content="summary_large_image" />
        <meta property="linkedin:title" content={finalOgTitle} />
        <meta property="linkedin:description" content={finalOgDescription} />
        <meta property="linkedin:image" content={finalOgImage} />
        <meta property="linkedin:owner" content="octomatic-ai" />
        
        {/* Enhanced geographic targeting */}
        <meta name="geo.region" content="NL-NH" />
        <meta name="geo.placename" content="Amsterdam" />
        <meta name="geo.position" content="52.3676;4.9041" />
        <meta name="ICBM" content="52.3676, 4.9041" />
        
        {/* Enhanced indexing directives */}
        <meta name="distribution" content="global" />
        <meta name="coverage" content="worldwide" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Enhanced structured data - Original schema */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* ENHANCED: Advanced structured data component for massive SEO boost */}
      <AdvancedStructuredData 
        pageType={finalPageType || 'home'}
        url={canonicalUrl}
        title={finalTitle}
        description={finalMetaDescription}
        language={language}
      />
    </>
  );
}