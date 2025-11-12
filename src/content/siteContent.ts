// File: src/content/siteContent.ts
// Single source of truth for all page content - "Content as Code"

// --- TYPE DEFINITIONS ---

export interface PageMeta {
  title: string;
  description: string;
}

export interface HeroData {
  headline: string;
  subline: string;
  ctaText: string;
}

export interface SegmentationCardData {
  title: string;
  description: string;
  ctaText: string;
  href: '/build' | '/optimize' | '/create';
}

export interface SocialProofData {
  headline?: string;
  logos: Array<{
    name: string;
    image: string;
    url?: string;
  }>;
}

export interface WhyUsSection {
  headline: string;
  description: string;
  points: Array<{
    title: string;
    description: string;
  }>;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  category: 'build' | 'optimize' | 'create';
  image?: string;
  metrics?: string;
  slug: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// --- CONTENT EXPORT ---

export interface SiteContent {
  homepage: {
    meta: PageMeta;
    hero: HeroData;
    segmentation: {
      headline: string;
      cards: SegmentationCardData[];
    };
    socialProof: SocialProofData;
    whyUs: WhyUsSection;
  };
  buildPage: {
    meta: PageMeta;
    hero: HeroData;
    process: {
      headline: string;
      steps: ProcessStep[];
    };
    caseStudies: CaseStudy[];
    pricing: {
      headline: string;
      tiers: PricingTier[];
    };
    cta: {
      headline: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
  };
  optimizePage: {
    meta: PageMeta;
    hero: HeroData;
    problemSolution: {
      headline: string;
      problem: string;
      solution: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    caseStudies: CaseStudy[];
    pricing: {
      headline: string;
      tiers: PricingTier[];
    };
    cta: {
      headline: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
  };
  createPage: {
    meta: PageMeta;
    hero: HeroData;
    portfolio: {
      headline: string;
      projects: CaseStudy[];
    };
    process: {
      headline: string;
      steps: ProcessStep[];
    };
    pricing: {
      headline: string;
      tiers: PricingTier[];
    };
    cta: {
      headline: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
  };
  projectenPage: {
    meta: PageMeta;
    headline: string;
    description: string;
  };
  overOnsPage: {
    meta: PageMeta;
    founderStory: {
      headline: string;
      content: string;
    };
    mission: {
      headline: string;
      content: string;
    };
    faq: FAQItem[];
  };
}

export const siteContent: SiteContent = {
  homepage: {
    meta: {
      title: 'Build. Optimize. Create. | Octomatic',
      description: 'Wij ontwerpen de systemen en produceren de content die intelligente groei aandrijft.',
    },
    hero: {
      headline: 'Build. Optimize. Create.',
      subline: 'Wij ontwerpen de systemen en produceren de content die intelligente groei aandrijft.',
      ctaText: 'Ontdek Hoe',
    },
    segmentation: {
      headline: 'Wat is je primaire doel vandaag?',
      cards: [
        {
          title: 'BUILD',
          description: 'Een Nieuw Systeem Bouwen - Voor het omzetten van een idee in een volledig geautomatiseerd platform, product of bedrijf.',
          ctaText: 'Ontdek de Lab →',
          href: '/build',
        },
        {
          title: 'OPTIMIZE',
          description: 'Een Bestaand Bedrijf Optimaliseren - Voor het elimineren van chaos, het verlagen van kosten en het schalen van je huidige operatie.',
          ctaText: 'Bekijk Automatisering →',
          href: '/optimize',
        },
        {
          title: 'CREATE',
          description: 'Virale Content Creëren - Voor het produceren van verbluffende, AI-gedreven visuals die je publiek boeien.',
          ctaText: 'Bekijk het Portfolio →',
          href: '/create',
        },
      ],
    },
    socialProof: {
      headline: '',
      logos: [
        { name: 'Client 1', image: '/logo/client1.svg' },
        { name: 'Client 2', image: '/logo/client2.svg' },
        { name: 'Client 3', image: '/logo/client3.svg' },
      ],
    },
    whyUs: {
      headline: 'De Synergie van Systeem & Verhaal',
      description: 'Waarom Octomatic? We combineren technische expertise met strategisch inzicht om resultaten te leveren die er toe doen.',
      points: [
        {
          title: 'Bewezen Expertise',
          description: '12+ startups gelanceerd, 200+ bedrijven geholpen',
        },
        {
          title: 'Snel & Efficiënt',
          description: 'Van idee naar werkend product in 30 dagen',
        },
        {
          title: 'Data-Driven',
          description: 'Elke beslissing wordt ondersteund door data en metingen',
        },
      ],
    },
  },
  buildPage: {
    meta: {
      title: 'Een Nieuw Systeem Bouwen | Octomatic',
      description: 'Van idee naar volledig geautomatiseerd platform in 30 dagen. MVP Sprint voor founders die snel willen valideren en lanceren.',
    },
    hero: {
      headline: 'Van Idee naar Werkend Systeem',
      subline: 'We bouwen de volledige architectuur en automatisering die je nieuwe platform, product of bedrijf nodig heeft.',
      ctaText: 'Plan een Project Scoping Call',
    },
    process: {
      headline: 'Ons Build Proces',
      steps: [
        {
          step: '1',
          title: 'Kickoff & Validatie',
          description: 'Idee validatie, marktonderzoek en MVP scope definitie samen met het team',
        },
        {
          step: '2',
          title: 'Prototype & Development',
          description: 'Rapid prototyping en eerste versie bouwen met user feedback loops',
        },
        {
          step: '3',
          title: 'Test & Iterate',
          description: 'User testing, data verzameling en product-market fit validatie',
        },
        {
          step: '4',
          title: 'Launch & Scale',
          description: 'Feedback implementatie, launch voorbereiding en next steps planning',
        },
      ],
    },
    caseStudies: [
      {
        title: 'Startup MVP in 30 Dagen',
        description: 'Van concept naar werkend platform met 37 signups in 2 weken',
        category: 'build',
        metrics: '37 signups in 2 weken',
        slug: 'startup-mvp-30-days',
      },
    ],
    pricing: {
      headline: 'Build Pricing',
      tiers: [
        {
          name: 'MVP Sprint',
          price: '€4.500',
          description: 'Volledige MVP ontwikkeling van idee tot werkend product',
          features: [
            'Idee validatie framework',
            'Hands-on development',
            'User testing & feedback',
            'Launch ondersteuning',
            '2 maanden follow-up',
          ],
          ctaText: 'Boek Fit Call',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Klaar om je idee te bouwen?',
      description: 'Laten we samen je visie omzetten in een werkend systeem.',
      ctaText: 'Plan een Project Scoping Call',
      ctaLink: '/contact',
    },
  },
  optimizePage: {
    meta: {
      title: 'Bestaande Business Optimaliseren | Octomatic',
      description: 'Elimineer chaos, verlaag kosten en schaal je operatie met bewezen automatisering. ROI Calculator beschikbaar.',
    },
    hero: {
      headline: 'Transformeer je Operatie',
      subline: 'We elimineren inefficiënties, automatiseren processen en verlagen kosten terwijl je schaalt.',
      ctaText: 'Boek een Gratis Proces Audit',
    },
    problemSolution: {
      headline: 'Het Profit Leak Probleem',
      problem: 'De meeste bedrijven verliezen €50.000+ per jaar aan inefficiënte processen, handmatig werk en gemiste automatisering kansen.',
      solution: 'Onze automatisering oplossingen elimineren deze lekken en creëren directe ROI.',
      features: [
        {
          title: 'CRM Buildouts',
          description: 'Volledig geautomatiseerde customer relationship management systemen',
        },
        {
          title: 'HR & Hiring Systems',
          description: 'Automatiseer recruitment, onboarding en HR processen',
        },
        {
          title: 'Lead Generation',
          description: 'Geautomatiseerde lead capture en nurturing systemen',
        },
        {
          title: 'Project Management',
          description: 'Workflow automatisering en project tracking systemen',
        },
      ],
    },
    caseStudies: [
      {
        title: '€50.000+ Bespaard per Jaar',
        description: 'Automatisering van HR en recruitment processen',
        category: 'optimize',
        metrics: '€50.000+ bespaard/jaar',
        slug: 'hr-automation-savings',
      },
    ],
    pricing: {
      headline: 'Optimize Pricing',
      tiers: [
        {
          name: 'Strategy Workshop',
          price: '€399',
          description: 'Perfecte start voor proces analyse en automatisering planning',
          features: [
            'Proces audit',
            'Automatisering roadmap',
            'ROI berekening',
            'Tech stack advies',
            'Implementatie strategie',
          ],
          ctaText: 'Boek Workshop',
          ctaLink: '/contact',
        },
        {
          name: 'Project Pricing',
          price: 'Op Maat',
          description: 'Volledige automatisering implementatie op maat',
          features: [
            'Alles uit Workshop',
            'Hands-on implementatie',
            'Training & documentatie',
            'Ongoing support',
            'ROI tracking',
          ],
          ctaText: 'Plan Gesprek',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Klaar om je bedrijf te optimaliseren?',
      description: 'Ontdek hoeveel tijd en geld je kunt besparen met automatisering.',
      ctaText: 'Boek een Gratis Proces Audit',
      ctaLink: '/contact',
    },
  },
  createPage: {
    meta: {
      title: 'Virale Content Creëren | Octomatic',
      description: 'Verbluffende, AI-gedreven visuals die je publiek boeien. Video reels, B-roll en visuele content op demand.',
    },
    hero: {
      headline: 'Viral Visuals. On Demand.',
      subline: 'We produceren verbluffende, AI-gedreven visuals die je publiek boeien en engagement genereren.',
      ctaText: 'Bekijk de Pakketten',
    },
    portfolio: {
      headline: 'Ons Werk',
      projects: [
        {
          title: 'AI B-Roll Reel',
          description: 'High-impact video content voor social media',
          category: 'create',
          metrics: '100K+ views',
          slug: 'ai-broll-reel',
        },
      ],
    },
    process: {
      headline: 'Hoe het Werkt',
      steps: [
        {
          step: '1',
          title: 'Brief & Concept',
          description: 'We bespreken je visie en creëren een creatief concept',
        },
        {
          step: '2',
          title: 'Production',
          description: 'AI-gedreven content creatie met state-of-the-art tools',
        },
        {
          step: '3',
          title: 'Delivery',
          description: 'Snelle levering van je visuele content, klaar voor gebruik',
        },
      ],
    },
    pricing: {
      headline: 'Create Pricing',
      tiers: [
        {
          name: 'Starter Package',
          price: '€299',
          description: 'Perfect voor kleine projecten en test content',
          features: [
            '5 AI visuals',
            'Basic editing',
            'Social media formats',
            '1 revisie ronde',
            '7 dagen levering',
          ],
          ctaText: 'Bestel Nu',
          ctaLink: '/contact',
        },
        {
          name: 'Pro Package',
          price: '€799',
          description: 'Voor serieuze content creators en merken',
          features: [
            '20 AI visuals',
            'Premium editing',
            'Alle formats',
            '3 revisie rondes',
            '5 dagen levering',
            'Priority support',
          ],
          ctaText: 'Bestel Nu',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Klaar om virale content te creëren?',
      description: 'Laten we samen visuals maken die je publiek boeien.',
      ctaText: 'Bekijk de Pakketten',
      ctaLink: '/contact',
    },
  },
  projectenPage: {
    meta: {
      title: 'Ons Werk | Octomatic',
      description: 'Bekijk onze portfolio van succesvolle projecten: Build, Optimize en Create.',
    },
    headline: 'Ons Werk',
    description: 'Een overzicht van onze beste projecten across alle drie pijlers.',
  },
  overOnsPage: {
    meta: {
      title: 'Over Ons | Octomatic',
      description: 'Leer meer over Octomatic, onze missie en waarom we doen wat we doen.',
    },
    founderStory: {
      headline: 'Het Verhaal van de Founder',
      content: 'Kennet Timmers heeft 12+ startups gelanceerd en honderden bedrijven geholpen met automatisering en groei. Zijn visie: systemen bouwen die intelligente groei mogelijk maken.',
    },
    mission: {
      headline: 'Waarom we doen wat we doen',
      content: 'We geloven dat elke ondernemer toegang moet hebben tot de tools en systemen die nodig zijn om te groeien. Door automatisering en intelligente systemen maken we groei toegankelijk voor iedereen.',
    },
    faq: [
      {
        question: 'Wat maakt Octomatic anders?',
        answer: 'We combineren technische expertise met strategisch inzicht. We bouwen niet alleen systemen, we bouwen systemen die groei mogelijk maken.',
      },
      {
        question: 'Hoe lang duurt een typisch project?',
        answer: 'Dit hangt af van de scope. MVP sprints duren 30 dagen, automatisering projecten variëren van 2-8 weken, en content projecten kunnen binnen een week worden geleverd.',
      },
      {
        question: 'Werken jullie alleen met Nederlandse bedrijven?',
        answer: 'We werken primair met Nederlandse en Belgische bedrijven, maar zijn open voor internationale projecten.',
      },
    ],
  },
};

