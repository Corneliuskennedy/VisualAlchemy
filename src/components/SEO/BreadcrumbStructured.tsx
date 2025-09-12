import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import useLanguage from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  title: string;
  titleNL?: string; // Dutch title
  href: string;
  isCurrent?: boolean;
  isRoot?: boolean;
  isAmsterdam?: boolean; // Mark Amsterdam-specific pages for better local SEO
}

interface BreadcrumbStructuredProps {
  items: BreadcrumbItem[];
  className?: string;
  showStructuredData?: boolean;
  pageType?: 'service' | 'article' | 'blog' | 'about' | 'contact' | 'homepage';
  serviceLocation?: string; // Add location for Service pages
}

/**
 * Enhanced BreadcrumbStructured component with two purposes:
 * 1. Visual breadcrumbs for users to navigate through your website
 * 2. Structured data for search engines
 * 
 * This improved version adds Amsterdam-specific markup and better schema handling.
 */
const BreadcrumbStructured: React.FC<BreadcrumbStructuredProps> = ({
  items,
  className,
  showStructuredData = true,
  pageType = 'service',
  serviceLocation = 'Amsterdam'
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://www.octomatic.ai${item.href}`,
        'name': isNL && item.titleNL ? item.titleNL : item.title
      }
    }))
  };
  
  // Add Amsterdam-specific context if relevant
  const addLocalContext = () => {
    // Only add local context for service pages and if there's an Amsterdam-specific item
    if (pageType === 'service' && items.some(item => item.isAmsterdam)) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': isNL ? 'AI Automatiseringsdiensten in Amsterdam' : 'AI Automation Services in Amsterdam',
        'areaServed': {
          '@type': 'City',
          'name': 'Amsterdam',
          'containedIn': {
            '@type': 'Country',
            'name': 'Netherlands'
          }
        },
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Octomatic',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Amsterdam',
            'addressRegion': 'NH',
            'postalCode': '1017BZ',
            'addressCountry': 'NL'
          }
        }
      };
    }
    
    return null;
  };
  
  const localContextData = addLocalContext();
  
  return (
    <>
      {/* Add structured data */}
      {showStructuredData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbStructuredData)}
          </script>
          
          {/* Add Amsterdam local context if available */}
          {localContextData && (
            <script type="application/ld+json">
              {JSON.stringify(localContextData)}
            </script>
          )}
        </Helmet>
      )}
      
      {/* Visual breadcrumb component */}
      <nav 
        aria-label="Breadcrumb" 
        className={cn("flex items-center space-x-1 text-sm text-gray-400", className)}
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {/* Separator between items (except first) */}
              {index > 0 && (
                <span className="mx-2" aria-hidden="true">/</span>
              )}
              
              {/* Current page (no link) */}
              {item.isCurrent ? (
                <span 
                  className={cn(
                    "text-gray-200 font-semibold",
                    {'text-primary': item.isAmsterdam} // Highlight Amsterdam items
                  )}
                  aria-current="page"
                >
                  {isNL && item.titleNL ? item.titleNL : item.title}
                </span>
              ) : (
                // Link to other pages
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-gray-200 transition-colors",
                    {'text-primary/80 hover:text-primary': item.isAmsterdam} // Highlight Amsterdam items
                  )}
                >
                  {isNL && item.titleNL ? item.titleNL : item.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default BreadcrumbStructured; 