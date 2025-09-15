import React, { useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Euro, Clock, Star, Calendar, XCircle, Check } from "lucide-react";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { useTranslations } from '@/hooks/useTranslations';

interface ComparisonCardProps {
  title: string;
  isHighlighted?: boolean;
  data: Array<{ icon: React.ReactNode; value: string }>;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, isHighlighted = false, data }) => {
  const isPositive = title.includes('✅');
  const cardClasses = `
    relative p-6 rounded-xl border transition-all duration-300 
    ${isHighlighted 
      ? 'bg-black/30 border-[#4585f4] border-2' 
      : 'bg-black/30 border-gray-800'
    } 
    backdrop-blur-sm
    hover:scale-[1.02] hover:shadow-xl
    group
  `;

  return (
    <Card className={cardClasses}>
      {/* Highlight glow effect */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-xl ring-2 ring-[#4585f4] ring-offset-2 ring-offset-black/30" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-6 ${isPositive ? 'text-[#4585f4]' : 'text-white'} group-hover:text-[#4585f4] transition-colors duration-300`}>
          {title}
        </h3>
        <div className="space-y-5">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 text-gray-300 group-hover:text-gray-200 transition-all duration-300"
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                ${isHighlighted 
                  ? 'bg-[#4585f4]/10 group-hover:bg-[#4585f4]/20' 
                  : 'bg-gray-800/50 group-hover:bg-gray-800'
                }
              `}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: `w-5 h-5 ${isHighlighted ? 'text-[#4585f4]' : 'text-gray-400'} transition-colors group-hover:text-[#4585f4]`
                })}
              </div>
              <span className="text-base flex-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:ring-1 group-hover:ring-[#4585f4]/50" />
    </Card>
  );
};

const Comparison = () => {
  const isTablet = useIsTablet();
  const { t } = useTranslations();
    
  const comparisonData = {
    freelancers: [
      { icon: <Euro />, value: t('comparison', 'freelancers.price') },
      { icon: <Clock />, value: t('comparison', 'freelancers.timeToStart') },
      { icon: <Star />, value: t('comparison', 'freelancers.expertise') },
      { icon: <Calendar />, value: t('comparison', 'freelancers.timelines') },
      { icon: <XCircle />, value: t('comparison', 'freelancers.replacement') }
    ],
    inHouse: [
      { icon: <Euro />, value: t('comparison', 'inHouse.price') },
      { icon: <Clock />, value: t('comparison', 'inHouse.timeToStart') },
      { icon: <Star />, value: t('comparison', 'inHouse.expertise') },
      { icon: <Calendar />, value: t('comparison', 'inHouse.timelines') },
      { icon: <XCircle />, value: t('comparison', 'inHouse.replacement') }
    ],
    otherAgencies: [
      { icon: <Euro />, value: t('comparison', 'agencies.price') },
      { icon: <Clock />, value: t('comparison', 'agencies.timeToStart') },
      { icon: <Star />, value: t('comparison', 'agencies.expertise') },
      { icon: <Calendar />, value: t('comparison', 'agencies.timelines') },
      { icon: <XCircle />, value: t('comparison', 'agencies.replacement') }
    ],
    ourService: [
      { icon: <Euro />, value: t('comparison', 'ourService.price') },
      { icon: <Clock />, value: t('comparison', 'ourService.timeToStart') },
      { icon: <Star />, value: t('comparison', 'ourService.expertise') },
      { icon: <Calendar />, value: t('comparison', 'ourService.timelines') },
      { icon: <Check />, value: t('comparison', 'ourService.replacement') }
    ]
  };

  return (
    <section id="comparison" className="py-16 relative z-10 overflow-hidden">
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight animate-fade-in-slow"
            dangerouslySetInnerHTML={{ __html: t('comparison', 'title') }}
          />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('comparison', 'subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {!isTablet ? (
            <>
              <ComparisonCard 
                title={t('comparison', 'freelancers.title')}
                data={comparisonData.freelancers} 
              />
              <ComparisonCard 
                title={t('comparison', 'inHouse.title')}
                data={comparisonData.inHouse} 
              />
              <ComparisonCard 
                title={t('comparison', 'agencies.title')}
                data={comparisonData.otherAgencies} 
              />
              <ComparisonCard 
                title={t('comparison', 'ourService.title')}
                data={comparisonData.ourService}
                isHighlighted
              />
            </>
          ) : (
            <>
              <ComparisonCard 
                title={t('comparison', 'inHouse.title')}
                data={comparisonData.inHouse} 
              />
              <ComparisonCard 
                title={t('comparison', 'ourService.title')}
                data={comparisonData.ourService}
                isHighlighted
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
