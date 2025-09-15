'use client';

import React from 'react';
import { Building2, Target, CheckCircle, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface CaseStudyCardProps {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: {
    timeSaved: string;
    costReduction: string;
    errorReduction: string;
  };
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  company,
  industry,
  challenge,
  solution,
  result,
  metrics
}) => {
  return (
    <div className="group relative">
      {/* Case Study Card */}
      <div className={`
        relative overflow-hidden
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.05]
        rounded-3xl p-8 md:p-10
        hover:bg-white/[0.04] hover:border-white/[0.1]
        hover:scale-[1.01] hover:-translate-y-1
        transition-all duration-500 ease-out
        transform-gpu will-change-transform
      `}>
        {/* Company Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-archivo">
                {company}
              </h3>
              <p className="text-blue-400 font-medium font-archivo">
                {industry}
              </p>
            </div>
          </div>
          
          {/* Result Badge */}
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400 font-archivo">
              {result}
            </div>
            <div className="text-sm text-gray-400 font-archivo">Annual savings</div>
          </div>
        </div>

        {/* Challenge, Solution, Result Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Challenge */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-lg font-bold text-white font-archivo">Challenge</h4>
            </div>
            <p className="text-gray-300 leading-relaxed font-archivo">
              {challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white font-archivo">Solution</h4>
            </div>
            <p className="text-gray-300 leading-relaxed font-archivo">
              {solution}
            </p>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-white font-archivo">Impact</h4>
            </div>
            <p className="text-gray-300 leading-relaxed font-archivo">
              Achieved {result} through systematic process automation and workflow optimization.
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.05]">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1 font-archivo">
              {metrics.timeSaved}
            </div>
            <div className="text-sm text-gray-400 font-archivo">Time Saved</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1 font-archivo">
              {metrics.costReduction}
            </div>
            <div className="text-sm text-gray-400 font-archivo">Cost Reduction</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1 font-archivo">
              {metrics.errorReduction}
            </div>
            <div className="text-sm text-gray-400 font-archivo">Error Reduction</div>
          </div>
        </div>

        {/* Hover Glow */}
        <div className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-xl -z-10
          transition-opacity duration-500 ease-out
        `} style={{ filter: 'blur(40px)' }} />
      </div>
    </div>
  );
};

export default CaseStudyCard;
