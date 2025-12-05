'use client';

import React, { Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/siteContent';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Rocket, TrendingUp, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import GridBackground from '@/components/ui/GridBackground';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

const categoryMap = {
  build: Rocket,
  optimize: TrendingUp,
  create: Sparkles,
};

const categoryLabels: Record<'build' | 'optimize' | 'create', { nl: string; en: string }> = {
  build: { nl: 'Build', en: 'Build' },
  optimize: { nl: 'Optimize', en: 'Optimize' },
  create: { nl: 'Create', en: 'Create' },
};

// Mock case study data - in production, this would come from a CMS or database
const caseStudies: Record<string, {
  clientName: string;
  category: 'build' | 'optimize' | 'create';
  challenge: { nl: string; en: string };
  process: { nl: string; en: string };
  solution: { nl: string[]; en: string[] };
  results: Array<{ metric: { nl: string; en: string }; value: string }>;
  testimonial: {
    quote: { nl: string; en: string };
    author: string;
    title: { nl: string; en: string };
  };
}> = {
  'bewuste-vakantie': {
    clientName: 'Bewuste Vakantie',
    category: 'build',
    challenge: {
      nl: 'Een startup met een visie voor duurzame vakanties had een compleet nieuw platform nodig om hun concept te realiseren. Ze hadden een duidelijk idee maar misten de technische expertise om het te bouwen.',
      en: 'A startup with a vision for sustainable vacations needed a completely new platform to realize their concept. They had a clear idea but lacked the technical expertise to build it.'
    },
    process: {
      nl: 'We startten met een diepgaande strategie sessie om de kernwaarde te definiëren en de route naar inkomsten te bepalen. Vervolgens bouwden we een robuuste, schaalbare architectuur en implementeerden we de kernfeatures met intelligente automatisering.',
      en: 'We started with an in-depth strategy session to define the core value and determine the path to revenue. Then we built a robust, scalable architecture and implemented the core features with intelligent automation.'
    },
    solution: {
      nl: [
        'Complete digitale platform architectuur',
        'Geautomatiseerde boekings- en betalingssystemen',
        'Integratie met externe API\'s voor accommodaties',
        'Gebruikersvriendelijk dashboard voor klanten',
        'Admin panel voor beheer',
        'Mobiele responsieve design'
      ],
      en: [
        'Complete digital platform architecture',
        'Automated booking and payment systems',
        'Integration with external APIs for accommodations',
        'User-friendly customer dashboard',
        'Admin panel for management',
        'Mobile responsive design'
      ]
    },
    results: [
      { metric: { nl: 'Lancering', en: 'Launch' }, value: 'Succesvol gelanceerd' },
      { metric: { nl: 'Gebruikers', en: 'Users' }, value: '150+ beta gebruikers' },
      { metric: { nl: 'Tijd tot markt', en: 'Time to Market' }, value: '30 dagen' }
    ],
    testimonial: {
      quote: {
        nl: 'De samenwerking met Octomatic heeft niet alleen ons probleem opgelost, maar de manier waarop we werken fundamenteel veranderd.',
        en: 'Working with Octomatic didn\'t just solve our problem, it fundamentally changed the way we work.'
      },
      author: 'Naam Klant',
      title: { nl: 'Oprichter', en: 'Founder' }
    }
  },
  'automation-client': {
    clientName: '[Automation Client]',
    category: 'optimize',
    challenge: {
      nl: 'Een groeiend bedrijf worstelde met handmatige processen die 20+ uur per week kostten. De operationele chaos belemmerde groei en kostte geld.',
      en: 'A growing company struggled with manual processes that cost 20+ hours per week. Operational chaos hindered growth and cost money.'
    },
    process: {
      nl: 'We voerden een complete procesaudit uit en identificeerden de grootste inefficiënties. Vervolgens implementeerden we intelligente automatisering die de handmatige taken elimineerde.',
      en: 'We conducted a complete process audit and identified the biggest inefficiencies. Then we implemented intelligent automation that eliminated manual tasks.'
    },
    solution: {
      nl: [
        'CRM integratie en automatisering',
        'Geautomatiseerde data entry workflows',
        'Email automatisering voor klantcommunicatie',
        'Rapportage en analytics dashboard',
        'Procesdocumentatie en training'
      ],
      en: [
        'CRM integration and automation',
        'Automated data entry workflows',
        'Email automation for customer communication',
        'Reporting and analytics dashboard',
        'Process documentation and training'
      ]
    },
    results: [
      { metric: { nl: 'Tijdsbesparing', en: 'Time Saved' }, value: '-20 uur/week' },
      { metric: { nl: 'Kostenbesparing', en: 'Cost Savings' }, value: '€42,000/jaar' },
      { metric: { nl: 'Productiviteit', en: 'Productivity' }, value: '+60%' }
    ],
    testimonial: {
      quote: {
        nl: 'De samenwerking met Octomatic heeft niet alleen ons probleem opgelost, maar de manier waarop we werken fundamenteel veranderd.',
        en: 'Working with Octomatic didn\'t just solve our problem, it fundamentally changed the way we work.'
      },
      author: 'Naam Klant',
      title: { nl: 'CEO', en: 'CEO' }
    }
  },
  'black-swan-capitalist': {
    clientName: 'Black Swan Capitalist',
    category: 'create',
    challenge: {
      nl: 'Een YouTube-kanaal met 500K+ abonnees had behoefte aan hoogwaardige, AI-gedreven visuele content om de kijkerretentie te verbeteren en engagement te verhogen.',
      en: 'A YouTube channel with 500K+ subscribers needed high-quality, AI-driven visual content to improve viewer retention and increase engagement.'
    },
    process: {
      nl: 'We analyseerden het bestaande content format en ontwikkelden een strategie voor AI-gedreven B-roll die perfect aansloot bij de verhalende stijl. Vervolgens produceerden we een bibliotheek van verbluffende visuals.',
      en: 'We analyzed the existing content format and developed a strategy for AI-driven B-roll that perfectly matched the narrative style. Then we produced a library of stunning visuals.'
    },
    solution: {
      nl: [
        'AI-gedreven B-roll productie',
        'Bibliotheek van 50+ hoogwaardige visuals',
        '4K resolutie voor alle content',
        'Aangepaste formats voor verschillende platforms',
        'Snelle levering binnen 3 dagen',
        'Revisie mogelijkheden'
      ],
      en: [
        'AI-driven B-roll production',
        'Library of 50+ high-quality visuals',
        '4K resolution for all content',
        'Custom formats for different platforms',
        'Fast delivery within 3 days',
        'Revision options'
      ]
    },
    results: [
      { metric: { nl: 'Kijker retentie', en: 'Viewer Retention' }, value: '+70%' },
      { metric: { nl: 'Views', en: 'Views' }, value: '2.3M+' },
      { metric: { nl: 'Engagement', en: 'Engagement' }, value: '+45%' }
    ],
    testimonial: {
      quote: {
        nl: 'De samenwerking met Octomatic heeft niet alleen ons probleem opgelost, maar de manier waarop we werken fundamenteel veranderd.',
        en: 'Working with Octomatic didn\'t just solve our problem, it fundamentally changed the way we work.'
      },
      author: 'Black Swan Capitalist',
      title: { nl: 'YouTube Creator', en: 'YouTube Creator' }
    }
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const caseStudy = caseStudies[slug];

  if (!caseStudy) {
    notFound();
  }

  const Icon = categoryMap[caseStudy.category];
  const categoryLabel = categoryLabels[caseStudy.category][isNL ? 'nl' : 'en'];

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
    },
    {
      title: caseStudy.clientName,
      titleNL: caseStudy.clientName,
      href: isNL ? `/nl/projecten/${slug}` : `/projecten/${slug}`,
      isCurrent: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={`${caseStudy.clientName} - ${isNL ? 'Case Study' : 'Case Study'} | Octomatic`}
        description={(isNL ? caseStudy.challenge.nl : caseStudy.challenge.en).substring(0, 160)}
        canonicalUrl={isNL ? `https://www.octomatic.ai/nl/projecten/${slug}` : `https://www.octomatic.ai/projecten/${slug}`}
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
                <Link href={isNL ? '/nl/projecten' : '/projecten'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Projecten' : 'Back to Projects'}
                </Link>
              </Button>

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <div className="w-12 h-12 rounded-xl bg-[#4585f4]/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[#4585f4]" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-[#4585f4] uppercase tracking-wide">
                      {categoryLabel}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    {caseStudy.clientName}
                  </h1>
                </motion.div>
              </div>
            </div>
          </section>

          {/* The Challenge */}
          <section className="py-24 px-4 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {isNL ? 'De Uitdaging' : 'The Challenge'}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {caseStudy.challenge[isNL ? 'nl' : 'en']}
                </p>
              </motion.div>
            </div>
          </section>

          {/* The Process */}
          <section className="py-24 px-4 bg-gray-900/30 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {isNL ? 'Het Proces' : 'The Process'}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {caseStudy.process[isNL ? 'nl' : 'en']}
                </p>
              </motion.div>
            </div>
          </section>

          {/* The Solution */}
          <section className="py-24 px-4 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {isNL ? 'De Oplossing' : 'The Solution'}
                </h2>
                <ul className="space-y-4">
                  {caseStudy.solution[isNL ? 'nl' : 'en'].map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#4585f4]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-[#4585f4]" />
                      </div>
                      <p className="text-lg text-gray-300 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* The Results */}
          <section className="py-24 px-4 bg-gray-900/30 relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {isNL ? 'De Resultaten' : 'The Results'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-[#4585f4] mb-2">{result.value}</div>
                      <div className="text-sm text-gray-300">{result.metric[isNL ? 'nl' : 'en']}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <blockquote className="text-gray-300 italic mb-4 leading-relaxed text-lg">
                        "{caseStudy.testimonial.quote[isNL ? 'nl' : 'en']}"
                      </blockquote>
                      <cite className="text-sm text-gray-400 not-italic">
                        — {caseStudy.testimonial.author}, {caseStudy.testimonial.title[isNL ? 'nl' : 'en']}
                      </cite>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}

