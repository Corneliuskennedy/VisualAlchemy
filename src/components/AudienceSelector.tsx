'use client';

import React from 'react';
import { Rocket, Building2, ArrowRight } from 'lucide-react';
import { AudienceType } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';

interface AudienceSelectorProps {
  onSelect: (audience: AudienceType) => void;
  className?: string;
}

export const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  onSelect,
  className = ''
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isCompact = className.includes('compact');

  const audiences = [
    {
      type: 'startup' as AudienceType,
      icon: Rocket,
      title: isNL ? 'Ik Bouw Mijn Eerste MVP' : 'I\'m Building My First MVP',
      subtitle: isNL 
        ? '30-dagen sprint • Eerste klanten • Geautomatiseerde ops'
        : '30-day sprint • First customers • Automated ops',
      description: isNL
        ? 'Je wilt snel valideren en groeien zonder geld te verbranden aan operationele taken'
        : 'You want to validate and grow fast without burning cash on operational tasks',
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/30 hover:border-orange-400/50',
      iconColor: 'text-orange-400',
      buttonColor: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500'
    },
    {
      type: 'sme' as AudienceType,
      icon: Building2,
      title: isNL ? 'Ik Schaal Mijn Bedrijf' : 'I\'m Scaling My Business',
      subtitle: isNL
        ? '€50K+ besparing • 40-70% efficiëntie • ROI gegarandeerd'
        : '€50K+ savings • 40-70% efficiency • ROI guaranteed',
      description: isNL
        ? 'Je wilt handmatige processen elimineren en schalen zonder chaos'
        : 'You want to eliminate manual processes and scale without chaos',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      iconColor: 'text-blue-400',
      buttonColor: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
    }
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className={`text-center ${isCompact ? 'mb-3' : 'mb-4'}`}>
        <h2 className={`${isCompact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-bold text-white ${isCompact ? 'mb-1' : 'mb-2'} font-archivo`}>
          {isNL ? 'Wat is je primaire doel?' : 'What is your primary goal?'}
        </h2>
      </div>

      <div className={`${isCompact ? 'space-y-3' : 'space-y-3'} max-w-2xl mx-auto`}>
        {audiences.map((audience) => {
          const Icon = audience.icon;
          
          return (
            <button
              key={audience.type}
              className={`
                w-full ${isCompact ? 'p-5 rounded-xl' : 'p-4 rounded-xl'} backdrop-blur-xl
                bg-gradient-to-r ${audience.gradient}
                border ${audience.border}
                transform transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-xl hover:border-opacity-60
                cursor-pointer group text-left
                flex items-center ${isCompact ? 'space-x-4' : 'space-x-3'}
              `}
              onClick={() => onSelect(audience.type)}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 ${isCompact ? 'p-3 rounded-lg' : 'p-2 rounded-lg'} ${audience.iconColor} bg-white/10`}>
                <Icon className={isCompact ? 'w-6 h-6' : 'w-5 h-5'} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`${isCompact ? 'text-lg' : 'text-lg'} font-bold text-white ${isCompact ? 'mb-1' : 'mb-0.5'} font-archivo`}>
                  {audience.type === 'startup' 
                    ? (isNL ? 'Bouw Mijn Eerste MVP' : 'Build My First MVP')
                    : (isNL ? 'Schaal Mijn Bedrijf' : 'Scale My Business')
                  }
                </h3>
                <p className={`${isCompact ? 'text-sm' : 'text-xs'} text-gray-300 font-archivo`}>
                  {audience.type === 'startup' 
                    ? (isNL ? 'Valideer je idee en krijg je eerste klanten in 30 dagen.' : 'Validate your idea and get to first customers in 30 days.')
                    : (isNL ? 'Elimineer handmatige processen en ontgrendel winstgevende groei.' : 'Eliminate manual processes and unlock profitable growth.')
                  }
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {!isCompact && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 font-archivo">
            {isNL 
              ? 'Je kunt altijd wisselen tussen de twee opties'
              : 'You can always switch between the two options'
            }
          </p>
        </div>
      )}
    </div>
  );
};
