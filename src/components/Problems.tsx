import React, { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react';
import { Hand, BatteryLow, EyeOff, ArrowRight, AlertTriangle, Euro } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from '@/hooks/useTranslations';
import { useRouter } from 'next/navigation';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from './ui/GridBackground';

const INITIAL_ANGLE = 225;
const ROTATION_DURATION = 4000;

interface ProblemCardProps {
  problem: {
    icon: React.ElementType;
    metric: string;
    title: string;
    description: string;
    details: string[];
    solution: string;
    cta: string;
    link: string;
  };
  index: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: (index: number) => void;
  angle: number;
}

const ProblemCard = memo<ProblemCardProps>(({ problem, index, onMouseEnter, onMouseLeave }) => {
  const cardRef = useScrollAnimation();
  const router = useRouter();
  const Icon = problem.icon;
  
  const handleLearnMore = useCallback(() => {
    router.push(problem.link);
  }, [router, problem.link]);
  
  return (
    <div
      ref={cardRef}
      className="relative p-8 rounded-lg border border-gray-800 bg-black/30 backdrop-blur-sm 
        group transition-all duration-300 ease-out opacity-0
        hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-primary/20"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
    >
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-[#6B8AE6]/10 flex items-center justify-center mb-6 
          group-hover:bg-[#6B8AE6]/15 transition-colors duration-300
          border border-[#6B8AE6]/20">
          <Icon className="h-7 w-7 text-[#6B8AE6]" />
        </div>
        <div className="text-3xl font-bold text-[#6B8AE6] mb-4">
          {problem.metric}
        </div>
        <h3 className="text-xl font-semibold mb-4 text-white/90">
          {problem.title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-4">
          {problem.description}
        </p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
            Common Challenges:
          </h4>
          <ul className="space-y-2">
            {problem.details.map((detail, idx) => (
              <li key={idx} className="text-sm text-gray-400 flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B8AE6] mt-2 mr-3 flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6 p-4 rounded-lg bg-[#6B8AE6]/5 border border-[#6B8AE6]/10">
          <h4 className="text-sm font-semibold text-[#6B8AE6] mb-2">
            Our Solution:
          </h4>
          <p className="text-sm text-gray-300">
            {problem.solution}
          </p>
        </div>
        
        <button
          onClick={handleLearnMore}
          className="inline-flex items-center text-[#6B8AE6] hover:text-white transition-colors duration-300 text-sm font-medium group/cta"
          aria-label={`Learn more about ${problem.title.toLowerCase()}`}
        >
          {problem.cta}
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover/cta:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
});

ProblemCard.displayName = 'ProblemCard';

const Problems = () => {
  const [cardAngles, setCardAngles] = useState<number[]>(Array(3).fill(0));
  const animationRefs = useRef<(number | null)[]>(Array(3).fill(null));
  const titleRef = useScrollAnimation();
  const { t, language } = useTranslations();
  const isLargeScreen = useIsLargeScreen();
  const isNL = language === 'nl';
  
  const handleMouseEnter = useCallback((index: number) => {
    // Simplified hover effect, no rotation animation needed
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    // Simplified hover effect, no rotation animation needed
  }, []);

  useEffect(() => {
    return () => {
      animationRefs.current.forEach(ref => {
        if (ref) {
          cancelAnimationFrame(ref);
        }
      });
    };
  }, []);

  const problems = useMemo(() => [
    {
      icon: Hand,
      metric: t('problems', 'repetitiveTasks.metric'),
      title: t('problems', 'repetitiveTasks.title'),
      description: t('problems', 'repetitiveTasks.description'),
      details: [
        'Manual data entry consuming 10+ hours per week',
        'Copy-paste operations between multiple systems',
        'Repetitive email responses and follow-ups',
        'Invoice processing and approval workflows'
      ],
      solution: 'We implement intelligent automation workflows that handle repetitive tasks 24/7, freeing your team for strategic work.',
      cta: 'Explore Process Automation',
      link: language === 'nl' ? '/nl/services/automation-roi-consulting' : '/services/automation-roi-consulting'
    },
    {
      icon: BatteryLow,
      metric: t('problems', 'outdatedSystems.metric'),
      title: t('problems', 'outdatedSystems.title'),
      description: t('problems', 'outdatedSystems.description'),
      details: [
        'Legacy software requiring manual workarounds',
        'Disconnected systems creating data silos',
        'Slow response times impacting productivity',
        'Expensive maintenance and upgrade costs'
      ],
      solution: 'Our custom integrations connect your existing systems seamlessly, extending their lifespan while improving efficiency.',
      cta: 'Learn About Integrations',
      link: language === 'nl' ? '/nl/services/ai-service-fulfillment' : '/services/ai-service-fulfillment'
    },
    {
      icon: EyeOff,
      metric: t('problems', 'missingData.metric'),
      title: t('problems', 'missingData.title'),
      description: t('problems', 'missingData.description'),
      details: [
        'Decisions based on incomplete information',
        'Manual reporting consuming valuable time',
        'Missed opportunities due to delayed insights',
        'Inconsistent data across departments'
      ],
      solution: 'We create automated dashboards and reporting systems that provide real-time insights for better decision-making.',
      cta: 'Discover Analytics Solutions',
      link: language === 'nl' ? '/nl/services/project-management' : '/services/project-management'
    }
  ], [t, language]);

  return (
    <div className="relative overflow-hidden" id="business-challenges">
      {/* No local background - let global background show through */}
      
      <div className="relative z-10 mx-auto px-6 w-full max-w-6xl py-16">
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            {isNL ? (
              <>Uw bedrijf <span className="text-red-400">lekt geld</span></>
            ) : (
              <>Your business is <span className="text-red-400">leaking money</span></>
            )}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo">
            {isNL 
              ? "Elk handmatig proces, losgekoppeld systeem en repetitieve taak is een verborgen belasting op uw groei. Wij laten u zien waar."
              : "Every manual process, disconnected system, and repetitive task is a hidden tax on your growth. We'll show you where."
            }
          </p>
        </div>

        {/* THE HIDDEN COSTS - Big Red Urgent Card */}
        <div className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-red-900/30 via-red-800/20 to-orange-900/30 border-2 border-red-500/40 rounded-3xl p-12 max-w-5xl mx-auto">
            {/* Animated Warning Stripes */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" />
            
            {/* Urgency Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/40 to-orange-600/40 border border-red-400/50 rounded-full px-8 py-4 shadow-xl">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span className="text-red-300 font-black text-lg uppercase tracking-widest font-archivo">
                  {isNL ? "DE VERBORGEN KOSTEN" : "THE HIDDEN COSTS"}
                </span>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>

            {/* Problem Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Wasted Time */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Hand className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-red-400 mb-2 font-archivo">10+ hours lost per week</div>
                <div className="text-red-300 font-bold text-lg mb-4 font-archivo">Wasted time</div>
                <p className="text-gray-200 leading-relaxed font-archivo">
                  {isNL 
                    ? "Uw beste mensen verspillen tijd aan handmatige data-invoer, kopiëren tussen systemen en repetitieve taken die geautomatiseerd kunnen worden."
                    : "Your best people waste time on manual data entry, copying between systems, and repetitive tasks that could be automated."
                  }
                </p>
                <div className="mt-4 text-sm text-gray-300 font-archivo">
                  <div className="font-semibold text-red-300 mb-2">{isNL ? "Veelvoorkomende uitdagingen:" : "Common Challenges:"}</div>
                  <ul className="text-left space-y-1">
                    <li>• {isNL ? "Handmatige data-invoer 10+ uur per week" : "Manual data entry consuming 10+ hours per week"}</li>
                    <li>• {isNL ? "Kopiëren tussen meerdere systemen" : "Copy-paste operations between multiple systems"}</li>
                    <li>• {isNL ? "Repetitieve e-mailresponses" : "Repetitive email responses and follow-ups"}</li>
                    <li>• {isNL ? "Factuurverwerking workflows" : "Invoice processing and approval workflows"}</li>
                  </ul>
                </div>
              </div>

              {/* Hidden Costs */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Euro className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-orange-400 mb-2 font-archivo">€5,630/month loss</div>
                <div className="text-orange-300 font-bold text-lg mb-4 font-archivo">Hidden costs</div>
                <p className="text-gray-200 leading-relaxed font-archivo">
                  {isNL 
                    ? "Inefficiënte workflows, handmatige fouten en legacy software eten stilletjes in uw winst zonder dat u het doorheeft."
                    : "Inefficient workflows, manual errors, and legacy software silently eat into your profits without you realizing it."
                  }
                </p>
                <div className="mt-4 text-sm text-gray-300 font-archivo">
                  <div className="font-semibold text-orange-300 mb-2">{isNL ? "Veelvoorkomende uitdagingen:" : "Common Challenges:"}</div>
                  <ul className="text-left space-y-1">
                    <li>• {isNL ? "Legacy software met handmatige workarounds" : "Legacy software requiring manual workarounds"}</li>
                    <li>• {isNL ? "Losgekoppelde systemen creëren data silo's" : "Disconnected systems creating data silos"}</li>
                    <li>• {isNL ? "Trage reactietijden beïnvloeden productiviteit" : "Slow response times impacting productivity"}</li>
                    <li>• {isNL ? "Dure onderhouds- en upgradekosten" : "Expensive maintenance and upgrade costs"}</li>
                  </ul>
                </div>
              </div>

              {/* Manual Reporting */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <EyeOff className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-yellow-400 mb-2 font-archivo">8+ hours per month wasted on reporting</div>
                <div className="text-yellow-300 font-bold text-lg mb-4 font-archivo">Manual reporting</div>
                <p className="text-gray-200 leading-relaxed font-archivo">
                  {isNL 
                    ? "U verspilt waardevolle managementtijd aan het handmatig verzamelen van data, wat leidt tot trage, onbetrouwbare en uiteindelijk kostbare beslissingen."
                    : "You waste valuable management time manually gathering data, which leads to slow, unreliable, and ultimately costly decisions."
                  }
                </p>
                <div className="mt-4 text-sm text-gray-300 font-archivo">
                  <div className="font-semibold text-yellow-300 mb-2">{isNL ? "Veelvoorkomende uitdagingen:" : "Common Challenges:"}</div>
                  <ul className="text-left space-y-1">
                    <li>• {isNL ? "Beslissingen gebaseerd op incomplete informatie" : "Decisions based on incomplete information"}</li>
                    <li>• {isNL ? "Handmatige rapportage neemt waardevolle tijd in beslag" : "Manual reporting consuming valuable time"}</li>
                    <li>• {isNL ? "Gemiste kansen door vertraagde inzichten" : "Missed opportunities due to delayed insights"}</li>
                    <li>• {isNL ? "Inconsistente data tussen afdelingen" : "Inconsistent data across departments"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="mb-6">
                <div className="text-3xl font-black text-white mb-2 font-archivo">
                  {isNL ? "Totale impact: €67,560+ per jaar" : "Total Impact: €67,560+ per year"}
                </div>
                <p className="text-red-300 font-semibold font-archivo">
                  {isNL ? "Gebaseerd op conservatieve schattingen voor Nederlandse MKB bedrijven" : "Based on conservative estimates for Dutch SME companies"}
                </p>
              </div>
              
              <button
                className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:scale-105 transform-gpu font-archivo"
                data-cal-namespace="automation-strategy-workshop"
                data-cal-link="kennet-timmers/workshop"
                data-cal-config='{"layout":"month_view"}'
              >
                <span className="relative z-10 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  {isNL ? "STOP HET GELDLEK - GRATIS AUDIT" : "STOP THE MONEY LEAK - FREE AUDIT"}
                  <AlertTriangle className="w-6 h-6" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              </button>
              
              <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
                {isNL ? "✓ Geen verplichtingen ✓ 100% gratis ✓ Direct inzicht in besparingen" : "✓ No obligations ✓ 100% free ✓ Immediate savings insights"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
