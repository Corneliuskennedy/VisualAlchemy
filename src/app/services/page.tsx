'use client';

import React, { useEffect, Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { LineChart, BarChart3, Users, Bot, Brain, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop, useCalIntroCall } from '@/hooks/use-cal';

// Services index page
const ServicesPage: React.FC = () => {
  const { language, t } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Strategische Oplossingen' : 'Strategic Solutions',
      titleNL: 'Strategische Oplossingen',
      href: isNL ? '/nl/services' : '/services',
      isCurrent: true
    }
  ];

  // Initialize Cal.com embeds
  useCalWorkshop();
  useCalIntroCall();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle workshop booking
  const handleBookWorkshop = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Navigate to homepage if not on same page
      window.location.href = '/#how-it-works';
    }
  };

  const metaTitle = isNL 
    ? "AI Automatisering Services Amsterdam | Octomatic" 
    : "AI Automation Services Amsterdam | Octomatic";
  const metaDescription = isNL
    ? "Ontdek onze AI automatisering services in Amsterdam. CRM buildouts, lead generation, project management en SOPs consulting. GDPR-compliant oplossingen."
    : "Discover our AI automation services in Amsterdam. CRM buildouts, lead generation, project management, and SOPs consulting. GDPR-compliant solutions.";
  const h1Content = isNL ? "Onze expertisegebieden" : "Our areas of expertise";

  return (
    <>
      <UnifiedSEO 
        title={metaTitle}
        description={metaDescription}
        h1={h1Content}
      />
      
      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        {/* Hero Section */}
        <section className="py-16 md:py-20 relative bg-background">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GridBackground className="pointer-events-none" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground dark:text-gray-400 mb-12">
              <ol className="flex items-center space-x-1">
                <li className="flex items-center">
                  <Link href={isNL ? '/nl' : '/'} className="hover:text-foreground dark:hover:text-gray-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2" aria-hidden="true">/</span>
                  <span className="text-foreground dark:text-gray-200 font-semibold" aria-current="page">
                    {isNL ? 'Strategische Oplossingen' : 'Strategic Solutions'}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column - Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                      {isNL ? "Strategie eerst. Duurzame oplossingen daarna." : "Strategy first. Sustainable solutions after."}
                    </h1>
                    <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed max-w-lg">
                    {isNL ? (
                      "Een duurzame oplossing is het resultaat van een heldere strategie."
                    ) : (
                      "A sustainable solution is the result of a clear strategy."
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
                      {isNL ? "Ontdek onze strategie" : "Discover our strategy"}
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
                          <BarChart3 className="h-6 w-6 text-[#4585f4]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {isNL ? "Strategische focus" : "Strategic focus"}
                          </h3>
                          <p className="text-muted-foreground dark:text-gray-400">
                            {isNL ? "Methodologie voor duurzame groei" : "Methodology for sustainable growth"}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-foreground dark:text-gray-300 leading-relaxed">
                        {isNL ? (
                          "We bouwen geen tools - we creëren strategische roadmaps die leiden tot meetbare resultaten en schaalbare systemen."
                        ) : (
                          "We don't build tools - we create strategic roadmaps that lead to measurable results and scalable systems."
                        )}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                          <div className="text-2xl font-bold text-[#4585f4]">15+</div>
                          <div className="text-sm text-muted-foreground dark:text-gray-400">
                            {isNL ? "Bewezen oplossingen" : "Proven solutions"}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                          <div className="text-2xl font-bold text-[#4585f4]">€15k+</div>
                          <div className="text-sm text-muted-foreground dark:text-gray-400">
                            {isNL ? "Gegarandeerde ROI" : "Guaranteed ROI"}
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

        {/* Section Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent" />

        {/* Solutions Section */}
        <section className="py-24 bg-[#0A0A0A] relative">
          {isLargeScreen && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
          )}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {isNL ? "De resultaten van een strategische aanpak" : "The results of a strategic approach"}
              </h2>
              <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                {isNL ? (
                  "Hieronder staan enkele kernvoorbeelden van de systemen en resultaten die we voor onze klanten bouwen. Ze zijn niet de start van onze samenwerking, maar het bewijs van onze methodologie."
                ) : (
                  "Below are key examples of the systems and results we build for our clients. They are not the start of our collaboration, but the proof of our methodology."
                )}
              </p>
            </div>

            {/* Strategic Solutions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {/* Lead Generation */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Inconsistente lead flow" : "Inconsistent lead flow"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Een voorspelbaar lead generatie systeem" : "A predictable lead generation system"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: Een voorspelbare pijplijn van gekwalificeerde leads, zodat uw sales team kan focussen op het sluiten van deals, niet op het najagen ervan."
                  ) : (
                    "The result: A predictable pipeline of qualified leads, so your sales team can focus on closing deals, not chasing them."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/lead-generation' : '/services/lead-generation'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Project Management */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Chaotische projecten" : "Chaotic projects"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Een gestroomlijnd project management systeem" : "A streamlined project management system"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: Projecten die op tijd, binnen budget en met volledige transparantie worden afgerond, waardoor chaos en onzekerheid worden geëlimineerd."
                  ) : (
                    "The result: Projects that finish on time, within budget, and with complete transparency, eliminating chaos and uncertainty."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/project-management' : '/services/project-management'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Hiring Systems */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Trage werving" : "Slow hiring"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Een geautomatiseerde talent pijplijn" : "An automated talent pipeline"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: U spreekt alleen met de top 5% van de kandidaten, waardoor u sneller betere mensen aanneemt en duizenden euro's aan wervingskosten bespaart."
                  ) : (
                    "The result: You only speak with the top 5% of candidates, allowing you to hire better people faster and save thousands in recruitment costs."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/hiring-systems' : '/services/hiring-systems'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* AI Service Fulfillment */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Stijgende loonkosten" : "Rising labor costs"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Efficiënte AI service fulfillment" : "Efficient AI service fulfillment"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: Servicelevering die 3x sneller is met hogere kwaliteit, waardoor u groeit zonder extra personeel aan te nemen."
                  ) : (
                    "The result: Service delivery that's 3x faster with higher quality, allowing you to grow without hiring additional staff."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/ai-service-fulfillment' : '/services/ai-service-fulfillment'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* CRM Buildouts */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Verspreide klantdata" : "Scattered customer data"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Een geïntegreerd CRM systeem" : "An integrated CRM system"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: Een geïntegreerd systeem waar elke klantinteractie wordt vastgelegd, waardoor u nooit meer leads verliest en uw conversie met 40% stijgt."
                  ) : (
                    "The result: An integrated system where every customer interaction is captured, so you never lose leads again and your conversion increases by 40%."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/crm-buildouts' : '/services/crm-buildouts'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* SOPs Consulting */}
              <div className="bg-secondary/20 dark:bg-gray-900/20 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300 rounded-xl p-10 group">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-[#4585f4] stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                      {isNL ? "HET PROBLEEM:" : "THE PROBLEM:"}
                    </div>
                    <div className="text-red-400 font-semibold mb-6 text-lg">
                      {isNL ? "Inconsistente uitvoering" : "Inconsistent execution"}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {isNL ? "Aangepaste SOPs en playbooks" : "Custom SOPs and playbooks"}
                </h3>
                
                <p className="text-foreground dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  {isNL ? (
                    "Het resultaat: Elke medewerker weet precies wat te doen en wanneer, waardoor fouten met 80% afnemen en nieuwe teamleden 3x sneller productief worden."
                  ) : (
                    "The result: Every employee knows exactly what to do and when, reducing errors by 80% and making new team members 3x faster to productivity."
                  )}
                </p>
                
                <Link 
                  href={isNL ? '/nl/services/sops-consulting' : '/services/sops-consulting'}
                  className="inline-flex items-center text-[#4585f4] font-semibold text-lg hover:text-[#4585f4]/80 hover:underline transition-all duration-300 group"
                >
                  {isNL ? "Ontdek de strategie" : "Discover the strategy"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4585f4]/30 to-transparent" />

        {/* CTA Section */}
        <section className="py-24 bg-[#0A0A0A] relative">
          {isLargeScreen && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
          )}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Alle duurzame oplossingen beginnen met één stap" : "All sustainable solutions start with one step"}
                </h2>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                  {isNL ? (
                    "Voordat we een enkele tool implementeren, creëren we uw strategische blauwdruk. De Value Stream Mapping Workshop is de enige manier om te garanderen dat uw investering in technologie leidt tot een meetbaar rendement."
                  ) : (
                    "Before we implement a single tool, we create your strategic blueprint. The Value Stream Mapping Workshop is the only way to guarantee that your investment in technology leads to measurable returns."
                  )}
                </p>
                
                <div className="mb-6">
                  <Button 
                    size="lg" 
                      className="px-12 py-6 text-xl font-bold bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25 group"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {isNL ? "Start Gratis Proces Audit" : "Start Free Process Audit"}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  {isNL ? "4-uur sessie • Vaste prijs • ROI Gegarandeerd" : "4-hour session • Fixed price • ROI Guaranteed"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default ServicesPage;
