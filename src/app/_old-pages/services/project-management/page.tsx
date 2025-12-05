'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { BarChart3, Clock, Euro, CheckCircle, ArrowRight, ArrowLeft, Target, Calendar, AlertTriangle } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
const ProjectManagementPage: React.FC = () => {
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
      title: isNL ? 'Project Management' : 'Project Management',
      titleNL: 'Project Management',
      href: isNL ? '/nl/services/project-management' : '/services/project-management',
      isCurrent: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Project Management Automatisering Amsterdam | Octomatic" : "Project Management Automation Amsterdam | Octomatic"}
        description={isNL ? "Gestroomlijnd project management systeem. Projecten op tijd, binnen budget en met volledige transparantie. Elimineer chaos en onzekerheid." : "Streamlined project management system. Projects on time, within budget, and with complete transparency. Eliminate chaos and uncertainty."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/project-management" : "https://www.octomatic.ai/services/project-management"}
        keywords={isNL ? "project management, automatisering, projecten, Amsterdam, workflow" : "project management, automation, projects, Amsterdam, workflow"}
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
                        {isNL ? "Chaotische projecten" : "Chaotic projects"}
                      </div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "Een gestroomlijnd project management systeem" : "A streamlined project management system"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-lg">
                      {isNL ? (
                        "Projecten die op tijd, binnen budget en met volledige transparantie worden afgerond, waardoor chaos en onzekerheid worden geëlimineerd."
                      ) : (
                        "Projects that finish on time, within budget, and with complete transparency, eliminating chaos and uncertainty."
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
                        {isNL ? "Boek Project Analyse" : "Book Project Analysis"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {isNL ? "Gestroomlijnd systeem" : "Streamlined system"}
                            </h3>
                            <p className="text-gray-400">
                              {isNL ? "Op tijd en binnen budget" : "On time and within budget"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">95%</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Op tijd" : "On time"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">100%</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Transparantie" : "Transparency"}
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
                    {isNL ? "Klaar voor gestroomlijnde projecten?" : "Ready for streamlined projects?"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige project management analyseren en tonen hoe u meer controle en voorspelbaarheid kunt krijgen."
                      : "Let us analyze your current project management and show you how to get more control and predictability."
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
                      {isNL ? "Boek Gratis Project Audit" : "Book Free Project Audit"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {isNL ? "30 minuten sessie • Gratis analyse • Project roadmap" : "30-minute session • Free analysis • Project roadmap"}
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

export default ProjectManagementPage;
