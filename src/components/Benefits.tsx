import React, { useState, useMemo } from 'react';
import GridBackground from './ui/GridBackground';
import { Settings, Brain, ArrowBigUp, Headphones } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitItem: React.FC<{ benefit: Benefit }> = ({ benefit }) => {
  const IconComponent = benefit.icon;
  return (
    <div className="flex items-start gap-6 group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#324c9e]/10 flex items-center justify-center group-hover:bg-[#324c9e]/20 transition-colors">
        <IconComponent className="w-6 h-6 text-[#6B8AE6]" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-[#eef2ed] mb-2 group-hover:text-[#6B8AE6] transition-colors">
          {benefit.title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {benefit.description}
        </p>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslations();
  const isLargeScreen = useIsLargeScreen();

  const benefits = useMemo((): Benefit[] => [
    {
      icon: Settings,
      title: t('benefits', 'aiAutomationTitle'),
      description: t('benefits', 'aiAutomationDescription'),
    },
    {
      icon: Brain,
      title: t('benefits', 'realTimeIntelligenceTitle'),
      description: t('benefits', 'realTimeIntelligenceDescription'),
    },
    {
      icon: ArrowBigUp,
      title: t('benefits', 'futureProofGrowthTitle'),
      description: t('benefits', 'futureProofGrowthDescription'),
    },
    {
      icon: Headphones,
      title: t('benefits', 'expertPartnershipTitle'),
      description: t('benefits', 'expertPartnershipDescription'),
    },
  ], [t]);

  return (
    <section className="py-24 relative bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground className="pointer-events-none" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side – Benefits content with your original heading styling */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#eef2ed]">
                {t('benefits', 'headerTitle')}
                <span className="block text-[#6B8AE6]">{t('benefits', 'headerSubtitle')}</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {t('benefits', 'headerDescription')}
              </p>
            </div>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <BenefitItem key={benefit.title} benefit={benefit} />
              ))}
            </div>
          </div>

          {/* Right side – Value Stream Mapping Visualization */}
          <div className="lg:w-1/2">
            <div className="relative">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/VSM400.webp 400w, /images/VSM800.webp 800w, /images/VSM1200.webp 1200w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
                <img 
                  src="/images/VSM800.webp"
                  alt="Value Stream Mapping Workshop - Process Optimization Visualization"
                  width="800"
                  height="600"
                  className={`w-full rounded-2xl transition-all duration-300 hover:scale-[1.02] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  style={{ aspectRatio: '4/3' }}
                  decoding="async"
                />
              </picture>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#1A1A1A] animate-pulse rounded-2xl flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Loading...</div>
                </div>
              )}
              
              {/* Minimal floating elements */}
              <div className="absolute -top-3 -right-3 bg-[#6B8AE6] p-3 rounded-xl shadow-lg animate-float">
                <Brain className="w-5 h-5 text-white" />
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-[#324c9e] p-3 rounded-xl shadow-lg animate-float-delayed">
                <Settings className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;