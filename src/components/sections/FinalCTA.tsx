'use client';

import React from 'react';
import { Rocket, Shield, Download, Calculator, ArrowRight, ExternalLink } from 'lucide-react';
import { AudienceType } from '@/hooks/useAudienceSegmentation';
import Link from 'next/link';

interface CTAButton {
  text: string;
  calNamespace?: string;
  calLink?: string;
  link?: string;
  icon: string;
}

interface FinalCTAProps {
  primary: CTAButton;
  secondary: CTAButton;
  audience: AudienceType;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({
  primary,
  secondary,
  audience,
  onPrimaryClick,
  onSecondaryClick
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket': return Rocket;
      case 'shield': return Shield;
      case 'download': return Download;
      case 'calculator': return Calculator;
      default: return ArrowRight;
    }
  };

  const PrimaryIcon = getIcon(primary.icon);
  const SecondaryIcon = getIcon(secondary.icon);

  const primaryGradient = audience === 'startup' 
    ? 'from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500'
    : 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500';

  const primaryShadow = audience === 'startup' 
    ? 'hover:shadow-orange-500/30'
    : 'hover:shadow-blue-500/30';

  return (
    <div className="text-center mb-16">
      {/* Main Headline */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-6 font-archivo">
          {audience === 'startup' ? (
            <>
              Klaar om je <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">MVP</span> te lanceren?
            </>
          ) : (
            <>
              Klaar om <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">€50.000+</span> te besparen?
            </>
          )}
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-archivo">
          {audience === 'startup' 
            ? 'Stop met tijd verspillen aan operationele zaken. Laat ons je helpen focussen op wat echt telt: je klanten.'
            : 'Stop met geld verbranden aan inefficiënte processen. Laat ons je helpen je bedrijf te transformeren.'
          }
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
        {/* Primary CTA */}
        {primary.calNamespace && primary.calLink ? (
          <button
            className={`
              group relative overflow-hidden
              px-12 py-6 bg-gradient-to-r ${primaryGradient}
              text-white font-bold text-xl rounded-2xl
              transition-all duration-300 hover:shadow-2xl ${primaryShadow}
              hover:scale-105 transform-gpu font-archivo
              min-w-[320px] md:min-w-[400px]
            `}
            data-cal-namespace={primary.calNamespace}
            data-cal-link={primary.calLink}
            data-cal-config='{"layout":"month_view"}'
            onClick={onPrimaryClick}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <PrimaryIcon className="w-6 h-6" />
              {primary.text}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
        ) : (
          <span
            onClick={onPrimaryClick}
            className="inline-block"
          >
            <Link
              href={primary.link || '#'}
              className={`
                group relative overflow-hidden inline-block
                px-12 py-6 bg-gradient-to-r ${primaryGradient}
                text-white font-bold text-xl rounded-2xl
                transition-all duration-300 hover:shadow-2xl ${primaryShadow}
                hover:scale-105 transform-gpu font-archivo
                min-w-[320px] md:min-w-[400px] text-center
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <PrimaryIcon className="w-6 h-6" />
                {primary.text}
                <ArrowRight className="w-6 h-6" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </Link>
          </span>
        )}

        {/* Secondary CTA */}
        <span
          onClick={onSecondaryClick}
          className="inline-block"
        >
          <Link
            href={secondary.link || '#'}
            className="
              group relative overflow-hidden inline-block
              px-12 py-6 bg-white/5 backdrop-blur-xl 
              border border-white/10 text-white font-medium text-lg rounded-2xl
              hover:bg-white/10 hover:border-white/20 hover:scale-105
              transition-all duration-300 transform-gpu font-archivo
              min-w-[320px] md:min-w-[400px] text-center
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <SecondaryIcon className="w-5 h-5" />
              {secondary.text}
              <ExternalLink className="w-5 h-5" />
            </span>
          </Link>
        </span>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="font-archivo">
            {audience === 'startup' 
              ? 'Gratis 90-min workshop' 
              : 'Gratis 60-min audit'
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="font-archivo">Geen betaling vooraf</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="font-archivo">Nederlandse support</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="font-archivo">
            {audience === 'startup' 
              ? '30-dagen geld terug' 
              : '90-dagen ROI garantie'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;








