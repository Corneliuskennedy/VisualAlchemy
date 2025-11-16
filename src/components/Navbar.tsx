import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import Cookies from "js-cookie";
import { Flag } from "./ui/flag";
import useLanguage from "@/contexts/LanguageContext";
import { Logo } from "./ui/logo";
// Cal.com integration removed - buttons use data-cal-* attributes for external script initialization
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

interface NavItemProps {
  item: {
    label: string;
    onClick?: () => void;
    to?: string;
    icon?: React.ReactNode;
    isButton?: boolean;
  };
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavItem = React.memo<NavItemProps>(({ item, isMobile, onItemClick }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick();
    }
  }, [item.onClick, onItemClick]);

  if (item.isButton) {
    return (
      <button
        onClick={handleClick}
        className={`text-gray-300 hover:text-white transition-colors relative z-50 ${
          isMobile ? "text-left py-3 px-4 rounded-lg hover:bg-white/5 flex items-center gap-2 w-full" : ""
        }`}
      >
        {item.icon && item.icon}
        {item.label}
      </button>
    );
  }

  // Only wrap with click handler if we have onClick handlers to call
  const linkContent = (
    <Link
      href={item.to!}
      className={`text-gray-300 hover:text-white transition-colors relative z-50 flex items-center gap-1 ${
        isMobile ? "py-3 px-4 rounded-lg hover:bg-white/5 w-full" : "text-xs md:text-sm lg:text-base"
      }`}
    >
      {item.icon && item.icon}
      {item.label}
    </Link>
  );

  // If we have click handlers, wrap in a span to handle them
  if (item.onClick || onItemClick) {
    return (
      <span onClick={handleClick}>
        {linkContent}
      </span>
    );
  }

  return linkContent;
});

