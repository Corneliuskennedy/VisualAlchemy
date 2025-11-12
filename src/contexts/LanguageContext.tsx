'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { translations } from '@/translations/index';
import { usePathname, useRouter } from 'next/navigation';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    if (current === undefined) return `${path}`;
    return current[key];
  }, obj);
}

function isStorageAvailable(type: 'localStorage' | 'cookies'): boolean {
  try {
    if (type === 'localStorage') {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } else {
      document.cookie = '__cookie_test__=1';
      const result = document.cookie.indexOf('__cookie_test__') !== -1;
      document.cookie = '__cookie_test__=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      return result;
    }
  } catch (e) {
    return false;
  }
}

function safeGetLanguagePreference(): string | undefined {
  try {
    // Try cookies first
    if (isStorageAvailable('cookies')) {
      const cookieValue = Cookies.get('preferred-language');
      if (cookieValue) return cookieValue;
    }
    
    // Fallback to localStorage
    if (isStorageAvailable('localStorage')) {
      return localStorage.getItem('preferred-language') || undefined;
    }
  } catch (error) {
    console.warn('Storage access error:', error);
  }
  return undefined;
}

function safeSetLanguagePreference(value: string): void {
  try {
    // Try to set both when possible
    if (isStorageAvailable('cookies')) {
      Cookies.set('preferred-language', value, {
        sameSite: 'Strict',
        secure: true,
        path: '/',
        expires: 365
      });
    }
    
    if (isStorageAvailable('localStorage')) {
      localStorage.setItem('preferred-language', value);
    }
  } catch (error) {
    console.warn('Storage setting error:', error);
  }
}

function getInitialLanguage(): Language {
  // Always return 'en' as default to ensure server/client consistency
  // The actual language will be set in useEffect after hydration
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const pathname = usePathname();
  const router = useRouter();
  const isInitialMount = useRef(true);
  const isUpdatingUrl = useRef(false);
  const isUpdatingLanguage = useRef(false);

  // Set actual language after hydration to prevent hydration mismatch
  useEffect(() => {
    if (isInitialMount.current) {
      // Check URL path first
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path.startsWith('/nl')) {
          setLanguage('nl');
          return;
        }
      }
      
      // Then check stored preference
      const savedLang = safeGetLanguagePreference();
      if (savedLang && (savedLang === 'en' || savedLang === 'nl')) {
        setLanguage(savedLang as Language);
        return;
      }
      
      // Finally check browser language
      try {
        if (typeof navigator !== 'undefined') {
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith('nl')) {
            setLanguage('nl');
          }
        }
      } catch {
        // Keep default 'en'
      }
      
      isInitialMount.current = false;
    }
  }, []);

  // Persist language preference
  useEffect(() => {
    if (!isUpdatingLanguage.current && !isInitialMount.current) {
      safeSetLanguagePreference(language);
    }
  }, [language]);

  const t = (section: string, key: string): string => {
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
      if (!value) {
        return `${section}.${key}`;
      }

      return value;
    } catch (error) {
      return `${section}.${key}`;
    }
  };

  // Handle URL changes
  useEffect(() => {
    // Skip initial mount check remains the same
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If the URL is currently being updated by the language change effect,
    // just reset the flag and exit. Don't fight the language change.
    if (isUpdatingUrl.current) {
      // console.log("[URL Effect] Bailing out: URL update was in progress.");
      isUpdatingUrl.current = false;
      return;
    }

    // Determine language from URL
    const urlLang = pathname.startsWith('/nl') ? 'nl' : 'en';

    // If the URL language doesn't match the current state language,
    // it means the user navigated directly (e.g., back button, typed URL).
    // Update the language state to match the URL.
    if (language !== urlLang) {
      // console.log(`[URL Effect] URL changed to ${pathname}, mismatch with state (${language}). Setting language to ${urlLang}.`);
      isUpdatingLanguage.current = true; // Prevent language change effect from navigating
      setLanguage(urlLang);
      // Reset the flag *after* the state update cycle completes
      // Use a microtask to ensure it happens after the render triggered by setLanguage
      queueMicrotask(() => {
         isUpdatingLanguage.current = false;
         // console.log("[URL Effect] Reset isUpdatingLanguage flag.");
      });
    }
  }, [pathname]); // Dependency remains the same

  // Handle language changes (e.g., triggered by switcher)
  useEffect(() => {
    // Skip initial mount or if language is being updated by URL effect
    if (isInitialMount.current || isUpdatingLanguage.current) {
      return;
    }

    const currentPath = pathname;
    const shouldBeNL = language === 'nl';
    const isActuallyNL = currentPath.startsWith('/nl');

    // Skip navigation for pages that shouldn't redirect (checklist, auth pages)
    const skipRedirectPages = ['/checklist', '/nl/checklist', '/auth', '/nl/auth'];
    if (skipRedirectPages.some(page => currentPath === page || currentPath.startsWith(page + '/'))) {
      return;
    }

    // CRITICAL FIX: Prevent loop on homepage
    // If we're on homepage (/) and language is NL, middleware handles it - don't navigate
    if (currentPath === '/' && shouldBeNL && !isActuallyNL) {
      console.log(`[LANGUAGE_CONTEXT] Skipping navigation - middleware handles /nl -> / rewrite`);
      return;
    }

    // If the desired language state doesn't match the URL prefix, update URL
    if (shouldBeNL !== isActuallyNL) {
      // Calculate the correct new path
      const basePath = isActuallyNL ? currentPath.substring(3) || '/' : currentPath;
      const normalizedBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
      
      const newPath = shouldBeNL
        ? `/nl${normalizedBasePath === '/' ? '' : normalizedBasePath}`
        : normalizedBasePath;

      // Normalize paths for comparison (handle trailing slashes)
      const normalizePath = (p: string) => p === '/nl' ? '/nl/' : (p === '' ? '/' : p);
      const finalNewPath = normalizePath(newPath);
      const finalCurrentPath = normalizePath(currentPath);

      // Only navigate if path actually needs to change
      if (finalNewPath !== finalCurrentPath) {
        console.log(`[LANGUAGE_CONTEXT] Language mismatch detected. Current: ${currentPath}, Language: ${language}, Should be NL: ${shouldBeNL}, Navigating to: ${finalNewPath}`);
        
        // Prevent infinite loops by setting flag before navigation
        isUpdatingUrl.current = true;
        
        // Use replace to avoid adding to history
        router.replace(finalNewPath);
        
        // Reset flag after navigation completes
        setTimeout(() => {
          isUpdatingUrl.current = false;
          console.log(`[LANGUAGE_CONTEXT] Reset isUpdatingUrl flag after navigation`);
        }, 100);
      }
    }
  }, [language, router, pathname]);

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