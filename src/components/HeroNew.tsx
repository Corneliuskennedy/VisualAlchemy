'use client';

import React, { useCallback } from "react";
import { ShinyButton, ShinySecondaryButton } from "./ui/shiny-button";
import "@/styles/shiny-button.css";
import { useTranslations } from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { Rocket, Building2, CheckCircle } from "lucide-react";
import PriorityContent from "./PriorityContent";
import { SGESummary } from './SGESummary';
import { AudienceSelector } from './AudienceSelector';
import { AudienceToggle } from './AudienceToggle';
import { useAudienceSegmentation, trackCTAClick } from '@/hooks/useAudienceSegmentation';

// Pre-define button styles to avoid runtime style calculations
const PRIMARY_BUTTON_STYLES = `
  min-w-[200px] sm:min-w-[240px]
  px-5 sm:px-7 py-2.5 sm:py-3.5
  rounded-full
  bg-primary hover:bg-primary/90 text-primary-foreground
  font-medium
  text-sm sm:text-base
  transition-all duration-300
`;

const SECONDARY_BUTTON_STYLES = `
  min-w-[200px] sm:min-w-[240px]
  px-5 sm:px-7 py-2.5 sm:py-3.5
  rounded-full
  bg-background text-foreground
  border border-primary/70
  font-medium
  text-sm sm:text-base
  transition-all duration-300
  hover:shadow-[0_0_20px_-5px_rgba(69,133,244,0.4)]
  hover:border-primary
  hover:text-primary
`;

const MobileButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-label="Book your consultation"
    className={`
      ${PRIMARY_BUTTON_STYLES} 
      active:translate-y-[1px]
    `}
  >
    {children}
  </button>
);

const MobileSecondaryButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-label="Learn more about our services"
    className={`
      min-w-[200px] sm:min-w-[240px]
      px-5 sm:px-7 py-2.5 sm:py-3.5
      rounded-full
      bg-background text-foreground
      border border-primary/70
      font-medium
      text-sm sm:text-base
      transition-all duration-300
      hover:shadow-[0_0_15px_-5px_rgba(69,133,244,0.4)]
      hover:border-primary
      hover:text-primary
      active:translate-y-[1px]
    `}
  >
    {children}
  </button>
);

