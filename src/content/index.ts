/**
 * Unified Content Export
 * Single source of truth for all content
 */

import { homepageContent } from './homepage';
import { commonContent } from './common';
import { navigationContent } from './navigation';
import { footerContent } from './footer';
import { problemsContent } from './problems';
import { statisticsContent } from './statistics';
import { servicesContent } from './services';
import { sectionsContent } from './sections';
import { formsContent } from './forms';
import { AllContent, Language } from './types';

// Export individual content modules
export { homepageContent } from './homepage';
export { commonContent } from './common';
export { navigationContent } from './navigation';
export { footerContent } from './footer';
export { problemsContent } from './problems';
export { statisticsContent } from './statistics';
export { servicesContent } from './services';
export { sectionsContent } from './sections';
export { formsContent } from './forms';
export * from './types';

/**
 * Get content for a specific language
 */
export function getContent<T>(content: { en: T; nl: T }, language: Language): T {
  return content[language] || content.en;
}

/**
 * Main content structure
 * Add new content modules here as they're created
 */
export const content: {
  homepage: typeof homepageContent;
  common: typeof commonContent;
  navigation: typeof navigationContent;
  footer: typeof footerContent;
  problems: typeof problemsContent;
  statistics: typeof statisticsContent;
  services: typeof servicesContent;
  sections: typeof sectionsContent;
  forms: typeof formsContent;
} = {
  homepage: homepageContent,
  common: commonContent,
  navigation: navigationContent,
  footer: footerContent,
  problems: problemsContent,
  statistics: statisticsContent,
  services: servicesContent,
  sections: sectionsContent,
  forms: formsContent,
};

