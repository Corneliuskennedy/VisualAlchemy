/**
 * Client Configuration System for Template Duplication
 * This file allows easy customization for different clients while keeping core functionality intact
 * 
 * IMPORTANT: This is a template preparation file that doesn't affect current Octomatic business
 */

export interface ClientBranding {
  // Company Information
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  
  // Social Media
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  
  // Visual Branding
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  
  // Logo and Assets
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  
  // Domain and URLs
  domain: string;
  baseUrl: string;
}

export interface ClientServices {
  // Service Categories
  services: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    features: string[];
    pricing?: {
      startingPrice: number;
      currency: string;
    };
  }>;
  
  // Testimonials
  testimonials: Array<{
    id: string;
    name: string;
    company: string;
    role: string;
    content: string;
    avatar?: string;
    rating: number;
  }>;
  
  // Case Studies / Portfolio
  caseStudies: Array<{
    id: string;
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    image?: string;
  }>;
}

export interface ClientContent {
  // Hero Section
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  
  // About Section
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  
  // SEO Settings
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
  
  // Legal
  legal: {
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;
    cookiePolicyUrl: string;
  };
}

// DEFAULT CONFIGURATION (Current Octomatic Settings)
// This preserves your current business setup
export const DEFAULT_CLIENT_CONFIG: ClientBranding & ClientServices & ClientContent = {
  // Current Octomatic Branding
  companyName: "Octomatic",
  companyTagline: "AI Automation for Dutch Businesses",
  companyDescription: "We help Dutch businesses save time and money through intelligent automation solutions.",
  
  email: "kennet@octomatic.ai",
  phone: "+31 20 123 4567",
  address: {
    street: "Herengracht 1",
    city: "Amsterdam",
    country: "Netherlands",
    postalCode: "1001 AA",
  },
  
  socialMedia: {
    linkedin: "https://linkedin.com/company/octomatic",
    twitter: "https://twitter.com/octomatic",
  },
  
  colors: {
    primary: "#4585f4",
    secondary: "#34a853",
    accent: "#fbbc05",
    background: "#ffffff",
    text: "#1a1a1a",
    muted: "#6b7280",
  },
  
  logo: {
    light: "/octomaticLogo.svg",
    dark: "/octomaticLogo.svg",
    favicon: "/octomaticFavicon.svg",
  },
  
  domain: "octomatic.ai",
  baseUrl: "https://www.octomatic.ai",
  
  services: [
    {
      id: "ai-automation",
      name: "AI Automation",
      description: "Intelligent automation solutions that learn and adapt",
      icon: "Bot",
      features: [
        "Process automation",
        "AI-powered workflows",
        "Smart decision making",
        "Continuous learning"
      ],
      pricing: {
        startingPrice: 10000,
        currency: "EUR"
      }
    },
    {
      id: "crm-buildouts",
      name: "CRM Buildouts",
      description: "Custom CRM solutions tailored to your business",
      icon: "Users",
      features: [
        "Custom CRM development",
        "Integration with existing tools",
        "Automated lead management",
        "Performance analytics"
      ],
      pricing: {
        startingPrice: 15000,
        currency: "EUR"
      }
    }
  ],
  
  testimonials: [
    {
      id: "ellen-s",
      name: "Ellen S.",
      company: "Tech Startup",
      role: "CEO",
      content: "The Result: The system he built has been a game-changer for our lead qualification process.",
      rating: 5
    }
  ],
  
  caseStudies: [
    {
      id: "lead-automation",
      title: "Lead Automation System",
      client: "Dutch Tech Company",
      industry: "Technology",
      challenge: "Manual lead qualification taking 10+ hours per week",
      solution: "Automated lead scoring and qualification system",
      results: [
        "90% reduction in manual work",
        "50% increase in qualified leads",
        "€25,000 annual savings"
      ]
    }
  ],
  
  hero: {
    headline: "Stop Leaking Profit. Start Automating.",
    subheadline: "Our automation systems eliminate 40-70% of your team's manual work. We guarantee at least €15,000 in annual savings, or you pay nothing.",
    ctaPrimary: "Book a Free Process Audit",
    ctaSecondary: "Calculate Your Cost of Inaction"
  },
  
  about: {
    title: "About Octomatic",
    description: "We specialize in AI automation solutions for Dutch businesses.",
    mission: "To help Dutch businesses thrive through intelligent automation.",
    vision: "A world where businesses focus on growth, not manual tasks."
  },
  
  seo: {
    defaultTitle: "Octomatic - AI Automation for Dutch Businesses",
    defaultDescription: "Stop met geld verspillen door handmatige processen. Onze proces audit identificeert automatiseringskansen die 40-70% van uw handmatige werk elimineren.",
    keywords: ["AI automation", "Dutch businesses", "process automation", "Netherlands"],
    ogImage: "/octomatic-image-2025.png"
  },
  
  legal: {
    privacyPolicyUrl: "/privacy",
    termsOfServiceUrl: "/terms",
    cookiePolicyUrl: "/privacy#cookies"
  }
};

