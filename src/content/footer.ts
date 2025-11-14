/**
 * Footer Content - Unified bilingual structure
 */

import { ContentStructure } from './types';

export interface FooterContent {
  description: string;
  company: {
    title: string;
    about: string;
    ourWork: string;
    careers: string;
    blog: string;
    contact: string;
    strategicSolutions: string;
    gdprChecklist: string;
  };
  services: {
    optimize: string;
    build: string;
    create: string;
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

export const footerContent: ContentStructure<FooterContent> = {
  en: {
    description: 'We help B2B companies automate their processes to save time and scale efficiently.',
    company: {
      title: 'Company',
      about: 'About',
      ourWork: 'Our Work',
      careers: 'Careers',
      blog: 'Blog',
      contact: 'Contact',
      strategicSolutions: 'Strategic Solutions',
      gdprChecklist: 'GDPR Checklist',
    },
    services: {
      optimize: 'Optimize',
      build: 'Build',
      create: 'Create',
    },
    legal: {
      title: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
    },
    social: {
      title: 'Follow us',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      instagram: 'Instagram',
    },
    copyright: 'All rights reserved.',
    contact: {
      email: 'kennet@octomatic.ai',
      phoneNumber: '+31 6 46402090',
      address: 'Nieuwe Haven 27A, 1411 SG Naarden, Netherlands',
      kvk: 'KVK',
      kvkNumber: '12345678',
    },
  },
  nl: {
    description: 'We helpen B2B bedrijven hun processen te automatiseren om tijd te besparen en efficiënt te schalen.',
    company: {
      title: 'Bedrijf',
      about: 'Over ons',
      ourWork: 'Ons Werk',
      careers: 'Vacatures',
      blog: 'Blog',
      contact: 'Contact',
      strategicSolutions: 'Strategische Oplossingen',
      gdprChecklist: 'GDPR Checklist',
    },
    services: {
      optimize: 'Optimaliseren',
      build: 'Bouwen',
      create: 'Creëren',
    },
    legal: {
      title: 'Juridisch',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      cookies: 'Cookies',
    },
    social: {
      title: 'Volg ons',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      instagram: 'Instagram',
    },
    copyright: 'Alle rechten voorbehouden.',
    contact: {
      email: 'kennet@octomatic.ai',
      phoneNumber: '+31 6 46402090',
      address: 'Amsterdam, Nederland',
      kvk: 'KVK',
      kvkNumber: '12345678',
    },
  },
};



