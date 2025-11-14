/**
 * Simplified Language Context
 * Single source of truth: URL determines language
 * No race conditions, no complex flags
 */

'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/translations/index';
import type { Language } from '@/content/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper: Get language from URL path
function getLanguageFromPath(pathname: string): Language {
  return pathname.startsWith('/nl') ? 'nl' : 'en';
}

// Helper: Get nested translation value
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    if (current === undefined) return `${path}`;
    return current[key];
  }, obj);
}

// Helper: Safe storage access
function safeGetLanguagePreference(): Language | null {
  try {
    if (typeof window === 'undefined') return null;
    
    // Try cookies first
    const cookieValue = Cookies.get('preferred-language');
    if (cookieValue === 'en' || cookieValue === 'nl') {
      return cookieValue as Language;
    }
    
    // Fallback to localStorage
    const stored = localStorage.getItem('preferred-language');
    if (stored === 'en' || stored === 'nl') {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Storage access error:', error);
  }
  return null;
}

function safeSetLanguagePreference(value: Language): void {
  try {
    if (typeof window === 'undefined') return;
    
    Cookies.set('preferred-language', value, {
      sameSite: 'Strict',
      secure: true,
      path: '/',
      expires: 365
    });
    
    localStorage.setItem('preferred-language', value);
  } catch (error) {
    console.warn('Storage setting error:', error);
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('en');
  const isInitialized = useRef(false);
  const isNavigating = useRef(false);

  // Initialize language from URL on mount
  useEffect(() => {
    if (isInitialized.current) return;
    
    const urlLang = getLanguageFromPath(pathname);
    
    // If URL has language, use it
    if (pathname.startsWith('/nl') || pathname === '/') {
      setLanguageState(urlLang);
      isInitialized.current = true;
      return;
    }
    
    // Otherwise check stored preference
    const savedLang = safeGetLanguagePreference();
    if (savedLang) {
      setLanguageState(savedLang);
      // Navigate to correct URL if needed
      if (savedLang === 'nl' && !pathname.startsWith('/nl')) {
        const newPath = `/nl${pathname === '/' ? '' : pathname}`;
        router.replace(newPath);
      }
    } else {
      // Check browser language as last resort
      try {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('nl')) {
          setLanguageState('nl');
          if (!pathname.startsWith('/nl')) {
            router.replace(`/nl${pathname === '/' ? '' : pathname}`);
          }
        }
      } catch {
        // Keep default 'en'
      }
    }
    
    isInitialized.current = true;
  }, [pathname, router]);

  // Sync language state with URL changes (e.g., back button, direct navigation)
  useEffect(() => {
    if (!isInitialized.current || isNavigating.current) return;
    
    const urlLang = getLanguageFromPath(pathname);
    if (language !== urlLang) {
      setLanguageState(urlLang);
    }
  }, [pathname, language]);

  // Persist language preference when it changes
  useEffect(() => {
    if (!isInitialized.current) return;
    safeSetLanguagePreference(language);
  }, [language]);

  // Set language function - updates state and navigates to correct URL
  const setLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    
    isNavigating.current = true;
    setLanguageState(newLanguage);
    
    // Calculate new path
    let basePath = pathname.startsWith('/nl') 
      ? pathname.slice(3) || '/' 
      : pathname;
    
    // Ensure basePath is normalized (starts with /)
    if (!basePath.startsWith('/')) {
      basePath = '/' + basePath;
    }
    
    // Handle root path specially
    if (basePath === '/nl' || basePath === '') {
      basePath = '/';
    }
    
    // Build new path based on language
    let newPath: string;
    if (newLanguage === 'nl') {
      // For Dutch, add /nl prefix
      if (basePath === '/') {
        newPath = '/nl';
      } else {
        newPath = `/nl${basePath}`;
      }
    } else {
      // For English, remove /nl prefix if present
      newPath = basePath;
    }
    
    // Skip navigation for special pages
    const skipPages = ['/checklist', '/auth'];
    if (skipPages.some(page => basePath.startsWith(page))) {
      isNavigating.current = false;
      return;
    }
    
    // Navigate to new path
    // Use router.push for client-side navigation (faster, no full reload)
    // The middleware will handle the /nl/* rewrite on the server
    router.push(newPath);
    
    // Reset navigation flag after a short delay
    setTimeout(() => {
      isNavigating.current = false;
    }, 100);
  }, [language, pathname, router]);

  // Translation function (kept for backward compatibility)
  const t = useCallback((section: string, key: string): string => {
    try {
      const langData = translations[language];
      if (!langData) {
        return `${section}.${key}`;
      }

      const sectionData = langData[section as keyof typeof langData];
      if (!sectionData) {
        return `${section}.${key}`;
      }

      const value = getNestedValue(sectionData, key);
      if (!value || typeof value !== 'string') {
        return `${section}.${key}`;
      }

      return value;
    } catch (error) {
      return `${section}.${key}`;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default useLanguage;
