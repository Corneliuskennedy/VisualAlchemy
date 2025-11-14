'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Zap, Users, Target, Euro, CheckCircle, ArrowRight, ArrowLeft, Clock, BarChart3, Shield } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const AIServiceFulfillmentPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  useCalWorkshop();

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
      title: isNL ? 'AI Service Fulfillment' : 'AI Service Fulfillment',
      titleNL: 'AI Service Fulfillment',
      href: isNL ? '/nl/services/ai-service-fulfillment' : '/services/ai-service-fulfillment',
      isCurrent: true
    }
  ];

  const fulfillmentAreas = [
    {
      icon: Users,
      title: isNL ? "Client Onboarding" : "Client Onboarding",
      description: isNL 
        ? "Automatische welkomstsequenties, documentverzameling en projectopstart"
        : "Automatic welcome sequences, document collection and project kickoff",
      features: [
        isNL ? "Geautomatiseerde intake formulieren" : "Automated intake forms",
        isNL ? "Document upload en verwerking" : "Document upload and processing",
        isNL ? "Project setup automatisering" : "Project setup automation"
      ]
    },
    {
      icon: Target,
      title: isNL ? "Project Delivery" : "Project Delivery",
      description: isNL 
        ? "Gestroomlijnde projectuitvoering met geautomatiseerde mijlpalen en rapportage"
        : "Streamlined project execution with automated milestones and reporting",
      features: [
        isNL ? "Automatische status updates" : "Automatic status updates",
        isNL ? "Mijlpaal tracking" : "Milestone tracking",
        isNL ? "Client rapportage" : "Client reporting"
      ]
    },
    {
      icon: BarChart3,
      title: isNL ? "Quality Assurance" : "Quality Assurance",
      description: isNL 
        ? "AI-gedreven kwaliteitscontrole en automatische testing van deliverables"
        : "AI-driven quality control and automatic testing of deliverables",
      features: [
        isNL ? "Geautomatiseerde testing" : "Automated testing",
        isNL ? "Kwaliteitscontrole workflows" : "Quality control workflows",
        isNL ? "Performance monitoring" : "Performance monitoring"
      ]
    },
    {
      icon: Shield,
      title: isNL ? "Client Communication" : "Client Communication",
      description: isNL 
        ? "Intelligente communicatie automatisering voor betere client ervaring"
        : "Intelligent communication automation for better client experience",
      features: [
        isNL ? "Automatische updates" : "Automatic updates",
        isNL ? "Smart notificaties" : "Smart notifications",
        isNL ? "Feedback verzameling" : "Feedback collection"
      ]
    }
  ];

  const benefits = [
    {
      metric: "60%",
      label: isNL ? "Snellere delivery" : "Faster delivery",
      description: isNL ? "Door geautomatiseerde processen" : "Through automated processes"
    },
    {
      metric: "90%",
      label: isNL ? "Minder fouten" : "Fewer errors",
      description: isNL ? "AI-gedreven kwaliteitscontrole" : "AI-driven quality control"
    },
    {
      metric: "24/7",
      label: isNL ? "Beschikbaarheid" : "Availability",
      description: isNL ? "Geautomatiseerde systemen" : "Automated systems"
    },
    {
      metric: "3x",
      label: isNL ? "Meer capaciteit" : "More capacity",
      description: isNL ? "Zonder extra personeel" : "Without additional staff"
    }
  ];

  const useCases = [
    {
      industry: isNL ? "Marketing Agencies" : "Marketing Agencies",
      challenge: isNL 
        ? "Handmatige campagne setup, client rapportage en performance tracking"
        : "Manual campaign setup, client reporting and performance tracking",
      solution: isNL
        ? "Geautomatiseerde campagne deployment, real-time dashboards en AI-gedreven optimalisatie"
        : "Automated campaign deployment, real-time dashboards and AI-driven optimization",
      result: isNL ? "70% snellere campagne launches" : "70% faster campaign launches"
    },
    {
      industry: isNL ? "Web Development" : "Web Development",
      challenge: isNL 
        ? "Repetitieve development tasks, testing en deployment processen"
        : "Repetitive development tasks, testing and deployment processes",
      solution: isNL
        ? "CI/CD automatisering, geautomatiseerde testing en deployment pipelines"
        : "CI/CD automation, automated testing and deployment pipelines",
      result: isNL ? "50% kortere development cycles" : "50% shorter development cycles"
    },
    {
      industry: isNL ? "Consulting Services" : "Consulting Services",
      challenge: isNL 
        ? "Tijdrovende research, rapportage en client communicatie"
        : "Time-consuming research, reporting and client communication",
      solution: isNL
        ? "AI research assistenten, geautomatiseerde rapportage en smart scheduling"
        : "AI research assistants, automated reporting and smart scheduling",
      result: isNL ? "40% meer billable hours" : "40% more billable hours"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "AI Service Fulfillment Automatisering | Octomatic" : "AI Service Fulfillment Automation | Octomatic"}
        description={isNL ? "Automatiseer uw service delivery met AI. 60% snellere uitvoering, 90% minder fouten, 3x meer capaciteit. Gespecialiseerd in agencies en consultancy." : "Automate your service delivery with AI. 60% faster execution, 90% fewer errors, 3x more capacity. Specialized in agencies and consultancy."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/ai-service-fulfillment" : "https://www.octomatic.ai/services/ai-service-fulfillment"}
        keywords={isNL ? "service fulfillment, AI automatisering, agencies, consultancy, project delivery" : "service fulfillment, AI automation, agencies, consultancy, project delivery"}
        serviceType="AI Service Fulfillment"
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
                <Link href={isNL ? '/nl/services' : '/services'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Services' : 'Back to Services'}
                </Link>
              </Button>

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="text-xs uppercase tracking-widest text-red-400 mb-2 font-medium">
                        {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                      </div>
                      <div className="text-red-400 font-semibold mb-6 text-lg">
                        {isNL ? "Handmatige service delivery" : "Manual service delivery"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "AI Service Fulfillment automatisering" : "AI Service Fulfillment automation"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "Automatiseer uw hele service delivery proces. Van client onboarding tot project afronding, 60% sneller en 90% minder fouten."
                      ) : (
                        "Automate your entire service delivery process. From client onboarding to project completion, 60% faster and 90% fewer errors."
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
                        {isNL ? "Boek Service Audit" : "Book Service Audit"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 backdrop-blur-sm border border-border/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <Zap className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading dark:text-white">
                              {isNL ? "Geautomatiseerde delivery" : "Automated delivery"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "Van start tot finish" : "From start to finish"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">60%</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Sneller" : "Faster"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">3x</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Meer capaciteit" : "More capacity"}
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

          {/* Benefits */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Service fulfillment resultaten" : "Service fulfillment results"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Bewezen resultaten van geautomatiseerde service delivery"
                    : "Proven results from automated service delivery"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 text-center hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-4">{benefit.metric}</div>
                    <div className="text-lg font-semibold text-heading dark:text-white mb-2">{benefit.label}</div>
                    <div className="text-muted-foreground dark:text-gray-400 text-sm">{benefit.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fulfillment Areas */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Automatisering gebieden" : "Automation areas"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Elke stap van uw service delivery kan geautomatiseerd worden"
                    : "Every step of your service delivery can be automated"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fulfillmentAreas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#4585f4]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-heading dark:text-white mb-3">{area.title}</h3>
                          <p className="text-foreground dark:text-gray-300 leading-relaxed">{area.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {area.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-[#4585f4]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-[#4585f4]" />
                            </div>
                            <p className="text-muted-foreground dark:text-gray-400 text-sm">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Success stories" : "Success stories"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Hoe verschillende industrieën hun service delivery hebben getransformeerd"
                    : "How different industries have transformed their service delivery"
                  }
                </p>
              </div>

              <div className="space-y-8">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-heading dark:text-white mb-2">{useCase.industry}</h3>
                        <div className="text-[#4585f4] font-semibold text-lg">{useCase.result}</div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-2">
                          {isNL ? "Uitdaging" : "Challenge"}
                        </h4>
                        <p className="text-foreground dark:text-gray-300 text-sm leading-relaxed">{useCase.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-2">
                          {isNL ? "Oplossing" : "Solution"}
                        </h4>
                        <p className="text-foreground dark:text-gray-300 text-sm leading-relaxed">{useCase.solution}</p>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
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
                    {isNL ? "Klaar voor geautomatiseerde service delivery?" : "Ready for automated service delivery?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige service delivery processen analyseren en ontdekken waar AI automatisering de grootste impact kan hebben."
                      : "Let us analyze your current service delivery processes and discover where AI automation can have the biggest impact."
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
                      {isNL ? "Boek Gratis Service Audit" : "Book Free Service Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "60 minuten sessie • Gratis analyse • Service roadmap" : "60-minute session • Free analysis • Service roadmap"}
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

export default AIServiceFulfillmentPage;
