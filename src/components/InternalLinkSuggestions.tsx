import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';

interface InternalLink {
  url: string;
  title: string;
  description: string;
  type: 'pillar' | 'cluster' | 'related';
  priority: 'high' | 'medium' | 'low';
}

interface InternalLinkSuggestionsProps {
  currentPage: string;
  topic?: string;
  className?: string;
}

export const InternalLinkSuggestions: React.FC<InternalLinkSuggestionsProps> = ({
  currentPage,
  topic,
  className = ''
}) => {
  // Define our internal link structure for topical authority
  const linkDatabase: Record<string, InternalLink[]> = {
    'homepage': [
      {
        url: '/services/ai-automation-amsterdam',
        title: 'AI Automation Services Amsterdam',
        description: 'Comprehensive AI automation solutions for Amsterdam businesses',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'AI Automation Services',
        description: 'Complete range of AI automation services and solutions',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/blog/ai-automation-predictions-2025',
        title: 'AI Automation Predictions 2025',
        description: 'Expert insights on AI automation trends for Dutch businesses',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/blog/beyond-zapier-dutch-businesses',
        title: 'Beyond Zapier for Dutch Businesses',
        description: 'Advanced automation alternatives for Dutch companies',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/checklist',
        title: 'Free AI Automation Checklist',
        description: 'Complete checklist for implementing AI automation',
        type: 'related',
        priority: 'medium'
      },
      {
        url: '/contact',
        title: 'Get Your Free Automation Assessment',
        description: 'Schedule a consultation for your automation needs',
        type: 'related',
        priority: 'low'
      }
    ],
    'services': [
      {
        url: '/',
        title: 'Octomatic AI Automation Platform',
        description: 'Complete AI automation solutions for Dutch businesses',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services/ai-automation-amsterdam',
        title: 'Amsterdam AI Automation Services',
        description: 'Local AI automation expertise for Amsterdam companies',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'Professional AI Development',
        description: 'Expert AI solutions for complex business requirements',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/blog',
        title: 'AI Automation Insights',
        description: 'Latest trends and best practices in business automation',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/checklist',
        title: 'Automation Readiness Checklist',
        description: 'Assess your business automation readiness',
        type: 'related',
        priority: 'medium'
      }
    ],
    'blog': [
      {
        url: '/',
        title: 'Octomatic AI Automation',
        description: 'Enterprise AI automation solutions',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'AI Automation Services',
        description: 'Complete range of automation services',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services/ai-automation-amsterdam',
        title: 'Amsterdam AI Services',
        description: 'Local AI automation for Amsterdam businesses',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/blog/ai-automation-predictions-2025',
        title: '2025 AI Predictions',
        description: 'Future of AI automation in Dutch business',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/blog/beyond-zapier-dutch-businesses',
        title: 'Beyond Zapier Solutions',
        description: 'Advanced automation platforms comparison',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/checklist',
        title: 'Free Automation Assessment',
        description: 'Evaluate your automation opportunities',
        type: 'related',
        priority: 'medium'
      }
    ],
    'contact': [
      {
        url: '/',
        title: 'Octomatic AI Solutions',
        description: 'Leading AI automation provider for Dutch businesses',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'Our Automation Services',
        description: 'Comprehensive AI automation service portfolio',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services/ai-automation-amsterdam',
        title: 'Amsterdam Services',
        description: 'Specialized AI automation for Amsterdam market',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/blog',
        title: 'Automation Insights',
        description: 'Expert guidance on AI automation implementation',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/checklist',
        title: 'Get Started Checklist',
        description: 'Your automation implementation roadmap',
        type: 'related',
        priority: 'medium'
      }
    ],
    'amsterdam-services': [
      {
        url: '/',
        title: 'Octomatic Netherlands',
        description: 'Dutch market leader in AI automation solutions',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'Complete Service Portfolio',
        description: 'Full range of AI automation services',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/services',
        title: 'Enterprise AI Solutions',
        description: 'Professional AI automation for Amsterdam enterprises',
        type: 'pillar',
        priority: 'high'
      },
      {
        url: '/blog/ai-automation-predictions-2025',
        title: 'Amsterdam AI Trends 2025',
        description: 'Local market insights and automation forecasts',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/blog/beyond-zapier-dutch-businesses',
        title: 'Dutch Business Automation',
        description: 'Automation strategies for Dutch companies',
        type: 'cluster',
        priority: 'medium'
      },
      {
        url: '/contact',
        title: 'Amsterdam Consultation',
        description: 'Book your local automation assessment',
        type: 'related',
        priority: 'medium'
      }
    ]
  };

  // Get relevant links for current page
  const getRelevantLinks = (): InternalLink[] => {
    let pageKey = 'homepage';
    
    if (currentPage.includes('/services') && currentPage.includes('amsterdam')) {
      pageKey = 'amsterdam-services';
    } else if (currentPage.includes('/services')) {
      pageKey = 'services';
    } else if (currentPage.includes('/blog')) {
      pageKey = 'blog';
    } else if (currentPage.includes('/contact')) {
      pageKey = 'contact';
    }

    const links = linkDatabase[pageKey] || linkDatabase['homepage'];
    
    // Filter out current page and ensure we have at least 15 links for topical authority
    const filteredLinks = links.filter(link => link.url !== currentPage);
    
    // If we don't have enough links, add more from other categories
    if (filteredLinks.length < 15) {
      const additionalLinks = Object.values(linkDatabase)
        .flat()
        .filter(link => 
          link.url !== currentPage && 
          !filteredLinks.find(existing => existing.url === link.url)
        )
        .slice(0, 15 - filteredLinks.length);
      
      filteredLinks.push(...additionalLinks);
    }

    return filteredLinks.slice(0, 15); // Ensure exactly 15 links for optimal topical authority
  };

  const relevantLinks = getRelevantLinks();

  // Group links by type for better organization
  const pillarLinks = relevantLinks.filter(link => link.type === 'pillar');
  const clusterLinks = relevantLinks.filter(link => link.type === 'cluster');
  const relatedLinks = relevantLinks.filter(link => link.type === 'related');

  const renderLinkGroup = (links: InternalLink[], title: string, icon: React.ReactNode) => {
    if (links.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
          {icon}
          {title}
        </h4>
        <div className="space-y-2">
          {links.map((link, index) => (
            <Link
              key={`${link.url}-${index}`}
              href={link.url}
              className="group block p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-[#4585f4]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-white group-hover:text-[#4585f4] transition-colors line-clamp-1">
                    {link.title}
                  </h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#4585f4] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // Get the most relevant and actually working services
  const coreServices = [
    {
      title: 'Amsterdam AI Automation',
      url: '/services/ai-automation-amsterdam',
      description: 'Local AI automation services for Dutch businesses'
    },
    {
      title: 'Lead Generation',
      url: '/services/lead-generation', 
      description: 'Automate your lead generation and qualification'
    },
    {
      title: 'AI Service Fulfillment',
      url: '/services/ai-service-fulfillment',
      description: 'Automate your service delivery processes'
    },
    {
      title: 'Free Assessment',
      url: '/contact',
      description: 'Get your free automation assessment'
    }
  ];

  return (
    <div className={`internal-links-section ${className}`}>
      <div className="border-t border-gray-800/30 pt-8 mt-8">
        <h3 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">
          Related Services
        </h3>
        
        {/* Two minimal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Popular Services Card */}
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
            <h4 className="text-white font-medium mb-3 text-sm">Most Popular</h4>
            <div className="space-y-2">
              {coreServices.slice(0, 2).map((service, index) => (
                <Link
                  key={index}
                  href={service.url}
                  className="block text-gray-300 hover:text-[#4585f4] transition-colors text-sm"
                  title={service.description}
                >
                  → {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Services Card */}
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
            <h4 className="text-white font-medium mb-3 text-sm">Also Available</h4>
            <div className="space-y-2">
              {coreServices.slice(2, 4).map((service, index) => (
                <Link
                  key={index}
                  href={service.url}
                  className="block text-gray-300 hover:text-[#4585f4] transition-colors text-sm"
                  title={service.description}
                >
                  → {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Minimal SEO footer */}
        <div className="text-center">
          <p className="text-xs text-gray-600">
            AI Automation • Dutch Business Solutions • GDPR Compliance • Amsterdam Services
          </p>
        </div>
      </div>
    </div>
  );
}; 