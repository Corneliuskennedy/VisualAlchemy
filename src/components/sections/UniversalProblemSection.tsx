'use client';

interface MetricCard {
  value: string;
  label: string;
  description: string;
  color: 'red' | 'orange';
}

const metricsData: MetricCard[] = [
  {
    value: "€67,560",
    label: "Average Annual Loss",
    description: "Lost to operational inefficiency",
    color: "red"
  },
  {
    value: "23+ Hours",
    label: "Weekly Time Waste", 
    description: "On manual, repetitive tasks",
    color: "orange"
  },
  {
    value: "40%",
    label: "Revenue Impact",
    description: "From disconnected systems",
    color: "red"
  }
];

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

export default function UniversalProblemSection() {
  return (
    <section className="relative py-24" id="universal-problem">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header - Clean Text Layout */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The €67,560 Annual Leak Every Business Ignores
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo">
            While you focus on growth, operational inefficiency quietly steals your profits
          </p>
        </div>

        {/* Body Copy - Text Only */}
        <div className="text-center mb-16">
          <p className="text-lg md:text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            Dutch businesses lose an average of €67,560 annually to operational inefficiency. That's not a typo—it's the hidden cost of running your business on manual processes, disconnected systems, and reactive firefighting. Your team spends 23+ hours per week on repetitive tasks that could be automated. Every manual handoff, every duplicate data entry, every 'quick fix' that becomes permanent—it all adds up to massive profit leakage.
          </p>
        </div>

        {/* Metrics Cards - Card-Based Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metricsData.map((metric, index) => {
            const colors = getColorClasses(metric.color);
            
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
                {/* Metric Value */}
                <div className="mb-6">
                  <div className={`text-6xl md:text-7xl font-light ${colors.text} mb-2 tracking-tight`}>
                    {metric.value}
                  </div>
                  <div className="text-gray-400 font-medium text-sm uppercase tracking-[0.2em]">
                    {metric.label}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed font-normal text-base font-archivo">
                  {metric.description}
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
      </div>
    </section>
  );
}
