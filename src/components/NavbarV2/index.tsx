/**
 * Navbar V2 - Enterprise-Grade Navigation Component
 * Complete rebuild with improved functionality, accessibility, and UX
 */

'use client';

import React, { useMemo } from 'react';
import { useNavbarScroll } from './hooks/useNavbarScroll';
import { useNavbarState } from './hooks/useNavbarState';
import { useNavbarContent } from './hooks/useNavbarContent';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { NavbarAdvanced } from './NavbarAdvanced';

export function NavbarV2() {
  // Scroll behavior
  const { isVisible, isScrolled } = useNavbarScroll({
    threshold: 50,
    hideOnScrollDown: true,
    showOnScrollUp: true,
  });

  // State management
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useNavbarState();

  // Content and navigation items
  const { navItems, isActiveRoute } = useNavbarContent();

  // Stable reference to isActiveRoute - use ref to track if it changes
  const isActiveRouteRef = React.useRef(isActiveRoute);
  React.useEffect(() => {
    const changed = isActiveRouteRef.current !== isActiveRoute;
    if (changed) {
      // console.log('[NavbarV2] isActiveRoute function reference changed', {
      //   timestamp: new Date().toISOString(),
      // });
    }
    isActiveRouteRef.current = isActiveRoute;
  }, [isActiveRoute]);

  // Memoize props to prevent unnecessary re-renders
  const desktopProps = useMemo(
    () => ({
      navItems,
      isActiveRoute,
      isScrolled,
      isVisible,
    }),
    [navItems, isActiveRoute, isScrolled, isVisible]
  );

  const mobileProps = useMemo(
    () => ({
      navItems,
      isActiveRoute,
      isMenuOpen: isMobileMenuOpen,
      onMenuToggle: toggleMobileMenu,
      onMenuClose: closeMobileMenu,
    }),
    [navItems, isActiveRoute, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu]
  );

  return (
    <>
      {/* Use advanced navbar for desktop */}
      <NavbarAdvanced isScrolled={isScrolled} isVisible={isVisible} />
      <NavbarMobile {...mobileProps} />
    </>
  );
}

