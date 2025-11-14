'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Calendar, ArrowRight, ArrowLeft, CheckCircle, Clock, Euro, Shield, Target, Zap } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop, useCalIntroCall } from '@/hooks/use-cal';
import LiveActivity from '@/components/realtime/LiveActivity';
import SmartCTA from '@/components/personalization/SmartCTA';

const GetStartedPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  useCalWorkshop();
  useCalIntroCall();

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Aan de Slag' : 'Get Started',
      titleNL: 'Aan de Slag',
      href: isNL ? '/nl/get-started' : '/get-started',
      isCurrent: true
    }
  ];

  const steps = [
    {
      step: "1",
      title: isNL ? "Gratis Kennismakingsgesprek" : "Free Introduction Call",
      duration: isNL ? "15 minuten" : "15 minutes",
      description: isNL 
        ? "Een kort gesprek om uw situatie en doelen te begrijpen"
        : "A brief call to understand your situation and goals",
      cta: isNL ? "Boek Kennismaking" : "Book Introduction",
      calNamespace: "intro-call"
    },
    {
      step: "2", 
      title: isNL ? "Value Stream Mapping Workshop" : "Value Stream Mapping Workshop",
      duration: isNL ? "4 uur" : "4 hours",
      description: isNL 
        ? "Diepgaande analyse van uw processen om de grootste kansen te identificeren"
        : "In-depth analysis of your processes to identify the biggest opportunities",
      cta: isNL ? "Boek Workshop" : "Book Workshop",
      calNamespace: "automation-strategy-workshop"
    },
    {
      step: "3",
      title: isNL ? "Implementatie & Training" : "Implementation & Training",
      duration: isNL ? "2-8 weken" : "2-8 weeks",
      description: isNL 
        ? "We implementeren de oplossingen en trainen uw team voor soepele adoptie"
        : "We implement the solutions and train your team for smooth adoption",
      cta: isNL ? "Na Workshop" : "After Workshop",
      calNamespace: null
    }
  ];

  const guarantees = [
    {
      icon: Euro,
      title: isNL ? "€15.000+ ROI Garantie" : "€15,000+ ROI Guarantee",
      description: isNL 
        ? "We vinden minimaal €15k aan besparingen of de workshop is gratis"
        : "We find at least €15k in savings or the workshop is free"
    },
    {
      icon: Clock,
      title: isNL ? "90 Dagen Resultaat" : "90 Day Results",
      description: isNL 
        ? "Zichtbare verbetering in uw processen binnen 90 dagen"
        : "Visible improvement in your processes within 90 days"
    },
    {
      icon: Shield,
      title: isNL ? "Volledige Training" : "Complete Training",
      description: isNL 
        ? "Uw team is volledig opgeleid voordat we het project afronden"
        : "Your team is fully trained before we complete the project"
    }
  ];

  const pricing = [
    {
      title: isNL ? "Kennismakingsgesprek" : "Introduction Call",
      price: isNL ? "Gratis" : "Free",
      duration: isNL ? "15 minuten" : "15 minutes",
      features: [
        isNL ? "Situatie analyse" : "Situation analysis",
        isNL ? "Doelen bepalen" : "Goal setting",
        isNL ? "Geschiktheid check" : "Suitability check"
      ]
    },
    {
      title: isNL ? "Strategy Workshop" : "Strategy Workshop",
      price: "€1.497",
      duration: isNL ? "4 uur" : "4 hours",
      features: [
        isNL ? "Proces analyse" : "Process analysis",
        isNL ? "ROI berekening" : "ROI calculation",
        isNL ? "Implementatie roadmap" : "Implementation roadmap",
        isNL ? "€15k+ garantie" : "€15k+ guarantee"
      ],
      popular: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Aan de Slag met AI Automatisering | Octomatic Amsterdam" : "Get Started with AI Automation | Octomatic Amsterdam"}
        description={isNL ? "Start uw automatiseringsreis. Gratis kennismakingsgesprek, gevolgd door onze bewezen Value Stream Mapping Workshop. €15k+ ROI gegarandeerd." : "Start your automation journey. Free introduction call, followed by our proven Value Stream Mapping Workshop. €15k+ ROI guaranteed."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/get-started" : "https://www.octomatic.ai/get-started"}
        keywords={isNL ? "automatisering starten, gratis gesprek, workshop, Amsterdam, ROI" : "start automation, free call, workshop, Amsterdam, ROI"}
      />

      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        <div className="min-h-screen bg-background">
          <section className="py-16 md:py-20 relative bg-background">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="service"
                />
              </div>

              <Button 
                variant="ghost" 
                asChild
                className="mb-8 hover:bg-secondary/20 group"
              >
                <Link href={isNL ? '/nl' : '/'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Home' : 'Back to Home'}
                </Link>
              </Button>

              <div className="max-w-7xl mx-auto text-center">
                <div className="space-y-6 mb-16">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                    {isNL ? "Start uw automatiseringsreis" : "Start your automation journey"}
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto"></div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {isNL ? (
                      "Van gratis kennismakingsgesprek tot volledige implementatie. Onze bewezen aanpak zorgt voor gegarandeerde resultaten."
                    ) : (
                      "From free introduction call to full implementation. Our proven approach ensures guaranteed results."
                    )}
                  </h2>
                  
                  {/* AI-Powered Smart CTA */}
                  <div className="mt-8">
                    <SmartCTA 
                      section="hero"
                      audience="universal"
                      className="max-w-xl mx-auto"
                    />
                  </div>
                  
                  {/* Live Activity */}
                  <div className="mt-6 flex justify-center">
                    <LiveActivity 
                      page="get-started"
                      showViewers={true}
                      showRecentActivity={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Ons 3-stappen proces" : "Our 3-step process"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van eerste gesprek tot volledige automatisering"
                    : "From first conversation to full automation"
                  }
                </p>
              </div>

              <div className="max-w-5xl mx-auto space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-3xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                      <div className="flex items-center gap-6 lg:w-2/3">
                        <div className="w-16 h-16 bg-[#4585f4] rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-white dark:text-white">{step.step}</span>
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                          <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                            <h3 className="text-2xl font-bold text-heading dark:text-white">{step.title}</h3>
                            <span className="bg-[#4585f4]/20 text-[#4585f4] px-3 py-1 rounded-full text-sm font-medium">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-lg text-foreground dark:text-gray-300 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="lg:w-1/3 flex justify-center">
                        {step.calNamespace ? (
                          <Button 
                            size="lg" 
                            className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                            data-cal-namespace={step.calNamespace}
                            data-cal-link={`kennet-timmers/${step.calNamespace === 'intro-call' ? 'intro-call' : 'workshop'}`}
                            data-cal-config='{"layout":"month_view"}'
                          >
                            <Calendar className="mr-2 h-5 w-5" />
                            {step.cta}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        ) : (
                          <div className="bg-secondary/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-700/50 rounded-xl px-6 py-3">
                            <span className="text-muted-foreground dark:text-gray-400 font-medium">{step.cta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guarantees */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Onze garanties" : "Our guarantees"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "We staan achter onze resultaten met concrete garanties"
                    : "We stand behind our results with concrete guarantees"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {guarantees.map((guarantee, index) => {
                  const Icon = guarantee.icon;
                  return (
                    <div key={index} className="bg-green-900/20 border border-green-800/30 rounded-2xl p-8 text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-heading dark:text-white mb-4">{guarantee.title}</h3>
                      <p className="text-foreground dark:text-gray-300 leading-relaxed">{guarantee.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Transparante prijzen" : "Transparent pricing"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Geen verborgen kosten, geen verrassingen"
                    : "No hidden costs, no surprises"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricing.map((plan, index) => (
                  <div key={index} className={`relative bg-secondary/20 dark:bg-gray-900/20 border rounded-3xl p-8 ${plan.popular ? 'border-[#4585f4] dark:border-[#4585f4] bg-[#4585f4]/5 dark:bg-[#4585f4]/5' : 'border-border/50 dark:border-gray-800/50'}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[#4585f4] text-white px-6 py-2 rounded-full text-sm font-semibold">
                          {isNL ? 'Meest Populair' : 'Most Popular'}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-heading dark:text-white mb-4">{plan.title}</h3>
                      <div className="text-4xl font-bold text-[#4585f4] mb-2">{plan.price}</div>
                      <div className="text-muted-foreground dark:text-gray-400">{plan.duration}</div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-[#4585f4]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-[#4585f4]" />
                          </div>
                          <p className="text-foreground dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="lg" 
                      className={`w-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-xl group ${
                        plan.popular 
                          ? 'bg-[#4585f4] hover:bg-[#4585f4]/90 text-white hover:shadow-[#4585f4]/25' 
                          : 'bg-secondary dark:bg-gray-800 hover:bg-secondary/80 dark:hover:bg-gray-700 text-white'
                      }`}
                      data-cal-namespace={index === 0 ? "intro-call" : "automation-strategy-workshop"}
                      data-cal-link={`kennet-timmers/${index === 0 ? 'intro-call' : 'workshop'}`}
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      {isNL ? 'Boek Nu' : 'Book Now'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 rounded-3xl border border-border/50 dark:border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                    {isNL ? "Klaar om te beginnen?" : "Ready to get started?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Begin met een gratis kennismakingsgesprek van 15 minuten. Geen verplichtingen, alleen een eerlijk gesprek over uw automatiseringsmogelijkheden."
                      : "Start with a free 15-minute introduction call. No obligations, just an honest conversation about your automation opportunities."
                    }
                  </p>
                  
                  <div className="mb-6">
                    <Button 
                      size="lg" 
                      className="px-12 py-6 text-xl font-bold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                      data-cal-namespace="intro-call"
                      data-cal-link="kennet-timmers/intro-call"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <Calendar className="mr-3 h-6 w-6" />
                      {isNL ? "Start Gratis Gesprek" : "Start Free Call"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "15 minuten • Gratis • Geen verplichtingen" : "15 minutes • Free • No obligations"}
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

export default GetStartedPage;
