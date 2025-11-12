'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { Logo } from './ui/logo';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(1);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

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
      {/* Desktop Header */}
      <header
        role="banner"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 shadow-sm bg-[#0A0A0A]/95 backdrop-blur-md hidden md:block"
        style={{
          backgroundColor: `rgba(10,10,10,${computedOpacity})`,
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
                  <button
                    className="text-gray-300 hover:text-white transition-colors relative z-50 flex items-center gap-1 text-sm lg:text-base"
                    aria-label="Solutions menu"
                  >
                    Oplossingen
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-[#0A0A0A] border-gray-800">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/build"
                      className="flex flex-col items-start p-3 hover:bg-gray-800 rounded-md cursor-pointer"
                    >
                      <span className="font-semibold text-white">Een Nieuw Systeem Bouwen</span>
                      <span className="text-sm text-gray-400 mt-1">
                        Voor het omzetten van een idee in een volledig geautomatiseerd platform
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/optimize"
                      className="flex flex-col items-start p-3 hover:bg-gray-800 rounded-md cursor-pointer"
                    >
                      <span className="font-semibold text-white">Bestaande Business Optimaliseren</span>
                      <span className="text-sm text-gray-400 mt-1">
                        Voor het elimineren van chaos en het schalen van je operatie
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/create"
                      className="flex flex-col items-start p-3 hover:bg-gray-800 rounded-md cursor-pointer"
                    >
                      <span className="font-semibold text-white">Virale Content Creëren</span>
                      <span className="text-sm text-gray-400 mt-1">
                        Voor het produceren van verbluffende, AI-gedreven visuals
                      </span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Ons Werk */}
              <Link
                href="/projecten"
                className={cn(
                  'text-gray-300 hover:text-white transition-colors relative z-50 text-sm lg:text-base',
                  pathname === '/projecten' && 'text-white font-medium'
                )}
              >
                Ons Werk
              </Link>

              {/* Over Ons */}
              <Link
                href="/over-ons"
                className={cn(
                  'text-gray-300 hover:text-white transition-colors relative z-50 text-sm lg:text-base',
                  pathname === '/over-ons' && 'text-white font-medium'
                )}
              >
                Over Ons
              </Link>

              {/* Contact CTA */}
              <Button
                asChild
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-4 lg:px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-[#4585f4]/25 text-sm"
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </nav>
          </div>
        </div>

        {/* Animated divider line that fades out on scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent transition-opacity duration-300"
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
          className="fixed top-4 right-4 z-[300] text-white bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 hover:bg-[#0A0A0A]/90 hover:border-white/20 transition-all duration-300 shadow-lg"
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
            className="w-[300px] bg-gradient-to-b from-[#101112]/95 to-[#1a1a1d]/95 border-l border-white/20 p-0 z-[200] backdrop-blur-md"
          >
            {/* Logo in mobile menu header */}
            <div className="flex items-center justify-start px-6 pt-6 pb-6 border-b border-white/20">
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
            <div className="flex flex-col space-y-4 p-6 flex-1">
              {/* Solutions Section */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                  Oplossingen
                </div>
                <Link
                  href="/build"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg hover:bg-white/5 text-white transition-colors"
                >
                  <div className="font-semibold">Een Nieuw Systeem Bouwen</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Voor het omzetten van een idee in een platform
                  </div>
                </Link>
                <Link
                  href="/optimize"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg hover:bg-white/5 text-white transition-colors"
                >
                  <div className="font-semibold">Bestaande Business Optimaliseren</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Voor het elimineren van chaos en schalen
                  </div>
                </Link>
                <Link
                  href="/create"
                  onClick={handleCloseMenu}
                  className="block py-3 px-4 rounded-lg hover:bg-white/5 text-white transition-colors"
                >
                  <div className="font-semibold">Virale Content Creëren</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Voor AI-gedreven visuals
                  </div>
                </Link>
              </div>

              {/* Other Links */}
              <Link
                href="/projecten"
                onClick={handleCloseMenu}
                className="py-3 px-4 rounded-lg hover:bg-white/5 text-white transition-colors"
              >
                Ons Werk
              </Link>
              <Link
                href="/over-ons"
                onClick={handleCloseMenu}
                className="py-3 px-4 rounded-lg hover:bg-white/5 text-white transition-colors"
              >
                Over Ons
              </Link>

              {/* Mobile CTA */}
              <Button
                asChild
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white flex items-center gap-2 w-full justify-center py-3 font-semibold mt-4"
                onClick={handleCloseMenu}
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

