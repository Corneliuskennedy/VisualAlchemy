'use client';

import React from 'react';
import { AudienceType, trackSectionView } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';
import StartupProblem from './StartupProblem';
import SMEProblem from './SMEProblem';
import { useEffect } from 'react';

interface ProblemSectionProps {
  audience: AudienceType;
  className?: string;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ 
  audience, 
  className = '' 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  useEffect(() => {
    if (audience) {
      trackSectionView('problem', audience);
    }
  }, [audience]);

  if (!audience) return null;

  const sectionContent = {
    startup: {
      title: isNL ? 'Het Founder\'s Cash Burn Dilemma' : 'The Founder\'s Cash Burn Dilemma',
      subtitle: isNL 
        ? 'Waarom founders geld verbranden aan operaties in plaats van klanten te vinden'
        : 'Why founders burn cash on operations instead of finding customers',
      metrics: {
        timeWasted: isNL ? '15-25 uur per week' : '15-25 hours per week',
        cashBurn: isNL ? '€3.000-€8.000/maand' : '€3,000-€8,000/month',
        delayedValidation: isNL ? '3-6 maanden vertraging' : '3-6 months delayed'
      }
    },
    sme: {
      title: isNL ? 'Het Verborgen Winst Lek' : 'The Hidden Profit Leak',
      subtitle: isNL
        ? 'Hoe gevestigde bedrijven €67.560+ per jaar verliezen aan handmatige processen'
        : 'How established businesses lose €67,560+ annually to manual processes',
      metrics: {
        annualLoss: isNL ? '€67.560+ per jaar' : '€67,560+ per year',
        timeWasted: isNL ? '23 uur per week' : '23 hours per week',
        errorCost: isNL ? '€12.000+ aan fouten' : '€12,000+ in errors'
      }
    }
  };

  const content = sectionContent[audience];

  return (
    <section 
      className={`relative py-16 ${className}`}
      id="problem-section"
      aria-label={`Problem section for ${audience}`}
    >
      <div className="mx-auto px-6 w-full max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white mb-6 font-archivo">
            {content.title}
          </h2>
          <p className="text-xl md:text-2xl font-normal leading-relaxed text-gray-300 max-w-4xl mx-auto font-archivo">
            {content.subtitle}
          </p>
        </div>

        {/* Dynamic Content Based on Audience */}
        {audience === 'startup' ? (
          <StartupProblem 
            content={content} 
            metrics={content.metrics as { timeWasted: string; cashBurn: string; delayedValidation: string; }} 
          />
        ) : (
          <SMEProblem 
            content={content} 
            metrics={content.metrics as { annualLoss: string; timeWasted: string; errorCost: string; }} 
          />
        )}
      </div>
    </section>
  );
};

export default ProblemSection;
