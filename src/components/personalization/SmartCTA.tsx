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

import React, { useEffect, useState } from 'react';
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

export const SmartCTA: React.FC<SmartCTAProps> = ({
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

  useEffect(() => {
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
    
    setIntent(finalIntent);

    // Get optimized content
    const optimizedContent = optimizer.getOptimizedContent(finalIntent);
    setContent(optimizedContent);

    // Record impression
    optimizer.recordImpression(optimizedContent.id, finalIntent.type);

    setIsLoading(false);

    // Update intent periodically
    const interval = setInterval(() => {
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
      
      if (finalNewIntent.confidence > finalIntent.confidence) {
        setIntent(finalNewIntent);
        const newContent = optimizer.getOptimizedContent(finalNewIntent);
        setContent(newContent);
        optimizer.recordImpression(newContent.id, finalNewIntent.type);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [language, audience]);

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
    <div className={`space-y-5 md:space-y-6 ${className}`}>
      {/* Premium Headline with Refined Typography - Enhanced Contrast */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold 
                     text-[#0F172A] dark:text-white
                     tracking-tight leading-tight">
        {content.content.headline}
      </h2>

      {/* Premium Offer Badge with Sleek Design */}
      {content.content.offer && (
        <div className="inline-flex items-center gap-2 
                        bg-gradient-to-r from-[#4585f4]/10 via-[#4585f4]/15 to-[#6B8AE6]/10
                        dark:from-[#4585f4]/20 dark:via-[#4585f4]/25 dark:to-[#6B8AE6]/20
                        border border-[#4585f4]/30 dark:border-[#4585f4]/40
                        backdrop-blur-sm
                        rounded-xl px-5 py-2.5
                        shadow-lg shadow-[#4585f4]/10
                        transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4585f4]/20">
          <p className="text-sm md:text-base font-semibold 
                       text-[#4585f4] dark:text-[#6B8AE6]
                       tracking-tight">
            {content.content.offer}
          </p>
        </div>
      )}

      {/* Premium CTA Button with Sophisticated Effects */}
      <Button
        onClick={handleClick}
        size="lg"
        className="group relative 
                   bg-gradient-to-r from-[#4585f4] via-[#5A8FF5] to-[#6B8AE6]
                   dark:from-[#4585f4] dark:via-[#5A8FF5] dark:to-[#6B8AE6]
                   text-white 
                   px-12 py-8 
                   text-lg md:text-xl font-semibold 
                   rounded-2xl 
                   transition-all duration-500 ease-out
                   overflow-hidden
                   shadow-2xl shadow-[#4585f4]/25
                   hover:shadow-3xl hover:shadow-[#4585f4]/40
                   hover:scale-[1.02]
                   active:scale-[0.98]
                   transform-gpu
                   border border-[#4585f4]/20"
        data-cta="smart"
        data-intent={intent.type}
        data-confidence={intent.confidence.toFixed(2)}
        data-variant-id={content.id}
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                       -translate-x-full group-hover:translate-x-full 
                       transition-transform duration-1000 ease-out" />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="relative z-10 flex items-center gap-3">
          {content.content.cta}
          <Icon className="h-5 w-5 md:h-6 md:w-6 transition-all duration-300 
                          group-hover:translate-x-1 group-hover:scale-110" />
        </span>
      </Button>

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

export default SmartCTA;

