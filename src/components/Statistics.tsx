'use client';

import React from 'react';
import { useStatistics } from '@/hooks/useContent';
import useLanguage from '@/contexts/LanguageContext';
import { Clock, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from './ui/GridBackground';

const Statistics = () => {
  const statisticsContent = useStatistics();
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const iconMap = [Clock, TrendingUp, AlertTriangle];
  // Theme-aware colors using CSS variables
  const colors = [
    { color: "from-button-primary/40 to-button-primary/60", accentColor: "text-button-primary" },
    { color: "from-button-primary/30 to-button-primary/50", accentColor: "text-button-primary" },
    { color: "from-button-primary/50 to-button-primary/70", accentColor: "text-button-primary" }
  ];

  const statistics = statisticsContent.stats.map((stat, index) => ({
    ...stat,
    icon: iconMap[index],
    ...colors[index]
  }));

  return (
    <div className="relative overflow-hidden">
      {/* No local background - let global background show through */}
      
      <div className="relative z-10 mx-auto px-6 w-full max-w-6xl">
        <div className="text-center mb-24">          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading mb-8 leading-tight tracking-tight font-archivo">
            {statisticsContent.headline}
          </h2>
          <p className="text-xl md:text-2xl text-body max-w-4xl mx-auto font-normal leading-relaxed font-archivo">
            {statisticsContent.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div 
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Card */}
                <div className="relative overflow-hidden bg-card-theme backdrop-blur-xl border border-card-theme rounded-3xl p-8 text-center hover:bg-accent/5 hover:border-border hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out transform-gpu will-change-transform">
                  {/* Icon Container */}
                  <div className="relative w-16 h-16 mx-auto mb-8">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center
                      bg-gradient-to-br ${stat.color} opacity-10
                      group-hover:opacity-20 group-hover:scale-110
                      transition-all duration-300 ease-out
                    `} />
                    <Icon className={`
                      absolute inset-0 m-auto w-8 h-8 ${stat.accentColor}
                      group-hover:scale-110 transition-transform duration-300
                    `} />
                  </div>
                  
                  {/* Number */}
                  <div className="mb-6">
                    <div className="text-6xl md:text-7xl font-light text-heading mb-2 tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-subtle font-medium text-sm uppercase tracking-[0.2em]">
                      {stat.unit}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-body leading-relaxed font-normal text-base font-archivo">
                    {stat.description}
                  </p>

                  {/* Hover Glow */}
                  <div className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${stat.color} blur-xl -z-10
                    transition-opacity duration-500 ease-out
                  `} style={{ filter: 'blur(40px)' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Call-to-Action Section */}
        <div className="mt-32">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-semibold text-heading mb-8 leading-tight font-archivo">
              {isNL 
                ? "Klaar om samen de toekomst van werk te bouwen?"
                : "Ready to build the future of work together?"
              }
            </h3>
            
            <p className="text-xl text-body mb-12 font-normal leading-relaxed font-archivo">
              {isNL 
                ? "We werken met slechts 5 nieuwe klanten per maand om maximale aandacht en resultaten te garanderen."
                : "We work with only 5 new clients per month to guarantee maximum attention and results."
              }
            </p>

            {/* Minimal CTA Button */}
            <div className="flex justify-center">
              <button
                className="group relative overflow-hidden px-12 py-4 bg-glass backdrop-blur-xl border border-glass hover:border-button-primary/50 text-heading font-medium text-lg rounded-2xl transition-all duration-500 hover:bg-accent/10 hover:scale-[1.02] transform-gpu"
                data-cal-namespace="automation-strategy-workshop"
                data-cal-link="kennet-timmers/workshop"
                data-cal-config='{"layout":"month_view"}'
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isNL ? "Boek Gratis Proces Audit" : "Book Free Process Audit"}
                  <div className="w-5 h-5 rounded-full bg-button-primary/20 flex items-center justify-center group-hover:bg-button-primary/30 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-button-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </span>
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 opacity-5" />
              </button>
            </div>
            
            <p className="text-sm text-subtle mt-6 font-normal font-archivo">
              {isNL ? "Geen verplichtingen • 100% gratis • Direct inzicht" : "No obligations • 100% free • Immediate insights"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