// Template configurations for different client types
export const CLIENT_TEMPLATES = {
  // Template for consulting businesses
  consulting: {
    colors: {
      primary: "#2563eb",
      secondary: "#7c3aed",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#1f2937",
      muted: "#6b7280",
    },
    services: [
      {
        id: "strategy-consulting",
        name: "Strategy Consulting",
        description: "Strategic guidance for business transformation",
        icon: "Target",
        features: ["Business analysis", "Strategic planning", "Implementation support"]
      }
    ]
  },
  
  // Template for tech companies
  technology: {
    colors: {
      primary: "#06b6d4",
      secondary: "#8b5cf6",
      accent: "#f97316",
      background: "#ffffff",
      text: "#111827",
      muted: "#6b7280",
    },
    services: [
      {
        id: "software-development",
        name: "Software Development",
        description: "Custom software solutions for modern businesses",
        icon: "Code",
        features: ["Web applications", "Mobile apps", "API development"]
      }
    ]
  },
  
  // Template for marketing agencies
  marketing: {
    colors: {
      primary: "#ec4899",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#1f2937",
      muted: "#6b7280",
    },
    services: [
      {
        id: "digital-marketing",
        name: "Digital Marketing",
        description: "Comprehensive digital marketing solutions",
        icon: "Megaphone",
        features: ["SEO optimization", "Social media marketing", "Content strategy"]
      }
    ]
  }
} as const;

// Function to get current client config (defaults to Octomatic)
export const getClientConfig = (): ClientBranding & ClientServices & ClientContent => {
  // In the future, this could read from environment variables or a database
  // For now, it returns the default Octomatic configuration
  return DEFAULT_CLIENT_CONFIG;
};

// Function to override specific config values (for template customization)
export const createClientConfig = (
  overrides: Partial<ClientBranding & ClientServices & ClientContent>
): ClientBranding & ClientServices & ClientContent => {
  return {
    ...DEFAULT_CLIENT_CONFIG,
    ...overrides,
    // Deep merge for nested objects
    colors: {
      ...DEFAULT_CLIENT_CONFIG.colors,
      ...(overrides.colors || {})
    },
    address: {
      ...DEFAULT_CLIENT_CONFIG.address,
      ...(overrides.address || {})
    },
    socialMedia: {
      ...DEFAULT_CLIENT_CONFIG.socialMedia,
      ...(overrides.socialMedia || {})
    },
    logo: {
      ...DEFAULT_CLIENT_CONFIG.logo,
      ...(overrides.logo || {})
    },
    hero: {
      ...DEFAULT_CLIENT_CONFIG.hero,
      ...(overrides.hero || {})
    },
    about: {
      ...DEFAULT_CLIENT_CONFIG.about,
      ...(overrides.about || {})
    },
    seo: {
      ...DEFAULT_CLIENT_CONFIG.seo,
      ...(overrides.seo || {})
    },
    legal: {
      ...DEFAULT_CLIENT_CONFIG.legal,
      ...(overrides.legal || {})
    }
  };
};

export type ClientConfigType = typeof DEFAULT_CLIENT_CONFIG;
