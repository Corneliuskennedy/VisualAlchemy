import React, { useMemo, useRef, useCallback, useEffect, useState, memo } from "react";
import { Bot, LineChart, Users, Brain, BarChart3, FileText, ArrowRight, TrendingUp, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from '@/hooks/useTranslations';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowSize } from '@/hooks/use-window-size';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNL: boolean;
  id: string;
  isBottomRow?: boolean;
}

// Function to generate service URL based on language
function getServiceUrl(id: string, isNL: boolean): string {
  return isNL ? `/nl/services/${id}` : `/services/${id}`;
}

const ServiceCard = memo(({ icon, title, description, isNL, id, isBottomRow = false }: ServiceCardProps) => {
  const serviceUrl = getServiceUrl(id, isNL);
  
  return (
    <a 
      href={serviceUrl}
      className={`group relative flex h-full flex-col rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#111111]/90 to-[#0F0F0F]/90 backdrop-blur-sm 
                 ${isBottomRow ? 'p-6' : 'p-8'} transition-all duration-500 hover:border-[#324c9e]/60 hover:bg-gradient-to-br hover:from-[#141414]/95 hover:to-[#111111]/95
                 shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(66,99,235,0.25)]`}
      aria-label={`View details about ${title}`}
    >
      <div className="flex h-full flex-col">
        <div className={`flex flex-col gap-3 ${isBottomRow ? 'mb-4' : 'mb-6'}`}>
          <div className={`flex ${isBottomRow ? 'h-12 w-12' : 'h-14 w-14'} items-center justify-center rounded-xl 
                         bg-gradient-to-br from-[#324c9e]/15 to-[#6B8AE6]/10 border border-[#324c9e]/30 
                         group-hover:from-[#324c9e]/25 group-hover:to-[#6B8AE6]/20 group-hover:border-[#324c9e]/50
                         transition-all duration-300`}>
            {React.cloneElement(icon as React.ReactElement, { 
              className: `${isBottomRow ? 'w-6 h-6' : 'w-7 h-7'} text-[#6B8AE6] group-hover:text-[#4585f4] transition-colors duration-300` 
            })}
          </div>
          <h3 className={`${isBottomRow ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-bold text-white group-hover:text-[#6B8AE6] transition-colors duration-300 leading-tight`}>
            {title}
          </h3>
        </div>
        
        <p className={`${isBottomRow ? 'text-sm' : 'text-[16px]'} leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ${isBottomRow ? 'mb-4' : 'mb-8'}`}>
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm font-semibold text-[#6B8AE6] group-hover:text-[#4585f4] 
                          opacity-90 group-hover:opacity-100 transition-all duration-300">
            <span className="mr-2">{isNL ? "Meer informatie" : "Learn more"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  );
});

const Services = () => {
  const titleRef = useScrollAnimation();
  const { t, language } = useTranslations();
  const isNL = language === 'nl';
  
  const services = useMemo<Service[]>(
    () => [
      {
        id: 'lead-generation',
        icon: <LineChart className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'leadGeneration.title'),
        description: t('services', 'leadGeneration.description'),
      },
      {
        id: 'project-management',
        icon: <BarChart3 className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'projectManagement.title'),
        description: t('services', 'projectManagement.description'),
      },
      {
        id: 'hiring-systems',
        icon: <Users className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'hiringSystems.title'),
        description: t('services', 'hiringSystems.description'),
      },
      {
        id: 'ai-service-fulfillment',
        icon: <Bot className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'aiService.title'),
        description: t('services', 'aiService.description'),
      },
      {
        id: 'crm-buildouts',
        icon: <Brain className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'crmBuildouts.title'),
        description: t('services', 'crmBuildouts.description'),
      },
      {
        id: 'sops-consulting',
        icon: <FileText className="w-6 h-6 text-[#6B8AE6]" />,
        title: t('services', 'sops.title'),
        description: t('services', 'sops.description'),
      },
      {
        id: 'ai-automation-amsterdam',
        icon: <Bot className="w-6 h-6 text-[#6B8AE6]" />,
        title: isNL ? 'AI Automatisering Amsterdam' : 'AI Automation Amsterdam',
        description: isNL 
          ? 'Gespecialiseerde AI automatisering voor Amsterdamse bedrijven. Lokale expertise met bewezen resultaten.'
          : 'Specialized AI automation for Amsterdam businesses. Local expertise with proven results.',
      },
    ],
    [t, isNL]
  );

  // Split services into top 6 and bottom 1 (since we only have 7 valid services)
  const topServices = services.slice(0, 6);
  const bottomServices = services.slice(6, 7);

  return (
    <section id="services" className="py-16 relative">
      
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        {/* Top 6 services in 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {topServices.map((service, index) => (
            <div key={service.id} className="h-80">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                isNL={isNL}
                id={service.id}
                isBottomRow={false}
              />
            </div>
          ))}
        </div>

        {/* Bottom 3 services spanning wider and shorter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bottomServices.map((service, index) => (
            <div key={service.id} className="h-56">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                isNL={isNL}
                id={service.id}
                isBottomRow={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
