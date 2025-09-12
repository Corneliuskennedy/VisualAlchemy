import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import useLanguage from "@/contexts/LanguageContext";

const CaseStudies = () => {
  const { t } = useLanguage();

  const caseStudies = [
    {
      title: t('caseStudies', 'case1.title'),
      description: t('caseStudies', 'case1.description'),
      metrics: [
        {
          value: t('caseStudies', 'case1.metrics.metric1.value'),
          label: t('caseStudies', 'case1.metrics.metric1.label')
        },
        {
          value: t('caseStudies', 'case1.metrics.metric2.value'),
          label: t('caseStudies', 'case1.metrics.metric2.label')
        }
      ]
    },
    {
      title: t('caseStudies', 'case2.title'),
      description: t('caseStudies', 'case2.description'),
      metrics: [
        {
          value: t('caseStudies', 'case2.metrics.metric1.value'),
          label: t('caseStudies', 'case2.metrics.metric1.label')
        },
        {
          value: t('caseStudies', 'case2.metrics.metric2.value'),
          label: t('caseStudies', 'case2.metrics.metric2.label')
        }
      ]
    },
    {
      title: t('caseStudies', 'case3.title'),
      description: t('caseStudies', 'case3.description'),
      metrics: [
        {
          value: t('caseStudies', 'case3.metrics.metric1.value'),
          label: t('caseStudies', 'case3.metrics.metric1.label')
        },
        {
          value: t('caseStudies', 'case3.metrics.metric2.value'),
          label: t('caseStudies', 'case3.metrics.metric2.label')
        }
      ]
    }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('caseStudies', 'title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('caseStudies', 'subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-black/20 backdrop-blur-sm border-gray-800 hover:border-[#4585f4]/50 transition-all duration-300 p-6">
              <h3 className="text-xl font-bold mb-4 text-white">{study.title}</h3>
              <p className="text-gray-400 mb-6">{study.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-[#4585f4]">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>
              <button className="text-[#4585f4] hover:text-[#4585f4]/80 transition-colors duration-200 flex items-center gap-2">
                {t('caseStudies', 'readMore')} <ArrowRight size={16} />
              </button>
            </Card>
          ))}
        </div>

        <picture>
          <source
            type="image/webp"
            srcSet="/dashboard-small.webp 400w, /dashboard-800px.webp 800w, /dashboard-1200px.webp 1200w"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
          />
          <img 
            src="/dashboard-1200px.webp"
            alt="Automation Dashboard"
            width="800"
            height="600"
            className="w-full rounded-xl shadow-2xl transition-opacity duration-300 opacity-100 mt-16"
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: '800 / 600' }}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              img.classList.remove('opacity-0');
            }}
          />
        </picture>
      </div>
    </section>
  );
};

export default CaseStudies;
