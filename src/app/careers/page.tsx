'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Users, ArrowLeft, Mail, MapPin, Clock, Euro } from 'lucide-react';
import GridBackground from '@/components/ui/GridBackground';

const CareersPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Carrières' : 'Careers',
      titleNL: 'Carrières',
      href: isNL ? '/nl/careers' : '/careers',
      isCurrent: true
    }
  ];

  const openings = [
    {
      title: isNL ? "Senior AI Automatisering Consultant" : "Senior AI Automation Consultant",
      type: isNL ? "Voltijd" : "Full-time",
      location: "Naarden, Nederland",
      salary: "€65.000 - €85.000",
      description: isNL 
        ? "Werk direct met Nederlandse bedrijven om hun processen te automatiseren met AI. Ideaal voor iemand met ervaring in process optimization en client consulting."
        : "Work directly with Dutch businesses to automate their processes with AI. Ideal for someone with experience in process optimization and client consulting."
    },
    {
      title: isNL ? "Full-Stack Developer (Next.js/Python)" : "Full-Stack Developer (Next.js/Python)",
      type: isNL ? "Voltijd" : "Full-time", 
      location: "Naarden, Nederland (Hybrid)",
      salary: "€55.000 - €75.000",
      description: isNL 
        ? "Bouw automatiseringstools en client dashboards. Werk met Next.js, Python, n8n, en AI APIs. Perfect voor een developer die impact wil maken bij groeiende bedrijven."
        : "Build automation tools and client dashboards. Work with Next.js, Python, n8n, and AI APIs. Perfect for a developer who wants to make an impact with growing businesses."
    }
  ];

  const benefits = [
    {
      title: isNL ? "Flexibel Werken" : "Flexible Work",
      description: isNL ? "Hybrid kantoor/thuis, flexibele uren" : "Hybrid office/home, flexible hours"
    },
    {
      title: isNL ? "Leren & Groeien" : "Learn & Grow", 
      description: isNL ? "€2.000 jaarlijks leerbudget" : "€2,000 annual learning budget"
    },
    {
      title: isNL ? "Impact Maken" : "Make Impact",
      description: isNL ? "Direct resultaat zien bij echte bedrijven" : "See direct results with real businesses"
    },
    {
      title: isNL ? "Startup Cultuur" : "Startup Culture",
      description: isNL ? "Snel groeien, veel verantwoordelijkheid" : "Fast growth, lots of responsibility"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Carrières - Werk bij Octomatic | AI Automatisering Amsterdam" : "Careers - Work at Octomatic | AI Automation Amsterdam"}
        description={isNL ? "Sluit je aan bij ons team en help Nederlandse bedrijven groeien met AI automatisering. Open posities in Amsterdam." : "Join our team and help Dutch businesses grow with AI automation. Open positions in Amsterdam."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/careers" : "https://www.octomatic.ai/careers"}
        keywords={isNL ? "carrières, vacatures, AI automatisering jobs, Amsterdam, werkgelegenheid" : "careers, jobs, AI automation jobs, Amsterdam, employment"}
        pageType="about"
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A] relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GridBackground className="pointer-events-none opacity-30" />
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
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

            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2 mb-6">
                  <Users className="w-4 h-4 text-[#4585f4]" />
                  <span className="text-[#4585f4] font-medium text-sm">
                    {isNL ? "Sluit je aan bij ons team" : "Join our team"}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.9]">
                  {isNL ? "Carrières bij Octomatic" : "Careers at Octomatic"}
                </h1>
                <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto mb-8"></div>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {isNL 
                    ? "Help Nederlandse bedrijven groeien met AI automatisering. Werk met cutting-edge technologie en maak echte impact."
                    : "Help Dutch businesses grow with AI automation. Work with cutting-edge technology and make real impact."
                  }
                </p>
              </div>

              {/* Current Openings */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  {isNL ? "Huidige Vacatures" : "Current Openings"}
                </h2>
                
                <div className="space-y-6">
                  {openings.map((job, index) => (
                    <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-4">{job.title}</h3>
                          <p className="text-gray-300 leading-relaxed mb-4">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Euro className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:flex-shrink-0">
                          <Button 
                            asChild
                            className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-8 py-3 text-lg font-semibold"
                          >
                            <a href="mailto:kennet@octomatic.ai?subject=Application - Senior AI Automation Consultant">
                              {isNL ? "Solliciteer Nu" : "Apply Now"}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  {isNL ? "Waarom bij ons werken?" : "Why work with us?"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-6 text-center hover:bg-gray-800/40 transition-all duration-300">
                      <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Culture */}
              <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-16">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  {isNL ? "Onze Cultuur" : "Our Culture"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {isNL ? "Impact First" : "Impact First"}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {isNL 
                        ? "We focussen op echte resultaten voor onze klanten. Elk project moet meetbare waarde opleveren."
                        : "We focus on real results for our clients. Every project must deliver measurable value."
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {isNL ? "Leren & Groeien" : "Learn & Grow"}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {isNL 
                        ? "De AI wereld verandert snel. We investeren in continu leren en experimenteren met nieuwe technologieën."
                        : "The AI world changes fast. We invest in continuous learning and experimenting with new technologies."
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {isNL ? "Transparantie" : "Transparency"}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {isNL 
                        ? "Open communicatie over successen en uitdagingen. Iedereen weet waar we staan en waar we naartoe gaan."
                        : "Open communication about successes and challenges. Everyone knows where we stand and where we're going."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {isNL ? "Geen passende vacature?" : "Don't see a fit?"}
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  {isNL 
                    ? "We zijn altijd op zoek naar talent. Stuur ons een open sollicitatie en vertel ons hoe jij Octomatic kunt helpen groeien."
                    : "We're always looking for talent. Send us an open application and tell us how you can help Octomatic grow."
                  }
                </p>
                
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#4585f4] hover:bg-[#4585f4]/90 text-white px-12 py-6 text-xl font-bold"
                >
                  <a href="mailto:kennet@octomatic.ai?subject=Open Application">
                    <Mail className="mr-2 h-6 w-6" />
                    {isNL ? "Open Sollicitatie" : "Open Application"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default CareersPage;
