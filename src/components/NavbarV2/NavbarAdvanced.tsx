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
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 35,
        mass: 0.8,
      }}
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
      {/* Clean gradient background layer - More transparent */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(69, 133, 244, 0.15) 0%, 
              rgba(107, 138, 230, 0.12) 15%,
              rgba(69, 133, 244, 0.15) 30%,
              rgba(0, 0, 0, 0.2) 60%,
              rgba(0, 0, 0, 0.35) 85%,
              rgba(0, 0, 0, 0.5) 100%
            )
          `,
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(160%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 dark:opacity-70"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(69, 133, 244, 0.2) 0%, 
              rgba(107, 138, 230, 0.15) 15%,
              rgba(69, 133, 244, 0.2) 30%,
              rgba(0, 0, 0, 0.25) 60%,
              rgba(0, 0, 0, 0.4) 85%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `,
        }}
      />

      {/* Clean glass overlay - More transparent and classy */}
      <div
        className={cn(
          'absolute inset-0 -z-10',
          'bg-white/70 dark:bg-black/70',
          'backdrop-blur-xl backdrop-saturate-150',
          'border-b',
          'transition-all duration-300'
        )}
        style={{
          borderBottomColor: isScrolled 
            ? 'rgba(69, 133, 244, 0.2)' 
            : 'rgba(69, 133, 244, 0.1)',
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
          {/* Theme Switcher - Hidden for now */}
          {/* <ThemeSwitcher variant="compact" /> */}
          <Button
            asChild
            className="px-6 py-2.5 font-medium font-archivo text-sm"
          >
            <Link href={isDutch ? '/nl/contact' : '/contact'}>
              {isDutch ? 'Contact' : 'Contact Us'}
            </Link>
          </Button>
        </div>
      </div>

      {/* Clean bottom border gradient - Blue only */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.3), rgba(69, 133, 244, 0.7), rgba(107, 138, 230, 0.7), rgba(69, 133, 244, 0.7), rgba(0, 0, 0, 0.3))',
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
        'transition-all duration-200 ease-out',
        'group',
        isActive 
          ? 'text-[#4585f4] dark:text-[#6B8AE6] font-semibold' 
          : 'text-foreground/80 hover:text-[#4585f4] dark:hover:text-[#6B8AE6]'
      )}
      style={{
        transform: `translate(${linkPosition.x}px, ${linkPosition.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Clean hover background - Blue only */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(135deg, rgba(69, 133, 244, 0.15) 0%, rgba(107, 138, 230, 0.12) 50%, rgba(69, 133, 244, 0.15) 100%)',
        }}
      />

      {/* Simple text - no split reveal to match Solutions */}
      <span className="relative z-10 block">
        {label}
      </span>

      {/* Clean active indicator - Blue only */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-1 w-10 rounded-full overflow-hidden"
          initial={{ x: '-50%', scaleX: 0 }}
          animate={{ x: '-50%', scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(90deg, #4585f4 0%, #6B8AE6 50%, #4585f4 100%)',
          }}
        />
      )}
    </Link>
  );
}

