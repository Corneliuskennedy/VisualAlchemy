'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { MapPin, Users, GraduationCap, Phone, Clock, CheckCircle } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from './ui/GridBackground';
import Image from 'next/image';

const LocalSupport = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const supportFeatures = [
    {
      icon: MapPin,
      title: isNL ? "Lokaal kantoor in Naarden" : "Local office in Naarden",
      description: isNL 
        ? "Nabij Amsterdam voor persoonlijke ondersteuning en snelle reactietijden"
        : "Near Amsterdam for personal support and fast response times"
    },
    {
      icon: Users,
      title: isNL ? "Persoonlijke begeleiding" : "Personal guidance",
      description: isNL 
        ? "Geen call centers, maar directe toegang tot uw dedicated automation expert"
        : "No call centers, but direct access to your dedicated automation expert"
    },
    {
      icon: GraduationCap,
      title: isNL ? "Training & adoptie" : "Training & adoption",
      description: isNL 
        ? "Uitgebreide training voor uw team om nieuwe systemen soepel te implementeren"
        : "Comprehensive training for your team to implement new systems smoothly"
    },
    {
      icon: Clock,
      title: isNL ? "Nederlandse werktijden" : "Dutch business hours",
      description: isNL 
        ? "Ondersteuning tijdens Nederlandse kantooruren in uw eigen tijdzone"
        : "Support during Dutch business hours in your own timezone"
    }
  ];

  const localBenefits = [
    {
      title: isNL ? "Nederlandse markt kennis" : "Dutch market knowledge",
      description: isNL 
        ? "We begrijpen de Nederlandse bedrijfscultuur en regelgeving"
        : "We understand Dutch business culture and regulations"
    },
    {
      title: isNL ? "GDPR compliance expertise" : "GDPR compliance expertise",
      description: isNL 
        ? "Specialistische kennis van Europese privacy wetgeving"
        : "Specialized knowledge of European privacy legislation"
    },
    {
      title: isNL ? "On-site implementatie" : "On-site implementation",
      description: isNL 
        ? "Kunnen snel ter plaatse zijn voor complexe implementaties"
        : "Can quickly be on-site for complex implementations"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative" aria-label="Local support and training">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none opacity-30" />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-8">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-medium">
                {isNL ? 'Lokale Ondersteuning' : 'Local Support'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {isNL ? (
                <>Lokale ondersteuning vanuit <span className="text-[#4585f4]">Naarden kantoor</span></>
              ) : (
                <>Local support from <span className="text-[#4585f4]">Naarden office</span></>
              )}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {isNL 
                ? "Nabij Amsterdam voor persoonlijke begeleiding, training en snelle ondersteuning bij uw automatiseringsprojecten."
                : "Near Amsterdam for personal guidance, training and fast support for your automation projects."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                {supportFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-[#4585f4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#4585f4]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Map/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center space-y-6">
                  {/* Location Badge */}
                  <div className="inline-flex items-center gap-3 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-2xl px-6 py-4">
                    <MapPin className="w-6 h-6 text-[#4585f4]" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Naarden, Nederland</div>
                      <div className="text-gray-400 text-sm">
                        {isNL ? "15 minuten van Amsterdam" : "15 minutes from Amsterdam"}
                      </div>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white">
                      {isNL ? "Service Gebied" : "Service Area"}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-[#4585f4] font-semibold">Amsterdam</div>
                        <div className="text-gray-400">Centrum & regio</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-[#4585f4] font-semibold">Utrecht</div>
                        <div className="text-gray-400">Stad & provincie</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-[#4585f4] font-semibold">Den Haag</div>
                        <div className="text-gray-400">Randstad</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-[#4585f4] font-semibold">Rotterdam</div>
                        <div className="text-gray-400">Haven & regio</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-[#4585f4]/5 border border-[#4585f4]/10 rounded-2xl p-4">
                    <div className="flex items-center justify-center gap-2 text-[#4585f4] mb-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">
                        {isNL ? "Direct contact" : "Direct contact"}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {isNL 
                        ? "Bereikbaar tijdens Nederlandse werktijden"
                        : "Available during Dutch business hours"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Local Benefits */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              {isNL ? "Waarom lokale ondersteuning belangrijk is" : "Why local support matters"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#4585f4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-[#4585f4]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{benefit.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Training Guarantee */}
            <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
              <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-6 py-4 mb-4">
                <GraduationCap className="w-6 h-6 text-green-400" />
                <div className="text-left">
                  <div className="text-white font-semibold">
                    {isNL ? "Training Garantie" : "Training Guarantee"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {isNL ? "Uw team is volledig opgeleid" : "Your team is fully trained"}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {isNL 
                  ? "We zorgen ervoor dat uw team volledig vertrouwd is met alle nieuwe systemen voordat we het project als voltooid beschouwen."
                  : "We ensure your team is fully comfortable with all new systems before we consider the project complete."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSupport;
