/**
 * Navbar Mobile Component
 * Mobile navigation with hamburger menu and slide-out drawer - Rebuilt from scratch
 */

'use client';

import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';
import type { NavItem } from './hooks/useNavbarContent';

interface NavbarMobileProps {
  navItems: NavItem[];
  isActiveRoute: (href: string) => boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

export function NavbarMobile({
  navItems,
  isActiveRoute,
  isMenuOpen,
  onMenuToggle,
  onMenuClose,
}: NavbarMobileProps) {
  const pathname = usePathname();
  const isDutch = pathname.startsWith('/nl');

  // Close menu on route change
  useEffect(() => {
    onMenuClose();
  }, [pathname, onMenuClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onMenuClose();
  }, [onMenuClose]);

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-[100]',
          'h-16 navbar-glass',
          'md:hidden',
          'transition-all duration-300'
        )}
        aria-hidden="true"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Logo
            variant="header"
            onClick={handleLogoClick}
            className="scale-90"
          />

          {/* Hamburger Button */}
          <button
            onClick={onMenuToggle}
            className={cn(
              'p-2.5 rounded-lg',
              'bg-glass hover:bg-accent/10',
              'border border-glass hover:border-border',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2',
              isMenuOpen && 'bg-accent/20'
            )}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out',
                  'top-0',
                  isMenuOpen && 'top-2.5 rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out',
                  'top-2.5',
                  isMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out',
                  'top-5',
                  isMenuOpen && 'top-2.5 -rotate-45'
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={onMenuToggle}>
        <SheetContent
          side="right"
          className="w-[320px] sm:w-[380px] p-0 z-[200] backdrop-blur-md bg-popover border-border overflow-y-auto"
          id="mobile-menu"
        >
          {/* Header with Logo */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
            <Logo
              variant="header"
              onClick={handleLogoClick}
              className="scale-90"
            />
            <button
              onClick={onMenuClose}
              className={cn(
                'p-2 rounded-lg',
                'hover:bg-accent/50',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2'
              )}
              aria-label="Close menu"
              type="button"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation menu for mobile devices
          </SheetDescription>

          {/* Menu Items */}
          <div className="flex flex-col py-6 px-6 space-y-1">
            {navItems.map((item, index) => {
              if (item.children && item.children.length > 0) {
                // Solutions section with improved UI
                return (
                  <div key={`${item.label}-${index}`} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
                      {item.label}
                    </div>
                    {item.children.map((child) => {
                      const isActive = isActiveRoute(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onMenuClose}
                          className={cn(
                            'group relative block',
                            'py-4 px-4 rounded-lg',
                            'transition-all duration-200 ease-out',
                            'hover:bg-accent/50',
                            'focus:bg-accent/50 focus:outline-none',
                            isActive && 'bg-accent/30 ring-1 ring-border'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base leading-tight text-popover-foreground">
                                {child.label}
                              </h3>
                              {child.description && (
                                <p className="text-sm mt-2 leading-relaxed text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </div>
                            {isActive && (
                              <span className="text-xs font-medium text-button-primary flex-shrink-0 pt-1">
                                {isDutch ? 'Huidige' : 'Active'}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              }

              // Regular link
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMenuClose}
                  className={cn(
                    'py-3 px-4 rounded-lg',
                    'font-medium transition-all duration-200',
                    'hover:bg-accent/50',
                    'focus:bg-accent/50 focus:outline-none',
                    isActive && 'bg-accent/30 font-semibold ring-1 ring-border'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="pt-6 mt-4 border-t border-border space-y-4">
              {/* Language & Theme Switchers */}
              <div className="flex items-center justify-between px-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {isDutch ? 'Taal' : 'Language'}
                </span>
                <LanguageSwitcher variant="default" />
              </div>
              <div className="flex items-center justify-between px-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {isDutch ? 'Thema' : 'Theme'}
                </span>
                <ThemeSwitcher variant="default" />
              </div>
            </div>

            {/* Contact CTA */}
            <Button
              asChild
              className={cn(
                'w-full mt-6',
                'bg-button-primary hover:bg-button-primary-hover',
                'text-white shadow-button-primary',
                'font-semibold py-3',
                'focus:ring-2 focus:ring-button-primary focus:ring-offset-2'
              )}
              onClick={onMenuClose}
            >
              <Link href={isDutch ? '/nl/contact' : '/contact'}>
                {isDutch ? 'Contact' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
