'use client';

import { Users, Clock, Target, Gift, CheckCircle, Star, MessageCircle, BookOpen, Phone, Database, ArrowRight } from 'lucide-react';

interface WeeklyModule {
  category: string;
  description: string;
  deliverables: string[];
  value: string;
}

interface OngoingSupport {
  benefit: string;
  description: string;
}

const weeklyModules: WeeklyModule[] = [
  {
    category: "Week 1: Customer Discovery Toolkit",
    description: "Everything you need to validate your problem and find paying customers",
    deliverables: [
      "Customer interview script templates (proven with 500+ interviews)",
      "Problem validation framework and scoring system",
      "Target customer persona builder",
      "Competitive analysis templates",
      "Business model canvas workshop"
    ],
    value: "€2,500 value"
  },
  {
    category: "Week 2: MVP Building System",
    description: "No-code/low-code tools and frameworks to build your MVP fast",
    deliverables: [
      "Feature prioritization framework (Must-Have vs Nice-to-Have)",
      "No-code MVP building toolkit and tutorials",
      "Landing page templates (high-converting)",
      "Payment integration setup guide",
      "User onboarding flow templates"
    ],
    value: "€3,000 value"
  },
  {
    category: "Week 3: Validation & Testing Framework",
    description: "Get real customers using and paying for your MVP",
    deliverables: [
      "Beta customer recruitment playbook",
      "Usage analytics setup and interpretation",
      "Customer feedback collection systems",
      "Pricing strategy testing framework",
      "Product-market fit measurement tools"
    ],
    value: "€2,000 value"
  },
  {
    category: "Week 4: Revenue Generation System",
    description: "Convert beta users to paying customers and set up growth",
    deliverables: [
      "Conversion optimization playbook",
      "Payment processing and customer acquisition systems",
      "Referral and growth mechanism templates",
      "30-60-90 day scaling roadmap",
      "Investor pitch deck template (for those ready)"
    ],
    value: "€2,500 value"
  }
];

const ongoingSupport: OngoingSupport[] = [
  {
    benefit: "Private Founder Community",
    description: "Access to 200+ Dutch founder alumni network for ongoing support and connections"
  },
  {
    benefit: "Monthly Founder Calls",
    description: "Group coaching calls with successful founders to solve challenges and share wins"
  },
  {
    benefit: "Direct Founder Access",
    description: "1-on-1 office hours with program founders for critical decisions"
  },
  {
    benefit: "Resource Library",
    description: "Growing library of templates, tools, and case studies from successful launches"
  }
];

const uniqueAdvantages = [
  "Designed by Dutch founders who understand the local market and culture",
  "Maximum 12 founders per cohort for personalized attention",
  "Focus on runway preservation - build lean, validate fast",
  "Real founder mentorship, not theoretical advice",
  "Proven system used by 47+ successful Dutch startups"
];

const supportIcons = [Users, Phone, MessageCircle, Database];

export default function StartupKickoffWorkshopSection() {
  return (
    <section className="relative py-24" id="startup-kickoff-workshop">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            The 30-Day Startup Kickoff Lab: What You Get
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Everything you need to go from idea to first paying customer in 30 days - no fluff, just systematic execution
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            This isn't another generic startup course. The 30-Day Startup Kickoff Lab is a systematic, founder-to-founder program designed specifically for Dutch entrepreneurs with limited runway who need to validate fast. You get the exact frameworks, tools, and community support that helped 47 founders go from idea to paying customers in 30 days.
          </p>
        </div>

        {/* Workshop Structure Overview */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/20 rounded-3xl p-12">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
                Cohort-Based Intensive Program
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white mb-2 font-archivo">12 Founders Max</div>
                <div className="text-gray-400 font-archivo">Personalized attention</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white mb-2 font-archivo">2-3 Hours/Day</div>
                <div className="text-gray-400 font-archivo">Manageable commitment</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-xl font-bold text-white mb-2 font-archivo">90 Days Support</div>
                <div className="text-gray-400 font-archivo">30 intensive + 60 ongoing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Modules */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            Your Complete 30-Day Toolkit
          </h3>
          
          <div className="space-y-8">
            {weeklyModules.map((module, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3 font-archivo">
                      {module.category}
                    </h4>
                    <p className="text-gray-300 font-archivo leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <span className="inline-block px-4 py-2 bg-green-400/10 text-green-400 rounded-full font-semibold text-sm">
                      {module.value}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {module.deliverables.map((deliverable, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm font-archivo">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Support */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            Ongoing Support & Community (90 Days)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ongoingSupport.map((support, index) => {
              const IconComponent = supportIcons[index];
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 font-archivo">
                        {support.benefit}
                      </h4>
                      <p className="text-gray-300 text-sm font-archivo leading-relaxed">
                        {support.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unique Advantages */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center font-archivo">
              Why This Program Is Different
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uniqueAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-start">
                  <Star className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value Stack */}
        <div className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <Gift className="w-16 h-16 text-green-400 mx-auto mb-6" />
            
            <h3 className="text-3xl font-bold text-white mb-8 font-archivo">
              Complete Program Value
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400 line-through mb-2">€10,000+</div>
                <div className="text-gray-400 text-sm">If purchased separately</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">€1,497</div>
                <div className="text-gray-300 text-sm">Complete program price</div>
              </div>
            </div>

            <div className="bg-green-400/10 border border-green-400/20 rounded-2xl p-6">
              <p className="text-green-400 font-semibold font-archivo">
                <strong>85% savings</strong> compared to hiring consultants or buying tools separately
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8 font-archivo">
            Ready to join the next cohort of successful Dutch founders?
          </p>
          <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo">
            Secure Your Spot in the Next Cohort
            <ArrowRight className="w-6 h-6 ml-3 inline" />
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Next cohort starts in 7 days • Only 5 spots remaining
          </p>
        </div>
      </div>
    </section>
  );
}











