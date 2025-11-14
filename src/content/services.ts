/**
 * Services Content - Unified bilingual structure
 */

import { ContentStructure } from './types';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subline: string;
  };
  services: ServiceItem[];
}

export const servicesContent: ContentStructure<ServicesContent> = {
  en: {
    meta: {
      title: 'AI Automation Services Amsterdam | Octomatic',
      description: 'Discover our AI automation services in Amsterdam. CRM buildouts, lead generation, project management and SOPs consulting.',
    },
    hero: {
      headline: 'Strategic Solutions',
      subline: 'Comprehensive automation services for Dutch SMEs',
    },
    services: [
      {
        id: 'lead-generation',
        title: 'Lead Generation',
        description: 'Automated lead generation systems that fill your pipeline with qualified prospects.',
      },
      {
        id: 'project-management',
        title: 'Project Management',
        description: 'Streamlined project management systems that keep your team aligned and productive.',
      },
      {
        id: 'hiring-systems',
        title: 'Hiring Systems',
        description: 'Automated hiring workflows that help you find and onboard the best talent.',
      },
      {
        id: 'ai-service-fulfillment',
        title: 'AI Service Fulfillment',
        description: 'AI-powered service delivery systems that scale your operations efficiently.',
      },
      {
        id: 'crm-buildouts',
        title: 'CRM Buildouts',
        description: 'Custom CRM solutions that transform your customer data into revenue-generating systems.',
      },
      {
        id: 'sops-consulting',
        title: 'SOPs Consulting',
        description: 'Standard Operating Procedures that ensure consistency and quality across your organization.',
      },
    ],
  },
  nl: {
    meta: {
      title: 'AI Automatisering Services Amsterdam | Octomatic',
      description: 'Ontdek onze AI automatisering services in Amsterdam. CRM buildouts, lead generation, project management en SOPs consulting.',
    },
    hero: {
      headline: 'Strategische Oplossingen',
      subline: 'Uitgebreide automatisering services voor Nederlandse MKB bedrijven',
    },
    services: [
      {
        id: 'lead-generation',
        title: 'Lead Generatie',
        description: 'Geautomatiseerde lead generatie systemen die uw pipeline vullen met gekwalificeerde prospects.',
      },
      {
        id: 'project-management',
        title: 'Project Management',
        description: 'Gestroomlijnde project management systemen die uw team aligned en productief houden.',
      },
      {
        id: 'hiring-systems',
        title: 'Wervingssystemen',
        description: 'Geautomatiseerde wervingsworkflows die u helpen de beste talenten te vinden en onboarden.',
      },
      {
        id: 'ai-service-fulfillment',
        title: 'AI Service Fulfillment',
        description: 'AI-gedreven service delivery systemen die uw operaties efficiënt schalen.',
      },
      {
        id: 'crm-buildouts',
        title: 'CRM Buildouts',
        description: 'Aangepaste CRM oplossingen die uw klantgegevens transformeren in omzetgenererende systemen.',
      },
      {
        id: 'sops-consulting',
        title: 'SOPs Consulting',
        description: 'Standard Operating Procedures die consistentie en kwaliteit in uw organisatie waarborgen.',
      },
    ],
  },
};



