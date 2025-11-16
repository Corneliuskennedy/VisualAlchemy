/**
 * Floating CTA Component - Desktop Only
 * 
 * Features:
 * - Sticky floating CTA for desktop
 * - Scroll-activated
 * - Minimizeable
 * - Analytics tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, X, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackCTAClick } from '@/lib/analytics';
import useLanguage from '@/contexts/LanguageContext';

interface FloatingCTAProps {
  showAfterScroll?: number; // Show after scrolling X pixels
  audience?: 'startup' | 'sme' | 'universal';
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  showAfterScroll = 300,
  audience = 'universal',
}) => {
  const router = useRouter();
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  const handleClick = () => {
    trackCTAClick('floating', audience, 'Book Free Consultation', 'floating');
    router.push(isNL ? '/nl/contact' : '/contact');
  };

  if (!isVisible) return null;

  const ctaText = isNL ? 'Boek Gratis Consultatie' : 'Book Free Consultation';

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999]
        hidden lg:block
        transition-all duration-300 ease-out
      `}
      role="region"
      aria-label="Floating call to action"
    >
      {isMinimized ? (
        // Minimized state - elegant black/white pill
        <button
          onClick={() => setIsMinimized(false)}
          type="button"
          className="bg-white text-black px-5 py-3 rounded-sm border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 shadow-lg active:scale-[0.98] cursor-pointer"
          aria-label="Expand call to action"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">{ctaText}</span>
          <ChevronUp className="h-4 w-4" />
        </button>
      ) : (
        // Full state - elegant black/white card
        <div className="bg-white border border-black rounded-sm shadow-lg p-6 max-w-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-black font-semibold text-lg mb-1">
                {isNL ? 'Gratis Automatisering Audit' : 'Free Automation Audit'}
              </h3>
              <p className="text-black/70 text-sm">
                {isNL 
                  ? 'Ontdek hoe je €15k+ kunt besparen'
                  : 'Discover how you can save €15k+'}
              </p>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-black/50 hover:text-black transition-colors p-1"
              aria-label="Minimize"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={handleClick}
            type="button"
            className="w-full bg-white text-black font-medium py-3 px-6 rounded-sm hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 ease-in-out flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            data-cta="floating"
            data-audience={audience}
          >
            <Calendar className="h-5 w-5" />
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingCTA;

