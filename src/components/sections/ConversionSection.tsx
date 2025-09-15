'use client';

import React, { useEffect } from 'react';
import { AudienceType, trackSectionView, trackCTAClick } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';
import ScarcityBanner from './ScarcityBanner';
import FinalCTA from './FinalCTA';
import TrustSignals from './TrustSignals';

interface ConversionSectionProps {
  audience: AudienceType;
  className?: string;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({ 
  audience, 
  className = '' 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  useEffect(() => {
    if (audience) {
      trackSectionView('conversion', audience);
    }
  }, [audience]);

  if (!audience) return null;

  const sectionContent = {
    startup: {
      scarcityMessage: isNL 
        ? 'Beperkt tot 3 startups per maand voor maximale aandacht'
        : 'Limited to 3 startups per month for maximum attention',
      count: 3,
      timeframe: isNL ? 'maand' : 'month',
      primary: {
        text: isNL ? 'BOEK JE 90-MIN KICKOFF WORKSHOP' : 'BOOK YOUR 90-MIN KICKOFF WORKSHOP',
        calNamespace: 'startup-kickoff-workshop',
        calLink: 'kennet-timmers/workshop',
        icon: 'rocket'
      },
      secondary: {
        text: isNL ? 'Download Gratis MVP Template' : 'Download Free MVP Template',
        link: '/templates/mvp-roadmap-template.pdf',
        icon: 'download'
      },
      guarantees: isNL ? [
        'Geen betaling tot je tevreden bent',
        'Directe founder betrokkenheid',
        'Volledige transparantie in proces',
        '30-dagen geld terug garantie'
      ] : [
        'No payment until you\'re satisfied',
        'Direct founder involvement',
        'Complete process transparency',
        '30-day money back guarantee'
      ],
      testimonials: [
        {
          quote: isNL 
            ? 'Zonder Octomatic zou ik nog steeds bezig zijn met admin in plaats van klanten werven. Nu hebben we €3.400 MRR.'
            : 'Without Octomatic I\'d still be doing admin instead of acquiring customers. Now we have €3,400 MRR.',
          author: 'Marcus van der Berg',
          company: 'LocalConnect',
          result: '€3.400 MRR'
        }
      ]
    },
    sme: {
      scarcityMessage: isNL
        ? 'Beperkt tot 5 bedrijven per maand voor gegarandeerde ROI'
        : 'Limited to 5 businesses per month for guaranteed ROI',
      count: 5,
      timeframe: isNL ? 'maand' : 'month',
      primary: {
        text: isNL ? 'PLAN JE GRATIS PROCES AUDIT' : 'SCHEDULE YOUR FREE PROCESS AUDIT',
        calNamespace: 'automation-strategy-workshop',
        calLink: 'kennet-timmers/intro-call',
        icon: 'shield'
      },
      secondary: {
        text: isNL ? 'Download ROI Calculator' : 'Download ROI Calculator',
        link: '/tools/automation-roi-calculator',
        icon: 'calculator'
      },
      guarantees: isNL ? [
        'Minimaal 40% kostenreductie gegarandeerd',
        'Geen betaling bij geen resultaat',
        'Nederlandse tijdzone support',
        '90-dagen ROI garantie'
      ] : [
        'Minimum 40% cost reduction guaranteed',
        'No payment if no results',
        'Dutch timezone support',
        '90-day ROI guarantee'
      ],
      testimonials: [
        {
          quote: isNL
            ? 'De automatisering heeft ons €45.000 per jaar bespaard. ROI was binnen 2 maanden terug verdiend.'
            : 'The automation saved us €45,000 annually. ROI was earned back within 2 months.',
          author: 'Director Operations',
          company: 'Verde Logistics',
          result: '€45.000 besparing'
        }
      ]
    }
  };

  const content = sectionContent[audience];

  const handlePrimaryClick = () => {
    trackCTAClick('primary_conversion', audience);
  };

  const handleSecondaryClick = () => {
    trackCTAClick('secondary_conversion', audience);
  };

  return (
    <section 
      className={`relative py-16 ${className}`}
      id="conversion-section"
      aria-label={`Conversion section for ${audience}`}
    >
      <div className="mx-auto px-6 w-full max-w-6xl">
        {/* Scarcity Banner */}
        <ScarcityBanner
          message={content.scarcityMessage}
          count={content.count}
          timeframe={content.timeframe}
          audience={audience}
        />

        {/* Final CTA */}
        <FinalCTA
          primary={content.primary}
          secondary={content.secondary}
          audience={audience}
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />

        {/* Trust Signals */}
        <TrustSignals
          guarantees={content.guarantees}
          testimonials={content.testimonials}
          audience={audience}
        />
      </div>
    </section>
  );
};

export default ConversionSection;
