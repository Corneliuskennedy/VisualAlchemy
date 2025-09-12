/**
 * Hook for accessing client configuration throughout the application
 * This allows components to adapt to different client branding and settings
 * 
 * SAFE: This doesn't change existing functionality, just provides access to config
 */

import { useMemo } from 'react';
import { CLIENT_CONFIG } from '@/config/client-config';
import type { ClientConfigType } from '@/config/client.config';

/**
 * Hook to access client configuration
 * Returns the current client's branding, services, and content configuration
 */
export const useClientConfig = (): ClientConfigType => {
  return useMemo(() => CLIENT_CONFIG, []);
};

/**
 * Hook to access specific parts of client configuration
 */
export const useClientBranding = () => {
  const config = useClientConfig();
  
  return useMemo(() => ({
    companyName: config.companyName,
    companyTagline: config.companyTagline,
    companyDescription: config.companyDescription,
    colors: config.colors,
    logo: config.logo,
    domain: config.domain,
    baseUrl: config.baseUrl,
  }), [config]);
};

export const useClientContact = () => {
  const config = useClientConfig();
  
  return useMemo(() => ({
    email: config.email,
    phone: config.phone,
    address: config.address,
    socialMedia: config.socialMedia,
  }), [config]);
};

export const useClientServices = () => {
  const config = useClientConfig();
  
  return useMemo(() => ({
    services: config.services,
    testimonials: config.testimonials,
    caseStudies: config.caseStudies,
  }), [config]);
};

export const useClientContent = () => {
  const config = useClientConfig();
  
  return useMemo(() => ({
    hero: config.hero,
    about: config.about,
    seo: config.seo,
    legal: config.legal,
  }), [config]);
};

/**
 * Hook to get theme colors for CSS-in-JS or inline styles
 */
export const useClientTheme = () => {
  const { colors } = useClientBranding();
  
  return useMemo(() => ({
    colors,
    // CSS custom properties object
    cssVariables: {
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-accent': colors.accent,
      '--color-background': colors.background,
      '--color-text': colors.text,
      '--color-muted': colors.muted,
    },
    // Tailwind-compatible color classes
    tailwindClasses: {
      primary: 'text-[var(--color-primary)] bg-[var(--color-primary)]',
      secondary: 'text-[var(--color-secondary)] bg-[var(--color-secondary)]',
      accent: 'text-[var(--color-accent)] bg-[var(--color-accent)]',
      background: 'text-[var(--color-background)] bg-[var(--color-background)]',
      text: 'text-[var(--color-text)]',
      muted: 'text-[var(--color-muted)]',
    }
  }), [colors]);
};

export default useClientConfig;
