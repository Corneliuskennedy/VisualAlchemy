import useLanguage from '@/contexts/LanguageContext';
import { modularTranslations } from '@/translations/modular';
import { TranslationStructure } from '@/translations/types';

/**
 * Enhanced translation hook with better type safety
 * Provides access to modular translations with autocomplete support
 */
export function useTranslations() {
  const { language } = useLanguage();
  
  const translations = modularTranslations[language] || modularTranslations.en;
  
  /**
   * Get a translation value by section and key
   * @param section - The translation section (e.g., 'navigation', 'hero')
   * @param key - The translation key (supports dot notation for nested keys)
   * @returns The translated string or fallback
   */
  const t = (section: keyof TranslationStructure, key: string): string => {
    try {
      const sectionData = translations[section];
      if (!sectionData) {
        return `${section}.${key}`;
      }

      // Handle nested keys with dot notation
      const keys = key.split('.');
      let value: any = sectionData;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return `${section}.${key}`;
        }
      }

      return typeof value === 'string' ? value : `${section}.${key}`;
    } catch (error) {
      return `${section}.${key}`;
    }
  };

  /**
   * Get an entire section of translations
   * @param section - The translation section
   * @returns The section data or empty object
   */
  const getSection = <K extends keyof TranslationStructure>(section: K): TranslationStructure[K] => {
    return translations[section] || {} as TranslationStructure[K];
  };

  /**
   * Get a nested object from a section
   * @param section - The translation section
   * @param key - The nested key
   * @returns The nested object or empty object
   */
  const getNested = (section: keyof TranslationStructure, key: string): any => {
    try {
      const sectionData = translations[section];
      if (!sectionData) return {};
      
      const keys = key.split('.');
      let value: any = sectionData;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return {};
        }
      }
      
      return value || {};
    } catch (error) {
      return {};
    }
  };

  return {
    language,
    t,
    getSection,
    getNested,
    translations
  };
} 