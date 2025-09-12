// Base translation types
export type Language = 'en' | 'nl';

// Navigation translations
export interface NavigationTranslations {
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

// Hero section translations
export interface HeroTranslations {
  kicker: string;
  title1: string;
  title2: string;
  subtitle: string;
}

// CTA translations
export interface CtaTranslations {
  growthCall: string;
  exploreSolutions: string;
}

// Problems section translations
export interface ProblemsTranslations {
  title: string;
  subtitle: string;
  description: string;
  repetitiveTasks: {
    metric: string;
    title: string;
    description: string;
  };
  outdatedSystems: {
    metric: string;
    title: string;
    description: string;
  };
  missingData: {
    metric: string;
    title: string;
    description: string;
  };
}

// Benefits section translations
export interface BenefitsTranslations {
  headerTitle: string;
  headerSubtitle: string;
  headerDescription: string;
  aiAutomationTitle: string;
  aiAutomationDescription: string;
  realTimeIntelligenceTitle: string;
  realTimeIntelligenceDescription: string;
  futureProofGrowthTitle: string;
  futureProofGrowthDescription: string;
  expertPartnershipTitle: string;
  expertPartnershipDescription: string;
}

// Services translations
export interface ServicesTranslations {
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  leadGeneration: {
    title: string;
    description: string;
  };
  projectManagement: {
    title: string;
    description: string;
  };
  hiringSystems: {
    title: string;
    description: string;
  };
  aiService: {
    title: string;
    description: string;
  };
  crmBuildouts: {
    title: string;
    description: string;
  };
  sops: {
    title: string;
    description: string;
  };
  automationRoi: {
    title: string;
    description: string;
  };
  gdprCompliant: {
    title: string;
    description: string;
  };
}

// Comparison translations
export interface ComparisonTranslations {
  title: string;
  subtitle: string;
  freelancers: {
    title: string;
    price: string;
    timeToStart: string;
    expertise: string;
    timelines: string;
    replacement: string;
  };
  inHouse: {
    title: string;
    price: string;
    timeToStart: string;
    expertise: string;
    timelines: string;
    replacement: string;
  };
  agencies: {
    title: string;
    price: string;
    timeToStart: string;
    expertise: string;
    timelines: string;
    replacement: string;
  };
  ourService: {
    title: string;
    price: string;
    timeToStart: string;
    expertise: string;
    timelines: string;
    replacement: string;
  };
}

// Process translations
export interface ProcessTranslations {
  title: string;
  subtitle: string;
  steps: {
    step1: {
      title: string;
      description: string;
      timeline: string;
      subtitle: string;
      guarantee: string;
    };
    step2: {
      title: string;
      description: string;
      timeline: string;
      subtitle: string;
      nextStep: string;
    };
    step3: {
      title: string;
      description: string;
      timeline: string;
      subtitle: string;
      nextStep: string;
    };
  };
}

// Testimonials translations
export interface TestimonialsTranslations {
  title: string;
  subtitle: string;
  testimonial1: {
    quote: string;
    author: string;
    logo: string;
  };
  testimonial2: {
    quote: string;
    author: string;
    logo: string;
  };
  testimonial3: {
    quote: string;
    author: string;
    logo: string;
  };
  cta: {
    title: string;
    button: string;
  };
}

// Pricing translations
export interface PricingTranslations {
  title: string;
  subtitle: string;
  perMonth: string;
  getStarted: string;
  mostPopular: string;
  starter: {
    title: string;
    subtitle: string;
    type: string;
    price: string;
    description: string;
    features: {
      feature1: string;
      feature2: string;
      feature3: string;
      feature4: string;
      feature5: string;
    };
    cta: string;
  };
  growth: {
    title: string;
    subtitle: string;
    type: string;
    price: string;
    description: string;
    features: {
      feature1: string;
      feature2: string;
      feature3: string;
      feature4: string;
    };
    cta: string;
  };
  enterprise: {
    title: string;
    subtitle: string;
    type: string;
    price: string;
    description: string;
    features: {
      feature1: string;
      feature2: string;
      feature3: string;
      feature4: string;
      feature5: string;
    };
    cta: string;
  };
}

// Footer translations
export interface FooterTranslations {
  description: string;
  copyright: string;
  company: {
    title: string;
    about: string;
    careers: string;
    contact: string;
    blog: string;
    legal: string;
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
}

// Final CTA translations
export interface FinalCtaTranslations {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  disclaimer: string;
}

// FAQ translations
export interface FaqTranslations {
  title: string;
  subtitle: string;
  questions: {
    q1: { question: string; answer: string };
    q2: { question: string; answer: string };
    q3: { question: string; answer: string };
    q4: { question: string; answer: string };
    q5: { question: string; answer: string };
    q6: { question: string; answer: string };
    q7: { question: string; answer: string };
    q8: { question: string; answer: string };
    q9: { question: string; answer: string };
    q10: { question: string; answer: string };
  };
}

// Blog insights translations (matching actual structure)
export interface BlogInsightsTranslations {
  title: string;
  viewAll: string;
}

// Blog page translations
export interface BlogPageTranslations {
  metaTitle: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  searchPlaceholder: string;
  noResults: string;
  categories: {
    all: string;
    automation: string;
    ai: string;
    business: string;
    strategy: string;
    technology: string;
  };
  readMore: string;
  minuteRead: string;
  publishedOn: string;
  author: string;
}

// Contact page translations
export interface ContactPageTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  form: {
    name: string;
    email: string;
    company: string;
    message: string;
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
    sendAnother: string;
    responseTime: string;
  };
  info: {
    title: string;
    email: string;
    phone: string;
    phoneNumber: string;
    address: string;
    addressValue: string;
    kvk: string;
    kvkNumber: string;
    hours: string;
    hoursValue: string;
  };
}

// Error translations
export interface ErrorTranslations {
  pageNotFound: string;
  somethingWentWrong: string;
  reload: string;
}

// Common translations
export interface CommonTranslations {
  backToHome: string;
}

// Page-specific translations
export interface PageTranslations {
  home: {
    metaTitle: string;
    metaDescription: string;
  };
  getStarted: {
    metaTitle: string;
    h1: string;
    metaDescription: string;
  };
  terms: {
    metaTitle: string;
    metaDescription: string;
  };
  privacy: {
    metaTitle: string;
    h1: string;
    metaDescription: string;
  };
}

// Service page translations
export interface ServicePageTranslations {
  leadGeneration: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    mainContent: {
      p1: string;
      p2: string;
    };
    benefits: {
      title: string;
      b1: {
        title: string;
        description: string;
      };
      b2: {
        title: string;
        description: string;
      };
      b3: {
        title: string;
        description: string;
      };
      b4: {
        title: string;
        description: string;
      };
      b5: {
        title: string;
        description: string;
      };
      b6: {
        title: string;
        description: string;
      };
    };
    process: {
      title: string;
      steps: {
        step1: {
          title: string;
          description: string;
        };
        step2: {
          title: string;
          description: string;
        };
        step3: {
          title: string;
          description: string;
        };
        step4: {
          title: string;
          description: string;
        };
      };
    };
    faq: {
      title: string;
      q1: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
      q2: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
      q3: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
    };
    cta: {
      title: string;
      description: string;
      guarantee: string;
      button: string;
    };
  };
  projectManagement: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    mainContent: {
      p1: string;
      p2: string;
    };
    platformCompatibility: {
      title: string;
      description: string;
      platforms: string[];
    };
    difference: {
      title: string;
      d1: {
        title: string;
        description: string;
      };
      d2: {
        title: string;
        description: string;
      };
      d3: {
        title: string;
        description: string;
      };
      d4: {
        title: string;
        description: string;
      };
      d5: {
        title: string;
        description: string;
      };
      d6: {
        title: string;
        description: string;
      };
    };
    process: {
      title: string;
      steps: {
        step1: {
          title: string;
          description: string;
        };
        step2: {
          title: string;
          description: string;
        };
        step3: {
          title: string;
          description: string;
        };
        step4: {
          title: string;
          description: string;
        };
      };
    };
    faq: {
      title: string;
      q1: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
      q2: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
      q3: {
        question: string;
        answer: string;
        questionNL: string;
        answerNL: string;
      };
    };
    cta: {
      title: string;
      description: string;
      guarantee: string;
      button: string;
    };
  };
  workflowOptimization: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      title: string;
      subtitle: string;
      cta1: string;
      cta2: string;
    };
    features: {
      title: string;
      f1: {
        title: string;
        description: string;
      };
      f2: {
        title: string;
        description: string;
      };
      f3: {
        title: string;
        description: string;
      };
      f4: {
        title: string;
        description: string;
      };
    };
    caseStudy: {
      title: string;
      subtitle: string;
      description: string;
      imageAlt: string;
      l1: string;
      l2: string;
      l3: string;
    };
    focus: {
      title: string;
      subtitle: string;
      b1: {
        title: string;
        description: string;
      };
      b2: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      description: string;
      button1: string;
      button2: string;
    };
  };
  aiAmsterdam: AiAmsterdamPageTranslations;
}

