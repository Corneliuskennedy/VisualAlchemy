/**
 * Unified Content Hook
 * Main hook for accessing all content based on current language
 */

'use client';

import { useMemo } from 'react';
import useLanguage from '@/contexts/LanguageContext';
import { content, getContent } from '@/content';
import type { Language } from '@/content/types';

/**
 * Main content hook - provides all content for current language
 */
export function useContent() {
  const { language } = useLanguage();

  return useMemo(() => ({
    language,
    homepage: getContent(content.homepage, language),
    common: getContent(content.common, language),
    navigation: getContent(content.navigation, language),
    footer: getContent(content.footer, language),
    problems: getContent(content.problems, language),
    statistics: getContent(content.statistics, language),
    services: getContent(content.services, language),
    sections: getContent(content.sections, language),
    forms: getContent(content.forms, language),
  }), [language]);
}

/**
 * Hook for homepage content specifically
 */
export function useHomepage() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.homepage, language), [language]);
}

/**
 * Hook for common/shared content
 */
export function useCommon() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.common, language), [language]);
}

/**
 * Hook for navigation content
 */
export function useNavigation() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.navigation, language), [language]);
}

/**
 * Hook for footer content
 */
export function useFooter() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.footer, language), [language]);
}

/**
 * Hook for problems content
 */
export function useProblems() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.problems, language), [language]);
}

/**
 * Hook for statistics content
 */
export function useStatistics() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.statistics, language), [language]);
}

/**
 * Hook for services content
 */
export function useServices() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.services, language), [language]);
}

/**
 * Hook for sections content
 */
export function useSections() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.sections, language), [language]);
}

/**
 * Hook for forms content
 */
export function useForms() {
  const { language } = useLanguage();
  return useMemo(() => getContent(content.forms, language), [language]);
}

