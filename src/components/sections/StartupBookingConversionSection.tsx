'use client';

import { Calendar, Users, Clock, Shield, AlertCircle, CheckCircle, CreditCard, ArrowRight, Zap, Target, Euro } from 'lucide-react';

interface PaymentOption {
  option: string;
  price: string;
  total?: string;
  savings?: string;
  description: string;
}

interface NextStep {
  step: string;
  action: string;
  description: string;
}

const paymentOptions: PaymentOption[] = [
  {
    option: "Full Payment",
    price: "€1,497",
    savings: "Best value",
    description: "One-time payment, immediate access to everything"
  },
  {
    option: "2-Payment Plan", 
    price: "€798 x 2",
    total: "€1,596",
    description: "€798 today, €798 in 30 days"
  }
];

const nextSteps: NextStep[] = [
  {
    step: "1",
    action: "Secure Your Spot",
    description: "Complete payment and receive immediate access to the founder community"
  },
  {
    step: "2", 
    action: "Pre-Work Package",
    description: "Get your pre-work materials 48 hours before cohort starts"
  },
  {
    step: "3",
    action: "Cohort Kickoff",
    description: "Meet your cohort and begin Week 1: Customer Discovery"
  },
  {
    step: "4",
    action: "30-Day Execution",
    description: "Follow the proven LEAN Framework with daily support"
  }
];

const urgencyElements = [
  "Next cohort starts in 7 days",
  "Only 5 spots remaining (of 12 total)",
  "23 founders already on waiting list for following month",
  "Price increases to €1,997 after this cohort"
];

export default function StartupBookingConversionSection() {
  return (
    <section className="relative py-24" id="startup-booking-conversion">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
            Secure Your Spot: Next Cohort Starts in 7 Days
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed font-archivo mb-8">
            Only 12 spots available per cohort. Join 47 Dutch founders who chose speed over perfection.
          </p>
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-archivo">
            You've seen the methodology. You've seen the results. You know the cost of waiting another 18 months. The next cohort of the 30-Day Startup Kickoff Lab starts in 7 days, and we only accept 12 founders to ensure everyone gets the attention they need to succeed. Don't let another month pass burning runway on the wrong approach.
          </p>
        </div>

        {/* Scarcity Alert */}
        <div className="mb-16">
          <div className="bg-red-400/10 border border-red-400/20 rounded-3xl p-8">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-400 mr-4" />
              <div>
                <h3 className="text-2xl font-bold text-red-400 font-archivo">
                  Limited Availability Alert
                </h3>
                <p className="text-gray-300">Cohort size limited for maximum results</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">5</div>
                <div className="text-gray-300 text-sm">Spots Remaining</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">7</div>
                <div className="text-gray-300 text-sm">Days Until Start</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
                <div className="text-gray-300 text-sm">Maximum Cohort Size</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">23</div>
                <div className="text-gray-300 text-sm">On Waiting List</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Options */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            Choose Your Payment Option
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentOptions.map((option, index) => (
              <div
                key={index}
                className={`relative bg-white/5 border border-white/10 rounded-3xl p-8 ${
                  index === 0 ? 'ring-2 ring-green-400/50' : ''
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-4 font-archivo">
                    {option.option}
                  </h4>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {option.price}
                    </div>
                    {option.total && (
                      <div className="text-gray-400 text-sm">
                        Total: {option.total}
                      </div>
                    )}
                    {option.savings && (
                      <div className="text-green-400 text-sm font-semibold">
                        {option.savings}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm font-archivo mb-6">
                    {option.description}
                  </p>
                  
                  <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 font-archivo ${
                    index === 0 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-400/25' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    <CreditCard className="w-5 h-5 mr-2 inline" />
                    {index === 0 ? 'Secure Your Spot Now' : 'Choose Payment Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Money-Back Guarantee */}
        <div className="mb-16">
          <div className="bg-green-400/10 border border-green-400/20 rounded-3xl p-8 text-center">
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-archivo">
              First Customer Interview Guarantee
            </h3>
            <p className="text-xl text-gray-300 mb-4 font-archivo">
              If you don't complete your first customer interview in Week 1, get 100% refund
            </p>
            <p className="text-gray-400 font-archivo">
              Plus keep all materials and community access
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-archivo">
            What Happens After You Join
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 font-archivo">
                  {step.action}
                </h4>
                
                <p className="text-gray-300 text-sm font-archivo">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Urgency */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-400/10 to-orange-400/10 border border-red-400/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-archivo">
              Final Notice: Time Is Running Out
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgencyElements.map((element, index) => (
                <div key={index} className="flex items-center">
                  <Clock className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 font-archivo">{element}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-400/10 to-green-400/10 border border-blue-400/20 rounded-3xl p-12">
            <Zap className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            
            <h3 className="text-4xl font-bold text-white mb-6 font-archivo">
              Stop Burning Runway. Start Building Revenue.
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 font-archivo">
              Join the 30-Day Startup Kickoff Lab and go from idea to paying customers in 30 days
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 font-archivo">
                Secure Your Spot Now - €1,497
                <ArrowRight className="w-6 h-6 ml-3 inline" />
              </button>
              
              <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 font-archivo">
                Payment Plan - €798 x 2
                <CreditCard className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
            
            <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
              <Shield className="w-4 h-4 mr-2" />
              <span>30-day money-back guarantee • Secure payment • Join 47 successful founders</span>
            </div>
            
            <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-4 inline-block">
              <p className="text-red-400 font-bold text-sm">
                ⚠️ Only 5 spots left • Cohort starts in 7 days • Next availability: 4 weeks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

