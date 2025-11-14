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
    problem?: {
      headline: string;
      description: string;
    };
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
    problem: {
      headline: string;
      description: string;
      calculatorCta?: string;
    };
    solutions: {
      headline: string;
      items: Array<{
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
    testimonial?: {
      headline: string;
      quote: string;
      author: string;
      authorTitle?: string;
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
    projects?: Array<{
      clientName: string;
      resultTagline: string;
      category: 'build' | 'optimize' | 'create';
      slug: string;
    }>;
  };
  overOnsPage: {
    meta: PageMeta;
    hero?: {
      headline: string;
      subline: string;
    };
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
      title: 'Build a New System | Octomatic',
      description: 'We de-risk your journey from concept to launch with a proven, 30-day sprint that delivers a fully automated platform, ready for your first users.',
    },
    hero: {
      // Alternative headlines:
      // Option 1: 'Your Vision, Architected.'
      // Option 2: 'From Idea to Impact, Intelligently.'
      // Option 3: 'Build the System. Streamline the Process. Create the Impact.'
      headline: 'From Idea to Impact, Intelligently.',
      subline: 'We de-risk your journey from concept to launch with a proven, 30-day sprint that delivers a fully automated platform, ready for your first users.',
      ctaText: 'Discover How It Works',
    },
    problem: {
      headline: 'The Race Against The Clock.',
      description: 'Every founder faces the same dilemma: launch quickly and risk building something nobody wants, or take your time and watch competitors beat you to market. The pressure is real. Investors want traction. Customers want solutions. You need validation—fast. But building the wrong thing costs more than time. It costs opportunity, momentum, and sometimes, your entire vision.',
    },
    process: {
      headline: 'Our 30-Day MVP Sprint.',
      steps: [
        {
          step: 'Week 1',
          title: 'Deep Dive & Strategy',
          description: 'We define your core value and map the path to revenue.',
        },
        {
          step: 'Week 2',
          title: 'System Architecture & Design',
          description: 'We build the robust, scalable foundation.',
        },
        {
          step: 'Week 3',
          title: 'Core Feature Implementation',
          description: 'We bring your vision to life with intelligent automation.',
        },
        {
          step: 'Week 4',
          title: 'Launch & First User Onboarding',
          description: 'We get you to market and start the feedback loop.',
        },
      ],
    },
    caseStudies: [
      {
        title: 'Case Study: How TechFlow launched their platform and secured pre-seed funding in 45 days',
        description: 'From concept to working product in 30 days, with 150+ beta users and a clear path to revenue.',
        category: 'build',
        metrics: '150+ beta users • Pre-seed funding secured',
        slug: 'techflow-launch',
      },
    ],
    pricing: {
      headline: 'Your Investment in Speed & Validation.',
      tiers: [
        {
          name: '90-Minute Validation Session',
          price: '€399',
          description: 'The perfect first step to de-risk an idea. We analyze your concept, identify potential pitfalls, and provide a clear roadmap forward.',
          features: [
            'Idea validation framework',
            'Market opportunity analysis',
            'Technical feasibility assessment',
            'Risk identification & mitigation',
            'Next steps roadmap',
          ],
          ctaText: 'Book Validation Session',
          ctaLink: '/contact',
        },
        {
          name: 'The 30-Day MVP Sprint',
          price: '€4,500',
          description: 'The complete package to go from idea to market. A fully automated platform, ready for your first users, delivered in 30 days.',
          features: [
            'Complete system architecture',
            'Core feature development',
            'Automated workflows',
            'User onboarding system',
            'Launch support & documentation',
            '30 days post-launch support',
          ],
          ctaText: 'Book a Project Scoping Call',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Ready to Build?',
      description: 'Let\'s turn your vision into a market-ready reality. Book a call to discuss your project.',
      ctaText: 'Book a Project Scoping Call',
      ctaLink: '/contact',
    },
  },
  optimizePage: {
    meta: {
      title: 'Optimize an Existing Business | Octomatic',
      description: 'We identify the hidden inefficiencies in your business and implement intelligent automation systems that add thousands back to your bottom line.',
    },
    hero: {
      // Alternative headlines:
      // Option 1: 'Eliminate Chaos. Unlock Profit.'
      // Option 2: 'Stop Leaking Profit.'
      // Option 3: 'Stop Wasting Money.'
      headline: 'Stop Leaking Profit.',
      subline: 'We identify the hidden inefficiencies in your business and implement intelligent automation systems that add thousands back to your bottom line.',
      ctaText: 'Book a Free Process Audit',
    },
    problem: {
      headline: 'Your Business is Leaking €67,560 Annually. We\'ll Prove It.',
      description: 'Manual tasks, repetitive work, and disconnected systems act as a hidden tax on your business. Every hour spent on data entry, every email that gets lost, every process that requires human intervention—it all adds up. While you\'re busy running the business, money is quietly slipping away. The good news? These leaks are fixable. Use our free calculator to estimate your company\'s potential savings.',
      calculatorCta: 'Use our free calculator to estimate your company\'s potential savings.',
    },
    solutions: {
      headline: 'Our Automation Toolkit.',
      items: [
        {
          title: 'CRM Buildouts',
          description: 'A central system for all customer data.',
        },
        {
          title: 'Hiring & HR Systems',
          description: 'Automating the talent pipeline.',
        },
        {
          title: 'Project Management Systems',
          description: 'A single source of truth for all projects.',
        },
        {
          title: 'AI Service Fulfillment',
          description: 'Delivering your services 3x faster.',
        },
      ],
    },
    caseStudies: [
      {
        title: 'Case Study: How GreenTech Solutions reduced manual data entry by 80% and saved €45,000 in the first year',
        description: 'By automating their CRM and project management workflows, they eliminated 25 hours of manual work per week and improved customer response times by 60%.',
        category: 'optimize',
        metrics: '80% reduction • €45,000 saved/year',
        slug: 'greentech-automation',
      },
    ],
    pricing: {
      headline: 'Your Investment in a Scalable Future.',
      tiers: [
        {
          name: 'Value Stream Mapping Workshop',
          price: '€1,497',
          description: 'The essential first step to identifying your biggest profit leaks. We map your entire operation, identify inefficiencies, and provide a prioritized automation roadmap.',
          features: [
            'Complete process audit',
            'Value stream mapping',
            'Profit leak identification',
            'Prioritized automation roadmap',
            'ROI projections',
            'Implementation strategy',
          ],
          ctaText: 'Book Workshop',
          ctaLink: '/contact',
        },
        {
          name: 'Custom Implementation Project',
          price: '€5,000+',
          description: 'The hands-on solution to build and deploy the automations. We implement the systems, train your team, and ensure everything works seamlessly.',
          features: [
            'Everything from Workshop',
            'Custom automation development',
            'System integration',
            'Team training & documentation',
            '30 days post-launch support',
            'ROI tracking & optimization',
          ],
          ctaText: 'Book a Free Process Audit',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Ready to Optimize?',
      description: 'Stop losing money to inefficiency. Book a free audit and discover how much your business could save.',
      ctaText: 'Book a Free Process Audit',
      ctaLink: '/contact',
    },
  },
  createPage: {
    meta: {
      title: 'Create Viral Content | Octomatic',
      description: 'We produce stunning, AI-powered B-roll and visuals that give your content the cinematic quality it deserves.',
    },
    hero: {
      // Alternative headlines:
      // Option 1: 'Viral Visuals. On Demand.'
      // Option 2: 'The End of Stock Footage.'
      // Option 3: 'Content That Captivates.'
      headline: 'Content That Captivates.',
      subline: 'We produce stunning, AI-powered B-roll and visuals that give your content the cinematic quality it deserves.',
      ctaText: 'See Packages & Pricing',
    },
    portfolio: {
      headline: 'Trusted by Creators Who Demand Excellence.',
      projects: [
        {
          title: 'AI B-Roll Reel - Tech Channel',
          description: 'High-impact video content for social media',
          category: 'create',
          metrics: 'Views: 2.3M • 30s Retention: 78% • Likes: 45K',
          slug: 'ai-broll-reel-tech',
        },
        {
          title: 'AI B-Roll Reel - Finance Channel',
          description: 'Cinematic visuals for financial content',
          category: 'create',
          metrics: 'Views: 1.8M • 30s Retention: 82% • Likes: 38K',
          slug: 'ai-broll-reel-finance',
        },
      ],
    },
    process: {
      headline: 'Your Vision, Automated.',
      steps: [
        {
          step: '1',
          title: 'The Brief',
          description: 'You provide your script or concept.',
        },
        {
          step: '2',
          title: 'The Creation',
          description: 'Our AI-powered system generates a library of stunning, relevant visuals.',
        },
        {
          step: '3',
          title: 'The Delivery',
          description: 'You receive a folder of high-resolution footage, ready to edit.',
        },
      ],
    },
    testimonial: {
      headline: 'Why the Fastest-Growing Channels Choose Octomatic.',
      quote: 'Octomatic\'s visuals transformed our content. The quality is cinematic, the turnaround is lightning-fast, and our audience engagement has never been higher. This is the secret weapon every creator needs.',
      author: 'Black Swan Capitalist',
      authorTitle: 'YouTube Creator, 500K+ Subscribers',
    },
    pricing: {
      headline: 'Packages Designed for Impact.',
      tiers: [
        {
          name: 'The Starter Pack',
          price: '€299',
          description: 'Perfect for a single, high-impact video. Get stunning visuals that elevate your content without breaking the bank.',
          features: [
            '10 AI-generated visuals',
            'HD resolution (1080p)',
            'All social media formats',
            '1 revision round',
            '5-day delivery',
          ],
          ctaText: 'Order Now',
          ctaLink: '/contact',
        },
        {
          name: 'The Growth Bundle',
          price: '€799',
          description: 'The best value for creators producing regular content. A steady stream of premium visuals to keep your audience engaged.',
          features: [
            '30 AI-generated visuals',
            '4K resolution available',
            'All formats + custom sizes',
            '3 revision rounds',
            '3-day delivery',
            'Priority support',
            'Monthly refresh option',
          ],
          ctaText: 'Order Now',
          ctaLink: '/contact',
        },
        {
          name: 'The Viral Enterprise',
          price: 'Custom',
          description: 'For agencies and brands needing unlimited creative assets. Unlimited visuals, dedicated support, and custom workflows.',
          features: [
            'Unlimited AI visuals',
            '4K & custom resolutions',
            'Dedicated account manager',
            'Unlimited revisions',
            '24-hour delivery',
            'Custom workflows',
            'White-label options',
          ],
          ctaText: 'Contact Sales',
          ctaLink: '/contact',
        },
      ],
    },
    cta: {
      headline: 'Ready to Create?',
      description: 'Stop settling for stock footage. Get visuals that stop the scroll and captivate your audience.',
      ctaText: 'See Packages & Pricing',
      ctaLink: '/contact',
    },
  },
  projectenPage: {
    meta: {
      title: 'Ons Werk | Octomatic',
      description: 'Bewezen resultaten. Tastbare impact. Ontdek een selectie van onze projecten binnen onze drie kerndisciplines.',
    },
    headline: 'Bewezen Resultaten. Tastbare Impact.',
    description: 'Wij meten ons succes aan het succes van onze klanten. Ontdek een selectie van onze projecten binnen onze drie kerndisciplines.',
    projects: [
      {
        clientName: 'Bewuste Vakantie',
        resultTagline: 'Een complete digitale transformatie van idee tot een succesvolle lancering.',
        category: 'build',
        slug: 'bewuste-vakantie',
      },
      {
        clientName: '[Automation Client]',
        resultTagline: 'Meer dan 20 uur aan handmatig werk per week geëlimineerd door intelligente procesautomatisering.',
        category: 'optimize',
        slug: 'automation-client',
      },
      {
        clientName: 'Black Swan Capitalist',
        resultTagline: 'Een kijker retentie van meer dan 70% behaald op YouTube met AI-gedreven visuele content.',
        category: 'create',
        slug: 'black-swan-capitalist',
      },
    ],
  },
  overOnsPage: {
    meta: {
      title: 'Over Ons | Octomatic',
      description: 'Wij zijn architecten van groei, geen technici. Ontdek onze reis en missie.',
    },
    hero: {
      // Alternative headlines:
      // Option 1: 'Wij zijn architecten van groei, geen technici.'
      // Option 2: 'De Synergie van Systeem & Verhaal.'
      // Option 3: 'Waar Intelligente Automatisering en Creatieve Impact Samenkomen.'
      headline: 'Wij zijn architecten van groei, geen technici.',
      subline: 'Onze reis heeft ons één ding geleerd: echte groei ontstaat wanneer intelligente systemen en meeslepende creativiteit perfect synchroon werken.',
    },
    founderStory: {
      headline: 'Mijn Reis: Van Code naar Creativiteit, en Terug.',
      content: 'Van jongs af aan werd ik gedreven door een fascinatie voor efficiëntie. Ik zag systemen—zowel digitaal als menselijk—en zag onmiddellijk hoe ze beter konden. Het oplossen van complexe puzzels en het elimineren van chaos door slimme automatisering was niet alleen werk; het was een passie. Het bracht een diepe voldoening om processen te stroomlijnen en te zien hoe een goed geoptimaliseerd systeem een bedrijf vleugels kon geven.\n\nNa jaren van het optimaliseren van bestaande structuren, verschoof mijn focus. Ik wilde niet langer alleen repareren, maar creëren. Dit leidde tot de oprichting van een "startup lab," waar we nieuwe digitale producten vanaf de grond opbouwden. De kick om een abstract idee om te zetten in een tastbaar, functioneel product was verslavend. Hier leerde ik wat er nodig is om een visie om te zetten in een robuust, schaalbaar systeem.\n\nDe meest onverwachte wending in mijn carrière kwam toen een klant, Black Swan Capitalist, me vroeg om AI-gedreven B-roll voor hun YouTube-kanaal te produceren. Ik dook in de wereld van visuele storytelling en realiseerde me iets fundamenteels: het beste systeem ter wereld is nutteloos als het de aandacht niet kan vangen. Een briljant product zonder een meeslepend verhaal is als een motor zonder brandstof.\n\nDeze drie ervaringen—Optimaliseren, Bouwen en Creëren—smolten samen tot de kernfilosofie van Octomatic. Ik realiseerde me dat duurzame groei geen kwestie is van één van deze pilaren, maar van de naadloze integratie van alle drie. Je hebt een efficiënte motor, een solide chassis en een design dat de aandacht trekt nodig om de race te winnen.',
    },
    mission: {
      headline: 'Onze Missie: Groei Moeiteloos Laten Voelen.',
      content: 'Wij zijn er om ambitieuze bedrijven te bevrijden van de dagelijkse operationele chaos. Door een fundament van intelligente systemen en boeiende content te bouwen, creëren we de ruimte voor jou om te focussen op wat echt telt: innovatie, visie en de groei van je bedrijf.',
    },
    faq: [
      {
        question: 'Zijn jullie een eenmanszaak?',
        answer: 'Octomatic is een boutique agency, en dat is ons grootste voordeel. Je krijgt directe toegang tot de hoofd-architect, wat topkwaliteit, duidelijke communicatie en één vast aanspreekpunt garandeert. Voor grotere projecten schalen we op met een vertrouwd netwerk van gespecialiseerde professionals.',
      },
      {
        question: 'Waarom drie verschillende diensten? Zijn die niet compleet verschillend?',
        answer: 'Ze lijken verschillend, maar in de praktijk versterken ze elkaar constant. Ons diepgaand begrip van hoe een bedrijf schaalt (Optimaliseren) stelt ons in staat om betere producten te Bouwen. En onze expertise in het vangen van aandacht (Creëren) zorgt ervoor dat de systemen en producten die we bouwen ook daadwerkelijk succesvol zijn in de markt.',
      },
      {
        question: 'Wie is jullie ideale klant?',
        answer: 'Onze ideale klant is een ambitieuze oprichter of ondernemer die begrijpt dat succes op de lange termijn zowel een ijzersterk operationeel fundament als een meeslepend merkverhaal vereist. Ze zoeken geen snelle trucjes, maar een strategische partner voor duurzame groei.',
      },
    ],
  },
};

