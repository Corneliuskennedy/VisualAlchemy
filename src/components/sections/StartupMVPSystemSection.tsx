'use client';

import { Target, Users, BarChart, Rocket, CheckCircle, Calendar, ArrowRight, Zap, TrendingUp } from 'lucide-react';

interface WeeklyBreakdown {
  week: string;
  name: string;
  focus: string;
  key_activities: string[];
  deliverables: string[];
  outcome: string;
}

const weeklyBreakdown: WeeklyBreakdown[] = [
  {
    week: "Week 1",
    name: "Launch Foundation",
    focus: "Customer Discovery & Problem Validation",
    key_activities: [
      "Rapid customer interview framework (10 interviews in 5 days)",
      "Problem validation using the 'Pain Point Hierarchy' method",
      "Competitor analysis and positioning strategy",
      "Lean business model canvas creation"
    ],
    deliverables: [
      "Validated problem statement",
      "Target customer persona",
      "Competitive positioning map",
      "Business model hypothesis"
    ],
    outcome: "You know exactly who has the problem and how much they'll pay to solve it"
  },
  {
    week: "Week 2",
    name: "MVP Design & Build",
    focus: "Minimum Viable Product Creation",
    key_activities: [
      "Feature prioritization using the 'Must-Have vs Nice-to-Have' framework",
      "Rapid prototyping and wireframing",
      "No-code/low-code MVP development",
      "Landing page and conversion funnel setup"
    ],
    deliverables: [
      "Functional MVP prototype",
      "Landing page with clear value proposition",
      "Payment integration setup",
      "User onboarding flow"
    ],
    outcome: "You have a working product that solves the validated problem"
  },
  {
    week: "Week 3",
    name: "Market Testing",
    focus: "Real Customer Validation & Feedback",
    key_activities: [
      "Beta customer recruitment and onboarding",
      "Usage data collection and analysis",
      "Customer feedback loops and iteration",
      "Pricing strategy testing and optimization"
    ],
    deliverables: [
      "10+ beta customers using your MVP",
      "Usage analytics and behavior data",
      "Customer feedback report",
      "Optimized pricing strategy"
    ],
    outcome: "You have real customers using your product and giving feedback"
  },
  {
    week: "Week 4",
    name: "Revenue Generation",
    focus: "First Paying Customers & Growth Setup",
    key_activities: [
      "Conversion optimization based on beta feedback",
      "Payment processing and customer acquisition",
      "Referral and growth mechanism implementation",
      "Scale preparation and next phase planning"
    ],
    deliverables: [
      "First paying customers",
      "Optimized conversion funnel",
      "Growth and referral system",
      "30-60-90 day growth plan"
    ],
    outcome: "You have paying customers and a clear path to scale"
  }
];

const frameworkBenefits = [
  "Preserve 90% of your runway for growth, not operational setup",
  "Get real customer feedback in week 1, not month 18",
  "Build only what customers actually want and will pay for",
  "Have a systematic approach instead of hoping and guessing"
];

const weekIcons = [Target, Users, BarChart, Rocket];

export default function StartupMVPSystemSection() {
  return (
    <section className="relative py-24" id="startup-mvp-system">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The 30-Day MVP Operating System That Changes Everything
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            The proven 4-week methodology that gets Dutch founders to market validation and first revenue without the 18-month runway burn
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            Forget the 18-month build-in-stealth approach. Our 30-Day MVP Operating System is specifically designed for founders with limited runway who need to validate fast and smart. This isn't about rushing—it's about being systematic. In 4 weeks, you'll go from idea to paying customers using the same methodology that's helped 47 Dutch founders launch successfully without burning their runway on operational overhead.
          </p>
        </div>

        {/* LEAN Framework Overview */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-400/10 to-green-400/10 border border-blue-400/20 rounded-3xl p-12">
            <div className="text-center mb-8">
              <Zap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-white mb-4 font-archivo">
                LEAN Framework
              </h3>
              <p className="text-xl text-gray-300 font-archivo">
                Launch, Engage, Analyze, Navigate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">30 Days</div>
                <div className="text-gray-400 font-archivo">Idea to First Customer</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-2">90%</div>
                <div className="text-gray-400 font-archivo">Runway Preserved</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">78%</div>
                <div className="text-gray-400 font-archivo">Success Rate</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 font-archivo">
                <strong>The Promise:</strong> From idea to first paying customer in 30 days, 
                preserving 90% of your runway for growth
              </p>
            </div>
          </div>
        </div>

        {/* 4-Week Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            Your 30-Day Journey to First Revenue
          </h3>
          
          <div className="space-y-12">
            {weeklyBreakdown.map((week, index) => {
              const IconComponent = weekIcons[index];
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Week Header */}
                  <div className="flex items-center mb-8">
                    <div className="w-20 h-20 bg-blue-400/20 rounded-3xl flex items-center justify-center mr-6">
                      <IconComponent className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-400 font-bold text-lg mr-4">{week.week}</span>
                        <span className="inline-block px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm font-medium">
                          7 Days
                        </span>
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-3 font-archivo">
                        {week.name}
                      </h4>
                      <p className="text-gray-300 text-lg font-archivo">
                        <strong>Focus:</strong> {week.focus}
                      </p>
                    </div>
                  </div>

                  {/* Week Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Key Activities */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h5 className="text-xl font-bold text-white mb-4 font-archivo">
                        Key Activities
                      </h5>
                      <ul className="space-y-3">
                        {week.key_activities.map((activity, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm font-archivo">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="bg-blue-400/10 border border-blue-400/20 rounded-2xl p-6">
                      <h5 className="text-xl font-bold text-blue-400 mb-4 font-archivo">
                        Week Deliverables
                      </h5>
                      <ul className="space-y-2">
                        {week.deliverables.map((deliverable, i) => (
                          <li key={i} className="flex items-start">
                            <Target className="w-4 h-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm font-archivo">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Week Outcome */}
                  <div className="bg-green-400/10 border border-green-400/20 rounded-2xl p-6">
                    <h5 className="text-xl font-bold text-green-400 mb-3 font-archivo">
                      Week {index + 1} Outcome
                    </h5>
                    <p className="text-gray-300 font-archivo leading-relaxed">
                      {week.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Framework Benefits */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center font-archivo">
              Why This Framework Works
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frameworkBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 font-archivo">
              Ready to Stop Burning Runway and Start Building Revenue?
            </h3>
            <p className="text-gray-300 mb-6 font-archivo">
              Join the next cohort of Dutch founders using this exact system
            </p>
            
            <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo">
              Join the 30-Day Kickoff Lab
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              Next cohort starts in 7 days • Limited to 12 founders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}










