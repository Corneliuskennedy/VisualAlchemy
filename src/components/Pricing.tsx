import React from 'react';
import useLanguage from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { Check, Crown } from 'lucide-react';

interface PricingCardProps {
  title: string;
  subtitle: string;
  type: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  plan?: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  type,
  price,
  description,
  features,
  cta,
  plan,
  isPopular = false,
}) => {
  const { language } = useLanguage();
  const router = useRouter();

  const handleClick = () => {
    router.push(language === 'nl' ? '/nl/get-started' : '/get-started');
  };

  return (
    <div className={`
      relative transform transition-all duration-300 
      ${isPopular ? 'lg:scale-105 lg:z-20' : 'lg:z-10'}
    `}>
      {/* Card */}
      <div className={`
        relative h-full rounded-lg p-8 flex flex-col justify-between
        ${isPopular
          ? 'bg-black border-2 border-[#4585f4]/50'
          : 'bg-black border border-gray-800'
        }
        transition-all duration-300
        ${isPopular 
          ? 'shadow-xl shadow-[#4585f4]/15' 
          : 'hover:shadow-md hover:shadow-[#4585f4]/5'
        }
        hover:border-[#4585f4]/40 hover:-translate-y-1
        group
      `}>
        {/* Badge - moved inside the card container so it moves with hover */}
        {(isPopular || title) && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
            <span className={`px-3.5 py-1.5 text-xs font-semibold rounded-full ${
              isPopular
                ? 'bg-[#4585f4] text-white shadow-md shadow-[#4585f4]/20'
                : 'bg-black text-[#4585f4] border border-[#4585f4]/30'
            }`}>
              {isPopular && <Crown className="w-3 h-3 mr-1 inline-block" />}
              {isPopular ? "Recommended" : title}
            </span>
          </div>
        )}
        
        {isPopular && (
          <>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4585f4] to-transparent"></div>
            {/* Add subtle glow effect around the card */}
            <div className="absolute -inset-[1px] bg-[#4585f4]/5 rounded-lg blur-sm -z-10"></div>
            <div className="absolute -inset-[3px] bg-[#4585f4]/3 rounded-xl blur-md -z-20"></div>
          </>
        )}
        
        <div className="mt-6">
          {/* Header */}
          <h3 className={`text-xl font-semibold mb-1 ${isPopular ? 'text-[#4585f4]' : 'text-white group-hover:text-[#4585f4]/90'} transition-colors duration-300`}>
            {subtitle}
          </h3>
          <p className="text-[#4585f4]/70 text-xs font-medium mb-6">
            {type}
          </p>

          {/* Price */}
          <div className="mb-6 flex items-end">
            <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-gray-100'}`}>
              {price}
            </span>
            {price !== "Custom" && price !== "Op maat" && (
              <span className="text-gray-500 ml-2 text-base mb-1">/month</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-8 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 group/item">
                <div className={`flex-shrink-0 mt-0.5 ${isPopular ? 'text-[#4585f4]' : 'text-[#4585f4]/70 group-hover/item:text-[#4585f4]'} transition-colors duration-300`}>
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-gray-400 text-sm leading-tight group-hover/item:text-gray-300 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className={`
            w-full py-3 text-sm font-medium rounded-md
            transition-all duration-300
            focus:outline-none focus:ring-1 focus:ring-[#4585f4]/40
            ${
              isPopular
                ? 'bg-[#4585f4] text-white hover:bg-[#4585f4]/90 hover:shadow-lg hover:shadow-[#4585f4]/20'
                : 'bg-transparent border border-[#4585f4]/40 text-white hover:bg-[#4585f4]/10 hover:border-[#4585f4]'
            }
            relative overflow-hidden
          `}
        >
          {/* Shine effect for both buttons */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {cta}
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const { t } = useLanguage();
  
  const plans = [
    {
      title: t('pricing', 'starter.title'),
      subtitle: t('pricing', 'starter.subtitle'),
      type: t('pricing', 'starter.type'),
      price: t('pricing', 'starter.price'),
      description: t('pricing', 'starter.description'),
      features: [
        t('pricing', 'starter.features.feature1'),
        t('pricing', 'starter.features.feature2'),
        t('pricing', 'starter.features.feature3'),
        t('pricing', 'starter.features.feature4'),
        t('pricing', 'starter.features.feature5'),
      ],
      cta: t('pricing', 'starter.cta'),
      plan: 'starter',
    },
    {
      title: t('pricing', 'growth.title'),
      subtitle: t('pricing', 'growth.subtitle'),
      type: t('pricing', 'growth.type'),
      price: t('pricing', 'growth.price'),
      description: t('pricing', 'growth.description'),
      features: [
        t('pricing', 'growth.features.feature1'),
        t('pricing', 'growth.features.feature2'),
        t('pricing', 'growth.features.feature3'),
        t('pricing', 'growth.features.feature4'),
      ],
      cta: t('pricing', 'growth.cta'),
      plan: 'growth',
      isPopular: true,
    },
    {
      title: t('pricing', 'enterprise.title'),
      subtitle: t('pricing', 'enterprise.subtitle'),
      type: t('pricing', 'enterprise.type'),
      price: t('pricing', 'enterprise.price'),
      description: t('pricing', 'enterprise.description'),
      features: [
        t('pricing', 'enterprise.features.feature1'),
        t('pricing', 'enterprise.features.feature2'),
        t('pricing', 'enterprise.features.feature3'),
        t('pricing', 'enterprise.features.feature4'),
        t('pricing', 'enterprise.features.feature5'),
      ],
      cta: t('pricing', 'enterprise.cta'),
    },
  ];

  return (
    <section id="pricing" className="py-16 relative z-10 overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-[#4585f4]/20"></div>
      
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: t('pricing', 'title') }}
          />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('pricing', 'subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              subtitle={plan.subtitle}
              type={plan.type}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              plan={plan.plan}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#4585f4]/20"></div>
    </section>
  );
};

export default Pricing;
