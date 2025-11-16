'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { Logo } from './ui/logo';
import { ThemeSwitcher } from './ui/ThemeSwitcher';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(1);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;

    if (!ticking.current) {
      requestAnimationFrame(() => {
        const maxScroll = 100;
        const newOpacity = Math.max(0, 1 - lastScrollY.current / maxScroll);
        setGradientOpacity(newOpacity);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const computedOpacity = 0.75 + (0.95 - 0.75) * gradientOpacity;
  const computedBlur = 8 - (8 - 4) * gradientOpacity;

  return (
    <>
      {/* Desktop Navbar */}
      <header
        role="banner"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out shadow-sm backdrop-blur-md hidden md:block bg-navbar"
        style={{
          backgroundColor: `var(--navbar-bg-opacity)`,
          backdropFilter: `blur(${computedBlur}px)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 relative z-50">
            {/* Logo */}
            <Logo
              variant="header"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative z-50"
            />

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-6 relative z-50" role="menubar">
              {/* Solutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span
                    className={cn(
                      "relative z-50 text-sm lg:text-base",
                      "text-heading hover:text-heading/90 data-[state=open]:text-heading data-[state=open]:font-medium",
                      "flex items-center gap-1 cursor-pointer"
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label="Solutions menu"
                    style={{
                      transitionProperty: 'color, opacity',
                      transitionDuration: '300ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Solutions
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-64 border bg-popover border-border transition-colors duration-300 ease-in-out"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/build"
                      className="flex flex-col items-start p-3 hover:bg-accent/50 rounded-md cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                      <span className="font-semibold text-popover-foreground transition-colors duration-300 ease-in-out">
                        Build a New System
                      </span>
                      <span className="text-sm mt-1 text-muted-foreground transition-colors duration-300 ease-in-out">
                        Voor het omzetten van een idee in een volledig geautomatiseerd platform
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/optimize"
                      className="flex flex-col items-start p-3 hover:bg-accent/50 rounded-md cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                      <span className="font-semibold text-popover-foreground transition-colors duration-300 ease-in-out">
                        Optimize Your Business
                      </span>
                      <span className="text-sm mt-1 text-muted-foreground transition-colors duration-300 ease-in-out">
                        Voor het elimineren van chaos en het schalen van je operatie
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/create"
                      className="flex flex-col items-start p-3 hover:bg-accent/50 rounded-md cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                      <span className="font-semibold text-popover-foreground transition-colors duration-300 ease-in-out">
                        Create Viral Content
                      </span>
                      <span className="text-sm mt-1 text-muted-foreground transition-colors duration-300 ease-in-out">
                        Voor het produceren van verbluffende, AI-gedreven visuals
                      </span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Our Work */}
              <Link
                href="/projecten"
                className={cn(
                  "relative z-50 text-sm lg:text-base inline-flex items-center",
                  pathname === '/projecten' 
                    ? "text-heading font-medium"
                    : "text-heading hover:text-heading/90"
                )}
                style={{
                  transitionProperty: 'color, opacity',
                  transitionDuration: '300ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Our Work
              </Link>

              {/* About Us */}
              <Link
                href="/over-ons"
                className={cn(
                  "relative z-50 text-sm lg:text-base inline-flex items-center",
                  pathname === '/over-ons' 
                    ? "text-heading font-medium"
                    : "text-heading hover:text-heading/90"
                )}
                style={{
                  transitionProperty: 'color, opacity',
                  transitionDuration: '300ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                About Us
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher variant="compact" />

              {/* Theme Switcher - Hidden for now */}
              {/* <ThemeSwitcher variant="compact" /> */}

              {/* Contact CTA */}
              <Button
                asChild
                className="px-4 lg:px-6 py-2 font-medium text-sm"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </nav>
          </div>
        </div>

        {/* Animated divider line that fades out on scroll */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent transition-opacity duration-300"
          )}
          style={{ opacity: gradientOpacity }}
        />
      </header>

      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Mobile Hamburger Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 right-4 z-[300] backdrop-blur-sm border transition-all duration-300 shadow-lg bg-glass border-glass text-foreground hover:bg-accent/50"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <div className="relative w-5 h-5">
            <span
              className={cn(
                'absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out',
                isMenuOpen ? 'top-2 rotate-45' : 'top-1'
              )}
            />
            <span
              className={cn(
                'absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out top-2',
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={cn(
                'absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out',
                isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
              )}
            />
          </div>
        </Button>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent
            side="right"
            className="w-[300px] border-l p-0 z-[200] backdrop-blur-md bg-popover border-border"
          >
            {/* Logo in mobile menu header */}
            <div className="flex items-center justify-start px-6 pt-6 pb-6 border-b border-border">
              <Logo
                variant="header"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="scale-90"
              />
            </div>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Navigation menu for mobile devices</SheetDescription>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-4 p-6 flex-1 text-popover-foreground">
              {/* Solutions Section */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider px-3 text-muted-foreground">
                  Solutions
                </div>
                <Link
                  href="/build"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg transition-colors hover:bg-accent/50 text-popover-foreground"
                >
                  <div className="font-semibold">Build a New System</div>
                  <div className="text-sm mt-1 text-muted-foreground">
                    Voor het omzetten van een idee in een platform
                  </div>
                </Link>
                <Link
                  href="/optimize"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg transition-colors hover:bg-accent/50 text-popover-foreground"
                >
                  <div className="font-semibold">Optimize Your Business</div>
                  <div className="text-sm mt-1 text-muted-foreground">
                    Voor het elimineren van chaos en schalen
                  </div>
                </Link>
                <Link
                  href="/create"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg transition-colors hover:bg-accent/50 text-popover-foreground"
                >
                  <div className="font-semibold">Create Viral Content</div>
                  <div className="text-sm mt-1 text-muted-foreground">
                    Voor AI-gedreven visuals
                  </div>
                </Link>
              </div>

              {/* Other Links */}
              <Link
                href="/projecten"
                onClick={handleCloseMenu}
                className="py-3 px-4 rounded-lg transition-colors hover:bg-accent/50 text-popover-foreground"
              >
                Our Work
              </Link>
              <Link
                href="/over-ons"
                onClick={handleCloseMenu}
                className="py-3 px-4 rounded-lg transition-colors hover:bg-accent/50 text-popover-foreground"
              >
                About Us
              </Link>

              {/* Language Switcher - Minimal style */}
              <div className="pt-4 border-t border-border flex items-center justify-center py-4">
                <LanguageSwitcher variant="default" />
              </div>

              {/* Mobile CTA */}
              <Button
                asChild
                className="flex items-center gap-2 w-full justify-center py-3 font-medium mt-4"
                onClick={handleCloseMenu}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

