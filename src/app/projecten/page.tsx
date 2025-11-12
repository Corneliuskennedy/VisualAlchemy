'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, TrendingUp, Sparkles } from 'lucide-react';

type Category = 'all' | 'build' | 'optimize' | 'create';

const categoryMap = {
  build: Rocket,
  optimize: TrendingUp,
  create: Sparkles,
};

export default function ProjectenPage() {
  const { projectenPage } = siteContent;
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // In a real implementation, you'd fetch this from a CMS or database
  // For now, we'll use mock data based on the siteContent structure
  const allProjects = [
    ...siteContent.buildPage.caseStudies.map(s => ({ ...s, category: 'build' as const })),
    ...siteContent.optimizePage.caseStudies.map(s => ({ ...s, category: 'optimize' as const })),
    ...siteContent.createPage.portfolio.projects.map(s => ({ ...s, category: 'create' as const })),
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? allProjects
      : allProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
      {/* Header */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {projectenPage.headline}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {projectenPage.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {(['all', 'build', 'optimize', 'create'] as Category[]).map((category) => {
              const Icon = category !== 'all' ? categoryMap[category] : null;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? 'bg-[#4585f4] text-white'
                      : 'bg-gray-900/50 border-gray-800 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {category === 'all'
                    ? 'Alles'
                    : category === 'build'
                    ? 'Build'
                    : category === 'optimize'
                    ? 'Optimize'
                    : 'Create'}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
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
                    <Card className="h-full p-6 bg-gray-900/50 border-gray-800 hover:border-[#4585f4]/50 transition-all cursor-pointer group">
                      <div className="space-y-4">
                        {Icon && (
                          <div className="w-12 h-12 rounded-xl bg-[#4585f4]/10 flex items-center justify-center group-hover:bg-[#4585f4]/20 transition-colors">
                            <Icon className="h-6 w-6 text-[#4585f4]" />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white group-hover:text-[#4585f4] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400">{project.description}</p>
                        {project.metrics && (
                          <p className="text-[#4585f4] font-semibold">{project.metrics}</p>
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

