'use client';

import { Search, Wrench, Rocket, TrendingUp, CheckCircle, Clock, Shield, Target, ArrowRight, Calendar } from 'lucide-react';

interface DetailedStep {
  week: string;
  activities: string[];
}

interface DetailedPhase {
  phase: string;
  name: string;
  duration: string;
  overview: string;
  detailed_steps: DetailedStep[];
  deliverables: string[];
  outcome: string;
}

const detailedPhases: DetailedPhase[] = [
  {
    phase: "Phase 1",
    name: "Discovery & Audit",
    duration: "Week 1-2",
    overview: "Complete operational analysis to identify every profit leak and inefficiency",
    detailed_steps: [
      {
        week: "Week 1",
        activities: [
          "Comprehensive business process mapping",
          "Financial impact assessment of current inefficiencies", 
          "Technology stack audit and integration analysis",
          "Team workflow observation and bottleneck identification"
        ]
      },
      {
        week: "Week 2", 
        activities: [
          "ROI projection modeling for each optimization opportunity",
          "Priority matrix creation based on impact vs. implementation effort",
          "Custom transformation roadmap development",
          "Stakeholder alignment and buy-in sessions"
        ]
      }
    ],
    deliverables: [
      "Complete Process Audit Report",
      "€-specific ROI Projections", 
      "Custom Transformation Roadmap",
      "Implementation Timeline"
    ],
    outcome: "Crystal clear understanding of where you're losing money and exactly how much you'll save"
  },
  {
    phase: "Phase 2",
    name: "System Design & Build",
    duration: "Week 3-8", 
    overview: "Custom automation system development tailored to your specific business needs",
    detailed_steps: [
      {
        week: "Week 3-4",
        activities: [
          "System architecture design and approval",
          "Integration planning with existing tools",
          "Automation workflow development",
          "Security and compliance framework setup"
        ]
      },
      {
        week: "Week 5-6",
        activities: [
          "Core system development and configuration",
          "Data migration strategy and execution",
          "Custom dashboard and reporting setup",
          "Quality assurance and testing protocols"
        ]
      },
      {
        week: "Week 7-8",
        activities: [
          "System integration and end-to-end testing",
          "Performance optimization and fine-tuning",
          "User acceptance testing with your team",
          "Documentation and training material creation"
        ]
      }
    ],
    deliverables: [
      "Custom Operating System",
      "Integrated Automation Workflows",
      "Real-time Analytics Dashboard",
      "Complete System Documentation"
    ],
    outcome: "A fully built, tested system ready for seamless deployment"
  },
  {
    phase: "Phase 3",
    name: "Implementation & Training",
    duration: "Week 9-10",
    overview: "Zero-disruption deployment with comprehensive team training and support",
    detailed_steps: [
      {
        week: "Week 9",
        activities: [
          "Phased system rollout to minimize business disruption",
          "Real-time monitoring and immediate issue resolution",
          "Team training sessions on new workflows",
          "Change management and adoption support"
        ]
      },
      {
        week: "Week 10",
        activities: [
          "Full system activation and monitoring",
          "Performance benchmarking against baseline metrics",
          "Team competency validation and additional training",
          "Process refinement based on initial usage patterns"
        ]
      }
    ],
    deliverables: [
      "Live Operating System",
      "Trained Team Members",
      "Performance Benchmarks",
      "Adoption Success Metrics"
    ],
    outcome: "Your team is fully operational on the new system with measurable improvements already visible"
  },
  {
    phase: "Phase 4",
    name: "Optimization & ROI Validation",
    duration: "Week 11-12",
    overview: "Performance optimization and ROI guarantee validation with scaling preparation",
    detailed_steps: [
      {
        week: "Week 11",
        activities: [
          "Performance data analysis and optimization opportunities",
          "System fine-tuning for maximum efficiency",
          "ROI calculation and guarantee validation",
          "Scaling roadmap development for future growth"
        ]
      },
      {
        week: "Week 12",
        activities: [
          "Final performance optimization implementation",
          "ROI guarantee documentation and sign-off",
          "Ongoing support and maintenance plan setup",
          "Success celebration and future planning session"
        ]
      }
    ],
    deliverables: [
      "Optimized System Performance",
      "Validated ROI Guarantee",
      "Scaling Preparation Roadmap",
      "Ongoing Support Plan"
    ],
    outcome: "Guaranteed ROI achieved, system optimized, and business prepared for effortless scaling"
  }
];

const phaseIcons = [Search, Wrench, Rocket, TrendingUp];

export default function SMEProcessSection() {
  return (
    <section className="relative py-24" id="sme-process">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            How We Eliminate Your €67,560 Profit Leak in 90 Days
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            A detailed look at our proven 4-phase methodology and what happens at each stage
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            You've seen the results. Now here's exactly how we deliver them. Our BOSS Framework isn't magic—it's a systematic, proven methodology refined through 200+ Dutch business transformations. Every step is documented, measured, and designed to deliver maximum ROI with zero business disruption.
          </p>
        </div>

        {/* Timeline Overview */}
        <div className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Calendar className="w-12 h-12 text-blue-400 mr-4" />
              <div>
                <h3 className="text-3xl font-bold text-white font-archivo">90-Day Transformation</h3>
                <p className="text-gray-400">Complete implementation with guaranteed ROI</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {detailedPhases.map((phase, index) => {
                const IconComponent = phaseIcons[index];
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-lg font-bold text-white mb-2 font-archivo">
                      {phase.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {phase.duration}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Phase Breakdown */}
        <div className="space-y-12">
          {detailedPhases.map((phase, index) => {
            const IconComponent = phaseIcons[index];
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Phase Header */}
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-blue-400/20 rounded-3xl flex items-center justify-center mr-6">
                    <IconComponent className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-blue-400 font-bold text-lg mr-4">{phase.phase}</span>
                      <span className="inline-block px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm font-medium">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 font-archivo">
                      {phase.name}
                    </h3>
                    <p className="text-gray-300 text-lg font-archivo">
                      {phase.overview}
                    </p>
                  </div>
                </div>

                {/* Detailed Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {phase.detailed_steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4 font-archivo">
                        {step.week}
                      </h4>
                      <ul className="space-y-3">
                        {step.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm font-archivo">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Deliverables & Outcome */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-blue-400/10 border border-blue-400/20 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-blue-400 mb-4 font-archivo">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start">
                          <Target className="w-4 h-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm font-archivo">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-400/10 border border-green-400/20 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-green-400 mb-4 font-archivo">
                      Phase Outcome
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-archivo">
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Guarantees */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20 rounded-3xl p-8">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
                Our Guarantees to You
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "ROI guarantee: Measurable savings within 12 months or money back",
                "Zero business disruption during implementation",
                "Complete team adoption with ongoing support",
                "Scalable foundation for future growth"
              ].map((guarantee, i) => (
                <div key={i} className="flex items-start">
                  <Shield className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{guarantee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-8 font-archivo">
            Ready to start your 90-day transformation?
          </p>
          <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo text-lg">
            Schedule Your Free Process Audit
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Discover exactly where you're losing €67,560+ annually
          </p>
        </div>
      </div>
    </section>
  );
}


