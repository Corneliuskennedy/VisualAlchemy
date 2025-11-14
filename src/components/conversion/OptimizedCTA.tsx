/**
 * Optimized CTA Component - Conversion Optimized
 * 
 * Features:
 * - Multiple CTA variants (value-focused, benefit-focused, urgency-focused)
 * - Built-in analytics tracking
 * - A/B testing support
 * - Responsive design
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackCTAClick } from '@/lib/analytics';
import useLanguage from '@/contexts/LanguageContext';

interface OptimizedCTAProps {
  variant?: 'primary' | 'secondary' | 'value' | 'benefit' | 'urgency';
  size?: 'sm' | 'default' | 'lg';
  section?: string; // For analytics tracking
  audience?: 'startup' | 'sme' | 'universal';
  className?: string;
  onClick?: () => void;
  href?: string;
  customText?: string;
}

const CTA_VARIANTS = {
  en: {
    primary: 'Book Free Consultation',
    secondary: 'Get Started',
    value: 'Get Your Free Automation Audit',
    benefit: 'See How Much You Can Save',
    urgency: 'Book Your €15k ROI Workshop',
  },
  nl: {
    primary: 'Boek Gratis Consultatie',
    secondary: 'Begin Nu',
    value: 'Krijg Je Gratis Automatisering Audit',
    benefit: 'Zie Hoeveel Je Kunt Besparen',
    urgency: 'Boek Je €15k ROI Workshop',
  },
};

export const OptimizedCTA: React.FC<OptimizedCTAProps> = ({
  variant = 'value', // Default to value-focused (best conversion)
  size = 'lg',
  section = 'unknown',
  audience = 'universal',
  className = '',
  onClick,
  href,
  customText,
}) => {
  const router = useRouter();
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const ctaText = customText || CTA_VARIANTS[language][variant];

  const handleClick = () => {
    // Track CTA click
    trackCTAClick(
      variant,
      audience,
      ctaText,
      section
    );

    // Execute custom onClick or navigate
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      // Default: navigate to contact
      router.push(isNL ? '/nl/contact' : '/contact');
    }
  };

  // Icon based on variant
  const Icon = variant === 'value' || variant === 'urgency' 
    ? Calendar 
    : variant === 'benefit'
    ? Sparkles
    : ArrowRight;

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={`
        group relative
        bg-gradient-to-r from-[#4585f4] to-[#6B8AE6]
        text-white font-semibold
        px-10 py-7 text-lg
        rounded-xl
        transition-all duration-300
        overflow-hidden
        hover:shadow-2xl hover:shadow-[#4585f4]/30
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-[#4585f4] focus:ring-offset-2
        ${className}
      `}
      data-cta={variant}
      data-section={section}
      data-audience={audience}
      aria-label={`${ctaText} - ${isNL ? 'Boek je gratis consultatie' : 'Book your free consultation'}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {ctaText}
        <Icon className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Button>
  );
};

export default OptimizedCTA;

