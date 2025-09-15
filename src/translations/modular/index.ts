import { Translations } from '../types';
import { navigation } from '../sections/navigation';
import { hero } from '../sections/hero';
import { cta } from '../sections/cta';
import { problems } from '../sections/problems';
import { blueprint } from '../sections/blueprint';
import { socialProof } from '../sections/socialProof';

// Import the existing monolithic translations for now
// We'll gradually migrate sections to modular files
import { translations as existingTranslations } from '../index';

// Create the new modular structure
export const modularTranslations: Translations = {
  en: {
    // Use modular sections where available
    navigation: navigation.en,
    hero: hero.en,
    cta: cta.en,
    problems: problems.en,
    blueprint: blueprint.en,
    socialProof: socialProof.en,
    
    // Use existing translations for sections not yet modularized
    benefits: existingTranslations.en.benefits,
    services: existingTranslations.en.services,
    comparison: existingTranslations.en.comparison,
    process: existingTranslations.en.process,
    testimonials: existingTranslations.en.testimonials,
    pricing: existingTranslations.en.pricing,
    footer: existingTranslations.en.footer,
    finalCta: existingTranslations.en.finalCta,
    faq: existingTranslations.en.faq,
    blogInsights: existingTranslations.en.blogInsights,
    blogPage: existingTranslations.en.blogPage,
    contactPage: existingTranslations.en.contactPage as any,
    error: existingTranslations.en.error,
    common: existingTranslations.en.common,
    homePage: existingTranslations.en.homePage,
    getStartedPage: existingTranslations.en.getStartedPage,
    termsPage: existingTranslations.en.termsPage,
    privacyPage: existingTranslations.en.privacyPage,
    leadGenerationPage: existingTranslations.en.leadGenerationPage,
    projectManagementPage: existingTranslations.en.projectManagementPage,
    workflowOptimizationPage: existingTranslations.en.workflowOptimizationPage,
    servicesPage: existingTranslations.en.servicesPage,
    aiAmsterdamPage: existingTranslations.en.aiAmsterdamPage,
  },
  nl: {
    // Use modular sections where available
    navigation: navigation.nl,
    hero: hero.nl,
    cta: cta.nl,
    problems: problems.nl,
    blueprint: blueprint.nl,
    socialProof: socialProof.nl,
    
    // Use existing translations for sections not yet modularized
    benefits: existingTranslations.nl.benefits,
    services: existingTranslations.nl.services,
    comparison: existingTranslations.nl.comparison,
    process: existingTranslations.nl.process,
    testimonials: existingTranslations.nl.testimonials,
    pricing: existingTranslations.nl.pricing,
    footer: existingTranslations.nl.footer,
    finalCta: existingTranslations.nl.finalCta,
    faq: existingTranslations.nl.faq,
    blogInsights: existingTranslations.nl.blogInsights,
    blogPage: existingTranslations.nl.blogPage,
    contactPage: existingTranslations.nl.contactPage as any,
    error: existingTranslations.nl.error,
    common: existingTranslations.nl.common,
    homePage: existingTranslations.nl.homePage,
    getStartedPage: existingTranslations.nl.getStartedPage,
    termsPage: existingTranslations.nl.termsPage,
    privacyPage: existingTranslations.nl.privacyPage,
    leadGenerationPage: existingTranslations.nl.leadGenerationPage,
    projectManagementPage: existingTranslations.nl.projectManagementPage,
    workflowOptimizationPage: existingTranslations.nl.workflowOptimizationPage,
    servicesPage: existingTranslations.nl?.servicesPage || existingTranslations.en.servicesPage,
    aiAmsterdamPage: existingTranslations.nl?.aiAmsterdamPage || existingTranslations.en.aiAmsterdamPage,
  }
}; 