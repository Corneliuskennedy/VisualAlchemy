'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdvancedStructuredData } from './AdvancedStructuredData';
import { StructuredDataInjector } from './StructuredDataInjector';

const BASE_URL = 'https://www.octomatic.ai';

export interface UnifiedSEOProps {
  title?: string;
  description?: string;
  h1?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string | string[];
  noIndex?: boolean;
  pageType?: 'home' | 'blog' | 'blogPost' | 'about' | 'contact' | 'service' | 'report' | 'article';
  serviceType?: string;
  priceRange?: string;
  areaServed?: string;
  offers?: any;
  articleSection?: string;
  wordCount?: number;
}

// Helper function to truncate strings
const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
};

// Helper function to ensure title includes brand
const formatTitle = (title: string): string => {
  if (!title) return 'Octomatic | AI Automation for Ambitious Businesses';
  
  // If already includes brand, use as is
  if (title.includes('| Octomatic') || title.includes('Octomatic |')) {
    return truncateString(title, 60);
  }
  
  // Add brand suffix
  const withBrand = `${title} | Octomatic`;
  
  // If too long, truncate the title part before adding brand
  if (withBrand.length > 60) {
    const maxTitleLength = 60 - ' | Octomatic'.length;
    const truncatedTitle = truncateString(title, maxTitleLength);
    return `${truncatedTitle} | Octomatic`;
  }
  
  return withBrand;
};

// Helper function to truncate description
const formatDescription = (description: string): string => {
  if (!description) {
    return 'We help ambitious companies in Amsterdam and beyond scale smarter with custom AI automation, CRM systems, and workflow optimization. Stop over-hiring, start automating.';
  }
  return truncateString(description, 160);
};

