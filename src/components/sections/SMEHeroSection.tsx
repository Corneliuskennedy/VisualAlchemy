'use client';

import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

interface ROICalculation {
  monthlyRevenue: number;
  employees: number;
  annualSavings: number;
  monthlySavings: number;
  timeReclaimed: number;
}

export default function SMEHeroSection() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>('');
  const [employees, setEmployees] = useState<string>('');
  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const calculateROI = () => {
    const revenue = parseFloat(monthlyRevenue) || 0;
    const employeeCount = parseInt(employees) || 0;
    
    // ROI calculation logic based on industry benchmarks
    const baseInefficiency = revenue * 0.15; // 15% of revenue lost to inefficiency
    const employeeCost = employeeCount * 850; // €850 per employee monthly waste
    const monthlySavings = baseInefficiency + employeeCost;
    const annualSavings = monthlySavings * 12;
    const timeReclaimed = employeeCount * 5; // 5 hours per employee per week
    
    setCalculation({
      monthlyRevenue: revenue,
      employees: employeeCount,
      annualSavings,
      monthlySavings,
      timeReclaimed
    });
  };

  return (
    <section className="relative min-h-screen flex items-center py-24" id="sme-hero">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div>
            {/* Kicker */}
            <div className="inline-flex items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 mb-8">
              <DollarSign className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 font-medium text-sm uppercase tracking-wider font-archivo">
                ROI Guaranteed
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight font-archivo">
              Save €50,000+ Annually Through Smart Automation
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-archivo max-w-2xl">
              Dutch businesses lose an average of €67,560 annually to manual processes. Calculate your savings potential in 60 seconds.
            </p>

            {/* Body Copy */}
            <p className="text-lg text-gray-400 mb-12 leading-relaxed font-archivo max-w-2xl">
              Your business is successful, but your operations are bleeding money. Every manual process, disconnected system, and inefficient workflow is costing you thousands of euros annually. While your competitors struggle with the same chaos, smart Dutch businesses are building systematic operating systems that run themselves.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => setShowCalculator(true)}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo flex items-center justify-center"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your Savings
              </button>
              
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 font-archivo">
                Book Free Audit
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">200+</div>
                <div className="text-gray-400 text-sm">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">€12M+</div>
                <div className="text-gray-400 text-sm">Client Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">98%</div>
                <div className="text-gray-400 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - ROI Calculator */}
          <div className="lg:pl-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="text-center mb-8">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 font-archivo">
                  ROI Calculator
                </h3>
                <p className="text-gray-400 font-archivo">
                  See your potential savings in 60 seconds
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-white font-medium mb-3 block font-archivo">
                    Monthly Revenue
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                    <input 
                      type="number" 
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(e.target.value)}
                      placeholder="25,000"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-4 text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-3 block font-archivo">
                    Number of Employees
                  </label>
                  <input 
                    type="number" 
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    placeholder="8"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none transition-colors"
                  />
                </div>

                <button 
                  onClick={calculateROI}
                  disabled={!monthlyRevenue || !employees}
                  className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 font-archivo disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate My Savings
                </button>

                {/* Results */}
                {calculation && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20 rounded-2xl">
                    <h4 className="text-white font-semibold mb-4 font-archivo">Your Savings Potential:</h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-4 bg-white/10 rounded-xl">
                        <div className="text-3xl font-bold text-green-400">
                          €{calculation.annualSavings.toLocaleString()}
                        </div>
                        <div className="text-gray-300 text-sm">Annual Savings</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/5 rounded-xl">
                          <div className="text-xl font-bold text-blue-400">
                            €{calculation.monthlySavings.toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-xs">Per Month</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-xl">
                          <div className="text-xl font-bold text-yellow-400">
                            {calculation.timeReclaimed}h
                          </div>
                          <div className="text-gray-400 text-xs">Per Week</div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-green-400 text-black py-3 rounded-xl font-semibold hover:bg-green-300 transition-colors font-archivo">
                      Book Free Audit to Unlock These Savings
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
