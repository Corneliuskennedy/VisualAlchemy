/**
 * Problems Content - Unified bilingual structure
 * Content for startup and SME problem sections
 */

import { ContentStructure } from './types';

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

export const problemsContent: ContentStructure<ProblemContent> = {
  en: {
    startup: {
      title: "The Founder's Cash Burn Dilemma",
      subtitle: 'Why founders burn cash on operations instead of finding customers',
      metrics: {
        timeWasted: '15-25 hours per week',
        cashBurn: '€3,000-€8,000/month',
        delayedValidation: '3-6 months delayed',
      },
      painPoints: [
        {
          title: 'Time Waste',
          description: 'You spend 15-25 hours per week on operational tasks instead of finding customers and validating your product.',
          impact: '15-25 hours per week',
          details: [
            'Manual bookkeeping and administration',
            'Email management and customer communication',
            'Project management and planning',
            'Reporting and data collection',
          ],
        },
        {
          title: 'Cash Burn Crisis',
          description: 'Every month spent on operations instead of customer discovery costs you €3,000-€8,000 in runway.',
          impact: '€3,000-€8,000/month',
          details: [
            'Extended time-to-market',
            'Increased operational costs',
            'Missed investment opportunities',
            'Delayed product-market fit',
          ],
        },
        {
          title: 'Validation Delay',
          description: "While you're busy with operations, competitors are 3-6 months ahead in product validation and market penetration.",
          impact: '3-6 months delayed',
          details: [
            'Missed early adopter momentum',
            'Lost competitive advantage',
            'Delayed feedback loops',
            'Slower iteration cycles',
          ],
        },
      ],
      reality: {
        badge: 'THE REALITY',
        headline: 'Every day without customers is a day closer to failure',
        description: "While you're doing bookkeeping, competitors are building customer relationships. While you're answering emails, they're validating product-market fit. The clock is ticking.",
        cta: {
          text: 'STOP THE WASTE - KICKOFF WORKSHOP',
          subtitle: '✓ 90 minutes ✓ Direct action plan ✓ Limited to 3 startups/month',
        },
      },
    },
    sme: {
      title: 'The Hidden Profit Leak',
      subtitle: 'How established businesses lose €67,560+ annually to manual processes',
      metrics: {
        annualLoss: '€67,560+ per year',
        timeWasted: '23 hours per week',
        errorCost: '€12,000/year',
      },
      costLeaks: [
        {
          title: 'Manual Processes',
          amount: '€35,000/year',
          description: 'Your team wastes 23 hours per week on repetitive tasks that could be automated.',
          details: [
            'Data entry between different systems',
            'Manual invoice processing',
            'Repetitive email communication',
            'Manual reporting and analysis',
          ],
        },
        {
          title: 'System Inefficiencies',
          amount: '€20,560/year',
          description: 'Disconnected systems and outdated workflows create unnecessary complexity and delays.',
          details: [
            'Data silos between departments',
            'Duplicate data entry',
            'Delayed decision making',
            'Inconsistent processes',
          ],
        },
        {
          title: 'Human Errors',
          amount: '€12,000/year',
          description: 'Manual processes lead to costly errors, rework, and customer dissatisfaction.',
          details: [
            'Invoice errors and corrections',
            'Incorrect customer data',
            'Missed deadlines',
            'Compliance violations',
          ],
        },
      ],
      reality: {
        badge: 'THE HIDDEN COSTS',
        headline: 'Total annual impact: €67,560+',
        description: 'These are conservative estimates based on Dutch SME companies. Your actual costs may be higher due to missed opportunities, customer dissatisfaction, and competitive disadvantage.',
        breakdown: {
          manual: '€35,000',
          inefficiencies: '€20,560',
          errors: '€12,000',
        },
        cta: {
          text: 'STOP THE MONEY LEAK - FREE AUDIT',
          subtitle: '✓ No obligations ✓ 100% free ✓ Immediate savings insights',
        },
      },
    },
  },
  nl: {
    startup: {
      title: "Het Founder's Cash Burn Dilemma",
      subtitle: 'Waarom founders geld verbranden aan operaties in plaats van klanten te vinden',
      metrics: {
        timeWasted: '15-25 uur per week',
        cashBurn: '€3.000-€8.000/maand',
        delayedValidation: '3-6 maanden vertraging',
      },
      painPoints: [
        {
          title: 'Tijd Verspilling',
          description: 'Je besteedt 15-25 uur per week aan operationele taken in plaats van klanten te vinden en je product te valideren.',
          impact: '15-25 uur per week',
          details: [
            'Handmatige boekhouding en administratie',
            'Email management en klantcommunicatie',
            'Projectmanagement en planning',
            'Rapportage en data verzameling',
          ],
        },
        {
          title: 'Cash Burn Crisis',
          description: 'Elke maand die je besteedt aan operaties in plaats van customer discovery kost je €3.000-€8.000 aan runway.',
          impact: '€3.000-€8.000/maand',
          details: [
            'Verlengde time-to-market',
            'Verhoogde operationele kosten',
            'Gemiste investeringsmogelijkheden',
            'Vertraagde product-market fit',
          ],
        },
        {
          title: 'Validatie Vertraging',
          description: 'Terwijl je bezig bent met operaties, lopen je concurrenten 3-6 maanden voor op product validatie en markt penetratie.',
          impact: '3-6 maanden vertraging',
          details: [
            'Gemiste early adopter momentum',
            'Concurrentie voordeel verlies',
            'Vertraagde feedback loops',
            'Langzamere iteratie cyclus',
          ],
        },
      ],
      reality: {
        badge: 'DE REALITEIT',
        headline: 'Elke dag zonder klanten is een dag dichter bij faillissement',
        description: 'Terwijl jij bezig bent met boekhouding, bouwen je concurrenten relaties met klanten. Terwijl jij emails beantwoordt, valideren zij hun product-market fit. De klok tikt.',
        cta: {
          text: 'STOP DE VERSPILLING - KICKOFF WORKSHOP',
          subtitle: '✓ 90 minuten ✓ Directe actieplan ✓ Beperkt tot 3 startups/maand',
        },
      },
    },
    sme: {
      title: 'Het Verborgen Winst Lek',
      subtitle: 'Hoe gevestigde bedrijven €67.560+ per jaar verliezen aan handmatige processen',
      metrics: {
        annualLoss: '€67.560+ per jaar',
        timeWasted: '23 uur per week',
        errorCost: '€12.000/jaar',
      },
      costLeaks: [
        {
          title: 'Handmatige Processen',
          amount: '€35.000/jaar',
          description: 'Uw team verspilt 23 uur per week aan repetitieve taken die geautomatiseerd kunnen worden.',
          details: [
            'Data invoer tussen verschillende systemen',
            'Handmatige factuurverwerking',
            'Repetitieve email communicatie',
            'Handmatige rapportage en analyses',
          ],
        },
        {
          title: 'Systeem Inefficiënties',
          amount: '€20.560/jaar',
          description: 'Losgekoppelde systemen en verouderde workflows creëren onnodige complexiteit en vertragingen.',
          details: [
            'Data silo\'s tussen afdelingen',
            'Dubbele data invoer',
            'Vertraagde besluitvorming',
            'Inconsistente processen',
          ],
        },
        {
          title: 'Menselijke Fouten',
          amount: '€12.000/jaar',
          description: 'Handmatige processen leiden tot kostbare fouten, hercorrectie en klantontevredenheid.',
          details: [
            'Factuur fouten en correcties',
            'Verkeerde klantgegevens',
            'Gemiste deadlines',
            'Compliance overtredingen',
          ],
        },
      ],
      reality: {
        badge: 'DE VERBORGEN KOSTEN',
        headline: 'Totale jaarlijkse impact: €67.560+',
        description: 'Dit zijn conservatieve schattingen gebaseerd op Nederlandse MKB bedrijven. Uw werkelijke kosten kunnen hoger zijn door gemiste kansen, klantontevredenheid en concurrentie nadeel.',
        breakdown: {
          manual: '€35.000',
          inefficiencies: '€20.560',
          errors: '€12.000',
        },
        cta: {
          text: 'STOP HET GELDLEK - GRATIS AUDIT',
          subtitle: '✓ Geen verplichtingen ✓ 100% gratis ✓ Direct inzicht in besparingen',
        },
      },
    },
  },
};




