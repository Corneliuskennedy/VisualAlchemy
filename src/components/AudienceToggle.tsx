'use client';

import React from 'react';
import { Rocket, Building2, RotateCcw } from 'lucide-react';
import { AudienceType } from '@/hooks/useAudienceSegmentation';
import { useTranslations } from '@/hooks/useTranslations';

interface AudienceToggleProps {
  currentAudience: AudienceType;
  onSwitch: (audience: AudienceType) => void;
  className?: string;
}

export const AudienceToggle: React.FC<AudienceToggleProps> = ({ 
  currentAudience, 
  onSwitch, 
  className = '' 
}) => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  if (!currentAudience) return null;

  const otherAudience = currentAudience === 'startup' ? 'sme' : 'startup';
  
  const audienceConfig = {
    startup: {
      icon: Rocket,
      label: isNL ? 'Startup Founder' : 'Startup Founder',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/30'
    },
    sme: {
      icon: Building2,
      label: isNL ? 'Gevestigd Bedrijf' : 'Established Business',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30'
    }
  };

  const current = audienceConfig[currentAudience];
  const other = audienceConfig[otherAudience];
  const CurrentIcon = current.icon;
  const OtherIcon = other.icon;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Current Audience Display */}
      <div className={`
        flex items-center gap-3 px-4 py-2 rounded-full
        ${current.bg} border backdrop-blur-sm
      `}>
        <CurrentIcon className={`w-4 h-4 ${current.color}`} />
        <span className="text-white text-sm font-medium font-archivo">
          {current.label}
        </span>
      </div>

      {/* Switch Button */}
      <button
        onClick={() => onSwitch(otherAudience)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-white/5 border border-white/10 hover:border-white/20
          text-gray-300 hover:text-white
          transition-all duration-300
          text-sm font-medium font-archivo
        `}
        title={isNL ? `Wissel naar ${other.label}` : `Switch to ${other.label}`}
      >
        <RotateCcw className="w-3 h-3" />
        <OtherIcon className={`w-4 h-4 ${other.color}`} />
        <span className="hidden sm:inline">
          {isNL ? 'Wissel' : 'Switch'}
        </span>
      </button>
    </div>
  );
};
