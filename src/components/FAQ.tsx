import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from '@/hooks/useTranslations';
import { useRouter } from "next/navigation";

const FAQ = () => {
  const { t, language } = useTranslations();
  const router = useRouter();
  
  // Memoize the FAQ items so they're recalculated only when the translations update.
  const faqs = useMemo(() => [
    {
      question: t('faq', 'questions.q1.question'),
      answer: t('faq', 'questions.q1.answer')
    },
    {
      question: t('faq', 'questions.q2.question'),
      answer: t('faq', 'questions.q2.answer')
    },
    {
      question: t('faq', 'questions.q3.question'),
      answer: t('faq', 'questions.q3.answer')
    },
    {
      question: t('faq', 'questions.q4.question'),
      answer: t('faq', 'questions.q4.answer')
    },
    {
      question: t('faq', 'questions.q5.question'),
      answer: t('faq', 'questions.q5.answer')
    },
    {
      question: t('faq', 'questions.q6.question'),
      answer: t('faq', 'questions.q6.answer')
    },
    {
      question: t('faq', 'questions.q7.question'),
      answer: t('faq', 'questions.q7.answer')
    },
    {
      question: t('faq', 'questions.q8.question'),
      answer: t('faq', 'questions.q8.answer')
    },
    {
      question: t('faq', 'questions.q9.question'),
      answer: t('faq', 'questions.q9.answer')
    },
    {
      question: t('faq', 'questions.q10.question'),
      answer: t('faq', 'questions.q10.answer')
    }
  ], [t]);

  // Split FAQs evenly: even-indexed items in the left column, odd-indexed in the right.
  const leftColumnFaqs = useMemo(() => faqs.filter((_, index) => index % 2 === 0), [faqs]);
  const rightColumnFaqs = useMemo(() => faqs.filter((_, index) => index % 2 !== 0), [faqs]);

  const gdprQuestion = language === 'nl' ? 'Hoe waarborgt Octomatic de GDPR-naleving?' : 'How does Octomatic ensure GDPR compliance?';
  const gdprAnswer = language === 'nl' 
    ? "Wij bouwen onze automatiseringsoplossingen met een 'privacy-by-design'-aanpak, zodat gegevensbescherming een kernonderdeel van de architectuur is. Voor meer details kunt u de officiële GDPR-richtlijnen raadplegen op de "
    : "We build our automation solutions with a 'privacy-by-design' approach, ensuring that data protection is a core part of the architecture. For more details, you can review the official GDPR guidelines on the ";

  return (
    <section className="py-16 relative z-10 overflow-hidden">
      
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
            {t('faq', 'title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('faq', 'subtitle')}
          </p>
        </div>

        {/* Two-column grid for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column Accordion */}
          <Accordion type="single" collapsible className="w-full" defaultValue="">
            {leftColumnFaqs.map((faq, index) => (
              <AccordionItem
                key={`left-${index}`}
                value={`left-item-${index}`}
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-[#324c9e]/30 transition-all duration-300 ease-in-out mb-4"
              >
                <AccordionTrigger className="px-4 py-3 text-left text-white transition-colors duration-300 hover:text-[#6B8AE6]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column Accordion */}
          <Accordion type="single" collapsible className="w-full" defaultValue="">
            {rightColumnFaqs.map((faq, index) => (
              <AccordionItem
                key={`right-${index}`}
                value={`right-item-${index}`}
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-[#324c9e]/30 transition-all duration-300 ease-in-out mb-4"
              >
                <AccordionTrigger className="px-4 py-3 text-left text-white transition-colors duration-300 hover:text-[#6B8AE6]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
             <AccordionItem
                key="right-gdpr"
                value="right-item-gdpr"
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-[#324c9e]/30 transition-all duration-300 ease-in-out mb-4"
              >
                <AccordionTrigger className="px-4 py-3 text-left text-white transition-colors duration-300 hover:text-[#6B8AE6]">
                  {gdprQuestion}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-400">
                  {gdprAnswer}
                  <a href='https://gdpr-info.eu/' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>
                    {language === 'nl' ? 'officiële GDPR-website' : 'official GDPR website'}
                  </a>.
                </AccordionContent>
              </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;