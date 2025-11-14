'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/content/siteContent';
import { ArrowRight, CheckCircle, TrendingUp, Calculator, Zap, Users, Database, Target, FileText, BarChart3, Brain, MapPin } from 'lucide-react';
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

export default function OptimizePage() {
  const { optimizePage } = siteContent;
  const { language } = useTranslations();
  const isNL = language === 'nl';

  // Bilingual content
  const content = {
    hero: {
      headline: isNL
        ? 'Stop Met Winst Lekken.'
        : optimizePage.hero.headline,
      subline: isNL
        ? 'We identificeren de verborgen inefficiënties in je bedrijf en implementeren intelligente automatiseringssystemen die duizenden terugbrengen naar je winst.'
        : optimizePage.hero.subline,
      ctaText: isNL
        ? 'Boek een Gratis Proces Audit'
        : optimizePage.hero.ctaText
    },
    problem: {
      headline: isNL
        ? 'Je Bedrijf Lekkt €67.560 Per Jaar. We Bewijzen Het.'
        : optimizePage.problem.headline,
      description: isNL
        ? 'Handmatige taken, repetitief werk en losgekoppelde systemen werken als een verborgen belasting op je bedrijf. Elk uur dat wordt besteed aan data entry, elke e-mail die verloren gaat, elk proces dat menselijke interventie vereist—het telt allemaal op. Terwijl je druk bezig bent met het runnen van het bedrijf, glipt geld stilletjes weg. Het goede nieuws? Deze lekken zijn te repareren. Gebruik onze gratis calculator om de potentiële besparingen van je bedrijf te schatten.'
        : optimizePage.problem.description,
      calculatorCta: isNL
        ? 'Gebruik onze gratis calculator om de potentiële besparingen van je bedrijf te schatten.'
        : optimizePage.problem.calculatorCta,
      calculatorButton: isNL
        ? 'Open ROI Calculator'
        : 'Open ROI Calculator'
    },
    solutions: {
      headline: isNL
        ? 'Onze Automatisering Toolkit.'
        : optimizePage.solutions.headline,
      items: optimizePage.solutions.items.map(item => ({
        title: isNL
          ? item.title === 'CRM Buildouts' ? 'CRM Opzetten'
          : item.title === 'Hiring & HR Systems' ? 'Werving & HR Systemen'
          : item.title === 'Project Management Systems' ? 'Project Management Systemen'
          : item.title === 'AI Service Fulfillment' ? 'AI Service Levering'
          : item.title
          : item.title,
        description: isNL
          ? item.description === 'A central system for all customer data.' ? 'Een centraal systeem voor alle klantgegevens.'
          : item.description === 'Automating the talent pipeline.' ? 'Automatisering van de talent pipeline.'
          : item.description === 'A single source of truth for all projects.' ? 'Een enkele bron van waarheid voor alle projecten.'
          : item.description === 'Delivering your services 3x faster.' ? 'Je services 3x sneller leveren.'
          : item.description
          : item.description
      }))
    },
    caseStudies: {
      headline: isNL
        ? 'Het Bewijs Zit in de Winst.'
        : 'The Proof is in the Profit.',
      items: optimizePage.caseStudies.map(study => ({
        ...study,
        title: isNL
          ? study.title === 'Case Study: How GreenTech Solutions reduced manual data entry by 80% and saved €45,000 in the first year'
            ? 'Case Study: Hoe GreenTech Solutions handmatige data entry met 80% verminderde en €45.000 bespaarde in het eerste jaar'
            : study.title
          : study.title,
        description: isNL
          ? study.description === 'By automating their CRM and project management workflows, they eliminated 25 hours of manual work per week and improved customer response times by 60%.'
            ? 'Door hun CRM en project management workflows te automatiseren, elimineerden ze 25 uur handmatig werk per week en verbeterden ze de klantreactietijden met 60%.'
            : study.description
          : study.description,
        metrics: isNL
          ? study.metrics === '80% reduction • €45,000 saved/year'
            ? '80% reductie • €45.000 bespaard/jaar'
            : study.metrics
          : study.metrics
      }))
    },
    pricing: {
      headline: isNL
        ? 'Jouw Investering in een Schaalbare Toekomst.'
        : optimizePage.pricing.headline,
      tiers: optimizePage.pricing.tiers.map(tier => ({
        ...tier,
        name: isNL
          ? tier.name === 'Value Stream Mapping Workshop' ? 'Value Stream Mapping Workshop'
          : tier.name === 'Custom Implementation Project' ? 'Aangepast Implementatie Project'
          : tier.name
          : tier.name,
        description: isNL
          ? tier.description.includes('essential first step')
            ? 'De essentiële eerste stap om je grootste winstlekken te identificeren. We mappen je hele operatie, identificeren inefficiënties en bieden een geprioriteerde automatiseringsroadmap.'
          : tier.description.includes('hands-on solution')
            ? 'De praktische oplossing om de automatiseringen te bouwen en te implementeren. We implementeren de systemen, trainen je team en zorgen ervoor dat alles naadloos werkt.'
            : tier.description
          : tier.description,
        features: tier.features.map(feature => isNL
          ? feature === 'Complete process audit' ? 'Complete procesaudit'
          : feature === 'Value stream mapping' ? 'Value stream mapping'
          : feature === 'Profit leak identification' ? 'Winstlek identificatie'
          : feature === 'Prioritized automation roadmap' ? 'Geprioriteerde automatiseringsroadmap'
          : feature === 'ROI projections' ? 'ROI projecties'
          : feature === 'Implementation strategy' ? 'Implementatiestrategie'
          : feature === 'Everything from Workshop' ? 'Alles van Workshop'
          : feature === 'Custom automation development' ? 'Aangepaste automatisering ontwikkeling'
          : feature === 'System integration' ? 'Systeem integratie'
          : feature === 'Team training & documentation' ? 'Team training & documentatie'
          : feature === '30 days post-launch support' ? '30 dagen post-lancering ondersteuning'
          : feature === 'ROI tracking & optimization' ? 'ROI tracking & optimalisatie'
          : feature
          : feature),
        ctaText: isNL
          ? tier.ctaText === 'Book Workshop' ? 'Boek Workshop'
          : tier.ctaText === 'Book a Free Process Audit' ? 'Boek een Gratis Proces Audit'
          : tier.ctaText
          : tier.ctaText
      }))
    },
    cta: {
      headline: isNL
        ? 'Klaar om te Optimaliseren?'
        : optimizePage.cta.headline,
      description: isNL
        ? 'Stop met geld verliezen aan inefficiëntie. Boek een gratis audit en ontdek hoeveel je bedrijf zou kunnen besparen.'
        : optimizePage.cta.description,
      ctaText: isNL
        ? 'Boek een Gratis Proces Audit'
        : optimizePage.cta.ctaText
    },
    meta: {
      title: isNL
        ? 'Een Bestaand Bedrijf Optimaliseren | Octomatic'
        : optimizePage.meta.title,
      description: isNL
        ? 'We identificeren de verborgen inefficiënties in je bedrijf en implementeren intelligente automatiseringssystemen die duizenden terugbrengen naar je winst.'
        : optimizePage.meta.description
    }
  };

  // Consolidated service areas from all service pages
  const serviceAreas = [
    {
      icon: Zap,
      title: isNL ? 'AI Service Fulfillment' : 'AI Service Fulfillment',
      description: isNL 
        ? 'Automatiseer uw hele service delivery proces. Van client onboarding tot project afronding, 60% sneller en 90% minder fouten.'
        : 'Automate your entire service delivery process. From client onboarding to project completion, 60% faster and 90% fewer errors.',
      metrics: isNL ? '60% sneller • 90% minder fouten • 3x meer capaciteit' : '60% faster • 90% fewer errors • 3x more capacity',
      features: [
        isNL ? 'Geautomatiseerde client onboarding' : 'Automated client onboarding',
        isNL ? 'Project delivery automatisering' : 'Project delivery automation',
        isNL ? 'AI-gedreven kwaliteitscontrole' : 'AI-driven quality control',
        isNL ? 'Intelligente communicatie' : 'Intelligent communication'
      ]
    },
    {
      icon: Database,
      title: isNL ? 'CRM Buildouts' : 'CRM Buildouts',
      description: isNL
        ? 'Een geïntegreerd systeem waar elke klantinteractie wordt vastgelegd, waardoor u nooit meer leads verliest en uw conversie met 40% stijgt.'
        : 'An integrated system where every customer interaction is captured, so you never lose leads again and your conversion increases by 40%.',
      metrics: isNL ? '40% hogere conversie • 0 verloren leads • Gecentraliseerde data' : '40% higher conversion • 0 lost leads • Centralized data',
      features: [
        isNL ? 'Lead scoring & kwalificatie' : 'Lead scoring & qualification',
        isNL ? 'Pipeline management' : 'Pipeline management',
        isNL ? 'Email integratie' : 'Email integration',
        isNL ? 'Rapportage & analytics' : 'Reporting & analytics'
      ]
    },
    {
      icon: Target,
      title: isNL ? 'Lead Generatie' : 'Lead Generation',
      description: isNL
        ? 'Een voorspelbare pijplijn van gekwalificeerde leads, zodat uw sales team kan focussen op het sluiten van deals, niet op het najagen ervan.'
        : 'A predictable pipeline of qualified leads, so your sales team can focus on closing deals, not chasing them.',
      metrics: isNL ? '3x meer leads • 60% lagere kosten • Voorspelbare pijplijn' : '3x more leads • 60% lower costs • Predictable pipeline',
      features: [
        isNL ? 'Automatische kwalificatie' : 'Automatic qualification',
        isNL ? 'Gepersonaliseerde nurturing' : 'Personalized nurturing',
        isNL ? 'Lead scoring & segmentatie' : 'Lead scoring & segmentation',
        isNL ? 'Sales handoff automatisering' : 'Sales handoff automation'
      ]
    },
    {
      icon: Users,
      title: isNL ? 'Hiring Systemen' : 'Hiring Systems',
      description: isNL
        ? 'U spreekt alleen met de top 5% van de kandidaten, waardoor u sneller betere mensen aanneemt en duizenden euro\'s aan wervingskosten bespaart.'
        : 'You only speak with the top 5% of candidates, allowing you to hire better people faster and save thousands in recruitment costs.',
      metrics: isNL ? 'Top 5% kandidaten • 3x sneller • Duizenden bespaard' : 'Top 5% candidates • 3x faster • Thousands saved',
      features: [
        isNL ? 'AI-powered screening' : 'AI-powered screening',
        isNL ? 'Geautomatiseerde interviews' : 'Automated interviews',
        isNL ? 'Smart ranking' : 'Smart ranking',
        isNL ? 'Team collaboration' : 'Team collaboration'
      ]
    },
    {
      icon: BarChart3,
      title: isNL ? 'Project Management' : 'Project Management',
      description: isNL
        ? 'Projecten die op tijd, binnen budget en met volledige transparantie worden afgerond, waardoor chaos en onzekerheid worden geëlimineerd.'
        : 'Projects that finish on time, within budget, and with complete transparency, eliminating chaos and uncertainty.',
      metrics: isNL ? '95% op tijd • 100% transparantie • Binnen budget' : '95% on time • 100% transparency • Within budget',
      features: [
        isNL ? 'Automatische status updates' : 'Automatic status updates',
        isNL ? 'Mijlpaal tracking' : 'Milestone tracking',
        isNL ? 'Resource planning' : 'Resource planning',
        isNL ? 'Rapportage & analytics' : 'Reporting & analytics'
      ]
    },
    {
      icon: FileText,
      title: isNL ? 'SOPs & Playbooks' : 'SOPs & Playbooks',
      description: isNL
        ? 'Elke medewerker weet precies wat te doen en wanneer, waardoor fouten met 80% afnemen en nieuwe teamleden 3x sneller productief worden.'
        : 'Every employee knows exactly what to do and when, reducing errors by 80% and making new team members 3x faster to productivity.',
      metrics: isNL ? '80% minder fouten • 3x sneller productief • Consistente uitvoering' : '80% fewer errors • 3x faster productive • Consistent execution',
      features: [
        isNL ? 'Aangepaste procedures' : 'Custom procedures',
        isNL ? 'Proces documentatie' : 'Process documentation',
        isNL ? 'Training materialen' : 'Training materials',
        isNL ? 'Kwaliteitscontrole workflows' : 'Quality control workflows'
      ]
    },
    {
      icon: MapPin,
      title: isNL ? 'AI Automatisering Amsterdam' : 'AI Automation Amsterdam',
      description: isNL
        ? 'Lokaal gevestigd in Naarden met diepgaande kennis van de Nederlandse markt en GDPR wetgeving. Bespaar €50.000+ per jaar met bewezen automatiseringsoplossingen.'
        : 'Locally based in Naarden with deep knowledge of the Dutch market and GDPR legislation. Save €50,000+ per year with proven automation solutions.',
      metrics: isNL ? '€50k+ besparing • GDPR compliant • Lokale expertise' : '€50k+ savings • GDPR compliant • Local expertise',
      features: [
        isNL ? 'Nederlandse marktkennis' : 'Dutch market knowledge',
        isNL ? 'GDPR compliance' : 'GDPR compliance',
        isNL ? 'Lokale ondersteuning' : 'Local support',
        isNL ? 'Nederlandse werktijden' : 'Dutch business hours'
      ]
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={content.meta.title}
        description={content.meta.description}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/optimize" : "https://www.octomatic.ai/optimize"}
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
                audience="sme"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <LiveActivity 
                page="optimize"
                showViewers={true}
                showRecentActivity={true}
              />
            </motion.div>
          </motion.div>
        </section>

      {/* Problem Section */}
      {content.problem && (
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
                {content.problem.headline}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-foreground dark:text-gray-300 leading-relaxed text-center"
              >
                {content.problem.description}
              </motion.p>
              {content.problem.calculatorCta && (
                <motion.div variants={itemVariants} className="text-center mt-8">
                  <Card className="p-8 bg-gradient-to-r from-[#4585f4]/10 to-[#6B8AE6]/10 border-[#4585f4]/20">
                    <Calculator className="h-12 w-12 text-[#4585f4] mx-auto mb-4" />
                    <p className="text-foreground dark:text-gray-300 mb-6">
                      {content.problem.calculatorCta}
                    </p>
                    <Button
                      asChild
                      className="bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white"
                    >
                      <Link href="/tools/automation-roi-calculator">
                        {content.problem.calculatorButton}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      {content.solutions && (
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white text-center"
              >
                {content.solutions.headline}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.solutions.items.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Card className="h-full p-6 bg-secondary/50 dark:bg-gray-900/50 border-border dark:border-gray-800">
                      <TrendingUp className="h-8 w-8 text-[#4585f4] mb-4" />
                      <h3 className="text-xl font-bold text-heading dark:text-white mb-2">{item.title}</h3>
                      <p className="text-muted-foreground dark:text-gray-400">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Service Areas - Consolidated from all service pages */}
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
              {isNL ? 'Onze Optimalisatie Diensten' : 'Our Optimization Services'}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-foreground dark:text-gray-300 text-center max-w-3xl mx-auto"
            >
              {isNL
                ? 'Van CRM tot recruitment, van project management tot SOPs - we helpen u elk aspect van uw bedrijf te optimaliseren.'
                : 'From CRM to recruitment, from project management to SOPs - we help you optimize every aspect of your business.'
              }
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceAreas.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Card className="h-full p-6 bg-secondary/50 dark:bg-gray-900/50 border-border dark:border-gray-800 hover:border-[#4585f4]/50 dark:hover:border-[#4585f4]/50 transition-all">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-heading dark:text-white mb-2">{service.title}</h3>
                            <p className="text-foreground dark:text-gray-300 text-sm leading-relaxed mb-3">{service.description}</p>
                            <p className="text-[#4585f4] font-semibold text-sm mb-4">{service.metrics}</p>
                            <ul className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-[#4585f4] flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground dark:text-gray-400 text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.caseStudies.items.map((study, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full p-6 bg-gray-900/50 border-gray-800">
                    <div className="space-y-4">
                      <TrendingUp className="h-8 w-8 text-[#4585f4]" />
                      <h3 className="text-xl font-bold text-heading dark:text-white">{study.title}</h3>
                      <p className="text-muted-foreground dark:text-gray-400">{study.description}</p>
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
                audience="sme"
                className="max-w-xl mx-auto"
              />
            </motion.div>
            
            {/* Live Activity */}
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <LiveActivity 
                page="optimize"
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

