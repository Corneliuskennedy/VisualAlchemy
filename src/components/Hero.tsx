'use client';

import React, { useCallback, useState, useEffect } from "react";
import { ShinyButton, ShinySecondaryButton } from "./ui/shiny-button";
import "@/styles/shiny-button.css";
import { useTranslations } from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { Timer, Rocket, Building2, CheckCircle } from "lucide-react";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import PriorityContent from "./PriorityContent";
import GridBackground from "./ui/GridBackground";
import { SGESummary } from './SGESummary';
import { AudienceSelector } from './AudienceSelector';
import { AudienceToggle } from './AudienceToggle';
import { useAudienceSegmentation, trackCTAClick } from '@/hooks/useAudienceSegmentation';

// Pre-define button styles to avoid runtime style calculations
const PRIMARY_BUTTON_STYLES = `
  min-w-[200px] sm:min-w-[240px]
  px-5 sm:px-7 py-2.5 sm:py-3.5
  rounded-full
  bg-[#324c9e] hover:bg-[#324c9e]/90 text-white
  font-medium
  text-sm sm:text-base
  transition-all duration-300
`;

const SECONDARY_BUTTON_STYLES = `
  min-w-[200px] sm:min-w-[240px]
  px-5 sm:px-7 py-2.5 sm:py-3.5
  rounded-full
  bg-[#0A0A0A] text-white
  border border-[#324c9e]/70
  font-medium
  text-sm sm:text-base
  transition-all duration-300
  hover:shadow-[0_0_20px_-5px_rgba(69,133,244,0.4)]
  hover:border-[#4585f4]
  hover:text-[#4585f4]
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
    aria-label="Book your value stream mapping workshop"
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
      bg-[#0A0A0A] text-white
      border border-[#324c9e]/70
      font-medium
      text-sm sm:text-base
      transition-all duration-300
      hover:shadow-[0_0_15px_-5px_rgba(69,133,244,0.4)]
      hover:border-[#4585f4]
      hover:text-[#4585f4]
      active:translate-y-[1px]
    `}
  >
    {children}
  </button>
);

