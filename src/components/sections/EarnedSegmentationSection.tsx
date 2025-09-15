'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Building2, ArrowRight, CheckCircle } from 'lucide-react';

interface PathOption {
  type: 'startup' | 'sme';
  title: string;
  subtitle: string;
  promise: string;
  benefits: string[];
  cta: string;
  ideal_for: string;
  url: string;
}

const pathOptions: PathOption[] = [
  {
    type: "startup",
    title: "Startup Founder Path",
    subtitle: "Speed & Validation Focus",
    promise: "From idea to first paying customers in 30 days",
    benefits: [
      "30-Day MVP Operating System",
      "Lean validation framework", 
      "Automated ops foundation",
      "Direct founder involvement"
    ],
    cta: "Explore Startup Path",
    ideal_for: "Pre-revenue to €100K ARR",
    url: "/startup-kickoff-lab"
  },
  {
    type: "sme",
    title: "Business Owner Path", 
    subtitle: "Cost Savings & Efficiency Focus",
    promise: "Save €50,000+ annually through smart automation",
    benefits: [
      "Complete system transformation",
      "ROI guarantee included",
      "40-70% cost reduction",
      "Reclaim 20+ hours/week"
    ],
    cta: "Explore Business Path",
    ideal_for: "€100K+ revenue, 5+ employees",
    url: "/business-automation"
  }
];

interface EarnedSegmentationSectionProps {
  onPathSelect?: (path: 'startup' | 'sme') => void;
}

export default function EarnedSegmentationSection({ onPathSelect }: EarnedSegmentationSectionProps) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handlePathClick = (pathType: 'startup' | 'sme') => {
    if (onPathSelect) {
      onPathSelect(pathType);
    }
    
    // Track the selection
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'path_selected', {
        event_category: 'conversion',
        event_label: pathType,
        value: 1
      });
    }
  };

  return (
    <section className="relative py-24" id="earned-segmentation">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            Choose Your Transformation Path
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Get the methodology that matches your current stage and goals
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-archivo">
            Now that you understand the methodology, it's time to choose the path that fits your business stage. Whether you're a startup founder racing to validate your idea or an established business owner looking to optimize operations, we have the specialized approach that delivers results.
          </p>
        </div>

        {/* Path Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pathOptions.map((path, index) => {
            const isStartup = path.type === 'startup';
            const Icon = isStartup ? Rocket : Building2;
            const gradientColors = isStartup 
              ? 'from-orange-400 to-red-500' 
              : 'from-blue-400 to-indigo-500';
            const bgColors = isStartup
              ? 'bg-orange-400/10 border-orange-400/20 hover:border-orange-400/40'
              : 'bg-blue-400/10 border-blue-400/20 hover:border-blue-400/40';
            const textColors = isStartup ? 'text-orange-400' : 'text-blue-400';

            return (
              <div
                key={path.type}
                className={`
                  group relative overflow-hidden ${bgColors} backdrop-blur-xl 
                  border rounded-3xl p-8 cursor-pointer
                  hover:bg-white/[0.04] hover:scale-[1.02] hover:-translate-y-2
                  transition-all duration-500 ease-out transform-gpu will-change-transform
                `}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredPath(path.type)}
                onMouseLeave={() => setHoveredPath(null)}
                onClick={() => handlePathClick(path.type)}
              >
                {/* Icon Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColors} opacity-20 flex items-center justify-center mr-4 group-hover:opacity-30 transition-opacity duration-300`}>
                    <Icon className={`w-8 h-8 ${textColors}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-archivo">
                      {path.title}
                    </h3>
                    <p className={`text-sm font-medium ${textColors} uppercase tracking-wider`}>
                      {path.subtitle}
                    </p>
                  </div>
                </div>

                {/* Promise */}
                <div className="mb-6">
                  <p className="text-xl font-semibold text-white leading-relaxed font-archivo">
                    {path.promise}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {path.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 ${textColors} mr-3 mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-300 font-archivo">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Ideal for: {path.ideal_for}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={path.url} className={`
                  w-full flex items-center justify-center px-6 py-4 rounded-2xl
                  bg-gradient-to-r ${gradientColors} text-white font-semibold
                  hover:shadow-lg hover:shadow-${isStartup ? 'orange' : 'blue'}-400/25
                  transition-all duration-300 group-hover:scale-105 font-archivo
                `}>
                  {path.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                {/* Hover Glow Effect */}
                <div 
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${gradientColors} blur-xl -z-10
                    transition-opacity duration-500 ease-out
                  `}
                  style={{ filter: 'blur(40px)' }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 font-archivo">
            Not sure which path fits your business? 
            <button className="text-blue-400 hover:text-blue-300 ml-2 underline transition-colors duration-200">
              Take our 2-minute assessment
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
