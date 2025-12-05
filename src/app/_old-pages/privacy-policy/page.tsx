'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { Suspense } from 'react';

const PrivacyPolicyPage = () => {
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
      title: isNL ? 'Privacybeleid' : 'Privacy Policy',
      titleNL: 'Privacybeleid',
      href: isNL ? '/nl/privacy-policy' : '/privacy-policy',
      isCurrent: true
    }
  ];

  const metaDescriptionEN = "Read the privacy policy for Octomatic AI Automation Agency, detailing data handling.";
  const metaDescriptionNL = "Lees het privacybeleid van Octomatic AI Automatisering Bureau over gegevensverwerking.";

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "Privacybeleid | Octomatic" : "Privacy Policy | Octomatic"}
        description={isNL ? metaDescriptionNL : metaDescriptionEN}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/privacy-policy" : "https://www.octomatic.ai/privacy-policy"}
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
                {isNL ? 'Privacybeleid' : 'Privacy Policy'}
              </h1>

              <p className="text-gray-300 mb-8">
                {isNL 
                  ? 'Laatst bijgewerkt: 1 januari 2025'
                  : 'Last updated: January 1, 2025'
                }
              </p>

              {isNL ? (
                <>
                  <h2>1. Inleiding</h2>
                  <p>
                    Octomatic ("wij", "ons", "onze") respecteert uw privacy en zet zich in voor het beschermen van uw persoonlijke gegevens. 
                    Dit privacybeleid informeert u over hoe wij omgaan met uw persoonlijke gegevens wanneer u onze website bezoekt 
                    en vertelt u over uw privacyrechten.
                  </p>

                  <h2>2. Gegevens die wij verzamelen</h2>
                  <p>Wij kunnen de volgende categorieën persoonlijke gegevens over u verzamelen:</p>
                  <ul>
                    <li><strong>Identiteitsgegevens:</strong> naam, gebruikersnaam of vergelijkbare identificatie</li>
                    <li><strong>Contactgegevens:</strong> e-mailadres en telefoonnummers</li>
                    <li><strong>Technische gegevens:</strong> IP-adres, browsertype en -versie, tijdzone-instelling</li>
                    <li><strong>Gebruiksgegevens:</strong> informatie over hoe u onze website gebruikt</li>
                  </ul>

                  <h2>3. Hoe wij uw gegevens gebruiken</h2>
                  <p>Wij gebruiken uw persoonlijke gegevens voor:</p>
                  <ul>
                    <li>Het leveren van onze diensten aan u</li>
                    <li>Het verwerken van uw aanvragen en vragen</li>
                    <li>Het verbeteren van onze website en diensten</li>
                    <li>Communicatie met u over onze diensten</li>
                  </ul>

                  <h2>4. Gegevensdeling</h2>
                  <p>
                    Wij verkopen, verhandelen of verhuren uw persoonlijke informatie niet aan derden. 
                    Wij kunnen uw informatie delen met vertrouwde partners die ons helpen bij het exploiteren van onze website 
                    of het uitvoeren van ons bedrijf, zolang deze partijen ermee instemmen deze informatie vertrouwelijk te houden.
                  </p>

                  <h2>5. Gegevensbeveiliging</h2>
                  <p>
                    Wij hebben passende beveiligingsmaatregelen getroffen om te voorkomen dat uw persoonlijke gegevens 
                    per ongeluk verloren gaan, gebruikt of geraadpleegd worden op een ongeautoriseerde manier.
                  </p>

                  <h2>6. Uw rechten</h2>
                  <p>Onder bepaalde omstandigheden heeft u rechten onder de gegevensbeschermingswetten met betrekking tot uw persoonlijke gegevens:</p>
                  <ul>
                    <li>Recht op toegang tot uw persoonlijke gegevens</li>
                    <li>Recht op rectificatie van uw persoonlijke gegevens</li>
                    <li>Recht op wissing van uw persoonlijke gegevens</li>
                    <li>Recht op beperking van verwerking van uw persoonlijke gegevens</li>
                    <li>Recht op overdraagbaarheid van gegevens</li>
                    <li>Recht van bezwaar tegen verwerking</li>
                  </ul>

                  <h2>7. Contact</h2>
                  <p>
                    Als u vragen heeft over dit privacybeleid of onze privacypraktijken, neem dan contact met ons op via:
                  </p>
                  <p>
                    E-mail: privacy@octomatic.ai<br />
                    Adres: Nederland
                  </p>
                </>
              ) : (
                <>
                  <h2>1. Introduction</h2>
                  <p>
                    Octomatic ("we", "us", "our") respects your privacy and is committed to protecting your personal data. 
                    This privacy policy informs you about how we handle your personal data when you visit our website 
                    and tells you about your privacy rights.
                  </p>

                  <h2>2. Data We Collect</h2>
                  <p>We may collect the following categories of personal data about you:</p>
                  <ul>
                    <li><strong>Identity Data:</strong> name, username or similar identifier</li>
                    <li><strong>Contact Data:</strong> email address and telephone numbers</li>
                    <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting</li>
                    <li><strong>Usage Data:</strong> information about how you use our website</li>
                  </ul>

                  <h2>3. How We Use Your Data</h2>
                  <p>We use your personal data to:</p>
                  <ul>
                    <li>Provide our services to you</li>
                    <li>Process your requests and inquiries</li>
                    <li>Improve our website and services</li>
                    <li>Communicate with you about our services</li>
                  </ul>

                  <h2>4. Data Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. 
                    We may share your information with trusted partners who assist us in operating our website 
                    or conducting our business, so long as those parties agree to keep this information confidential.
                  </p>

                  <h2>5. Data Security</h2>
                  <p>
                    We have put in place appropriate security measures to prevent your personal data from being 
                    accidentally lost, used or accessed in an unauthorized way.
                  </p>

                  <h2>6. Your Rights</h2>
                  <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
                  <ul>
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of your personal data</li>
                    <li>Right to erasure of your personal data</li>
                    <li>Right to restrict processing of your personal data</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                  </ul>

                  <h2>7. Contact</h2>
                  <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                  </p>
                  <p>
                    Email: privacy@octomatic.ai<br />
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

export default PrivacyPolicyPage;


