'use client';

import React, { useEffect } from 'react';
import { AudienceType, trackSectionView } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';
import StartupSolution from './StartupSolution';
import SMESolution from './SMESolution';

interface SolutionSectionProps {
  audience: AudienceType;
  className?: string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ 
  audience, 
  className = '' 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  useEffect(() => {
    if (audience) {
      trackSectionView('solution', audience);
    }
  }, [audience]);

  if (!audience) return null;

  const sectionContent = {
    startup: {
      title: isNL ? '30-Dagen MVP Operating System' : '30-Day MVP Operating System',
      subtitle: isNL 
        ? 'Lean validatie framework met geautomatiseerde ops fundament'
        : 'Lean validation framework with automated ops foundation',
      methodology: {
        name: isNL ? 'Startup Kickoff Methodologie' : 'Startup Kickoff Methodology',
        timeline: isNL ? '30 dagen' : '30 days',
        deliverables: isNL ? [
          'Gevalideerd MVP concept',
          'Geautomatiseerde operationele basis',
          'Eerste betalende klanten',
          'Schaalbare groei systeem'
        ] : [
          'Validated MVP concept',
          'Automated operational foundation', 
          'First paying customers',
          'Scalable growth system'
        ]
      }
    },
    sme: {
      title: isNL ? 'Business Operating System Transformatie' : 'Business Operating System Transformation',
      subtitle: isNL
        ? 'Systematische automatisering van workflows met ROI garanties'
        : 'Systematic automation of workflows with ROI guarantees',
      framework: {
        name: isNL ? 'Octomatic Transformatie Framework' : 'Octomatic Transformation Framework',
        guarantee: isNL ? '40-70% kostenreductie gegarandeerd' : '40-70% cost reduction guaranteed',
        process: isNL ? [
          'Volledige proces audit',
          'Geautomatiseerde workflow implementatie',
          'Team training en adoptie',
          'Continue optimalisatie en support'
        ] : [
          'Complete process audit',
          'Automated workflow implementation',
          'Team training and adoption',
          'Continuous optimization and support'
        ]
      }
    }
  };

  const content = sectionContent[audience];

  return (
    <section 
      className={`relative py-16 ${className}`}
      id="solution-section"
      aria-label={`Solution section for ${audience}`}
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
          <StartupSolution 
            methodology={(content as any).methodology.name}
            timeline={(content as any).methodology.timeline}
            deliverables={(content as any).methodology.deliverables}
          />
        ) : (
          <SMESolution 
            framework={(content as any).framework.name}
            guarantee={(content as any).framework.guarantee}
            process={(content as any).framework.process}
          />
        )}
      </div>
    </section>
  );
};

export default SolutionSection;
