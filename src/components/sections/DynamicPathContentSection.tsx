'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, DollarSign, CheckCircle, ArrowRight, Star } from 'lucide-react';

interface PathContentProps {
  selectedPath?: 'startup' | 'sme' | null;
}

// Startup Path Content
const StartupContent = () => {
  return (
    <div className="space-y-16">
      {/* 30-Day MVP Methodology */}
      <div className="text-center">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 font-archivo">
          The 30-Day MVP Operating System
        </h3>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-archivo">
          From idea to validated business model with systematic operations that scale
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { week: 'Week 1', title: 'Validate & Map', description: 'Customer discovery & process design' },
            { week: 'Week 2', title: 'Build & Test', description: 'MVP development & automation setup' },
            { week: 'Week 3', title: 'Launch & Learn', description: 'Go-to-market & feedback loops' },
            { week: 'Week 4', title: 'Scale & Optimize', description: 'Growth systems & optimization' }
          ].map((phase, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">{phase.week}</div>
              <h4 className="text-white font-semibold mb-3 font-archivo">{phase.title}</h4>
              <p className="text-gray-400 text-sm font-archivo">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Success Stories */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
          Founder Success Stories
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              founder: 'Sarah Chen',
              company: 'EcoLogistics',
              result: 'First €10K MRR in 28 days',
              quote: 'The systematic approach saved us 6 months of trial and error.',
              metrics: ['€10K MRR', '28 days', '40% automation']
            },
            {
              founder: 'Mark de Vries',
              company: 'TechFlow',
              result: '€50K seed round secured',
              quote: 'Investors loved our operational foundation from day one.',
              metrics: ['€50K raised', '3 months', '60% time saved']
            }
          ].map((story, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-400/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold font-archivo">{story.founder}</h4>
                  <p className="text-gray-400 text-sm">{story.company}</p>
                </div>
              </div>
              
              <p className="text-gray-300 italic mb-4 font-archivo">"{story.quote}"</p>
              
              <div className="text-orange-400 font-semibold mb-4">{story.result}</div>
              
              <div className="flex gap-4">
                {story.metrics.map((metric, i) => (
                  <div key={i} className="bg-orange-400/10 px-3 py-1 rounded-full">
                    <span className="text-orange-400 text-xs font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop CTA */}
      <div className="text-center bg-gradient-to-r from-orange-400/10 to-red-400/10 border border-orange-400/20 rounded-3xl p-12">
        <Calendar className="w-16 h-16 text-orange-400 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
          90-Minute Kickoff Workshop
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-archivo">
          Get your personalized 30-day roadmap and operational foundation
        </p>
        
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">90 min</div>
            <div className="text-gray-400 text-sm">Deep dive session</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">€2,500</div>
            <div className="text-gray-400 text-sm">Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">3/month</div>
            <div className="text-gray-400 text-sm">Limited spots</div>
          </div>
        </div>
        
        <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-400/25 transition-all duration-300 font-archivo">
          Book Your Kickoff Workshop
          <ArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </div>
  );
};

// SME Path Content
const SMEContent = () => {
  return (
    <div className="space-y-16">
      {/* ROI Calculator */}
      <div className="text-center">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 font-archivo">
          Calculate Your Potential Savings
        </h3>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-archivo">
          See exactly how much operational inefficiency is costing your business
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-left">
              <label className="text-white font-medium mb-2 block">Monthly Revenue</label>
              <input 
                type="number" 
                placeholder="€25,000"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400"
              />
            </div>
            <div className="text-left">
              <label className="text-white font-medium mb-2 block">Number of Employees</label>
              <input 
                type="number" 
                placeholder="8"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400"
              />
            </div>
            <div className="bg-blue-400/10 border border-blue-400/20 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">€67,560</div>
                <div className="text-gray-300">Annual savings potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Results */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
          Client Transformation Results
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              company: 'Amsterdam Marketing Agency',
              industry: '15 employees',
              before: '€85K annual waste',
              after: '€52K saved (61%)',
              timeframe: '4 months',
              details: ['Automated client onboarding', 'Unified reporting system', 'Staff productivity +40%']
            },
            {
              company: 'Utrecht Manufacturing',
              industry: '28 employees', 
              before: '€120K operational costs',
              after: '€78K reduced (65%)',
              timeframe: '6 months',
              details: ['Supply chain automation', 'Quality control systems', 'Inventory optimization']
            }
          ].map((result, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold font-archivo">{result.company}</h4>
                  <p className="text-gray-400 text-sm">{result.industry}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-400/10 p-4 rounded-xl">
                  <div className="text-red-400 text-sm uppercase tracking-wide">Before</div>
                  <div className="text-white font-semibold">{result.before}</div>
                </div>
                <div className="bg-green-400/10 p-4 rounded-xl">
                  <div className="text-green-400 text-sm uppercase tracking-wide">After</div>
                  <div className="text-white font-semibold">{result.after}</div>
                </div>
              </div>
              
              <div className="text-blue-400 font-medium mb-4">Completed in {result.timeframe}</div>
              
              <ul className="space-y-2">
                {result.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Audit CTA */}
      <div className="text-center bg-gradient-to-r from-blue-400/10 to-indigo-400/10 border border-blue-400/20 rounded-3xl p-12">
        <DollarSign className="w-16 h-16 text-blue-400 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
          Free Process Audit
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-archivo">
          Get a detailed analysis of your operational inefficiencies and savings potential
        </p>
        
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">€0</div>
            <div className="text-gray-400 text-sm">Completely free</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">60 min</div>
            <div className="text-gray-400 text-sm">Comprehensive audit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">5/month</div>
            <div className="text-gray-400 text-sm">Limited spots</div>
          </div>
        </div>
        
        <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo">
          Book Your Free Audit
          <ArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </div>
  );
};

export default function DynamicPathContentSection({ selectedPath }: PathContentProps) {
  if (!selectedPath) {
    return null; // Don't render until path is selected
  }

  return (
    <section className="relative py-24" id="dynamic-path-content">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Path Indicator */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white font-medium">
              {selectedPath === 'startup' ? 'Startup Founder Path' : 'Business Owner Path'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-archivo">
            Your Personalized Roadmap
          </h2>
        </div>

        {/* Dynamic Content */}
        {selectedPath === 'startup' ? <StartupContent /> : <SMEContent />}
      </div>
    </section>
  );
}
