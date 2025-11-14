/**
 * Navbar Desktop Component
 * Desktop navigation bar with dropdown menus - Rebuilt from scratch
 */

'use client';

import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { SolutionsDropdown } from './SolutionsDropdown';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import type { NavItem } from './hooks/useNavbarContent';

interface NavbarDesktopProps {
  navItems: NavItem[];
  isActiveRoute: (href: string) => boolean;
  isScrolled: boolean;
  isVisible: boolean;
}

export function NavbarDesktop({
  navItems,
  isActiveRoute,
  isScrolled,
  isVisible,
}: NavbarDesktopProps) {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const isDutch = pathname.startsWith('/nl');
  const renderCountRef = useRef(0);
  const prevThemeRef = useRef<string | undefined>(theme);
  const prevResolvedThemeRef = useRef<string | undefined>(resolvedTheme);

  // Track renders (debug only - disabled for production)
  useEffect(() => {
    renderCountRef.current += 1;
    // console.log('[NavbarDesktop] Render #' + renderCountRef.current, {
    //   pathname,
    //   isScrolled,
    //   isVisible,
    //   theme,
    //   resolvedTheme,
    //   timestamp: new Date().toISOString(),
    // });
  });

  // Track theme changes
  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      // console.log('[NavbarDesktop] Theme changed', {
      //   from: prevThemeRef.current,
      //   to: theme,
      //   resolvedTheme,
      //   timestamp: new Date().toISOString(),
      // });
      prevThemeRef.current = theme;
    }
  }, [theme, resolvedTheme]);

  useEffect(() => {
    if (prevResolvedThemeRef.current !== resolvedTheme) {
      // console.log('[NavbarDesktop] Resolved theme changed', {
      //   from: prevResolvedThemeRef.current,
      //   to: resolvedTheme,
      //   theme,
      //   timestamp: new Date().toISOString(),
      // });
      prevResolvedThemeRef.current = resolvedTheme;
    }
  }, [resolvedTheme, theme]);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <header
      aria-label="Main Navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-[100]',
        'transition-all duration-300 ease-out',
        'navbar-glass',
        'hidden md:flex',
        isScrolled && 'scrolled',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 lg:px-6 w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo
              variant="header"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation Items */}
          <nav
            className="flex items-center gap-1 lg:gap-2 xl:gap-6 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {/* Solutions Dropdown - Optimized component */}
            <SolutionsDropdown isActiveRoute={isActiveRoute} />

            {/* Regular navigation items */}
            {navItems.map((item, index) => {
              // Skip Solutions dropdown as it's handled separately
              if (item.children && item.children.length > 0) {
                return null;
              }

              // Regular link item
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href || index}
                  href={item.href}
                  className={cn(
                    'navbar-link navbar-text',
                    'text-sm lg:text-base',
                    'focus:outline-none focus:ring-2 focus:ring-button-primary/50 focus:ring-offset-2',
                    isActive && 'active'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />

            {/* Theme Switcher */}
            <ThemeSwitcher variant="compact" />

            {/* Contact CTA */}
            <Button
              asChild
              className={cn(
                'px-4 lg:px-6 py-2',
                'rounded-lg font-semibold',
                'text-sm shadow-lg hover:shadow-xl',
                'transition-all duration-200',
                'bg-button-primary hover:bg-button-primary-hover',
                'text-white shadow-button-primary',
                'focus:ring-2 focus:ring-button-primary focus:ring-offset-2'
              )}
            >
              <Link href={isDutch ? '/nl/contact' : '/contact'}>
                {isDutch ? 'Contact' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom border divider */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px',
          'bg-gradient-to-r from-transparent via-border/50 to-transparent',
          'transition-opacity duration-300',
          isScrolled ? 'opacity-20' : 'opacity-40'
        )}
      />
    </header>
  );
}