NavItem.displayName = 'NavItem';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(1);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, t, setLanguage: setLanguageContext } = useLanguage();
  
  // Cal.com initialized via client-only component (SSR disabled)

  // Memoized translations
  const translations = useMemo(
    () => ({
      en: {
        howItWorks: t('navigation', 'menu.howItWorks'),
        pricing: t('navigation', 'menu.pricing'),
        blog: t('navigation', 'menu.blog'),
        contact: t('navigation', 'menu.contact'),
        getStarted: t('navigation', 'menu.getStarted'),
        menu: "Menu"
      },
      nl: {
        howItWorks: t('navigation', 'menu.howItWorks'),
        pricing: t('navigation', 'menu.pricing'),
        blog: t('navigation', 'menu.blog'),
        contact: t('navigation', 'menu.contact'),
        getStarted: t('navigation', 'menu.getStarted'),
        menu: "Menu"
      },
    }),
    [t]
  );
  const currentTranslations = translations[language as keyof typeof translations];

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSectionOrNavigate = useCallback(
    (id: string) => {
      const isHomePage = pathname === "/" || pathname === "/nl";
      if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          setIsMenuOpen(false);
        }
      } else {
        // When navigating from another page, store the target section in sessionStorage
        sessionStorage.setItem('scrollTarget', id);
        router.push(language === 'nl' ? `/nl` : `/`);
      }
    },
    [pathname, router, language]
  );

  // Add effect to handle section scrolling when navigating from other pages
  useEffect(() => {
    const isHomePage = pathname === "/" || pathname === "/nl";
    if (!isHomePage) return;

    // Check if we have a stored scroll target
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear the stored target immediately to prevent future unwanted scrolls
      sessionStorage.removeItem('scrollTarget');

      // Wait for the page to fully render
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 500); // Increased delay to ensure content is rendered

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Cal.com integration handles booking via data-cal-link attributes

  const handleLanguageSwitch = useCallback(() => {
    const newLanguage = language === "nl" ? "en" : "nl";
    setLanguageContext(newLanguage);
    // No need to handle URL changes here as LanguageSync will handle it
  }, [language, setLanguageContext]);

  // Strategic Navigation Architecture - Clear path to conversion
  const navItems = useMemo(
    () => [
      { 
        label: language === "nl" ? "Startup Kickoff Lab" : "Startup Kickoff Lab", 
        to: language === "nl" ? "/nl/services/startup-kickoff-lab" : "/services/startup-kickoff-lab" 
      },
      { 
        label: language === "nl" ? "Strategie Workshop" : "Strategy Workshop", 
        to: language === "nl" ? "/nl/automation-strategy-workshop" : "/automation-strategy-workshop" 
      },
      { 
        label: currentTranslations.blog, 
        to: language === "nl" ? "/nl/blog" : "/blog" 
      },
      { 
        label: "GDPR Checklist", 
        to: language === "nl" ? "/nl/checklist" : "/checklist" 
      },
    ],
    [currentTranslations, language]
  );

  // Compute the dynamic background opacity and blur based on scroll position.
  // At the top: opacity 0.95, blur 4px. After scrolling: opacity 0.75, blur 8px.
  const computedOpacity = 0.75 + (0.95 - 0.75) * gradientOpacity;
  const computedBlur = 8 - (8 - 4) * gradientOpacity;

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* Cal.com temporarily disabled - buttons have data-cal-* attributes */}
      {/* Desktop Navbar - Full experience */}
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 shadow-sm bg-[#0A0A0A]/95 backdrop-blur-md hidden md:block"
        style={{
          backgroundColor: `rgba(10,10,10,${computedOpacity})`,
          backdropFilter: `blur(${computedBlur}px)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 relative z-50">
            {/* Desktop Logo */}
            <Logo 
              variant="header" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative z-50"
            />

            {/* Desktop Menu */}
            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 relative z-50" role="menubar">
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
              <button
                onClick={handleLanguageSwitch}
                className="text-gray-300 hover:text-white transition-colors relative z-50"
                aria-label={`Switch to ${language === "nl" ? "English" : "Dutch"}`}
                type="button"
              >
                <Flag code={language === "nl" ? "us" : "nl"} height="16" className="w-5 h-5" />
              </button>
              
              {/* Theme Switcher - Hidden for now */}
              {/* <ThemeSwitcher /> */}
              
              {/* Secondary CTA - Workshop */}
              <button
                data-cal-namespace="automation-strategy-workshop"
                data-cal-link="kennet-timmers/workshop"
                data-cal-config='{"layout":"month_view"}'
                className="border border-[#4585f4] text-[#4585f4] hover:bg-[#4585f4] hover:text-white px-2 md:px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium"
                aria-label="Book strategy workshop"
                type="button"
              >
                <span className="hidden sm:inline">{language === "nl" ? "Workshop" : "Workshop"}</span>
                <span className="sm:hidden">WS</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              
              {/* Primary CTA - Free Call */}
              <button
                data-cal-namespace="intro-call-30-minutes"
                data-cal-link="kennet-timmers/intro-call-30-minutes"
                data-cal-config='{"layout":"month_view"}'
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 rounded-lg transition-all duration-300 flex items-center gap-1 md:gap-2 font-semibold shadow-lg hover:shadow-xl hover:shadow-[#4585f4]/25 text-xs md:text-sm"
                aria-label="Book a free scoping call"
                type="button"
              >
                <span className="hidden sm:inline">{language === "nl" ? "Gratis Gesprek" : "Free Call"}</span>
                <span className="sm:hidden">{language === "nl" ? "Gratis" : "Call"}</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated divider line that fades out on scroll */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent transition-opacity duration-300"
          style={{ opacity: gradientOpacity }}
        />
      </nav>

      {/* Mobile Floating Hamburger Menu */}
      <div className="md:hidden">
        {/* Animated Hamburger/Close Button - Always visible */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 right-4 z-[300] text-white bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 hover:bg-[#0A0A0A]/90 hover:border-white/20 transition-all duration-300 shadow-lg"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <div className="relative w-5 h-5">
            {/* Animated Hamburger to X */}
            <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'top-2 rotate-45' : 'top-1'
            }`} />
            <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out top-2 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`} />
            <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
            }`} />
          </div>
        </Button>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent
            side="right"
            className="w-[300px] bg-gradient-to-b from-[#101112]/95 to-[#1a1a1d]/95 border-l border-white/20 p-0 z-[200] backdrop-blur-md"
          >
            {/* Logo in hamburger menu header - Left aligned */}
            <div className="flex items-center justify-start px-6 pt-6 pb-6 border-b border-white/20">
              <Logo 
                variant="header" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                className="scale-90"
              />
            </div>
            <SheetTitle className="sr-only">
              {currentTranslations.menu}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu for mobile devices
            </SheetDescription>
            
            {/* Menu items */}
            <div className="flex flex-col space-y-4 p-6 flex-1">
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} isMobile onItemClick={handleCloseMenu} />
              ))}
              
              {/* Mobile CTAs */}
              <div className="space-y-3 mt-6">
                <Button
                  data-cal-namespace="intro-call-30-minutes"
                  data-cal-link="kennet-timmers/intro-call-30-minutes"
                  data-cal-config='{"layout":"month_view"}'
                  className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white flex items-center gap-2 w-full justify-center py-3 font-semibold"
                  onClick={handleCloseMenu}
                >
                  {language === "nl" ? "Gratis Gesprek Boeken" : "Book Free Call"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <Button
                  data-cal-namespace="automation-strategy-workshop"
                  data-cal-link="kennet-timmers/workshop"
                  data-cal-config='{"layout":"month_view"}'
                  variant="outline"
                  className="border-[#4585f4] text-[#4585f4] hover:bg-[#4585f4] hover:text-white flex items-center gap-2 w-full justify-center py-3"
                  onClick={handleCloseMenu}
                >
                  {language === "nl" ? "Strategy Workshop" : "Strategy Workshop"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Settings at bottom */}
            <div className="p-6 border-t border-white/20 space-y-3">
              <button
                onClick={handleLanguageSwitch}
                className="text-gray-300 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-lg flex items-center justify-center w-full gap-2"
                aria-label={`Switch to ${language === "nl" ? "English" : "Dutch"}`}
              >
                <Flag code={language === "nl" ? "us" : "nl"} height="16" className="w-5 h-5" />
                <span className="text-sm">{language === "nl" ? "English" : "Nederlands"}</span>
              </button>
              
              {/* Mobile Theme Switcher - Hidden for now */}
              {/* <div className="flex justify-center">
                <ThemeSwitcher />
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};