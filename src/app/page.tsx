'use client';

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, Rocket, TrendingUp, Sparkles, Users, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GridBackground from '@/components/ui/GridBackground';
import { useTheme } from 'next-themes';
import useLanguage from '@/contexts/LanguageContext';

// Premium Animation Variants - CRO Optimized
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

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

export default function Home() {
  const { homepage } = siteContent;
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const isNL = language === 'nl';
  
  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default to light theme during SSR to match initial client render
  const isDark = mounted && theme === 'dark';

  const handleCTAClick = () => {
    const segmentationSection = document.getElementById('segmentation-engine');
    if (segmentationSection) {
      segmentationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={isDark ? 'min-h-screen relative font-archivo bg-[#0A0A0A]' : 'min-h-screen relative font-archivo bg-gradient-to-b from-white via-blue-50/30 to-white'}>
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GridBackground className="pointer-events-none" highContrast={true} />
      </div>

      {/* Section 1: Clean Hero with Visual Interest */}
      <section className={`relative min-h-screen flex flex-col justify-center items-center px-4 py-20 z-10 overflow-hidden ${
        isDark ? '' : 'bg-gradient-to-b from-white via-blue-50/20 to-white'
      }`}>
        {/* Enhanced Background for Light Theme */}
        {!isDark && (
          <>
            {/* Subtle blue gradient overlay - more visible */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-50/40 via-blue-50/20 to-transparent" />
            {/* Additional depth with subtle pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(69,133,244,0.08)_0%,transparent_70%)]" />
          </>
        )}
        
        {/* Dark theme gradient */}
        {isDark && (
          <div className="absolute inset-0 bg-gradient-radial from-[#4585f4]/10 via-transparent to-transparent" />
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
        >
          <motion.h1
            variants={heroTitleVariants}
            className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight ${
              isDark 
                ? 'text-white' 
                : 'text-gray-900 drop-shadow-sm'
            }`}
          >
            {homepage.hero.headline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {homepage.hero.subline}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              onClick={handleCTAClick}
              className={`group bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'hover:shadow-2xl hover:shadow-[#4585f4]/40' 
                  : 'hover:shadow-2xl hover:shadow-[#4585f4]/30 shadow-lg'
              } hover:scale-105`}
            >
              {homepage.hero.ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Premium Segmentation Engine - CRO Optimized */}
      <section id="segmentation-engine" className="py-32 px-4 relative z-10">
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
                variants={fadeInUp}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {homepage.segmentation.headline}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className={`text-lg md:text-xl max-w-2xl mx-auto ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Kies je pad en ontdek hoe we je kunnen helpen
              </motion.p>
            </motion.div>

            {/* Premium Cards Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {homepage.segmentation.cards.map((card, index) => {
                const Icon = iconMap[card.href];
                const cardImages = [
                  '/images/VSM800.webp',
                  '/images/VSM400.webp',
                  '/images/VSM1200.webp',
                ];
                
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
                    <Link href={card.href} className="block h-full">
                      <Card className={`h-full p-8 lg:p-10 transition-all duration-500 cursor-pointer group border-2 relative overflow-hidden ${
                        isDark 
                          ? 'bg-gray-900/60 border-gray-800 hover:border-[#4585f4]/60 backdrop-blur-sm' 
                          : 'bg-white border-gray-200 hover:border-[#4585f4]/60 shadow-xl hover:shadow-2xl hover:shadow-[#4585f4]/10'
                      }`}>
                        {/* Background Image for Light Theme */}
                        {!isDark && (
                          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                            <Image
                              src={cardImages[index % cardImages.length]}
                              alt=""
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        
                        <div className="space-y-6 relative z-10">
                          {/* Icon */}
                          <motion.div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isDark 
                                ? 'bg-[#4585f4]/20 group-hover:bg-[#4585f4]/30' 
                                : 'bg-[#4585f4]/10 group-hover:bg-[#4585f4]/20 shadow-md'
                            }`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            {Icon && (
                              <Icon className="h-8 w-8 text-[#4585f4]" />
                            )}
                          </motion.div>

                          {/* Title */}
                          <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${
                            isDark 
                              ? 'text-white group-hover:text-[#4585f4]' 
                              : 'text-gray-900 group-hover:text-[#4585f4]'
                          }`}>
                            {card.title}
                          </h3>

                          {/* Description */}
                          <p className={`text-base leading-relaxed ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {card.description}
                          </p>

                          {/* CTA with Arrow */}
                          <div className={`flex items-center font-semibold text-lg transition-all group-hover:translate-x-2 pt-4 ${
                            isDark ? 'text-[#4585f4]' : 'text-[#4585f4]'
                          }`}>
                            {card.ctaText}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.p
              variants={itemVariants}
              className={`text-center text-sm uppercase tracking-wider font-semibold ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Vertrouwd door toonaangevende bedrijven
            </motion.p>

            {/* Logo Grid with Enhanced Light Theme */}
            <div className={`max-w-7xl mx-auto ${
              isDark 
                ? 'bg-gray-900/40 border-gray-800' 
                : 'bg-white border-gray-200 shadow-2xl'
            } rounded-3xl py-16 px-8 backdrop-blur-sm border-2`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-items-center">
                {clientLogos.map((logo, index) => (
                  <motion.div
                    key={logo.name}
                    variants={itemVariants}
                    className={`grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 hover:scale-110 ${
                      !isDark ? 'drop-shadow-md hover:drop-shadow-lg' : ''
                    }`}
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
      <section className="py-32 px-4 relative z-10">
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
                variants={fadeInUp}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {homepage.whyUs.headline}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
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
                    className={`group relative p-8 lg:p-10 rounded-2xl border-2 transition-all duration-500 ${
                      isDark 
                        ? 'bg-gray-900/60 border-gray-800 hover:border-[#4585f4]/50 backdrop-blur-sm' 
                        : 'bg-white border-gray-200 hover:border-[#4585f4]/50 shadow-xl hover:shadow-2xl hover:shadow-[#4585f4]/10'
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isDark 
                          ? 'bg-[#4585f4]/20 group-hover:bg-[#4585f4]/30' 
                          : 'bg-[#4585f4]/10 group-hover:bg-[#4585f4]/20'
                      } transition-all duration-300`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {Icon && (
                        <Icon className="h-8 w-8 text-[#4585f4]" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDark ? 'text-white group-hover:text-[#4585f4]' : 'text-gray-900 group-hover:text-[#4585f4]'
                    } transition-colors duration-300`}>
                      {point.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {point.description}
                    </p>

                    {/* Accent Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4585f4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Final CTA */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-8"
            >
              <Button
                size="lg"
                asChild
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#4585f4]/40 hover:scale-105"
              >
                <Link href="/contact">
                  Start Je Project Vandaag
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
