'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, Rocket } from 'lucide-react';
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

export default function BuildPage() {
  const { buildPage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content
  const content = {
    hero: {
      headline: isNL 
        ? 'Van Idee naar Impact, Intelligent.'
        : buildPage.hero.headline,
      subline: isNL
        ? 'We nemen het risico uit je reis van concept tot lancering met een bewezen, 30-daagse sprint die een volledig geautomatiseerd platform oplevert, klaar voor je eerste gebruikers.'
        : buildPage.hero.subline,
      ctaText: isNL
        ? 'Ontdek Hoe Het Werkt'
        : buildPage.hero.ctaText
    },
    problem: buildPage.problem ? {
      headline: isNL
        ? 'De Race Tegen de Klok.'
        : buildPage.problem.headline,
      description: isNL
        ? 'Elke oprichter staat voor hetzelfde dilemma: snel lanceren en het risico lopen iets te bouwen dat niemand wil, of de tijd nemen en zien hoe concurrenten je verslaan. De druk is reëel. Investeerders willen traction. Klanten willen oplossingen. Je hebt validatie nodig—snel. Maar het bouwen van het verkeerde ding kost meer dan tijd. Het kost kansen, momentum en soms je hele visie.'
        : buildPage.problem.description
    } : undefined,
    process: {
      headline: isNL
        ? 'Onze 30-Daagse MVP Sprint.'
        : buildPage.process.headline,
      steps: buildPage.process.steps.map(step => ({
        step: step.step,
        title: isNL
          ? step.title === 'Deep Dive & Strategy' ? 'Diepgaande Analyse & Strategie'
          : step.title === 'System Architecture & Design' ? 'Systeem Architectuur & Design'
          : step.title === 'Core Feature Implementation' ? 'Kern Feature Implementatie'
          : step.title === 'Launch & First User Onboarding' ? 'Lancering & Eerste Gebruikers Onboarding'
          : step.title
          : step.title,
        description: isNL
          ? step.description === 'We define your core value and map the path to revenue.' ? 'We definiëren je kernwaarde en bepalen de route naar inkomsten.'
          : step.description === 'We build the robust, scalable foundation.' ? 'We bouwen de robuuste, schaalbare basis.'
          : step.description === 'We bring your vision to life with intelligent automation.' ? 'We brengen je visie tot leven met intelligente automatisering.'
          : step.description === 'We get you to market and start the feedback loop.' ? 'We brengen je naar de markt en starten de feedback loop.'
          : step.description
          : step.description
      }))
    },
    caseStudies: {
      headline: isNL
        ? 'Van Nul tot Lancering.'
        : 'From Zero to Launch.',
      items: buildPage.caseStudies.map(study => ({
        ...study,
        title: isNL
          ? study.title === 'Case Study: How TechFlow launched their platform and secured pre-seed funding in 45 days' 
            ? 'Case Study: Hoe TechFlow hun platform lanceerde en pre-seed funding binnen 45 dagen veiligstelde'
            : study.title
          : study.title,
        description: isNL
          ? study.description === 'From concept to working product in 30 days, with 150+ beta users and a clear path to revenue.'
            ? 'Van concept tot werkend product in 30 dagen, met 150+ beta gebruikers en een duidelijke route naar inkomsten.'
            : study.description
          : study.description,
        metrics: isNL
          ? study.metrics === '150+ beta users • Pre-seed funding secured'
            ? '150+ beta gebruikers • Pre-seed funding veiliggesteld'
            : study.metrics
          : study.metrics
      }))
    },
    pricing: {
      headline: isNL
        ? 'Jouw Investering in Snelheid & Validatie.'
        : buildPage.pricing.headline,
      tiers: buildPage.pricing.tiers.map(tier => ({
        ...tier,
        name: isNL
          ? tier.name === '90-Minute Validation Session' ? '90-Minuten Validatie Sessie'
          : tier.name === 'The 30-Day MVP Sprint' ? 'De 30-Daagse MVP Sprint'
          : tier.name
          : tier.name,
        description: isNL
          ? tier.description.includes('perfect first step') 
            ? 'De perfecte eerste stap om een idee te de-risken. We analyseren je concept, identificeren potentiële valkuilen en bieden een duidelijke roadmap vooruit.'
          : tier.description.includes('complete package')
            ? 'Het complete pakket om van idee naar markt te gaan. Een volledig geautomatiseerd platform, klaar voor je eerste gebruikers, geleverd in 30 dagen.'
            : tier.description
          : tier.description,
        features: tier.features.map(feature => isNL
          ? feature === 'Idea validation framework' ? 'Idee validatie framework'
          : feature === 'Market opportunity analysis' ? 'Markt kansen analyse'
          : feature === 'Technical feasibility assessment' ? 'Technische haalbaarheidsbeoordeling'
          : feature === 'Risk identification & mitigation' ? 'Risico identificatie & mitigatie'
          : feature === 'Next steps roadmap' ? 'Volgende stappen roadmap'
          : feature === 'Complete system architecture' ? 'Complete systeem architectuur'
          : feature === 'Core feature development' ? 'Kern feature ontwikkeling'
          : feature === 'Automated workflows' ? 'Geautomatiseerde workflows'
          : feature === 'User onboarding system' ? 'Gebruikers onboarding systeem'
          : feature === 'Launch support & documentation' ? 'Lancering ondersteuning & documentatie'
          : feature === '30 days post-launch support' ? '30 dagen post-lancering ondersteuning'
          : feature
          : feature),
        ctaText: isNL
          ? tier.ctaText === 'Book Validation Session' ? 'Boek Validatie Sessie'
          : tier.ctaText === 'Book a Project Scoping Call' ? 'Boek een Project Scoping Gesprek'
          : tier.ctaText
          : tier.ctaText
      }))
    },
    cta: {
      headline: isNL
        ? 'Klaar om te Bouwen?'
        : buildPage.cta.headline,
      description: isNL
        ? 'Laten we je visie omzetten in een marktklaar realiteit. Boek een gesprek om je project te bespreken.'
        : buildPage.cta.description,
      ctaText: isNL
        ? 'Boek een Project Scoping Gesprek'
        : buildPage.cta.ctaText
    },
    meta: {
      title: isNL
        ? 'Een Nieuw Systeem Bouwen | Octomatic'
        : buildPage.meta.title,
      description: isNL
        ? 'We nemen het risico uit je reis van concept tot lancering met een bewezen, 30-daagse sprint die een volledig geautomatiseerd platform oplevert.'
        : buildPage.meta.description
    }
  };

  return (
    <>
      <UnifiedSEO 
        title={content.meta.title}
        description={content.meta.description}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/build" : "https://www.octomatic.ai/build"}
      />
      <div className="min-h-screen relative font-archivo bg-background">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading dark:text-white leading-tight"
            >
              {content.hero.headline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-foreground dark:text-gray-300 max-w-2xl mx-auto"
            >
              {content.hero.subline}
            </motion.p>
            
            {/* AI-Powered Smart CTA */}
            <motion.div variants={itemVariants}>
              <SmartCTA 
                section="hero"
                audience="startup"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <LiveActivity 
                page="build"
                showViewers={true}
                showRecentActivity={true}
              />
            </motion.div>
          </motion.div>
        </section>

      {/* Problem Section */}
      {buildPage.problem && (
        <section className="py-24 px-4 bg-secondary/30 dark:bg-gray-900/30">
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white text-center"
              >
                {content.problem?.headline}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-foreground dark:text-gray-300 leading-relaxed text-center"
              >
                {content.problem?.description}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Process */}
      <section id="segmentation-engine" className="py-24 px-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="h-full p-6 bg-secondary/50 dark:bg-gray-900/50 border-border dark:border-gray-800">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#4585f4] rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-heading dark:text-white">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-heading dark:text-white">{step.title}</h3>
                      <p className="text-muted-foreground dark:text-gray-400">{step.description}</p>
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
              {content.caseStudies.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.caseStudies.items.map((study, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-6 bg-secondary/50 dark:bg-gray-900/50 border-border dark:border-gray-800">
                    <div className="space-y-4">
                      <Rocket className="h-8 w-8 text-[#4585f4]" />
                      <h3 className="text-xl font-bold text-heading dark:text-white">{study.title}</h3>
                      <p className="text-muted-foreground dark:text-gray-400">{study.description}</p>
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
              {content.pricing.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.pricing.tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-8 bg-gray-900/50 border-gray-800 flex flex-col">
                    <div className="space-y-6 flex-1">
                      <div>
                        <h3 className="text-2xl font-bold text-heading dark:text-white mb-2">{tier.name}</h3>
                        <div className="text-4xl font-bold text-[#4585f4] mb-2">{tier.price}</div>
                        <p className="text-muted-foreground dark:text-gray-400">{tier.description}</p>
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[#4585f4] flex-shrink-0 mt-0.5" />
                            <span className="text-foreground dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full mt-6 bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white"
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white"
            >
              {content.cta.headline}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-foreground dark:text-gray-300"
            >
              {content.cta.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <SmartCTA 
                section="cta"
                audience="startup"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <LiveActivity 
                page="build"
                showViewers={true}
                showRecentActivity={true}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}

