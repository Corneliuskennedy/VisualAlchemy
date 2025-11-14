'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { MapPin, Building, Users, Euro, CheckCircle, ArrowRight, ArrowLeft, Star, Clock, Shield } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalWorkshop } from '@/hooks/use-cal';

const AIAutomationAmsterdamPage: React.FC = () => {
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
      title: isNL ? 'AI Automatisering Amsterdam' : 'AI Automation Amsterdam',
      titleNL: 'AI Automatisering Amsterdam',
      href: isNL ? '/nl/services/ai-automation-amsterdam' : '/services/ai-automation-amsterdam',
      isCurrent: true
    }
  ];

  const localBenefits = [
    {
      icon: MapPin,
      title: isNL ? "Lokaal gevestigd in Naarden" : "Locally based in Naarden",
      description: isNL 
        ? "15 minuten van Amsterdam centrum voor persoonlijke ondersteuning"
        : "15 minutes from Amsterdam center for personal support"
    },
    {
      icon: Users,
      title: isNL ? "Nederlandse marktkennis" : "Dutch market knowledge",
      description: isNL 
        ? "Diep begrip van Nederlandse bedrijfscultuur en regelgeving"
        : "Deep understanding of Dutch business culture and regulations"
    },
    {
      icon: Shield,
      title: isNL ? "GDPR compliant" : "GDPR compliant",
      description: isNL 
        ? "Gespecialiseerd in Europese privacy wetgeving en data bescherming"
        : "Specialized in European privacy legislation and data protection"
    },
    {
      icon: Clock,
      title: isNL ? "Nederlandse werktijden" : "Dutch business hours",
      description: isNL 
        ? "Ondersteuning tijdens Nederlandse kantooruren in uw tijdzone"
        : "Support during Dutch business hours in your timezone"
    }
  ];

  const amsterdamStats = [
    {
      stat: "€50,000+",
      label: isNL ? "Gem. jaarlijkse besparing" : "Avg. annual savings",
      description: isNL ? "Per Amsterdams bedrijf" : "Per Amsterdam business"
    },
    {
      stat: "40-70%",
      label: isNL ? "Minder handmatig werk" : "Less manual work",
      description: isNL ? "Binnen 90 dagen" : "Within 90 days"
    },
    {
      stat: "23 uur",
      label: isNL ? "Repetitieve taken per week" : "Repetitive tasks per week",
      description: isNL ? "Nederlandse bedrijven gemiddeld" : "Dutch businesses average"
    },
    {
      stat: "15 min",
      label: isNL ? "Van Amsterdam centrum" : "From Amsterdam center",
      description: isNL ? "Ons kantoor in Naarden" : "Our office in Naarden"
    }
  ];

  const services = [
    {
      title: isNL ? "Lead Generation Automatisering" : "Lead Generation Automation",
      description: isNL 
        ? "Automatische lead capture, kwalificatie en nurturing voor Amsterdamse bedrijven"
        : "Automatic lead capture, qualification and nurturing for Amsterdam businesses",
      features: [
        isNL ? "LinkedIn outreach automatisering" : "LinkedIn outreach automation",
        isNL ? "Lead scoring en segmentatie" : "Lead scoring and segmentation", 
        isNL ? "Email nurturing sequences" : "Email nurturing sequences"
      ]
    },
    {
      title: isNL ? "CRM & Sales Automatisering" : "CRM & Sales Automation",
      description: isNL 
        ? "Gestroomlijnde sales processen en klantrelatiebeheer"
        : "Streamlined sales processes and customer relationship management",
      features: [
        isNL ? "Automatische deal tracking" : "Automatic deal tracking",
        isNL ? "Follow-up herinneringen" : "Follow-up reminders",
        isNL ? "Sales rapportage" : "Sales reporting"
      ]
    },
    {
      title: isNL ? "Customer Service Automatisering" : "Customer Service Automation",
      description: isNL 
        ? "24/7 klantenservice met AI chatbots en automatische ticket routing"
        : "24/7 customer service with AI chatbots and automatic ticket routing",
      features: [
        isNL ? "AI chatbot implementatie" : "AI chatbot implementation",
        isNL ? "Ticket prioritering" : "Ticket prioritization",
        isNL ? "Kennisbank integratie" : "Knowledge base integration"
      ]
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "AI Automatisering Amsterdam | Lokale Expert | Octomatic" : "AI Automation Amsterdam | Local Expert | Octomatic"}
        description={isNL ? "AI automatisering specialist in Amsterdam. Lokaal kantoor in Naarden, Nederlandse marktkennis, GDPR compliant. Bespaar €50.000+ per jaar." : "AI automation specialist in Amsterdam. Local office in Naarden, Dutch market knowledge, GDPR compliant. Save €50,000+ per year."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/ai-automation-amsterdam" : "https://www.octomatic.ai/services/ai-automation-amsterdam"}
        keywords={isNL ? "AI automatisering Amsterdam, lokaal, GDPR, Nederlandse markt, Naarden" : "AI automation Amsterdam, local, GDPR, Dutch market, Naarden"}
        areaServed="Amsterdam, Netherlands"
        serviceType="AI Automation Services"
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
                      <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#4585f4]" />
                        <span className="text-[#4585f4] font-medium text-sm">
                          {isNL ? "Amsterdam & Omgeving" : "Amsterdam & Region"}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "AI Automatisering specialist in Amsterdam" : "AI Automation specialist in Amsterdam"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Lokaal gevestigd in Naarden met diepgaande kennis van de Nederlandse markt en GDPR wetgeving. Bespaar €50.000+ per jaar met bewezen automatiseringsoplossingen."
                      ) : (
                        "Locally based in Naarden with deep knowledge of the Dutch market and GDPR legislation. Save €50,000+ per year with proven automation solutions."
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
                        {isNL ? "Boek Lokale Consultatie" : "Book Local Consultation"}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-secondary/50 dark:from-gray-800/50 to-background/50 dark:to-gray-900/50 backdrop-blur-sm border border-border/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <Building className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading dark:text-white">
                              {isNL ? "Lokale expertise" : "Local expertise"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "Nederlandse marktkennis" : "Dutch market knowledge"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">GDPR</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Compliant" : "Compliant"}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">15min</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {isNL ? "Van Amsterdam" : "From Amsterdam"}
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

          {/* Amsterdam Stats */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Amsterdam automatisering in cijfers" : "Amsterdam automation in numbers"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Waarom Amsterdamse bedrijven kiezen voor lokale AI automatisering"
                    : "Why Amsterdam businesses choose local AI automation"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {amsterdamStats.map((item, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 text-center hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-4">{item.stat}</div>
                    <div className="text-lg font-semibold text-heading dark:text-white mb-2">{item.label}</div>
                    <div className="text-muted-foreground dark:text-gray-400 text-sm">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Local Benefits */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Waarom lokale automatisering?" : "Why local automation?"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "De voordelen van samenwerken met een lokale AI automatisering specialist"
                    : "The benefits of working with a local AI automation specialist"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {localBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#4585f4]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-heading dark:text-white mb-3">{benefit.title}</h3>
                          <p className="text-foreground dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Onze Amsterdam services" : "Our Amsterdam services"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Gespecialiseerde automatiseringsoplossingen voor Amsterdamse bedrijven"
                    : "Specialized automation solutions for Amsterdam businesses"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <h3 className="text-xl font-bold text-heading dark:text-white mb-4">{service.title}</h3>
                    <p className="text-foreground dark:text-gray-300 leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-[#4585f4]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-[#4585f4]" />
                          </div>
                          <p className="text-muted-foreground dark:text-gray-400 text-sm">{feature}</p>
                        </div>
                      ))}
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
                    {isNL ? "Klaar voor lokale automatisering?" : "Ready for local automation?"}
                  </h2>
                  <p className="text-xl text-foreground dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Ontdek hoe onze lokale expertise en Nederlandse marktkennis uw bedrijf kan helpen €50.000+ per jaar te besparen."
                      : "Discover how our local expertise and Dutch market knowledge can help your business save €50,000+ per year."
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
                      {isNL ? "Boek Lokale Consultatie" : "Book Local Consultation"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "Persoonlijk gesprek • Lokaal kantoor • GDPR compliant" : "Personal consultation • Local office • GDPR compliant"}
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

export default AIAutomationAmsterdamPage;
