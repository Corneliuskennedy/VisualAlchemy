'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, TrendingUp, Sparkles, Users, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GridBackground from '@/components/ui/GridBackground';
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
  const { mounted } = useThemeSafe();
  const {
    containerVariants,
    itemVariants,
    heroTitleVariants,
    cardVariants,
    fadeInUp,
  } = useOptimizedAnimations();
  
  // Get language-aware content from unified system
  const homepage = useHomepage();
  const common = useCommon();

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

      {/* Section 1: Clean Hero - Generously Spaced */}
      <section 
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex flex-col justify-center items-center px-4 py-32 md:py-48 lg:py-64 z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center space-y-16 md:space-y-20 lg:space-y-24 relative z-10"
        >
          {/* Clean Typography */}
          <motion.h1
            id="hero-heading"
            variants={heroTitleVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-archivo font-bold leading-[1.05] tracking-tight
                     text-heading dark:text-white"
            aria-label={homepage.hero.headline}
          >
            {homepage.hero.headline}
          </motion.h1>

          {/* Clean Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed
                     text-muted-foreground dark:text-gray-400
                     font-normal"
          >
            {homepage.hero.subline}
          </motion.p>

          {/* AI-Powered Smart CTA - Generous Spacing */}
          <motion.div 
            variants={itemVariants} 
            className="pt-8 md:pt-12"
          >
            <SmartCTA 
              section="hero"
              audience="universal"
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Live Activity Indicator - Well-Spaced */}
          <motion.div 
            variants={itemVariants} 
            className="pt-12 md:pt-16 flex justify-center"
          >
            <LiveActivity 
              page="homepage"
              showViewers={true}
              showRecentActivity={true}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Center-Mode Slider - Interactive Objective Selection */}
      <CenterModeSlider
        headline={homepage.segmentation.headline}
        cards={homepage.segmentation.cards.map((card) => ({
          title: card.title,
          description: card.description,
          ctaText: card.ctaText,
          href: card.href,
        }))}
      />

      {/* Section 3: Clean Social Proof */}
      <section 
        aria-labelledby="social-proof-heading"
        className="py-32 md:py-40 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.h2
              id="social-proof-heading"
              variants={itemVariants}
              className="text-center text-sm uppercase tracking-wider font-semibold 
                         text-subtle dark:text-gray-400"
            >
              {homepage.socialProof.headline}
            </motion.h2>

            {/* Clean Logo Grid */}
            <div className="max-w-7xl mx-auto border border-border/20 py-16 px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-items-center">
                {clientLogos.map((logo, index) => (
                  <motion.div
                    key={logo.name}
                    variants={itemVariants}
                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 hover:scale-110 drop-shadow-md hover:drop-shadow-lg dark:drop-shadow-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="h-12 md:h-16 w-auto max-w-[200px] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Clean Why Us - Asymmetrical Layout */}
      <section 
        aria-labelledby="why-us-heading"
        className="py-40 md:py-48 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-20 md:space-y-24"
          >
            {/* Asymmetrical Layout: Narrower text column (2/5), Wider visual column (3/5) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
              {/* Left Column - Narrower Text Block (2 columns) */}
              <motion.div 
                variants={itemVariants} 
                className="md:col-span-2 space-y-8 md:pt-8"
              >
                <motion.h2
                  id="why-us-heading"
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-archivo font-bold 
                           text-heading dark:text-white leading-[1.1] tracking-tight"
                >
                  {homepage.whyUs.headline}
                </motion.h2>
              </motion.div>

              {/* Right Column - Wider Description (3 columns) */}
              <motion.div 
                variants={itemVariants}
                className="md:col-span-3 space-y-6"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed 
                           text-body dark:text-gray-300 max-w-none"
                >
                  {homepage.whyUs.description}
                </motion.p>
              </motion.div>
            </div>

            {/* Clean Feature Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {homepage.whyUs.points.map((point, index) => {
                const Icon = Object.values(featureIcons)[index];
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="group relative p-10 lg:p-12 
                             border border-border/20
                             transition-all duration-300 ease-out
                             bg-card
                             hover:border-border/40
                             hover:-translate-y-1
                             transform-gpu"
                  >
                    {/* Clean Icon */}
                    {Icon && (
                      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-6">
                        <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#4585f4]" />
                      </div>
                    )}

                    {/* Clean Content */}
                    <h3 className="text-2xl md:text-3xl font-archivo font-bold mb-6 
                                 text-heading dark:text-white
                                 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed 
                                text-muted-foreground dark:text-gray-400">
                      {point.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Final CTA - Smart CTA for better conversion */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-8"
            >
              <SmartCTA 
                section="final-cta"
                audience="universal"
                className="max-w-xl mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Team Section - Build Trust Through Humanity */}
      <TeamSection />
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
