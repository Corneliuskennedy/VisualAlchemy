'use client';

import React from 'react';
import { Quote, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface FounderStoryCardProps {
  founder: string;
  company: string;
  story: string;
  outcome: string;
  avatar?: string;
}

const FounderStoryCard: React.FC<FounderStoryCardProps> = ({
  founder,
  company,
  story,
  outcome,
  avatar
}) => {
  return (
    <div className="group relative">
      {/* Story Card */}
      <div className={`
        relative overflow-hidden
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.05]
        rounded-3xl p-8
        hover:bg-white/[0.04] hover:border-white/[0.1]
        hover:scale-[1.02] hover:-translate-y-1
        transition-all duration-500 ease-out
        transform-gpu will-change-transform
      `}>
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
          <Quote className="w-6 h-6 text-orange-400" />
        </div>

        {/* Founder Info */}
        <div className="flex items-center gap-4 mb-6">
          {avatar ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400/30">
              <Image
                src={avatar}
                alt={`${founder} avatar`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl font-archivo">
                {founder.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold text-white font-archivo">
              {founder}
            </h3>
            <p className="text-orange-400 font-medium font-archivo">
              Founder, {company}
            </p>
          </div>
        </div>

        {/* Story */}
        <blockquote className="text-gray-200 leading-relaxed text-lg font-archivo mb-6 italic">
          "{story}"
        </blockquote>

        {/* Outcome Badge */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400 font-archivo">Result:</div>
            <div className="text-green-400 font-bold font-archivo">{outcome}</div>
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center justify-center gap-1 mt-6 pt-6 border-t border-white/[0.05]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm text-gray-400 font-archivo">5.0</span>
        </div>

        {/* Hover Glow */}
        <div className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-xl -z-10
          transition-opacity duration-500 ease-out
        `} style={{ filter: 'blur(40px)' }} />
      </div>
    </div>
  );
};

export default FounderStoryCard;
