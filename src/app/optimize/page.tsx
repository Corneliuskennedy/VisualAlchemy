'use client';

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, TrendingUp, Calculator, Zap, Users, Database, Target, FileText, BarChart3, Brain, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import LiveActivity from '@/components/realtime/LiveActivity';
import SmartCTA from '@/components/personalization/SmartCTA';
import { useThemeSafe } from '@/hooks/useThemeSafe';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

export default function OptimizePage() {
  const { optimizePage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content - defined early so it can be used in hooks
  const content = {
    hero: {
      headline: isNL
        ? 'Stop Met Winst Lekken.'
        : optimizePage.hero.headline,
      subline: isNL
        ? 'We identificeren de verborgen inefficiënties in je bedrijf en implementeren intelligente automatiseringssystemen die duizenden terugbrengen naar je winst.'
        : optimizePage.hero.subline,
      ctaText: isNL
        ? 'Boek een Gratis Proces Audit'
        : optimizePage.hero.ctaText
    },
    problem: {
      headline: isNL
        ? 'Je Bedrijf Lekkt €67.560 Per Jaar. We Bewijzen Het.'
        : optimizePage.problem.headline,
      description: isNL
        ? 'Handmatige taken, repetitief werk en losgekoppelde systemen werken als een verborgen belasting op je bedrijf. Elk uur dat wordt besteed aan data entry, elke e-mail die verloren gaat, elk proces dat menselijke interventie vereist—het telt allemaal op. Terwijl je druk bezig bent met het runnen van het bedrijf, glipt geld stilletjes weg. Het goede nieuws? Deze lekken zijn te repareren. Gebruik onze gratis calculator om de potentiële besparingen van je bedrijf te schatten.'
        : optimizePage.problem.description,
      calculatorCta: isNL
        ? 'Gebruik onze gratis calculator om de potentiële besparingen van je bedrijf te schatten.'
        : optimizePage.problem.calculatorCta,
      calculatorButton: isNL
        ? 'Open ROI Calculator'
        : 'Open ROI Calculator'
    },
    solutions: {
      headline: isNL
        ? 'Onze Automatisering Toolkit.'
        : optimizePage.solutions.headline,
      items: optimizePage.solutions.items.map(item => ({
        title: isNL
          ? item.title === 'CRM Buildouts' ? 'CRM Opzetten'
          : item.title === 'Hiring & HR Systems' ? 'Werving & HR Systemen'
          : item.title === 'Project Management Systems' ? 'Project Management Systemen'
          : item.title === 'AI Service Fulfillment' ? 'AI Service Levering'
          : item.title
          : item.title,
        description: isNL
          ? item.description === 'A central system for all customer data.' ? 'Een centraal systeem voor alle klantgegevens.'
          : item.description === 'Automating the talent pipeline.' ? 'Automatisering van de talent pipeline.'
          : item.description === 'A single source of truth for all projects.' ? 'Een enkele bron van waarheid voor alle projecten.'
          : item.description === 'Delivering your services 3x faster.' ? 'Je services 3x sneller leveren.'
          : item.description
          : item.description
      }))
    },
    caseStudies: {
      headline: isNL
        ? 'Het Bewijs Zit in de Winst.'
        : 'The Proof is in the Profit.',
      items: optimizePage.caseStudies.map(study => ({
        ...study,
        title: isNL
          ? study.title === 'Case Study: How GreenTech Solutions reduced manual data entry by 80% and saved €45,000 in the first year'
            ? 'Case Study: Hoe GreenTech Solutions handmatige data entry met 80% verminderde en €45.000 bespaarde in het eerste jaar'
            : study.title
          : study.title,
        description: isNL
          ? study.description === 'By automating their CRM and project management workflows, they eliminated 25 hours of manual work per week and improved customer response times by 60%.'
            ? 'Door hun CRM en project management workflows te automatiseren, elimineerden ze 25 uur handmatig werk per week en verbeterden ze de klantreactietijden met 60%.'
            : study.description
          : study.description,
        metrics: isNL
          ? study.metrics === '80% reduction • €45,000 saved/year'
            ? '80% reductie • €45.000 bespaard/jaar'
            : study.metrics
          : study.metrics
      }))
    },
    pricing: {
      headline: isNL
        ? 'Jouw Investering in een Schaalbare Toekomst.'
        : optimizePage.pricing.headline,
      tiers: optimizePage.pricing.tiers.map(tier => ({
        ...tier,
        name: isNL
          ? tier.name === 'Value Stream Mapping Workshop' ? 'Value Stream Mapping Workshop'
          : tier.name === 'Custom Implementation Project' ? 'Aangepast Implementatie Project'
          : tier.name
          : tier.name,
        description: isNL
          ? tier.description.includes('essential first step')
            ? 'De essentiële eerste stap om je grootste winstlekken te identificeren. We mappen je hele operatie, identificeren inefficiënties en bieden een geprioriteerde automatiseringsroadmap.'
          : tier.description.includes('hands-on solution')
            ? 'De praktische oplossing om de automatiseringen te bouwen en te implementeren. We implementeren de systemen, trainen je team en zorgen ervoor dat alles naadloos werkt.'
            : tier.description
          : tier.description,
        features: tier.features.map(feature => isNL
          ? feature === 'Complete process audit' ? 'Complete procesaudit'
          : feature === 'Value stream mapping' ? 'Value stream mapping'
          : feature === 'Profit leak identification' ? 'Winstlek identificatie'
          : feature === 'Prioritized automation roadmap' ? 'Geprioriteerde automatiseringsroadmap'
          : feature === 'ROI projections' ? 'ROI projecties'
          : feature === 'Implementation strategy' ? 'Implementatiestrategie'
          : feature === 'Everything from Workshop' ? 'Alles van Workshop'
          : feature === 'Custom automation development' ? 'Aangepaste automatisering ontwikkeling'
          : feature === 'System integration' ? 'Systeem integratie'
          : feature === 'Team training & documentation' ? 'Team training & documentatie'
          : feature === '30 days post-launch support' ? '30 dagen post-lancering ondersteuning'
          : feature === 'ROI tracking & optimization' ? 'ROI tracking & optimalisatie'
          : feature
          : feature),
        ctaText: isNL
          ? tier.ctaText === 'Book Workshop' ? 'Boek Workshop'
          : tier.ctaText === 'Book a Free Process Audit' ? 'Boek een Gratis Proces Audit'
          : tier.ctaText
          : tier.ctaText
      }))
    },
    cta: {
      headline: isNL
        ? 'Klaar om te Optimaliseren?'
        : optimizePage.cta.headline,
      description: isNL
        ? 'Stop met geld verliezen aan inefficiëntie. Boek een gratis audit en ontdek hoeveel je bedrijf zou kunnen besparen.'
        : optimizePage.cta.description,
      ctaText: isNL
        ? 'Boek een Gratis Proces Audit'
        : optimizePage.cta.ctaText
    },
    meta: {
      title: isNL
        ? 'Een Bestaand Bedrijf Optimaliseren | Octomatic'
        : optimizePage.meta.title,
      description: isNL
        ? 'We identificeren de verborgen inefficiënties in je bedrijf en implementeren intelligente automatiseringssystemen die duizenden terugbrengen naar je winst.'
        : optimizePage.meta.description
    }
  };

  // Consolidated service areas from all service pages
  const serviceAreas = [
    {
      icon: Zap,
      title: isNL ? 'AI Service Fulfillment' : 'AI Service Fulfillment',
      description: isNL 
        ? 'Automatiseer uw hele service delivery proces. Van client onboarding tot project afronding, 60% sneller en 90% minder fouten.'
        : 'Automate your entire service delivery process. From client onboarding to project completion, 60% faster and 90% fewer errors.',
      metrics: isNL ? '60% sneller • 90% minder fouten • 3x meer capaciteit' : '60% faster • 90% fewer errors • 3x more capacity',
      features: [
        isNL ? 'Geautomatiseerde client onboarding' : 'Automated client onboarding',
        isNL ? 'Project delivery automatisering' : 'Project delivery automation',
        isNL ? 'AI-gedreven kwaliteitscontrole' : 'AI-driven quality control',
        isNL ? 'Intelligente communicatie' : 'Intelligent communication'
      ]
    },
    {
      icon: Database,
      title: isNL ? 'CRM Buildouts' : 'CRM Buildouts',
      description: isNL
        ? 'Een geïntegreerd systeem waar elke klantinteractie wordt vastgelegd, waardoor u nooit meer leads verliest en uw conversie met 40% stijgt.'
        : 'An integrated system where every customer interaction is captured, so you never lose leads again and your conversion increases by 40%.',
      metrics: isNL ? '40% hogere conversie • 0 verloren leads • Gecentraliseerde data' : '40% higher conversion • 0 lost leads • Centralized data',
      features: [
        isNL ? 'Lead scoring & kwalificatie' : 'Lead scoring & qualification',
        isNL ? 'Pipeline management' : 'Pipeline management',
        isNL ? 'Email integratie' : 'Email integration',
        isNL ? 'Rapportage & analytics' : 'Reporting & analytics'
      ]
    },
    {
      icon: Target,
      title: isNL ? 'Lead Generatie' : 'Lead Generation',
      description: isNL
        ? 'Een voorspelbare pijplijn van gekwalificeerde leads, zodat uw sales team kan focussen op het sluiten van deals, niet op het najagen ervan.'
        : 'A predictable pipeline of qualified leads, so your sales team can focus on closing deals, not chasing them.',
      metrics: isNL ? '3x meer leads • 60% lagere kosten • Voorspelbare pijplijn' : '3x more leads • 60% lower costs • Predictable pipeline',
      features: [
        isNL ? 'Automatische kwalificatie' : 'Automatic qualification',
        isNL ? 'Gepersonaliseerde nurturing' : 'Personalized nurturing',
        isNL ? 'Lead scoring & segmentatie' : 'Lead scoring & segmentation',
        isNL ? 'Sales handoff automatisering' : 'Sales handoff automation'
      ]
    },
    {
      icon: Users,
      title: isNL ? 'Hiring Systemen' : 'Hiring Systems',
      description: isNL
        ? 'U spreekt alleen met de top 5% van de kandidaten, waardoor u sneller betere mensen aanneemt en duizenden euro\'s aan wervingskosten bespaart.'
        : 'You only speak with the top 5% of candidates, allowing you to hire better people faster and save thousands in recruitment costs.',
      metrics: isNL ? 'Top 5% kandidaten • 3x sneller • Duizenden bespaard' : 'Top 5% candidates • 3x faster • Thousands saved',
      features: [
        isNL ? 'AI-powered screening' : 'AI-powered screening',
        isNL ? 'Geautomatiseerde interviews' : 'Automated interviews',
        isNL ? 'Smart ranking' : 'Smart ranking',
        isNL ? 'Team collaboration' : 'Team collaboration'
      ]
    },
    {
      icon: BarChart3,
      title: isNL ? 'Project Management' : 'Project Management',
      description: isNL
        ? 'Projecten die op tijd, binnen budget en met volledige transparantie worden afgerond, waardoor chaos en onzekerheid worden geëlimineerd.'
        : 'Projects that finish on time, within budget, and with complete transparency, eliminating chaos and uncertainty.',
      metrics: isNL ? '95% op tijd • 100% transparantie • Binnen budget' : '95% on time • 100% transparency • Within budget',
      features: [
        isNL ? 'Automatische status updates' : 'Automatic status updates',
        isNL ? 'Mijlpaal tracking' : 'Milestone tracking',
        isNL ? 'Resource planning' : 'Resource planning',
        isNL ? 'Rapportage & analytics' : 'Reporting & analytics'
      ]
    },
    {
      icon: FileText,
      title: isNL ? 'SOPs & Playbooks' : 'SOPs & Playbooks',
      description: isNL
        ? 'Elke medewerker weet precies wat te doen en wanneer, waardoor fouten met 80% afnemen en nieuwe teamleden 3x sneller productief worden.'
        : 'Every employee knows exactly what to do and when, reducing errors by 80% and making new team members 3x faster to productivity.',
      metrics: isNL ? '80% minder fouten • 3x sneller productief • Consistente uitvoering' : '80% fewer errors • 3x faster productive • Consistent execution',
      features: [
        isNL ? 'Aangepaste procedures' : 'Custom procedures',
        isNL ? 'Proces documentatie' : 'Process documentation',
        isNL ? 'Training materialen' : 'Training materials',
        isNL ? 'Kwaliteitscontrole workflows' : 'Quality control workflows'
      ]
    },
    {
      icon: MapPin,
      title: isNL ? 'AI Automatisering Amsterdam' : 'AI Automation Amsterdam',
      description: isNL
        ? 'Lokaal gevestigd in Naarden met diepgaande kennis van de Nederlandse markt en GDPR wetgeving. Bespaar €50.000+ per jaar met bewezen automatiseringsoplossingen.'
        : 'Locally based in Naarden with deep knowledge of the Dutch market and GDPR legislation. Save €50,000+ per year with proven automation solutions.',
      metrics: isNL ? '€50k+ besparing • GDPR compliant • Lokale expertise' : '€50k+ savings • GDPR compliant • Local expertise',
      features: [
        isNL ? 'Nederlandse marktkennis' : 'Dutch market knowledge',
        isNL ? 'GDPR compliance' : 'GDPR compliance',
        isNL ? 'Lokale ondersteuning' : 'Local support',
        isNL ? 'Nederlandse werktijden' : 'Dutch business hours'
      ]
    }
  ];
  
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
      e.currentTarget.style.textShadow = '0 4px 16px rgba(34, 197, 94, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.textShadow = '0 2px 12px rgba(34, 197, 94, 0.15), 0 1px 6px rgba(0, 0, 0, 0.1)';
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
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/optimize" : "https://www.octomatic.ai/optimize"}
      />
      <div className="min-h-screen relative font-archivo bg-background">
        {/* Section 1: Premium Hero - Green Theme Gradient Background */}
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
          {/* Hero Background - Green Theme Rich Multi-Color Premium Gradient */}
          <div 
            className="absolute inset-0 z-0 overflow-hidden dark:block hidden"
            style={{
              backgroundColor: 'rgb(8, 12, 28)',
              background: `
                radial-gradient(ellipse 40% 60% at 15% 35%, 
                  rgba(34, 197, 94, 0.9) 0%,
                  rgba(22, 163, 74, 0.7) 15%,
                  rgba(20, 83, 45, 0.3) 35%,
                  rgba(8, 12, 28, 0.9) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 35% 50% at 85% 25%, 
                  rgba(74, 222, 128, 0.8) 0%,
                  rgba(34, 197, 94, 0.6) 20%,
                  rgba(20, 83, 45, 0.2) 45%,
                  rgba(8, 12, 28, 0.95) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 30% 45% at 50% 95%, 
                  rgba(34, 197, 94, 0.7) 0%,
                  rgba(22, 163, 74, 0.4) 30%,
                  rgba(8, 12, 28, 0.8) 60%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 40% at 30% 75%, 
                  rgba(134, 239, 172, 0.6) 0%,
                  rgba(34, 197, 94, 0.3) 40%,
                  rgba(8, 12, 28, 0.85) 70%,
                  rgba(8, 12, 28, 1) 100%
                ),
                radial-gradient(ellipse 25% 35% at 70% 55%, 
                  rgba(187, 247, 208, 0.7) 0%,
                  rgba(22, 163, 74, 0.4) 40%,
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
                audience="sme"
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
                page="optimize"
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
      {content.problem && (
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
                {content.problem.headline}
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
                {content.problem.description}
              </motion.p>
                </motion.div>
              </div>
              
              {/* Calculator CTA */}
              {content.problem.calculatorCta && (
                <motion.div variants={itemVariants} className="text-center pt-8">
                  <div className="group relative p-6 md:p-8 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-green-500/60
                               max-w-2xl mx-auto">
                    <div className="absolute inset-0 opacity-0 dark:opacity-[0.03] group-hover:opacity-0 dark:group-hover:opacity-[0.05] transition-opacity"
                      style={{
                        backgroundImage: 'url(/images/pexels-negativespace-34125.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="relative z-10">
                      <Calculator className="h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-4 opacity-60 dark:opacity-80" />
                      <p className="text-foreground dark:text-white/70 mb-6 font-light text-lg">
                      {content.problem.calculatorCta}
                    </p>
                    <Button
                      asChild
                        className="bg-green-500 dark:bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 text-white"
                    >
                      <Link href="/tools/automation-roi-calculator">
                        {content.problem.calculatorButton}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Solutions Section - Premium Feature Cards */}
      {content.solutions && (
        <section 
          id="solutions"
          aria-labelledby="solutions-heading"
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
                id="solutions-heading"
                variants={itemVariants}
                className="text-center text-xs uppercase tracking-[0.15em] font-light 
                         text-subtle dark:text-white/60"
              >
                {content.solutions.headline}
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
                  
                  return content.solutions.items.map((item, index) => {
                    const cardImage = cardImages[index] || cardImages[0];
                    
                    return (
                      <motion.div
                        key={`solution-${index}`}
                        variants={cardVariants}
                        className="group relative p-4 md:p-6 overflow-hidden
                                 border-2 border-transparent dark:border-white/40
                                 transition-all duration-500 ease-out
                                 bg-transparent dark:bg-black
                                 hover:border-border/40 dark:hover:border-green-500/60"
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
                        
                        {/* Minimal Icon - Green Theme */}
                        <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                          <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400 opacity-60 dark:opacity-80" />
              </div>

                        {/* Minimal Content - Tight Spacing */}
                        <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-light mb-2 
                                     text-heading dark:text-white
                                     tracking-tight">
                          {item.title}
                        </h3>
                        <p className="relative z-10 text-lg md:text-xl leading-relaxed 
                                    text-muted-foreground dark:text-white/70 font-light">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  });
                }, [content.solutions.items, cardVariants])}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Service Areas - Premium Feature Cards */}
      <section 
        id="service-areas"
        aria-labelledby="service-areas-heading"
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
              id="service-areas-heading"
              variants={itemVariants}
              className="text-center text-xs uppercase tracking-[0.15em] font-light 
                       text-subtle dark:text-white/60"
            >
              {isNL ? 'Onze Optimalisatie Diensten' : 'Our Optimization Services'}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-body dark:text-white/90 text-center max-w-3xl mx-auto font-light"
            >
              {isNL
                ? 'Van CRM tot recruitment, van project management tot SOPs - we helpen u elk aspect van uw bedrijf te optimaliseren.'
                : 'From CRM to recruitment, from project management to SOPs - we help you optimize every aspect of your business.'
              }
            </motion.p>

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
                  '/images/pexels-caner-kokcu-636242728-34671003.webp',
                  '/images/pexels-dagmara-dombrovska-22732579-26698447.webp',
                  '/images/pexels-dawid-tkocz-2157133464-34721374.webp',
                  '/images/pexels-ekamelev-7798651.webp',
                ];
                
                return serviceAreas.map((service, index) => {
                const Icon = service.icon;
                  const cardImage = cardImages[index] || cardImages[0];
                  
                return (
                  <motion.div
                      key={`service-${index}`}
                      variants={cardVariants}
                      className="group relative p-4 md:p-6 overflow-hidden
                               border-2 border-transparent dark:border-white/40
                               transition-all duration-500 ease-out
                               bg-transparent dark:bg-black
                               hover:border-border/40 dark:hover:border-green-500/60"
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
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-green-500/20 dark:bg-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-green-500 dark:text-green-400 opacity-60 dark:opacity-80" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-archivo font-light text-heading dark:text-white mb-2 tracking-tight">
                              {service.title}
                            </h3>
                            <p className="text-foreground dark:text-white/70 text-sm md:text-base leading-relaxed mb-3 font-light">
                              {service.description}
                            </p>
                            <p className="text-green-500 dark:text-green-400 font-semibold text-sm mb-4">
                              {service.metrics}
                            </p>
                            <ul className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5 opacity-60 dark:opacity-80" />
                                  <span className="text-muted-foreground dark:text-white/70 text-sm font-light">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                  </motion.div>
                );
                });
              }, [serviceAreas, cardVariants])}
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
                               hover:border-border/40 dark:hover:border-green-500/60"
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
                      
                      {/* Minimal Icon - Green Theme */}
                      <div className="relative z-10 w-8 h-8 flex items-center justify-start mb-4">
                        <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400 opacity-60 dark:opacity-80" />
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
                        <p className="relative z-10 text-green-500 dark:text-green-400 font-semibold text-sm">
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
                               hover:border-border/40 dark:hover:border-green-500/60
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
                          <div className="text-4xl md:text-5xl font-light text-green-500 dark:text-green-400 mb-2">
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
                              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5 opacity-60 dark:opacity-80" />
                              <span className="text-foreground dark:text-white/70 font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                      
                      {/* CTA Button */}
                    <Button
                      asChild
                        className="w-full mt-6 bg-green-500 dark:bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 text-white relative z-10"
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

      {/* CTA - Premium with Green Theme Gradient */}
      <section 
        id="cta"
        aria-labelledby="cta-heading"
        className="py-16 md:py-20 px-6 md:px-8 relative snap-start bg-background overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Green Theme Gradient Background */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 50%, 
                rgba(34, 197, 94, 0.1) 0%,
                rgba(22, 163, 74, 0.05) 50%,
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
                audience="sme"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="pt-6 flex justify-center">
              <LiveActivity 
                page="optimize"
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

