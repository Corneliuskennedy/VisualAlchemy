import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { TranslationStructure } from '@/translations/types';

interface TranslationContextType {
  t: (section: keyof TranslationStructure, key: string) => string;
  getSection: <K extends keyof TranslationStructure>(section: K) => TranslationStructure[K];
  getNested: (section: keyof TranslationStructure, key: string) => any;
  language: string;
  translations: TranslationStructure;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const translationUtils = useTranslations();
  
  return (
    <TranslationContext.Provider value={translationUtils}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
}

/**
 * Higher-order component that provides translation context
 */
export function withTranslations<P extends object>(
  Component: React.ComponentType<P & TranslationContextType>
) {
  return function WithTranslationsWrapper(props: P) {
    const translationUtils = useTranslations();
    
    return <Component {...props} {...translationUtils} />;
  };
}

/**
 * Component that renders translated text with fallback
 */
interface TranslatedTextProps {
  section: keyof TranslationStructure;
  key: string;
  fallback?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TranslatedText({ 
  section, 
  key: translationKey, 
  fallback, 
  className,
  as: Component = 'span'
}: TranslatedTextProps) {
  const { t } = useTranslationContext();
  const text = t(section, translationKey);
  const displayText = text === `${section}.${translationKey}` ? fallback || text : text;
  
  return <Component className={className}>{displayText}</Component>;
}

/**
 * Component that renders translated HTML content
 */
interface TranslatedHTMLProps {
  section: keyof TranslationStructure;
  key: string;
  fallback?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TranslatedHTML({ 
  section, 
  key: translationKey, 
  fallback, 
  className,
  as: Component = 'div'
}: TranslatedHTMLProps) {
  const { t } = useTranslationContext();
  const html = t(section, translationKey);
  const displayHTML = html === `${section}.${translationKey}` ? fallback || html : html;
  
  return (
    <Component 
      className={className}
      dangerouslySetInnerHTML={{ __html: displayHTML }}
    />
  );
} 