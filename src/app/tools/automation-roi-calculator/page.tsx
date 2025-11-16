'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Calculator, Euro, Clock, TrendingUp, ArrowRight, ArrowLeft, Users, BarChart3, Target } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
const AutomationROICalculatorPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();  // Calculator state
  const [employees, setEmployees] = useState(10);
  const [avgHourlyRate, setAvgHourlyRate] = useState(35);
  const [hoursPerWeekRepetitive, setHoursPerWeekRepetitive] = useState(8);
  const [automationReduction, setAutomationReduction] = useState(60);
  const [results, setResults] = useState({
    weeklyTimeSaved: 0,
    annualTimeSaved: 0,
    annualCostSavings: 0,
    monthlyROI: 0,
    paybackPeriod: 0
  });

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Tools' : 'Tools',
      titleNL: 'Tools',
      href: isNL ? '/nl/tools' : '/tools',
      isCurrent: false
    },
    {
      title: isNL ? 'ROI Calculator' : 'ROI Calculator',
      titleNL: 'ROI Calculator',
      href: isNL ? '/nl/tools/automation-roi-calculator' : '/tools/automation-roi-calculator',
      isCurrent: true
    }
  ];

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const weeklyTimeSaved = (hoursPerWeekRepetitive * automationReduction) / 100;
    const annualTimeSaved = weeklyTimeSaved * 52;
    const annualCostSavings = annualTimeSaved * avgHourlyRate * employees;
    
    // Estimate automation implementation cost (typically 1-3 months of savings)
    const implementationCost = annualCostSavings * 0.2; // 20% of annual savings
    const monthlyROI = (annualCostSavings - implementationCost) / 12;
    const paybackPeriod = implementationCost / (annualCostSavings / 12);

    setResults({
      weeklyTimeSaved: Math.round(weeklyTimeSaved * employees),
      annualTimeSaved: Math.round(annualTimeSaved * employees),
      annualCostSavings: Math.round(annualCostSavings),
      monthlyROI: Math.round(monthlyROI),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10
    });
  }, [employees, avgHourlyRate, hoursPerWeekRepetitive, automationReduction]);

  const inputFields = [
    {
      label: isNL ? "Aantal medewerkers" : "Number of employees",
      value: employees,
      setValue: setEmployees,
      min: 1,
      max: 500,
      step: 1,
      suffix: isNL ? "medewerkers" : "employees"
    },
    {
      label: isNL ? "Gemiddeld uurloon" : "Average hourly rate",
      value: avgHourlyRate,
      setValue: setAvgHourlyRate,
      min: 15,
      max: 150,
      step: 5,
      prefix: "€",
      suffix: isNL ? "per uur" : "per hour"
    },
    {
      label: isNL ? "Repetitieve taken per week" : "Repetitive tasks per week",
      value: hoursPerWeekRepetitive,
      setValue: setHoursPerWeekRepetitive,
      min: 1,
      max: 40,
      step: 1,
      suffix: isNL ? "uur per week" : "hours per week"
    },
    {
      label: isNL ? "Automatisering reductie" : "Automation reduction",
      value: automationReduction,
      setValue: setAutomationReduction,
      min: 10,
      max: 90,
      step: 10,
      suffix: "%"
    }
  ];

  const resultCards = [
    {
      icon: Clock,
      title: isNL ? "Tijd bespaard per week" : "Time saved per week",
      value: results.weeklyTimeSaved,
      suffix: isNL ? "uren" : "hours",
      color: "text-blue-400"
    },
    {
      icon: BarChart3,
      title: isNL ? "Tijd bespaard per jaar" : "Time saved per year",
      value: results.annualTimeSaved,
      suffix: isNL ? "uren" : "hours",
      color: "text-green-400"
    },
    {
      icon: Euro,
      title: isNL ? "Jaarlijkse kostenbesparing" : "Annual cost savings",
      value: `€${results.annualCostSavings.toLocaleString()}`,
      suffix: "",
      color: "text-[#4585f4]"
    },
    {
      icon: TrendingUp,
      title: isNL ? "Maandelijkse ROI" : "Monthly ROI",
      value: `€${results.monthlyROI.toLocaleString()}`,
      suffix: "",
      color: "text-purple-400"
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Gratis ROI Calculator voor AI Automatisering | Octomatic" : "Free ROI Calculator for AI Automation | Octomatic"}
        description={isNL ? "Bereken de ROI van AI automatisering voor uw bedrijf. Gratis tool toont potentiële besparingen, payback periode en jaarlijkse voordelen." : "Calculate the ROI of AI automation for your business. Free tool shows potential savings, payback period and annual benefits."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/tools/automation-roi-calculator" : "https://www.octomatic.ai/tools/automation-roi-calculator"}
        keywords={isNL ? "ROI calculator, AI automatisering, kostenbesparing, payback periode" : "ROI calculator, AI automation, cost savings, payback period"}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A]">
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="service"
                />
              </div>

              <Button 
                variant="ghost" 
                asChild
                className="mb-8 hover:bg-secondary/20 group"
              >
                <Link href={isNL ? '/nl' : '/'}>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {isNL ? 'Terug naar Home' : 'Back to Home'}
                </Link>
              </Button>

              <div className="max-w-7xl mx-auto text-center mb-16">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2">
                    <Calculator className="w-4 h-4 text-[#4585f4]" />
                    <span className="text-[#4585f4] font-medium text-sm">
                      {isNL ? "Gratis Tool" : "Free Tool"}
                    </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    {isNL ? "AI Automatisering ROI Calculator" : "AI Automation ROI Calculator"}
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full mx-auto"></div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {isNL ? (
                      "Ontdek hoeveel uw bedrijf kan besparen met AI automatisering. Bereken uw ROI, payback periode en jaarlijkse voordelen."
                    ) : (
                      "Discover how much your business can save with AI automation. Calculate your ROI, payback period and annual benefits."
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {isNL ? "Uw bedrijfsgegevens" : "Your business details"}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {isNL 
                        ? "Vul onderstaande gegevens in om uw potentiële ROI te berekenen"
                        : "Fill in the details below to calculate your potential ROI"
                      }
                    </p>
                  </div>

                  <div className="space-y-6">
                    {inputFields.map((field, index) => (
                      <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-6">
                        <label className="block text-lg font-semibold text-white mb-4">
                          {field.label}
                        </label>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            {field.prefix && (
                              <span className="text-gray-400 font-medium">{field.prefix}</span>
                            )}
                            <input
                              type="range"
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              value={field.value}
                              onChange={(e) => field.setValue(Number(e.target.value))}
                              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <span className="text-gray-400 font-medium min-w-[100px] text-right">
                              {field.value} {field.suffix}
                            </span>
                          </div>
                          
                          <input
                            type="number"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={field.value}
                            onChange={(e) => field.setValue(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#4585f4] focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {isNL ? "Uw ROI resultaten" : "Your ROI results"}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {isNL 
                        ? "Gebaseerd op uw invoer, dit zijn uw potentiële besparingen"
                        : "Based on your input, these are your potential savings"
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {resultCards.map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#4585f4]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#4585f4]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                {card.title}
                              </h4>
                              <div className={`text-2xl font-bold ${card.color} mb-1`}>
                                {card.value}{card.suffix}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Payback Period */}
                  <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-800/30 rounded-2xl p-8">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">
                        {isNL ? "Terugverdientijd" : "Payback Period"}
                      </h4>
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {results.paybackPeriod} {isNL ? "maanden" : "months"}
                      </div>
                      <p className="text-green-300 text-sm">
                        {isNL 
                          ? "Tijd om uw investering terug te verdienen"
                          : "Time to recover your investment"
                        }
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 p-8 text-center">
                    <h4 className="text-xl font-bold text-white mb-4">
                      {isNL ? "Wilt u deze besparingen realiseren?" : "Want to realize these savings?"}
                    </h4>
                    <p className="text-gray-300 mb-6">
                      {isNL 
                        ? "Boek een gratis workshop om uw automatisering strategie te bepalen"
                        : "Book a free workshop to determine your automation strategy"
                      }
                    </p>
                    <Button 
                      size="lg" 
                      className="px-8 py-4 text-lg font-semibold bg-[#4585f4] hover:bg-[#4585f4]/90 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/25 group"
                      data-cal-namespace="automation-strategy-workshop"
                      data-cal-link="kennet-timmers/workshop"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      {isNL ? "Boek Gratis Workshop" : "Book Free Workshop"}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="py-16 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {isNL ? "Belangrijk om te weten" : "Important to know"}
                  </h3>
                  <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <p>
                      {isNL 
                        ? "Deze calculator geeft een schatting gebaseerd op gemiddelde waardes. Werkelijke resultaten kunnen variëren afhankelijk van uw specifieke processen, implementatie complexiteit en bedrijfsomstandigheden."
                        : "This calculator provides an estimate based on average values. Actual results may vary depending on your specific processes, implementation complexity and business circumstances."
                      }
                    </p>
                    <p>
                      {isNL 
                        ? "Voor een nauwkeurige analyse van uw automatiseringsmogelijkheden raden we een persoonlijke workshop aan waar we uw specifieke situatie in detail bekijken."
                        : "For an accurate analysis of your automation opportunities, we recommend a personal workshop where we look at your specific situation in detail."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
};

export default AutomationROICalculatorPage;
