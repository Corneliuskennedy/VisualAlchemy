'use client';

import { AlertTriangle, Clock, Database, Workflow, TrendingDown } from 'lucide-react';

interface ProfitLeakArea {
  area: string;
  annual_cost: string;
  description: string;
  color: 'red' | 'orange';
}

const profitLeakAreas: ProfitLeakArea[] = [
  {
    area: "Manual Data Entry",
    annual_cost: "€18,500",
    description: "Staff spending 12+ hours weekly on duplicate data entry across systems",
    color: "red"
  },
  {
    area: "Disconnected Systems", 
    annual_cost: "€24,200",
    description: "Information silos causing delays, errors, and rework",
    color: "orange"
  },
  {
    area: "Inefficient Workflows",
    annual_cost: "€24,860",
    description: "Processes that should take minutes stretching into hours",
    color: "red"
  }
];

const getIcon = (area: string) => {
  switch (area) {
    case "Manual Data Entry": return Database;
    case "Disconnected Systems": return AlertTriangle;
    case "Inefficient Workflows": return Workflow;
    default: return Clock;
  }
};

const getColorClasses = (color: 'red' | 'orange') => {
  const colorMap = {
    red: {
      gradient: 'from-red-400 to-red-600',
      bg: 'bg-red-400/10',
      border: 'border-red-400/20',
      text: 'text-red-400'
    },
    orange: {
      gradient: 'from-orange-400 to-orange-600', 
      bg: 'bg-orange-400/10',
      border: 'border-orange-400/20',
      text: 'text-orange-400'
    }
  };
  return colorMap[color];
};

export default function SMEProfitLeakSection() {
  const totalAnnualLoss = profitLeakAreas.reduce((sum, area) => {
    return sum + parseInt(area.annual_cost.replace(/[€,]/g, ''));
  }, 0);

  return (
    <section className="relative py-24" id="sme-profit-leak">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The €67,560 Profit Leak Hiding in Plain Sight
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            While you focus on growth and sales, operational inefficiency is silently draining your profits
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            You've built a successful business, but your operations are working against you. Every manual handoff, every disconnected system, every 'temporary' workaround that became permanent—it's all adding up to massive profit leakage. Dutch SMEs lose an average of €67,560 annually to operational inefficiency. The worst part? Most business owners have no idea where the money is going until it's too late.
          </p>
        </div>

        {/* Total Loss Highlight */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-red-400/10 border border-red-400/20 rounded-3xl px-8 py-6 mb-8">
            <TrendingDown className="w-12 h-12 text-red-400 mr-4" />
            <div>
              <div className="text-4xl font-bold text-red-400 font-archivo">
                €{totalAnnualLoss.toLocaleString()}
              </div>
              <div className="text-gray-300 font-medium">
                Average Annual Loss Per SME
              </div>
            </div>
          </div>
          <p className="text-gray-400 font-archivo">
            That's €{Math.round(totalAnnualLoss/12).toLocaleString()} disappearing from your business every single month
          </p>
        </div>

        {/* Profit Leak Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {profitLeakAreas.map((leak, index) => {
            const colors = getColorClasses(leak.color);
            const Icon = getIcon(leak.area);
            
            return (
              <div
                key={index}
                className={`
                  group relative overflow-hidden ${colors.bg} backdrop-blur-xl 
                  ${colors.border} border rounded-3xl p-8 text-center 
                  hover:bg-white/[0.04] hover:border-white/[0.1] hover:scale-[1.02] hover:-translate-y-1 
                  transition-all duration-500 ease-out transform-gpu will-change-transform
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center
                    ${colors.bg} ${colors.border} border
                    group-hover:scale-110 transition-all duration-300 ease-out
                  `}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                </div>

                {/* Cost */}
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-light ${colors.text} mb-2 tracking-tight`}>
                    {leak.annual_cost}
                  </div>
                  <div className="text-gray-400 font-medium text-sm uppercase tracking-[0.2em]">
                    Annual Cost
                  </div>
                </div>

                {/* Area Title */}
                <h3 className="text-xl font-bold text-white mb-4 font-archivo">
                  {leak.area}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed font-normal text-base font-archivo">
                  {leak.description}
                </p>

                {/* Subtle glow effect on hover */}
                <div 
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${colors.gradient} blur-xl -z-10
                    transition-opacity duration-500 ease-out
                  `}
                  style={{ filter: 'blur(40px)' }}
                />
              </div>
            );
          })}
        </div>

        {/* Reality Check */}
        <div className="text-center bg-gradient-to-r from-red-400/10 to-orange-400/10 border border-red-400/20 rounded-3xl p-12">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-6 font-archivo">
            The Reality Check
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-archivo">
            Every day you delay fixing these inefficiencies costs you €185. That's €1,295 per week, €5,630 per month. While your competitors are building systematic operating systems, you're losing ground—and profit—every single day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">€185</div>
              <div className="text-gray-400 text-sm">Daily Loss</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">€1,295</div>
              <div className="text-gray-400 text-sm">Weekly Loss</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">€5,630</div>
              <div className="text-gray-400 text-sm">Monthly Loss</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

