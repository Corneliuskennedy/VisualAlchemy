'use client';

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

    if (path.includes('/startup-kickoff-lab')) {
      return {
        heading: "Startup Kickoff Lab - From Idea to Paying Customers in 30 Days",
        description: "Skip the 18-month runway burn. Get to market validation and first revenue in 30 days with our proven MVP methodology.",
        keyPoints: [
          "30-Day MVP Operating System for Dutch founders",
          "Systematic customer discovery and validation framework",
          "Preserve 90% of runway while building smart",
          "From idea to first paying customers in 30 days",
          "Proven LEAN methodology with 78% success rate",
          "Join 47 Dutch founders who launched successfully"
        ]
      };
    }

    if (path.includes('/business-automation')) {
      return {
        heading: "Business Automation - Save €50,000+ Through Smart Automation",
        description: "Transform your established business with intelligent automation. Save €50,000+ annually and reclaim 20+ hours per week.",
        keyPoints: [
          "Complete Business Operating System Transformation",
          "€50,000+ annual savings through smart automation",
          "40-70% operational cost reduction guaranteed",
          "Reclaim 20+ hours per week for strategic work",
          "90-day implementation with zero business disruption",
          "ROI guarantee backed by measurable results"
        ]
      };
    }

    // Default content for homepage (new conversion-optimized version)
    return {
      heading: "Stop Losing Money to Operational Chaos",
      description: "Get €50,000+ back, reclaim 20+ hours per week, and scale without stress in just 30 days",
      keyPoints: [
        "€67,560 average annual loss from operational inefficiency",
        "23+ hours weekly time waste on manual, repetitive tasks", 
        "40% revenue impact from disconnected systems",
        "200+ Dutch companies transformed with 98% satisfaction",
        "ROI guaranteed or money back with 30-day implementation",
        "4-step proven methodology for scalable operating systems"
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
        <h3>The €67,560 Annual Leak Every Business Ignores</h3>
        <p>
          Dutch businesses lose an average of €67,560 annually to operational inefficiency. 
          That's not a typo—it's the hidden cost of running your business on manual processes, 
          disconnected systems, and reactive firefighting. Your team spends 23+ hours per week 
          on repetitive tasks that could be automated.
        </p>
        
        <h3>The 4-Step Operating System That Changes Everything</h3>
        <p>
          Our proven framework transforms any business into a scalable, automated machine. 
          In just 30 days, you'll have a complete operating system blueprint with ROI guarantee. 
          The question isn't whether it works—it's whether you'll implement it before your 
          competition does.
        </p>
        
        <h3>Trusted by 200+ Dutch Companies</h3>
        <p>
          From Amsterdam startups to Utrecht enterprises, businesses trust Octomatic to 
          transform their operations. Our clients save over €50,000 in their first year 
          and reclaim 20+ hours per week. 98% client satisfaction rate with proven results 
          since 2019.
        </p>
      </div>
    </div>
  );
};

export default CriticalContentPreloader; 