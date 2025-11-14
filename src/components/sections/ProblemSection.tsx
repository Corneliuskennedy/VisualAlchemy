'use client';

import React from 'react';
import { AudienceType, trackSectionView } from '@/hooks/useAudienceSegmentation';
import { useProblems } from '@/hooks/useContent';
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
  const problems = useProblems();

  useEffect(() => {
    if (audience) {
      trackSectionView('problem', audience);
    }
  }, [audience]);

  if (!audience) return null;

  return (
    <section 
      className={`relative py-16 ${className}`}
      id="problem-section"
      aria-label={`Problem section for ${audience}`}
    >
      <div className="mx-auto px-6 w-full max-w-6xl">
        {/* Dynamic Content Based on Audience */}
        {audience === 'startup' ? (
          <>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-heading mb-6 font-archivo">
                {problems.startup.title}
              </h2>
              <p className="text-xl md:text-2xl font-normal leading-relaxed text-body max-w-4xl mx-auto font-archivo">
                {problems.startup.subtitle}
              </p>
            </div>
            <StartupProblem 
              content={{
                title: problems.startup.title,
                subtitle: problems.startup.subtitle,
              }} 
              metrics={problems.startup.metrics}
            />
          </>
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-heading mb-6 font-archivo">
                {problems.sme.title}
              </h2>
              <p className="text-xl md:text-2xl font-normal leading-relaxed text-body max-w-4xl mx-auto font-archivo">
                {problems.sme.subtitle}
              </p>
            </div>
            <SMEProblem 
              content={{
                title: problems.sme.title,
                subtitle: problems.sme.subtitle,
              }} 
              metrics={problems.sme.metrics}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ProblemSection;
