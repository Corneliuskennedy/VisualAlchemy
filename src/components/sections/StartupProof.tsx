'use client';

import React from 'react';
import { Star, TrendingUp, Users, Calendar, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import FounderStoryCard from './FounderStoryCard';

interface FounderStory {
  founder: string;
  company: string;
  story: string;
  outcome: string;
  avatar?: string;
}

interface StartupProofProps {
  founderStories: FounderStory[];
  metrics: {
    avgTimeToFirstCustomer: string;
    avgMRRAt30Days: string;
    successRate: string;
  };
}

const StartupProof: React.FC<StartupProofProps> = ({ 
  founderStories, 
  metrics 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const validationMetrics = [
    {
      icon: Calendar,
      metric: metrics.avgTimeToFirstCustomer,
      label: isNL ? 'Gemiddelde tijd tot eerste klant' : 'Average time to first customer',
      color: 'text-orange-400'
    },
    {
      icon: TrendingUp,
      metric: metrics.avgMRRAt30Days,
      label: isNL ? 'Gemiddelde MRR na 30 dagen' : 'Average MRR after 30 days',
      color: 'text-green-400'
    },
    {
      icon: Star,
      metric: metrics.successRate,
      label: isNL ? 'Success rate (betalende klanten)' : 'Success rate (paying customers)',
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Validation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {validationMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center p-8 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-6">
                <Icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div className={`text-4xl md:text-5xl font-bold ${item.color} mb-4 font-archivo`}>
                {item.metric}
              </div>
              <p className="text-gray-300 font-medium font-archivo">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Founder Stories */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {isNL ? 'Echte Founder Verhalen' : 'Real Founder Stories'}
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-archivo">
            {isNL 
              ? 'Hoor direct van founders die hun 30-dagen sprint succesvol hebben afgerond'
              : 'Hear directly from founders who successfully completed their 30-day sprint'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founderStories.map((story, index) => (
            <FounderStoryCard
              key={index}
              founder={story.founder}
              company={story.company}
              story={story.story}
              outcome={story.outcome}
              avatar={story.avatar}
            />
          ))}
        </div>
      </div>

      {/* 4-Week Sprint Methodology Preview */}
      <div className="bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 border border-orange-500/30 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/40 to-red-600/40 border border-orange-400/50 rounded-full px-8 py-4 shadow-xl mb-6">
            <Users className="w-6 h-6 text-orange-400" />
            <span className="text-orange-300 font-black text-lg uppercase tracking-widest font-archivo">
              {isNL ? 'BEWEZEN METHODOLOGIE' : 'PROVEN METHODOLOGY'}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-archivo">
            {isNL ? 'De 4-Week Sprint die Werkt' : 'The 4-Week Sprint that Works'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { week: 1, focus: isNL ? 'Validatie' : 'Validation' },
              { week: 2, focus: isNL ? 'Prototype' : 'Prototype' },
              { week: 3, focus: isNL ? 'Testen' : 'Testing' },
              { week: 4, focus: isNL ? 'Launch' : 'Launch' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05]">
                <div className="text-2xl font-bold text-orange-400 mb-2 font-archivo">
                  {isNL ? `Week ${item.week}` : `Week ${item.week}`}
                </div>
                <div className="text-sm text-gray-300 font-archivo">
                  {item.focus}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-8 font-archivo">
            {isNL
              ? 'Elke week heeft een duidelijk doel. Jij focust op product en klanten, wij zorgen voor alle operationele automatisering. Aan het einde heb je betalende klanten én een schaalbare basis.'
              : 'Each week has a clear goal. You focus on product and customers, we handle all operational automation. At the end you have paying customers and a scalable foundation.'
            }
          </p>

          {/* CTA */}
          <button
            className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transform-gpu font-archivo"
            data-cal-namespace="startup-kickoff-workshop"
            data-cal-link="kennet-timmers/workshop"
            data-cal-config='{"layout":"month_view"}'
          >
            <span className="relative z-10 flex items-center gap-3">
              <Users className="w-6 h-6" />
              {isNL ? 'BOEK JE KICKOFF WORKSHOP' : 'BOOK YOUR KICKOFF WORKSHOP'}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
            {isNL ? '✓ Gratis 90-min workshop ✓ Geen betaling tot resultaat ✓ Beperkt tot 3 startups/maand' : '✓ Free 90-min workshop ✓ No payment until results ✓ Limited to 3 startups/month'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartupProof;
