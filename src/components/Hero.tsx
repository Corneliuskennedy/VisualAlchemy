'use client';

import React, { useCallback, useState, useEffect } from "react";
import { ShinyButton, ShinySecondaryButton } from "./ui/shiny-button";
import "@/styles/shiny-button.css";
import { useTranslations } from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { Timer } from "lucide-react";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import PriorityContent from "./PriorityContent";


import { SGESummary } from './SGESummary';

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
  const [GridBackground, setGridBackground] = useState<React.ComponentType | null>(null);

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

  // Load GridBackground after initial render (will be hidden on mobile via CSS)
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical background loading
    const loadBackground = () => {
      // Use a different approach - load the module like normal but avoid props
      import("./ui/GridBackground")
        .then((mod) => {
          setGridBackground(() => mod.default);
        })
        .catch((err) => {
          console.error("Error loading GridBackground:", err);
        });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadBackground, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadBackground, 1000);
    }
  }, []); // Remove isLargeScreen dependency to prevent hydration issues

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
        {/* Background Grid - Only rendered on desktop */}
        {GridBackground && (
          <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
            <GridBackground />
          </div>
        )}



        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-xl sm:max-w-4xl lg:max-w-7xl px-4 py-8 sm:py-12">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6">
            
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
                  text-4xl sm:text-6xl lg:text-[6.5rem]
                  font-bold tracking-[0.02em] leading-[1.1]
                  text-white
                "
              >
                <span className="block">{heroSection.title1}</span>
                <span className="block mt-2 underline decoration-[#4585f4] decoration-4 underline-offset-8">
                  {heroSection.title2}
                </span>
              </h1>
            </PriorityContent>

            {/* Subtitle */}
            <PriorityContent priority="high" id="hero-subtitle">
              <p className="text-base sm:text-lg text-gray-300 max-w-[540px] leading-relaxed">
                {heroSection.subtitle}
              </p>
            </PriorityContent>

            {/* CTA Button */}
            <PriorityContent priority="high" id="hero-cta">
              <div className="flex justify-center mt-6" role="region" aria-label="Call to action">
                <button
                  onClick={handleChatClick}
                  className="
                    relative group
                    bg-gradient-to-r from-[#4585f4] to-[#6366f1]
                    text-white font-semibold text-lg
                    px-8 sm:px-10 py-4 rounded-lg
                    shadow-lg shadow-[#4585f4]/25
                    hover:shadow-xl hover:shadow-[#4585f4]/40
                    transform hover:scale-105 
                    transition-all duration-300 ease-out
                    border border-[#4585f4]/20
                    w-full max-w-sm sm:min-w-[260px] sm:w-auto
                  "
                  aria-label="Let's have a chat about your automation needs"
                  data-cta="primary"
                  data-action="lets-chat"
                >
                  <span className="relative z-10">{ctaSection.growthCall}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5a95ff] to-[#7c7aff] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </PriorityContent>

            {/* Honest Value Proposition */}
            <PriorityContent priority="medium" id="hero-value">
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 mb-3">
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