// Services page translations
export interface ServicesPageTranslations {
  title: string;
  subtitle: string;
  diagnosisNote: string;
  approach: {
    title: string;
    step1: {
      title: string;
      subtitle: string;
      description: string;
    };
    step2: {
      title: string;
      subtitle: string;
      description: string;
    };
    step3: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    guarantee: string;
    button: string;
    details: string;
  };
}

// Blueprint/Workshop section translations
export interface BlueprintTranslations {
  badge: string;
  title: string;
  description: string;
  price: string;
  investmentTitle: string;
  investmentSubtitle: string;
  input: {
    badge: string;
    label: string;
    example: string;
  };
  process: {
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    step4: {
      title: string;
      description: string;
    };
  };
  output: {
    badge: string;
    label: string;
    example: string;
  };
  trust: {
    handsOn: {
      title: string;
      description: string;
    };
    guarantee: {
      title: string;
      description: string;
    };
  };
  cta: string;
}

// Social Proof section translations
export interface SocialProofTranslations {
  title: string;
  companies: string[];
  disclaimer: string;
}

// AI Amsterdam page translations
export interface AiAmsterdamPageTranslations {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  backToServices: string;
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    b1: {
      title: string;
      description: string;
    };
    b2: {
      title: string;
      description: string;
    };
    b3: {
      title: string;
      description: string;
    };
  };
  faq: {
    title: string;
    q1: {
      question: string;
      answer: string;
      questionNL: string;
      answerNL: string;
    };
    q2: {
      question: string;
      answer: string;
      questionNL: string;
      answerNL: string;
    };
    q3: {
      question: string;
      answer: string;
      questionNL: string;
      answerNL: string;
    };
    q4: {
      question: string;
      answer: string;
      questionNL: string;
      answerNL: string;
    };
    q5: {
      question: string;
      answer: string;
      questionNL: string;
      answerNL: string;
    };
  };
}

