'use client';

import React from 'react';
import useLanguage from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  variant = 'compact' 
}) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageSwitch = (lang: 'nl' | 'en') => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  const nextLanguage = language === 'nl' ? 'English' : 'Dutch';

  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          "text-foreground/80",
          className
        )}
        role="group"
        aria-label="Language switcher"
      >
        <button
          onClick={() => handleLanguageSwitch('nl')}
          className={cn(
            "transition-colors duration-200",
            language === 'nl' 
              ? "text-foreground font-medium" 
              : "text-foreground/50 hover:text-foreground/70"
          )}
          aria-label="Switch to Dutch"
          type="button"
        >
          NL
        </button>
        <span className="h-3 w-px bg-foreground/30" aria-hidden="true" />
        <button
          onClick={() => handleLanguageSwitch('en')}
          className={cn(
            "transition-colors duration-200",
            language === 'en' 
              ? "text-foreground font-medium" 
              : "text-foreground/50 hover:text-foreground/70"
          )}
          aria-label="Switch to English"
          type="button"
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-3 text-sm font-medium",
        "text-foreground/80",
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => handleLanguageSwitch('nl')}
        className={cn(
          "transition-colors duration-200",
          language === 'nl' 
            ? "text-foreground font-medium" 
            : "text-foreground/50 hover:text-foreground/70"
        )}
        aria-label="Switch to Dutch"
        type="button"
      >
        NL
      </button>
      <span className="h-4 w-px bg-foreground/30" aria-hidden="true" />
      <button
        onClick={() => handleLanguageSwitch('en')}
        className={cn(
          "transition-colors duration-200",
          language === 'en' 
            ? "text-foreground font-medium" 
            : "text-foreground/50 hover:text-foreground/70"
        )}
        aria-label="Switch to English"
        type="button"
      >
        EN
      </button>
    </div>
  );
};

