'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Brain, Database, Users, TrendingUp, CheckCircle, ArrowRight, ArrowLeft, Zap, Shield, Calendar } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const CRMBuildoutsPage: React.FC = () => {
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
      title: isNL ? 'CRM Buildouts' : 'CRM Buildouts',
      titleNL: 'CRM Buildouts',
      href: isNL ? '/nl/services/crm-buildouts' : '/services/crm-buildouts',
      isCurrent: true
    }
  ];

  const benefits = [
    {
      icon: Database,
      title: isNL ? "Gecentraliseerde data" : "Centralized data",
      description: isNL 
        ? "Alle klantinformatie op één plek, geen verloren leads meer"
        : "All customer information in one place, no more lost leads"
    },
    {
      icon: TrendingUp,
      title: isNL ? "40% hogere conversie" : "40% higher conversion",
      description: isNL 
        ? "Geautomatiseerde follow-ups en nurturing verhogen uw sluitingspercentage"
        : "Automated follow-ups and nurturing increase your closing rate"
    },
    {
      icon: Users,
      title: isNL ? "Team transparantie" : "Team transparency",
      description: isNL 
        ? "Iedereen ziet waar elke klant staat in het verkoopproces"
        : "Everyone sees where every customer stands in the sales process"
    },
    {
      icon: Zap,
      title: isNL ? "Snellere response" : "Faster response",
      description: isNL 
        ? "Automatische notificaties zorgen voor directe reactie op leads"
        : "Automatic notifications ensure immediate response to leads"
    }
  ];

  const features = [
    {
      title: isNL ? "Lead Scoring & Kwalificatie" : "Lead Scoring & Qualification",
      description: isNL 
        ? "Automatische scoring op basis van gedrag en bedrijfsprofiel"
        : "Automatic scoring based on behavior and company profile"
    },
    {
      title: isNL ? "Pipeline Management" : "Pipeline Management", 
      description: isNL 
        ? "Visuele pijplijn met geautomatiseerde fase-overgangen"
        : "Visual pipeline with automated stage transitions"
    },
    {
      title: isNL ? "Email Integratie" : "Email Integration",
      description: isNL 
        ? "Alle communicatie wordt automatisch gekoppeld aan klantprofielen"
        : "All communication is automatically linked to customer profiles"
    },
    {
      title: isNL ? "Rapportage & Analytics" : "Reporting & Analytics",
      description: isNL 
        ? "Real-time inzichten in sales performance en conversie trends"
        : "Real-time insights into sales performance and conversion trends"
    },
    {
      title: isNL ? "Task Automatisering" : "Task Automation",
      description: isNL 
        ? "Automatische taken en herinneringen voor follow-ups"
        : "Automatic tasks and reminders for follow-ups"
    },
    {
      title: isNL ? "Integraties" : "Integrations",
      description: isNL 
        ? "Naadloze verbinding met uw bestaande tools en systemen"
        : "Seamless connection with your existing tools and systems"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "CRM Buildouts & Automatisering Amsterdam | Octomatic" : "CRM Buildouts & Automation Amsterdam | Octomatic"}
        description={isNL ? "Geïntegreerd CRM systeem waar elke klantinteractie wordt vastgelegd. Verlies nooit meer leads en verhoog conversie met 40%." : "Integrated CRM system where every customer interaction is captured. Never lose leads again and increase conversion by 40%."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/crm-buildouts" : "https://www.octomatic.ai/services/crm-buildouts"}
        keywords={isNL ? "CRM systeem, klantbeheer, automatisering, Amsterdam, sales pipeline" : "CRM system, customer management, automation, Amsterdam, sales pipeline"}
      />

      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="py-32 md:py-40 relative bg-background">
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
                        {isNL ? "Verspreide klantdata" : "Scattered customer data"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "Een geïntegreerd CRM systeem" : "An integrated CRM system"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "Een geïntegreerd systeem waar elke klantinteractie wordt vastgelegd, waardoor u nooit meer leads verliest en uw conversie met 40% stijgt."
                      ) : (
                        "An integrated system where every customer interaction is captured, so you never lose leads again and your conversion increases by 40%."
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
                        <Calendar className="mr-2 h-5 w-5" />
                        {isNL ? "Krijg Je Gratis CRM Audit" : "Get Your Free CRM Audit"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        variant="outline"
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold border-2 border-[#4585f4] text-[#4585f4] hover:bg-[#4585f4]/10 transition-all duration-300 group"
                        onClick={() => {
                          const element = document.getElementById('benefits');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {isNL ? "Zie Hoeveel Je Kunt Besparen" : "See How Much You Can Save"}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Visual Element */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 backdrop-blur-sm border border-border/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <Brain className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading dark:text-white">
                              {isNL ? "Geïntegreerd systeem" : "Integrated system"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "Alle klantdata centraal" : "All customer data centralized"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">40%</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Hogere conversie" : "Higher conversion"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">0</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Verloren leads" : "Lost leads"}
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
          <section id="benefits" className="py-32 md:py-40 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Voordelen van een geïntegreerd CRM" : "Benefits of an integrated CRM"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van chaos naar complete controle over uw klantrelaties"
                    : "From chaos to complete control over your customer relationships"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

          {/* Features Section */}
          <section className="py-32 md:py-40 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Wat u krijgt in uw CRM systeem" : "What you get in your CRM system"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Complete functionaliteit afgestemd op uw bedrijfsprocessen"
                    : "Complete functionality tailored to your business processes"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-8 h-8 bg-[#4585f4]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-[#4585f4]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-heading dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-foreground dark:text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 md:py-40 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 rounded-3xl border border-border/50 dark:border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                    {isNL ? "Klaar om uw klantdata te centraliseren?" : "Ready to centralize your customer data?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige CRM situatie analyseren en tonen hoe u meer waarde uit uw klantdata kunt halen."
                      : "Let us analyze your current CRM situation and show you how to get more value from your customer data."
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
                      <Calendar className="mr-3 h-6 w-6" />
                      {isNL ? "Krijg Je Gratis CRM Audit" : "Get Your Free CRM Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground dark:text-gray-500 mb-4">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4585f4]" />
                      {isNL ? "45 minuten sessie" : "45-minute session"}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4585f4]" />
                      {isNL ? "Gratis analyse" : "Free analysis"}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4585f4]" />
                      {isNL ? "Implementatie roadmap" : "Implementation roadmap"}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground dark:text-gray-500 italic">
                    {isNL ? "Beperkte plekken deze maand • Volgende beschikbaar: binnen 48 uur" : "Limited spots this month • Next available: within 48 hours"}
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

export default CRMBuildoutsPage;
