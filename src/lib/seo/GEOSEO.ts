/**
 * Generative Engine Optimization (GEO) - 2025 SEO Standard
 * 
 * Optimizes content for AI search engines (ChatGPT, Perplexity, etc.)
 * by structuring content for better AI citations and understanding.
 * 
 * Key Strategies:
 * - FAQ schema with clear answers
 * - Natural language patterns
 * - Conversational query optimization
 * - Citation-friendly formatting
 */

const BASE_URL = 'https://www.octomatic.ai';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ schema for GEO optimization
 * AI search engines use FAQ schema to provide direct answers
 * 
 * @param {FAQItem[]} faqs - Array of FAQ items
 * @param {string} pageUrl - URL of the page
 * @returns {object} FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[], pageUrl: string = BASE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Common FAQs for homepage (GEO optimization)
 */
export const homepageFAQs: FAQItem[] = [
  {
    question: "What does Octomatic do?",
    answer: "Octomatic is an AI automation agency in Amsterdam that helps businesses scale smarter with custom automation solutions. We specialize in workflow optimization, CRM implementation, and GDPR-compliant automation systems for Dutch SMEs and startups."
  },
  {
    question: "How much does AI automation cost?",
    answer: "Our services range from €4,500 for startup MVP sprints to €5,000+ for SME automation implementations. We also offer €1,500/month retainer services. All projects include a €15,000+ ROI guarantee for SME clients."
  },
  {
    question: "How long does automation implementation take?",
    answer: "Startup MVP sprints take 30 days. SME automation implementations typically take 60-90 days, with 70% manual work reduction achieved within the first 90 days."
  },
  {
    question: "Do you work with Dutch companies only?",
    answer: "We primarily serve Dutch SMEs and startups, with a focus on Amsterdam and the Netherlands. Our solutions are GDPR-compliant and optimized for the Dutch market."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern web technologies including Next.js, TypeScript, Cursor AI, and custom automation tools. Our solutions are built for scalability, performance, and compliance."
  }
];

/**
 * Service page FAQs (GEO optimization)
 */
export const serviceFAQs: FAQItem[] = [
  {
    question: "What is AI automation?",
    answer: "AI automation uses artificial intelligence and machine learning to automate repetitive business processes, reducing manual work by up to 70% while maintaining accuracy and compliance."
  },
  {
    question: "Is AI automation GDPR compliant?",
    answer: "Yes, all our automation solutions are designed with GDPR compliance from the ground up. We ensure data privacy, proper consent management, and compliance with Dutch and EU regulations."
  },
  {
    question: "Can automation integrate with existing systems?",
    answer: "Yes, our automation solutions integrate with popular CRM systems, project management tools, and custom business systems. We work with your existing infrastructure."
  },
  {
    question: "What ROI can I expect from automation?",
    answer: "Our SME clients typically see €50,000+ in annual savings through reduced manual work, improved efficiency, and better resource allocation. We offer a €15,000+ ROI guarantee."
  }
];

/**
 * Generate HowTo schema for process documentation (GEO optimization)
 * Helps AI search engines understand processes and workflows
 * 
 * @param {object} process - Process data
 * @returns {object} HowTo schema
 */
export function generateHowToSchema(process: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": process.name,
    "description": process.description,
    "step": process.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": {
          "@type": "ImageObject",
          "url": `${BASE_URL}${step.image}`
        }
      })
    }))
  };
}

/**
 * Generate Article schema optimized for AI citations
 * 
 * @param {object} article - Article data
 * @returns {object} Article schema
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Octomatic"
    },
    ...(article.image && {
      "image": {
        "@type": "ImageObject",
        "url": `${BASE_URL}${article.image}`
      }
    }),
    ...(article.wordCount && {
      "wordCount": article.wordCount
    })
  };
}


