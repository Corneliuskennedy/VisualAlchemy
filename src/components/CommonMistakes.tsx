'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { AlertTriangle, TrendingUp, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from './ui/GridBackground';
import { Button } from './ui/button';

const CommonMistakes = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative" aria-label="Common automation mistakes">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none opacity-30" />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-8">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-medium">
                {isNL ? 'Veelgemaakte Fout' : 'Common Mistake'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {isNL ? (
                <>80% van bedrijven automatiseert <span className="text-red-400">het verkeerde proces eerst</span></>
              ) : (
                <>80% of companies automate <span className="text-red-400">the wrong process first</span></>
              )}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {isNL 
                ? "De meeste bedrijven beginnen met facturatie automatiseren, maar klantcommunicatie automatiseren heeft 3x meer impact op uw groei."
                : "Most companies start by automating billing, but automating customer communication has 3x more impact on your growth."
              }
            </p>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Wrong Way */}
            <div className="bg-red-900/20 border border-red-800/30 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {isNL ? "❌ Facturatie Eerst" : "❌ Billing First"}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {isNL 
                    ? "80% van bedrijven automatiseert eerst hun facturatieproces"
                    : "80% of companies automate their billing process first"
                  }
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <p className="text-gray-400">
                    {isNL ? "Bespaart slechts 2-3 uur per week" : "Saves only 2-3 hours per week"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <p className="text-gray-400">
                    {isNL ? "Geen directe impact op omzet" : "No direct impact on revenue"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <p className="text-gray-400">
                    {isNL ? "Klanten merken geen verschil" : "Customers notice no difference"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Way */}
            <div className="bg-green-900/20 border border-green-800/30 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {isNL ? "✅ Klantcommunicatie Eerst" : "✅ Customer Communication First"}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {isNL 
                    ? "Slimme bedrijven automatiseren eerst hun klantcommunicatie"
                    : "Smart companies automate their customer communication first"
                  }
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    {isNL ? "Bespaart 15-20 uur per week" : "Saves 15-20 hours per week"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    {isNL ? "Directe omzetgroei door betere conversie" : "Direct revenue growth through better conversion"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    {isNL ? "Klanten krijgen snellere, betere service" : "Customers get faster, better service"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-to-br from-[#4585f4]/10 to-[#6B8AE6]/10 border border-[#4585f4]/20 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {isNL ? "Het verschil is dramatisch" : "The difference is dramatic"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-2">3x</div>
                <div className="text-gray-300">
                  {isNL ? "Meer impact op groei" : "More impact on growth"}
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-2">40%</div>
                <div className="text-gray-300">
                  {isNL ? "Hogere conversie" : "Higher conversion"}
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-2">€50k+</div>
                <div className="text-gray-300">
                  {isNL ? "Extra omzet per jaar" : "Extra revenue per year"}
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              {isNL 
                ? "Daarom starten we altijd met een Value Stream Mapping Workshop om de processen te identificeren die de grootste impact hebben op uw groei."
                : "That's why we always start with a Value Stream Mapping Workshop to identify the processes that have the biggest impact on your growth."
              }
            </p>
            
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
              data-cal-namespace="automation-strategy-workshop"
              data-cal-link="kennet-timmers/workshop"
              data-cal-config='{"layout":"month_view"}'
            >
              {isNL ? "Ontdek Uw Grootste Kansen" : "Discover Your Biggest Opportunities"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonMistakes;
