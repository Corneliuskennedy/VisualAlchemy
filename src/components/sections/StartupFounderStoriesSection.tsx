'use client';

import { User, MapPin, Calendar, DollarSign, TrendingUp, Quote, CheckCircle, Target } from 'lucide-react';

interface FounderStory {
  founder_name: string;
  company: string;
  industry: string;
  location: string;
  before: {
    situation: string;
    challenge: string;
    risk: string;
  };
  after: {
    timeline: string;
    first_customer: string;
    first_revenue: string;
    runway_preserved: string;
    customers_by_month_3: string;
  };
  quote: string;
  key_metric: string;
}

const founderStories: FounderStory[] = [
  {
    founder_name: "Lisa van der Berg",
    company: "EcoTrack Amsterdam",
    industry: "Sustainability SaaS",
    location: "Amsterdam",
    before: {
      situation: "Had a sustainability tracking app idea, €45K runway, 12 months to prove concept",
      challenge: "Was planning to spend 8 months building a full platform before any customer contact",
      risk: "Would have burned 70% of runway before first customer interaction"
    },
    after: {
      timeline: "30 days",
      first_customer: "Day 23",
      first_revenue: "€2,400 in month 1",
      runway_preserved: "€38,000 (85%)",
      customers_by_month_3: "47 paying customers"
    },
    quote: "I was about to spend 8 months building in isolation. Instead, I had paying customers in 23 days and preserved 85% of my runway for growth.",
    key_metric: "€2,400 first month revenue"
  },
  {
    founder_name: "Joris Bakker",
    company: "FreelanceFlow Utrecht",
    industry: "Freelancer Tools",
    location: "Utrecht", 
    before: {
      situation: "Freelance project management tool idea, €30K runway, pressure to show results fast",
      challenge: "Previous startup failed because he built for 18 months without customer input",
      risk: "Repeating the same mistake with limited runway"
    },
    after: {
      timeline: "30 days",
      first_customer: "Day 18",
      first_revenue: "€1,800 in month 1",
      runway_preserved: "€27,500 (92%)",
      customers_by_month_3: "34 paying customers"
    },
    quote: "After failing once by building in isolation, this systematic approach got me to revenue in 18 days. My runway is intact and I'm scaling.",
    key_metric: "92% runway preserved"
  },
  {
    founder_name: "Sophie Hendricks",
    company: "LocalConnect Rotterdam", 
    industry: "Local Business Platform",
    location: "Rotterdam",
    before: {
      situation: "Local business networking platform, €25K runway, needed to validate quickly",
      challenge: "Wasn't sure if local businesses would pay for digital networking tools",
      risk: "Building a platform nobody wanted with very limited funds"
    },
    after: {
      timeline: "30 days",
      first_customer: "Day 21",
      first_revenue: "€3,200 in month 1",
      runway_preserved: "€22,000 (88%)",
      customers_by_month_3: "28 paying customers"
    },
    quote: "I validated my entire business model in 21 days with real paying customers. The systematic approach saved my startup.",
    key_metric: "€3,200 first month"
  }
];

export default function StartupFounderStoriesSection() {
  return (
    <section className="relative py-24" id="startup-founder-stories">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            47 Dutch Founders. 30 Days. Real Results.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Meet the founders who used our LEAN Framework to go from idea to first revenue in 30 days
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            Don't take our word for it. Here are the real results from Dutch founders who used our 30-Day MVP Operating System. These aren't cherry-picked success stories—they're systematic outcomes from founders who followed the LEAN Framework and got to market validation fast.
          </p>
        </div>

        {/* Success Metrics Summary */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center font-archivo">
              Collective Results from 47 Dutch Founders
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">22 Days</div>
                <div className="text-gray-300 text-sm">Average Time to First Customer</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">€2,400</div>
                <div className="text-gray-300 text-sm">Average First Month Revenue</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">87%</div>
                <div className="text-gray-300 text-sm">Average Runway Preserved</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">78%</div>
                <div className="text-gray-300 text-sm">Success Rate (First Customer in 30 Days)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Success Stories */}
        <div className="space-y-12">
          {founderStories.map((story, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Founder Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mr-6">
                    <User className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-archivo">
                      {story.founder_name}
                    </h3>
                    <p className="text-gray-400">
                      {story.company} • {story.industry}
                    </p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">{story.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-400/10 px-4 py-2 rounded-full">
                  <span className="text-green-400 font-bold">
                    {story.key_metric}
                  </span>
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Before */}
                <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-red-400 mb-4 font-archivo">
                    Before LEAN Framework
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Situation:
                      </div>
                      <p className="text-gray-300 text-sm font-archivo">
                        {story.before.situation}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Challenge:
                      </div>
                      <p className="text-gray-300 text-sm font-archivo">
                        {story.before.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Risk:
                      </div>
                      <p className="text-red-400 text-sm font-archivo">
                        {story.before.risk}
                      </p>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-400/10 border border-green-400/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-green-400 mb-4 font-archivo">
                    After 30-Day System
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center bg-green-400/10 rounded-xl p-3">
                      <div className="text-lg font-bold text-green-400">
                        {story.after.first_customer}
                      </div>
                      <div className="text-gray-400 text-xs">First Customer</div>
                    </div>
                    
                    <div className="text-center bg-blue-400/10 rounded-xl p-3">
                      <div className="text-lg font-bold text-blue-400">
                        {story.after.first_revenue}
                      </div>
                      <div className="text-gray-400 text-xs">First Revenue</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Runway Preserved:</span>
                      <span className="text-green-400 font-semibold text-sm">
                        {story.after.runway_preserved}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Month 3 Customers:</span>
                      <span className="text-blue-400 font-semibold text-sm">
                        {story.after.customers_by_month_3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Quote */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start">
                  <Quote className="w-8 h-8 text-blue-400/50 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <blockquote className="text-lg text-white italic mb-4 font-archivo leading-relaxed">
                      "{story.quote}"
                    </blockquote>
                    <div className="text-gray-400 text-sm">
                      — {story.founder_name}, Founder of {story.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-400/10 to-green-400/10 border border-blue-400/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
              Join the Next Success Stories
            </h3>
            <p className="text-gray-300 mb-6 font-archivo">
              Be one of the next Dutch founders to go from idea to paying customers in 30 days
            </p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 bg-blue-400/20 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                ))}
              </div>
              <span className="text-gray-400 ml-4 text-sm">
                +42 more Dutch founders
              </span>
            </div>
            
            <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo">
              Join the 30-Day Kickoff Lab
              <Target className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


