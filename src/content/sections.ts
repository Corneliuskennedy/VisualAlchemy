/**
 * Sections Content - Unified bilingual structure
 * Content for various page sections (solutions, proof, etc.)
 */

import { ContentStructure } from './types';

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

export const sectionsContent: ContentStructure<SectionsContent> = {
  en: {
    solutions: {
      title: 'Our Solutions',
      subtitle: 'How we solve your problems',
    },
    proof: {
      title: 'Social Proof',
      subtitle: 'Trusted by leading companies',
    },
    benefits: {
      title: 'Benefits',
      subtitle: 'What you get with our solutions',
    },
  },
  nl: {
    solutions: {
      title: 'Onze Oplossingen',
      subtitle: 'Hoe we uw problemen oplossen',
    },
    proof: {
      title: 'Social Proof',
      subtitle: 'Vertrouwd door toonaangevende bedrijven',
    },
    benefits: {
      title: 'Voordelen',
      subtitle: 'Wat u krijgt met onze oplossingen',
    },
  },
};




