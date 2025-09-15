'use client';

import React from 'react';
import { Calendar, Target, Users, Rocket, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import MethodologyStep from './MethodologyStep';

interface StartupSolutionProps {
  methodology: string;
  timeline: string;
  deliverables: string[];
}

const StartupSolution: React.FC<StartupSolutionProps> = ({ 
  methodology, 
  timeline, 
  deliverables 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const methodologySteps = [
    {
      step: 1,
      title: isNL ? 'Week 1: Kickoff & Validatie' : 'Week 1: Kickoff & Validation',
      description: isNL 
        ? 'Intensieve 90-minuten workshop om je idee te valideren en de juiste richting te bepalen.'
        : 'Intensive 90-minute workshop to validate your idea and determine the right direction.',
      icon: Target,
      duration: isNL ? '7 dagen' : '7 days',
      deliverables: isNL ? [
        'Gevalideerd business concept',
        'Target customer profiel',
        'MVP feature prioritering',
        'Go-to-market strategie'
      ] : [
        'Validated business concept',
        'Target customer profile', 
        'MVP feature prioritization',
        'Go-to-market strategy'
      ],
      color: 'from-orange-500 to-red-500',
      accentColor: 'text-orange-400'
    },
    {
      step: 2,
      title: isNL ? 'Week 2: Prototype & Setup' : 'Week 2: Prototype & Setup',
      description: isNL
        ? 'Snelle prototype ontwikkeling terwijl we je operationele fundament bouwen.'
        : 'Rapid prototype development while we build your operational foundation.',
      icon: Rocket,
      duration: isNL ? '7 dagen' : '7 days',
      deliverables: isNL ? [
        'Werkende MVP prototype',
        'Geautomatiseerde admin processen',
        'Customer feedback systeem',
        'Basis analytics setup'
      ] : [
        'Working MVP prototype',
        'Automated admin processes',
        'Customer feedback system',
        'Basic analytics setup'
      ],
      color: 'from-red-500 to-pink-500',
      accentColor: 'text-red-400'
    },
    {
      step: 3,
      title: isNL ? 'Week 3: Test & Itereer' : 'Week 3: Test & Iterate',
      description: isNL
        ? 'Echte klanten testen je MVP terwijl we de feedback loops automatiseren.'
        : 'Real customers test your MVP while we automate the feedback loops.',
      icon: Users,
      duration: isNL ? '7 dagen' : '7 days',
      deliverables: isNL ? [
        'Eerste klant feedback',
        'Geautomatiseerde onboarding',
        'Verbeterde product features',
        'Conversion tracking'
      ] : [
        'First customer feedback',
        'Automated onboarding',
        'Improved product features',
        'Conversion tracking'
      ],
      color: 'from-pink-500 to-purple-500',
      accentColor: 'text-pink-400'
    },
    {
      step: 4,
      title: isNL ? 'Week 4: Launch & Schaal' : 'Week 4: Launch & Scale',
      description: isNL
        ? 'Officiële launch met alle systemen werkend en klaar voor groei.'
        : 'Official launch with all systems working and ready for growth.',
      icon: Calendar,
      duration: isNL ? '7 dagen' : '7 days',
      deliverables: isNL ? [
        'Betalende klanten',
        'Schaalbare operaties',
        'Groei metrics dashboard',
        'Volgende fase planning'
      ] : [
        'Paying customers',
        'Scalable operations',
        'Growth metrics dashboard',
        'Next phase planning'
      ],
      color: 'from-purple-500 to-blue-500',
      accentColor: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Methodology Overview */}
      <div className="text-center">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-8 py-4 mb-8">
          <Rocket className="w-6 h-6 text-orange-400" />
          <span className="text-orange-300 font-bold text-lg font-archivo">
            {methodology}
          </span>
        </div>
        
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-archivo">
          {isNL 
            ? 'Onze bewezen 4-week sprint methodologie combineert lean startup principes met operationele automatisering. Je focust op klanten, wij zorgen voor de rest.'
            : 'Our proven 4-week sprint methodology combines lean startup principles with operational automation. You focus on customers, we handle the rest.'
          }
        </p>
      </div>

      {/* 4-Week Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {methodologySteps.map((step) => (
          <MethodologyStep
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            icon={step.icon}
            duration={step.duration}
            deliverables={step.deliverables}
            color={step.color}
            accentColor={step.accentColor}
          />
        ))}
      </div>

      {/* Deliverables Summary */}
      <div className="bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 border border-orange-500/30 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {isNL ? 'Wat je krijgt na 30 dagen' : 'What you get after 30 days'}
          </h3>
          <p className="text-xl text-gray-300 font-archivo">
            {isNL 
              ? 'Alles wat je nodig hebt om te groeien, zonder operationele hoofdpijn'
              : 'Everything you need to grow, without operational headaches'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium font-archivo">{deliverable}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transform-gpu font-archivo"
            data-cal-namespace="startup-kickoff-workshop"
            data-cal-link="kennet-timmers/workshop"
            data-cal-config='{"layout":"month_view"}'
          >
            <span className="relative z-10 flex items-center gap-3">
              <Target className="w-6 h-6" />
              {isNL ? 'START JE 30-DAGEN SPRINT' : 'START YOUR 30-DAY SPRINT'}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
            {isNL ? '✓ 90-min gratis workshop eerst ✓ Geen betaling tot je tevreden bent' : '✓ 90-min free workshop first ✓ No payment until you\'re satisfied'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartupSolution;
