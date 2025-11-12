'use client';

import { Quote, Star, TrendingUp } from 'lucide-react';

interface TrustIndicator {
  metric: string;
  label: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    metric: "200+",
    label: "Dutch Companies Transformed"
  },
  {
    metric: "€12M+", 
    label: "Total Client Savings"
  },
  {
    metric: "98%",
    label: "Client Satisfaction Rate"
  }
];

const companyLogos = [
  "TechFlow Amsterdam",
  "EcoLogistics Utrecht", 
  "Amsterdam Marketing Co",
  "Utrecht Manufacturing",
  "Dutch Innovation Labs",
  "Naarden Business Solutions"
];

export default function SocialProofBridgeSection() {
  return (
    <section className="relative py-16" id="social-proof-bridge">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header - Minimal */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-archivo">
            Trusted by 200+ Dutch Companies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-archivo">
            From Amsterdam startups to Utrecht enterprises, businesses trust Octomatic to transform their operations
          </p>
        </div>

        {/* Featured Testimonial - Hero Quote */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-card/50 border border-border rounded-3xl p-8 md:p-12 text-center">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6">
              <Quote className="w-8 h-8 text-blue-400/30" />
            </div>
            
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white font-normal leading-relaxed mb-8 font-archivo">
              "Octomatic saved us over €50,000 in our first year and gave us back 20 hours per week. Our operations finally work as smoothly as our vision."
            </blockquote>
            
            {/* Attribution */}
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold font-archivo">Sarah de Vries</div>
                <div className="text-gray-400 text-sm">CEO & Founder, TechFlow Amsterdam</div>
              </div>
              <div className="ml-6 px-3 py-1 bg-green-400/10 rounded-full">
                <span className="text-green-400 font-medium text-sm">€50,000 saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Compact */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 font-archivo">
                {indicator.metric}
              </div>
              <div className="text-gray-400 text-sm font-medium font-archivo">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos - Subtle */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-wider font-medium">
            Trusted by Dutch businesses including
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {companyLogos.map((company, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-gray-400 text-xs font-medium font-archivo">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Bottom Accent */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-400/10 border border-green-400/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            <span className="text-green-400 font-medium text-sm uppercase tracking-wider font-archivo">
              Proven Results Since 2019
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}








