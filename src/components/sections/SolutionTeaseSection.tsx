'use client';

interface MethodologyStep {
  step: string;
  name: string;
  description: string;
}

const methodologySteps: MethodologyStep[] = [
  {
    step: "1",
    name: "Audit & Map",
    description: "Identify profit leaks and inefficiencies"
  },
  {
    step: "2", 
    name: "Design & Build",
    description: "Create your automated operating system"
  },
  {
    step: "3",
    name: "Implement & Test", 
    description: "Deploy with zero business disruption"
  },
  {
    step: "4",
    name: "Optimize & Scale",
    description: "Guarantee ROI and prepare for growth"
  }
];

export default function SolutionTeaseSection() {
  return (
    <section className="relative py-24" id="solution-tease">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header - Clean Text Layout */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The 4-Step Operating System That Changes Everything
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo">
            The proven framework that transforms any business into a scalable, automated machine
          </p>
        </div>

        {/* Body Copy - Text Only */}
        <div className="text-center mb-16">
          <p className="text-lg md:text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            There's a reason some businesses scale effortlessly while others struggle with every hire. It's not talent, funding, or market timing—it's having a systematic operating system. Our 4-step transformation methodology has helped over 200 Dutch companies eliminate operational chaos and build scalable, automated systems. In just 30 days, you'll have a complete operating system blueprint with ROI guarantee. The question isn't whether it works—it's whether you'll implement it before your competition does.
          </p>
        </div>

        {/* Methodology Preview - Subtle Visual Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodologySteps.map((step, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step Number with Subtle Accent */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-400/10 to-indigo-400/10 border border-blue-400/20 flex items-center justify-center group-hover:border-blue-400/40 transition-all duration-300">
                  <span className="text-2xl font-bold text-blue-400 font-archivo">
                    {step.step}
                  </span>
                </div>
                
                {/* Connecting Line (except for last item) */}
                {index < methodologySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-400/30 to-transparent -z-10" />
                )}
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold text-white mb-3 font-archivo">
                {step.name}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm font-archivo">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee Highlight */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 px-6 py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            <span className="text-green-400 font-medium text-sm uppercase tracking-wider font-archivo">
              ROI Guaranteed or Money Back
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}











