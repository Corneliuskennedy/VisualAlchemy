/**
 * Unified Content Types
 * Type definitions for all content across the site
 */

export type Language = 'en' | 'nl';

// Base content structure
export interface ContentStructure<T> {
  en: T;
  nl: T;
}

// Homepage content
export interface HomepageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subline: string;
    ctaText: string;
  };
  segmentation: {
    headline: string;
    subheadline: string;
    cards: Array<{
      title: string;
      expandedTitle?: string;
      description: string;
      ctaText: string;
      href: '/build' | '/optimize' | '/create';
    }>;
  };
  socialProof: {
    headline: string;
  };
  whyUs: {
    headline: string;
    description: string;
    points: Array<{
      title: string;
      description: string;
    }>;
  };
  finalCta: {
    text: string;
  };
  team?: {
    headline: string;
    description: string;
    ctaText: string;
  };
}

// Navigation content
export interface NavigationContent {
  logo: string;
  menu: {
    howItWorks: string;
    pricing: string;
    blog: string;
    contact: string;
    getStarted: string;
    back: string;
  };
}

// Common/shared content
export interface CommonContent {
  skipToContent: string;
  trustedBy: string;
  startProject: string;
  learnMore: string;
  getStarted: string;
  contact: string;
  readMore: string;
  back: string;
}

// Service page content
export interface ServicePageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subline: string;
    ctaText: string;
  };
}

// Footer content
export interface FooterContent {
  description: string;
  company: {
    title: string;
    about: string;
    careers: string;
    blog: string;
    contact: string;
    strategicSolutions: string;
    gdprChecklist: string;
  };
  legal: {
    title: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  social: {
    title: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  copyright: string;
  contact: {
    email: string;
    phoneNumber: string;
    address: string;
    kvk: string;
    kvkNumber: string;
  };
}

// Problems content
export interface ProblemContent {
  startup: {
    title: string;
    subtitle: string;
    metrics: {
      timeWasted: string;
      cashBurn: string;
      delayedValidation: string;
    };
    painPoints: Array<{
      title: string;
      description: string;
      impact: string;
      details: string[];
    }>;
    reality: {
      badge: string;
      headline: string;
      description: string;
      cta: {
        text: string;
        subtitle: string;
      };
    };
  };
  sme: {
    title: string;
    subtitle: string;
    metrics: {
      annualLoss: string;
      timeWasted: string;
      errorCost: string;
    };
    costLeaks: Array<{
      title: string;
      amount: string;
      description: string;
      details: string[];
    }>;
    reality: {
      badge: string;
      headline: string;
      description: string;
      breakdown: {
        manual: string;
        inefficiencies: string;
        errors: string;
      };
      cta: {
        text: string;
        subtitle: string;
      };
    };
  };
}

// Statistics content
export interface StatisticsContent {
  headline: string;
  subheadline: string;
  stats: Array<{
    number: string;
    unit: string;
    description: string;
  }>;
}

// Services content
export interface ServicesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subline: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

// Sections content
export interface SectionsContent {
  solutions: {
    title: string;
    subtitle: string;
  };
  proof: {
    title: string;
    subtitle: string;
  };
  benefits: {
    title: string;
    subtitle: string;
  };
}

// Forms content
export interface FormsContent {
  contact: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    submit: string;
    submitting: string;
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
    responseTime: string;
  };
}

// All content structure
export interface AllContent {
  homepage: HomepageContent;
  navigation: NavigationContent;
  common: CommonContent;
  footer: FooterContent;
  problems: ProblemContent;
  statistics: StatisticsContent;
  services: ServicesContent;
  sections: SectionsContent;
  forms: FormsContent;
}

