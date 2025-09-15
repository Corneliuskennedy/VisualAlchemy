'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  outcomes: string[];
  color: string;
  accentColor: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  title,
  description,
  icon: Icon,
  duration,
  outcomes,
  color,
  accentColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative">
      {/* Step Card */}
      <div className={`
        relative overflow-hidden
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.05]
        rounded-3xl p-6
        hover:bg-white/[0.04] hover:border-white/[0.1]
        hover:scale-[1.02] hover:-translate-y-1
        transition-all duration-500 ease-out
        transform-gpu will-change-transform
        cursor-pointer min-h-[280px] flex flex-col
      `}
      onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg font-archivo">{step}</span>
        </div>

        {/* Icon Container */}
        <div className="relative w-16 h-16 mb-6">
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center
            bg-gradient-to-br ${color} opacity-20
            group-hover:opacity-30 group-hover:scale-110
            transition-all duration-300 ease-out
          `} />
          <Icon className={`
            absolute inset-0 m-auto w-8 h-8 ${accentColor}
            group-hover:scale-110 transition-transform duration-300
          `} />
        </div>
        
        {/* Duration Badge */}
        <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${color} bg-opacity-20 border border-current ${accentColor} text-sm font-medium mb-4 font-archivo self-start`}>
          {duration}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold leading-tight text-white mb-4 font-archivo">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 leading-relaxed font-normal text-base font-archivo mb-4 flex-grow">
          {description}
        </p>

        {/* Expand Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-archivo mt-auto">
          <span>Outcomes</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} />
        </div>

        {/* Expandable Outcomes */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/[0.05] animate-in slide-in-from-top-2 duration-200 ease-out">
            <h4 className={`text-sm font-semibold ${accentColor} mb-3 uppercase tracking-wider font-archivo`}>
              Key Outcomes:
            </h4>
            <ul className="space-y-2">
              {outcomes.map((outcome, idx) => (
                <li key={idx} className="text-sm text-gray-300 flex items-start font-archivo">
                  <span className={`w-1.5 h-1.5 rounded-full ${accentColor.replace('text-', 'bg-')} mt-2 mr-3 flex-shrink-0`} />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hover Glow */}
        <div className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br ${color} blur-xl -z-10
          transition-opacity duration-500 ease-out
        `} style={{ filter: 'blur(40px)' }} />
      </div>
    </div>
  );
};

export default ProcessStep;
