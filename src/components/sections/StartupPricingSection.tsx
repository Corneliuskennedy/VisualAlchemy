'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { CheckCircle, Rocket, Zap, Star, ArrowRight } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  cta: string;
  calNamespace: string;
  popular?: boolean;
  icon: React.ReactNode;
}

export default function StartupPricingSection() {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const pricingTiers: PricingTier[] = [
    {
      name: isNL ? "90-Min Validation Session" : "90-Min Validation Session",
      price: "€399",
      duration: isNL ? "1 dag intensief" : "1 day intensive",
      description: isNL 
        ? "Perfecte start voor idee validatie en MVP planning"
        : "Perfect start for idea validation and MVP planning",
      features: [
        isNL ? "Idee validatie framework" : "Idea validation framework",
        isNL ? "Markt analyse" : "Market analysis", 
        isNL ? "MVP roadmap" : "MVP roadmap",
        isNL ? "Tech stack advies" : "Tech stack advice",
        isNL ? "Go-to-market strategie" : "Go-to-market strategy"
      ],
      cta: isNL ? "Boek Validation Session" : "Book Validation Session",
      calNamespace: "automation-strategy-workshop",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      name: isNL ? "30-Day MVP Sprint" : "30-Day MVP Sprint",
      price: "€4,500",
      duration: isNL ? "4 weken intensief" : "4 weeks intensive",
      description: isNL 
        ? "Volledige MVP ontwikkeling van idee tot werkend product"
        : "Complete MVP development from idea to working product",
      features: [
        isNL ? "Alles uit Validation Session" : "Everything from Validation Session",
        isNL ? "Hands-on development" : "Hands-on development",
        isNL ? "User testing & feedback" : "User testing & feedback", 
        isNL ? "Launch ondersteuning" : "Launch support",
        isNL ? "2 maanden follow-up" : "2 months follow-up"
      ],
      cta: isNL ? "Boek Fit Call" : "Book Fit Call",
      calNamespace: "intro-call",
      popular: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: isNL ? "Partner Second Brain Retainer" : "Partner Second Brain Retainer", 
      price: "€1,500/m",
      duration: isNL ? "Doorlopend" : "Ongoing",
      description: isNL 
        ? "Continue ondersteuning voor groei en product ontwikkeling"
        : "Continuous support for growth and product development",
      features: [
        isNL ? "20 uur per maand" : "20 hours per month",
        isNL ? "Product roadmap" : "Product roadmap",
        isNL ? "Feature development" : "Feature development",
        isNL ? "Growth hacking" : "Growth hacking", 
        isNL ? "Maandelijkse reviews" : "Monthly reviews"
      ],
      cta: isNL ? "Boek Gesprek" : "Book Call",
      calNamespace: "intro-call",
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-archivo">
            {isNL ? 'Kies Je Startup Pad' : 'Choose Your Startup Path'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-archivo">
            {isNL 
              ? 'Van snelle validatie tot volledige MVP ontwikkeling - we hebben het juiste pakket voor jouw startup fase'
              : 'From quick validation to full MVP development - we have the right package for your startup stage'
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`
                relative bg-gray-900/50 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 hover:scale-105
                ${tier.popular 
                  ? 'border-orange-400/50 shadow-2xl shadow-orange-400/20' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
                }
              `}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold font-archivo">
                    {isNL ? 'Meest Populair' : 'Most Popular'}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`
                  inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                  ${tier.popular ? 'bg-orange-400/20 text-orange-400' : 'bg-blue-400/20 text-blue-400'}
                `}>
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-archivo">
                  {tier.name}
                </h3>
                <div className={`
                  text-4xl font-black mb-2 font-archivo
                  ${tier.popular ? 'text-orange-400' : 'text-blue-400'}
                `}>
                  {tier.price}
                </div>
                <p className="text-gray-400 text-sm font-archivo">
                  {tier.duration}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-center mb-8 font-archivo">
                {tier.description}
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className={`
                      w-5 h-5 mt-0.5 flex-shrink-0
                      ${tier.popular ? 'text-orange-400' : 'text-blue-400'}
                    `} />
                    <span className="text-gray-300 font-archivo">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className={`
                  w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 font-archivo group
                  ${tier.popular 
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:shadow-lg hover:shadow-orange-400/25' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-400/25'
                  }
                `}
                onClick={() => {
                  // Cal.com integration would go here
                  console.log(`Opening calendar for: ${tier.calNamespace}`);
                }}
              >
                {tier.cta}
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 font-archivo">
            {isNL 
              ? 'Alle prijzen zijn exclusief BTW. Niet zeker welk pakket? Boek een gratis 15-min gesprek.'
              : 'All prices exclude VAT. Not sure which package? Book a free 15-min call.'
            }
          </p>
          <button className="mt-4 text-blue-400 hover:text-blue-300 font-semibold font-archivo transition-colors duration-300">
            {isNL ? 'Boek Gratis Gesprek' : 'Book Free Call'}
          </button>
        </div>
      </div>
    </section>
  );
}
