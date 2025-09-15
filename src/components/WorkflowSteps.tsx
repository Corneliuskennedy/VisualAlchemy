import React, { useMemo, memo } from 'react';
import { Map, Cog, TrendingUp, ArrowRight, Shield } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';
import { useRouter } from "next/navigation";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  subtitle?: string;
  guarantee?: string;
  nextStep?: string;
}

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
  onButtonClick: (index: number) => void;
}

const StepCard = memo<StepCardProps>(({ step, index, totalSteps, onButtonClick }) => {
  // Create visual hierarchy: Step 1 = fully opaque, Step 2 = 75%, Step 3 = 50%
  const getOpacity = () => {
    if (index === 0) return "opacity-100";
    if (index === 1) return "opacity-75";
    return "opacity-50";
  };

  return (
    <div className={`relative group ${getOpacity()}`}>
      <div
        className="p-6 sm:p-8 rounded-xl border border-gray-800 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm 
                   shadow-lg transition-all duration-300 ease-out 
                   hover:shadow-[0_10px_40px_-15px_rgba(107,138,230,0.2)] 
                   hover:border-[#6B8AE6]/30 relative z-10
                   mt-8 sm:mt-0"
      >
        <div className="absolute -top-8 -left-3 sm:-top-5 sm:-left-5 w-16 h-16 rounded-full 
                      bg-gradient-to-br from-[#6B8AE6] to-[#324c9e] 
                      flex items-center justify-center shadow-[0_0_20px_-5px_rgba(107,138,230,0.5)]
                      border-4 border-black z-20 group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg font-bold text-white">{index + 1}</span>
        </div>
        
        <div className="mt-4 ml-4 sm:ml-2 sm:mt-4">
          <div className="mb-6 flex justify-start">
            <div className="w-14 h-14 rounded-lg bg-[#324c9e]/20 flex items-center justify-center
                          border border-[#324c9e]/20 shadow-inner
                          transition-all duration-300 ease-out group-hover:bg-[#324c9e]/30
                          group-hover:shadow-[0_0_15px_-5px_rgba(107,138,230,0.3)]">
              {step.icon}
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white text-left
                        transition-colors duration-300 group-hover:text-[#6B8AE6]
                        drop-shadow-sm">
            {step.title}
          </h3>
          
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 text-left
                        transition-colors duration-300 group-hover:text-white">
            {step.description}
          </p>
          
          {step.guarantee && (
            <div className="mb-6 p-3 rounded-lg bg-[#6B8AE6]/5 border border-[#6B8AE6]/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#6B8AE6] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#6B8AE6] font-medium leading-relaxed">
                  {step.guarantee}
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {step.highlight ? (
              <button 
                onClick={() => onButtonClick(index)}
                className="w-full px-6 py-3 rounded-lg bg-[#6B8AE6] text-white font-semibold
                               hover:bg-[#6B8AE6]/90 transition-all duration-300
                               shadow-md hover:shadow-lg hover:shadow-[#6B8AE6]/25
                               transform hover:-translate-y-0.5">
                {step.highlight}
              </button>
            ) : step.nextStep ? (
              <p className="text-gray-400 font-medium text-center leading-relaxed mt-4">
                {step.nextStep}
              </p>
            ) : null}
            {step.subtitle && step.subtitle.trim() !== "" && (
              <p className="text-sm text-[#6B8AE6] font-medium text-center">
                {step.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {index < totalSteps - 1 && (
        <div className="hidden lg:flex absolute top-1/2 -right-24 transform -translate-y-1/2 z-20
                      pointer-events-none">
          <div className="relative w-24 h-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#6B8AE6] to-[#324c9e]/20"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 
                          w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-[#6B8AE6] to-[#324c9e] 
                          shadow-[0_0_10px_rgba(107,138,230,0.5)]">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      )}
      
      {index < totalSteps - 1 && (
        <div className="lg:hidden flex justify-center my-1 -mb-4">
          <div className="relative w-12 h-32">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[#6B8AE6] to-[#324c9e]/20"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                          w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-[#6B8AE6] to-[#324c9e]
                          shadow-[0_0_10px_rgba(107,138,230,0.5)]">
              <ArrowRight className="w-5 h-5 text-white rotate-90" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

StepCard.displayName = 'StepCard';

const WorkflowSteps = () => {
  const { t, language } = useTranslations();
    const router = useRouter();

  const handleButtonClick = (index: number) => {
    // Only Step 1 (index 0) will have a clickable button
    if (index === 0) {
      // Navigate to the get-started page where the Fillout form is located
      const getStartedPath = language === 'nl' ? '/nl/get-started' : '/get-started';
      router.push(getStartedPath);
    }
  };

  const steps: Step[] = useMemo(() => [
    {
      icon: <Map className="w-7 h-7 text-[#6B8AE6]" />,
      title: t('process', 'steps.step1.title'),
      description: t('process', 'steps.step1.description'),
      highlight: t('process', 'steps.step1.timeline'),
      subtitle: t('process', 'steps.step1.subtitle'),
      guarantee: t('process', 'steps.step1.guarantee'),
    },
    {
      icon: <Cog className="w-7 h-7 text-[#6B8AE6]" />,
      title: t('process', 'steps.step2.title'),
      description: t('process', 'steps.step2.description'),
      nextStep: t('process', 'steps.step2.nextStep'),
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-[#6B8AE6]" />,
      title: t('process', 'steps.step3.title'),
      description: t('process', 'steps.step3.description'),
      nextStep: t('process', 'steps.step3.nextStep'),
    },
  ], [t]);

  return (
    <section id="how-it-works" className="py-16 relative z-10 overflow-hidden">
      
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-sm">
            Simple process. <span className="text-[#6B8AE6] drop-shadow-[0_0_10px_rgba(107,138,230,0.3)]">Powerful results.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('process', 'subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 sm:gap-12 lg:gap-24 max-w-[1400px] mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              totalSteps={steps.length}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;
