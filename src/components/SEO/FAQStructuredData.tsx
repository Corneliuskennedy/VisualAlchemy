import React from 'react';
import { Helmet } from 'react-helmet-async';
import useLanguage from '@/contexts/LanguageContext';

// Define the FAQ item structure
interface FAQItem {
  question: string;
  answer: string;
  questionNL?: string; // Dutch version of the question
  answerNL?: string;   // Dutch version of the answer
}

interface FAQStructuredDataProps {
  questions: FAQItem[];
  pageTitle: string;
  pageUrl: string;
  isLocalBusiness?: boolean;
}

/**
 * FAQStructuredData component that generates JSON-LD structured data for FAQ pages.
 * Enhanced to support Amsterdam-specific questions and Dutch translations.
 */
const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({
  questions,
  pageTitle,
  pageUrl,
  isLocalBusiness = false
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  // Generate the structured data items
  const faqItems = questions.map((item) => ({
    '@type': 'Question',
    'name': isNL && item.questionNL ? item.questionNL : item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': isNL && item.answerNL ? item.answerNL : item.answer
    }
  }));

  // Create the basic FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems
  };

  // If it's for a local business page, add additional Amsterdam-specific context
  const localBusinessExtension = isLocalBusiness ? {
    'isPartOf': {
      '@type': 'WebPage',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Octomatic',
        'url': 'https://www.octomatic.ai'
      },
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@id': 'https://www.octomatic.ai',
              'name': 'Home'
            }
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@id': 'https://www.octomatic.ai/services/',
              'name': 'Services'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@id': pageUrl,
              'name': pageTitle
            }
          }
        ]
      },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', 'h2', '.faq-question']
      }
    }
  } : {};

  // Combine the base schema with any extensions
  const finalSchema = {
    ...faqSchema,
    ...localBusinessExtension
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default FAQStructuredData; 