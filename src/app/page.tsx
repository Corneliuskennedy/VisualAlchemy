'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Rocket, TrendingUp, Sparkles, Users, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeSafe } from '@/hooks/useThemeSafe';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { useHomepage, useCommon } from '@/hooks/useContent';
import SmartCTA from '@/components/personalization/SmartCTA';
import LiveActivity from '@/components/realtime/LiveActivity';
import TeamSection from '@/components/sections/TeamSection';
import { CenterModeSlider } from '@/components/ui/CenterModeSlider';
import { UnifiedSEO } from '@/components/SEO/UnifiedSEO';
import { getContentFreshness } from '@/lib/seo/ContentFreshness';

// Animation variants now come from useOptimizedAnimations hook

const iconMap = {
  '/build': Rocket,
  '/optimize': TrendingUp,
  '/create': Sparkles,
};

const featureIcons = {
  expertise: Users,
  speed: Clock,
  data: BarChart3,
};

// Available logos from public folder
const clientLogos = [
  { name: 'Monuta', image: '/logo/monuta.svg' },
  { name: 'Vilaverde', image: '/logo/vilaverde.svg' },
  { name: 'GTA Hood Expert', image: '/logo/gtahoodexpert.svg' },
];

/**
 * HomeContent Component
 * 
 * Main homepage component featuring:
 * - Premium hero section with visual storytelling
 * - AI-powered segmentation engine (startup vs SME)
 * - Social proof and trust signals
 * - Team showcase section
 * - Multiple conversion-optimized CTAs
 * 
 * @component
 * @returns {JSX.Element} The homepage content
 */
