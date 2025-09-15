'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '' 
}) => {
  // For now, use a simple client-side theme management
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  
  React.useEffect(() => {
    // Check localStorage for theme preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    // Track analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'theme_switched', {
        new_theme: newTheme,
        previous_theme: theme,
      });
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
        ${theme === 'dark' 
          ? 'bg-slate-700 hover:bg-slate-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        focus:ring-offset-gray-900
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      type="button"
    >
      {/* Toggle Circle */}
      <div
        className={`
          absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${theme === 'dark'
            ? 'left-0.5 bg-slate-300'
            : 'left-6 bg-white'
          }
        `}
      >
        {/* Icon */}
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 text-slate-700" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${
          theme === 'light' ? 'opacity-0' : 'opacity-60 text-slate-400'
        }`} />
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-60 text-slate-100'
        }`} />
      </div>
    </button>
  );
};