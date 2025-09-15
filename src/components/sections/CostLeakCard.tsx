'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CostLeakCardProps {
  title: string;
  amount: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accentColor: string;
  details: string[];
}

const CostLeakCard: React.FC<CostLeakCardProps> = ({
  title,
  amount,
  description,
  icon: Icon,
  color,
  accentColor,
  details
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative">
      {/* Card */}
      <div className={`
        relative overflow-hidden
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.05]
        rounded-3xl p-8 text-center
        hover:bg-white/[0.04] hover:border-white/[0.1]
        hover:scale-[1.02] hover:-translate-y-1
        transition-all duration-500 ease-out
        transform-gpu will-change-transform
        cursor-pointer
      `}
      onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Icon Container */}
        <div className="relative w-16 h-16 mx-auto mb-6">
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
        
        {/* Cost Amount */}
        <div className="mb-4">
          <div className={`text-3xl md:text-4xl font-bold ${accentColor} mb-2 tracking-tight font-archivo`}>
            {amount}
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider font-archivo">
            Jaarlijkse kosten
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold leading-tight text-white mb-4 font-archivo">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 leading-relaxed font-normal text-base font-archivo mb-4">
          {description}
        </p>

        {/* Expand Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-archivo">
          <span>Kostendetails</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} />
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-white/[0.05] animate-in slide-in-from-top-2 duration-200 ease-out">
            <h4 className={`text-sm font-semibold ${accentColor} mb-3 uppercase tracking-wider font-archivo`}>
              Kostenfactoren:
            </h4>
            <ul className="space-y-2 text-left">
              {details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-300 flex items-start font-archivo">
                  <span className={`w-1.5 h-1.5 rounded-full ${accentColor.replace('text-', 'bg-')} mt-2 mr-3 flex-shrink-0`} />
                  {detail}
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

export default CostLeakCard;
