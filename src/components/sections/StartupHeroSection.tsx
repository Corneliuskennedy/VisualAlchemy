'use client';

import { Zap, TrendingUp, Clock, Users, ArrowRight, Target, Rocket } from 'lucide-react';

interface ValueProposition {
  metric: string;
  label: string;
  description: string;
}

const valuePropositions: ValueProposition[] = [
  {
    metric: "30 Days",
    label: "To First Paying Customer",
    description: "Not 18 months of runway burn"
  },
  {
    metric: "€5K-€15K",
    label: "Typical First Month Revenue",
    description: "Validate with real money, not surveys"
  },
  {
    metric: "90%",
    label: "Runway Preservation",
    description: "Focus on product, not operations"
  }
];

const primaryPainPoints = [
  "Burning runway on operational setup instead of customer discovery",
  "Building in isolation without market validation", 
  "18-month runway pressure with no systematic approach to validation",
  "Spending months on features customers don't want"
];

export default function StartupHeroSection() {
  return (
    <section className="relative py-24 min-h-[90vh] flex items-center" id="startup-hero">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            From Idea to Paying Customers in 30 Days
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Skip the 18-month runway burn. Get to market validation and first revenue in 30 days with our proven MVP methodology.
          </p>
          <p className="text-lg text-gray-400 max-w-6xl mx-auto leading-relaxed font-archivo">
            You have a great idea. You have limited runway. You have 18 months before you need to show results or find a job. Every day you spend building in isolation is a day closer to failure. Our 30-Day MVP Operating System isn't just about building fast—it's about building smart. We help Dutch founders systematically validate their ideas, build lean MVPs, and get to their first paying customers in 30 days, not 18 months.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {valuePropositions.map((prop, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-5xl font-bold text-blue-400 mb-4 font-archivo">
                {prop.metric}
              </div>
              <div className="text-xl font-bold text-white mb-3 font-archivo">
                {prop.label}
              </div>
              <div className="text-gray-400 font-archivo">
                {prop.description}
              </div>
            </div>
          ))}
        </div>

        {/* Positioning Statement */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-400/10 to-green-400/10 border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8 font-archivo">
              Stop Burning Runway. Start Building Revenue.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-4 font-archivo">
                  The Old Way
                </h3>
                <p className="text-gray-300 font-archivo">
                  18 months of building in stealth mode, burning runway on operational setup, 
                  hoping customers will want what you built
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-4 font-archivo">
                  The Smart Way
                </h3>
                <p className="text-gray-300 font-archivo">
                  30 days of systematic customer discovery and validation, 
                  preserving 90% of your runway for what matters: growth
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pain Points */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-archivo">
            Sound Familiar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryPainPoints.map((pain, index) => (
              <div
                key={index}
                className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6 flex items-start"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-3 h-3 bg-red-400 rounded-full mr-4 mt-2 flex-shrink-0" />
                <span className="text-gray-300 font-archivo">{pain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Preview */}
        <div className="mb-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-400/10 border border-blue-400/20 rounded-full px-6 py-3">
              <Users className="w-5 h-5 text-blue-400 mr-3" />
              <span className="text-blue-400 font-semibold font-archivo">
                Join 47 Dutch founders who launched in 30 days
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo mb-6">
            Join the 30-Day Kickoff Lab
            <Rocket className="w-6 h-6 ml-3 inline" />
          </button>
          
          <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
            <Target className="w-4 h-4 mr-2" />
            <span>Next cohort starts in 7 days</span>
          </div>
          
          <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-archivo">
            See How It Works
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </button>
        </div>
      </div>
    </section>
  );
}








