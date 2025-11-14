'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { LineChart, TrendingUp, Target, CheckCircle, ArrowRight, ArrowLeft, Users, Clock, Euro } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const LeadGenerationPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  // Initialize Cal.com booking system
  useCalWorkshop();

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Services' : 'Services',
      titleNL: 'Services',
      href: isNL ? '/nl/services' : '/services',
      isCurrent: false
    },
    {
      title: isNL ? 'Lead Generatie' : 'Lead Generation',
      titleNL: 'Lead Generatie',
      href: isNL ? '/nl/services/lead-generation' : '/services/lead-generation',
      isCurrent: true
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: isNL ? "Voorspelbare pijplijn" : "Predictable pipeline",
      description: isNL 
        ? "Van willekeurige leads naar een constante stroom gekwalificeerde prospects"
        : "From random leads to a constant stream of qualified prospects"
    },
    {
      icon: Target,
      title: isNL ? "Hogere kwaliteit leads" : "Higher quality leads",
      description: isNL 
        ? "Automatische kwalificatie zorgt ervoor dat uw sales team alleen spreekt met kopers"
        : "Automatic qualification ensures your sales team only talks to buyers"
    },
    {
      icon: Clock,
      title: isNL ? "Tijd besparing" : "Time savings",
      description: isNL 
        ? "Sales team besteedt 80% minder tijd aan prospecting en meer aan sluiten"
        : "Sales team spends 80% less time prospecting and more time closing"
    },
    {
      icon: Euro,
      title: isNL ? "Lagere acquisitiekosten" : "Lower acquisition costs",
      description: isNL 
        ? "Geautomatiseerde nurturing reduceert cost-per-lead met gemiddeld 60%"
        : "Automated nurturing reduces cost-per-lead by an average of 60%"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: isNL ? "Lead Magnets & Content" : "Lead Magnets & Content",
      description: isNL 
        ? "Creëer waardevolle content die uw ideale klanten aantrekt en hun contactgegevens verzamelt"
        : "Create valuable content that attracts your ideal customers and captures their contact information"
    },
    {
      step: "2", 
      title: isNL ? "Automatische Kwalificatie" : "Automatic Qualification",
      description: isNL 
        ? "Intelligente scoring en segmentatie om kopers te identificeren voordat ze contact opnemen"
        : "Intelligent scoring and segmentation to identify buyers before they reach out"
    },
    {
      step: "3",
      title: isNL ? "Gepersonaliseerde Nurturing" : "Personalized Nurturing", 
      description: isNL 
        ? "Geautomatiseerde e-mail sequences die prospects opwarmen tot ze klaar zijn om te kopen"
        : "Automated email sequences that warm up prospects until they're ready to buy"
    },
    {
      step: "4",
      title: isNL ? "Sales Handoff" : "Sales Handoff",
      description: isNL 
        ? "Warme, gekwalificeerde leads worden automatisch doorgestuurd naar uw sales team"
        : "Warm, qualified leads are automatically passed to your sales team"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Lead Generatie Automatisering Amsterdam | Octomatic" : "Lead Generation Automation Amsterdam | Octomatic"}
        description={isNL ? "Voorspelbare pijplijn van gekwalificeerde leads. Automatische kwalificatie en nurturing zorgen dat uw sales team zich focust op sluiten, niet najagen." : "Predictable pipeline of qualified leads. Automatic qualification and nurturing ensure your sales team focuses on closing, not chasing."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/lead-generation" : "https://www.octomatic.ai/services/lead-generation"}
        keywords={isNL ? "lead generatie, automatisering, sales pipeline, Amsterdam, B2B leads" : "lead generation, automation, sales pipeline, Amsterdam, B2B leads"}
      />

      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="py-16 md:py-20 relative bg-background">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Breadcrumb */}
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="service"
                />
              </div>

              {/* Back Button */}
              <Button 
                variant="ghost" 
                asChild
                className="mb-8 hover:bg-secondary/20 group"
              >
                <Link href={isNL ? '/nl/services' : '/services'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Services' : 'Back to Services'}
                </Link>
              </Button>

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left Column - Content */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="text-xs uppercase tracking-widest text-red-400 mb-2 font-medium">
                        {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                      </div>
                      <div className="text-red-400 font-semibold mb-6 text-lg">
                        {isNL ? "Inconsistente lead flow" : "Inconsistent lead flow"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "Een voorspelbaar lead generatie systeem" : "A predictable lead generation system"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "Een voorspelbare pijplijn van gekwalificeerde leads, zodat uw sales team kan focussen op het sluiten van deals, niet op het najagen ervan."
                      ) : (
                        "A predictable pipeline of qualified leads, so your sales team can focus on closing deals, not chasing them."
                      )}
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="automation-strategy-workshop"
                        data-cal-link="kennet-timmers/workshop"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        {isNL ? "Boek Gratis Strategie Sessie" : "Book Free Strategy Session"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Visual Element */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 backdrop-blur-sm border border-border/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <LineChart className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading dark:text-white">
                              {isNL ? "Resultaat" : "Result"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "Meer gekwalificeerde leads" : "More qualified leads"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">3x</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Meer leads" : "More leads"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">60%</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Lagere kosten" : "Lower costs"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Waarom bedrijven kiezen voor onze lead generatie" : "Why businesses choose our lead generation"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van chaos naar voorspelbaarheid in uw sales pipeline"
                    : "From chaos to predictability in your sales pipeline"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-[#4585f4]/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-[#4585f4]" />
                      </div>
                      <h3 className="text-xl font-bold text-heading dark:text-white mb-4">{benefit.title}</h3>
                      <p className="text-foreground dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Ons bewezen 4-stappen proces" : "Our proven 4-step process"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van onbekende prospects naar warme, gekwalificeerde leads"
                    : "From unknown prospects to warm, qualified leads"
                  }
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-[#4585f4] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-heading dark:text-white">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-heading dark:text-white mb-4">{step.title}</h3>
                      <p className="text-lg text-foreground dark:text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 rounded-3xl border border-border/50 dark:border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                    {isNL ? "Klaar voor voorspelbare groei?" : "Ready for predictable growth?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige lead generatie proces analyseren en tonen hoe u meer gekwalificeerde leads kunt genereren."
                      : "Let us analyze your current lead generation process and show you how to generate more qualified leads."
                    }
                  </p>
                  
                  <div className="mb-6">
                    <Button 
                      size="lg" 
                      className="px-12 py-6 text-xl font-bold bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25 group"
                      data-cal-namespace="automation-strategy-workshop"
                      data-cal-link="kennet-timmers/workshop"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      {isNL ? "Boek Gratis Lead Audit" : "Book Free Lead Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "30 minuten sessie • Gratis analyse • Directe inzichten" : "30-minute session • Free analysis • Immediate insights"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
};

export default LeadGenerationPage;
