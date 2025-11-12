'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CreatePage() {
  const { createPage } = siteContent;

  return (
    <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
      {/* Hero with Video Reel */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Sparkles className="h-16 w-16 text-purple-400 mx-auto" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {createPage.hero.headline}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            {createPage.hero.subline}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-600/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <Link href="#portfolio">
                {createPage.hero.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
            >
              {createPage.portfolio.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createPage.portfolio.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800 overflow-hidden relative">
                    <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg mb-4 flex items-center justify-center group-hover:from-purple-800/70 group-hover:to-pink-800/70 transition-all">
                      <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    {project.metrics && (
                      <p className="text-purple-400 font-semibold">{project.metrics}</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
            >
              {createPage.process.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {createPage.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
            >
              {createPage.pricing.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {createPage.pricing.tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-8 bg-gray-900/50 border-gray-800 flex flex-col">
                    <div className="space-y-6 flex-1">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                        <div className="text-4xl font-bold text-purple-400 mb-2">{tier.price}</div>
                        <p className="text-gray-400">{tier.description}</p>
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full mt-6 bg-purple-600 hover:bg-purple-600/90 text-white"
                    >
                      <Link href={tier.ctaLink}>
                        {tier.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              {createPage.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300"
            >
              {createPage.cta.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-600/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Link href={createPage.cta.ctaLink}>
                  {createPage.cta.ctaText}
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

