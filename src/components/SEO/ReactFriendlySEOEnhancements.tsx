import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';

interface SEOEnhancementsProps {
  pageType?: string;
  title?: string;
  description?: string;
}

export function ReactFriendlySEOEnhancements({ 
  pageType = 'page',
  title = '',
  description = ''
}: SEOEnhancementsProps) {
  const pathname = usePathname();

  // Add structured data for better SEO
  const getEnhancedStructuredData = () => {
    const baseUrl = 'https://www.octomatic.ai';
    const currentUrl = `${baseUrl}${pathname}`;
    
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "Octomatic",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo/octomatic-800.png`,
            "width": 800,
            "height": 400
          },
          "description": "Leading AI automation agency in Amsterdam helping businesses scale smarter",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Herengracht 420",
            "addressLocality": "Amsterdam",
            "addressRegion": "North Holland",
            "postalCode": "1017BZ",
            "addressCountry": "NL"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+31-20-123-4567",
            "contactType": "customer service",
            "availableLanguage": ["English", "Dutch"],
            "areaServed": "NL"
          }
        },
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Octomatic",
          "description": "AI Automation Agency in Amsterdam",
          "publisher": { "@id": `${baseUrl}/#organization` },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "@id": currentUrl,
          "url": currentUrl,
          "name": title || "Octomatic - AI Automation Amsterdam",
          "description": description || "Transform your business with intelligent automation solutions",
          "isPartOf": { "@id": `${baseUrl}/#website` },
          "about": { "@id": `${baseUrl}/#organization` }
        }
      ]
    };
  };

  // React-friendly accessibility enhancements
  useEffect(() => {
    // Add skip link for accessibility (React-friendly approach)
    const addSkipLink = () => {
      const existingSkipLink = document.querySelector('#skip-to-main');
      if (!existingSkipLink) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50';
        
        // Insert at the very beginning of body
        if (document.body.firstChild) {
          document.body.insertBefore(skipLink, document.body.firstChild);
        } else {
          document.body.appendChild(skipLink);
        }
      }
    };

    // Add main content landmark if it doesn't exist
    const addMainLandmark = () => {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        const existingMain = rootElement.querySelector('#main-content');
        if (!existingMain) {
          // Find the first content element and add ID
          const contentElement = rootElement.querySelector('main, [role="main"], .main-content');
          if (contentElement) {
            contentElement.id = 'main-content';
            contentElement.setAttribute('role', 'main');
          }
        }
      }
    };

    // Enhanced focus management for better keyboard navigation
    const enhanceFocusManagement = () => {
      const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        
        // Add focus styles if not present
        htmlElement.addEventListener('focus', () => {
          if (!htmlElement.style.outline && !getComputedStyle(htmlElement).outline.includes('rgb')) {
            htmlElement.style.outline = '2px solid #3b82f6';
            htmlElement.style.outlineOffset = '2px';
          }
        });
        
        htmlElement.addEventListener('blur', () => {
          if (htmlElement.style.outline === '2px solid #3b82f6') {
            htmlElement.style.outline = '';
            htmlElement.style.outlineOffset = '';
          }
        });
      });
    };

    // Run accessibility enhancements after a brief delay to ensure DOM is ready
    const timer = setTimeout(() => {
      addSkipLink();
      addMainLandmark();
      enhanceFocusManagement();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Content freshness indicator (React-friendly)
  const ContentFreshnessIndicator = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="content-freshness bg-blue-50 border-l-4 border-blue-500 p-3 mb-6 rounded-r-lg">
        <div className="flex items-center">
          <span className="text-blue-600 font-medium text-sm">
            ✨ Updated {currentDate} - Latest AI automation insights
          </span>
        </div>
      </div>
    );
  };

  // Mobile contact enhancement (React-friendly)
  const MobileContactLinks = () => (
    <div className="mobile-contact-enhancement hidden md:block">
      <style dangerouslySetInnerHTML={{
        __html: `
          .phone-link {
            color: #3b82f6;
            text-decoration: none;
            padding: 4px 8px;
            border-radius: 4px;
            background: rgba(59, 130, 246, 0.1);
            margin: 0 4px;
          }
          .email-link {
            color: #3b82f6;
            text-decoration: none;
            padding: 4px 8px;
            border-radius: 4px;
            background: rgba(59, 130, 246, 0.1);
            margin: 0 4px;
          }
        `
      }} />
    </div>
  );

  return (
    <>
      <Helmet>
        {/* Enhanced structured data */}
        <script type="application/ld+json">
          {JSON.stringify(getEnhancedStructuredData())}
        </script>
        
        {/* Enhanced accessibility meta tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Octomatic" />
        
        {/* Enhanced mobile optimization */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="address=yes" />
        <meta name="format-detection" content="email=yes" />
        
        {/* Enhanced search engine directives */}
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Enhanced geographic targeting */}
        <meta name="geo.region" content="NL-NH" />
        <meta name="geo.placename" content="Amsterdam" />
        <meta name="geo.position" content="52.3676;4.9041" />
        <meta name="ICBM" content="52.3676, 4.9041" />
      </Helmet>
      
      {/* React-friendly content enhancements */}
      {pageType === 'home' && <ContentFreshnessIndicator />}
      <MobileContactLinks />
    </>
  );
}

// Enhanced breadcrumb component
export function EnhancedBreadcrumbs() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.octomatic.ai${crumb.url}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className="flex mb-4 text-sm">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.url} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <a 
                  href={crumb.url} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {crumb.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 