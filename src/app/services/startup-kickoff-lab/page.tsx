'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Rocket, Users, Target, Euro, CheckCircle, ArrowRight, ArrowLeft, Clock, Zap, Star, Download, ExternalLink } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useCalIntroCall, useCalWorkshop } from '@/hooks/use-cal';
import Image from 'next/image';

const StartupKickoffLabPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  useCalIntroCall();
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
      title: isNL ? 'Startup Kickoff Lab' : 'Startup Kickoff Lab',
      titleNL: 'Startup Kickoff Lab',
      href: isNL ? '/nl/services/startup-kickoff-lab' : '/services/startup-kickoff-lab',
      isCurrent: true
    }
  ];

  const proofPoints = [
    {
      outcome: isNL ? "Gevalideerde waitlist" : "Validated waitlist",
      description: isNL ? "37 signups in 2 weken" : "37 signups in 2 weeks"
    },
    {
      outcome: isNL ? "Eerste 10 interviews" : "First 10 interviews",
      description: isNL ? "Klant inzichten binnen 1 week" : "Customer insights within 1 week"
    },
    {
      outcome: isNL ? "Shipping MVP" : "Shipping MVP",
      description: isNL ? "Live product in 30 dagen" : "Live product in 30 days"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Kickoff",
      duration: isNL ? "Week 1" : "Week 1",
      description: isNL 
        ? "Idee validatie, marktonderzoek en MVP scope definitie samen met het team"
        : "Idea validation, market research and MVP scope definition with the team"
    },
    {
      step: "2", 
      title: "Prototype",
      duration: isNL ? "Week 2-3" : "Week 2-3",
      description: isNL 
        ? "Rapid prototyping en eerste versie bouwen met user feedback loops"
        : "Rapid prototyping and building first version with user feedback loops"
    },
    {
      step: "3",
      title: "Test",
      duration: isNL ? "Week 3-4" : "Week 3-4", 
      description: isNL 
        ? "User testing, data verzameling en product-market fit validatie"
        : "User testing, data collection and product-market fit validation"
    },
    {
      step: "4",
      title: "Iterate",
      duration: isNL ? "Week 4" : "Week 4",
      description: isNL 
        ? "Feedback implementatie, launch voorbereiding en next steps planning"
        : "Feedback implementation, launch preparation and next steps planning"
    }
  ];

  const packages = [
    {
      name: isNL ? "Workshop" : "Workshop",
      price: "€399",
      duration: isNL ? "1 dag intensief" : "1 day intensive",
      description: isNL 
        ? "Perfecte start voor idee validatie en MVP planning"
        : "Perfect start for idea validation and MVP planning",
      features: [
        isNL ? "Idee validatie framework" : "Idea validation framework",
        isNL ? "Markt analyse" : "Market analysis",
        isNL ? "MVP roadmap" : "MVP roadmap",
        isNL ? "Tech stack advies" : "Tech stack advice",
        isNL ? "Go-to-market strategie" : "Go-to-market strategy"
      ],
      cta: isNL ? "Boek Workshop" : "Book Workshop",
      calNamespace: "automation-strategy-workshop"
    },
    {
      name: isNL ? "30-day MVP Sprint" : "30-day MVP Sprint",
      price: "€4.500",
      duration: isNL ? "4 weken intensief" : "4 weeks intensive",
      description: isNL 
        ? "Volledige MVP ontwikkeling van idee tot werkend product"
        : "Complete MVP development from idea to working product",
      features: [
        isNL ? "Alles uit Workshop" : "Everything from Workshop",
        isNL ? "Hands-on development" : "Hands-on development",
        isNL ? "User testing & feedback" : "User testing & feedback",
        isNL ? "Launch ondersteuning" : "Launch support",
        isNL ? "2 maanden follow-up" : "2 months follow-up"
      ],
      cta: isNL ? "Boek Fit Call" : "Book Fit Call",
      calNamespace: "intro-call",
      popular: true
    },
    {
      name: isNL ? "Retainer" : "Retainer",
      price: "€1.500/m",
      duration: isNL ? "Doorlopend" : "Ongoing",
      description: isNL 
        ? "Continue ondersteuning voor groei en product ontwikkeling"
        : "Continuous support for growth and product development",
      features: [
        isNL ? "20 uur per maand" : "20 hours per month",
        isNL ? "Product roadmap" : "Product roadmap",
        isNL ? "Feature development" : "Feature development",
        isNL ? "Growth hacking" : "Growth hacking",
        isNL ? "Maandelijkse reviews" : "Monthly reviews"
      ],
      cta: isNL ? "Boek Gesprek" : "Book Call",
      calNamespace: "intro-call"
    }
  ];

  const faqs = [
    {
      question: isNL ? "Wat is de scope van een MVP sprint?" : "What is the scope of an MVP sprint?",
      answer: isNL 
        ? "We focussen op de kern functionaliteit die uw hypothese test. Meestal 1-3 key features, responsive web app of mobile app, basis user management en analytics setup."
        : "We focus on core functionality that tests your hypothesis. Usually 1-3 key features, responsive web app or mobile app, basic user management and analytics setup."
    },
    {
      question: isNL ? "Welke tech stack gebruiken jullie?" : "What tech stack do you use?",
      answer: isNL 
        ? "Afhankelijk van uw behoeften: React/Next.js voor web, React Native voor mobile, Node.js/Python voor backend, PostgreSQL/MongoDB voor data. We kiezen altijd voor snelheid en schaalbaarheid."
        : "Depends on your needs: React/Next.js for web, React Native for mobile, Node.js/Python for backend, PostgreSQL/MongoDB for data. We always choose for speed and scalability."
    },
    {
      question: isNL ? "Wat hebben jullie van mij nodig?" : "What do you need from me?",
      answer: isNL 
        ? "Uw tijd (4-8 uur per week), toegang tot potentiële gebruikers voor testing, en bereidheid om snel beslissingen te maken. Wij zorgen voor de rest."
        : "Your time (4-8 hours per week), access to potential users for testing, and willingness to make quick decisions. We handle the rest."
    },
    {
      question: isNL ? "Hoe werkt de pricing?" : "How does pricing work?",
      answer: isNL 
        ? "Workshop: €399 vooraf. MVP Sprint: €1.500 vooraf, rest bij oplevering. Retainer: maandelijks vooraf betalen. Alle prijzen zijn exclusief BTW."
        : "Workshop: €399 upfront. MVP Sprint: €1,500 upfront, rest upon delivery. Retainer: monthly payment in advance. All prices exclude VAT."
    },
    {
      question: isNL ? "Wat gebeurt er na de 30 dagen?" : "What happens after the 30 days?",
      answer: isNL 
        ? "U heeft een werkend MVP, user feedback data, en een duidelijke roadmap. We kunnen doorgaan met een retainer of u gaat zelf verder - volledig aan u."
        : "You have a working MVP, user feedback data, and a clear roadmap. We can continue with a retainer or you go forward yourself - completely up to you."
    }
  ];

  const team = [
    {
      name: "Kennet Timmers",
      role: isNL ? "Lead Developer & Strategist" : "Lead Developer & Strategist",
      bio: isNL 
        ? "6+ jaar ervaring in startup ontwikkeling en AI automatisering. Heeft 12 startups gelanceerd."
        : "6+ years experience in startup development and AI automation. Launched 12 startups.",
      image: "/team/kennet_timmers.webp",
      linkedin: "https://linkedin.com/in/kennet-timmers"
    },
    {
      name: "Johna Partner", // Placeholder - replace with actual partner
      role: isNL ? "UX/UI Designer & Researcher" : "UX/UI Designer & Researcher", 
      bio: isNL 
        ? "Specialist in user research en rapid prototyping voor early-stage startups."
        : "Specialist in user research and rapid prototyping for early-stage startups.",
      image: "/team/kennet_timmers.webp",
      linkedin: "#"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Startup Kickoff Lab — MVP Sprint voor Founders | Octomatic" : "Startup Kickoff Lab — MVP Sprint for Founders | Octomatic"}
        description={isNL ? "Van idee naar eerste gebruikers in 30 dagen — samen. Een 4-weken MVP sprint voor pre-seed founders met Kennet als co-pilot." : "From idea to first users in 30 days — together. A 4-week MVP sprint for pre-seed founders with Kennet as co-pilot."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/services/startup-kickoff-lab" : "https://www.octomatic.ai/services/startup-kickoff-lab"}
        keywords={isNL ? "startup MVP, product development, pre-seed, founder support, Amsterdam" : "startup MVP, product development, pre-seed, founder support, Amsterdam"}
        serviceType="Startup MVP Development"
        priceRange="€399-€4500"
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
                        <Rocket className="w-4 h-4 text-[#4585f4]" />
                        <span className="text-[#4585f4] font-medium text-sm">
                          {isNL ? "Voor Startups" : "For Startups"}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading dark:text-white leading-[0.9] tracking-tight">
                        {isNL ? "Van idee naar eerste gebruikers in 30 dagen — samen" : "From idea to first users in 30 days — together"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground dark:text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Een 4-weken MVP sprint voor pre-seed founders (jij + Kennet als co-pilots)"
                      ) : (
                        "A 4-week MVP sprint for pre-seed founders (you + Kennet as co-pilots)"
                      )}
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="intro-call"
                        data-cal-link="kennet-timmers/intro-call"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        {isNL ? "Boek 15-min Fit Call" : "Book a 15-min Fit Call"}
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
                              {isNL ? "Bewezen resultaten" : "Proven results"}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-400">
                              {isNL ? "12 startups gelanceerd" : "12 startups launched"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {proofPoints.map((proof, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <div>
                                <span className="text-heading dark:text-white font-medium">{proof.outcome}</span>
                                <div className="text-muted-foreground dark:text-gray-400 text-sm">{proof.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Hoe het werkt" : "How it works"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Ons bewezen 4-stappen proces van idee tot werkend product"
                    : "Our proven 4-step process from idea to working product"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorks.map((step, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 text-center hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                    <div className="w-16 h-16 bg-[#4585f4] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-heading dark:text-white">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-heading dark:text-white mb-2">{step.title}</h3>
                    <div className="text-[#4585f4] font-medium text-sm mb-4">{step.duration}</div>
                    <p className="text-foreground dark:text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Pakketten" : "Packages"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Kies het niveau van ondersteuning dat bij uw startup past"
                    : "Choose the level of support that fits your startup"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                  <div key={index} className={`relative bg-secondary/20 dark:bg-gray-900/20 border rounded-3xl p-8 ${pkg.popular ? 'border-[#4585f4] bg-[#4585f4]/5 dark:bg-[#4585f4]/5' : 'border-border/50 dark:border-gray-800/50'} hover:bg-secondary/40 dark:hover:bg-gray-800/40 transition-all duration-300`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[#4585f4] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          {isNL ? 'Populair' : 'Popular'}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-heading dark:text-white mb-4">{pkg.name}</h3>
                      <div className="text-4xl font-bold text-[#4585f4] mb-2">{pkg.price}</div>
                      <div className="text-muted-foreground dark:text-gray-400 mb-4">{pkg.duration}</div>
                      <p className="text-foreground dark:text-gray-300 leading-relaxed">{pkg.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#4585f4] flex-shrink-0 mt-0.5" />
                          <p className="text-foreground dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="lg" 
                      className={`w-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-xl group ${
                        pkg.popular 
                          ? 'bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25' 
                          : 'bg-secondary dark:bg-gray-800 hover:bg-secondary/80 dark:hover:bg-gray-700 text-white'
                      }`}
                      data-cal-namespace={pkg.calNamespace}
                      data-cal-link={`kennet-timmers/${pkg.calNamespace === 'intro-call' ? 'intro-call' : 'workshop'}`}
                      data-cal-config='{"layout":"month_view"}'
                    >
                      {pkg.cta}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 bg-background relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Veelgestelde vragen" : "Frequently asked questions"}
                </h2>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-heading dark:text-white mb-4">{faq.question}</h3>
                    <p className="text-foreground dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                  {isNL ? "Over het team" : "About the team"}
                </h2>
                <p className="text-lg md:text-xl text-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Ervaren co-pilots die uw startup succes maken"
                    : "Experienced co-pilots who make your startup successful"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {team.map((member, index) => (
                  <div key={index} className="bg-secondary/20 dark:bg-gray-900/20 border border-border/50 dark:border-gray-800/50 rounded-2xl p-8 text-center">
                    <div className="w-32 h-32 relative mx-auto mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-heading dark:text-white mb-2">{member.name}</h3>
                    <div className="text-[#4585f4] font-medium mb-4">{member.role}</div>
                    <p className="text-foreground dark:text-gray-300 leading-relaxed mb-6">{member.bio}</p>
                    <Button variant="outline" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lead Magnet CTA */}
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading dark:text-white mb-6">
                    {isNL ? "Start met onze MVP roadmap template" : "Start with our MVP roadmap template"}
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    {isNL 
                      ? "Download onze gratis 1-pagina MVP roadmap template om uw idee te structureren voordat we beginnen."
                      : "Download our free 1-page MVP roadmap template to structure your idea before we start."
                    }
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button 
                      size="lg" 
                      className="px-12 py-6 text-xl font-bold bg-[#4585f4] dark:bg-[#4585f4] hover:bg-[#4585f4]/90 dark:hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 dark:hover:shadow-[#4585f4]/25 group"
                      data-cal-namespace="intro-call"
                      data-cal-link="kennet-timmers/intro-call"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      {isNL ? "Boek Fit Call" : "Book Fit Call"}
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="px-8 py-6 text-xl font-semibold border-[#4585f4] text-[#4585f4] dark:text-[#4585f4] hover:bg-[#4585f4] dark:hover:bg-[#4585f4] hover:text-white transition-all duration-300 group"
                      asChild
                    >
                      <Link href="#">
                        <Download className="mr-3 h-6 w-6" />
                        {isNL ? "Download Template" : "Download Template"}
                      </Link>
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground dark:text-gray-500">
                    {isNL ? "15-min fit call • Gratis template • Geen verplichtingen" : "15-min fit call • Free template • No obligations"}
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

export default StartupKickoffLabPage;
