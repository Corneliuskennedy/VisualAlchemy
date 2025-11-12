'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, TrendingUp, Calculator } from 'lucide-react';
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

export default function OptimizePage() {
  const { optimizePage } = siteContent;

  return (
    <div className="min-h-screen relative font-archivo bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-4 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {optimizePage.hero.headline}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            {optimizePage.hero.subline}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <Link href="/contact">
                {optimizePage.hero.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem/Solution */}
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
              {optimizePage.problemSolution.headline}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div variants={itemVariants} className="space-y-6">
                <Card className="p-8 bg-red-900/20 border-red-800">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">Het Probleem</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {optimizePage.problemSolution.problem}
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <Card className="p-8 bg-green-900/20 border-green-800">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">De Oplossing</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {optimizePage.problemSolution.solution}
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {optimizePage.problemSolution.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <TrendingUp className="h-8 w-8 text-[#4585f4] mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* ROI Calculator CTA */}
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Card className="p-8 bg-gradient-to-r from-[#4585f4]/10 to-[#6B8AE6]/10 border-[#4585f4]/20">
                <Calculator className="h-12 w-12 text-[#4585f4] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Bereken je ROI
                </h3>
                <p className="text-gray-300 mb-6">
                  Ontdek hoeveel tijd en geld je kunt besparen met automatisering
                </p>
                <Button
                  asChild
                  className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white"
                >
                  <Link href="/tools/automation-roi-calculator">
                    Open ROI Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
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
              Case Studies met Harde Cijfers
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {optimizePage.caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <div className="space-y-4">
                      <TrendingUp className="h-8 w-8 text-[#4585f4]" />
                      <h3 className="text-xl font-bold text-white">{study.title}</h3>
                      <p className="text-gray-400">{study.description}</p>
                      {study.metrics && (
                        <p className="text-green-400 font-bold text-lg">{study.metrics}</p>
                      )}
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
              {optimizePage.pricing.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {optimizePage.pricing.tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-8 bg-gray-900/50 border-gray-800 flex flex-col">
                    <div className="space-y-6 flex-1">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                        <div className="text-4xl font-bold text-[#4585f4] mb-2">{tier.price}</div>
                        <p className="text-gray-400">{tier.description}</p>
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[#4585f4] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full mt-6 bg-[#4585f4] hover:bg-[#4585f4]/90 text-white"
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
      <section className="py-24 px-4 bg-gradient-to-r from-[#4585f4]/10 to-[#6B8AE6]/10">
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
              {optimizePage.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300"
            >
              {optimizePage.cta.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Link href={optimizePage.cta.ctaLink}>
                  {optimizePage.cta.ctaText}
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

