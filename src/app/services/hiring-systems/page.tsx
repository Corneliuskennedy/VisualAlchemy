'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Users, Target, Clock, Euro, CheckCircle, ArrowRight, ArrowLeft, Filter, Star, MessageSquare } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const HiringSystemsPage: React.FC = () => {
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
      title: isNL ? 'Hiring Systemen' : 'Hiring Systems',
      titleNL: 'Hiring Systemen',
      href: isNL ? '/nl/services/hiring-systems' : '/services/hiring-systems',
      isCurrent: true
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: isNL ? "Top 5% kandidaten" : "Top 5% candidates",
      description: isNL 
        ? "Spreek alleen met de beste kandidaten door automatische pre-screening"
        : "Only speak with the best candidates through automatic pre-screening"
    },
    {
      icon: Clock,
      title: isNL ? "3x sneller aannemen" : "3x faster hiring",
      description: isNL 
        ? "Van vacature tot contract in weken, niet maanden"
        : "From job posting to contract in weeks, not months"
    },
    {
      icon: Euro,
      title: isNL ? "Duizenden besparen" : "Save thousands",
      description: isNL 
        ? "Geen dure recruitment bureaus meer nodig"
        : "No more expensive recruitment agencies needed"
    },
    {
      icon: Star,
      title: isNL ? "Betere match" : "Better matches",
      description: isNL 
        ? "Data-gedreven matching zorgt voor langere werkrelaties"
        : "Data-driven matching ensures longer employment relationships"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: isNL ? "Automatische Job Posting" : "Automatic Job Posting",
      description: isNL 
        ? "Vacatures worden automatisch geplaatst op alle relevante platforms"
        : "Job postings are automatically placed on all relevant platforms"
    },
    {
      step: "2", 
      title: isNL ? "AI-Powered Screening" : "AI-Powered Screening",
      description: isNL 
        ? "Kandidaten worden automatisch gescreend op vaardigheden en cultuur fit"
        : "Candidates are automatically screened for skills and culture fit"
    },
    {
      step: "3",
      title: isNL ? "Geautomatiseerde Interviews" : "Automated Interviews", 
      description: isNL 
        ? "Video interviews worden automatisch ingepland en beoordeeld"
        : "Video interviews are automatically scheduled and assessed"
    },
    {
      step: "4",
      title: isNL ? "Smart Ranking" : "Smart Ranking",
      description: isNL 
        ? "Kandidaten worden gerangschikt op basis van fit en potentieel"
        : "Candidates are ranked based on fit and potential"
    }
  ];

  const features = [
    {
      icon: Filter,
      title: isNL ? "Automatische Pre-screening" : "Automatic Pre-screening",
      description: isNL 
        ? "Kandidaten worden gefilterd op basis van uw criteria voordat u ze ziet"
        : "Candidates are filtered based on your criteria before you see them"
    },
    {
      icon: MessageSquare,
      title: isNL ? "Geautomatiseerde Communicatie" : "Automated Communication",
      description: isNL 
        ? "Kandidaten ontvangen automatisch updates over hun status"
        : "Candidates automatically receive updates about their status"
    },
    {
      icon: Users,
      title: isNL ? "Team Collaboration" : "Team Collaboration",
      description: isNL 
        ? "Uw hele team kan kandidaten beoordelen en feedback geven"
        : "Your entire team can evaluate candidates and provide feedback"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Hiring Systemen & Recruitment Automatisering Amsterdam | Octomatic" : "Hiring Systems & Recruitment Automation Amsterdam | Octomatic"}
        description={isNL ? "Geautomatiseerde talent pijplijn. Spreek alleen met de top 5% kandidaten, neem sneller betere mensen aan en bespaar duizenden euro's aan wervingskosten." : "Automated talent pipeline. Only speak with the top 5% of candidates, hire better people faster and save thousands in recruitment costs."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/hiring-systems" : "https://www.octomatic.ai/services/hiring-systems"}
        keywords={isNL ? "recruitment automatisering, hiring systemen, talent acquisitie, Amsterdam, HR automatisering" : "recruitment automation, hiring systems, talent acquisition, Amsterdam, HR automation"}
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
                        {isNL ? "Trage werving" : "Slow hiring"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "Een geautomatiseerde talent pijplijn" : "An automated talent pipeline"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "U spreekt alleen met de top 5% van de kandidaten, waardoor u sneller betere mensen aanneemt en duizenden euro's aan wervingskosten bespaart."
                      ) : (
                        "You only speak with the top 5% of candidates, allowing you to hire better people faster and save thousands in recruitment costs."
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
                        {isNL ? "Boek Hiring Analyse" : "Book Hiring Analysis"}
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
                            <Users className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading dark:text-white">
                              {isNL ? "Geautomatiseerde talent pijplijn" : "Automated talent pipeline"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "Alleen top kandidaten" : "Only top candidates"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">5%</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Top kandidaten" : "Top candidates"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">3x</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Sneller" : "Faster"}
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
                  {isNL ? "Waarom automatiseren van recruitment werkt" : "Why automating recruitment works"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van weken zoeken naar dagen beslissen"
                    : "From weeks of searching to days of deciding"
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
                  {isNL ? "Ons 4-stappen hiring proces" : "Our 4-step hiring process"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van vacature tot de perfecte kandidaat"
                    : "From job posting to the perfect candidate"
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

          {/* Features Section */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Slimme features voor betere hiring" : "Smart features for better hiring"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 text-center">
                      <div className="w-16 h-16 bg-[#4585f4]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-[#4585f4]" />
                      </div>
                      <h3 className="text-xl font-bold text-heading dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-foreground dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 rounded-3xl border border-border/50 dark:border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                    {isNL ? "Klaar om sneller te huren?" : "Ready to hire faster?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige recruitment proces analyseren en tonen hoe u de beste kandidaten sneller kunt vinden."
                      : "Let us analyze your current recruitment process and show you how to find the best candidates faster."
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
                      {isNL ? "Boek Gratis Hiring Audit" : "Book Free Hiring Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "30 minuten sessie • Gratis analyse • Hiring roadmap" : "30-minute session • Free analysis • Hiring roadmap"}
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

export default HiringSystemsPage;
