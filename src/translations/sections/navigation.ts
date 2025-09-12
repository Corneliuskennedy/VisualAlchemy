import { NavigationTranslations } from '../types';

export const navigation: Record<'en' | 'nl', NavigationTranslations> = {
  en: {
    logo: "Octomatic",
    menu: {
      howItWorks: "Our process",
      pricing: "Services",
      blog: "Blog",
      contact: "Contact",
      getStarted: "Get started",
      back: "Back"
    }
  },
  nl: {
    logo: "Octomatic",
    menu: {
      howItWorks: "Ons proces",
      pricing: "Diensten",
      blog: "Blog",
      contact: "Contact",
      getStarted: "Begin nu",
      back: "Terug"
    }
  }
}; 