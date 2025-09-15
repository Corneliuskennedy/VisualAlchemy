'use client';

import React from 'react';
import { Building2, Euro, Clock, TrendingUp, ArrowRight, Shield } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import CaseStudyCard from './CaseStudyCard';

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: {
    timeSaved: string;
    costReduction: string;
    errorReduction: string;
  };
}

interface SMEProofProps {
  caseStudies: CaseStudy[];
  savings: {
    avgAnnualSavings: string;
    avgTimeReduction: string;
    avgROI: string;
  };
}

const SMEProof: React.FC<SMEProofProps> = ({ 
  caseStudies, 
  savings 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const savingsMetrics = [
    {
      icon: Euro,
      metric: savings.avgAnnualSavings,
      label: isNL ? 'Gemiddelde jaarlijkse besparing' : 'Average annual savings',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      metric: savings.avgTimeReduction,
      label: isNL ? 'Gemiddelde tijd besparing' : 'Average time reduction',
      color: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      metric: savings.avgROI,
      label: isNL ? 'Gemiddelde ROI' : 'Average ROI',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Savings Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {savingsMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center p-8 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-6">
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

      {/* Case Studies */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {isNL ? 'Bewezen Resultaten' : 'Proven Results'}
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-archivo">
            {isNL 
              ? 'Echte Nederlandse bedrijven die hun processen succesvol hebben getransformeerd'
              : 'Real Dutch businesses that successfully transformed their processes'
            }
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              company={study.company}
              industry={study.industry}
              challenge={study.challenge}
              solution={study.solution}
              result={study.result}
              metrics={study.metrics}
            />
          ))}
        </div>
      </div>

      {/* ROI Guarantee Section */}
      <div className="bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600/40 to-blue-600/40 border border-green-400/50 rounded-full px-8 py-4 shadow-xl mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-black text-lg uppercase tracking-widest font-archivo">
              {isNL ? 'RESULTAAT GEGARANDEERD' : 'RESULTS GUARANTEED'}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-archivo">
            {isNL ? 'Onze ROI Garantie' : 'Our ROI Guarantee'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                title: isNL ? 'Minimaal 40%' : 'Minimum 40%',
                subtitle: isNL ? 'Kostenreductie' : 'Cost Reduction',
                description: isNL ? 'Binnen 90 dagen' : 'Within 90 days'
              },
              { 
                title: isNL ? '100% Gratis' : '100% Free',
                subtitle: isNL ? 'Bij geen resultaat' : 'If no results',
                description: isNL ? 'We werken door tot het wel lukt' : 'We work until it works'
              },
              { 
                title: isNL ? 'Lokale Support' : 'Local Support',
                subtitle: isNL ? 'Nederlandse tijd' : 'Dutch timezone',
                description: isNL ? 'Directe communicatie' : 'Direct communication'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05]">
                <div className="text-2xl font-bold text-blue-400 mb-2 font-archivo">
                  {item.title}
                </div>
                <div className="text-lg font-semibold text-white mb-2 font-archivo">
                  {item.subtitle}
                </div>
                <div className="text-sm text-gray-300 font-archivo">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-8 font-archivo">
            {isNL
              ? 'We zijn zo zeker van onze methodologie dat we een volledige ROI garantie geven. Geen resultaat? Geen betaling. Zo simpel is het.'
              : 'We\'re so confident in our methodology that we offer a complete ROI guarantee. No results? No payment. It\'s that simple.'
            }
          </p>

          {/* CTA */}
          <button
            className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform-gpu font-archivo"
            data-cal-namespace="automation-strategy-workshop"
            data-cal-link="kennet-timmers/intro-call"
            data-cal-config='{"layout":"month_view"}'
          >
            <span className="relative z-10 flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              {isNL ? 'PLAN JE GRATIS AUDIT' : 'SCHEDULE YOUR FREE AUDIT'}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
            {isNL ? '✓ 60-min gratis proces audit ✓ ROI berekening ✓ Geen verplichtingen' : '✓ 60-min free process audit ✓ ROI calculation ✓ No obligations'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SMEProof;
