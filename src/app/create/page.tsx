'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import LiveActivity from '@/components/realtime/LiveActivity';
import SmartCTA from '@/components/personalization/SmartCTA';

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
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content
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

  return (
    <>
      <UnifiedSEO 
        title={content.meta.title}
        description={content.meta.description}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/create" : "https://www.octomatic.ai/create"}
      />
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
              {content.hero.headline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            >
              {content.hero.subline}
            </motion.p>
            
            {/* AI-Powered Smart CTA */}
            <motion.div variants={itemVariants}>
              <SmartCTA 
                section="hero"
                audience="universal"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <LiveActivity 
                page="create"
                showViewers={true}
                showRecentActivity={true}
              />
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
              {content.portfolio.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.portfolio.projects.map((project, index) => (
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
              {content.process.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.process.steps.map((step, index) => (
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

      {/* Testimonial Section */}
      {content.testimonial && (
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
              >
                {content.testimonial.headline}
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-3xl p-8 md:p-12"
              >
                <blockquote className="text-xl md:text-2xl text-white italic mb-6 leading-relaxed">
                  "{content.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {content.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{content.testimonial.author}</p>
                    {content.testimonial.authorTitle && (
                      <p className="text-gray-400 text-sm">{content.testimonial.authorTitle}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

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
              {content.pricing.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.pricing.tiers.map((tier, index) => (
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
              {content.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300"
            >
              {content.cta.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <SmartCTA 
                section="cta"
                audience="universal"
                className="max-w-xl mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}

