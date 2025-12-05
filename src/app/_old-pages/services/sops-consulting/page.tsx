'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { FileText, Users, Target, CheckCircle, ArrowRight, ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
const SOPsConsultingPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();  const breadcrumbItems = [
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
      title: isNL ? 'SOPs Consulting' : 'SOPs Consulting',
      titleNL: 'SOPs Consulting',
      href: isNL ? '/nl/services/sops-consulting' : '/services/sops-consulting',
      isCurrent: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "SOPs & Playbooks Consulting Amsterdam | Octomatic" : "SOPs & Playbooks Consulting Amsterdam | Octomatic"}
        description={isNL ? "Aangepaste SOPs en playbooks. Elke medewerker weet precies wat te doen en wanneer. Verminder fouten met 80% en maak nieuwe teamleden 3x sneller productief." : "Custom SOPs and playbooks. Every employee knows exactly what to do and when. Reduce errors by 80% and make new team members 3x faster to productivity."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/sops-consulting" : "https://www.octomatic.ai/services/sops-consulting"}
        keywords={isNL ? "SOPs, standaard procedures, playbooks, Amsterdam, proces documentatie" : "SOPs, standard procedures, playbooks, Amsterdam, process documentation"}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A]">
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
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
                        {isNL ? "Inconsistente uitvoering" : "Inconsistent execution"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "Aangepaste SOPs en playbooks" : "Custom SOPs and playbooks"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "Elke medewerker weet precies wat te doen en wanneer, waardoor fouten met 80% afnemen en nieuwe teamleden 3x sneller productief worden."
                      ) : (
                        "Every employee knows exactly what to do and when, reducing errors by 80% and making new team members 3x faster to productivity."
                      )}
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="automation-strategy-workshop"
                        data-cal-link="kennet-timmers/workshop"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        {isNL ? "Boek SOPs Analyse" : "Book SOPs Analysis"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <FileText className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {isNL ? "Aangepaste procedures" : "Custom procedures"}
                            </h3>
                            <p className="text-gray-400">
                              {isNL ? "Voor uw specifieke processen" : "For your specific processes"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">80%</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Minder fouten" : "Fewer errors"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">3x</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Sneller productief" : "Faster productive"}
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

          {/* CTA Section */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {isNL ? "Klaar voor consistente uitvoering?" : "Ready for consistent execution?"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige processen analyseren en aangepaste SOPs creëren die uw team daadwerkelijk gebruikt."
                      : "Let us analyze your current processes and create custom SOPs that your team will actually use."
                    }
                  </p>
                  
                  <div className="mb-6">
                    <Button 
                      size="lg" 
                      className="px-12 py-6 text-xl font-bold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                      data-cal-namespace="automation-strategy-workshop"
                      data-cal-link="kennet-timmers/workshop"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      {isNL ? "Boek Gratis SOPs Audit" : "Book Free SOPs Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {isNL ? "45 minuten sessie • Gratis analyse • SOPs roadmap" : "45-minute session • Free analysis • SOPs roadmap"}
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

export default SOPsConsultingPage;
