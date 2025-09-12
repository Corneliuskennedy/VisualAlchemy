import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function CanonicalURLFixer() {
  const pathname = usePathname();

  useEffect(() => {
    const fixCanonicalURLs = () => {
      const baseUrl = 'https://www.octomatic.ai';
      let currentPath = pathname;

      // Normalize path: remove trailing slash except for root
      if (currentPath.length > 1 && currentPath.endsWith('/')) {
        currentPath = currentPath.slice(0, -1);
      }

      // Generate correct canonical URL with consistent trailing slash handling
      const correctCanonicalUrl = currentPath === '/' ? `${baseUrl}/` : `${baseUrl}${currentPath}`;

      // CRITICAL: Update canonical URL immediately and aggressively
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (canonicalLink) {
        // Update existing canonical link immediately
        canonicalLink.href = correctCanonicalUrl;
      } else {
        // Create new canonical link if it doesn't exist
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = correctCanonicalUrl;
        document.head.appendChild(canonicalLink);
      }

      // AGGRESSIVE FIX: Also update any canonical links that might be added later
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.tagName === 'LINK' && element.getAttribute('rel') === 'canonical') {
                  (element as HTMLLinkElement).href = correctCanonicalUrl;
                }
                // Also check children
                const canonicalLinks = element.querySelectorAll('link[rel="canonical"]');
                canonicalLinks.forEach((link) => {
                  (link as HTMLLinkElement).href = correctCanonicalUrl;
                });
              }
            });
          }
        });
      });

      observer.observe(document.head, {
        childList: true,
        subtree: true
      });

      // Cleanup observer after 5 seconds (should be enough for all components to load)
      setTimeout(() => observer.disconnect(), 5000);

      // Fix hreflang tags to match canonical URL
      const hrefLangLinks = document.querySelectorAll('link[hreflang]') as NodeListOf<HTMLLinkElement>;
      hrefLangLinks.forEach(link => {
        const hrefLang = link.getAttribute('hreflang');
        if (hrefLang === 'en' || hrefLang === 'x-default') {
          link.href = correctCanonicalUrl;
        } else if (hrefLang === 'nl-NL') {
          const dutchPath = currentPath === '/' ? '/nl' : `/nl${currentPath}`;
          link.href = `${baseUrl}${dutchPath}`;
        }
      });

      // Update Open Graph URL
      const ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      if (ogUrlMeta) {
        ogUrlMeta.content = correctCanonicalUrl;
      }

      // Update Twitter URL
      let twitterUrlMeta = document.querySelector('meta[name="twitter:url"]') as HTMLMetaElement;
      if (twitterUrlMeta) {
        twitterUrlMeta.content = correctCanonicalUrl;
      } else {
        // Create Twitter URL meta if it doesn't exist
        twitterUrlMeta = document.createElement('meta');
        twitterUrlMeta.name = 'twitter:url';
        twitterUrlMeta.content = correctCanonicalUrl;
        document.head.appendChild(twitterUrlMeta);
      }

      // Update structured data URLs
      const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
      structuredDataScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          
          // Update URLs in structured data
          if (data.url && data.url !== correctCanonicalUrl) {
            data.url = correctCanonicalUrl;
            script.textContent = JSON.stringify(data);
          }

          // Update @id references
          if (data['@id'] && data['@id'] !== correctCanonicalUrl) {
            data['@id'] = correctCanonicalUrl;
            script.textContent = JSON.stringify(data);
          }

          // Update nested URL references
          if (data.mainEntity && data.mainEntity.url) {
            data.mainEntity.url = correctCanonicalUrl;
            script.textContent = JSON.stringify(data);
          }
        } catch (error) {
          // Ignore malformed JSON
        }
      });

      console.log(`✅ Canonical URL fixed: ${correctCanonicalUrl}`);
    };

    // Run immediately
    fixCanonicalURLs();

    // Run after a short delay to ensure all SEO components have loaded
    const timer = setTimeout(fixCanonicalURLs, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // CRITICAL: Also run on component mount (as early as possible)
  useEffect(() => {
    const immediateCanonicalFix = () => {
      const baseUrl = 'https://www.octomatic.ai';
      let currentPath = pathname;

      if (currentPath.length > 1 && currentPath.endsWith('/')) {
        currentPath = currentPath.slice(0, -1);
      }

      const correctCanonicalUrl = currentPath === '/' ? `${baseUrl}/` : `${baseUrl}${currentPath}`;
      
      const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalLink) {
        canonicalLink.href = correctCanonicalUrl;
        console.log(`🚀 IMMEDIATE canonical fix: ${correctCanonicalUrl}`);
      }
    };

    // Run multiple times to ensure it takes effect immediately
    immediateCanonicalFix();
    setTimeout(immediateCanonicalFix, 0);
    setTimeout(immediateCanonicalFix, 10);
    setTimeout(immediateCanonicalFix, 50);
    setTimeout(immediateCanonicalFix, 100);
  }, []); // Run once on mount

  return null;
} 