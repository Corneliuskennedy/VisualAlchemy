import { TranslationStructure, Language } from '@/translations/types';

/**
 * Validates that all required translation keys exist
 * @param translations - The translations object to validate
 * @returns Array of missing keys
 */
export function validateTranslations(translations: Record<Language, TranslationStructure>): string[] {
  const missingKeys: string[] = [];
  
  // Get the English translations as the reference
  const reference = translations.en;
  
  // Check each language
  Object.entries(translations).forEach(([lang, langTranslations]) => {
    if (lang === 'en') return; // Skip English as it's our reference
    
    // Recursively check all keys
    checkMissingKeys(reference, langTranslations, '', missingKeys, lang);
  });
  
  return missingKeys;
}

/**
 * Recursively checks for missing translation keys
 */
function checkMissingKeys(
  reference: any, 
  target: any, 
  path: string, 
  missingKeys: string[], 
  language: string
): void {
  if (typeof reference !== 'object' || reference === null) return;
  
  Object.keys(reference).forEach(key => {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!(key in target)) {
      missingKeys.push(`${language}:${currentPath}`);
    } else if (typeof reference[key] === 'object' && reference[key] !== null) {
      checkMissingKeys(reference[key], target[key], currentPath, missingKeys, language);
    }
  });
}

/**
 * Extracts all translation keys from a translation structure
 * @param translations - The translation structure
 * @returns Array of all translation keys
 */
export function extractTranslationKeys(translations: any, prefix = ''): string[] {
  const keys: string[] = [];
  
  Object.keys(translations).forEach(key => {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof translations[key] === 'object' && translations[key] !== null) {
      keys.push(...extractTranslationKeys(translations[key], currentKey));
    } else {
      keys.push(currentKey);
    }
  });
  
  return keys;
}

/**
 * Formats a translation key for display
 * @param key - The translation key
 * @returns Formatted key
 */
export function formatTranslationKey(key: string): string {
  return key
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' → ');
}

/**
 * Creates a translation key suggestion based on the text
 * @param text - The text to create a key for
 * @returns Suggested translation key
 */
export function suggestTranslationKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '.')
    .substring(0, 50);
}

/**
 * Merges translation objects, with the second object taking precedence
 * @param base - Base translations
 * @param override - Override translations
 * @returns Merged translations
 */
export function mergeTranslations(base: any, override: any): any {
  const result = { ...base };
  
  Object.keys(override).forEach(key => {
    if (typeof override[key] === 'object' && override[key] !== null && !Array.isArray(override[key])) {
      result[key] = mergeTranslations(result[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  });
  
  return result;
}

/**
 * Creates a translation template for a new section
 * @param sectionName - Name of the section
 * @param keys - Array of translation keys
 * @returns Template object
 */
export function createTranslationTemplate(sectionName: string, keys: string[]): any {
  const template: any = {};
  
  keys.forEach(key => {
    const parts = key.split('.');
    let current = template;
    
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = `[${sectionName}.${key}]`;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });
  
  return template;
} 