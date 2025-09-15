'use client';

import React, { useEffect } from 'react';
import { AudienceType, trackSectionView } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';
import StartupProof from './StartupProof';
import SMEProof from './SMEProof';

interface SocialProofSectionProps {
  audience: AudienceType;
  className?: string;
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ 
  audience, 
  className = '' 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  useEffect(() => {
    if (audience) {
      trackSectionView('social_proof', audience);
    }
  }, [audience]);

  if (!audience) return null;

  const sectionContent = {
    startup: {
      title: isNL ? 'Founder Verhalen & Validatie Metrics' : 'Founder Stories & Validation Metrics',
      subtitle: isNL 
        ? 'Echte verhalen van founders die hun 30-dagen MVP sprint succesvol hebben afgerond'
        : 'Real stories from founders who successfully completed their 30-day MVP sprint',
      founderStories: [
        {
          founder: 'Sarah Chen',
          company: 'EcoTrack',
          story: isNL 
            ? 'Van idee naar eerste €1.200 MRR in 28 dagen. De operationele automatisering gaf me de ruimte om me volledig te focussen op klanten.'
            : 'From idea to first €1,200 MRR in 28 days. The operational automation gave me space to focus entirely on customers.',
          outcome: isNL ? 'Eerste betalende klanten binnen 4 weken' : 'First paying customers within 4 weeks',
          avatar: '/team/kennet_timmers.webp'
        },
        {
          founder: 'Marcus van der Berg',
          company: 'LocalConnect',
          story: isNL
            ? 'Zonder Octomatic zou ik nog steeds bezig zijn met boekhouding in plaats van product development. Nu hebben we 15 betalende klanten.'
            : 'Without Octomatic I\'d still be doing bookkeeping instead of product development. Now we have 15 paying customers.',
          outcome: isNL ? '15 betalende klanten, €3.400 MRR' : '15 paying customers, €3,400 MRR',
          avatar: '/team/kennet_timmers.webp'
        }
      ],
      metrics: {
        avgTimeToFirstCustomer: isNL ? '23 dagen' : '23 days',
        avgMRRAt30Days: '€2.100',
        successRate: '87%'
      }
    },
    sme: {
      title: isNL ? 'Client Case Studies & Besparingen' : 'Client Case Studies & Savings',
      subtitle: isNL
        ? 'Bewezen resultaten van Nederlandse bedrijven die hun processen hebben getransformeerd'
        : 'Proven results from Dutch businesses that transformed their processes',
      caseStudies: [
        {
          company: 'TechConsult B.V.',
          industry: isNL ? 'IT Consultancy' : 'IT Consultancy',
          challenge: isNL 
            ? 'Handmatige factuurverwerking kostte 15 uur per week en leidde tot veel fouten.'
            : 'Manual invoice processing took 15 hours per week and led to many errors.',
          solution: isNL
            ? 'Volledige automatisering van factuurverwerking en klantcommunicatie workflows.'
            : 'Complete automation of invoice processing and customer communication workflows.',
          result: isNL ? '€28.000 jaarlijkse besparing' : '€28,000 annual savings',
          metrics: {
            timeSaved: isNL ? '15 uur/week' : '15 hours/week',
            costReduction: '65%',
            errorReduction: '92%'
          }
        },
        {
          company: 'Verde Logistics',
          industry: isNL ? 'Transport & Logistiek' : 'Transport & Logistics',
          challenge: isNL
            ? 'Losgekoppelde systemen creëerden data silo\'s en vertragingen in de planning.'
            : 'Disconnected systems created data silos and delays in planning.',
          solution: isNL
            ? 'Geïntegreerde planning en tracking systemen met real-time dashboards.'
            : 'Integrated planning and tracking systems with real-time dashboards.',
          result: isNL ? '€45.000 jaarlijkse besparing' : '€45,000 annual savings',
          metrics: {
            timeSaved: isNL ? '25 uur/week' : '25 hours/week',
            costReduction: '58%',
            errorReduction: '78%'
          }
        }
      ],
      savings: {
        avgAnnualSavings: '€36.500',
        avgTimeReduction: isNL ? '20 uur/week' : '20 hours/week',
        avgROI: '340%'
      }
    }
  };

  const content = sectionContent[audience];

  return (
    <section 
      className={`relative py-16 ${className}`}
      id="social-proof-section"
      aria-label={`Social proof section for ${audience}`}
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
          <StartupProof 
            founderStories={(content as any).founderStories}
            metrics={(content as any).metrics}
          />
        ) : (
          <SMEProof 
            caseStudies={(content as any).caseStudies}
            savings={(content as any).savings}
          />
        )}
      </div>
    </section>
  );
};

export default SocialProofSection;
