import React, { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react';
import { Hand, BatteryLow, EyeOff, ArrowRight } from "lucide-react";
import GridBackground from './ui/GridBackground';
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from '@/hooks/useTranslations';
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { useRouter } from 'next/navigation';

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
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A]" id="business-challenges">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none" />
        </div>
      )}
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-24 opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white/90 leading-tight">
            {t('problems', 'title')}
            <span className="block text-[#6B8AE6] mt-4">
              {t('problems', 'subtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('problems', 'description')}
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-8">
              <div className="text-center p-6 rounded-lg bg-black/20 border border-gray-800/50">
                <div className="text-2xl font-bold text-[#6B8AE6] mb-2">€15,000+</div>
                <p className="text-sm text-gray-400">Typical annual savings per client</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-black/20 border border-gray-800/50">
                <div className="text-2xl font-bold text-[#6B8AE6] mb-2">40%</div>
                <p className="text-sm text-gray-400">Reduction in manual processing time</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-black/20 border border-gray-800/50">
                <div className="text-2xl font-bold text-[#6B8AE6] mb-2">12+</div>
                <p className="text-sm text-gray-400">Businesses successfully served</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Based on our hands-on experience working with Dutch businesses, these challenges are costing companies 
              significant time and money. The good news? We've developed proven automation solutions that consistently 
              deliver measurable ROI within 6 months for our clients.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              problem={problem}
              index={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              angle={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
