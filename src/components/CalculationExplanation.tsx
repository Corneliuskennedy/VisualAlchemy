import React from 'react';
import { Calculator, Clock, Euro, TrendingUp, CheckCircle } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';

export const CalculationExplanation: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();

  const calculationSteps = [
    {
      icon: Clock,
      title: isNL ? "Tijd Besparing" : "Time Savings",
      calculation: isNL ? "23 uur/week × 52 weken = 1.196 uur/jaar" : "23 hours/week × 52 weeks = 1,196 hours/year",
      description: isNL 
        ? "Gemiddelde Nederlandse bedrijf besteedt 23 uur per week aan repetitieve taken (CBS data 2024)"
        : "Average Dutch business spends 23 hours per week on repetitive tasks (CBS data 2024)"
    },
    {
      icon: Euro,
      title: isNL ? "Kosten Berekening" : "Cost Calculation",
      calculation: isNL ? "1.196 uur × €45/uur = €53.820" : "1,196 hours × €45/hour = €53,820",
      description: isNL 
        ? "Gemiddelde Nederlandse arbeidskosten €45/uur inclusief werkgeverslasten (Eurostat 2024)"
        : "Average Dutch labor costs €45/hour including employer contributions (Eurostat 2024)"
    },
    {
      icon: TrendingUp,
      title: isNL ? "Automatisering Impact" : "Automation Impact",
      calculation: isNL ? "€53.820 × 40-70% = €21.528 - €37.674" : "€53,820 × 40-70% = €21,528 - €37,674",
      description: isNL 
        ? "Conservatieve schatting: 40-70% van repetitieve taken kunnen worden geautomatiseerd"
        : "Conservative estimate: 40-70% of repetitive tasks can be automated"
    }
  ];

  const sources = [
    {
      source: "CBS (Centraal Bureau voor de Statistiek)",
      data: isNL ? "Tijdsbesteding Nederlandse bedrijven 2024" : "Time allocation Dutch businesses 2024",
      url: "https://www.cbs.nl"
    },
    {
      source: "Eurostat",
      data: isNL ? "Arbeidskosten EU 2024" : "EU Labor costs 2024", 
      url: "https://ec.europa.eu/eurostat"
    },
    {
      source: "McKinsey Global Institute",
      data: isNL ? "Automatisering potentieel studie" : "Automation potential study",
      url: "https://www.mckinsey.com"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none opacity-30" />
        </div>
      )}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2 mb-6">
            <Calculator className="w-4 h-4 text-[#4585f4]" />
            <span className="text-[#4585f4] font-medium text-sm">
              {isNL ? "Hoe Berekenen Wij Dit?" : "How Do We Calculate This?"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {isNL ? "€50.000+ Besparing Berekening" : "€50,000+ Savings Calculation"}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {isNL 
              ? "Transparante berekening gebaseerd op officiële Nederlandse data en conservatieve schattingen"
              : "Transparent calculation based on official Dutch data and conservative estimates"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {calculationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                <div className="w-16 h-16 bg-[#4585f4]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-[#4585f4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{step.title}</h3>
                <div className="bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-lg p-4 mb-4">
                  <p className="text-[#4585f4] font-mono text-lg text-center">{step.calculation}</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Key Assumptions */}
        <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            {isNL ? "Belangrijke Aannames" : "Key Assumptions"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">
                    {isNL ? "Conservatieve Schatting" : "Conservative Estimate"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isNL 
                      ? "We hanteren bewust lage percentages (40-70%) om realistische verwachtingen te stellen"
                      : "We deliberately use low percentages (40-70%) to set realistic expectations"
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">
                    {isNL ? "Bedrijfsgrootte" : "Company Size"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isNL 
                      ? "Berekening voor MKB bedrijven (10-250 medewerkers)"
                      : "Calculation for SME companies (10-250 employees)"
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">
                    {isNL ? "Implementatie Tijd" : "Implementation Time"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isNL 
                      ? "Volledige besparing bereikt binnen 6-12 maanden na implementatie"
                      : "Full savings achieved within 6-12 months after implementation"
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">
                    {isNL ? "Terugkerende Besparing" : "Recurring Savings"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isNL 
                      ? "Jaarlijkse besparing die zich herhaalt zolang automatisering actief is"
                      : "Annual savings that repeat as long as automation is active"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-6">
            {isNL ? "Data Bronnen" : "Data Sources"}
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {sources.map((source, index) => (
              <div key={index} className="text-center">
                <p className="text-white font-medium text-sm">{source.source}</p>
                <p className="text-gray-400 text-xs">{source.data}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-6 max-w-2xl mx-auto">
            {isNL 
              ? "Alle berekeningen zijn gebaseerd op publiek beschikbare data van officiële Nederlandse en Europese bronnen. Individuele resultaten kunnen variëren."
              : "All calculations are based on publicly available data from official Dutch and European sources. Individual results may vary."
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalculationExplanation;
