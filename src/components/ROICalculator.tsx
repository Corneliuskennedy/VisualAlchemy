import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, Zap, Download, Mail } from 'lucide-react';
import { Button } from './ui/button';
import useLanguage from '@/contexts/LanguageContext';

interface ROICalculation {
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number;
  roiPercentage: number;
  hoursSavedAnnually: number;
  costPerHour: number;
  implementationCost: number;
  monthlyOperatingCost: number;
}

interface ROIInputs {
  hoursPerWeek: number;
  hourlyWage: number;
  implementationCost: number;
  monthlyOperatingCost: number;
  processName: string;
  email: string;
}

const ROICalculator: React.FC = () => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  
  const [inputs, setInputs] = useState<ROIInputs>({
    hoursPerWeek: 10,
    hourlyWage: 35,
    implementationCost: 5000,
    monthlyOperatingCost: 200,
    processName: '',
    email: ''
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const calculateROI = (): ROICalculation => {
      const hoursSavedAnnually = inputs.hoursPerWeek * 52;
      const costPerHour = inputs.hourlyWage * 1.3; // Including benefits/overhead
      const annualSavings = hoursSavedAnnually * costPerHour;
      const monthlySavings = annualSavings / 12;
      const totalFirstYearCost = inputs.implementationCost + (inputs.monthlyOperatingCost * 12);
      const paybackPeriod = totalFirstYearCost / monthlySavings;
      const roiPercentage = ((annualSavings - (inputs.monthlyOperatingCost * 12)) / inputs.implementationCost) * 100;

      return {
        monthlySavings,
        annualSavings,
        paybackPeriod,
        roiPercentage,
        hoursSavedAnnually,
        costPerHour,
        implementationCost: inputs.implementationCost,
        monthlyOperatingCost: inputs.monthlyOperatingCost
      };
    };

    setCalculation(calculateROI());
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    setShowResults(true);
    
    // Track calculator usage
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roi_calculator_used', {
        event_category: 'engagement',
        event_label: 'automation_roi_calculator',
        value: calculation?.roiPercentage || 0
      });
    }
  };

  const handleEmailSubmit = async () => {
    if (!inputs.email || !calculation) return;

    // Here you would typically send the email to your backend
    // For now, we'll just simulate success
    setEmailSubmitted(true);
    
    // Track email submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roi_report_requested', {
        event_category: 'conversion',
        event_label: 'roi_calculator_email',
        value: calculation.roiPercentage
      });
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(isNL ? 'nl-NL' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(0)}%`;
  };

  const formatMonths = (months: number): string => {
    if (months < 1) {
      const weeks = Math.round(months * 4.33);
      return isNL ? `${weeks} weken` : `${weeks} weeks`;
    }
    return isNL ? `${months.toFixed(1)} maanden` : `${months.toFixed(1)} months`;
  };

  // Tool Schema for SEO
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isNL ? "Automatisering ROI Calculator" : "Automation ROI Calculator",
    "description": isNL 
      ? "Bereken de ROI van uw automatiseringsproject in 3 minuten. Gratis tool van Octomatic."
      : "Calculate the ROI of your automation project in 3 minutes. Free tool by Octomatic.",
    "url": "https://www.octomatic.ai/tools/automation-roi-calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "creator": {
      "@type": "Organization",
      "name": "Octomatic",
      "url": "https://www.octomatic.ai"
    },
    "featureList": [
      "ROI Calculation",
      "Payback Period Analysis", 
      "Cost Savings Projection",
      "Detailed ROI Report"
    ]
  };

  useEffect(() => {
    // Add Tool schema to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(toolSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isNL]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isNL ? 'Automatisering ROI Calculator' : 'Automation ROI Calculator'}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isNL 
            ? 'Bereken de ROI van uw automatiseringsproject in 3 minuten. Ontdek hoeveel u kunt besparen.'
            : 'Calculate the ROI of your automation project in 3 minutes. Discover how much you can save.'
          }
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {isNL ? 'Uw Proces Details' : 'Your Process Details'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNL ? 'Proces naam (optioneel)' : 'Process name (optional)'}
            </label>
            <input
              type="text"
              value={inputs.processName}
              onChange={(e) => handleInputChange('processName', e.target.value)}
              placeholder={isNL ? 'bijv. Factuurverwerking' : 'e.g. Invoice processing'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNL ? 'Uren per week besteed aan dit proces' : 'Hours per week spent on this process'}
            </label>
            <input
              type="number"
              value={inputs.hoursPerWeek}
              onChange={(e) => handleInputChange('hoursPerWeek', parseFloat(e.target.value) || 0)}
              min="0.5"
              step="0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {isNL ? 'Inclusief alle betrokken medewerkers' : 'Including all involved employees'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNL ? 'Gemiddeld uurloon (€)' : 'Average hourly wage (€)'}
            </label>
            <input
              type="number"
              value={inputs.hourlyWage}
              onChange={(e) => handleInputChange('hourlyWage', parseFloat(e.target.value) || 0)}
              min="15"
              step="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {isNL ? 'Exclusief werkgeverslasten (worden automatisch toegevoegd)' : 'Excluding employer costs (added automatically)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNL ? 'Eenmalige implementatiekosten (€)' : 'One-time implementation cost (€)'}
            </label>
            <input
              type="number"
              value={inputs.implementationCost}
              onChange={(e) => handleInputChange('implementationCost', parseFloat(e.target.value) || 0)}
              min="1000"
              step="500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {isNL ? 'Ontwikkeling, setup en training' : 'Development, setup and training'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNL ? 'Maandelijkse operationele kosten (€)' : 'Monthly operating costs (€)'}
            </label>
            <input
              type="number"
              value={inputs.monthlyOperatingCost}
              onChange={(e) => handleInputChange('monthlyOperatingCost', parseFloat(e.target.value) || 0)}
              min="0"
              step="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {isNL ? 'Software licenties, hosting, onderhoud' : 'Software licenses, hosting, maintenance'}
            </p>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            {isNL ? 'Bereken ROI' : 'Calculate ROI'}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {showResults && calculation ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isNL ? 'Uw ROI Resultaten' : 'Your ROI Results'}
              </h3>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPercentage(calculation.roiPercentage)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isNL ? 'ROI Jaar 1' : 'Year 1 ROI'}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatMonths(calculation.paybackPeriod)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isNL ? 'Terugverdientijd' : 'Payback Period'}
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(calculation.monthlySavings)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isNL ? 'Maandelijkse Besparing' : 'Monthly Savings'}
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-orange-600 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(calculation.annualSavings)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isNL ? 'Jaarlijkse Besparing' : 'Annual Savings'}
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {isNL ? 'Gedetailleerde Berekening' : 'Detailed Calculation'}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {isNL ? 'Uren bespaard per jaar:' : 'Hours saved annually:'}
                    </span>
                    <span className="font-medium">{calculation.hoursSavedAnnually.toFixed(0)} {isNL ? 'uren' : 'hours'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {isNL ? 'Kosten per uur (incl. overhead):' : 'Cost per hour (incl. overhead):'}
                    </span>
                    <span className="font-medium">{formatCurrency(calculation.costPerHour)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {isNL ? 'Jaarlijkse operationele kosten:' : 'Annual operating costs:'}
                    </span>
                    <span className="font-medium">{formatCurrency(calculation.monthlyOperatingCost * 12)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span className="text-gray-900">
                      {isNL ? 'Netto jaarlijkse besparing:' : 'Net annual savings:'}
                    </span>
                    <span className="text-green-600">
                      {formatCurrency(calculation.annualSavings - (calculation.monthlyOperatingCost * 12))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Collection */}
              {!emailSubmitted ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isNL ? 'Ontvang Uw Gedetailleerde ROI Rapport' : 'Get Your Detailed ROI Report'}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {isNL 
                      ? 'Krijg een uitgebreid rapport met implementatie roadmap en best practices.'
                      : 'Get a comprehensive report with implementation roadmap and best practices.'
                    }
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={inputs.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={isNL ? 'uw.email@bedrijf.nl' : 'your.email@company.com'}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleEmailSubmit}
                      disabled={!inputs.email}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      {isNL ? 'Verstuur' : 'Send'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 mb-2">
                    <Mail className="w-8 h-8 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    {isNL ? 'Rapport Verzonden!' : 'Report Sent!'}
                  </h4>
                  <p className="text-sm text-green-700">
                    {isNL 
                      ? 'Uw gedetailleerde ROI rapport is verzonden naar uw email. Check ook uw spam folder.'
                      : 'Your detailed ROI report has been sent to your email. Please check your spam folder too.'
                    }
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center pt-4">
                <Button
                  onClick={() => window.location.href = '/get-started'}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  {isNL ? 'Plan Gratis ROI Consultatie' : 'Book Free ROI Consultation'}
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  {isNL 
                    ? 'Bespreek uw resultaten met een automatisering expert'
                    : 'Discuss your results with an automation expert'
                  }
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {isNL 
                  ? 'Vul de gegevens in om uw ROI te berekenen'
                  : 'Fill in the details to calculate your ROI'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {isNL 
            ? 'Deze calculator geeft een indicatie van mogelijke besparingen. Werkelijke resultaten kunnen variëren afhankelijk van implementatie en proces complexiteit.'
            : 'This calculator provides an indication of potential savings. Actual results may vary depending on implementation and process complexity.'
          }
        </p>
      </div>
    </div>
  );
};

export default ROICalculator; 