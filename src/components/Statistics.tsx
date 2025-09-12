'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Clock, TrendingUp, Target, MapPin } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from './ui/GridBackground';

const Statistics = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const statistics = [
    {
      icon: Clock,
      number: "23",
      unit: isNL ? "uur/week" : "hours/week",
      description: isNL 
        ? "Nederlandse bedrijven besteden aan repetitieve taken" 
        : "Dutch businesses spend on repetitive tasks",
      color: "text-red-400"
    },
    {
      icon: TrendingUp,
      number: "70%",
      unit: isNL ? "reductie" : "reduction",
      description: isNL 
        ? "Handmatig werk eliminatie in 90 dagen" 
        : "Manual work elimination in 90 days",
      color: "text-green-400"
    },
    {
      icon: Target,
      number: "80%",
      unit: isNL ? "fout" : "mistake",
      description: isNL 
        ? "Bedrijven automatiseren eerst facturatie, maar klantcommunicatie heeft 3x meer impact" 
        : "Companies automate billing first, but customer communication has 3x more impact",
      color: "text-orange-400"
    },
    {
      icon: MapPin,
      number: isNL ? "Naarden" : "Naarden",
      unit: isNL ? "kantoor" : "office",
      description: isNL 
        ? "Lokale ondersteuning nabij Amsterdam met training voor soepele adoptie" 
        : "Local support near Amsterdam with training for smooth adoption",
      color: "text-blue-400"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative" aria-label="Key statistics and insights">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none opacity-30" />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {isNL ? (
              <>De realiteit van <span className="text-[#4585f4]">handmatig werk</span></>
            ) : (
              <>The reality of <span className="text-[#4585f4]">manual work</span></>
            )}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {isNL 
              ? "Waarom Nederlandse bedrijven kiezen voor onze bewezen automatiseringsmethodologie"
              : "Why Dutch businesses choose our proven automation methodology"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium text-lg">
                    {stat.unit}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-[#4585f4]/10 to-[#6B8AE6]/10 border border-[#4585f4]/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isNL 
                ? "Stop met tijd verspillen aan repetitieve taken"
                : "Stop wasting time on repetitive tasks"
              }
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {isNL 
                ? "Onze Value Stream Mapping Workshop identificeert welke processen het meest tijd kosten en hoe u ze kunt automatiseren voor maximale impact."
                : "Our Value Stream Mapping Workshop identifies which processes cost you the most time and how to automate them for maximum impact."
              }
            </p>
            <button
              className="px-8 py-4 bg-[#4585f4] hover:bg-[#4585f4]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25"
              data-cal-namespace="automation-strategy-workshop"
              data-cal-link="kennet-timmers/workshop"
              data-cal-config='{"layout":"month_view"}'
            >
              {isNL ? "Boek Gratis Proces Audit" : "Book Free Process Audit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
