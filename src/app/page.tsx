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
import HeroVisualElements from '@/components/ui/HeroVisualElements';
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

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <GridBackground className="pointer-events-none" highContrast={false} />
      </div>

      {/* Section 1: Premium Hero with Sophisticated Visual Interest - Image Ready */}
      <section 
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-16 z-10 overflow-hidden"
      >
        {/* Floating visual storytelling elements */}
        <HeroVisualElements />
        
        {/* Hero Image - Ready for professional photo */}
        {/* Uncomment and add image path when photo is ready:
        <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none" aria-hidden="true">
          <Image
            src="/images/hero-team-workspace.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        */}
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center space-y-8 md:space-y-10 relative z-10"
        >
          {/* Premium Typography with Refined Scale - Enhanced Contrast & Emotional Impact */}
          <motion.h1
            id="hero-heading"
            variants={heroTitleVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] tracking-[-0.02em]
                     text-heading dark:text-white
                     dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-gray-300 dark:bg-clip-text dark:text-transparent
                     drop-shadow-sm dark:drop-shadow-none
                     relative inline-block"
            aria-label={homepage.hero.headline}
          >
            {/* Ultra-subtle text glow - Barely there elegance */}
            <motion.span
              className="absolute inset-0 -z-10 blur-3xl opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #4585f4, #6B8AE6)',
                transform: 'scale(1.1)',
              }}
              animate={{
                opacity: [0.02, 0.04, 0.02],
                scale: [1.05, 1.08, 1.05],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            <span className="relative z-10">{homepage.hero.headline}</span>
          </motion.h1>

          {/* Refined Subline with Premium Spacing - Enhanced Contrast & Emotional Depth */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-[1.6] font-normal
                     text-body dark:text-gray-300
                     tracking-tight
                     relative"
            aria-describedby="hero-heading"
          >
            {/* Ultra-subtle underline accent - Refined detail */}
            <motion.span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: [0, 0.2, 0.15, 0.2, 0],
                scaleX: [0, 1, 1.05, 1, 0],
              }}
              transition={{
                duration: 8,
                delay: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            <span className="relative z-10">{homepage.hero.subline}</span>
          </motion.p>

          {/* AI-Powered Smart CTA - Premium Spacing & Polish */}
          <motion.div 
            variants={itemVariants} 
            className="pt-6 md:pt-8"
          >
            <SmartCTA 
              section="hero"
              audience="universal"
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Live Activity Indicator - Refined */}
          <motion.div 
            variants={itemVariants} 
            className="pt-6 md:pt-8 flex justify-center"
          >
            <LiveActivity 
              page="homepage"
              showViewers={true}
              showRecentActivity={true}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Premium Segmentation Engine - CRO Optimized */}
      <section 
        id="segmentation-engine" 
        aria-labelledby="segmentation-heading"
        className="py-32 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <motion.h2
                id="segmentation-heading"
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold 
                           text-heading dark:text-white"
              >
                {homepage.segmentation.headline}
              </motion.h2>
              {homepage.segmentation.subheadline && (
                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-xl max-w-2xl mx-auto 
                           text-subtle dark:text-gray-400"
                >
                  {homepage.segmentation.subheadline}
                </motion.p>
              )}
            </motion.div>

            {/* Premium Cards Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {homepage.segmentation.cards.map((card, index) => {
                const Icon = iconMap[card.href];
                
                return (
                  <motion.div
                    key={card.href}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    custom={index}
                  >
                    <Link href={card.href} className="block h-full group">
                      <Card 
                        className="h-full p-8 lg:p-10 
                                 transition-all duration-500 ease-out
                                 cursor-pointer 
                                 border-2 relative overflow-hidden 
                                 bg-gradient-to-br from-card via-card to-card/95
                                 dark:from-card dark:via-card dark:to-card/95
                                 border-border/50 dark:border-border/50
                                 hover:border-[#4585f4]/60 dark:hover:border-[#4585f4]/60
                                 backdrop-blur-sm 
                                 shadow-xl hover:shadow-2xl 
                                 hover:shadow-[#4585f4]/20 dark:hover:shadow-[#4585f4]/20
                                 hover:-translate-y-1
                                 transform-gpu"
                        aria-label={`${card.title} - ${card.description}`}
                      >
                        {/* Subtle gradient overlay - Enhanced without placeholder images */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4585f4]/0 via-transparent to-[#6B8AE6]/0
                                      group-hover:from-[#4585f4]/8 group-hover:via-transparent group-hover:to-[#6B8AE6]/8
                                      transition-all duration-700 pointer-events-none" />
                        
                        <div className="space-y-6 relative z-10">
                          {/* Premium Icon with Enhanced Effects */}
                          <motion.div
                            className="w-16 h-16 md:w-20 md:h-20
                                     rounded-2xl 
                                     flex items-center justify-center 
                                     transition-all duration-500 ease-out
                                     bg-gradient-to-br from-[#4585f4]/10 via-[#4585f4]/15 to-[#6B8AE6]/10
                                     dark:from-[#4585f4]/20 dark:via-[#4585f4]/25 dark:to-[#6B8AE6]/20
                                     group-hover:from-[#4585f4]/20 group-hover:via-[#4585f4]/25 group-hover:to-[#6B8AE6]/20
                                     dark:group-hover:from-[#4585f4]/30 dark:group-hover:via-[#4585f4]/35 dark:group-hover:to-[#6B8AE6]/30
                                     shadow-lg shadow-[#4585f4]/10
                                     group-hover:shadow-xl group-hover:shadow-[#4585f4]/20"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          >
                            {Icon && (
                              <Icon className="h-8 w-8 md:h-10 md:w-10 
                                             text-[#4585f4] dark:text-[#6B8AE6]
                                             transition-transform duration-300
                                             group-hover:scale-110" />
                            )}
                          </motion.div>

                          {/* Premium Title */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl 
                                       font-bold 
                                       transition-all duration-300
                                       text-heading dark:text-white
                                       group-hover:text-[#4585f4] dark:group-hover:text-[#6B8AE6]
                                       tracking-tight">
                            {card.title}
                          </h3>

                          {/* Refined Description */}
                          <p className="text-base md:text-lg 
                                      leading-relaxed 
                                      text-body dark:text-gray-300
                                      transition-colors duration-300">
                            {card.description}
                          </p>

                          {/* Premium CTA with Enhanced Arrow */}
                          <div className="flex items-center gap-2
                                       font-semibold text-lg md:text-xl
                                       transition-all duration-300 ease-out
                                       group-hover:translate-x-2 
                                       pt-4
                                       text-[#4585f4] dark:text-[#6B8AE6]">
                            {card.ctaText}
                            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 
                                                 transition-all duration-300
                                                 group-hover:translate-x-2 
                                                 group-hover:scale-110" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Premium Social Proof - Trust Building */}
      <section 
        aria-labelledby="social-proof-heading"
        className="py-20 px-4 relative z-10"
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

            {/* Logo Grid with Enhanced Light Theme */}
            <div className="max-w-7xl mx-auto bg-card border-border shadow-2xl rounded-3xl py-16 px-8 backdrop-blur-sm border-2">
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

      {/* Section 4: Premium Why Us - Compelling Value Proposition */}
      <section 
        aria-labelledby="why-us-heading"
        className="py-32 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-6 max-w-4xl mx-auto">
              <motion.h2
                id="why-us-heading"
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold 
                         text-heading dark:text-white"
              >
                {homepage.whyUs.headline}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed 
                         text-body dark:text-gray-300"
              >
                {homepage.whyUs.description}
              </motion.p>
            </motion.div>

            {/* Premium Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {homepage.whyUs.points.map((point, index) => {
                const Icon = Object.values(featureIcons)[index];
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group relative p-8 lg:p-10 
                             rounded-2xl 
                             border-2 
                             transition-all duration-500 ease-out
                             bg-gradient-to-br from-card via-card to-card/95
                             dark:from-card dark:via-card dark:to-card/95
                             border-border/50 dark:border-border/50
                             hover:border-[#4585f4]/50 dark:hover:border-[#4585f4]/50
                             backdrop-blur-sm 
                             shadow-xl hover:shadow-2xl 
                             hover:shadow-[#4585f4]/20 dark:hover:shadow-[#4585f4]/20
                             transform-gpu"
                  >
                    {/* Premium Icon */}
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20
                               rounded-2xl 
                               flex items-center justify-center mb-6 
                               bg-gradient-to-br from-[#4585f4]/10 via-[#4585f4]/15 to-[#6B8AE6]/10
                               dark:from-[#4585f4]/20 dark:via-[#4585f4]/25 dark:to-[#6B8AE6]/20
                               group-hover:from-[#4585f4]/20 group-hover:via-[#4585f4]/25 group-hover:to-[#6B8AE6]/20
                               dark:group-hover:from-[#4585f4]/30 dark:group-hover:via-[#4585f4]/35 dark:group-hover:to-[#6B8AE6]/30
                               transition-all duration-500
                               shadow-lg shadow-[#4585f4]/10
                               group-hover:shadow-xl group-hover:shadow-[#4585f4]/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {Icon && (
                        <Icon className="h-8 w-8 md:h-10 md:w-10 
                                       text-[#4585f4] dark:text-[#6B8AE6]
                                       transition-transform duration-300
                                       group-hover:scale-110" />
                      )}
                    </motion.div>

                    {/* Premium Content */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 
                                 text-heading dark:text-white
                                 group-hover:text-[#4585f4] dark:group-hover:text-[#6B8AE6] 
                                 transition-colors duration-300
                                 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed 
                                text-body dark:text-gray-300
                                transition-colors duration-300">
                      {point.description}
                    </p>

                    {/* Premium Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 
                               bg-gradient-to-r from-[#4585f4] via-[#5A8FF5] to-[#6B8AE6]
                               opacity-0 group-hover:opacity-100 
                               transition-opacity duration-500
                               rounded-b-2xl"
                    />
                  </motion.div>
                );
              })}
            </div>

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
