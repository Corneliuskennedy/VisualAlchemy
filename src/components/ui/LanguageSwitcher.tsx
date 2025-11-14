'use client';

import React from 'react';
import useLanguage from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

// Flag emoji components - Using American flag for English
const FlagIcon: React.FC<{ code: 'nl' | 'us'; className?: string }> = ({ code, className }) => {
  const flag = code === 'nl' ? '🇳🇱' : '🇺🇸';
  return (
    <span className={cn("text-lg leading-none", className)} role="img" aria-label={code === 'nl' ? 'Dutch flag' : 'American flag'}>
      {flag}
    </span>
  );
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  variant = 'compact' 
}) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    // LanguageContext handles navigation automatically
    setLanguage(newLanguage);
  };

  const currentFlag = language === 'nl' ? 'nl' : 'us';
  const nextLanguage = language === 'nl' ? 'English' : 'Dutch';

  if (variant === 'compact') {
    return (
      <button
        onClick={handleLanguageSwitch}
        className={cn(
          "p-2 rounded-lg border transition-all duration-300 hover:scale-105",
          "bg-glass hover:bg-accent/10 border-glass hover:border-border",
          "flex items-center justify-center",
          className
        )}
        aria-label={`Switch to ${nextLanguage}`}
        type="button"
      >
        <FlagIcon code={currentFlag} />
        <span className="sr-only">{language === 'nl' ? 'EN' : 'NL'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLanguageSwitch}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300",
        "bg-glass hover:bg-accent/10 border-glass hover:border-border",
        className
      )}
      aria-label={`Switch to ${nextLanguage}`}
      type="button"
    >
      <FlagIcon code={currentFlag} />
      <span className="text-sm font-medium text-body">
        {language === 'nl' ? 'EN' : 'NL'}
      </span>
    </button>
  );
};

