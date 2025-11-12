'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import useLanguage from '@/contexts/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = theme === 'dark';

  const handleLanguageSwitch = () => {
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    
    // Get current path without language prefix
    let basePath = pathname;
    if (basePath.startsWith('/nl')) {
      basePath = basePath.slice(3) || '/';
    }
    if (!basePath.startsWith('/')) {
      basePath = '/' + basePath;
    }
    
    // Build new path with correct language prefix
    const newPath = newLanguage === 'nl' 
      ? `/nl${basePath === '/' ? '' : basePath}`
      : basePath;
    
    // Update language context
    setLanguage(newLanguage);
    
    // Navigate to new path
    router.replace(newPath);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleLanguageSwitch}
        className={cn(
          "p-2 rounded-lg border transition-all duration-300 hover:scale-105",
          isDark
            ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
            : "bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400",
          className
        )}
        aria-label={`Switch to ${language === 'nl' ? 'English' : 'Dutch'}`}
      >
        <Globe className={cn(
          "w-4 h-4",
          isDark ? "text-gray-300" : "text-gray-700"
        )} />
        <span className="sr-only">{language === 'nl' ? 'EN' : 'NL'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLanguageSwitch}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300",
        isDark
          ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
          : "bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400",
        className
      )}
      aria-label={`Switch to ${language === 'nl' ? 'English' : 'Dutch'}`}
    >
      <Globe className={cn(
        "w-4 h-4",
        isDark ? "text-gray-300" : "text-gray-700"
      )} />
      <span className={cn(
        "text-sm font-medium",
        isDark ? "text-gray-300" : "text-gray-700"
      )}>
        {language === 'nl' ? 'EN' : 'NL'}
      </span>
    </button>
  );
};

