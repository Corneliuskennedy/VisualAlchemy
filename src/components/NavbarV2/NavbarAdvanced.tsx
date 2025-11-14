/**
 * Advanced Navbar - "Is This Possible?" Edition
 * Features:
 * - Magnetic hover effects (cursor attraction)
 * - Animated gradient background
 * - 3D parallax tilt
 * - Smart blur adaptation
 * - Split text reveal animations
 * - Micro-interactions everywhere
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { SolutionsDropdown } from './SolutionsDropdown';
import { cn } from '@/lib/utils';
import { useNavbarContent } from './hooks/useNavbarContent';

interface NavbarAdvancedProps {
  isScrolled: boolean;
  isVisible: boolean;
}

export function NavbarAdvanced({ isScrolled, isVisible }: NavbarAdvancedProps) {
  const pathname = usePathname();
  const isDutch = pathname.startsWith('/nl');
  const { navItems, isActiveRoute } = useNavbarContent();
  const navRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 });

  // Mouse tracking for magnetic effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const xPos = (e.clientX - centerX) / rect.width;
    const yPos = (e.clientY - centerY) / rect.height;
    
    setMousePosition({ x: xPos, y: yPos });
    x.set(xPos);
    y.set(yPos);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseenter', handleMouseEnter);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseenter', handleMouseEnter);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Filter out Solutions dropdown (handled separately)
  const regularNavItems = navItems.filter(item => !item.children || item.children.length === 0);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-[100]',
        'h-20 hidden md:flex',
        'perspective-1000'
      )}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isScrolled
            ? [
                'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
                'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
              ]
            : [
                'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)',
                'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)',
                'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
              ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(160%)',
        }}
      />

      {/* Glass overlay */}
      <div
        className={cn(
          'absolute inset-0 -z-10',
          'bg-white/70 dark:bg-black/70',
          'border-b border-black/5 dark:border-white/10',
          'transition-all duration-500'
        )}
        style={{
          opacity: isScrolled ? 0.9 : 0.7,
        }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          x: useTransform(x, [-0.5, 0.5], [-10, 10]),
          y: useTransform(y, [-0.5, 0.5], [-10, 10]),
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 w-full h-full flex items-center justify-between relative z-10">
        {/* Logo with magnetic effect */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Logo variant="header" />
        </motion.div>

        {/* Navigation items */}
        <nav className="flex items-center gap-2 lg:gap-4 flex-1 justify-center">
          {/* Solutions Dropdown */}
          <SolutionsDropdown isActiveRoute={isActiveRoute} />
          
          {/* Regular navigation items */}
          {regularNavItems.map((item, index) => {
            const isActive = isActiveRoute(item.href);
            return (
              <NavLink
                key={item.href || index}
                href={item.href}
                label={item.label}
                isActive={isActive}
                mousePosition={mousePosition}
                index={index}
              />
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher variant="compact" />
          <ThemeSwitcher variant="compact" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-button-primary hover:bg-button-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href={isDutch ? '/nl/contact' : '/contact'}>
                {isDutch ? 'Contact' : 'Contact Us'}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom border with gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
        }}
      />
    </motion.header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  mousePosition: { x: number; y: number };
  index: number;
}

function NavLink({ href, label, isActive, mousePosition, index }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });

  // Magnetic effect - link attracts cursor
  useEffect(() => {
    if (!linkRef.current || !isHovered) return;

    const link = linkRef.current;
    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = (distanceX / distance) * force * 8;
        const moveY = (distanceY / distance) * force * 8;
        setLinkPosition({ x: moveX, y: moveY });
      } else {
        setLinkPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setLinkPosition({ x: 0, y: 0 });
      }}
      className={cn(
        'relative px-4 py-2 rounded-lg',
        'text-sm lg:text-base font-medium',
        'transition-colors duration-200 ease-out',
        'group',
        isActive 
          ? 'text-blue-500 dark:text-blue-400 font-semibold' 
          : 'text-foreground/95 dark:text-foreground/95'
      )}
      style={{
        transform: `translate(${linkPosition.x}px, ${linkPosition.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background glow on hover - matches Solutions dropdown */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Simple text - no split reveal to match Solutions */}
      <span className="relative z-10 block">
        {label}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ x: '-50%', scaleX: 0 }}
          animate={{ x: '-50%', scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Link>
  );
}

