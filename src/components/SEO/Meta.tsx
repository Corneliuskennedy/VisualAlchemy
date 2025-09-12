import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';
import useLanguage from '@/contexts/LanguageContext';

const BASE_URL = 'https://www.octomatic.ai';

export interface MetaProps {
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
}

export function Meta({
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
}: MetaProps) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const defaultTitle = 'Octomatic | AI Automation for Ambitious Businesses';
  const defaultDescription = 'We help ambitious companies in Amsterdam and beyond scale smarter with custom AI automation, CRM systems, and workflow optimization. Stop over-hiring, start automating.';

  const title = pageTitle ? `${pageTitle} | Octomatic` : defaultTitle;
  const description = pageDescription || defaultDescription;

  // Get current pathname with fallback for SSR/hydration issues
  const getCurrentPath = () => {
    const routerPath = pathname;
    // Fallback to window.pathname if router path is not correct
    if (typeof window !== 'undefined' && routerPath === '/') {
      const windowPath = window.location.pathname;
      if (windowPath !== '/') {
        return windowPath;
      }
    }
    return routerPath;
  };

  const currentPathname = getCurrentPath();

  // Clean up pathname - remove trailing slash but keep root slash
  const cleanPathname = currentPathname === '/' ? '/' : currentPathname.replace(/\/$/, '');
  const canonicalUrl = customCanonicalUrl || `${BASE_URL}${cleanPathname}`;

  const defaultOgImage = `${BASE_URL}/octomatic-image-2025.png`;
  const ogImage = customOgImage || defaultOgImage;
  const ogImageAlt = customOgImageAlt || title;

  const getHreflangLinks = () => {
    const currentPath = currentPathname;
    
    let enUrl: string, nlUrl: string;

    // Handle Dutch pages (starting with /nl)
    if (currentPath.startsWith('/nl')) {
      nlUrl = `${BASE_URL}${currentPath}`;
      // Remove /nl prefix for English version
      const enPath = currentPath.replace('/nl', '') || '/';
      enUrl = `${BASE_URL}${enPath}`;
    } else {
      // Handle English pages
      enUrl = `${BASE_URL}${currentPath}`;
      // Add /nl prefix for Dutch version  
      const nlPath = currentPath === '/' ? '/nl' : `/nl${currentPath}`;
      nlUrl = `${BASE_URL}${nlPath}`;
    }
    
    // Clean up double slashes in path only (preserve protocol://)
    const cleanUrl = (url: string) => {
      // Split at protocol
      const [protocol, ...rest] = url.split('://');
      if (rest.length === 0) return url; // No protocol found
      
      // Clean up the path part only
      const pathPart = rest.join('://').replace(/\/+/g, '/');
      return `${protocol}://${pathPart}`;
    };
    
    enUrl = cleanUrl(enUrl);
    nlUrl = cleanUrl(nlUrl);
    
    // Handle trailing slashes consistently
    // Remove trailing slash from non-root paths
    if (enUrl !== BASE_URL + '/' && enUrl.endsWith('/')) {
      enUrl = enUrl.slice(0, -1);
    }
    if (nlUrl !== BASE_URL + '/nl/' && nlUrl !== BASE_URL + '/nl' && nlUrl.endsWith('/')) {
      nlUrl = nlUrl.slice(0, -1);
    }
    
    // Ensure consistent URL format for homepage
    if (enUrl === BASE_URL) {
      enUrl = BASE_URL + '/';
    }
    
    // Special handling for homepage to avoid circular references
    if (currentPath === '/') {
      enUrl = `${BASE_URL}/`;
      nlUrl = `${BASE_URL}/nl`;
      // Ensure no trailing slash on Dutch homepage
      if (nlUrl.endsWith('/nl/')) {
        nlUrl = nlUrl.slice(0, -1);
      }
    }

    return [
      { lang: 'en', href: enUrl },
      { lang: 'nl-NL', href: nlUrl },
      { lang: 'x-default', href: enUrl },
    ];
  };

  const hreflangLinks = getHreflangLinks();

  return (
    <>
      <Helmet>
        <html lang={language === 'nl' ? 'nl' : 'en'} />
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}

        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang tags for internationalization */}
        {hreflangLinks.map(({ lang, href }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

        {/* Open Graph */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:site_name" content="Octomatic" />
        <meta property="og:locale" content={language === 'nl' ? 'nl_NL' : 'en_US'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content={twitterSite} />
        {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        {/* Article specific meta tags */}
        {ogType === 'article' && author && <meta property="article:author" content={author} />}
        {ogType === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {ogType === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

        {/* Indexing */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        {!noIndex && <meta name="robots" content="index, follow" />}
      </Helmet>
      
      {/* Render visually hidden H1 if provided */}
      {h1 && (
        <h1 className="sr-only">
          {h1}
        </h1>
      )}
    </>
  );
} 