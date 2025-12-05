'use client';

import React, { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Cookie, ArrowLeft } from 'lucide-react';
import GridBackground from '@/components/ui/GridBackground';

const CookiesPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Cookies Beleid' : 'Cookies Policy',
      titleNL: 'Cookies Beleid',
      href: isNL ? '/nl/cookies' : '/cookies',
      isCurrent: true
    }
  ];

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Cookies Beleid | Octomatic" : "Cookies Policy | Octomatic"}
        description={isNL ? "Lees ons cookies beleid om te begrijpen hoe wij cookies gebruiken op onze website." : "Read our cookies policy to understand how we use cookies on our website."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/cookies" : "https://www.octomatic.ai/cookies"}
        keywords={isNL ? "cookies beleid, privacy, website cookies" : "cookies policy, privacy, website cookies"}
        pageType="about"
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A] relative">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GridBackground className="pointer-events-none opacity-30" />
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="mb-8">
              <BreadcrumbStructured 
                items={breadcrumbItems} 
                pageType="about"
              />
            </div>

            <Button 
              variant="ghost" 
              asChild
              className="mb-8 hover:bg-secondary/20 group"
            >
              <Link href={isNL ? '/nl' : '/'}>
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {isNL ? 'Terug naar Home' : 'Back to Home'}
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                  <Cookie className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-medium text-sm">
                    {isNL ? "Cookies Beleid" : "Cookies Policy"}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {isNL ? "Cookies Beleid" : "Cookies Policy"}
                </h1>
                
                <p className="text-xl text-gray-300">
                  {isNL 
                    ? "Laatst bijgewerkt: 12 september 2025"
                    : "Last updated: September 12, 2025"
                  }
                </p>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isNL ? "Wat zijn cookies?" : "What are cookies?"}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {isNL 
                      ? "Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website bezoekt. Ze helpen ons om uw voorkeuren te onthouden en onze website te verbeteren."
                      : "Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences and improve our website."
                    }
                  </p>
                </div>

                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isNL ? "Welke cookies gebruiken wij?" : "What cookies do we use?"}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {isNL ? "Essentiële cookies" : "Essential cookies"}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {isNL 
                          ? "Deze cookies zijn noodzakelijk voor het functioneren van onze website, zoals het onthouden van uw taalvoorkeur en het mogelijk maken van formuliersubmissies."
                          : "These cookies are necessary for our website to function, such as remembering your language preference and enabling form submissions."
                        }
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {isNL ? "Analytische cookies" : "Analytics cookies"}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {isNL 
                          ? "We gebruiken Google Analytics en Vercel Analytics om te begrijpen hoe bezoekers onze website gebruiken. Deze gegevens helpen ons onze website te verbeteren."
                          : "We use Google Analytics and Vercel Analytics to understand how visitors use our website. This data helps us improve our website."
                        }
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {isNL ? "Functionele cookies" : "Functional cookies"}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {isNL 
                          ? "Deze cookies onthouden uw voorkeuren, zoals uw taalinstelling, om uw ervaring te personaliseren."
                          : "These cookies remember your preferences, such as your language setting, to personalize your experience."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isNL ? "Cookies beheren" : "Managing cookies"}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {isNL 
                      ? "U kunt cookies beheren via uw browserinstellingen. Houd er rekening mee dat het uitschakelen van bepaalde cookies de functionaliteit van onze website kan beïnvloeden."
                      : "You can manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website."
                    }
                  </p>
                  
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</p>
                    <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</p>
                    <p><strong>Safari:</strong> Preferences → Privacy → Cookies</p>
                    <p><strong>Edge:</strong> Settings → Cookies and site permissions</p>
                  </div>
                </div>

                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isNL ? "Derde partijen" : "Third parties"}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {isNL 
                      ? "Onze website gebruikt services van derde partijen zoals Cal.com voor het boeken van afspraken en n8n voor formulierverwerking. Deze services kunnen hun eigen cookies plaatsen volgens hun eigen privacybeleid."
                      : "Our website uses third-party services like Cal.com for appointment booking and n8n for form processing. These services may set their own cookies according to their own privacy policies."
                    }
                  </p>
                </div>

                <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isNL ? "Contact" : "Contact"}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {isNL 
                      ? "Als u vragen heeft over ons cookies beleid, kunt u contact met ons opnemen via "
                      : "If you have questions about our cookies policy, you can contact us at "
                    }
                    <a href="mailto:kennet@octomatic.ai" className="text-[#4585f4] hover:text-[#4585f4]/80 transition-colors">
                      kennet@octomatic.ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default CookiesPage;
