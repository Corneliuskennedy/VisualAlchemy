'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import GridBackground from '@/components/ui/GridBackground';
import { CheckCircle, Target, TrendingUp, Shield, Calendar, FileText, ArrowRight, Users, BarChart3, AlertTriangle, Clock, Euro } from 'lucide-react';
import Link from 'next/link';
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { useCalWorkshop } from "@/hooks/use-cal";

const SectionDivider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4585f4] to-transparent" />
);

const AutomationStrategyWorkshopPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  // Initialize Cal.com booking system
  useCalWorkshop();

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Strategie Workshop' : 'Strategy Workshop',
      titleNL: 'Strategie Workshop',
      href: isNL ? '/nl/automation-strategy-workshop' : '/automation-strategy-workshop',
      isCurrent: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Automatisering Workshop | Blauwdruk" : "Automation Strategy Workshop"}
        description={isNL ? "Datagedreven automatiseringsroadmap met gegarandeerd ROI. Workshop voor Nederlandse MKB. Stop met gokken, start met plannen." : "Stop guessing which processes to automate. Get a data-driven automation roadmap with guaranteed ROI through our strategic workshop for Dutch SMEs."}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A]">
          {/* Navigation Header */}
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex justify-between items-center mb-12">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="service"
                />
                
                {/* Back to Home link */}
                <Link
                  href={isNL ? '/nl' : '/'}
                  className="inline-flex items-center text-[#4585f4] font-medium hover:text-[#4585f4]/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  {isNL ? 'Terug naar Home' : 'Back to Home'}
                </Link>
              </div>

              {/* Hero Content */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left Column - Content */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? 'Maak van uw team een motor van innovatie' : 'Turn your team into an engine of innovation'}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-2xl">
                      {isNL 
                        ? 'Automatisering faalt als het mensen vervangt. Het slaagt als het mensen versterkt. In deze workshop geven we uw team de methode om saaie, repetitieve taken te elimineren, zodat zij zich kunnen richten op het werk dat er echt toe doet.'
                        : 'Automation fails when it replaces people. It succeeds when it empowers them. In this workshop, we give your team the method to eliminate boring, repetitive tasks, so they can focus on the work that truly matters.'
                      }
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        size="lg" 
                        className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                        data-cal-namespace="automation-strategy-workshop"
                        data-cal-link="kennet-timmers/workshop"
                        data-cal-config='{"layout":"month_view"}'
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {isNL ? 'Boek een Gratis Gesprek' : 'Book a Free Scoping Call'}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Visual Element */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center">
                            <Target className="h-6 w-6 text-[#4585f4]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {isNL ? 'Strategische focus' : 'Strategic focus'}
                            </h3>
                            <p className="text-gray-400">
                              {isNL ? 'Data-gedreven besluitvorming' : 'Data-driven decision making'}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {isNL 
                            ? 'Een strategische workshop waarbij uw team de experts zijn. We creëren een omgeving van psychologische veiligheid waar iedereen openlijk kan delen hoe het werk écht wordt gedaan, en samen oplossingen kan ontwerpen die hen niet vervangen, maar juist meer tijd geven voor creativiteit en strategisch denken.'
                            : 'A strategic workshop where your team are the experts. We create an environment of psychological safety where everyone can openly share how work really gets done, and together design solutions that don\'t replace them, but give them more time for creativity and strategic thinking.'
                          }
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">3</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? 'Fasen' : 'Phases'}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-[#4585f4]/10 rounded-xl">
                            <div className="text-2xl font-bold text-[#4585f4]">ROI</div>
                            <div className="text-sm text-gray-400">
                              {isNL ? 'Gegarandeerd' : 'Guaranteed'}
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

          <SectionDivider />

          {/* Problem & Value Proposition */}
          <section className="py-16 md:py-24 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center space-y-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {isNL 
                    ? <>Technologie zonder strategie is gewoon <span className="text-red-400">dure chaos</span></>
                    : <>Technology without strategy is just <span className="text-red-400">expensive chaos</span></>
                  }
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {isNL 
                    ? "U weet dat u moet automatiseren om concurrerend te blijven. Maar u kent ook de risico's:"
                    : "You know you need to automate to stay competitive. But you also know the risks:"
                  }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pt-8">
                  <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-6 lg:col-span-2">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {isNL ? "Verspild budget" : "Wasted budget"}
                    </h3>
                    <p className="text-gray-400">
                      {isNL 
                        ? "Duizenden euro's investeren in software die een proces automatiseert dat fundamenteel gebroken is."
                        : "Investing thousands in software that automates a fundamentally broken process."
                      }
                    </p>
                  </div>
                  <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-6 lg:col-span-2">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {isNL ? "Operationele verstoring" : "Operational disruption"}
                    </h3>
                    <p className="text-gray-400">
                      {isNL 
                        ? "Een nieuwe tool implementeren die meer werk creëert in plaats van minder."
                        : "Implementing a new tool that creates more work instead of less."
                      }
                    </p>
                  </div>
                  <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-6 lg:col-span-2">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {isNL ? "Compliance nachtmerries" : "Compliance nightmares"}
                    </h3>
                    <p className="text-gray-400">
                      {isNL 
                        ? "AI implementeren zonder duidelijke GDPR-strategie, waardoor uw bedrijf juridische risico's loopt."
                        : "Adopting AI without a clear GDPR strategy, exposing your business to risk."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* The Process Section */}
          <section className="py-16 md:py-24 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {isNL ? <>Samen bouwen aan een <span className="text-[#4585f4]">slimmere werkwijze</span></> : <>Building a smarter way of working, <span className="text-[#4585f4]">together</span></>}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    {isNL ? 'Een drie-fasen proces waarbij uw team de experts zijn en wij faciliteren' : 'A three-phase process where your team are the experts and we facilitate'}
                  </p>
                </div>
                
                <div className="space-y-12">
                  {/* Phase 1 */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[#4585f4]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-[#4585f4]">1</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {isNL ? 'Fase 1: Value stream mapping' : 'Phase 1: Value stream mapping'}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                          {isNL 
                            ? <>Wij faciliteren, maar <strong className="text-white">uw team zijn de experts.</strong> We creëren een sfeer van psychologische veiligheid waarin iedereen openlijk kan delen hoe het werk <em>echt</em> wordt gedaan, zonder angst voor kritiek. Dit is de basis voor echte verbetering.</>
                            : <>We facilitate, but <strong className="text-white">your team are the experts.</strong> We create an atmosphere of psychological safety where everyone can openly share how work <em>really</em> gets done, without fear of criticism. This is the foundation for real improvement.</>
                          }
                        </p>
                        <div className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-xl p-4">
                          <p className="text-[#4585f4] font-semibold flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>
                              {isNL 
                                ? 'Resultaat: Een eerlijk, compleet beeld van hoe het werk écht gebeurt - inclusief de workarounds, frustraties en brillante improvisaties die uw team dagelijks maakt.'
                                : 'Outcome: An honest, complete picture of how work really happens - including the workarounds, frustrations, and brilliant improvisations your team makes daily.'
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[#4585f4]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-[#4585f4]">2</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {isNL ? 'Fase 2: Knelpunt identificatie & kwantificatie' : 'Phase 2: Bottleneck identification & quantification'}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                          {isNL 
                            ? <>Samen identificeren we de taken die het meest frustrerend en tijdrovend zijn—de "robot-taken". We kwantificeren niet alleen de kosten, maar ook de <strong className="text-white">impact op het werkplezier en de focus</strong> van uw team.</>
                            : <>Together we identify the tasks that are the most frustrating and time-consuming—the "robot tasks". We quantify not just the costs, but also the <strong className="text-white">impact on your team's job satisfaction and focus</strong>.</>
                          }
                        </p>
                        <div className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-xl p-4">
                          <p className="text-[#4585f4] font-semibold flex items-start gap-2">
                            <Target className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>
                              {isNL 
                                ? 'Resultaat: Een helder overzicht van welke taken uw team het meest energie kosten en hen belemmeren om hun beste werk te doen.'
                                : 'Outcome: A clear picture of which tasks drain your team\'s energy most and prevent them from doing their best work.'
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[#4585f4]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-[#4585f4]">3</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {isNL ? 'Fase 3: ROI prioritering & oplossing design' : 'Phase 3: ROI prioritization & solution design'}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                          {isNL 
                            ? <>Het team brainstormt over oplossingen die hen niet vervangen, maar juist <strong className="text-white">meer tijd geven voor creativiteit, klantcontact en strategisch denken.</strong> We prioriteren de "quick wins" die het team het snelst de voordelen van slimmere samenwerking laat ervaren.</>
                            : <>The team brainstorms solutions that don't replace them, but instead <strong className="text-white">give them more time for creativity, customer interaction, and strategic thinking.</strong> We prioritize the "quick wins" that most quickly let the team experience the benefits of smarter collaboration.</>
                          }
                        </p>
                        <div className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-xl p-4">
                          <p className="text-[#4585f4] font-semibold flex items-start gap-2">
                            <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>
                              {isNL 
                                ? 'Resultaat: Een roadmap die uw team enthousiast maakt om mee te werken, omdat ze zien hoe het hun werk betekenisvoller en interessanter maakt.'
                                : 'Outcome: A roadmap that gets your team excited to participate, because they see how it makes their work more meaningful and interesting.'
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* The Deliverable */}
          <section className="py-16 md:py-24 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {isNL ? <>Het resultaat: <span className="text-[#4585f4]">Een team dat eigenaarschap neemt</span></> : <>The result: <span className="text-[#4585f4]">A team that takes ownership</span></>}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                    {isNL 
                      ? 'Het belangrijkste resultaat van deze workshop is geen document. Het is een verandering in mindset. U krijgt een team dat niet langer bang is voor verandering, maar actief op zoek gaat naar manieren om slimmer te werken.'
                      : 'The most important result of this workshop is not a document. It is a change in mindset. You get a team that is no longer afraid of change, but actively seeks out ways to work smarter.'
                    }
                  </p>
                  <div className="w-24 h-1 bg-[#4585f4] mx-auto"></div>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                    data-cal-namespace="automation-strategy-workshop"
                    data-cal-link="kennet-timmers/workshop"
                    data-cal-config='{"layout":"month_view"}'
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {isNL ? 'Boek Uw Gratis Gesprek' : 'Book Your Free Scoping Call'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-gray-400 mt-4">
                    {isNL 
                      ? 'Een gesprek van 30 minuten om te bevestigen dat deze workshop geschikt is voor uw situatie.'
                      : 'A 30-minute call to confirm this workshop is right for you.'
                    }
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

export default AutomationStrategyWorkshopPage;
