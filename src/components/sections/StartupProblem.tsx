'use client';

import React from 'react';
import { Clock, DollarSign, TrendingDown, AlertTriangle, Target } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import PainPointCard from './PainPointCard';

interface StartupProblemProps {
  content: {
    title: string;
    subtitle: string;
  };
  metrics: {
    timeWasted: string;
    cashBurn: string;
    delayedValidation: string;
  };
}

const StartupProblem: React.FC<StartupProblemProps> = ({ content, metrics }) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const painPoints = [
    {
      icon: Clock,
      title: isNL ? 'Tijd Verspilling' : 'Time Waste',
      description: isNL 
        ? 'Je besteedt 15-25 uur per week aan operationele taken in plaats van klanten te vinden en je product te valideren.'
        : 'You spend 15-25 hours per week on operational tasks instead of finding customers and validating your product.',
      impact: metrics.timeWasted,
      color: 'from-red-500 to-red-600',
      accentColor: 'text-red-400',
      details: isNL ? [
        'Handmatige boekhouding en administratie',
        'Email management en klantcommunicatie',
        'Projectmanagement en planning',
        'Rapportage en data verzameling'
      ] : [
        'Manual bookkeeping and administration',
        'Email management and customer communication',
        'Project management and planning',
        'Reporting and data collection'
      ]
    },
    {
      icon: DollarSign,
      title: isNL ? 'Cash Burn Crisis' : 'Cash Burn Crisis',
      description: isNL
        ? 'Elke maand die je besteedt aan operaties in plaats van customer discovery kost je €3.000-€8.000 aan runway.'
        : 'Every month spent on operations instead of customer discovery costs you €3,000-€8,000 in runway.',
      impact: metrics.cashBurn,
      color: 'from-orange-500 to-orange-600',
      accentColor: 'text-orange-400',
      details: isNL ? [
        'Verlengde time-to-market',
        'Verhoogde operationele kosten',
        'Gemiste investeringsmogelijkheden',
        'Vertraagde product-market fit'
      ] : [
        'Extended time-to-market',
        'Increased operational costs',
        'Missed investment opportunities',
        'Delayed product-market fit'
      ]
    },
    {
      icon: TrendingDown,
      title: isNL ? 'Validatie Vertraging' : 'Validation Delay',
      description: isNL
        ? 'Terwijl je bezig bent met operaties, lopen je concurrenten 3-6 maanden voor op product validatie en markt penetratie.'
        : 'While you\'re busy with operations, competitors are 3-6 months ahead in product validation and market penetration.',
      impact: metrics.delayedValidation,
      color: 'from-yellow-500 to-yellow-600',
      accentColor: 'text-yellow-400',
      details: isNL ? [
        'Gemiste early adopter momentum',
        'Concurrentie voordeel verlies',
        'Vertraagde feedback loops',
        'Langzamere iteratie cyclus'
      ] : [
        'Missed early adopter momentum',
        'Lost competitive advantage',
        'Delayed feedback loops',
        'Slower iteration cycles'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Pain Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {painPoints.map((painPoint, index) => (
          <PainPointCard
            key={index}
            title={painPoint.title}
            description={painPoint.description}
            impact={painPoint.impact}
            icon={painPoint.icon}
            color={painPoint.color}
            accentColor={painPoint.accentColor}
            details={painPoint.details}
          />
        ))}
      </div>

      {/* The Reality Check */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900/30 via-red-800/20 to-orange-900/30 border-2 border-red-500/40 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
        {/* Animated Warning Stripes */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" />
        
        {/* Urgency Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/40 to-orange-600/40 border border-red-400/50 rounded-full px-8 py-4 shadow-xl">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-black text-lg uppercase tracking-widest font-archivo">
              {isNL ? 'DE REALITEIT' : 'THE REALITY'}
            </span>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {isNL 
              ? 'Elke dag zonder klanten is een dag dichter bij faillissement'
              : 'Every day without customers is a day closer to failure'
            }
          </h3>
          
          <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-archivo">
            {isNL
              ? 'Terwijl jij bezig bent met boekhouding, bouwen je concurrenten relaties met klanten. Terwijl jij emails beantwoordt, valideren zij hun product-market fit. De klok tikt.'
              : 'While you\'re doing bookkeeping, competitors are building customer relationships. While you\'re answering emails, they\'re validating product-market fit. The clock is ticking.'
            }
          </p>

          {/* CTA */}
          <div className="pt-6">
            <button
              className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:scale-105 transform-gpu font-archivo"
              data-cal-namespace="startup-kickoff-workshop"
              data-cal-link="kennet-timmers/workshop"
              data-cal-config='{"layout":"month_view"}'
            >
              <span className="relative z-10 flex items-center gap-3">
                <Target className="w-6 h-6" />
                {isNL ? 'STOP DE VERSPILLING - KICKOFF WORKSHOP' : 'STOP THE WASTE - KICKOFF WORKSHOP'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </button>
            
            <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
              {isNL ? '✓ 90 minuten ✓ Directe actieplan ✓ Beperkt tot 3 startups/maand' : '✓ 90 minutes ✓ Direct action plan ✓ Limited to 3 startups/month'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProblem;
