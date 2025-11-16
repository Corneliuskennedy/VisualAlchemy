'use client';

import { Building2, Users, TrendingUp, Clock, CheckCircle, Quote, ArrowRight } from 'lucide-react';

interface ClientTransformation {
  company: string;
  industry: string;
  employees: number;
  revenue: string;
  before: {
    annual_waste: string;
    weekly_hours_lost: string;
    main_issues: string[];
  };
  after: {
    annual_savings: string;
    percentage_saved: string;
    hours_reclaimed: string;
    improvements: string[];
  };
  timeline: string;
  testimonial: string;
}

const clientTransformations: ClientTransformation[] = [
  {
    company: "Amsterdam Marketing Agency",
    industry: "Digital Marketing",
    employees: 15,
    revenue: "€2.1M annually",
    before: {
      annual_waste: "€85,000",
      weekly_hours_lost: "32 hours",
      main_issues: ["Manual client onboarding", "Disconnected reporting", "Duplicate data entry"]
    },
    after: {
      annual_savings: "€52,000",
      percentage_saved: "61%",
      hours_reclaimed: "24 hours/week",
      improvements: ["Automated client workflows", "Unified reporting dashboard", "40% staff productivity increase"]
    },
    timeline: "4 months",
    testimonial: "The transformation paid for itself in 3 months. We're now scaling without the operational headaches."
  },
  {
    company: "Utrecht Manufacturing",
    industry: "Manufacturing",
    employees: 28,
    revenue: "€4.8M annually", 
    before: {
      annual_waste: "€120,000",
      weekly_hours_lost: "45 hours",
      main_issues: ["Manual inventory tracking", "Disconnected quality systems", "Paper-based processes"]
    },
    after: {
      annual_savings: "€78,000", 
      percentage_saved: "65%",
      hours_reclaimed: "30 hours/week",
      improvements: ["Automated supply chain", "Real-time quality monitoring", "Digital process management"]
    },
    timeline: "6 months",
    testimonial: "We went from chaos to complete operational control. The ROI exceeded our projections by 40%."
  }
];

export default function SMEClientResultsSection() {
  const totalSavings = clientTransformations.reduce((sum, client) => {
    return sum + parseInt(client.after.annual_savings.replace(/[€,]/g, ''));
  }, 0);

  return (
    <section className="relative py-24" id="sme-client-results">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            Real Results from Real Dutch Businesses
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Before and after transformations showing exactly how we eliminate profit leaks and deliver ROI
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            Don't take our word for it. Here are the documented results from Dutch businesses just like yours. Every transformation is measured, verified, and guaranteed. These aren't cherry-picked success stories—they're the systematic outcomes of our proven methodology.
          </p>
        </div>

        {/* Total Impact Stats */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-green-400/10 border border-green-400/20 rounded-3xl px-8 py-6">
            <TrendingUp className="w-12 h-12 text-green-400 mr-4" />
            <div>
              <div className="text-4xl font-bold text-green-400 font-archivo">
                €{totalSavings.toLocaleString()}+
              </div>
              <div className="text-gray-300 font-medium">
                Combined Annual Savings (Just These 2 Cases)
              </div>
            </div>
          </div>
        </div>

        {/* Client Transformation Cases */}
        <div className="space-y-12">
          {clientTransformations.map((client, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Client Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mr-6">
                    <Building2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-archivo">
                      {client.company}
                    </h3>
                    <p className="text-gray-400">
                      {client.industry} • {client.employees} employees • {client.revenue}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-green-400/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium text-sm">
                    Completed in {client.timeline}
                  </span>
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Before */}
                <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-red-400 mb-4 font-archivo">
                    Before Transformation
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">
                        {client.before.annual_waste}
                      </div>
                      <div className="text-gray-400 text-sm">Annual Waste</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">
                        {client.before.weekly_hours_lost}
                      </div>
                      <div className="text-gray-400 text-sm">Hours Lost/Week</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Main Issues:
                    </div>
                    <ul className="space-y-2">
                      {client.before.main_issues.map((issue, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-400/10 border border-green-400/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-green-400 mb-4 font-archivo">
                    After Transformation
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {client.after.annual_savings}
                      </div>
                      <div className="text-gray-400 text-sm">Annual Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {client.after.hours_reclaimed}
                      </div>
                      <div className="text-gray-400 text-sm">Hours Reclaimed</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-center bg-green-400/20 rounded-xl p-3">
                      <div className="text-2xl font-bold text-green-400">
                        {client.after.percentage_saved}
                      </div>
                      <div className="text-gray-300 text-sm">Cost Reduction</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Key Improvements:
                    </div>
                    <ul className="space-y-2">
                      {client.after.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start">
                  <Quote className="w-8 h-8 text-blue-400/50 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <blockquote className="text-lg text-white italic mb-4 font-archivo leading-relaxed">
                      "{client.testimonial}"
                    </blockquote>
                    <div className="text-gray-400 text-sm">
                      — Leadership Team, {client.company}
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
            <h3 className="text-2xl font-bold text-white mb-4 font-archivo">
              Ready for Your Transformation?
            </h3>
            <p className="text-gray-300 mb-6 font-archivo">
              Join 200+ Dutch businesses that have eliminated operational chaos and unlocked systematic growth
            </p>
            
            <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo">
              Get Your Free Process Audit
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              See exactly where you're losing money and how much you could save
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}











