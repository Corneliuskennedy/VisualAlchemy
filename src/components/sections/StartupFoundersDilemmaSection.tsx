'use client';

import { Flame, TrendingDown, Clock, AlertTriangle, DollarSign, Users, Zap } from 'lucide-react';

interface DilemmaMetric {
  metric: string;
  label: string;
  description: string;
  color: string;
  icon: string;
}

interface FounderMistake {
  mistake: string;
  description: string;
  cost: string;
  real_example: string;
}

const dilemmaMetrics: DilemmaMetric[] = [
  {
    metric: "€50,000",
    label: "Average Runway Burned",
    description: "Before first customer interaction",
    color: "red",
    icon: "burn"
  },
  {
    metric: "73%",
    label: "Failure Rate",
    description: "Dutch startups that never find PMF",
    color: "red", 
    icon: "decline"
  },
  {
    metric: "18 Months",
    label: "Average Time to Market",
    description: "Building without customer input",
    color: "orange",
    icon: "clock"
  }
];

const founderMistakes: FounderMistake[] = [
  {
    mistake: "Perfectionism Paralysis",
    description: "Spending 6+ months building features customers never asked for",
    cost: "€30,000+ in runway",
    real_example: "'We spent 8 months building a perfect dashboard. Customers wanted SMS notifications.'"
  },
  {
    mistake: "Operational Overhead",
    description: "Setting up complex systems before validating the core idea",
    cost: "€20,000+ in setup costs",
    real_example: "'We built enterprise infrastructure for an idea we never validated.'"
  },
  {
    mistake: "Isolation Building",
    description: "No customer contact during the first 12+ months of development",
    cost: "100% failure risk",
    real_example: "'We launched to crickets. Nobody wanted what we built.'"
  }
];

const emotionalTriggers = [
  "The 3 AM anxiety about runway running out",
  "Watching competitors launch while you're still 'perfecting' features",
  "The pressure from investors/family to show progress",
  "The fear that your idea isn't good enough (so you keep adding features)"
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'burn': return Flame;
    case 'decline': return TrendingDown;
    case 'clock': return Clock;
    default: return AlertTriangle;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case 'red': return { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
    case 'orange': return { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
    default: return { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
  }
};

export default function StartupFoundersDilemmaSection() {
  return (
    <section className="relative py-24" id="startup-founders-dilemma">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The Founder's Impossible Choice: Build Fast or Build Right?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            You're caught between burning runway on operational setup and the pressure to validate your idea quickly
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            Every founder faces the same impossible choice: spend months building the 'perfect' product in isolation, or rush to market with something half-baked. Meanwhile, your runway burns at €3,000-€8,000 per month on operational overhead instead of customer discovery. 73% of Dutch startups fail not because they had bad ideas, but because they ran out of money before finding product-market fit. You're not just competing against other startups—you're racing against your own bank account.
          </p>
        </div>

        {/* Dilemma Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {dilemmaMetrics.map((metric, index) => {
            const IconComponent = getIcon(metric.icon);
            const colors = getColorClasses(metric.color);
            
            return (
              <div
                key={index}
                className={`${colors.bg} ${colors.border} border rounded-3xl p-8 text-center`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div className={`text-5xl font-bold ${colors.text} mb-4 font-archivo`}>
                  {metric.metric}
                </div>
                <div className="text-xl font-bold text-white mb-3 font-archivo">
                  {metric.label}
                </div>
                <div className="text-gray-400 font-archivo">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Common Founder Mistakes */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            The 3 Deadly Mistakes That Kill Dutch Startups
          </h3>
          
          <div className="space-y-8">
            {founderMistakes.map((mistake, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Mistake Details */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-red-400 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-3 font-archivo">
                          {mistake.mistake}
                        </h4>
                        <p className="text-gray-300 mb-4 font-archivo leading-relaxed">
                          {mistake.description}
                        </p>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-red-400 mr-2" />
                          <span className="text-red-400 font-semibold">
                            Cost: {mistake.cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Example */}
                  <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <Users className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                        Real Founder Quote
                      </span>
                    </div>
                    <blockquote className="text-gray-300 italic font-archivo">
                      {mistake.real_example}
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional Triggers */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-archivo">
            The 3 AM Thoughts Every Founder Has
          </h3>
          
          <div className="bg-gradient-to-r from-purple-400/10 to-blue-400/10 border border-purple-400/20 rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emotionalTriggers.map((trigger, index) => (
                <div
                  key={index}
                  className="flex items-start"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 mt-2 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo italic">{trigger}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Transition */}
        <div className="text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
              There's a Better Way
            </h3>
            <p className="text-xl text-gray-300 font-archivo">
              What if you could validate your idea, build your MVP, and get to paying customers 
              in 30 days instead of 18 months?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}








