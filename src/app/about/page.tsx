'use client';

import React, { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

// Force dynamic rendering to prevent SSR issues with Cal.com
export const dynamic = 'force-dynamic';

import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { MapPin, Users, Target, Award, ArrowRight, ArrowLeft, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import Image from 'next/image';

// Dynamically import Cal.com component with SSR disabled
const CalIntroCallClient = dynamicImport(
  () => import('@/components/cal/CalIntroCallClient').then(mod => mod.CalIntroCallClient),
  { ssr: false }
);

const AboutPage: React.FC = () => {
  const { language } = useTranslations();
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
      title: isNL ? 'Over Ons' : 'About Us',
      titleNL: 'Over Ons',
      href: isNL ? '/nl/about' : '/about',
      isCurrent: true
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: isNL ? "Resultaat-gedreven" : "Results-driven",
      description: isNL 
        ? "We focussen op meetbare resultaten, niet op fancy technologie"
        : "We focus on measurable results, not on fancy technology"
    },
    {
      icon: Users,
      title: isNL ? "Mensen-eerst" : "People-first",
      description: isNL 
        ? "Automatisering moet mensen versterken, niet vervangen"
        : "Automation should empower people, not replace them"
    },
    {
      icon: MapPin,
      title: isNL ? "Lokaal gevestigd" : "Locally based",
      description: isNL 
        ? "Naarden kantoor voor persoonlijke ondersteuning en training"
        : "Naarden office for personal support and training"
    },
    {
      icon: Award,
      title: isNL ? "Bewezen expertise" : "Proven expertise",
      description: isNL 
        ? "5+ jaar ervaring met B2B proces automatisering"
        : "5+ years of experience with B2B process automation"
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: isNL ? "Start van Octomatic" : "Octomatic Founded",
      description: isNL 
        ? "Kennet Timmers start Octomatic met de missie om Nederlandse bedrijven te helpen schalen door slimme automatisering"
        : "Kennet Timmers founded Octomatic with the mission to help Dutch businesses scale through smart automation"
    },
    {
      year: "2021",
      title: isNL ? "Eerste grote klanten" : "First major clients",
      description: isNL 
        ? "Succesvolle implementaties bij middelgrote bedrijven in Amsterdam en omgeving"
        : "Successful implementations at medium-sized companies in Amsterdam and surrounding areas"
    },
    {
      year: "2023",
      title: isNL ? "AI integratie" : "AI integration",
      description: isNL 
        ? "Uitbreiding naar AI-gedreven automatisering en intelligente workflows"
        : "Expansion into AI-driven automation and intelligent workflows"
    },
    {
      year: "2024",
      title: isNL ? "Bewezen methodologie" : "Proven methodology",
      description: isNL 
        ? "Value Stream Mapping Workshop ontwikkeld met gegarandeerde ROI van €15k+"
        : "Value Stream Mapping Workshop developed with guaranteed ROI of €15k+"
    }
  ];

  return (
    <>
      {/* Cal.com temporarily disabled to fix SSR build issues */}
      {/* <CalIntroCallClient /> */}
      <UnifiedSEO 
        title={isNL ? "Over Octomatic - AI Automatisering Experts Amsterdam | Kennet Timmers" : "About Octomatic - AI Automation Experts Amsterdam | Kennet Timmers"}
        description={isNL ? "Leer over Octomatic's missie om Nederlandse bedrijven te helpen schalen door AI automatisering. Lokale ondersteuning vanuit Naarden kantoor." : "Learn about Octomatic's mission to help Dutch businesses scale through AI automation. Local support from Naarden office."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/about" : "https://www.octomatic.ai/about"}
        keywords={isNL ? "Octomatic, Kennet Timmers, AI automatisering, Amsterdam, bedrijfsautomatisering" : "Octomatic, Kennet Timmers, AI automation, Amsterdam, business automation"}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A]">
          {/* Hero Section */}
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              {/* Breadcrumb */}
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="about"
                />
              </div>

              {/* Back Button */}
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

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left Column - Content */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "Wij helpen Nederlandse bedrijven schalen" : "We help Dutch businesses scale"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Door slimme automatisering die mensen versterkt in plaats van vervangt. Gevestigd in Naarden, serveren we bedrijven door heel Nederland."
                      ) : (
                        "Through smart automation that empowers people instead of replacing them. Based in Naarden, we serve businesses throughout the Netherlands."
                      )}
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="intro-call"
                        data-cal-link="kennet-timmers/intro-call"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        {isNL ? "Kennismakingsgesprek" : "Get to Know Us"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Team Photo */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6 text-center">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#4585f4]/20">
                          <Image
                            src="/team/kennet_timmers.webp"
                            alt="Kennet Timmers - Founder of Octomatic"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                            priority
                          />
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Kennet Timmers</h3>
                          <p className="text-[#4585f4] font-semibold mb-4">
                            {isNL ? "Oprichter & AI Automatisering Expert" : "Founder & AI Automation Expert"}
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            {isNL 
                              ? "5+ jaar ervaring met het automatiseren van B2B processen en het helpen van Nederlandse bedrijven om te schalen."
                              : "5+ years of experience automating B2B processes and helping Dutch businesses scale."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Onze kernwaarden" : "Our core values"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Wat ons drijft in alles wat we doen"
                    : "What drives us in everything we do"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300 text-center">
                      <div className="w-16 h-16 bg-[#4585f4]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-[#4585f4]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Ons verhaal" : "Our story"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Van startup tot vertrouwde automatisering partner"
                    : "From startup to trusted automation partner"
                  }
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-[#4585f4] rounded-2xl flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{item.year}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-lg text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Location & Contact Section */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {isNL ? "Lokaal gevestigd, landelijk actief" : "Locally based, nationally active"}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {isNL 
                        ? "Ons kantoor in Naarden biedt de perfecte basis om Nederlandse bedrijven persoonlijk te ondersteunen. We begrijpen de lokale markt en kunnen snel ter plaatse zijn voor training en implementatie."
                        : "Our office in Naarden provides the perfect base to personally support Dutch businesses. We understand the local market and can quickly be on-site for training and implementation."
                      }
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#4585f4]/10 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-[#4585f4]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            {isNL ? "Kantoor Locatie" : "Office Location"}
                          </h4>
                          <p className="text-gray-200">Naarden, Nederland</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#4585f4]/10 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-[#4585f4]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            {isNL ? "Service Gebied" : "Service Area"}
                          </h4>
                          <p className="text-gray-200">
                            {isNL ? "Nederland, focus op Amsterdam en omgeving" : "Netherlands, focus on Amsterdam and surrounding areas"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      {isNL ? "Laten we kennismaken" : "Let's get acquainted"}
                    </h3>
                    <p className="text-gray-300 mb-8 text-center leading-relaxed">
                      {isNL 
                        ? "Boek een gratis kennismakingsgesprek om te ontdekken hoe we uw bedrijf kunnen helpen automatiseren en schalen."
                        : "Book a free introductory call to discover how we can help your business automate and scale."
                      }
                    </p>
                    
                    <div className="text-center">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group w-full"
                        data-cal-namespace="intro-call"
                        data-cal-link="kennet-timmers/intro-call"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {isNL ? "Boek Kennismakingsgesprek" : "Book Introduction Call"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <p className="text-sm text-gray-500 mt-4">
                        {isNL ? "15 minuten • Gratis • Geen verplichtingen" : "15 minutes • Free • No obligations"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
};

export default AboutPage;