// Complete translation structure
export interface TranslationStructure {
  navigation: NavigationTranslations;
  hero: HeroTranslations;
  cta: CtaTranslations;
  problems: ProblemsTranslations;
  benefits: BenefitsTranslations;
  services: ServicesTranslations;
  servicesPage: ServicesPageTranslations;
  aiAmsterdamPage: AiAmsterdamPageTranslations;
  comparison: ComparisonTranslations;
  process: ProcessTranslations;
  testimonials: TestimonialsTranslations;
  pricing: PricingTranslations;
  footer: FooterTranslations;
  finalCta: FinalCtaTranslations;
  faq: FaqTranslations;
  blogInsights: BlogInsightsTranslations;
  blogPage: BlogPageTranslations;
  contactPage: ContactPageTranslations;
  error: ErrorTranslations;
  common: CommonTranslations;
  blueprint: BlueprintTranslations;
  socialProof: SocialProofTranslations;
  homePage: {
    metaTitle: string;
    metaDescription: string;
  };
  getStartedPage: {
    metaTitle: string;
    h1: string;
    metaDescription: string;
  };
  termsPage: {
    metaTitle: string;
    metaDescription: string;
  };
  privacyPage: {
    metaTitle: string;
    h1: string;
    metaDescription: string;
  };
  leadGenerationPage: ServicePageTranslations['leadGeneration'];
  projectManagementPage: ServicePageTranslations['projectManagement'];
  workflowOptimizationPage: ServicePageTranslations['workflowOptimization'];
}

// Type for the complete translations object
export type Translations = Record<Language, TranslationStructure>; 