/**
 * Client Configuration - De Bewuste Vakantie
 * Generated on 2025-09-11T22:15:00.000Z
 */

import { createClientConfig } from './client.config';

export const CLIENT_CONFIG = createClientConfig({
  // Company Information
  companyName: "De Bewuste Vakantie",
  companyTagline: "Bewust Reizen, Bewust Leven",
  companyDescription: "Ontdek duurzame en bewuste reizen met De Bewuste Vakantie. Wij helpen je om verantwoorde reiskeuzes te maken die goed zijn voor jou en de planeet.",
  
  // Contact Information
  email: "info@debewustevakantie.nl",
  phone: "+31 20 123 4567",
  domain: "debewustevakantie.nl",
  baseUrl: "https://debewustevakantie.nl",
  
  address: {
    street: "Prinsengracht 123",
    city: "Amsterdam",
    country: "Nederland",
    postalCode: "1015 LM",
  },
  
  socialMedia: {
    "linkedin": "https://linkedin.com/company/de-bewuste-vakantie",
    "instagram": "https://instagram.com/debewustevakantie"
  },
  
  // Brand Colors
  colors: {
    primary: "#2d7d32",
    secondary: "#388e3c",
    accent: "#4caf50",
    background: "#ffffff",
    text: "#1a1a1a",
    muted: "#6b7280",
  },
  
  // Hero Content
  hero: {
    headline: "Ontdek de Wereld op een Bewuste Manier",
    subheadline: "Duurzame reizen die je hart raken en de planeet respecteren. Ontdek bestemmingen die bijdragen aan lokale gemeenschappen en natuurbehoud.",
    ctaPrimary: "Ontdek Bewuste Reizen",
    ctaSecondary: "Lees Onze Reisgids",
  },
  
  // SEO
  seo: {
    defaultTitle: "De Bewuste Vakantie - Bewust Reizen, Bewust Leven",
    defaultDescription: "Ontdek duurzame en bewuste reizen met De Bewuste Vakantie. Verantwoorde reiskeuzes die goed zijn voor jou en de planeet.",
    keywords: ["bewust reizen", "duurzame vakanties", "eco-toerisme", "nederland"],
    ogImage: "/logo-og.png",
  },
});

export default CLIENT_CONFIG;
