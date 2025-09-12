'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { TrendingUp, Clock, Euro, Users, ArrowRight, ArrowLeft, ExternalLink, CheckCircle, Target, BarChart3 } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const ProjectsPage: React.FC = () => {
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
      title: isNL ? 'Projecten' : 'Projects',
      titleNL: 'Projecten',
      href: isNL ? '/nl/projects' : '/projects',
      isCurrent: true
    }
  ];

  const projects = [
    {
      title: isNL ? "E-commerce Automatisering" : "E-commerce Automation",
      client: isNL ? "Online Fashion Retailer" : "Online Fashion Retailer",
      industry: isNL ? "E-commerce" : "E-commerce",
      employees: "25",
      challenge: isNL 
        ? "Handmatige orderverwerking, klantenservice en voorraadmanagement kostten 40+ uur per week"
        : "Manual order processing, customer service, and inventory management cost 40+ hours per week",
      solution: isNL
        ? "Geïntegreerde automatisering tussen Shopify, CRM en fulfillment systemen"
        : "Integrated automation between Shopify, CRM and fulfillment systems",
      results: [
        { metric: isNL ? "Tijdsbesparing" : "Time Saved", value: "35 uur/week", icon: Clock },
        { metric: isNL ? "Kostenbesparing" : "Cost Savings", value: "€42,000/jaar", icon: Euro },
        { metric: isNL ? "Klanttevredenheid" : "Customer Satisfaction", value: "+25%", icon: Users },
        { metric: isNL ? "Orderverwerking" : "Order Processing", value: "3x sneller", icon: TrendingUp }
      ],
      testimonial: isNL
        ? "\"Octomatic heeft onze operaties getransformeerd. We kunnen nu focussen op groei in plaats van dagelijkse taken.\""
        : "\"Octomatic transformed our operations. We can now focus on growth instead of daily tasks.\"",
      testimonialAuthor: isNL ? "Sarah van der Berg, CEO" : "Sarah van der Berg, CEO",
      tags: [isNL ? "CRM Integratie" : "CRM Integration", isNL ? "Orderverwerking" : "Order Processing", isNL ? "Klantenservice" : "Customer Service"]
    },
    {
      title: isNL ? "Recruitment Automatisering" : "Recruitment Automation",
      client: isNL ? "Tech Startup" : "Tech Startup",
      industry: isNL ? "Technologie" : "Technology",
      employees: "15",
      challenge: isNL 
        ? "CV screening en interview planning namen 20 uur per week in beslag voor HR team"
        : "CV screening and interview scheduling took 20 hours per week for HR team",
      solution: isNL
        ? "AI-powered CV screening, geautomatiseerde interview planning en kandidaat communicatie"
        : "AI-powered CV screening, automated interview scheduling and candidate communication",
      results: [
        { metric: isNL ? "Screening tijd" : "Screening Time", value: "-80%", icon: Clock },
        { metric: isNL ? "Kwaliteit kandidaten" : "Candidate Quality", value: "+40%", icon: Target },
        { metric: isNL ? "Tijd tot hire" : "Time to Hire", value: "-50%", icon: TrendingUp },
        { metric: isNL ? "HR productiviteit" : "HR Productivity", value: "+60%", icon: BarChart3 }
      ],
      testimonial: isNL
        ? "\"We vinden nu betere kandidaten in minder tijd. Onze hire rate is dramatisch verbeterd.\""
        : "\"We now find better candidates in less time. Our hire rate has improved dramatically.\"",
      testimonialAuthor: isNL ? "Mark Janssen, Head of HR" : "Mark Janssen, Head of HR",
      tags: [isNL ? "AI Screening" : "AI Screening", isNL ? "Interview Planning" : "Interview Scheduling", isNL ? "Kandidaat CRM" : "Candidate CRM"]
    },
    {
      title: isNL ? "Klantenservice Automatisering" : "Customer Service Automation",
      client: isNL ? "SaaS Platform" : "SaaS Platform",
      industry: "SaaS",
      employees: "50",
      challenge: isNL 
        ? "Support tickets stapelden zich op, response tijd was te lang, team was overbelast"
        : "Support tickets were piling up, response time was too long, team was overwhelmed",
      solution: isNL
        ? "AI chatbot voor eerste lijn support, automatische ticket routing en kennisbank integratie"
        : "AI chatbot for first-line support, automatic ticket routing and knowledge base integration",
      results: [
        { metric: isNL ? "Response tijd" : "Response Time", value: "-70%", icon: Clock },
        { metric: isNL ? "Ticket volume" : "Ticket Volume", value: "-45%", icon: TrendingUp },
        { metric: isNL ? "Klanttevredenheid" : "Customer Satisfaction", value: "+35%", icon: Users },
        { metric: isNL ? "Team capaciteit" : "Team Capacity", value: "+50%", icon: BarChart3 }
      ],
      testimonial: isNL
        ? "\"Onze klantenservice is nu 24/7 beschikbaar en veel efficiënter. Klanten zijn veel tevredener.\""
        : "\"Our customer service is now 24/7 available and much more efficient. Customers are much happier.\"",
      testimonialAuthor: isNL ? "Lisa de Vries, Customer Success Manager" : "Lisa de Vries, Customer Success Manager",
      tags: [isNL ? "AI Chatbot" : "AI Chatbot", isNL ? "Ticket Routing" : "Ticket Routing", isNL ? "Kennisbank" : "Knowledge Base"]
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Projecten & Case Studies | Octomatic AI Automatisering" : "Projects & Case Studies | Octomatic AI Automation"}
        description={isNL ? "Ontdek hoe Octomatic Nederlandse bedrijven heeft geholpen met AI automatisering. Case studies met concrete resultaten en ROI." : "Discover how Octomatic has helped Dutch businesses with AI automation. Case studies with concrete results and ROI."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/projects" : "https://www.octomatic.ai/projects"}
        keywords={isNL ? "case studies, projecten, automatisering, resultaten, ROI, Amsterdam" : "case studies, projects, automation, results, ROI, Amsterdam"}
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
                  pageType="about"
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

              <div className="max-w-7xl mx-auto text-center mb-16">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    {isNL ? "Bewezen resultaten" : "Proven results"}
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto"></div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {isNL ? (
                      "Ontdek hoe Nederlandse bedrijven hun operaties hebben getransformeerd met onze AI automatiseringsoplossingen."
                    ) : (
                      "Discover how Dutch businesses have transformed their operations with our AI automation solutions."
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="space-y-16">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-3xl p-8 md:p-12 hover:bg-gray-800/30 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Project Info */}
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="bg-[#4585f4]/20 text-[#4585f4] px-3 py-1 rounded-full">
                              {project.industry}
                            </span>
                            <span>{project.employees} {isNL ? 'medewerkers' : 'employees'}</span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h3>
                          <p className="text-lg text-gray-300">{project.client}</p>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                              {isNL ? "Uitdaging" : "Challenge"}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                              {isNL ? "Oplossing" : "Solution"}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Results & Testimonial */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-6">
                            {isNL ? "Resultaten" : "Results"}
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {project.results.map((result, resultIndex) => {
                              const Icon = result.icon;
                              return (
                                <div key={resultIndex} className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-2xl p-4 text-center">
                                  <div className="w-8 h-8 bg-[#4585f4]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <Icon className="w-4 h-4 text-[#4585f4]" />
                                  </div>
                                  <div className="text-2xl font-bold text-[#4585f4] mb-1">{result.value}</div>
                                  <div className="text-xs text-gray-400">{result.metric}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                              <blockquote className="text-gray-300 italic mb-4 leading-relaxed">
                                {project.testimonial}
                              </blockquote>
                              <cite className="text-sm text-gray-400 not-italic">
                                — {project.testimonialAuthor}
                              </cite>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {isNL ? "Klaar voor uw eigen succesverhaal?" : "Ready for your own success story?"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laat ons uw huidige processen analyseren en ontdekken hoe u vergelijkbare resultaten kunt behalen."
                      : "Let us analyze your current processes and discover how you can achieve similar results."
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
                      {isNL ? "Start Uw Transformatie" : "Start Your Transformation"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {isNL ? "Strategy workshop • Concrete roadmap • ROI berekening" : "Strategy workshop • Concrete roadmap • ROI calculation"}
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

export default ProjectsPage;
