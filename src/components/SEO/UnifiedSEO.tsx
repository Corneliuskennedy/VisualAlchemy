'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
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

  return (
    <>
      <Helmet>
        {/* CRITICAL FIX: Set HTML lang to match detected language */}
        <html lang={detectedLanguage} />
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* FIXED: Hreflang tags without duplicates */}
        {hreflangLinks.map(({ lang, href }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

        {/* Open Graph - ensure URL matches canonical */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:site_name" content="Octomatic" />
        <meta property="og:locale" content={detectedLanguage === 'nl' ? 'nl_NL' : 'en_US'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content={twitterSite} />
        {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        {/* Article specific meta tags */}
        {(pageType === 'article' || pageType === 'blogPost') && author && (
          <meta property="article:author" content={author} />
        )}
        {(pageType === 'article' || pageType === 'blogPost') && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {(pageType === 'article' || pageType === 'blogPost') && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}

        {/* Enhanced Indexing */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

        {/* Language and region targeting */}
        <meta name="language" content={detectedLanguage === 'nl' ? 'nl-NL' : 'en-US'} />
        <meta httpEquiv="content-language" content={detectedLanguage === 'nl' ? 'nl-NL' : 'en-US'} />
        
        {/* Hreflang for internationalization */}
        {(() => {
          const cleanPath = pathname.replace(/^\/nl/, '') || '/';
          return (
            <>
              <link rel="alternate" hrefLang="en" href={`${BASE_URL}${cleanPath}`} />
              <link rel="alternate" hrefLang="nl" href={`${BASE_URL}/nl${cleanPath}`} />
              <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${cleanPath}`} />
            </>
          );
        })()}

        {/* Geographic targeting */}
        <meta name="geo.region" content="NL-NH" />
        <meta name="geo.placename" content="Amsterdam" />
        <meta name="geo.position" content="52.3676;4.9041" />
        <meta name="ICBM" content="52.3676, 4.9041" />

        {/* Structured data - Note: Helmet may not inject this in App Router */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>
      
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