export function UnifiedSEO({
  title: pageTitle,
  description: pageDescription,
  h1,
  canonicalUrl: customCanonicalUrl,
  ogType = 'website',
  ogImage: customOgImage,
  ogImageAlt: customOgImageAlt,
  twitterCard = 'summary_large_image',
  twitterSite = '@OctomaticAI',
  twitterCreator,
  author,
  publishedTime,
  modifiedTime,
  keywords,
  noIndex = false,
  pageType = 'home',
  serviceType,
  priceRange,
  areaServed,
  offers,
  articleSection,
  wordCount,
}: UnifiedSEOProps) {
  const pathname = usePathname();

  // CRITICAL FIX: Detect language from URL path - this is more reliable than context
  const isNL = pathname.startsWith('/nl');
  const detectedLanguage = isNL ? 'nl' : 'en';

  // Format title and description with length constraints
  const title = formatTitle(pageTitle || '');
  const description = formatDescription(pageDescription || '');

  // Get current pathname and clean it up
  const cleanPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  // Generate canonical URL
  const canonicalUrl = customCanonicalUrl || `${BASE_URL}${cleanPathname}`;

  // Default OG image
  const defaultOgImage = `${BASE_URL}/octomatic-image-2025.png`;
  const ogImage = customOgImage || defaultOgImage;
  const ogImageAlt = customOgImageAlt || title;

  // FIXED: Generate hreflang links without duplicates
  const getHreflangLinks = () => {
    let enUrl: string, nlUrl: string;

    // Handle Dutch pages (starting with /nl)
    if (isNL) {
      nlUrl = `${BASE_URL}${cleanPathname}`;
      // Remove /nl prefix for English version
      const enPath = cleanPathname === '/nl' ? '/' : cleanPathname.replace('/nl', '');
      enUrl = `${BASE_URL}${enPath}`;
    } else {
      // Handle English pages
      enUrl = `${BASE_URL}${cleanPathname}`;
      // Add /nl prefix for Dutch version  
      const nlPath = cleanPathname === '/' ? '/nl' : `/nl${cleanPathname}`;
      nlUrl = `${BASE_URL}${nlPath}`;
    }
    
    // Return unique hreflang entries (no duplicates)
    return [
      { lang: 'en', href: enUrl },
      { lang: 'nl-NL', href: nlUrl },
      { lang: 'x-default', href: enUrl },
    ];
  };

  const hreflangLinks = getHreflangLinks();

  // Generate structured data
  const generateStructuredData = () => {
    const organizationData = {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Octomatic",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo/octomatic-800.png`,
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
      }
    };

    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": canonicalUrl,
      "url": canonicalUrl,
      "name": title,
      "description": description,
      "publisher": organizationData,
      "inLanguage": detectedLanguage === 'nl' ? 'nl-NL' : 'en-US',
    };

    // Add page-specific structured data based on pageType
    switch (pageType) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              "url": canonicalUrl,
              "name": title,
              "description": description,
              "publisher": { "@id": `${BASE_URL}/#organization` },
              "inLanguage": detectedLanguage === 'nl' ? 'nl-NL' : 'en-US',
              "dateModified": modifiedTime || new Date().toISOString(),
              "datePublished": publishedTime || "2019-01-01"
            },
            organizationData
          ]
        };
      
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "serviceType": serviceType || "AI Automation Consulting",
          "provider": organizationData,
          "name": title.split('|')[0].trim(),
          "description": description,
          "areaServed": areaServed ? [{ "@type": "Place", "name": areaServed }] : [
            { "@type": "City", "name": "Amsterdam" },
            { "@type": "Country", "name": "Netherlands" }
          ],
          "offers": offers || {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "EUR",
            "priceRange": priceRange || "€€€"
          }
        };
      
      case 'blogPost':
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": pageType === 'blogPost' ? "BlogPosting" : "Article",
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
          "headline": title,
          "description": description,
          "image": {
            "@type": "ImageObject",
            "url": ogImage,
            "width": 1200,
            "height": 630
          },
          "author": { 
            "@type": author ? "Person" : "Organization", 
            "name": author || "Octomatic Team",
            "url": BASE_URL,
            "worksFor": {
              "@type": "Organization",
              "@id": `${BASE_URL}/#organization`,
              "name": "Octomatic"
            }
          },
          "publisher": organizationData,
          "datePublished": publishedTime,
          "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
          "inLanguage": detectedLanguage === 'nl' ? 'nl-NL' : 'en-US',
          "keywords": keywords,
          "wordCount": wordCount,
          "articleSection": articleSection
        };
      
      default:
        return baseStructuredData;
    }
  };

  // Use useEffect to set document head elements (replaces Helmet)
  useEffect(() => {
    // Set HTML lang attribute
    document.documentElement.lang = detectedLanguage;

    // Set title
    document.title = title;

    // Helper function to update or create meta tag
    const setMetaTag = (name: string, content: string, attribute: 'name' | 'property' | 'httpEquiv' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper function to update or create link tag
    const setLinkTag = (rel: string, href: string, hrefLang?: string) => {
      const selector = hrefLang 
        ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        if (hrefLang) element.hreflang = hrefLang;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Set meta tags
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }

    // Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // Hreflang links
    hreflangLinks.forEach(({ lang, href }) => {
      setLinkTag('alternate', href, lang);
    });

    // Open Graph tags
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:type', ogType, 'property');
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:image:alt', ogImageAlt, 'property');
    setMetaTag('og:site_name', 'Octomatic', 'property');
    setMetaTag('og:locale', detectedLanguage === 'nl' ? 'nl_NL' : 'en_US', 'property');

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:site', twitterSite);
    if (twitterCreator) setMetaTag('twitter:creator', twitterCreator);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    setMetaTag('twitter:image:alt', ogImageAlt);

    // Article specific meta tags
    if ((pageType === 'article' || pageType === 'blogPost') && author) {
      setMetaTag('article:author', author, 'property');
    }
    if ((pageType === 'article' || pageType === 'blogPost') && publishedTime) {
      setMetaTag('article:published_time', publishedTime, 'property');
    }
    if ((pageType === 'article' || pageType === 'blogPost') && modifiedTime) {
      setMetaTag('article:modified_time', modifiedTime, 'property');
    }

    // Robots meta tag
    setMetaTag('robots', noIndex 
      ? 'noindex, nofollow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Language and region targeting
    setMetaTag('language', detectedLanguage === 'nl' ? 'nl-NL' : 'en-US');
    setMetaTag('content-language', detectedLanguage === 'nl' ? 'nl-NL' : 'en-US', 'httpEquiv');

    // Geographic targeting
    setMetaTag('geo.region', 'NL-NH');
    setMetaTag('geo.placename', 'Amsterdam');
    setMetaTag('geo.position', '52.3676;4.9041');
    setMetaTag('ICBM', '52.3676, 4.9041');

    // Additional hreflang links (if different from main ones)
    const cleanPath = pathname.replace(/^\/nl/, '') || '/';
    const enUrl = `${BASE_URL}${cleanPath}`;
    const nlUrl = `${BASE_URL}/nl${cleanPath}`;
    
    // Ensure all hreflang links are set
    setLinkTag('alternate', enUrl, 'en');
    setLinkTag('alternate', nlUrl, 'nl');
    setLinkTag('alternate', enUrl, 'x-default');

    // Inject structured data script
    const scriptId = `structured-data-${pageType}-${pathname.replace(/\//g, '-')}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(generateStructuredData());
  }, [
    detectedLanguage, title, description, keywords, canonicalUrl, ogType, ogImage, ogImageAlt,
    twitterCard, twitterSite, twitterCreator, pageType, author, publishedTime, modifiedTime,
    noIndex, pathname, hreflangLinks
  ]);

  return (
    <>
      
      {/* Direct structured data injection (works in App Router) */}
      <StructuredDataInjector 
        data={generateStructuredData()} 
        id={`structured-data-${pageType}-${pathname.replace(/\//g, '-')}`}
      />
      
      {/* Enhanced structured data component */}
      <AdvancedStructuredData 
        pageType={pageType}
        url={canonicalUrl}
        title={title}
        description={description}
        language={detectedLanguage}
      />
      
      {/* Render visually hidden H1 if provided */}
      {h1 && (
        <h1 className="sr-only">
          {h1}
        </h1>
      )}
    </>
  );
} 