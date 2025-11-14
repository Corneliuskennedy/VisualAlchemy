'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { User, MapPin, Calendar, ExternalLink, ArrowRight, ArrowLeft, Linkedin, Github, Mail } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalIntroCall } from '@/hooks/use-cal';
import Image from 'next/image';

const KennetTimmersPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  useCalIntroCall();

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Auteur' : 'Author',
      titleNL: 'Auteur',
      href: isNL ? '/nl/author' : '/author',
      isCurrent: false
    },
    {
      title: 'Kennet Timmers',
      titleNL: 'Kennet Timmers',
      href: isNL ? '/nl/author/kennet-timmers' : '/author/kennet-timmers',
      isCurrent: true
    }
  ];

  const expertise = [
    {
      area: isNL ? "AI Automatisering" : "AI Automation",
      experience: isNL ? "6+ jaar" : "6+ years",
      description: isNL 
        ? "Specialisatie in n8n, Make.com, en custom AI workflows voor Nederlandse bedrijven"
        : "Specialization in n8n, Make.com, and custom AI workflows for Dutch businesses"
    },
    {
      area: isNL ? "Business Process Optimization" : "Business Process Optimization",
      experience: isNL ? "8+ jaar" : "8+ years",
      description: isNL 
        ? "Value Stream Mapping en Lean methodologieën voor MKB transformatie"
        : "Value Stream Mapping and Lean methodologies for SME transformation"
    },
    {
      area: isNL ? "Startup Consulting" : "Startup Consulting",
      experience: isNL ? "4+ jaar" : "4+ years",
      description: isNL 
        ? "MVP ontwikkeling en go-to-market strategieën voor tech startups"
        : "MVP development and go-to-market strategies for tech startups"
    }
  ];

  const achievements = [
    {
      metric: "€2.3M+",
      label: isNL ? "Totale besparingen" : "Total savings",
      description: isNL ? "Voor Nederlandse bedrijven" : "For Dutch businesses"
    },
    {
      metric: "150+",
      label: isNL ? "Bedrijven geholpen" : "Companies helped",
      description: isNL ? "Sinds 2019" : "Since 2019"
    },
    {
      metric: "95%",
      label: isNL ? "Client tevredenheid" : "Client satisfaction",
      description: isNL ? "Gemiddelde rating" : "Average rating"
    },
    {
      metric: "12",
      label: isNL ? "Startups gelanceerd" : "Startups launched",
      description: isNL ? "Succesvol naar markt" : "Successfully to market"
    }
  ];

  const recentArticles = [
    {
      title: isNL ? "AI Agents vs Automation: Real Value or Just Hype?" : "AI Agents vs Automation: Real Value or Just Hype?",
      date: "2025-04-08",
      url: "/blog/ai-agents-vs-automation-real-value-or-hype"
    },
    {
      title: isNL ? "Scale Smarter: Avoid the Hidden Costs of Over-Hiring" : "Scale Smarter: Avoid the Hidden Costs of Over-Hiring", 
      date: "2025-02-13",
      url: "/blog/scale-smarter-avoid-hidden-costs-over-hiring"
    },
    {
      title: isNL ? "Expertly Launched: Automation Agency in Amsterdam in 6 Weeks" : "Expertly Launched: Automation Agency in Amsterdam in 6 Weeks",
      date: "2025-02-13", 
      url: "/blog/expert-launched-automation-business-amsterdam-octomatic"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Kennet Timmers - AI Automatisering Expert | Octomatic" : "Kennet Timmers - AI Automation Expert | Octomatic"}
        description={isNL ? "Kennet Timmers, oprichter van Octomatic. 6+ jaar ervaring in AI automatisering, 150+ Nederlandse bedrijven geholpen, €2.3M+ besparingen gerealiseerd." : "Kennet Timmers, founder of Octomatic. 6+ years experience in AI automation, helped 150+ Dutch businesses, realized €2.3M+ in savings."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/author/kennet-timmers" : "https://www.octomatic.ai/author/kennet-timmers"}
        keywords={isNL ? "Kennet Timmers, AI automatisering expert, oprichter Octomatic, Amsterdam" : "Kennet Timmers, AI automation expert, Octomatic founder, Amsterdam"}
        author="Kennet Timmers"
        pageType="about"
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

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2">
                        <User className="w-4 h-4 text-[#4585f4]" />
                        <span className="text-[#4585f4] font-medium text-sm">
                          {isNL ? "Oprichter & CEO" : "Founder & CEO"}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        Kennet Timmers
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                      {isNL ? (
                        "AI Automatisering expert die Nederlandse bedrijven helpt schalen door slimme workflows. Oprichter van Octomatic en gepassioneerd over het elimineren van repetitieve taken."
                      ) : (
                        "AI Automation expert helping Dutch businesses scale through smart workflows. Founder of Octomatic and passionate about eliminating repetitive tasks."
                      )}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Naarden, Nederland</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{isNL ? "Sinds 2019" : "Since 2019"}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="intro-call"
                        data-cal-link="kennet-timmers/intro-call"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        {isNL ? "Boek Gesprek" : "Book Call"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <div className="flex gap-3">
                        <Button variant="outline" size="lg" asChild>
                          <a href="https://linkedin.com/in/kennet-timmers" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                          <a href="https://github.com/kennet-timmers" target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="aspect-square relative mb-6">
                        <Image
                          src="/team/kennet_timmers.webp"
                          alt="Kennet Timmers"
                          fill
                          sizes="(max-width: 768px) 200px, 300px"
                          className="object-cover rounded-2xl"
                          priority
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {isNL ? "Beschikbaar voor consultatie" : "Available for consultation"}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {isNL ? "Nederlandse werktijden (CET)" : "Dutch business hours (CET)"}
                        </p>
                        <div className="flex justify-center">
                          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-300 text-sm font-medium">
                              {isNL ? "Online" : "Online"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Track record" : "Track record"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Bewezen resultaten in AI automatisering en business transformatie"
                    : "Proven results in AI automation and business transformation"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/40 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-4">{achievement.metric}</div>
                    <div className="text-lg font-semibold text-white mb-2">{achievement.label}</div>
                    <div className="text-gray-400 text-sm">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Expertise */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Expertise" : "Expertise"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Gespecialiseerde kennis opgebouwd door jaren van hands-on ervaring"
                    : "Specialized knowledge built through years of hands-on experience"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {expertise.map((item, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-white">{item.area}</h3>
                      <span className="bg-[#4585f4]/20 text-[#4585f4] px-3 py-1 rounded-full text-sm font-medium">
                        {item.experience}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Articles */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Recente artikelen" : "Recent articles"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Inzichten en expertise gedeeld via onze blog"
                    : "Insights and expertise shared through our blog"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {recentArticles.map((article, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-400">
                        {new Date(article.date).toLocaleDateString(isNL ? 'nl-NL' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{article.title}</h3>
                      <Button variant="ghost" asChild className="p-0 h-auto">
                        <Link href={article.url} className="text-[#4585f4] hover:text-[#4585f4]/80 flex items-center gap-2">
                          {isNL ? "Lees artikel" : "Read article"}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg">
                  <Link href={isNL ? '/nl/blog' : '/blog'}>
                    {isNL ? "Alle artikelen" : "All articles"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {isNL ? "Laten we praten over uw automatisering" : "Let's talk about your automation"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Boek een gratis kennismakingsgesprek om te ontdekken hoe AI automatisering uw bedrijf kan transformeren."
                      : "Book a free introduction call to discover how AI automation can transform your business."
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
                      {isNL ? "Boek Gesprek met Kennet" : "Book Call with Kennet"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {isNL ? "15-30 minuten • Gratis • Geen verplichtingen" : "15-30 minutes • Free • No obligations"}
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

export default KennetTimmersPage;
