'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Suspense } from 'react';

const TermsOfServicePage = () => {
  const { language, t } = useTranslations();
  const isNL = language === 'nl';

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Gebruiksvoorwaarden' : 'Terms of Service',
      titleNL: 'Gebruiksvoorwaarden',
      href: isNL ? '/nl/terms-of-service' : '/terms-of-service',
      isCurrent: true
    }
  ];

  // Define basic descriptions
  const metaDescriptionEN = "Review the terms of service for using Octomatic AI Automation services.";
  const metaDescriptionNL = "Bekijk de gebruiksvoorwaarden voor het gebruik van Octomatic AI Automatisering diensten.";

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Gebruiksvoorwaarden | Octomatic" : "Terms of Service | Octomatic"}
        description={isNL ? metaDescriptionNL : metaDescriptionEN}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/terms-of-service" : "https://www.octomatic.ai/terms-of-service"}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-8">
              <BreadcrumbStructured 
                items={breadcrumbItems} 
                pageType="about"
              />
            </div>

            {/* Back Button */}
            <Button 
              variant="ghost" 
              asChild
              className="mb-8 hover:bg-secondary/20 group"
            >
              <Link href={isNL ? '/nl' : '/'}>
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {t('navigation', 'menu.back')}
              </Link>
            </Button>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <h1 className="text-4xl font-bold mb-8">
                {isNL ? 'Gebruiksvoorwaarden' : 'Terms of Service'}
              </h1>

              <p className="text-gray-300 mb-8">
                {isNL 
                  ? 'Laatst bijgewerkt: 1 januari 2025'
                  : 'Last updated: January 1, 2025'
                }
              </p>

              {isNL ? (
                <>
                  <h2>1. Acceptatie van Voorwaarden</h2>
                  <p>
                    Door toegang te krijgen tot en gebruik te maken van de diensten van Octomatic, 
                    gaat u akkoord met deze gebruiksvoorwaarden. Als u niet akkoord gaat met deze voorwaarden, 
                    mag u onze diensten niet gebruiken.
                  </p>

                  <h2>2. Beschrijving van Diensten</h2>
                  <p>
                    Octomatic biedt AI-automatiseringsoplossingen en consultancydiensten voor bedrijven. 
                    Onze diensten omvatten maar zijn niet beperkt tot procesoptimalisatie, 
                    automatisering van workflows en strategische consultancy.
                  </p>

                  <h2>3. Gebruikersverantwoordelijkheden</h2>
                  <p>U stemt ermee in om:</p>
                  <ul>
                    <li>Onze diensten alleen te gebruiken voor wettige doeleinden</li>
                    <li>Accurate en volledige informatie te verstrekken</li>
                    <li>De intellectuele eigendomsrechten van Octomatic te respecteren</li>
                    <li>Geen activiteiten te ondernemen die onze diensten kunnen schaden</li>
                  </ul>

                  <h2>4. Intellectueel Eigendom</h2>
                  <p>
                    Alle content, software, en materialen die beschikbaar zijn via onze diensten 
                    zijn eigendom van Octomatic of onze licentiegevers en worden beschermd door 
                    intellectuele eigendomswetten.
                  </p>

                  <h2>5. Beperking van Aansprakelijkheid</h2>
                  <p>
                    Octomatic is niet aansprakelijk voor enige indirecte, incidentele, 
                    speciale of gevolgschade die voortvloeit uit uw gebruik van onze diensten.
                  </p>

                  <h2>6. Wijzigingen in Voorwaarden</h2>
                  <p>
                    Wij behouden ons het recht voor om deze voorwaarden op elk moment te wijzigen. 
                    Wijzigingen worden van kracht zodra ze op onze website worden geplaatst.
                  </p>

                  <h2>7. Contact</h2>
                  <p>
                    Voor vragen over deze gebruiksvoorwaarden, neem contact met ons op via:
                  </p>
                  <p>
                    E-mail: legal@octomatic.ai<br />
                    Adres: Nederland
                  </p>
                </>
              ) : (
                <>
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using Octomatic's services, you agree to these terms of service. 
                    If you do not agree to these terms, you may not use our services.
                  </p>

                  <h2>2. Description of Services</h2>
                  <p>
                    Octomatic provides AI automation solutions and consulting services for businesses. 
                    Our services include but are not limited to process optimization, 
                    workflow automation, and strategic consulting.
                  </p>

                  <h2>3. User Responsibilities</h2>
                  <p>You agree to:</p>
                  <ul>
                    <li>Use our services only for lawful purposes</li>
                    <li>Provide accurate and complete information</li>
                    <li>Respect Octomatic's intellectual property rights</li>
                    <li>Not engage in activities that could harm our services</li>
                  </ul>

                  <h2>4. Intellectual Property</h2>
                  <p>
                    All content, software, and materials available through our services 
                    are owned by Octomatic or our licensors and are protected by 
                    intellectual property laws.
                  </p>

                  <h2>5. Limitation of Liability</h2>
                  <p>
                    Octomatic shall not be liable for any indirect, incidental, 
                    special, or consequential damages arising from your use of our services.
                  </p>

                  <h2>6. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. 
                    Changes will be effective immediately upon posting on our website.
                  </p>

                  <h2>7. Contact</h2>
                  <p>
                    For questions about these terms of service, please contact us at:
                  </p>
                  <p>
                    Email: legal@octomatic.ai<br />
                    Address: Netherlands
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default TermsOfServicePage;

