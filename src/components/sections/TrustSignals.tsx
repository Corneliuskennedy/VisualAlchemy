'use client';

import React from 'react';
import { CheckCircle, Quote, Star, Shield, Award, Users } from 'lucide-react';
import { AudienceType } from '@/hooks/useAudienceSegmentation';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  result: string;
}

interface TrustSignalsProps {
  guarantees: string[];
  testimonials: Testimonial[];
  audience: AudienceType;
}

const TrustSignals: React.FC<TrustSignalsProps> = ({
  guarantees,
  testimonials,
  audience
}) => {
  const accentColor = audience === 'startup' 
    ? 'text-orange-400' 
    : 'text-blue-400';

  const gradientFrom = audience === 'startup' 
    ? 'from-orange-900/20' 
    : 'from-blue-900/20';

  const gradientTo = audience === 'startup' 
    ? 'to-red-900/20' 
    : 'to-indigo-900/20';

  const borderColor = audience === 'startup' 
    ? 'border-orange-500/30' 
    : 'border-blue-500/30';

  return (
    <div className="space-y-12">
      {/* Guarantees Grid */}
      <div className={`
        bg-gradient-to-br ${gradientFrom} via-gray-900/20 ${gradientTo}
        border ${borderColor} rounded-3xl p-8 md:p-12
      `}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className={`w-8 h-8 ${accentColor}`} />
            <h3 className="text-3xl md:text-4xl font-bold text-white font-archivo">
              Onze Garanties
            </h3>
          </div>
          <p className="text-lg text-gray-300 font-archivo">
            We staan 100% achter onze methodologie en resultaten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((guarantee, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                audience === 'startup' 
                  ? 'from-orange-500 to-red-500' 
                  : 'from-blue-500 to-indigo-500'
              } flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium font-archivo text-lg">
                {guarantee}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      {testimonials.length > 0 && (
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-archivo">
            Wat Klanten Zeggen
          </h3>
          
          {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-4xl mx-auto">
              <div className={`
                relative overflow-hidden
                bg-white/[0.02] backdrop-blur-xl
                border border-white/[0.05] rounded-3xl p-8 md:p-12
                hover:bg-white/[0.04] transition-all duration-300
              `}>
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-500/20 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-gray-400" />
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed font-archivo mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author & Company */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-lg font-bold text-white font-archivo">
                      {testimonial.author}
                    </div>
                    <div className={`${accentColor} font-medium font-archivo`}>
                      {testimonial.company}
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className={`
                    inline-flex items-center gap-3 
                    px-6 py-3 bg-gradient-to-r ${
                      audience === 'startup' 
                        ? 'from-green-600/20 to-orange-600/20 border-green-500/30' 
                        : 'from-green-600/20 to-blue-600/20 border-green-500/30'
                    } 
                    border rounded-full
                  `}>
                    <Award className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-bold font-archivo">
                      {testimonial.result}
                    </span>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1 mt-8 pt-6 border-t border-white/[0.05]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-3 text-gray-400 font-archivo">5.0 sterren</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Social Proof Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl">
          <Users className={`w-12 h-12 ${accentColor} mx-auto mb-4`} />
          <div className="text-3xl font-bold text-white mb-2 font-archivo">
            {audience === 'startup' ? '87%' : '94%'}
          </div>
          <div className="text-gray-400 font-archivo">
            {audience === 'startup' ? 'Success Rate' : 'Client Satisfaction'}
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl">
          <CheckCircle className={`w-12 h-12 ${accentColor} mx-auto mb-4`} />
          <div className="text-3xl font-bold text-white mb-2 font-archivo">
            {audience === 'startup' ? '23' : '67'}
          </div>
          <div className="text-gray-400 font-archivo">
            {audience === 'startup' ? 'Dagen tot eerste klant' : 'Dagen tot ROI'}
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl">
          <Award className={`w-12 h-12 ${accentColor} mx-auto mb-4`} />
          <div className="text-3xl font-bold text-white mb-2 font-archivo">
            {audience === 'startup' ? '€2.1K' : '€36K'}
          </div>
          <div className="text-gray-400 font-archivo">
            {audience === 'startup' ? 'Gemiddelde MRR' : 'Gemiddelde besparing'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;



