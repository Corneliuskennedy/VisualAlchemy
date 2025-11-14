/**
 * Exit Intent Popup Component
 * 
 * Features:
 * - Detects exit intent (mouse leaving viewport)
 * - Shows special offer
 * - Tracks dismissals
 * - Mobile-friendly (shows after scroll)
 */

'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import useLanguage from '@/contexts/LanguageContext';

interface ExitIntentPopupProps {
  showOnPages?: string[]; // Pages to show on (empty = all pages)
  audience?: 'startup' | 'sme' | 'universal';
  delay?: number; // Delay before showing (ms)
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  showOnPages = [],
  audience = 'universal',
  delay = 0,
}) => {
  const router = useRouter();
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown (cookie/localStorage)
    const hasShownBefore = localStorage.getItem('exitIntentShown');
    if (hasShownBefore) {
      return;
    }

    // Check if should show on this page
    if (showOnPages.length > 0) {
      const currentPath = window.location.pathname;
      const shouldShow = showOnPages.some(page => currentPath.includes(page));
      if (!shouldShow) {
        return;
      }
    }

    // Desktop: Detect exit intent (mouse leaving top of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          localStorage.setItem('exitIntentShown', 'true');
          trackEvent('exit_intent_shown', {
            page: window.location.pathname,
            audience,
          });
        }, delay);
      }
    };

    // Mobile: Show after scrolling down and then up (indicates leaving)
    let scrollDirection = 'down';
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
      } else if (currentScrollY < lastScrollY && scrollDirection === 'down' && currentScrollY > 500) {
        // Scrolled down then up (likely leaving)
        if (!hasShown) {
          setTimeout(() => {
            setIsVisible(true);
            setHasShown(true);
            localStorage.setItem('exitIntentShown', 'true');
            trackEvent('exit_intent_shown', {
              page: window.location.pathname,
              audience,
              device: 'mobile',
            });
          }, delay);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    // Only add desktop listener on desktop
    if (window.innerWidth >= 1024) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Add scroll listener for mobile
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown, showOnPages, audience, delay]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('exit_intent_dismissed', {
      page: window.location.pathname,
      audience,
    });
  };

  const handleCTAClick = () => {
    trackCTAClick('exit-intent', audience, 'Book Free Consultation', 'exit-popup');
    setIsVisible(false);
    router.push(isNL ? '/nl/contact' : '/contact');
  };

  if (!isVisible) return null;

  const content = {
    en: {
      title: 'Wait! Get Your Free Automation Audit',
      subtitle: 'Discover how you can save €15,000+ annually',
      cta: 'Book Free Consultation',
      offer: 'Limited spots available this month',
    },
    nl: {
      title: 'Wacht! Krijg Je Gratis Automatisering Audit',
      subtitle: 'Ontdek hoe je €15.000+ per jaar kunt besparen',
      cta: 'Boek Gratis Consultatie',
      offer: 'Beperkt aantal plaatsen beschikbaar deze maand',
    },
  };

  const t = content[language];

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <h2 id="exit-intent-title" className="text-2xl font-bold text-white mb-2 text-center">
          {t.title}
        </h2>
        <p className="text-gray-300 text-center mb-6">
          {t.subtitle}
        </p>

        {/* Offer badge */}
        <div className="bg-[#4585f4]/20 border border-[#4585f4]/30 rounded-lg p-3 mb-6">
          <p className="text-sm text-[#4585f4] text-center font-medium">
            {t.offer}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="w-full bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-[#4585f4]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          data-cta="exit-intent"
          data-audience={audience}
        >
          <Calendar className="h-5 w-5" />
          {t.cta}
        </button>

        {/* Trust indicator */}
        <p className="text-xs text-gray-400 text-center mt-4">
          {isNL 
            ? '200+ bedrijven vertrouwen ons • 98% tevredenheid'
            : '200+ companies trust us • 98% satisfaction'}
        </p>
      </div>
    </div>
  );
};

export default ExitIntentPopup;

