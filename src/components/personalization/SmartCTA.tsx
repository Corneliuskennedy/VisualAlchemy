/**
 * AI-Powered Smart CTA Component
 * 
 * Dynamically adjusts CTA copy, placement, and design based on:
 * - Detected visitor intent (startup vs SME)
 * - Real-time performance data
 * - A/B testing results
 * 
 * Technical Showcase:
 * - ML-based personalization
 * - Multi-armed bandit A/B testing
 * - Real-time optimization
 * - Performance tracking
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles, Rocket, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackCTAClick } from '@/lib/analytics';
import useLanguage from '@/contexts/LanguageContext';
import { getIntentDetector } from '@/lib/personalization/IntentDetector';
import { getContentOptimizer } from '@/lib/personalization/ContentOptimizer';
import { IntentScore } from '@/lib/personalization/types';

/**
 * SmartCTA Component Props
 * 
 * @interface SmartCTAProps
 * @property {string} [section] - Section identifier for analytics tracking
 * @property {'startup'|'sme'|'universal'} [audience='universal'] - Target audience for personalization
 * @property {string} [className] - Additional CSS classes
 * @property {'primary'|'value'|'benefit'} [defaultVariant='primary'] - Default CTA variant
 */
interface SmartCTAProps {
  section?: string;
  audience?: 'startup' | 'sme' | 'universal';
  className?: string;
  defaultVariant?: 'primary' | 'value' | 'benefit';
}

const CTA_CONTENT = {
  en: {
    startup: [
      {
        id: 'startup-1',
        headline: 'Launch Your MVP in 30 Days',
        cta: 'Book Your Validation Call',
        offer: '€399 - 90-min validation session',
      },
      {
        id: 'startup-2',
        headline: 'From Idea to First Users',
        cta: 'Start Your MVP Sprint',
        offer: '€4,500 - 30-day MVP build',
      },
    ],
    sme: [
      {
        id: 'sme-1',
        headline: 'Save €15,000+ Annually',
        cta: 'Get Your Free Automation Audit',
        offer: 'Free - No obligation',
      },
      {
        id: 'sme-2',
        headline: 'Optimize Your Operations',
        cta: 'Book Your ROI Workshop',
        offer: '€1,497 - ROI guaranteed',
      },
    ],
    universal: [
      {
        id: 'universal-1',
        headline: 'Transform Your Business',
        cta: 'Book Free Consultation',
        offer: 'Free - 15 min call',
      },
    ],
  },
  nl: {
    startup: [
      {
        id: 'startup-1',
        headline: 'Lanceer Je MVP in 30 Dagen',
        cta: 'Boek Je Validatie Gesprek',
        offer: '€399 - 90-min validatie sessie',
      },
      {
        id: 'startup-2',
        headline: 'Van Idee naar Eerste Gebruikers',
        cta: 'Start Je MVP Sprint',
        offer: '€4.500 - 30-dagen MVP bouw',
      },
    ],
    sme: [
      {
        id: 'sme-1',
        headline: 'Bespaar €15.000+ Per Jaar',
        cta: 'Krijg Je Gratis Automatisering Audit',
        offer: 'Gratis - Geen verplichting',
      },
      {
        id: 'sme-2',
        headline: 'Optimaliseer Je Operaties',
        cta: 'Boek Je ROI Workshop',
        offer: '€1.497 - ROI gegarandeerd',
      },
    ],
    universal: [
      {
        id: 'universal-1',
        headline: 'Transformeer Je Bedrijf',
        cta: 'Boek Gratis Consultatie',
        offer: 'Gratis - 15 min gesprek',
      },
    ],
  },
};

