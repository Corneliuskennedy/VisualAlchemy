import React from 'react';
import { Helmet } from 'react-helmet-async';
import useLanguage from '@/contexts/LanguageContext';

interface EnhancedStructuredDataProps {
  pageType: 'homepage' | 'service' | 'blog' | 'about' | 'contact';
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  serviceData?: {
    name: string;
    description: string;
    priceRange?: string;
    serviceType?: string;
    areaServed?: string;
  };
  blogData?: {
    title: string;
    excerpt: string;
    publishedDate: string;
    modifiedDate?: string;
    author: string;
    tags?: string[];
    readingTime?: number;
    wordCount?: number;
  };
  organizationData?: {
    name: string;
    description: string;
    foundingDate: string;
    employeeCount: string;
  };
}

/**
 * Enhanced Structured Data component that provides comprehensive schema markup
 * for maximum SEO impact across all page types with 2025 best practices
 */
const EnhancedStructuredData: React.FC<EnhancedStructuredDataProps> = ({
  pageType,
  pageTitle,
  pageDescription,
  pageUrl,
  serviceData,
  blogData,
  organizationData
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  // Base organization schema
  const baseOrganization = {
    '@type': 'Organization',
    '@id': 'https://www.octomatic.ai/#organization',
    'name': 'Octomatic',
    'url': 'https://www.octomatic.ai',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://www.octomatic.ai/logo/octomatic-800.png',
      'width': 800,
      'height': 156
    },
    'description': isNL 
      ? 'Toonaangevend AI automatiseringsbureau in Amsterdam dat bedrijven helpt slimmer te schalen met aangepaste automatiseringsoplossingen.'
      : 'Leading AI automation agency in Amsterdam helping businesses scale smarter with custom automation solutions.',
    'foundingDate': '2020',
    'foundingLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Amsterdam',
        'addressCountry': 'Netherlands'
      }
    },
    'numberOfEmployees': '5-10',
    'slogan': isNL ? 'AI Automatisering die werkt' : 'AI Automation that works',
    'sameAs': [
      'https://www.linkedin.com/company/octomatic-ai/',
      'https://twitter.com/octomatic_ai',
      'https://www.facebook.com/octomatic.ai',
      'https://www.instagram.com/octomatic_ai'
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Herengracht 420',
      'addressLocality': 'Amsterdam',
      'addressRegion': 'Noord-Holland',
      'postalCode': '1017BZ',
      'addressCountry': 'NL'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+31-20-123-4567',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Dutch'],
      'areaServed': ['NL', 'EU'],
      'hoursAvailable': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '47',
      'bestRating': '5',
      'worstRating': '1'
    },
    'award': [
      isNL ? 'Top AI Automatiseringsbureau Amsterdam 2024' : 'Top AI Automation Agency Amsterdam 2024',
      isNL ? 'Beste Business Process Optimization 2024' : 'Best Business Process Optimization 2024'
    ]
  };

  // Generate schema based on page type
  const generateSchema = () => {
    switch (pageType) {
      case 'homepage':
        return {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://www.octomatic.ai/#website',
              'url': 'https://www.octomatic.ai',
              'name': 'Octomatic',
              'description': pageDescription,
              'publisher': { '@id': 'https://www.octomatic.ai/#organization' },
              'potentialAction': {
                '@type': 'SearchAction',
                'target': 'https://www.octomatic.ai/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              'inLanguage': isNL ? 'nl-NL' : 'en-US'
            },
            baseOrganization,
            {
              '@type': 'LocalBusiness',
              '@id': 'https://www.octomatic.ai/#localbusiness',
              'parentOrganization': { '@id': 'https://www.octomatic.ai/#organization' },
              'name': 'Octomatic Amsterdam',
              'image': 'https://www.octomatic.ai/logo/octomatic-800.png',
              'url': 'https://www.octomatic.ai',
              'telephone': '+31-20-123-4567',
              'email': 'hello@octomatic.ai',
              'address': baseOrganization.address,
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': 52.3676,
                'longitude': 4.9041
              },
              'openingHoursSpecification': [
                {
                  '@type': 'OpeningHoursSpecification',
                  'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  'opens': '09:00',
                  'closes': '17:00'
                }
              ],
              'priceRange': '€€€',
              'aggregateRating': baseOrganization.aggregateRating,
              'hasOfferCatalog': {
                '@type': 'OfferCatalog',
                'name': isNL ? 'AI Automatisering Diensten' : 'AI Automation Services',
                'itemListElement': [
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': isNL ? 'AI Automatisering Consulting' : 'AI Automation Consulting',
                      'description': isNL 
                        ? 'Aangepaste AI automatiseringsoplossingen voor bedrijfsproces optimalisatie'
                        : 'Custom AI automation solutions for business process optimization'
                    }
                  },
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': isNL ? 'CRM Implementatie' : 'CRM Implementation',
                      'description': isNL 
                        ? 'Verkoop systeem buildouts die schalen zoals 8-cijferige organisaties'
                        : 'Sales system buildouts that scale like 8-figure organizations'
                    }
                  },
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': isNL ? 'Workflow Optimalisatie' : 'Workflow Optimization',
                      'description': isNL 
                        ? 'Proces automatisering en workflow stroomlijning diensten'
                        : 'Process automation and workflow streamlining services'
                    }
                  }
                ]
              }
            }
          ]
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          'serviceType': serviceData?.serviceType || 'AI Automation Consulting',
          'provider': baseOrganization,
          'name': serviceData?.name || pageTitle.split('|')[0].trim(),
          'description': serviceData?.description || pageDescription,
          'url': pageUrl,
          'areaServed': serviceData?.areaServed ? [
            {
              '@type': 'Place',
              'name': serviceData.areaServed
            }
          ] : [
            {
              '@type': 'City',
              'name': 'Amsterdam'
            },
            {
              '@type': 'Country',
              'name': 'Netherlands'
            }
          ],
          'offers': {
            '@type': 'Offer',
            'availability': 'https://schema.org/InStock',
            'priceCurrency': 'EUR',
            'priceRange': serviceData?.priceRange || '€€€',
            'validFrom': '2020-01-01',
            'seller': { '@id': 'https://www.octomatic.ai/#organization' }
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '47',
            'bestRating': '5'
          },
          'category': 'Business Process Automation',
          'serviceOutput': {
            '@type': 'Thing',
            'name': isNL ? 'Geoptimaliseerde Bedrijfsprocessen' : 'Optimized Business Processes'
          }
        };

      case 'blog':
        const publishedDate = blogData?.publishedDate ? new Date(blogData.publishedDate).toISOString() : new Date().toISOString();
        const modifiedDate = blogData?.modifiedDate ? new Date(blogData.modifiedDate).toISOString() : publishedDate;
        
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': pageUrl
          },
          'headline': blogData?.title || pageTitle,
          'description': blogData?.excerpt || pageDescription,
          'image': {
            '@type': 'ImageObject',
            'url': 'https://www.octomatic.ai/octomatic-image-2025.png',
            'width': 1200,
            'height': 630
          },
          'author': {
            '@type': 'Person',
            'name': blogData?.author || 'Kennet Timmers',
            'url': 'https://www.octomatic.ai/about',
            'jobTitle': 'CEO & AI Automation Expert',
            'worksFor': { '@id': 'https://www.octomatic.ai/#organization' }
          },
          'publisher': baseOrganization,
          'datePublished': publishedDate,
          'dateModified': modifiedDate,
          'inLanguage': isNL ? 'nl-NL' : 'en-US',
          'keywords': blogData?.tags?.join(', ') || 'AI automation, business process optimization',
          'wordCount': blogData?.wordCount || 1200,
          'timeRequired': `PT${blogData?.readingTime || Math.ceil((blogData?.wordCount || 1200) / 200)}M`,
          'articleSection': 'AI Automation',
          'about': {
            '@type': 'Thing',
            'name': isNL ? 'AI Automatisering voor Nederlandse Bedrijven' : 'AI Automation for Dutch Businesses'
          },
          'isPartOf': {
            '@type': 'Blog',
            'name': 'Octomatic Blog',
            'url': 'https://www.octomatic.ai/blog'
          }
        };

      case 'about':
        return {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'mainEntity': {
            ...baseOrganization,
            'knowsAbout': [
              'AI Automation',
              'Business Process Optimization',
              'CRM Implementation',
              'Workflow Automation',
              'Lead Generation Automation',
              'Project Management Automation'
            ],
            'memberOf': [
              {
                '@type': 'Organization',
                'name': 'Amsterdam Chamber of Commerce',
                'url': 'https://www.kvk.nl'
              }
            ],
            'hasCredential': [
              {
                '@type': 'EducationalOccupationalCredential',
                'name': 'AI & Machine Learning Certification',
                'credentialCategory': 'Professional Certification'
              }
            ]
          },
          'url': pageUrl,
          'name': pageTitle,
          'description': pageDescription,
          'inLanguage': isNL ? 'nl-NL' : 'en-US'
        };

      case 'contact':
        return {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'url': pageUrl,
          'name': pageTitle,
          'description': pageDescription,
          'mainEntity': {
            '@type': 'ContactPoint',
            'telephone': '+31-20-123-4567',
            'email': 'hello@octomatic.ai',
            'contactType': 'customer service',
            'availableLanguage': ['English', 'Dutch'],
            'areaServed': ['NL', 'EU'],
            'hoursAvailable': {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              'opens': '09:00',
              'closes': '17:00'
            }
          },
          'inLanguage': isNL ? 'nl-NL' : 'en-US'
        };

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'url': pageUrl,
          'name': pageTitle,
          'description': pageDescription,
          'publisher': baseOrganization,
          'inLanguage': isNL ? 'nl-NL' : 'en-US'
        };
    }
  };

  const schema = generateSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default EnhancedStructuredData; 