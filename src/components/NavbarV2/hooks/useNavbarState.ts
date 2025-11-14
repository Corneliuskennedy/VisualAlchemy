/**
 * Navbar State Hook
 * Centralized state management for navbar
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useNavbarState() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside (handled by Radix)
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const setDropdown = useCallback((id: string | null) => {
    setActiveDropdown(id);
  }, []);

  return {
    isMobileMenuOpen,
    activeDropdown,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    setDropdown,
  };
}



