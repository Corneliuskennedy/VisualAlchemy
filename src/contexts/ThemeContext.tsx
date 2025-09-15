'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
      setThemeState(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Track analytics
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'theme_switched', {
        new_theme: newTheme,
        previous_theme: theme,
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="text-white">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'text-white' 
          : 'bg-white text-slate-900'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
