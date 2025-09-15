import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface TestimonialCardProps {
  quote: string;
  author: string;
  logo: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, logo, index }) => {
  return (
    <div className="relative p-8 rounded-xl border border-gray-800 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm
      shadow-lg transition-all duration-300 ease-out
      hover:shadow-[0_10px_40px_-15px_rgba(107,138,230,0.2)]
      hover:border-[#6B8AE6]/30 group"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B8AE6] to-[#324c9e] 
                      flex items-center justify-center shadow-[0_0_15px_-5px_rgba(107,138,230,0.5)]">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#6B8AE6] text-[#6B8AE6]" />
        ))}
      </div>

      {/* Quote Text */}
      <blockquote className="text-lg text-gray-300 mb-6 leading-relaxed
                           group-hover:text-white transition-colors duration-300 italic">
        "{quote}"
      </blockquote>

      {/* Author */}
      <footer className="border-t border-gray-700/50 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full p-2 overflow-hidden">
            <img 
              src={logo} 
              alt={`${author} logo`} 
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
            />
          </div>
          <div>
            <p className="text-[#6B8AE6] font-semibold group-hover:text-white transition-colors duration-300">
              {author}
            </p>
          </div>
        </div>
      </footer>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6B8AE6]/0 via-[#6B8AE6]/5 to-[#6B8AE6]/0 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

const Testimonials = () => {
  const { t } = useTranslations();
  
  const testimonials = [
    {
      quote: t('testimonials', 'testimonial1.quote'),
      author: t('testimonials', 'testimonial1.author'),
      logo: t('testimonials', 'testimonial1.logo'),
    },
    {
      quote: t('testimonials', 'testimonial2.quote'),
      author: t('testimonials', 'testimonial2.author'),
      logo: t('testimonials', 'testimonial2.logo'),
    },
    {
      quote: t('testimonials', 'testimonial3.quote'),
      author: t('testimonials', 'testimonial3.author'),
      logo: t('testimonials', 'testimonial3.logo'),
    },
  ];

  return (
    <section id="testimonials" className="py-16 relative z-10 overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-[#6B8AE6]/20"></div>
      
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {t('testimonials', 'title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('testimonials', 'subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              logo={testimonial.logo}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6B8AE6]/20"></div>
    </section>
  );
};

export default Testimonials;