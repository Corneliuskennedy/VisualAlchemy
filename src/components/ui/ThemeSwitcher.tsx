'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by not rendering until mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    // Add a small delay to allow the animation to trigger
    setTheme(newTheme);
  };

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    if (variant === 'compact') {
      return (
        <button
          className={`
            p-2 rounded-lg
            bg-white/5 
            border border-white/10
            transition-all duration-300
            ${className}
          `}
          disabled
        >
          <Sun className="w-4 h-4 text-gray-400" />
        </button>
      );
    }
    
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="text-sm font-medium text-gray-400">
          Theme
        </span>
        <div className="relative w-12 h-6 rounded-full p-1 bg-slate-700">
          <div className="w-4 h-4 rounded-full bg-slate-300" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          p-2 rounded-lg
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-white/20
          transition-all duration-300
          group
          ${className}
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-400">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
      
      <button
        onClick={toggleTheme}
        className={`
          relative w-12 h-6 rounded-full p-1
          transition-all duration-300 ease-out
          ${theme === 'dark' 
            ? 'bg-slate-700 hover:bg-slate-600' 
            : 'bg-blue-200 hover:bg-blue-300'
          }
          group
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Toggle Circle */}
        <div
          className={`
            w-4 h-4 rounded-full
            transition-all duration-300 ease-out
            flex items-center justify-center
            ${theme === 'dark' 
              ? 'bg-slate-300 translate-x-0' 
              : 'bg-white translate-x-6 shadow-sm'
            }
            group-hover:scale-110
          `}
        >
          {theme === 'dark' ? (
            <Moon className="w-2.5 h-2.5 text-slate-600" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-yellow-500" />
          )}
        </div>
      </button>
    </div>
  );
};
