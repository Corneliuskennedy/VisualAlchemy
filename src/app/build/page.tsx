'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Rocket } from 'lucide-react';
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

export default function BuildPage() {
  const { buildPage } = siteContent;

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
            {buildPage.hero.headline}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            {buildPage.hero.subline}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <Link href={buildPage.cta.ctaLink}>
                {buildPage.hero.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Process */}
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
              {buildPage.process.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buildPage.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#4585f4] rounded-xl flex items-center justify-center">
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
              Case Studies
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildPage.caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <div className="space-y-4">
                      <Rocket className="h-8 w-8 text-[#4585f4]" />
                      <h3 className="text-xl font-bold text-white">{study.title}</h3>
                      <p className="text-gray-400">{study.description}</p>
                      {study.metrics && (
                        <p className="text-[#4585f4] font-semibold">{study.metrics}</p>
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
              {buildPage.pricing.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildPage.pricing.tiers.map((tier, index) => (
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
              {buildPage.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300"
            >
              {buildPage.cta.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Link href={buildPage.cta.ctaLink}>
                  {buildPage.cta.ctaText}
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