const SmartCTAComponent: React.FC<SmartCTAProps> = ({
  section = 'unknown',
  audience = 'universal',
  className = '',
  defaultVariant = 'primary',
}) => {
  const router = useRouter();
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [intent, setIntent] = useState<IntentScore | null>(null);
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use refs to track previous values and prevent unnecessary updates
  const previousIntentRef = React.useRef<IntentScore | null>(null);
  const previousContentIdRef = React.useRef<string | null>(null);
  const isMountedRef = React.useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Initialize content optimizer
    const optimizer = getContentOptimizer();
    const contentData = CTA_CONTENT[language];

    optimizer.initializeVariants({
      startup: contentData.startup.map(c => ({
        id: c.id,
        content: {
          headline: c.headline,
          cta: c.cta,
          offer: c.offer,
        },
        performance: { impressions: 0, conversions: 0, conversionRate: 0 },
      })),
      sme: contentData.sme.map(c => ({
        id: c.id,
        content: {
          headline: c.headline,
          cta: c.cta,
          offer: c.offer,
        },
        performance: { impressions: 0, conversions: 0, conversionRate: 0 },
      })),
      universal: contentData.universal.map(c => ({
        id: c.id,
        content: {
          headline: c.headline,
          cta: c.cta,
          offer: c.offer,
        },
        performance: { impressions: 0, conversions: 0, conversionRate: 0 },
      })),
    });

    // Detect intent
    const detector = getIntentDetector();
    const detectedIntent = detector.detectIntent();
    
    // Use detected intent, but override with audience prop if provided and confidence is low
    const finalIntent = detectedIntent.confidence > 0.6 
      ? detectedIntent 
      : { ...detectedIntent, type: audience };
    
    // Get optimized content
    const optimizedContent = optimizer.getOptimizedContent(finalIntent);

    // Only update state if values actually changed
    if (!previousIntentRef.current || 
        previousIntentRef.current.type !== finalIntent.type ||
        previousIntentRef.current.confidence !== finalIntent.confidence) {
      setIntent(finalIntent);
      previousIntentRef.current = finalIntent;
    }

    if (!previousContentIdRef.current || 
        previousContentIdRef.current !== optimizedContent.id) {
      setContent(optimizedContent);
      previousContentIdRef.current = optimizedContent.id;
    }

    // Record impression
    optimizer.recordImpression(optimizedContent.id, finalIntent.type);
    setIsLoading(false);

    // Update intent periodically - but only if actually changed
    const interval = setInterval(() => {
      // Check if component is still mounted
      if (!isMountedRef.current) return;

      const newIntent = detector.detectIntent();
      let finalNewIntent: IntentScore;
      if (newIntent.confidence > 0.6) {
        finalNewIntent = newIntent;
      } else {
        finalNewIntent = {
          ...newIntent,
          type: audience,
        };
      }
      
      // Only update if confidence improved AND intent/type actually changed
      const previousIntent = previousIntentRef.current;
      if (previousIntent && 
          finalNewIntent.confidence > previousIntent.confidence &&
          (finalNewIntent.type !== previousIntent.type || 
           finalNewIntent.confidence !== previousIntent.confidence)) {
        const newContent = optimizer.getOptimizedContent(finalNewIntent);
        
        // Only update if content actually changed
        if (previousContentIdRef.current !== newContent.id) {
          setIntent(finalNewIntent);
          setContent(newContent);
          previousIntentRef.current = finalNewIntent;
          previousContentIdRef.current = newContent.id;
          optimizer.recordImpression(newContent.id, finalNewIntent.type);
        }
      }
    }, 10000); // Increased to 10 seconds - less frequent checks

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
    };
  }, [language, audience]); // Only re-run if language or audience changes

  const handleClick = () => {
    if (!content || !intent) return;

    // Track CTA click
    trackCTAClick('smart-cta', intent.type, content.content.cta, section);

    // Record conversion
    const optimizer = getContentOptimizer();
    optimizer.recordConversion(content.id, intent.type);

    // Navigate
    router.push(isNL ? '/nl/contact' : '/contact');
  };

  if (isLoading || !content || !intent) {
    return (
      <Button
        size="lg"
        className={`bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] text-white ${className}`}
        disabled
      >
        Loading...
      </Button>
    );
  }

  // Icon based on intent
  const Icon = intent.type === 'startup' 
    ? Rocket 
    : intent.type === 'sme'
    ? TrendingUp
    : Calendar;

  return (
    <div className={`space-y-8 md:space-y-10 ${className}`}>
      {/* Premium Headline - Refined Typography */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-archivo font-bold 
                     text-heading dark:text-white
                     tracking-[-0.02em] leading-[1.1]
                     max-w-2xl mx-auto">
        {content.content.headline}
      </h2>

      {/* Premium Button Group - World-Class Design */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Secondary CTA - Refined & Sophisticated */}
        {content.content.offer && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            type="button"
            className="group relative
                       bg-transparent
                       text-heading dark:text-white
                       border-2 border-white
                       px-9 py-4 md:px-11 md:py-4.5
                       text-sm md:text-base font-medium font-archivo
                       tracking-[-0.01em]
                       transition-all duration-300 ease-in-out
                       hover:bg-white
                       hover:text-black
                       hover:border-white
                       hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)]
                       active:scale-[0.98]
                       whitespace-nowrap
                       overflow-hidden
                       will-change-transform
                       cursor-pointer"
          >
            {/* Elegant background slide effect */}
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
            <span className="relative z-10 font-medium">{content.content.offer}</span>
          </button>
        )}

        {/* Primary CTA - Bold & Intentional */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          type="button"
          className="group relative
                     bg-white
                     text-black
                     border-2 border-white
                     px-11 py-4 md:px-14 md:py-4.5
                     text-sm md:text-base font-medium font-archivo
                     tracking-[-0.01em]
                     transition-all duration-300 ease-in-out
                     hover:bg-transparent
                     hover:text-white
                     hover:border-white
                     hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)]
                     active:scale-[0.98]
                     flex items-center justify-center gap-3
                     flex-1 sm:flex-none
                     overflow-hidden
                     will-change-transform
                     cursor-pointer"
          data-cta="smart"
          data-intent={intent.type}
          data-confidence={intent.confidence.toFixed(2)}
          data-variant-id={content.id}
        >
          {/* Elegant hover background slide */}
          <span className="absolute inset-0 bg-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right" />
          
          <span className="relative z-10 flex items-center gap-3">
            <span className="font-medium">{content.content.cta}</span>
            <Icon className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ease-out
                            group-hover:translate-x-1.5 group-hover:scale-110" />
          </span>
        </button>
      </div>

      {/* Debug info - Only visible in development mode */}
      {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 opacity-50 font-mono">
          [DEBUG] Intent: {intent.type} ({Math.round(intent.confidence * 100)}% confidence) | 
          Variant: {content.id}
        </div>
      )}
    </div>
  );
};

export const SmartCTA = React.memo(SmartCTAComponent);
SmartCTA.displayName = 'SmartCTA';

export default SmartCTA;

