'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, TrendingUp, Sparkles, ArrowLeft } from 'lucide-react';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { useTranslations } from '@/hooks/useTranslations';
import GridBackground from '@/components/ui/GridBackground';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

type Category = 'all' | 'build' | 'optimize' | 'create';

const categoryMap = {
  build: Rocket,
  optimize: TrendingUp,
  create: Sparkles,
};

const categoryLabels: Record<Category, { nl: string; en: string }> = {
  all: { nl: 'All Projects', en: 'All Projects' },
  build: { nl: 'Build', en: 'Build' },
  optimize: { nl: 'Optimize', en: 'Optimize' },
  create: { nl: 'Create', en: 'Create' },
};

export default function ProjectenPage() {
  const { projectenPage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Ons Werk' : 'Our Work',
      titleNL: 'Ons Werk',
      href: isNL ? '/nl/projecten' : '/projecten',
      isCurrent: true
    }
  ];

  // Bilingual content
  const content = {
    headline: isNL 
      ? 'Bewezen Resultaten. Tastbare Impact.'
      : 'Proven Results. Tangible Impact.',
    description: isNL
      ? 'Wij meten ons succes aan het succes van onze klanten. Ontdek een selectie van onze projecten binnen onze drie kerndisciplines.'
      : 'We measure our success by our clients\' success. Discover a selection of our projects across our three core disciplines.',
    noProjects: isNL
      ? 'Geen projecten gevonden in deze categorie.'
      : 'No projects found in this category.'
  };

  // Use projects from siteContent.projectenPage.projects if available, otherwise fallback to case studies
  const allProjects = projectenPage.projects && projectenPage.projects.length > 0
    ? projectenPage.projects.map(p => ({
        title: p.clientName,
        description: p.resultTagline,
        category: p.category,
        slug: p.slug,
      }))
    : [
        ...siteContent.buildPage.caseStudies.map(s => ({ ...s, category: 'build' as const })),
        ...siteContent.optimizePage.caseStudies.map(s => ({ ...s, category: 'optimize' as const })),
        ...siteContent.createPage.portfolio.projects.map(s => ({ ...s, category: 'create' as const })),
      ];

  const filteredProjects =
    selectedCategory === 'all'
      ? allProjects
      : allProjects.filter(p => p.category === selectedCategory);

  return (
    <>
      <UnifiedSEO 
        title={isNL ? 'Ons Werk | Octomatic' : 'Our Work | Octomatic'}
        description={content.description}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/projecten" : "https://www.octomatic.ai/projecten"}
      />
      
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
          {/* Hero Section */}
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Breadcrumb */}
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="about"
                />
              </div>

              {/* Back Button */}
              <Button 
                variant="ghost" 
                asChild
                className="mb-8 hover:bg-secondary/20 group"
              >
                <Link href={isNL ? '/nl' : '/'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Home' : 'Back to Home'}
                </Link>
              </Button>

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    {content.headline}
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto"></div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {content.description}
                  </h2>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Filter Buttons */}
          <section className="px-4 pb-12 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {(['all', 'build', 'optimize', 'create'] as Category[]).map((category) => {
                  const Icon = category !== 'all' ? categoryMap[category] : null;
                  const label = categoryLabels[category][isNL ? 'nl' : 'en'];
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className={`${
                        selectedCategory === category
                          ? 'bg-[#4585f4] text-white hover:bg-[#4585f4]/90'
                          : 'bg-gray-900/50 border-gray-800 text-gray-300 hover:bg-gray-800'
                      } transition-all`}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="px-4 pb-24 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-7xl mx-auto relative z-10">
              {filteredProjects.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project, index) => {
                    const Icon = categoryMap[project.category];
                    return (
                      <motion.div
                        key={`${project.category}-${index}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={`/projecten/${project.slug}`}>
                          <Card className="h-full p-6 bg-gray-900/50 border border-gray-800 hover:border-[#4585f4]/50 transition-all cursor-pointer group hover:bg-gray-800/30">
                            <div className="space-y-4">
                              {Icon && (
                                <div className="w-12 h-12 rounded-xl bg-[#4585f4]/10 flex items-center justify-center group-hover:bg-[#4585f4]/20 transition-colors">
                                  <Icon className="h-6 w-6 text-[#4585f4]" />
                                </div>
                              )}
                              <div className="space-y-2">
                                <span className="text-xs font-semibold text-[#4585f4] uppercase tracking-wide">
                                  {categoryLabels[project.category][isNL ? 'nl' : 'en']}
                                </span>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#4585f4] transition-colors">
                                  {project.title}
                                </h3>
                              </div>
                              <p className="text-gray-300 leading-relaxed">{project.description}</p>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    {content.noProjects}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}

