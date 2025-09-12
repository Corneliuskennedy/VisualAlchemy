import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { useRouter } from "next/navigation";
import { ShinyButton } from './ui/shiny-button';
import GridBackground from './ui/GridBackground';
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";

const MobileButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="w-full sm:w-auto min-w-[160px] sm:min-w-[200px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full
             bg-[#324c9e] hover:bg-[#324c9e]/90
             text-white font-medium text-sm sm:text-base
             transition-all duration-300"
  >
    {children}
  </button>
);

const FinalCTA = () => {
  const { t, language } = useTranslations();
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();

  const handleClick = () => {
    router.push(language === 'nl' ? '/nl/get-started' : '/get-started');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A]" role="region" aria-label="Get started call to action">
      {isLargeScreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground className="pointer-events-none" />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-archivo font-[500] text-white">
            {t('finalCta', 'title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('finalCta', 'subtitle')}
          </p>
          <div className="pt-8" role="group" aria-label="Primary call to action">
            {isLargeScreen ? (
              <ShinyButton
                onClick={handleClick}
                className="mx-auto min-w-[180px] sm:min-w-[200px] !py-3 !text-base"
                aria-label="Get started with AI automation - Book your consultation"
                data-cta="final"
                data-action="get-started"
              >
                {t('finalCta', 'primaryButton')}
              </ShinyButton>
            ) : (
              <MobileButton onClick={handleClick}>
                {t('finalCta', 'primaryButton')}
              </MobileButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
