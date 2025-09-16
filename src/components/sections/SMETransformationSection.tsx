'use client';

import { CheckCircle, Shield, Clock, TrendingUp, ArrowRight, Target } from 'lucide-react';

interface MethodologyStep {
  step: string;
  name: string;
  duration: string;
  description: string;
  deliverables: string[];
}

const methodologySteps: MethodologyStep[] = [
  {
    step: "1",
    name: "Audit & Map",
    duration: "Week 1-2",
    description: "Complete operational audit to identify every profit leak and inefficiency",
    deliverables: ["Profit leak analysis", "Process mapping", "ROI projections"]
  },
  {
    step: "2",
    name: "Design & Build", 
    duration: "Week 3-8",
    description: "Create your custom automated operating system with integrated workflows",
    deliverables: ["System architecture", "Automation setup", "Integration testing"]
  },
  {
    step: "3",
    name: "Deploy & Train",
    duration: "Week 9-10",
    description: "Seamless implementation with zero business disruption and full team training",
    deliverables: ["System deployment", "Staff training", "Performance monitoring"]
  },
  {
    step: "4",
    name: "Optimize & Scale",
    duration: "Week 11-12",
    description: "Fine-tune performance and prepare your business for effortless scaling",
    deliverables: ["Performance optimization", "Scaling roadmap", "ROI validation"]
  }
];

export default function SMETransformationSection() {
  return (
    <section className="relative py-24" id="sme-transformation">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The Complete Business Operating System Transformation
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            The proven 4-step methodology that transforms Dutch businesses into efficient, automated profit machines
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            You've seen the problem. Now here's the solution. Our Business Operating System Transformation isn't another band-aid fix—it's a complete systematic overhaul that eliminates profit leaks and builds scalable automation. In 90 days, you'll have a business that runs itself, saves you €50,000+ annually, and gives you back 20+ hours per week. We guarantee it.
          </p>
        </div>

        {/* BOSS Framework Overview */}
        <div className="bg-gradient-to-r from-blue-400/10 to-indigo-400/10 border border-blue-400/20 rounded-3xl p-12 mb-16">
          <div className="text-center mb-8">
            <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4 font-archivo">
              BOSS Framework
            </h3>
            <p className="text-xl text-gray-300 font-archivo">
              Business Operating System Systematization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">90 Days</div>
              <div className="text-gray-400 font-archivo">Complete Implementation</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">40-70%</div>
              <div className="text-gray-400 font-archivo">Cost Reduction</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-400 font-archivo">ROI Guarantee</div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-400/10 border border-green-400/20">
              <Shield className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-green-400 font-semibold font-archivo">
                ROI guaranteed within 12 months or money back
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Methodology */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            The 4-Step Transformation Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologySteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="mb-4 pt-2">
                  <span className="inline-block px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs font-medium uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>

                {/* Step Content */}
                <h4 className="text-xl font-bold text-white mb-3 font-archivo">
                  {step.name}
                </h4>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed font-archivo">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1">
                    {step.deliverables.map((deliverable, i) => (
                      <li key={i} className="flex items-start text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connecting Arrow (except for last item) */}
                {index < methodologySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-400/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h4 className="text-2xl font-bold text-white mb-6 font-archivo">
              What You Get
            </h4>
            <ul className="space-y-4">
              {[
                "Complete operational audit and profit leak analysis",
                "Custom-built automated operating system",
                "Zero-disruption implementation and training",
                "20+ hours per week reclaimed for strategic work",
                "40-70% reduction in operational costs",
                "Scalable foundation for future growth"
              ].map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h4 className="text-2xl font-bold text-white mb-6 font-archivo">
              Why It Works
            </h4>
            <ul className="space-y-4">
              {[
                "Systematic approach, not piecemeal fixes",
                "Proven methodology used by 200+ Dutch companies",
                "ROI guarantee backed by measurable results",
                "Zero business disruption during implementation",
                "Ongoing support and optimization included",
                "Built for Dutch business culture and regulations"
              ].map((reason, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8 font-archivo">
            Ready to stop the €67,560 annual profit leak?
          </p>
          <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo text-lg">
            Get Your Free Process Audit
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </button>
        </div>
      </div>
    </section>
  );
}



