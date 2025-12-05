'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Prevent hydration mismatch by not rendering until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced theme toggle with transition state
  const toggleTheme = useCallback(() => {
    // Prevent rapid clicks during transition
    if (isTransitioningRef.current) {
      return;
    }
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    
    setTheme(newTheme);
    
    // Reset transition state after animation completes
    const duration = prefersReducedMotion ? 150 : 400;
    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, duration);
  }, [theme, setTheme, prefersReducedMotion]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      // Arrow keys toggle theme
      toggleTheme();
    }
  }, [toggleTheme]);

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    if (variant === 'compact') {
      return (
        <button
          className={`
            p-2 rounded-lg
            bg-glass 
            border border-glass
            transition-all duration-300
            ${className}
          `}
          disabled
        >
          <Sun className="w-4 h-4 text-subtle" />
        </button>
      );
    }
    
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="text-sm font-medium text-subtle">
          Theme
        </span>
        <div className="relative w-12 h-6 rounded-full p-1 bg-muted">
          <div className="w-4 h-4 rounded-full bg-card" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        disabled={isTransitioning}
        className={`
          p-2 rounded-lg
          bg-glass hover:bg-accent/10
          border border-glass hover:border-border
          transition-all duration-300
          group
          focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-checked={theme === 'dark'}
        role="switch"
        tabIndex={0}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-button-primary group-hover:text-button-primary-hover transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-button-primary group-hover:text-button-primary-hover transition-colors" />
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-subtle">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
      
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        disabled={isTransitioning}
        className={`
          relative w-12 h-6 rounded-full p-1
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          bg-muted hover:bg-accent/20
          group
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-checked={theme === 'dark'}
        role="switch"
        tabIndex={0}
      >
        {/* Toggle Circle */}
        <div
          className={`
            w-4 h-4 rounded-full
            transition-all duration-300 ease-out
            flex items-center justify-center
            ${theme === 'dark' 
              ? 'bg-card translate-x-0' 
              : 'bg-card translate-x-6 shadow-sm'
            }
            group-hover:scale-110
          `}
        >
          {theme === 'dark' ? (
            <Moon className="w-2.5 h-2.5 text-button-primary" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-button-primary" />
          )}
        </div>
      </button>
    </div>
  );
};