const Hero = () => {
  const { language } = useTranslations();
  const router = useRouter();
  const { audience, setAudience, isFirstVisit, switchAudience } = useAudienceSegmentation();
  const isNL = language === 'nl';
  
  // No flash - always render GridBackground but control interactivity

  // Navigation handlers
  const handleChatClick = useCallback(() => {
    const calLink = audience === 'startup' 
      ? 'kennet-timmers/workshop' 
      : 'kennet-timmers/intro-call';
    
    if (typeof window !== 'undefined') {
      const calElement = document.querySelector(`[data-cal-link="${calLink}"]`);
      if (calElement) {
        (calElement as HTMLElement).click();
      }
    }
  }, [audience]);

  const handleSecondaryClick = useCallback(() => {
    if (audience === 'startup') {
      router.push('/services/startup-kickoff-lab');
    } else {
      router.push('/tools/automation-roi-calculator');
    }
  }, [audience, router]);

  // Dynamic content based on audience
  const getHeroContent = () => {
    if (!audience) return null;

    const content = {
      startup: {
        kicker: isNL ? 'STARTUP KICKOFF LAB' : 'STARTUP KICKOFF LAB',
        title: isNL ? 'Van idee naar betalende klanten' : 'From Idea to Paying Customers',
        title2: isNL ? 'in 30 dagen' : 'in 30 Days',
        subtitle: isNL 
          ? 'Wij bouwen je MVP en operationele fundament tegelijk, zodat jij je kunt focussen op groei.'
          : 'We build your MVP and operational foundation together, so you focus on growth.',
        primaryCTA: isNL ? 'Solliciteer voor Kickoff Lab' : 'Apply for Kickoff Lab',
        secondaryCTA: isNL ? 'Bekijk Success Stories' : 'View Success Stories',
        valueProps: [
          isNL ? 'Beperkt tot 3 startups/maand' : 'Limited to 3 startups/month',
          isNL ? '30-dagen MVP garantie' : '30-day MVP guarantee', 
          isNL ? 'Founder-to-founder begeleiding' : 'Founder-to-founder guidance'
        ],
        icon: Rocket,
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        accentColor: 'text-orange-400'
      },
      sme: {
        kicker: isNL ? 'BUSINESS OPERATING SYSTEM' : 'BUSINESS OPERATING SYSTEM',
        title: isNL ? 'Bespaar €50.000+ per jaar' : 'Save €50,000+ Annually',
        title2: isNL ? 'met slimme automatisering' : 'with Smart Automation',
        subtitle: isNL
          ? 'Wij transformeren je handmatige processen systematisch naar geautomatiseerde workflows met gegarandeerde ROI.'
          : 'We systematically transform your manual processes into automated workflows with guaranteed ROI.',
        primaryCTA: isNL ? 'Plan Gratis Proces Audit' : 'Schedule Free Process Audit',
        secondaryCTA: isNL ? 'Bekijk ROI Calculator' : 'View ROI Calculator',
        valueProps: [
          isNL ? 'Beperkt tot 5 bedrijven/maand' : 'Limited to 5 businesses/month',
          isNL ? '40-70% kostenreductie' : '40-70% cost reduction',
          isNL ? 'Lokale ondersteuning Naarden' : 'Local support from Naarden'
        ],
        icon: Building2,
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        accentColor: 'text-blue-400'
      }
    };

    return content[audience];
  };

  const heroContent = getHeroContent();

  return (
    <section
      className="relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden"
      aria-label="Hero section"
      id="hero"
    >
      {/* Using global scroll-based night sky background - no local background needed */}
      
      <div className="relative z-10 w-full h-full flex items-center justify-center py-4">
        <div className="mx-auto px-6 max-w-6xl w-full">
          {/* Remove audience toggle - keeping hero universal */}

          {/* CONVERSION-OPTIMIZED HERO */}
          <div className="flex flex-col justify-center space-y-8 text-center">
            {/* Attention-Grabbing Kicker */}
            <div className="inline-flex items-center justify-center mx-auto px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider font-archivo">
                🚨 {isNL ? 'WAARSCHUWING: €67.560 JAARLIJKS VERLIES' : 'WARNING: €67,560 ANNUAL LOSS'}
              </span>
            </div>

            <div className="space-y-6">
              {/* Power Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight tracking-tight font-archivo">
                {isNL ? 'Stop Geld Verliezen aan' : 'Stop Losing Money to'}
                <span className="block text-transparent bg-gradient-to-r from-[#4585f4] via-[#6B8AE6] to-[#8B9AE8] bg-clip-text drop-shadow-[0_4px_12px_rgba(69,133,244,0.3)]">
                  {isNL ? 'Operationele Chaos' : 'Operational Chaos'}
                </span>
              </h1>

              {/* Benefit-Driven Subheadline */}
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-archivo font-medium">
                {isNL 
                  ? 'Krijg €50.000+ terug, win 20+ uur per week, en schaal zonder stress in slechts 30 dagen'
                  : 'Get €50,000+ back, reclaim 20+ hours per week, and scale without stress in just 30 days'
                }
              </p>

              {/* Social Proof Snippet */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-900"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-gray-900"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-gray-900"></div>
                  </div>
                  <span className="font-medium">200+ Dutch companies transformed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="font-medium">98% satisfaction</span>
                </div>
              </div>
            </div>

            {/* Dual CTA Strategy */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              {/* Primary CTA */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-[#6B8AE6] text-primary-foreground font-bold text-lg rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-archivo">
                <span className="relative z-10">
                  {isNL ? '🚀 Claim Je Gratis Analyse (€2.500 waarde)' : '🚀 Claim Your Free Analysis (€2,500 value)'}
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </button>

              {/* Secondary CTA */}
              <button className="px-6 py-3 border-2 border-muted text-muted-foreground hover:text-foreground hover:border-border font-semibold rounded-xl transition-all duration-300 font-archivo">
                {isNL ? '📊 Bekijk Resultaten (2 min)' : '📊 See Results (2 min)'}
              </button>
            </div>

            {/* Risk Reversal */}
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mt-4">
              <span>✅ {isNL ? 'Geen verplichtingen' : 'No obligations'}</span>
              <span>✅ {isNL ? 'ROI gegarandeerd' : 'ROI guaranteed'}</span>
              <span>✅ {isNL ? 'Resultaat in 30 dagen' : 'Results in 30 days'}</span>
            </div>
          </div>

          {/* Audience-specific content removed - keeping it universal */}
        </div>
      </div>

      {/* Priority Content for SEO */}
      <PriorityContent priority="high" id="hero-content">
        <div className="sr-only">
          <h1>AI Automation Services - Octomatic</h1>
          <p>Professional automation solutions for startups and established businesses</p>
        </div>
      </PriorityContent>
      
      {/* SGE Summary for AI Overviews */}
      <SGESummary 
        summary="Octomatic provides boutique AI automation services for Dutch businesses, offering both startup incubation through our Kickoff Lab and established business process automation with guaranteed ROI."
        bullets={[
          "30-day MVP development for startups",
          "€50,000+ annual savings for SMEs", 
          "Founder-led approach with local support",
          "Limited client capacity for maximum attention"
        ]}
        variant="hidden"
      />
    </section>
  );
};

export default Hero;
