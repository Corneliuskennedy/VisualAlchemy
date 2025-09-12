import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useLanguage from '@/contexts/LanguageContext';

/**
 * HTMLLangUpdater Component
 * 
 * Dynamically updates the HTML lang attribute based on the current language context.
 * This fixes the Ahrefs issue: "Hreflang and HTML lang mismatch"
 * 
 * The component:
 * 1. Detects the current language from URL path
 * 2. Updates the HTML lang attribute accordingly
 * 3. Ensures consistency between hreflang tags and HTML lang
 */
export function HTMLLangUpdater() {
  const { language } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Determine the correct language based on URL path and context
    const isNLPath = pathname.startsWith('/nl');
    const correctLang = isNLPath ? 'nl' : 'en';
    
    // Get the HTML element
    const htmlElement = document.documentElement;
    
    if (htmlElement) {
      // Update the lang attribute
      const currentLang = htmlElement.getAttribute('lang');
      
      if (currentLang !== correctLang) {
        htmlElement.setAttribute('lang', correctLang);
        
        // Log the change for debugging
        console.log(`🌐 HTML lang updated: ${currentLang} → ${correctLang} (path: ${pathname})`);
        
        // Dispatch a custom event for SEO monitoring
        window.dispatchEvent(new CustomEvent('htmlLangUpdated', {
          detail: {
            oldLang: currentLang,
            newLang: correctLang,
            path: pathname,
            timestamp: new Date().toISOString()
          }
        }));
      }
    }
  }, [pathname, language]);

  // This component doesn't render anything
  return null;
}

/**
 * Hook to monitor HTML lang attribute changes
 * Useful for testing and debugging
 */
export function useHTMLLangMonitor() {
  useEffect(() => {
    const handleLangUpdate = (event: CustomEvent) => {
      const { oldLang, newLang, path } = event.detail;
      
      // This can be used for analytics or debugging
      if (window.gtag) {
        window.gtag('event', 'html_lang_updated', {
          event_category: 'SEO',
          event_label: `${oldLang}_to_${newLang}`,
          custom_parameter_path: path
        });
      }
    };

    window.addEventListener('htmlLangUpdated', handleLangUpdate as EventListener);
    
    return () => {
      window.removeEventListener('htmlLangUpdated', handleLangUpdate as EventListener);
    };
  }, []);
} 