const Hero = () => {
  const { t, getSection, language } = useTranslations();
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();
  const { audience, setAudience, isFirstVisit, switchAudience } = useAudienceSegmentation();
  const isNL = language === 'nl';

  // Get entire sections for better performance
  const heroSection = getSection('hero');
  const ctaSection = getSection('cta');

  // Memoize navigation handlers to avoid recreating functions on each render
  const handleChatClick = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      router.push('/contact');
    },
    [router]
  );

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="
          relative
          h-[calc(100vh-5rem)]
          flex flex-col justify-center
          overflow-hidden bg-[#0A0A0A]
        "
        suppressHydrationWarning
      >
        {/* Interactive Background Grid with hover effects */}
        {isLargeScreen && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GridBackground 
              className="pointer-events-none" 
              highContrast={true}
              showTechElements={false}
            />
          </div>
        )}



        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Hidden SGE Summary for SEO */}
            <SGESummary
              variant="hidden"
              pageTitle="AI Automation for Dutch Businesses"
              summary="Octomatic transforms Dutch businesses with GDPR-compliant AI automation solutions. We build custom workflows that eliminate repetitive tasks, reduce operational costs by 40-70%, and scale business operations without hiring additional staff. Our expert-led implementation ensures seamless integration with existing systems while maintaining strict data privacy compliance for Dutch market requirements."
              bullets={[
                "GDPR-compliant automation for Dutch businesses",
                "40-70% cost reduction through smart workflows", 
                "Custom AI solutions for scaling operations",
                "Expert-led implementation with proven results"
              ]}
            />

            {/* Kicker - Smaller text & icon */}
            <PriorityContent priority="high" id="hero-kicker" fetchPriority="high">
              <div
                className="
                  inline-flex items-center justify-center
                  rounded-full border border-[#324c9e]/40
                  bg-[#0A0A0A]
                  px-2 sm:px-3 py-1 sm:py-1.5
                  shadow-[0_0_20px_-5px_rgba(69,133,244,0.1)]
                  min-w-[200px] sm:min-w-fit
                "
              >
                <Timer
                  className="h-3 w-3 sm:h-4 sm:w-4 text-[#4585f4]"
                  strokeWidth={2.5}
                />
                <p className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#4585f4] whitespace-nowrap">
                  {heroSection.kicker}
                </p>
              </div>
            </PriorityContent>

            {/* Title - Highest priority for LCP */}
            <PriorityContent priority="high" id="hero-title" fetchPriority="high">
              <h1
                id="hero-heading"
                className="
                  text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
                  font-bold tracking-[-0.03em] leading-[0.9]
                  text-white
                  bg-gradient-to-b from-white to-gray-200
                  bg-clip-text text-transparent
                "
              >
                <span className="block">{heroSection.title1}</span>
                <span className="block mt-4 underline decoration-[#4585f4] decoration-4 underline-offset-8">
                  {heroSection.title2}
                </span>
              </h1>
            </PriorityContent>

            {/* Subtitle */}
            <PriorityContent priority="high" id="hero-subtitle">
              <p className="text-lg sm:text-xl text-gray-300 max-w-[600px] leading-relaxed">
                {heroSection.subtitle}
              </p>
            </PriorityContent>

            {/* Premium CTA Buttons */}
            <PriorityContent priority="high" id="hero-cta">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4" role="region" aria-label="Call to action">
                <button
                  onClick={handleChatClick}
                  className="
                    relative group overflow-hidden
                    bg-gradient-to-r from-[#4585f4] to-[#6B8AE6]
                    text-white font-semibold text-lg
                    px-10 py-4 rounded-xl
                    shadow-2xl shadow-[#4585f4]/30
                    hover:shadow-[#4585f4]/50 hover:scale-[1.02]
                    transition-all duration-300 ease-out
                    transform-gpu will-change-transform
                    min-w-[240px]
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-white/0 before:via-white/20 before:to-white/0
                    before:translate-x-[-100%] hover:before:translate-x-[100%]
                    before:transition-transform before:duration-700 before:ease-out
                  "
                  aria-label="Book your automation strategy consultation"
                  data-cta="hero-primary"
                  data-action="book-consultation"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaSection.growthCall}
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <button
                  onClick={() => {/* Add ROI calculator navigation */}}
                  className="
                    relative group
                    bg-white/10 backdrop-blur-md border border-white/20
                    text-white font-medium text-lg
                    px-10 py-4 rounded-xl
                    shadow-lg shadow-black/10
                    hover:bg-white/20 hover:shadow-xl hover:shadow-black/20
                    hover:scale-[1.02] transition-all duration-300 ease-out
                    transform-gpu will-change-transform
                    min-w-[240px]
                  "
                  aria-label="Calculate your automation ROI"
                  data-cta="hero-secondary"
                  data-action="calculate-roi"
                >
                  <span className="flex items-center gap-2">
                    Calculate ROI
                    <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </span>
                </button>
              </div>
            </PriorityContent>

            {/* Honest Value Proposition */}
            <PriorityContent priority="medium" id="hero-value">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-4">
                  <a 
                    href="https://gdpr-info.eu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#4585f4] transition-colors duration-200"
                  >
                    GDPR-compliant
                  </a> automation solutions for Dutch businesses
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Custom</strong> workflow automation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4585f4] rounded-full"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Expert-led</strong> implementation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">
                      <strong className="text-white">Privacy-first</strong> approach
                    </span>
                  </div>
                </div>
              </div>
            </PriorityContent>



          </div>
        </div>

        {/* Bottom Border - Hidden on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#324c9e] to-transparent opacity-30 hidden sm:block" />
      </section>


    </>
  );
};

export default Hero;