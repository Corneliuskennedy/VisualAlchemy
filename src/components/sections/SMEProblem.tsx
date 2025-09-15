'use client';

import React from 'react';
import { Euro, Clock, AlertTriangle, TrendingDown, Target } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import CostLeakCard from './CostLeakCard';

interface SMEProblemProps {
  content: {
    title: string;
    subtitle: string;
  };
  metrics: {
    annualLoss: string;
    timeWasted: string;
    errorCost: string;
  };
}

const SMEProblem: React.FC<SMEProblemProps> = ({ content, metrics }) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const costLeaks = [
    {
      title: isNL ? 'Handmatige Processen' : 'Manual Processes',
      amount: isNL ? '€35.000/jaar' : '€35,000/year',
      description: isNL 
        ? 'Uw team verspilt 23 uur per week aan repetitieve taken die geautomatiseerd kunnen worden.'
        : 'Your team wastes 23 hours per week on repetitive tasks that could be automated.',
      icon: Clock,
      color: 'from-red-500 to-red-600',
      accentColor: 'text-red-400',
      details: isNL ? [
        'Data invoer tussen verschillende systemen',
        'Handmatige factuurverwerking',
        'Repetitieve email communicatie',
        'Handmatige rapportage en analyses'
      ] : [
        'Data entry between different systems',
        'Manual invoice processing',
        'Repetitive email communication',
        'Manual reporting and analysis'
      ]
    },
    {
      title: isNL ? 'Systeem Inefficiënties' : 'System Inefficiencies',
      amount: isNL ? '€20.560/jaar' : '€20,560/year',
      description: isNL
        ? 'Losgekoppelde systemen en verouderde workflows creëren onnodige complexiteit en vertragingen.'
        : 'Disconnected systems and outdated workflows create unnecessary complexity and delays.',
      icon: TrendingDown,
      color: 'from-orange-500 to-orange-600',
      accentColor: 'text-orange-400',
      details: isNL ? [
        'Data silo\'s tussen afdelingen',
        'Dubbele data invoer',
        'Vertraagde besluitvorming',
        'Inconsistente processen'
      ] : [
        'Data silos between departments',
        'Duplicate data entry',
        'Delayed decision making',
        'Inconsistent processes'
      ]
    },
    {
      title: isNL ? 'Menselijke Fouten' : 'Human Errors',
      amount: isNL ? '€12.000/jaar' : '€12,000/year',
      description: isNL
        ? 'Handmatige processen leiden tot kostbare fouten, hercorrectie en klantontevredenheid.'
        : 'Manual processes lead to costly errors, rework, and customer dissatisfaction.',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      accentColor: 'text-yellow-400',
      details: isNL ? [
        'Factuur fouten en correcties',
        'Verkeerde klantgegevens',
        'Gemiste deadlines',
        'Compliance overtredingen'
      ] : [
        'Invoice errors and corrections',
        'Incorrect customer data',
        'Missed deadlines',
        'Compliance violations'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Cost Leak Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {costLeaks.map((leak, index) => (
          <CostLeakCard
            key={index}
            title={leak.title}
            amount={leak.amount}
            description={leak.description}
            icon={leak.icon}
            color={leak.color}
            accentColor={leak.accentColor}
            details={leak.details}
          />
        ))}
      </div>

      {/* The Hidden Cost Reality */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900/30 via-red-800/20 to-orange-900/30 border-2 border-red-500/40 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
        {/* Animated Warning Stripes */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" />
        
        {/* Urgency Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/40 to-orange-600/40 border border-red-400/50 rounded-full px-8 py-4 shadow-xl">
            <Euro className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-black text-lg uppercase tracking-widest font-archivo">
              {isNL ? 'DE VERBORGEN KOSTEN' : 'THE HIDDEN COSTS'}
            </span>
            <Euro className="w-6 h-6 text-red-400" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {isNL 
              ? 'Totale jaarlijkse impact: €67.560+'
              : 'Total annual impact: €67,560+'
            }
          </h3>
          
          <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-archivo">
            {isNL
              ? 'Dit zijn conservatieve schattingen gebaseerd op Nederlandse MKB bedrijven. Uw werkelijke kosten kunnen hoger zijn door gemiste kansen, klantontevredenheid en concurrentie nadeel.'
              : 'These are conservative estimates based on Dutch SME companies. Your actual costs may be higher due to missed opportunities, customer dissatisfaction, and competitive disadvantage.'
            }
          </p>

          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-2 font-archivo">€35.000</div>
              <div className="text-sm text-gray-300 font-archivo">{isNL ? 'Handmatige Processen' : 'Manual Processes'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2 font-archivo">€20.560</div>
              <div className="text-sm text-gray-300 font-archivo">{isNL ? 'Systeem Inefficiënties' : 'System Inefficiencies'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2 font-archivo">€12.000</div>
              <div className="text-sm text-gray-300 font-archivo">{isNL ? 'Menselijke Fouten' : 'Human Errors'}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <button
              className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:scale-105 transform-gpu font-archivo"
              data-cal-namespace="automation-strategy-workshop"
              data-cal-link="kennet-timmers/intro-call"
              data-cal-config='{"layout":"month_view"}'
            >
              <span className="relative z-10 flex items-center gap-3">
                <Target className="w-6 h-6" />
                {isNL ? 'STOP HET GELDLEK - GRATIS AUDIT' : 'STOP THE MONEY LEAK - FREE AUDIT'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </button>
            
            <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
              {isNL ? '✓ Geen verplichtingen ✓ 100% gratis ✓ Direct inzicht in besparingen' : '✓ No obligations ✓ 100% free ✓ Immediate savings insights'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMEProblem;
