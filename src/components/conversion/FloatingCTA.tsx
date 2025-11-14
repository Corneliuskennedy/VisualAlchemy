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
        transition-all duration-500 ease-out
        ${isMinimized ? 'translate-y-0' : 'translate-y-0'}
      `}
      role="region"
      aria-label="Floating call to action"
    >
      {isMinimized ? (
        // Minimized state - small pill
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-[#4585f4]/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          aria-label="Expand call to action"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">{ctaText}</span>
          <ChevronUp className="h-4 w-4" />
        </button>
      ) : (
        // Full state - card with CTA
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 max-w-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                {isNL ? 'Gratis Automatisering Audit' : 'Free Automation Audit'}
              </h3>
              <p className="text-gray-300 text-sm">
                {isNL 
                  ? 'Ontdek hoe je €15k+ kunt besparen'
                  : 'Discover how you can save €15k+'}
              </p>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Minimize"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#4585f4]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
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

