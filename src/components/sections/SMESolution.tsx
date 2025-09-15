'use client';

import React from 'react';
import { Shield, Cog, GraduationCap, TrendingUp, CheckCircle, ArrowRight, Euro } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import ProcessStep from './ProcessStep';

interface SMESolutionProps {
  framework: string;
  guarantee: string;
  process: string[];
}

const SMESolution: React.FC<SMESolutionProps> = ({ 
  framework, 
  guarantee, 
  process 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const processSteps = [
    {
      step: 1,
      title: isNL ? 'Volledige Proces Audit' : 'Complete Process Audit',
      description: isNL 
        ? 'Diepgaande analyse van al je bedrijfsprocessen om de grootste inefficiënties en automatisering kansen te identificeren.'
        : 'Deep analysis of all your business processes to identify the biggest inefficiencies and automation opportunities.',
      icon: Shield,
      duration: isNL ? '1-2 weken' : '1-2 weeks',
      outcomes: isNL ? [
        'Proces inefficiëntie rapport',
        'ROI potentieel per proces',
        'Prioritering roadmap',
        'Kosten-baten analyse'
      ] : [
        'Process inefficiency report',
        'ROI potential per process',
        'Prioritization roadmap',
        'Cost-benefit analysis'
      ],
      color: 'from-blue-500 to-indigo-500',
      accentColor: 'text-blue-400'
    },
    {
      step: 2,
      title: isNL ? 'Geautomatiseerde Workflow Implementatie' : 'Automated Workflow Implementation',
      description: isNL
        ? 'Systematische implementatie van automatisering, beginnend met de hoogste ROI processen voor directe impact.'
        : 'Systematic implementation of automation, starting with the highest ROI processes for immediate impact.',
      icon: Cog,
      duration: isNL ? '2-4 weken' : '2-4 weeks',
      outcomes: isNL ? [
        'Geautomatiseerde workflows',
        'Systeem integraties',
        'Error handling & monitoring',
        'Performance dashboards'
      ] : [
        'Automated workflows',
        'System integrations',
        'Error handling & monitoring',
        'Performance dashboards'
      ],
      color: 'from-indigo-500 to-purple-500',
      accentColor: 'text-indigo-400'
    },
    {
      step: 3,
      title: isNL ? 'Team Training & Adoptie' : 'Team Training & Adoption',
      description: isNL
        ? 'Uitgebreide training van je team om de nieuwe geautomatiseerde processen effectief te gebruiken en te onderhouden.'
        : 'Comprehensive training of your team to effectively use and maintain the new automated processes.',
      icon: GraduationCap,
      duration: isNL ? '1-2 weken' : '1-2 weeks',
      outcomes: isNL ? [
        'Team training sessies',
        'Documentatie & handleidingen',
        'Best practices implementatie',
        'Change management support'
      ] : [
        'Team training sessions',
        'Documentation & guides',
        'Best practices implementation',
        'Change management support'
      ],
      color: 'from-purple-500 to-pink-500',
      accentColor: 'text-purple-400'
    },
    {
      step: 4,
      title: isNL ? 'Continue Optimalisatie & Support' : 'Continuous Optimization & Support',
      description: isNL
        ? 'Doorlopende monitoring en optimalisatie van je geautomatiseerde systemen voor maximale efficiëntie en ROI.'
        : 'Ongoing monitoring and optimization of your automated systems for maximum efficiency and ROI.',
      icon: TrendingUp,
      duration: isNL ? 'Doorlopend' : 'Ongoing',
      outcomes: isNL ? [
        'Performance monitoring',
        'Continue verbeteringen',
        'Nieuwe automatisering kansen',
        'ROI tracking & rapportage'
      ] : [
        'Performance monitoring',
        'Continuous improvements',
        'New automation opportunities',
        'ROI tracking & reporting'
      ],
      color: 'from-pink-500 to-red-500',
      accentColor: 'text-pink-400'
    }
  ];

  const guaranteeMetrics = [
    {
      metric: isNL ? '40-70%' : '40-70%',
      label: isNL ? 'Kostenreductie' : 'Cost Reduction',
      icon: Euro,
      color: 'text-green-400'
    },
    {
      metric: isNL ? '20+ uur' : '20+ hours',
      label: isNL ? 'Tijd besparing per week' : 'Time saved per week',
      icon: Shield,
      color: 'text-blue-400'
    },
    {
      metric: isNL ? '90 dagen' : '90 days',
      label: isNL ? 'Tot volledige ROI' : 'To full ROI',
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Framework Overview */}
      <div className="text-center">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-8 py-4 mb-8">
          <Shield className="w-6 h-6 text-blue-400" />
          <span className="text-blue-300 font-bold text-lg font-archivo">
            {framework}
          </span>
        </div>
        
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-archivo mb-8">
          {isNL 
            ? 'Onze systematische benadering transformeert je bedrijfsprocessen stap voor stap, met gegarandeerde ROI en minimale verstoring van je dagelijkse operaties.'
            : 'Our systematic approach transforms your business processes step by step, with guaranteed ROI and minimal disruption to your daily operations.'
          }
        </p>

        {/* ROI Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {guaranteeMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center p-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl">
                <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <div className={`text-3xl font-bold ${item.color} mb-2 font-archivo`}>
                  {item.metric}
                </div>
                <div className="text-sm text-gray-400 font-archivo">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Step Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {processSteps.map((step) => (
          <ProcessStep
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            icon={step.icon}
            duration={step.duration}
            outcomes={step.outcomes}
            color={step.color}
            accentColor={step.accentColor}
          />
        ))}
      </div>

      {/* ROI Guarantee Card */}
      <div className="bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600/40 to-blue-600/40 border border-green-400/50 rounded-full px-8 py-4 shadow-xl mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-black text-lg uppercase tracking-widest font-archivo">
              {isNL ? 'ROI GARANTIE' : 'ROI GUARANTEE'}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-archivo">
            {guarantee}
          </h3>
          <p className="text-xl text-gray-300 font-archivo mb-8">
            {isNL 
              ? 'Als we niet binnen 90 dagen minstens 40% kostenreductie realiseren, werken we gratis door tot we dat wel doen.'
              : 'If we don\'t achieve at least 40% cost reduction within 90 days, we work for free until we do.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {process.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium font-archivo">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            className="relative group overflow-hidden px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform-gpu font-archivo"
            data-cal-namespace="automation-strategy-workshop"
            data-cal-link="kennet-timmers/intro-call"
            data-cal-config='{"layout":"month_view"}'
          >
            <span className="relative z-10 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              {isNL ? 'PLAN JE GRATIS PROCES AUDIT' : 'SCHEDULE YOUR FREE PROCESS AUDIT'}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4 font-medium font-archivo">
            {isNL ? '✓ 60-min gratis audit ✓ ROI garantie ✓ Geen betaling bij geen resultaat' : '✓ 60-min free audit ✓ ROI guarantee ✓ No payment if no results'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SMESolution;
