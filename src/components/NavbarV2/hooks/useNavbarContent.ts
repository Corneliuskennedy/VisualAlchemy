/**
 * Navbar Content Hook
 * Provides navigation structure and content with proper translations
 */

'use client';

import { useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import useLanguage from '@/contexts/LanguageContext';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

export function useNavbarContent() {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  // Build navigation items with proper translations
  const navItems = useMemo<NavItem[]>(() => {
    const isDutch = language === 'nl' || pathname.startsWith('/nl');
    
    return [
      {
        label: 'Solutions',
        href: '#',
        children: [
          {
            label: 'Build a New System',
            href: isDutch ? '/nl/build' : '/build',
            description: isDutch
              ? 'Voor het omzetten van een idee in een volledig geautomatiseerd platform'
              : 'Transform an idea into a fully automated platform',
          },
          {
            label: 'Optimize Your Business',
            href: isDutch ? '/nl/optimize' : '/optimize',
            description: isDutch
              ? 'Voor het elimineren van chaos en het schalen van je operatie'
              : 'Eliminate chaos and scale your operations',
          },
          {
            label: 'Create Viral Content',
            href: isDutch ? '/nl/create' : '/create',
            description: isDutch
              ? 'Voor het produceren van verbluffende, AI-gedreven visuals'
              : 'Produce stunning, AI-driven visuals',
          },
        ],
      },
      {
        label: isDutch ? 'Ons Werk' : 'Our Work',
        href: isDutch ? '/nl/projecten' : '/projecten',
      },
      {
        label: isDutch ? 'Over Ons' : 'About Us',
        href: isDutch ? '/nl/over-ons' : '/over-ons',
      },
    ];
  }, [language, pathname]);

  // Check if a route is active (handles both /nl and non-/nl paths)
  const isActiveRoute = useCallback((href: string): boolean => {
    if (href === '#') return false;
    
    // Normalize paths for comparison
    const currentPath = pathname;
    const targetPath = href;
    
    // Handle root paths
    if (targetPath === '/' || targetPath === '/nl') {
      return currentPath === '/' || currentPath === '/nl';
    }
    
    // Check exact match
    if (currentPath === targetPath) return true;
    
    // Check if current path starts with target path (for nested routes)
    if (currentPath.startsWith(targetPath + '/')) return true;
    
    // Handle language prefix variations
    const currentWithoutLang = currentPath.startsWith('/nl') 
      ? currentPath.slice(3) || '/' 
      : currentPath;
    const targetWithoutLang = targetPath.startsWith('/nl') 
      ? targetPath.slice(3) || '/' 
      : targetPath;
    
    if (currentWithoutLang === targetWithoutLang) return true;
    if (currentWithoutLang.startsWith(targetWithoutLang + '/')) return true;
    
    return false;
  }, [pathname]);

  return {
    navItems,
    isActiveRoute,
  };
}
