'use client';

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import LiveActivity from '@/components/realtime/LiveActivity';
import SmartCTA from '@/components/personalization/SmartCTA';
import { useThemeSafe } from '@/hooks/useThemeSafe';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

export default function CreatePage() {
  const { createPage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content - defined early so it can be used in hooks
  const content = {
    hero: {
      headline: isNL
        ? 'Content Die Boeit.'
        : createPage.hero.headline,
      subline: isNL
        ? 'We produceren verbluffende, AI-gedreven B-roll en visuals die je content de cinematische kwaliteit geven die het verdient.'
        : createPage.hero.subline,
      ctaText: isNL
        ? 'Bekijk Pakketten & Prijzen'
        : createPage.hero.ctaText
    },
    portfolio: {
      headline: isNL
        ? 'Vertrouwd door Creators Die Excellentie Eisen.'
        : createPage.portfolio.headline,
      projects: createPage.portfolio.projects.map(project => ({
        ...project,
        title: isNL
          ? project.title === 'AI B-Roll Reel - Tech Channel' ? 'AI B-Roll Reel - Tech Kanaal'
          : project.title === 'AI B-Roll Reel - Finance Channel' ? 'AI B-Roll Reel - Finance Kanaal'
          : project.title
          : project.title,
        description: isNL
          ? project.description === 'High-impact video content for social media' ? 'Hoogwaardige video content voor sociale media'
          : project.description === 'Cinematic visuals for financial content' ? 'Cinematische visuals voor financiële content'
          : project.description
          : project.description
      }))
    },
    process: {
      headline: isNL
        ? 'Jouw Visie, Geautomatiseerd.'
        : createPage.process.headline,
      steps: createPage.process.steps.map(step => ({
        step: step.step,
        title: isNL
          ? step.title === 'The Brief' ? 'De Briefing'
          : step.title === 'The Creation' ? 'De Creatie'
          : step.title === 'The Delivery' ? 'De Levering'
          : step.title
          : step.title,
        description: isNL
          ? step.description === 'You provide your script or concept.' ? 'Je levert je script of concept aan.'
          : step.description === 'Our AI-powered system generates a library of stunning, relevant visuals.' ? 'Ons AI-gedreven systeem genereert een bibliotheek van verbluffende, relevante visuals.'
          : step.description === 'You receive a folder of high-resolution footage, ready to edit.' ? 'Je ontvangt een map met hoogwaardige footage, klaar om te bewerken.'
          : step.description
          : step.description
      }))
    },
    testimonial: createPage.testimonial ? {
      headline: isNL
        ? 'Waarom de Snelst Groeiende Kanalen Octomatic Kiezen.'
        : createPage.testimonial.headline,
      quote: isNL
        ? 'De visuals van Octomatic hebben onze content getransformeerd. De kwaliteit is cinematisch, de levertijd is bliksemsnel en de betrokkenheid van ons publiek is nog nooit zo hoog geweest. Dit is het geheime wapen dat elke creator nodig heeft.'
        : createPage.testimonial.quote,
      author: createPage.testimonial.author,
      authorTitle: isNL
        ? 'YouTube Creator, 500K+ Abonnees'
        : createPage.testimonial.authorTitle
    } : null,
    pricing: {
      headline: isNL
        ? 'Pakketten Ontworpen voor Impact.'
        : createPage.pricing.headline,
      tiers: createPage.pricing.tiers.map(tier => ({
        ...tier,
        name: isNL
          ? tier.name === 'The Starter Pack' ? 'Het Starter Pakket'
          : tier.name === 'The Growth Bundle' ? 'Het Groei Pakket'
          : tier.name === 'The Viral Enterprise' ? 'Het Viral Enterprise Pakket'
          : tier.name
          : tier.name,
        description: isNL
          ? tier.description.includes('Perfect for a single') 
            ? 'Perfect voor één enkele, hoogwaardige video. Krijg verbluffende visuals die je content verhogen zonder de bank te breken.'
          : tier.description.includes('best value for creators')
            ? 'De beste waarde voor creators die regelmatig content produceren. Een constante stroom van premium visuals om je publiek betrokken te houden.'
          : tier.description.includes('For agencies and brands')
            ? 'Voor agencies en merken die onbeperkte creatieve assets nodig hebben. Onbeperkte visuals, toegewijde ondersteuning en aangepaste workflows.'
            : tier.description
          : tier.description,
        features: tier.features.map(feature => isNL
          ? feature === '10 AI-generated visuals' ? '10 AI-gegenereerde visuals'
          : feature === 'HD resolution (1080p)' ? 'HD resolutie (1080p)'
          : feature === 'All social media formats' ? 'Alle sociale media formaten'
          : feature === '1 revision round' ? '1 revisie ronde'
          : feature === '5-day delivery' ? '5-daagse levering'
          : feature === '30 AI-generated visuals' ? '30 AI-gegenereerde visuals'
          : feature === '4K resolution available' ? '4K resolutie beschikbaar'
          : feature === 'All formats + custom sizes' ? 'Alle formaten + aangepaste maten'
          : feature === '3 revision rounds' ? '3 revisie rondes'
          : feature === '3-day delivery' ? '3-daagse levering'
          : feature === 'Priority support' ? 'Prioriteit ondersteuning'
          : feature === 'Monthly refresh option' ? 'Maandelijkse refresh optie'
          : feature === 'Unlimited AI visuals' ? 'Onbeperkte AI visuals'
          : feature === '4K & custom resolutions' ? '4K & aangepaste resoluties'
          : feature === 'Dedicated account manager' ? 'Toegewijde account manager'
          : feature === 'Unlimited revisions' ? 'Onbeperkte revisies'
          : feature === '24-hour delivery' ? '24-uurs levering'
          : feature === 'Custom workflows' ? 'Aangepaste workflows'
          : feature === 'White-label options' ? 'White-label opties'
          : feature
          : feature),
        ctaText: isNL
          ? tier.ctaText === 'Order Now' ? 'Bestel Nu'
          : tier.ctaText === 'Contact Sales' ? 'Neem Contact Op'
          : tier.ctaText
          : tier.ctaText
      }))
    },
    cta: {
      headline: isNL
        ? 'Klaar om te Creëren?'
        : createPage.cta.headline,
      description: isNL
        ? 'Stop met genoegen nemen met stock footage. Krijg visuals die de scroll stoppen en je publiek boeien.'
        : createPage.cta.description,
      ctaText: isNL
        ? 'Bekijk Pakketten & Prijzen'
        : createPage.cta.ctaText
    },
    meta: {
      title: isNL
        ? 'Virale Content Creëren | Octomatic'
        : createPage.meta.title,
      description: isNL
        ? 'We produceren verbluffende, AI-gedreven B-roll en visuals die je content de cinematische kwaliteit geven die het verdient.'
        : createPage.meta.description
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
      e.currentTarget.style.textShadow = '0 4px 16px rgba(156, 163, 175, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.textShadow = '0 2px 12px rgba(107, 114, 128, 0.15), 0 1px 6px rgba(0, 0, 0, 0.1)';
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
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/create" : "https://www.octomatic.ai/create"}
      />
      <div className="min-h-screen relative font-archivo bg-background">
        {/* Section 1: Premium Hero - Grey Theme Gradient Background */}
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
          {/* Hero Background - Grey Theme Rich Multi-Color Premium Gradient */}
          <div 
            className="absolute inset-0 z-0 overflow-hidden dark:block hidden"
            style={{
              backgroundColor: 'rgb(8, 12, 28)',
              background: `
                radial-gradient(ellipse 40% 60% at 15% 35%, 
                  rgba(156, 163, 175, 0.9) 0%,
                  rgba(107, 114, 128, 0.7) 15%,
                  rgba(75, 85, 99, 0.3) 35%,
                  rgba(8, 12, 28, 0.9) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 35% 50% at 85% 25%, 
                  rgba(209, 213, 219, 0.8) 0%,
                  rgba(156, 163, 175, 0.6) 20%,
                  rgba(75, 85, 99, 0.2) 45%,
                  rgba(8, 12, 28, 0.95) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 30% 45% at 50% 95%, 
                  rgba(156, 163, 175, 0.7) 0%,
                  rgba(107, 114, 128, 0.4) 30%,
                  rgba(8, 12, 28, 0.8) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 40% at 30% 75%, 
                  rgba(229, 231, 235, 0.6) 0%,
                  rgba(156, 163, 175, 0.3) 40%,
                  rgba(8, 12, 28, 0.85) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 35% at 70% 55%, 
                  rgba(243, 244, 246, 0.7) 0%,
                  rgba(107, 114, 128, 0.4) 40%,
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
                page="create"
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

      {/* Portfolio - Premium Showcase */}
      <section 
        id="portfolio"
        aria-labelledby="portfolio-heading"
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
              id="portfolio-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {content.portfolio.headline}
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
                
                return content.portfolio.projects.map((project, index) => {
                  const cardImage = cardImages[index] || cardImages[0];
                  
                  return (
                <motion.div
                      key={`project-${index}`}
                      variants={cardVariants}
                      className="group relative p-4 md:p-6 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-gray-400/60
                               cursor-pointer"
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
                      
                      {/* Video Placeholder - Grey Theme */}
                      <div className="relative z-10 aspect-video bg-gradient-to-br from-gray-600/30 to-gray-500/20 dark:from-gray-600/50 dark:to-gray-500/30 rounded-lg mb-4 flex items-center justify-center group-hover:from-gray-500/40 group-hover:to-gray-400/30 dark:group-hover:from-gray-500/70 dark:group-hover:to-gray-400/50 transition-all">
                        <Play className="h-12 w-12 text-gray-400 dark:text-gray-300 opacity-60 dark:opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>

                      {/* Minimal Content - Tight Spacing */}
                      <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-light mb-2 
                                   text-heading dark:text-white
                                   tracking-tight">
                        {project.title}
                      </h3>
                      <p className="relative z-10 text-lg md:text-xl leading-relaxed 
                                  text-muted-foreground dark:text-white/70 font-light mb-4">
                        {project.description}
                      </p>
                    {project.metrics && (
                        <p className="relative z-10 text-gray-500 dark:text-gray-400 font-semibold text-sm">
                          {project.metrics}
                        </p>
                    )}
                    </motion.div>
                  );
                });
              }, [content.portfolio.projects, cardVariants])}
                </motion.div>
          </motion.div>
        </div>
      </section>

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
              id="process-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {content.process.headline}
            </motion.h2>

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
                const cardImages = [
                  '/images/pexels-janhabarta-29824324.webp',
                  '/images/pexels-liuuu-_61-2383408-34142857.webp',
                  '/images/pexels-negativespace-34125.webp',
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
                               hover:border-border/40 dark:hover:border-gray-400/60"
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
                      
                      {/* Minimal Step Number - Grey Theme */}
                      <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                        <div className="w-12 h-12 bg-gray-500/20 dark:bg-gray-500/30 rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">{step.step}</span>
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

      {/* Testimonial Section - Premium */}
      {content.testimonial && (
        <section 
          id="testimonial"
          aria-labelledby="testimonial-heading"
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
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
              variants={containerVariants}
              className="space-y-12 md:space-y-16"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Minimal Section Header */}
              <motion.h2
                id="testimonial-heading"
                variants={itemVariants}
                className="text-center text-xs uppercase tracking-[0.15em] font-light 
                         text-subtle dark:text-white/60"
              >
                {content.testimonial.headline}
              </motion.h2>
              
              {/* Testimonial Card */}
              <motion.div
                variants={cardVariants}
                className="group relative p-8 md:p-12 overflow-hidden
                         border-2 border-transparent dark:border-white/40
                         transition-all duration-500 ease-out
                         bg-transparent dark:bg-black
                         hover:border-border/40 dark:hover:border-gray-400/60
                         rounded-3xl"
              >
                {/* Background Image - Subtle */}
                <div 
                  className="absolute inset-0 opacity-0 dark:opacity-[0.03] group-hover:opacity-0 dark:group-hover:opacity-[0.05] transition-opacity duration-500"
                  style={{
                    backgroundImage: 'url(/images/pexels-caner-kokcu-636242728-34671003.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Grey Theme Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none rounded-3xl"
                  style={{
                    background: `
                      radial-gradient(ellipse 60% 40% at 50% 50%, 
                        rgba(156, 163, 175, 0.1) 0%,
                        rgba(107, 114, 128, 0.05) 50%,
                        transparent 100%
                      )
                    `,
                  }}
                />
                
                <div className="relative z-10">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-heading dark:text-white/90 italic mb-6 leading-relaxed font-light">
                  "{content.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-500/20 dark:bg-gray-500/30 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                      {content.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                      <p className="text-heading dark:text-white font-light">{content.testimonial.author}</p>
                    {content.testimonial.authorTitle && (
                        <p className="text-muted-foreground dark:text-white/70 text-sm font-light">{content.testimonial.authorTitle}</p>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

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
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
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
                               hover:border-border/40 dark:hover:border-gray-400/60
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
                          <div className="text-4xl md:text-5xl font-light text-gray-500 dark:text-gray-400 mb-2">
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
                              <CheckCircle className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5 opacity-60 dark:opacity-80" />
                              <span className="text-foreground dark:text-white/70 font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                      
                      {/* CTA Button */}
                    <Button
                      asChild
                        className="w-full mt-6 bg-gray-500 dark:bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-600 text-white relative z-10"
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

      {/* CTA - Premium with Grey Theme Gradient */}
      <section 
        id="cta"
        aria-labelledby="cta-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Grey Theme Gradient Background */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 50%, 
                rgba(156, 163, 175, 0.1) 0%,
                rgba(107, 114, 128, 0.05) 50%,
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
                audience="universal"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="pt-6 flex justify-center">
              <LiveActivity 
                page="create"
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

