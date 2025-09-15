'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Users } from 'lucide-react';
import { AudienceType } from '@/hooks/useAudienceSegmentation';

interface ScarcityBannerProps {
  message: string;
  count: number;
  timeframe: string;
  audience: AudienceType;
}

const ScarcityBanner: React.FC<ScarcityBannerProps> = ({
  message,
  count,
  timeframe,
  audience
}) => {
  const [spotsRemaining, setSpotsRemaining] = useState(count);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate realistic scarcity (could be connected to real booking system)
    const currentMonth = new Date().getMonth();
    const simulatedBooked = currentMonth % count;
    setSpotsRemaining(count - simulatedBooked);
    
    // Animate in after mount
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, [count]);

  const urgencyColor = audience === 'startup' 
    ? 'from-orange-600 to-red-600' 
    : 'from-blue-600 to-indigo-600';

  const accentColor = audience === 'startup' 
    ? 'text-orange-400' 
    : 'text-blue-400';

  return (
    <div className={`
      transform transition-all duration-1000 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      mb-16
    `}>
      {/* Scarcity Banner */}
      <div className={`
        relative overflow-hidden
        bg-gradient-to-r ${urgencyColor} 
        border border-white/20
        rounded-3xl p-6 md:p-8
        shadow-2xl shadow-black/50
        group
      `}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Urgency Icon & Message */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-archivo">
                Beperkte Beschikbaarheid
              </h3>
              <p className="text-lg text-white/90 font-archivo">
                {message}
              </p>
            </div>
          </div>

          {/* Spots Counter */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <Users className="w-6 h-6 text-white" />
              <div className="text-4xl md:text-5xl font-black text-white font-archivo">
                {spotsRemaining}
              </div>
            </div>
            <div className="text-sm text-white/80 font-medium font-archivo uppercase tracking-wider">
              Plekken over deze {timeframe}
            </div>
            
            {/* Progress Bar */}
            <div className="w-32 h-2 bg-white/20 rounded-full mt-3 mx-auto">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(spotsRemaining / count) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pulsing Border Effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-pulse" />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      </div>

      {/* Urgency Indicators */}
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${accentColor}`} />
          <span className="font-archivo">Reactie binnen 24u</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className={`w-4 h-4 ${accentColor}`} />
          <span className="font-archivo">Persoonlijke aandacht</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${accentColor}`} />
          <span className="font-archivo">Beperkte capaciteit</span>
        </div>
      </div>
    </div>
  );
};

export default ScarcityBanner;
