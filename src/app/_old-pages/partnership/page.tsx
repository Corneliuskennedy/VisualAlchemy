'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Handshake, TrendingUp, Users, Euro, CheckCircle, ArrowRight, ArrowLeft, Target, Zap } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
const PartnershipPage: React.FC = () => {
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
      title: isNL ? 'Partnership' : 'Partnership',
      titleNL: 'Partnership',
      href: isNL ? '/nl/partnership' : '/partnership',
      isCurrent: true
    }
  ];

  const partnershipTypes = [
    {
      icon: Users,
      title: isNL ? "Referral Partners" : "Referral Partners",
      description: isNL 
        ? "Verdien commissie door klanten naar ons door te verwijzen"
        : "Earn commission by referring clients to us",
      benefits: [
        isNL ? "15-25% commissie op projecten" : "15-25% commission on projects",
        isNL ? "Geen technische kennis vereist" : "No technical knowledge required",
        isNL ? "Marketing ondersteuning" : "Marketing support"
      ]
    },
    {
      icon: Handshake,
      title: isNL ? "Implementation Partners" : "Implementation Partners",
      description: isNL 
        ? "Samen projecten uitvoeren met gedeelde verantwoordelijkheden"
        : "Execute projects together with shared responsibilities",
      benefits: [
        isNL ? "50/50 revenue sharing" : "50/50 revenue sharing",
        isNL ? "Gezamenlijke expertise" : "Combined expertise",
        isNL ? "Grotere projecten" : "Larger projects"
      ]
    },
    {
      icon: Target,
      title: isNL ? "Technology Partners" : "Technology Partners",
      description: isNL 
        ? "Integreer uw technologie in onze automatiseringsoplossingen"
        : "Integrate your technology into our automation solutions",
      benefits: [
        isNL ? "Nieuwe markt toegang" : "New market access",
        isNL ? "Technische integratie" : "Technical integration",
        isNL ? "Co-marketing kansen" : "Co-marketing opportunities"
      ]
    }
  ];

  const requirements = [
    {
      title: isNL ? "Bewezen track record" : "Proven track record",
      description: isNL 
        ? "Ervaring met B2B dienstverlening en klantrelaties"
        : "Experience with B2B services and client relationships"
    },
    {
      title: isNL ? "Complementaire expertise" : "Complementary expertise",
      description: isNL 
        ? "Vaardigheden die onze automatiseringsexpertise aanvullen"
        : "Skills that complement our automation expertise"
    },
    {
      title: isNL ? "Kwaliteit focus" : "Quality focus",
      description: isNL 
        ? "Commitment aan hoge kwaliteit en klanttevredenheid"
        : "Commitment to high quality and customer satisfaction"
    },
    {
      title: isNL ? "Lange termijn visie" : "Long-term vision",
      description: isNL 
        ? "Interesse in duurzame partnership, niet eenmalige deals"
        : "Interest in sustainable partnership, not one-time deals"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Partnership Mogelijkheden | Octomatic AI Automatisering" : "Partnership Opportunities | Octomatic AI Automation"}
        description={isNL ? "Word partner van Octomatic. Referral, implementatie en technologie partnerships beschikbaar. Verdien commissie en groei samen met ons." : "Become an Octomatic partner. Referral, implementation and technology partnerships available. Earn commission and grow together with us."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/partnership" : "https://www.octomatic.ai/partnership"}
        keywords={isNL ? "partnership, samenwerking, referral, commissie, Amsterdam" : "partnership, collaboration, referral, commission, Amsterdam"}
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
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "Groei samen met Octomatic" : "Grow together with Octomatic"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Word onderdeel van ons groeiende netwerk van partners en help Nederlandse bedrijven schalen door slimme automatisering."
                      ) : (
                        "Become part of our growing network of partners and help Dutch businesses scale through smart automation."
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
                        {isNL ? "Partnership Gesprek" : "Partnership Discussion"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <Handshake className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {isNL ? "Win-win partnerships" : "Win-win partnerships"}
                            </h3>
                            <p className="text-gray-400">
                              {isNL ? "Groei samen met ons" : "Grow together with us"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">25%</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Max commissie" : "Max commission"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">€50k+</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? "Gem. project" : "Avg. project"}
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

          {/* Partnership Types */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Partnership mogelijkheden" : "Partnership opportunities"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Verschillende manieren om samen te werken en te groeien"
                    : "Different ways to collaborate and grow together"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {partnershipTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-[#4585f4]/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-[#4585f4]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{type.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">{type.description}</p>
                      
                      <div className="space-y-3">
                        {type.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-[#4585f4]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-[#4585f4]" />
                            </div>
                            <p className="text-gray-400 text-sm">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Wat we zoeken in partners" : "What we look for in partners"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Kwaliteit en lange termijn samenwerking staan centraal"
                    : "Quality and long-term collaboration are central"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {requirements.map((req, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#4585f4]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-[#4585f4]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{req.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{req.description}</p>
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
                    {isNL ? "Klaar om samen te groeien?" : "Ready to grow together?"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Laten we bespreken hoe we samen kunnen werken om meer Nederlandse bedrijven te helpen automatiseren en schalen."
                      : "Let's discuss how we can work together to help more Dutch businesses automate and scale."
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
                      {isNL ? "Plan Partnership Gesprek" : "Schedule Partnership Discussion"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {isNL ? "30 minuten gesprek • Geen verplichtingen • Partnership mogelijkheden" : "30-minute discussion • No obligations • Partnership opportunities"}
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

export default PartnershipPage;
