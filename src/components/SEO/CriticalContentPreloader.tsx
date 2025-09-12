import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';

interface CriticalContentPreloaderProps {
  className?: string;
}

const CriticalContentPreloader: React.FC<CriticalContentPreloaderProps> = ({ 
  className = 'sr-only' 
}) => {
  const pathname = usePathname();
  const { getSection, language } = useTranslations();

  // Get critical content sections
  const heroSection = getSection('hero');
  const benefitsSection = getSection('benefits');
  const servicesSection = getSection('services');

  // Generate critical content based on current path
  const getCriticalContent = () => {
    const path = pathname;
    
    if (path === '/' || path === '/nl') {
      return {
        heading: `${heroSection.title1} ${heroSection.title2}`,
        description: heroSection.subtitle,
        keyPoints: [
          benefitsSection.headerDescription,
          servicesSection.subtitle,
          "Custom AI automation solutions for Dutch businesses",
          "GDPR-compliant workflow optimization and process automation",
          "Expert-led implementation with proven ROI results",
          "Scalable business process automation without additional hiring"
        ]
      };
    }

    if (path.includes('/services')) {
      return {
        heading: "AI Automation Services",
        description: "Comprehensive automation solutions for business optimization",
        keyPoints: [
          "Custom AI workflow automation and process optimization",
          "GDPR-compliant data processing and business intelligence",
          "ROI consulting and automation investment planning",
          "Service fulfillment automation and customer experience enhancement",
          "Standard Operating Procedures (SOP) development and optimization",
          "End-to-end implementation with expert guidance and support"
        ]
      };
    }

    if (path.includes('/blog')) {
      return {
        heading: "AI Automation Insights & Best Practices",
        description: "Expert insights on business automation and digital transformation",
        keyPoints: [
          "Latest trends in AI automation and business process optimization",
          "Case studies and success stories from Dutch business implementations",
          "Best practices for GDPR-compliant automation solutions",
          "ROI analysis and automation investment strategies",
          "Industry-specific automation solutions and workflow optimization",
          "Expert guidance on scaling businesses with intelligent automation"
        ]
      };
    }

    // Default content for other pages
    return {
      heading: "AI Automation Solutions",
      description: "Transform your business with intelligent automation",
      keyPoints: [
        "Professional AI automation services for business optimization",
        "Custom workflow solutions designed for your specific needs",
        "GDPR-compliant implementation with data privacy focus",
        "Expert consultation and ongoing support for automation success"
      ]
    };
  };

  const content = getCriticalContent();

  return (
    <div className={className} aria-hidden="true">
      <h2>{content.heading}</h2>
      <p>{content.description}</p>
      <div>
        {content.keyPoints.map((point, index) => (
          <p key={index}>{point}</p>
        ))}
      </div>
      
      {/* Additional SEO-friendly content */}
      <div>
        <h3>Why Choose Octomatic for AI Automation</h3>
        <p>
          Octomatic specializes in helping Dutch businesses scale efficiently through 
          intelligent automation solutions. Our expert team combines deep technical 
          knowledge with business process optimization to deliver measurable results. 
          We focus on GDPR-compliant implementations that respect data privacy while 
          maximizing operational efficiency.
        </p>
        
        <h3>Our Automation Approach</h3>
        <p>
          We begin every project with a comprehensive analysis of your current workflows 
          and business processes. Our value stream mapping workshop identifies key 
          optimization opportunities, followed by custom automation development that 
          integrates seamlessly with your existing systems. This methodical approach 
          ensures maximum ROI and sustainable business growth.
        </p>
        
        <h3>Proven Results for Dutch Businesses</h3>
        <p>
          Our clients typically see 40-70% reduction in operational costs, significant 
          time savings on repetitive tasks, and improved accuracy in business processes. 
          We work with companies across various industries in Amsterdam and throughout 
          the Netherlands, delivering automation solutions that drive real business value.
        </p>
      </div>
    </div>
  );
};

export default CriticalContentPreloader; 