function HomeContent() {
  const { mounted, isDark } = useThemeSafe();
  const {
    containerVariants,
    itemVariants,
    heroTitleVariants,
    cardVariants,
    fadeInUp,
  } = useOptimizedAnimations();
  
  // Get language-aware content from unified system - memoized
  const homepage = useHomepage();
  const common = useCommon();
  
  // Performance: Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  // Track when page is ready for hero animation - prevent hydration mismatch
  const [isHeroReady, setIsHeroReady] = useState(false);
  
  useEffect(() => {
    // Only set ready after mount to prevent hydration mismatch
    if (!mounted) return;
    
    // Delay animation start to allow page to load
    const timer = setTimeout(() => {
      setIsHeroReady(true);
    }, prefersReducedMotion ? 0 : 400); // 400ms delay for page load
    
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, mounted]);
  
  // Parallax scroll tracking - optimized for smooth 60fps performance
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Consolidated scroll tracking - single scroll listener for better performance
  // Use window scroll to reduce overhead from multiple element scrolls
  const { scrollYProgress } = useScroll();
  
  // Reuse same scroll progress for both hero and content (smoother, less overhead)
  // Note: scrollYProgress is a motion value, no need to memoize
  const heroScrollProgress = scrollYProgress;
  const contentScrollProgress = scrollYProgress;

  // Memoize hero text mouse handlers to prevent recreation
  const handleHeroTextMouseEnter = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (isDark) {
      e.currentTarget.style.textShadow = '0 4px 16px rgba(69, 133, 244, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.textShadow = '0 2px 12px rgba(59, 130, 246, 0.15), 0 1px 6px rgba(0, 0, 0, 0.1)';
    }
  }, [isDark]);
  
  const handleHeroTextMouseLeave = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
  }, []);

  // Memoize hero headline words to prevent recreation on every render
  const heroHeadlineWords = useMemo(() => {
    return homepage.hero.headline.split('. ').map((word, index, array) => {
      const isLast = index === array.length - 1;
      const cleanWord = isLast && word.endsWith('.') ? word.slice(0, -1) : word;
      return { word: cleanWord, isLast, index };
    });
  }, [homepage.hero.headline]);
  
  // Optimized hero parallax - memoize transform ranges to prevent recalculation
  const parallaxRanges = useMemo(() => ({
    reduced: { hero: [0, 0], content: [0, 0] },
    normal: { 
      hero: [0, -24], 
      content: [0, -50],
      layer2: [0, -30]
    }
  }), []);

  // Optimized hero parallax - simplified to single transform calculation
  // Reduced motion: disable parallax if user prefers reduced motion
  const heroParallaxBase = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : parallaxRanges.normal.hero
  );
  
  // Hero content layers - simplified calculations (fewer transforms = smoother)
  // Use simple multipliers instead of chained transforms
  const heroContentLayer1 = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : parallaxRanges.normal.hero
  );
  const heroContentLayer2 = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : [0, -25]
  );
  const heroContentLayer3 = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : [0, -26]
  );
  const heroContentLayer4 = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : parallaxRanges.normal.hero
  );
  
  // Page content layers - single simplified transform
  const parallaxLayer1 = useTransform(
    contentScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.content : parallaxRanges.normal.content
  );
  
  const parallaxLayer2 = useTransform(
    contentScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.content : parallaxRanges.normal.layer2
  );
  
  // Hero background effects - optimized fade transition
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.99]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.7, 1], [1, 1, 0.4, 0]);
  

  const handleCTAClick = () => {
    const segmentationSection = document.getElementById('segmentation-engine');
    if (segmentationSection) {
      segmentationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative font-archivo bg-background">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-button-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2"
      >
        {common.skipToContent}
      </a>

      {/* Section 1: Premium Hero - Beautiful Gradient Background */}
      <motion.section 
        ref={heroRef}
        id="hero"
        aria-labelledby="hero-heading"
        className="fixed top-0 left-0 right-0 h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32 z-[2] overflow-hidden"
        style={{ 
          scale: prefersReducedMotion ? 1 : heroScale,
          opacity: heroOpacity,
        }}
      >
        {/* Hero Background - Theme-aware Rich Multi-Color Premium Gradient */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden dark:block hidden"
          style={{
            background: `
              radial-gradient(ellipse 40% 60% at 15% 35%, 
                rgba(100, 150, 255, 0.9) 0%,
                rgba(80, 130, 240, 0.7) 15%,
                rgba(30, 70, 170, 0.3) 35%,
                rgba(8, 12, 28, 0.9) 60%,
                rgba(8, 12, 28, 1) 100%
              ),
              radial-gradient(ellipse 35% 50% at 85% 25%, 
                rgba(180, 120, 255, 0.8) 0%,
                rgba(150, 100, 230, 0.6) 20%,
                rgba(50, 40, 130, 0.2) 45%,
                rgba(8, 12, 28, 0.95) 70%,
                rgba(8, 12, 28, 1) 100%
              ),
              radial-gradient(ellipse 30% 45% at 50% 95%, 
                rgba(100, 150, 255, 0.7) 0%,
                rgba(60, 110, 220, 0.4) 30%,
                rgba(8, 12, 28, 0.8) 60%,
                rgba(8, 12, 28, 1) 100%
              ),
              radial-gradient(ellipse 25% 40% at 30% 75%, 
                rgba(255, 180, 200, 0.6) 0%,
                rgba(200, 120, 200, 0.3) 40%,
                rgba(8, 12, 28, 0.85) 70%,
                rgba(8, 12, 28, 1) 100%
              ),
              radial-gradient(ellipse 25% 35% at 70% 55%, 
                rgba(120, 200, 255, 0.7) 0%,
                rgba(60, 140, 210, 0.4) 40%,
                rgba(8, 12, 28, 0.9) 70%,
                rgba(8, 12, 28, 1) 100%
              ),
              linear-gradient(135deg, 
                rgba(8, 12, 28, 0.6) 0%,
                rgba(8, 12, 28, 0.7) 25%,
                rgba(8, 12, 28, 0.85) 60%,
                rgba(8, 12, 28, 0.95) 100%
              )
            `,
            backgroundSize: '300% 300%, 280% 280%, 260% 260%, 240% 240%, 220% 220%, 100% 100%',
            backgroundPosition: '0% 50%, 100% 30%, 50% 100%, 25% 75%, 75% 60%, center',
            animation: 'gradient-flow 20s ease-in-out infinite, gradient-breathe 7s ease-in-out infinite, water-wave 14s ease-in-out infinite',
            willChange: 'background-position, transform, opacity',
            filter: 'contrast(1.5) saturate(1.7)',
          }}
        />
        {/* Light theme - Clean white background, no gradient */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden dark:hidden bg-background"
        />
        
        {/* Soft overlay for text readability - Theme-aware */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent/30 to-background/40 dark:to-background/40" />
        
        {/* Smooth transition gradient from hero to next section */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"
          style={{ opacity: heroOpacity }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12 relative z-10"
        >
          {/* Clean Typography - Optimized for LCP with Enhanced Legibility */}
          <motion.h1
            id="hero-heading"
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-archivo font-bold leading-[1.05] tracking-tight
                     text-heading dark:text-white flex flex-wrap justify-center items-center gap-2 md:gap-4
                     will-change-transform transform-gpu"
            style={{
              fontFamily: 'var(--font-archivo), system-ui, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
              y: prefersReducedMotion ? 0 : heroContentLayer1,
              contain: 'layout style paint',
            }}
            aria-label={homepage.hero.headline}
          >
            {heroHeadlineWords.map(({ word, isLast, index }) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : -18, // Slightly reduced for smoother feel
                  x: prefersReducedMotion ? 0 : -12, // Slightly reduced for smoother feel
                  scale: 0.96,
                }}
                animate={isHeroReady ? { 
                  opacity: 1, 
                  y: 0, 
                  x: 0,
                  scale: 1,
                } : { 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : -18, 
                  x: prefersReducedMotion ? 0 : -12,
                  scale: 0.96,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.1, // Slower: increased from 0.85s to 1.1s
                  delay: prefersReducedMotion ? 0 : (isHeroReady ? index * 0.3 : 0), // Slightly longer stagger: 0.3s instead of 0.25s
                  ease: [0.19, 1, 0.22, 1], // Smoother easing curve for more elegant feel
                }}
                onMouseEnter={handleHeroTextMouseEnter}
                onMouseLeave={handleHeroTextMouseLeave}
                className="inline-block will-change-transform transform-gpu"
              >
                {word}{isLast ? '.' : '. '}
              </motion.span>
            ))}
          </motion.h1>

          {/* Clean Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed
                     text-muted-foreground dark:text-gray-400
                     font-normal"
            style={{ 
              y: prefersReducedMotion ? 0 : heroContentLayer2,
              opacity: heroOpacity,
            }}
          >
            {homepage.hero.subline}
          </motion.p>

          {/* AI-Powered Smart CTA - Premium Spacing */}
          <motion.div 
            variants={itemVariants} 
            className="pt-8 md:pt-10 lg:pt-12"
            style={{ 
              y: prefersReducedMotion ? 0 : heroContentLayer3,
              opacity: heroOpacity,
            }}
          >
            <SmartCTA 
              section="hero"
              audience="universal"
              className="max-w-3xl mx-auto text-center"
            />
          </motion.div>

          {/* Live Activity Indicator */}
          <motion.div 
            variants={itemVariants} 
            className="pt-6 md:pt-8 flex justify-center"
            style={{ 
              y: prefersReducedMotion ? 0 : heroContentLayer4,
              opacity: heroOpacity,
            }}
          >
            <LiveActivity 
              page="homepage"
              showViewers={true}
              showRecentActivity={true}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Parallax Content Wrapper - Content scrolls over hero with different speeds */}
      <div 
        ref={containerRef} 
        className="relative z-[3]"
        style={{
          willChange: 'transform',
          contain: 'layout style',
        }}
      >
        {/* Spacer to create scroll space for hero - transparent so hero shows through */}
        <div className="h-screen pointer-events-none relative z-[1]" />
        
        {/* Section 2: Minimal Slider - Expensive Simplicity */}
        <section 
          className="snap-start relative bg-background pb-16 md:pb-20"
          style={{ 
            backgroundColor: 'hsl(var(--background))',
          }}
        >
          <div className="bg-background relative z-10" style={{ backgroundColor: 'hsl(var(--background))' }}>
            <CenterModeSlider
              headline={homepage.segmentation.headline}
              cards={useMemo(() => homepage.segmentation.cards.map((card) => ({
                title: card.title,
                expandedTitle: card.expandedTitle,
                description: card.description,
                ctaText: card.ctaText,
                href: card.href,
              })), [homepage.segmentation.cards])}
            />
          </div>
        </section>

        {/* Section 3: Minimal Social Proof - Expensive Simplicity */}
        <section 
          id="social-proof"
          aria-labelledby="social-proof-heading"
          className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
          style={{ 
            backgroundColor: 'hsl(var(--background))',
          }}
        >
          {/* Subtle background image */}
          <div 
            className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'url(/images/pexels-tom-christensen-2078453-32755715.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
              variants={containerVariants}
              className="space-y-8"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Minimal Section Header */}
              <motion.h2
                id="social-proof-heading"
                variants={itemVariants}
                className="text-center text-xs uppercase tracking-[0.15em] font-light 
                           text-subtle dark:text-white/60"
              >
                {homepage.socialProof.headline}
              </motion.h2>

              {/* Minimal Logo Grid - Minimal Padding */}
              <div className="max-w-5xl mx-auto py-6 px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center">
                  {useMemo(() => {
                    // Memoize error handler - shared across all logos
                    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.style.display = 'none';
                    };
                    
                    return clientLogos.map((logo) => (
                      <motion.div
                        key={logo.name}
                        variants={itemVariants}
                        className="grayscale opacity-40 dark:opacity-50 dark:brightness-0 dark:invert transition-opacity duration-500"
                        whileHover={{ opacity: 1 }}
                      >
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className="h-10 md:h-12 w-auto max-w-[180px] object-contain"
                          onError={handleError}
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>
                    ));
                  }, [itemVariants])}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Minimal Why Us - Expensive Simplicity */}
        <section 
          id="why-us"
          aria-labelledby="why-us-heading"
          className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
          style={{ 
            backgroundColor: 'hsl(var(--background))',
          }}
        >
          {/* Subtle background image */}
          <div 
            className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'url(/images/pexels-ro-diaz-2156842533-34405633.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -150px 0px', amount: 0.2 }}
              variants={containerVariants}
              className="space-y-12 md:space-y-16"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Minimal Asymmetrical Layout - Tight Spacing */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
                {/* Left Column - Narrower Text Block */}
                <motion.div 
                  variants={itemVariants} 
                  className="md:col-span-2 space-y-4"
                >
                  <motion.h2
                    id="why-us-heading"
                    variants={fadeInUp}
                    className="text-5xl md:text-6xl lg:text-7xl font-archivo font-light 
                             text-heading dark:text-white leading-[0.95] tracking-[-0.02em]"
                  >
                    {homepage.whyUs.headline}
                  </motion.h2>
                </motion.div>

                {/* Right Column - Wider Description */}
                <motion.div 
                  variants={itemVariants}
                  className="md:col-span-3 space-y-2"
                >
                  <motion.p
                    variants={fadeInUp}
                    className="text-xl md:text-2xl lg:text-3xl leading-relaxed 
                             text-body dark:text-white/90 max-w-none font-light"
                  >
                    {homepage.whyUs.description}
                  </motion.p>
                </motion.div>
              </div>

            {/* Minimal Feature Cards - Expensive Simplicity */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {useMemo(() => {
                // Memoize card images array - prevent recreation on every render
                const cardImages = [
                  '/images/pexels-janhabarta-29824324.webp',
                  '/images/pexels-liuuu-_61-2383408-34142857.webp',
                  '/images/pexels-negativespace-34125.webp',
                ];
                
                return homepage.whyUs.points.map((point, index) => {
                  const Icon = Object.values(featureIcons)[index];
                  const cardImage = cardImages[index] || cardImages[0];
                  
                  return (
                    <motion.div
                      key={`feature-${index}`}
                      variants={cardVariants}
                      className="group relative p-4 md:p-6 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-white/60"
                    >
                      {/* Background Image - Subtle */}
                      <div 
                        className="absolute inset-0 opacity-0 dark:opacity-[0.03] group-hover:opacity-0 dark:group-hover:opacity-[0.05] transition-opacity duration-500"
                        style={{
                          backgroundImage: `url(${cardImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      
                      {/* Minimal Icon - Smaller, More Subtle */}
                      {Icon && (
                        <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                          <Icon className="h-5 w-5 text-[#4585f4] dark:text-white opacity-60 dark:opacity-80" />
                        </div>
                      )}

                      {/* Minimal Content - Tight Spacing */}
                      <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-light mb-2 
                                   text-heading dark:text-white
                                   tracking-tight">
                        {point.title}
                      </h3>
                      <p className="relative z-10 text-lg md:text-xl leading-relaxed 
                                  text-muted-foreground dark:text-white/70 font-light">
                        {point.description}
                      </p>
                    </motion.div>
                  );
                });
              }, [homepage.whyUs.points, cardVariants])}
            </motion.div>

            {/* Minimal Final CTA - Tight Spacing */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-8 md:pt-12"
            >
              <SmartCTA 
                section="final-cta"
                audience="universal"
                className="max-w-lg mx-auto"
              />
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* Section 5: Team Section - No parallax to avoid conflicts */}
        <div 
          className="bg-background relative z-10"
          style={{ 
            backgroundColor: 'hsl(var(--background))',
          }}
        >
          <TeamSection />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Content freshness for 2025 SEO (lastModified)
  const freshness = getContentFreshness('/');

  return (
    <>
      <UnifiedSEO
        title="Build. Optimize. Create. | Octomatic"
        description="We build the automated systems and create the engaging content that drives intelligent growth."
        pageType="home"
        modifiedTime={freshness.modifiedTime}
        publishedTime={freshness.publishedTime}
      />
      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </>
  );
}
