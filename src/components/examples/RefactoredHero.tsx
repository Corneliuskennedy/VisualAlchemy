import React, { useCallback, useState, useEffect } from "react";
import { ShinyButton, ShinySecondaryButton } from "../ui/shiny-button";
import "@/styles/shiny-button.css";
import { useTranslations } from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { Timer } from "lucide-react";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import PriorityContent from "../PriorityContent";
import { TranslatedText } from "../TranslationProvider";

// Example of the new refactored Hero component using the modular translation system
const RefactoredHero = () => {
  const { t, getSection, language } = useTranslations();
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();
  const [GridBackground, setGridBackground] = useState<React.ComponentType | null>(null);

  // Get entire hero section for better performance
  const heroSection = getSection('hero');
  const ctaSection = getSection('cta');

  // Memoize navigation handlers to avoid recreating functions on each render
  const handleFindBottleneck = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  // Only load GridBackground on desktop and after initial render
  useEffect(() => {
    if (!isLargeScreen) {
      setGridBackground(null);
      return;
    }

    // Use requestIdleCallback to defer non-critical background loading
    const loadBackground = () => {
      import("../ui/GridBackground")
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
  }, [isLargeScreen]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative
        h-[calc(100vh-48px)]
        flex flex-col justify-center
        overflow-hidden bg-[#0A0A0A]
      "
    >
      {/* Background Grid - Only rendered on desktop */}
      {isLargeScreen && GridBackground && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-xl sm:max-w-4xl lg:max-w-7xl px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6">
          {/* Kicker - Using the new TranslatedText component */}
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
              <TranslatedText
                section="hero"
                key="kicker"
                className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#4585f4] whitespace-nowrap"
              />
            </div>
          </PriorityContent>

          {/* Title - Using direct access to section for better performance */}
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

          {/* Subtitle - Using the new TranslatedText component with fallback */}
          <PriorityContent priority="high" id="hero-subtitle">
            <TranslatedText
              section="hero"
              key="subtitle"
              fallback="Custom automations and proven systems that free up 10+ hours a week—so you can lead, not just manage."
              className="text-base sm:text-lg text-gray-300 max-w-[540px] leading-relaxed"
              as="p"
            />
          </PriorityContent>

          {/* CTA Button - Using the new translation hook */}
          <PriorityContent priority="high" id="hero-cta">
            <div className="flex justify-center mt-1">
              {isLargeScreen ? (
                <ShinyButton
                  onClick={handleFindBottleneck}
                  className="
                    min-w-[200px] sm:min-w-[240px]
                    px-5 sm:px-7 py-2.5 sm:py-3.5
                    rounded-full
                    bg-[#324c9e] hover:bg-[#324c9e]/90 text-white
                    font-medium
                    text-sm sm:text-base
                    transition-all duration-300
                  "
                >
                  {t('cta', 'growthCall')}
                </ShinyButton>
              ) : (
                <MobileButton onClick={handleFindBottleneck}>
                  {ctaSection.growthCall}
                </MobileButton>
              )}
            </div>
          </PriorityContent>
        </div>
      </div>
    </section>
  );
};

// Mobile button component (simplified for example)
const MobileButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="
      min-w-[200px] sm:min-w-[240px]
      px-5 sm:px-7 py-2.5 sm:py-3.5
      rounded-full
      bg-[#324c9e] hover:bg-[#324c9e]/90 text-white
      font-medium
      text-sm sm:text-base
      transition-all duration-300
      active:translate-y-[1px]
    "
  >
    {children}
  </button>
);

export default RefactoredHero; 