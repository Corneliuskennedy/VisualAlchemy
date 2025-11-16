'use client';

import { Calendar, Clock, Euro, Target, CheckCircle, Users, AlertCircle, Gift, ArrowRight, Shield } from 'lucide-react';

interface AuditDeliverable {
  title: string;
  description: string;
  value: string;
}

const auditDeliverables: AuditDeliverable[] = [
  {
    title: "Profit Leak Analysis",
    description: "We'll identify exactly where you're losing money - down to the euro",
    value: "€2,000 value"
  },
  {
    title: "Custom ROI Projections", 
    description: "Specific savings calculations based on your actual processes",
    value: "€1,500 value"
  },
  {
    title: "Optimization Roadmap",
    description: "Priority-ranked action plan for maximum impact improvements",
    value: "€1,000 value"
  },
  {
    title: "Implementation Proposal",
    description: "No-obligation proposal with timeline and investment details",
    value: "€500 value"
  }
];

const idealFor = [
  "€500K+ annual revenue businesses",
  "5+ employees with operational complexity", 
  "Business owners ready to invest in systematic improvement",
  "Companies tired of manual processes and inefficiency"
];

export default function SMEAuditConversionSection() {
  return (
    <section className="relative py-24" id="sme-audit-conversion">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            Get Your Free €67,560 Profit Leak Analysis
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Limited to 5 businesses per month. Book your spot before your competitors do.
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            You've seen the methodology. You've seen the results. Now see exactly how much money your business is losing and how much you could save. Our Free Process Audit gives you the same analysis we charge €5,000 for - completely free. We'll map your current processes, identify profit leaks, and show you specific savings opportunities. The only catch? We can only do 5 per month.
          </p>
        </div>

        {/* Value Proposition Hero */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 border-2 border-green-400/30 rounded-3xl p-12 text-center">
            <Gift className="w-20 h-20 text-green-400 mx-auto mb-6" />
            
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-red-400 line-through mr-4">€5,000</span>
                <ArrowRight className="w-8 h-8 text-gray-400 mr-4" />
                <span className="text-6xl font-bold text-green-400">FREE</span>
              </div>
              <p className="text-xl text-gray-300 font-archivo">
                Complete 60-Minute Process Audit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">60 Minutes</div>
                <div className="text-gray-400 text-sm">Your time investment</div>
              </div>
              
              <div className="text-center">
                <Euro className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">€5,000 Value</div>
                <div className="text-gray-400 text-sm">Completely free</div>
              </div>
              
              <div className="text-center">
                <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">Custom Analysis</div>
                <div className="text-gray-400 text-sm">Your specific business</div>
              </div>
              
              <div className="text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">No Obligation</div>
                <div className="text-gray-400 text-sm">Zero pressure</div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 font-archivo">
              Book Your Free Audit Now
              <Calendar className="w-6 h-6 ml-3 inline" />
            </button>
          </div>
        </div>

        {/* What You Get */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            What You Get (€5,000 Value, Completely Free)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {auditDeliverables.map((deliverable, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-white font-archivo flex-1">
                    {deliverable.title}
                  </h4>
                  <span className="text-green-400 font-bold text-sm bg-green-400/10 px-3 py-1 rounded-full ml-4">
                    {deliverable.value}
                  </span>
                </div>
                <p className="text-gray-300 font-archivo leading-relaxed">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scarcity & Urgency */}
        <div className="mb-16">
          <div className="bg-red-400/10 border border-red-400/20 rounded-3xl p-8">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-400 mr-4" />
              <div>
                <h3 className="text-2xl font-bold text-red-400 font-archivo">
                  Limited Availability
                </h3>
                <p className="text-gray-300">Only 5 audits available per month</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">5</div>
                <div className="text-gray-300 text-sm">Audits per month</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">8+</div>
                <div className="text-gray-300 text-sm">Hours per audit</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
                <div className="text-gray-300 text-sm">On waiting list</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-300 font-archivo">
                <strong>Why so few?</strong> Each audit requires 8+ hours of our senior consultant time. 
                We'd rather do fewer audits properly than rush through more.
              </p>
            </div>
          </div>
        </div>

        {/* Ideal For */}
        <div className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center font-archivo">
              This Free Audit Is Perfect For:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {idealFor.map((criteria, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-400/10 to-green-400/10 border border-blue-400/20 rounded-3xl p-12">
            <h3 className="text-4xl font-bold text-white mb-6 font-archivo">
              Stop Losing €67,560 Every Year
            </h3>
            <p className="text-xl text-gray-300 mb-8 font-archivo">
              Book your free audit today and see exactly where your money is going
            </p>
            
            <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 font-archivo mb-6">
              Schedule Free Audit (5 Slots Remaining)
              <Calendar className="w-6 h-6 ml-3 inline" />
            </button>
            
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              <span>No obligation • No sales pressure • Just pure value</span>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm font-archivo">
                <strong>Next available slots:</strong> This month | 
                <strong> Waiting list for next month:</strong> 12 businesses
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}











