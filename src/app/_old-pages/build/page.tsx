'use client';

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import LiveActivity from '@/components/realtime/LiveActivity';
import SmartCTA from '@/components/personalization/SmartCTA';
import { useThemeSafe } from '@/hooks/useThemeSafe';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

export default function BuildPage() {
  const { buildPage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content - defined early so it can be used in hooks
  const content = {
    hero: {
      headline: isNL 
        ? 'Van Idee naar Impact, Intelligent.'
        : buildPage.hero.headline,
      subline: isNL
        ? 'We nemen het risico uit je reis van concept tot lancering met een bewezen, 30-daagse sprint die een volledig geautomatiseerd platform oplevert, klaar voor je eerste gebruikers.'
        : buildPage.hero.subline,
      ctaText: isNL
        ? 'Ontdek Hoe Het Werkt'
        : buildPage.hero.ctaText
    },
    problem: buildPage.problem ? {
      headline: isNL
        ? 'De Race Tegen de Klok.'
        : buildPage.problem.headline,
      description: isNL
        ? 'Elke oprichter staat voor hetzelfde dilemma: snel lanceren en het risico lopen iets te bouwen dat niemand wil, of de tijd nemen en zien hoe concurrenten je verslaan. De druk is reëel. Investeerders willen traction. Klanten willen oplossingen. Je hebt validatie nodig—snel. Maar het bouwen van het verkeerde ding kost meer dan tijd. Het kost kansen, momentum en soms je hele visie.'
        : buildPage.problem.description
    } : undefined,
    process: {
      headline: isNL
        ? 'Onze 30-Daagse MVP Sprint.'
        : buildPage.process.headline,
      steps: buildPage.process.steps.map(step => ({
        step: step.step,
        title: isNL
          ? step.title === 'Deep Dive & Strategy' ? 'Diepgaande Analyse & Strategie'
          : step.title === 'System Architecture & Design' ? 'Systeem Architectuur & Design'
          : step.title === 'Core Feature Implementation' ? 'Kern Feature Implementatie'
          : step.title === 'Launch & First User Onboarding' ? 'Lancering & Eerste Gebruikers Onboarding'
          : step.title
          : step.title,
        description: isNL
          ? step.description === 'We define your core value and map the path to revenue.' ? 'We definiëren je kernwaarde en bepalen de route naar inkomsten.'
          : step.description === 'We build the robust, scalable foundation.' ? 'We bouwen de robuuste, schaalbare basis.'
          : step.description === 'We bring your vision to life with intelligent automation.' ? 'We brengen je visie tot leven met intelligente automatisering.'
          : step.description === 'We get you to market and start the feedback loop.' ? 'We brengen je naar de markt en starten de feedback loop.'
          : step.description
          : step.description
      }))
    },
    caseStudies: {
      headline: isNL
        ? 'Van Nul tot Lancering.'
        : 'From Zero to Launch.',
      items: buildPage.caseStudies.map(study => ({
        ...study,
        title: isNL
          ? study.title === 'Case Study: How TechFlow launched their platform and secured pre-seed funding in 45 days' 
            ? 'Case Study: Hoe TechFlow hun platform lanceerde en pre-seed funding binnen 45 dagen veiligstelde'
            : study.title
          : study.title,
        description: isNL
          ? study.description === 'From concept to working product in 30 days, with 150+ beta users and a clear path to revenue.'
            ? 'Van concept tot werkend product in 30 dagen, met 150+ beta gebruikers en een duidelijke route naar inkomsten.'
            : study.description
          : study.description,
        metrics: isNL
          ? study.metrics === '150+ beta users • Pre-seed funding secured'
            ? '150+ beta gebruikers • Pre-seed funding veiliggesteld'
            : study.metrics
          : study.metrics
      }))
    },
    pricing: {
      headline: isNL
        ? 'Jouw Investering in Snelheid & Validatie.'
        : buildPage.pricing.headline,
      tiers: buildPage.pricing.tiers.map(tier => ({
        ...tier,
        name: isNL
          ? tier.name === '90-Minute Validation Session' ? '90-Minuten Validatie Sessie'
          : tier.name === 'The 30-Day MVP Sprint' ? 'De 30-Daagse MVP Sprint'
          : tier.name
          : tier.name,
        description: isNL
          ? tier.description.includes('perfect first step') 
            ? 'De perfecte eerste stap om een idee te de-risken. We analyseren je concept, identificeren potentiële valkuilen en bieden een duidelijke roadmap vooruit.'
          : tier.description.includes('complete package')
            ? 'Het complete pakket om van idee naar markt te gaan. Een volledig geautomatiseerd platform, klaar voor je eerste gebruikers, geleverd in 30 dagen.'
            : tier.description
          : tier.description,
        features: tier.features.map(feature => isNL
          ? feature === 'Idea validation framework' ? 'Idee validatie framework'
          : feature === 'Market opportunity analysis' ? 'Markt kansen analyse'
          : feature === 'Technical feasibility assessment' ? 'Technische haalbaarheidsbeoordeling'
          : feature === 'Risk identification & mitigation' ? 'Risico identificatie & mitigatie'
          : feature === 'Next steps roadmap' ? 'Volgende stappen roadmap'
          : feature === 'Complete system architecture' ? 'Complete systeem architectuur'
          : feature === 'Core feature development' ? 'Kern feature ontwikkeling'
          : feature === 'Automated workflows' ? 'Geautomatiseerde workflows'
          : feature === 'User onboarding system' ? 'Gebruikers onboarding systeem'
          : feature === 'Launch support & documentation' ? 'Lancering ondersteuning & documentatie'
          : feature === '30 days post-launch support' ? '30 dagen post-lancering ondersteuning'
          : feature
          : feature),
        ctaText: isNL
          ? tier.ctaText === 'Book Validation Session' ? 'Boek Validatie Sessie'
          : tier.ctaText === 'Book a Project Scoping Call' ? 'Boek een Project Scoping Gesprek'
          : tier.ctaText
          : tier.ctaText
      }))
    },
    cta: {
      headline: isNL
        ? 'Klaar om te Bouwen?'
        : buildPage.cta.headline,
      description: isNL
        ? 'Laten we je visie omzetten in een marktklaar realiteit. Boek een gesprek om je project te bespreken.'
        : buildPage.cta.description,
      ctaText: isNL
        ? 'Boek een Project Scoping Gesprek'
        : buildPage.cta.ctaText
    },
    meta: {
      title: isNL
        ? 'Een Nieuw Systeem Bouwen | Octomatic'
        : buildPage.meta.title,
      description: isNL
        ? 'We nemen het risico uit je reis van concept tot lancering met een bewezen, 30-daagse sprint die een volledig geautomatiseerd platform oplevert.'
        : buildPage.meta.description
    }
  };
  
  const { mounted, isDark } = useThemeSafe();
  const {
    containerVariants,
    itemVariants,
    heroTitleVariants,
    cardVariants,
    fadeInUp,
  } = useOptimizedAnimations();
  
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
    }, prefersReducedMotion ? 0 : 400);
    
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, mounted]);
  
  // Parallax scroll tracking - optimized for smooth 60fps performance
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Consolidated scroll tracking - single scroll listener for better performance
  const { scrollYProgress } = useScroll();
  
  // Memoize hero text mouse handlers to prevent recreation
  const handleHeroTextMouseEnter = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (isDark) {
      e.currentTarget.style.textShadow = '0 4px 16px rgba(239, 68, 68, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.textShadow = '0 2px 12px rgba(239, 68, 68, 0.15), 0 1px 6px rgba(0, 0, 0, 0.1)';
    }
  }, [isDark]);
  
  const handleHeroTextMouseLeave = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
  }, []);
  
  // Memoize hero headline words to prevent recreation on every render
  const heroHeadlineWords = useMemo(() => {
    const headline = content.hero.headline;
    return headline.split('. ').map((word, index, array) => {
      const isLast = index === array.length - 1;
      const cleanWord = isLast && word.endsWith('.') ? word.slice(0, -1) : word;
      return { word: cleanWord, isLast, index };
    });
  }, [content.hero.headline]);
  
  // Optimized hero parallax - memoize transform ranges
  const parallaxRanges = useMemo(() => ({
    reduced: { hero: [0, 0], content: [0, 0] },
    normal: { 
      hero: [0, -24], 
      content: [0, -50],
      layer2: [0, -30]
    }
  }), []);

  // Hero parallax transforms
  const heroScrollProgress = scrollYProgress;
  const heroParallaxBase = useTransform(
    heroScrollProgress, 
    [0, 1], 
    prefersReducedMotion ? parallaxRanges.reduced.hero : parallaxRanges.normal.hero
  );
  
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
  
  // Hero background effects
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.99]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.7, 1], [1, 1, 0.4, 0]);

  return (
    <>
      <UnifiedSEO 
        title={content.meta.title}
        description={content.meta.description}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/build" : "https://www.octomatic.ai/build"}
      />
      <div className="min-h-screen relative font-archivo bg-background">
        {/* Section 1: Premium Hero - Red Theme Gradient Background */}
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
          {/* Hero Background - Red Theme Rich Multi-Color Premium Gradient */}
          <div 
            className="absolute inset-0 z-0 overflow-hidden dark:block hidden"
            style={{
              backgroundColor: 'rgb(8, 12, 28)',
              background: `
                radial-gradient(ellipse 40% 60% at 15% 35%, 
                  rgba(239, 68, 68, 0.9) 0%,
                  rgba(220, 38, 38, 0.7) 15%,
                  rgba(185, 28, 28, 0.3) 35%,
                  rgba(8, 12, 28, 0.9) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 35% 50% at 85% 25%, 
                  rgba(248, 113, 113, 0.8) 0%,
                  rgba(239, 68, 68, 0.6) 20%,
                  rgba(153, 27, 27, 0.2) 45%,
                  rgba(8, 12, 28, 0.95) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 30% 45% at 50% 95%, 
                  rgba(239, 68, 68, 0.7) 0%,
                  rgba(185, 28, 28, 0.4) 30%,
                  rgba(8, 12, 28, 0.8) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 40% at 30% 75%, 
                  rgba(255, 180, 180, 0.6) 0%,
                  rgba(239, 68, 68, 0.3) 40%,
                  rgba(8, 12, 28, 0.85) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 35% at 70% 55%, 
                  rgba(252, 165, 165, 0.7) 0%,
                  rgba(220, 38, 38, 0.4) 40%,
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
              } as React.CSSProperties}
              aria-label={content.hero.headline}
            >
              {heroHeadlineWords.map(({ word, isLast, index }) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ 
                    opacity: 0, 
                    y: prefersReducedMotion ? 0 : -18,
                    x: prefersReducedMotion ? 0 : -12,
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
                    duration: prefersReducedMotion ? 0 : 1.1,
                    delay: prefersReducedMotion ? 0 : (isHeroReady ? index * 0.3 : 0),
                    ease: [0.19, 1, 0.22, 1],
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
              {content.hero.subline}
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
                audience="startup"
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
                page="build"
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

      {/* Problem Section - Premium Asymmetrical Layout */}
      {buildPage.problem && (
        <section 
          id="problem"
          aria-labelledby="problem-heading"
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
                    id="problem-heading"
                    variants={fadeInUp}
                    className="text-5xl md:text-6xl lg:text-7xl font-archivo font-light 
                             text-heading dark:text-white leading-[0.95] tracking-[-0.02em]"
              >
                {content.problem?.headline}
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
                {content.problem?.description}
              </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Process - Premium Feature Cards */}
      <section 
        id="process"
        aria-labelledby="process-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Subtle background image */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pexels-janhabarta-29824324.webp)',
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
            {/* Minimal Section Header */}
            <motion.h2
              id="process-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {content.process.headline}
            </motion.h2>

            {/* Minimal Feature Cards - Expensive Simplicity */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
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
                const cardImages = [
                  '/images/pexels-janhabarta-29824324.webp',
                  '/images/pexels-liuuu-_61-2383408-34142857.webp',
                  '/images/pexels-negativespace-34125.webp',
                  '/images/pexels-caner-kokcu-636242728-34671003.webp',
                ];
                
                return content.process.steps.map((step, index) => {
                  const cardImage = cardImages[index] || cardImages[0];
                  
                  return (
                <motion.div
                      key={`step-${index}`}
                      variants={cardVariants}
                      className="group relative p-4 md:p-6 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-red-500/60"
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
                      
                      {/* Minimal Step Number - Red Theme */}
                      <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                        <div className="w-12 h-12 bg-red-500/20 dark:bg-red-500/30 rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-500 dark:text-red-400">{step.step}</span>
                        </div>
                      </div>

                      {/* Minimal Content - Tight Spacing */}
                      <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-light mb-2 
                                   text-heading dark:text-white
                                   tracking-tight">
                        {step.title}
                      </h3>
                      <p className="relative z-10 text-lg md:text-xl leading-relaxed 
                                  text-muted-foreground dark:text-white/70 font-light">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                });
              }, [content.process.steps, cardVariants])}
                </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies - Premium Showcase */}
      <section 
        id="case-studies"
        aria-labelledby="case-studies-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Subtle background image */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pexels-liuuu-_61-2383408-34142857.webp)',
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
            {/* Minimal Section Header */}
            <motion.h2
              id="case-studies-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {content.caseStudies.headline}
            </motion.h2>

            {/* Minimal Feature Cards - Expensive Simplicity */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                const cardImages = [
                  '/images/pexels-janhabarta-29824324.webp',
                  '/images/pexels-liuuu-_61-2383408-34142857.webp',
                  '/images/pexels-negativespace-34125.webp',
                ];
                
                return content.caseStudies.items.map((study, index) => {
                  const cardImage = cardImages[index] || cardImages[0];
                  
                  return (
                <motion.div
                      key={`study-${index}`}
                      variants={cardVariants}
                      className="group relative p-4 md:p-6 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-red-500/60"
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
                      
                      {/* Minimal Icon - Red Theme */}
                      <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                        <Rocket className="h-5 w-5 text-red-500 dark:text-red-400 opacity-60 dark:opacity-80" />
                      </div>

                      {/* Minimal Content - Tight Spacing */}
                      <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-light mb-2 
                                   text-heading dark:text-white
                                   tracking-tight">
                        {study.title}
                      </h3>
                      <p className="relative z-10 text-lg md:text-xl leading-relaxed 
                                  text-muted-foreground dark:text-white/70 font-light mb-4">
                        {study.description}
                      </p>
                      {study.metrics && (
                        <p className="relative z-10 text-red-500 dark:text-red-400 font-semibold text-sm">
                          {study.metrics}
                        </p>
                      )}
                    </motion.div>
                  );
                });
              }, [content.caseStudies.items, cardVariants])}
                </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing - Premium Cards */}
      <section 
        id="pricing"
        aria-labelledby="pricing-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Subtle background image */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pexels-negativespace-34125.webp)',
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
            {/* Minimal Section Header */}
            <motion.h2
              id="pricing-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {content.pricing.headline}
            </motion.h2>

            {/* Minimal Pricing Cards - Expensive Simplicity */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                const cardImages = [
                  '/images/pexels-janhabarta-29824324.webp',
                  '/images/pexels-liuuu-_61-2383408-34142857.webp',
                  '/images/pexels-negativespace-34125.webp',
                ];
                
                return content.pricing.tiers.map((tier, index) => {
                  const cardImage = cardImages[index] || cardImages[0];
                  
                  return (
                <motion.div
                      key={`tier-${index}`}
                      variants={cardVariants}
                      className="group relative p-6 md:p-8 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-red-500/60
                               flex flex-col h-full"
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
                      
                      {/* Content */}
                      <div className="relative z-10 space-y-6 flex-1">
                      <div>
                          <h3 className="text-2xl md:text-3xl font-archivo font-light mb-2 
                                       text-heading dark:text-white tracking-tight">
                            {tier.name}
                          </h3>
                          <div className="text-4xl md:text-5xl font-light text-red-500 dark:text-red-400 mb-2">
                            {tier.price}
                          </div>
                          <p className="text-lg md:text-xl leading-relaxed 
                                      text-muted-foreground dark:text-white/70 font-light">
                            {tier.description}
                          </p>
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5 opacity-60 dark:opacity-80" />
                              <span className="text-foreground dark:text-white/70 font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                      
                      {/* CTA Button */}
                    <Button
                      asChild
                        className="w-full mt-6 bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 text-white relative z-10"
                    >
                      <Link href={tier.ctaLink}>
                        {tier.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    </motion.div>
                  );
                });
              }, [content.pricing.tiers, cardVariants])}
                </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA - Premium with Red Theme Gradient */}
      <section 
        id="cta"
        aria-labelledby="cta-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Red Theme Gradient Background */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 50%, 
                rgba(239, 68, 68, 0.1) 0%,
                rgba(220, 38, 38, 0.05) 50%,
                transparent 100%
              )
            `,
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={containerVariants}
            className="space-y-8 md:space-y-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.h2
              id="cta-heading"
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-archivo font-light 
                       text-heading dark:text-white leading-[0.95] tracking-[-0.02em]"
            >
              {content.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed 
                       text-body dark:text-white/90 max-w-2xl mx-auto font-light"
            >
              {content.cta.description}
            </motion.p>
            <motion.div variants={itemVariants} className="pt-4">
              <SmartCTA 
                section="cta"
                audience="startup"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="pt-6 flex justify-center">
              <LiveActivity 
                page="build"
                showViewers={true}
                showRecentActivity={true}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
        </div>
      </div>
    </>
  );
}

