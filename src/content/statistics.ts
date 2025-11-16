/**
 * Statistics Content - Unified bilingual structure
 */

import { ContentStructure } from './types';

export interface StatisticsContent {
  headline: string;
  subheadline: string;
  stats: Array<{
    number: string;
    unit: string;
    description: string;
  }>;
}

export const statisticsContent: ContentStructure<StatisticsContent> = {
  en: {
    headline: 'The Hidden Cost of Manual Work',
    subheadline: 'Real numbers from Dutch businesses',
    stats: [
      {
        number: '23',
        unit: 'hours/week',
        description: 'Dutch businesses spend on repetitive tasks',
      },
      {
        number: '70%',
        unit: 'reduction',
        description: 'Manual work elimination in 90 days',
      },
      {
        number: '80%',
        unit: 'mistake',
        description: 'Companies automate billing first, but customer communication has 3x more impact',
      },
    ],
  },
  nl: {
    headline: 'De Verborgen Kosten van Handmatig Werk',
    subheadline: 'Echte cijfers van Nederlandse bedrijven',
    stats: [
      {
        number: '23',
        unit: 'uur/week',
        description: 'Nederlandse bedrijven besteden aan repetitieve taken',
      },
      {
        number: '70%',
        unit: 'reductie',
        description: 'Handmatig werk eliminatie in 90 dagen',
      },
      {
        number: '80%',
        unit: 'fout',
        description: 'Bedrijven automatiseren eerst facturatie, maar klantcommunicatie heeft 3x meer impact',
      },
    ],
  },
};




