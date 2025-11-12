'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(1);
  const [isDarkTransition, setIsDarkTransition] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const prevThemeRef = useRef(theme);
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

  // Detect theme change and trigger animation (both directions)
  useEffect(() => {
    if (prevThemeRef.current && prevThemeRef.current !== theme) {
      setIsDarkTransition(true);
      // Duration matches animation timing - optimized for premium feel
      const duration = prefersReducedMotion ? 300 : 1800;
      setTimeout(() => setIsDarkTransition(false), duration);
    }
    prevThemeRef.current = theme;
  }, [theme, prefersReducedMotion]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const computedOpacity = 0.75 + (0.95 - 0.75) * gradientOpacity;
  const computedBlur = 8 - (8 - 4) * gradientOpacity;

  return (
    <>
      {/* Premium Theme Transition - Minimal, Professional, Expensive */}
      <AnimatePresence>
        {isDarkTransition && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
            style={{ willChange: 'opacity' }}
          >
            {/* Primary Color Flood - Strategic single layer with spring physics */}
            <motion.div
              initial={{ 
                transform: theme === 'dark' ? 'translateY(-100%)' : 'translateY(100%)',
                opacity: 0.85,
              }}
              animate={{ 
                transform: 'translateY(0%)',
                opacity: 0,
              }}
              transition={{ 
                type: 'spring',
                stiffness: 50,
                damping: 30,
                mass: 1.2,
              }}
              className="absolute inset-0"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,15,30,0.25) 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.92) 100%)'
                  : 'linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(240,248,255,0.25) 25%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.92) 100%)',
                willChange: 'transform, opacity',
              }}
            />

            {/* Strategic Wave Layers - Reduced to 2 for minimalism, spring physics */}
            {[0, 1].map((waveIndex) => (
              <motion.div
                key={`wave-${waveIndex}`}
                initial={{ 
                  transform: theme === 'dark' ? 'translateY(-15%)' : 'translateY(115%)',
                  opacity: 0.25,
                }}
                animate={{ 
                  transform: theme === 'dark' ? 'translateY(100%)' : 'translateY(-15%)',
                  opacity: 0,
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 45,
                  damping: 28,
                  mass: 1.1,
                  delay: waveIndex * 0.08,
                }}
                className="absolute inset-0"
                style={{
                  background: theme === 'dark'
                    ? `linear-gradient(to bottom, transparent 0%, rgba(0,25,50,${0.15 - waveIndex * 0.05}) 50%, transparent 100%)`
                    : `linear-gradient(to top, transparent 0%, rgba(220,240,255,${0.15 - waveIndex * 0.05}) 50%, transparent 100%)`,
                  clipPath: `polygon(0 ${waveIndex * 8}%, 100% ${waveIndex * 6}%, 100% ${100 - waveIndex * 8}%, 0 ${100 - waveIndex * 6}%)`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}

            {/* Refined Particle System - Reduced to 8 strategic bubbles, spring physics */}
            {[...Array(8)].map((_, i) => {
              const startX = 12 + (i * 11) % 88;
              const delay = (i * 0.08) % 0.96;
              const size = 3 + Math.random() * 2;
              return (
                <motion.div
                  key={`bubble-${i}`}
                  initial={{ 
                    transform: theme === 'dark' 
                      ? `translate(${startX}vw, 100vh) scale(0)` 
                      : `translate(${startX}vw, -10vh) scale(0)`,
                    opacity: 0.5,
                  }}
                  animate={{
                    transform: theme === 'dark'
                      ? `translate(${startX}vw, -10vh) scale(1)`
                      : `translate(${startX}vw, 100vh) scale(1)`,
                    opacity: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 25,
                    mass: 0.8,
                    delay: delay,
                  }}
                  className="absolute rounded-full blur-[2px]"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: theme === 'dark'
                      ? 'radial-gradient(circle, rgba(100,150,200,0.35) 0%, rgba(50,100,150,0.15) 100%)'
                      : 'radial-gradient(circle, rgba(150,200,255,0.4) 0%, rgba(100,150,200,0.2) 100%)',
                    boxShadow: theme === 'dark'
                      ? '0 0 8px rgba(100,150,200,0.25)'
                      : '0 0 8px rgba(150,200,255,0.3)',
                    willChange: 'transform, opacity',
                  }}
                />
              );
            })}

            {/* Depth Gradient Overlay - Subtle radial depth, smooth tween */}
            <motion.div
              initial={{ 
                opacity: 0,
                background: theme === 'dark'
                  ? 'radial-gradient(ellipse at center top, rgba(0,0,0,0) 0%, rgba(0,15,30,0) 50%, rgba(0,0,0,0) 100%)'
                  : 'radial-gradient(ellipse at center bottom, rgba(255,255,255,0) 0%, rgba(240,248,255,0) 50%, rgba(255,255,255,0) 100%)'
              }}
              animate={{ 
                opacity: [0, 0.4, 0],
                background: theme === 'dark'
                  ? 'radial-gradient(ellipse at center top, rgba(0,0,0,0) 0%, rgba(0,15,30,0.3) 25%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.93) 100%)'
                  : 'radial-gradient(ellipse at center bottom, rgba(255,255,255,0) 0%, rgba(240,248,255,0.3) 25%, rgba(255,255,255,0.75) 65%, rgba(255,255,255,0.93) 100%)'
              }}
              transition={{ 
                opacity: {
                  duration: 1.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1],
                },
                background: {
                  duration: 1.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              className="absolute inset-0"
              style={{ willChange: 'opacity' }}
            />

            {/* Subtle Blur Transition - Premium depth effect */}
            <motion.div
              initial={{ 
                backdropFilter: 'blur(0px)',
                opacity: 0,
              }}
              animate={{ 
                backdropFilter: 'blur(8px)',
                opacity: [0, 0.3, 0],
              }}
              transition={{ 
                backdropFilter: {
                  type: 'spring',
                  stiffness: 50,
                  damping: 35,
                  mass: 1,
                },
                opacity: {
                  duration: 1.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1],
                },
              }}
              className={`absolute inset-0 ${
                theme === 'dark' ? 'bg-black/5' : 'bg-white/5'
              }`}
              style={{ willChange: 'backdrop-filter, opacity' }}
            />

            {/* Final Fade Overlay - Seamless blending */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ 
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.5, 1],
              }}
              className={`absolute inset-0 ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              }`}
              style={{
                opacity: 0.12,
                willChange: 'opacity',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <header
        role="banner"
        aria-label="Main Navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 shadow-sm backdrop-blur-md hidden md:block",
          theme === 'dark' 
            ? "bg-[#0A0A0A]/95" 
            : "bg-white/95"
        )}
        style={{
          backgroundColor: theme === 'dark' 
            ? `rgba(10,10,10,${computedOpacity})` 
            : `rgba(255,255,255,${computedOpacity})`,
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
                    className={cn(
                      "transition-colors relative z-50 flex items-center gap-1 text-sm lg:text-base",
                      theme === 'dark'
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    )}
                    aria-label="Solutions menu"
                  >
                    Solutions
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className={cn(
                    "w-64 border",
                    theme === 'dark'
                      ? "bg-[#0A0A0A] border-gray-800"
                      : "bg-white border-gray-200"
                  )}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/build"
                      className={cn(
                        "flex flex-col items-start p-3 hover:bg-opacity-80 rounded-md cursor-pointer transition-colors",
                        theme === 'dark'
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <span className={cn(
                        "font-semibold",
                        theme === 'dark' ? "text-white" : "text-gray-900"
                      )}>
                        Build a New System
                      </span>
                      <span className={cn(
                        "text-sm mt-1",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        Voor het omzetten van een idee in een volledig geautomatiseerd platform
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/optimize"
                      className={cn(
                        "flex flex-col items-start p-3 hover:bg-opacity-80 rounded-md cursor-pointer transition-colors",
                        theme === 'dark'
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <span className={cn(
                        "font-semibold",
                        theme === 'dark' ? "text-white" : "text-gray-900"
                      )}>
                        Optimize Your Business
                      </span>
                      <span className={cn(
                        "text-sm mt-1",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        Voor het elimineren van chaos en het schalen van je operatie
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/create"
                      className={cn(
                        "flex flex-col items-start p-3 hover:bg-opacity-80 rounded-md cursor-pointer transition-colors",
                        theme === 'dark'
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <span className={cn(
                        "font-semibold",
                        theme === 'dark' ? "text-white" : "text-gray-900"
                      )}>
                        Create Viral Content
                      </span>
                      <span className={cn(
                        "text-sm mt-1",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
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
                  "transition-colors relative z-50 text-sm lg:text-base",
                  pathname === '/projecten' 
                    ? (theme === 'dark' ? "text-white font-medium" : "text-gray-900 font-medium")
                    : (theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900")
                )}
              >
                Our Work
              </Link>

              {/* About Us */}
              <Link
                href="/over-ons"
                className={cn(
                  "transition-colors relative z-50 text-sm lg:text-base",
                  pathname === '/over-ons' 
                    ? (theme === 'dark' ? "text-white font-medium" : "text-gray-900 font-medium")
                    : (theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900")
                )}
              >
                About Us
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher variant="compact" />

              {/* Theme Switcher */}
              <ThemeSwitcher variant="compact" />

              {/* Contact CTA */}
              <Button
                asChild
                className={cn(
                  "px-4 lg:px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm",
                  theme === 'dark'
                    ? "bg-[#4585f4] hover:bg-[#4585f4]/90 text-white hover:shadow-[#4585f4]/25"
                    : "bg-[#4585f4] hover:bg-[#4585f4]/90 text-white hover:shadow-[#4585f4]/25"
                )}
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
          className={cn(
            "fixed top-4 right-4 z-[300] backdrop-blur-sm border transition-all duration-300 shadow-lg",
            theme === 'dark'
              ? "text-white bg-[#0A0A0A]/80 border-white/10 hover:bg-[#0A0A0A]/90 hover:border-white/20"
              : "text-gray-900 bg-white/80 border-gray-200 hover:bg-white/90 hover:border-gray-300"
          )}
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
            className={cn(
              "w-[300px] border-l p-0 z-[200] backdrop-blur-md",
              theme === 'dark'
                ? "bg-gradient-to-b from-[#101112]/95 to-[#1a1a1d]/95 border-white/20"
                : "bg-gradient-to-b from-white/95 to-gray-50/95 border-gray-200"
            )}
          >
            {/* Logo in mobile menu header */}
            <div className={cn(
              "flex items-center justify-start px-6 pt-6 pb-6 border-b",
              theme === 'dark' ? "border-white/20" : "border-gray-200"
            )}>
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
            <div className={cn(
              "flex flex-col space-y-4 p-6 flex-1",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              {/* Solutions Section */}
              <div className="space-y-2">
                <div className={cn(
                  "text-xs font-semibold uppercase tracking-wider px-3",
                  theme === 'dark' ? "text-gray-400" : "text-gray-500"
                )}>
                  Solutions
                </div>
                <Link
                  href="/build"
                  onClick={handleCloseMenu}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-colors",
                    theme === 'dark'
                      ? "hover:bg-white/5 text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  )}
                >
                  <div className="font-semibold">Build a New System</div>
                  <div className={cn(
                    "text-sm mt-1",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    Voor het omzetten van een idee in een platform
                  </div>
                </Link>
                <Link
                  href="/optimize"
                  onClick={handleCloseMenu}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-colors",
                    theme === 'dark'
                      ? "hover:bg-white/5 text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  )}
                >
                  <div className="font-semibold">Optimize Your Business</div>
                  <div className={cn(
                    "text-sm mt-1",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    Voor het elimineren van chaos en schalen
                  </div>
                </Link>
                <Link
                  href="/create"
                  onClick={handleCloseMenu}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-colors",
                    theme === 'dark'
                      ? "hover:bg-white/5 text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  )}
                >
                  <div className="font-semibold">Create Viral Content</div>
                  <div className={cn(
                    "text-sm mt-1",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    Voor AI-gedreven visuals
                  </div>
                </Link>
              </div>

              {/* Other Links */}
              <Link
                href="/projecten"
                onClick={handleCloseMenu}
                className={cn(
                  "py-3 px-4 rounded-lg transition-colors",
                  theme === 'dark'
                    ? "hover:bg-white/5 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                )}
              >
                Our Work
              </Link>
              <Link
                href="/over-ons"
                onClick={handleCloseMenu}
                className={cn(
                  "py-3 px-4 rounded-lg transition-colors",
                  theme === 'dark'
                    ? "hover:bg-white/5 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                )}
              >
                About Us
              </Link>

              {/* Language & Theme Switchers */}
              <div className="pt-4 border-t border-gray-200 dark:border-white/20 space-y-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>

              {/* Mobile CTA */}
              <Button
                asChild
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white flex items-center gap-2 w-full justify-center py-3 font-semibold mt-4"
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

