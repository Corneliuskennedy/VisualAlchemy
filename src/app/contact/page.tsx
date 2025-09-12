'use client';

import { useEffect, Suspense } from "react";
import { BackButton } from "@/components/contact/BackButton";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { useTranslations } from '@/hooks/useTranslations';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';

const ContactPage = () => {
  const { t, language } = useTranslations();
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
      title: isNL ? 'Contact' : 'Contact',
      titleNL: 'Contact',
      href: isNL ? '/nl/contact' : '/contact',
      isCurrent: true
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const metaTitle = t('contactPage', 'metaTitle');
  const metaDescription = t('contactPage', 'metaDescription');
  const h1Content = t('contactPage', 'title');

  return (
    <>
      <UnifiedSEO 
        title={metaTitle}
        description={metaDescription}
        h1={h1Content}
      />
      
      {/* Hidden form for Netlify form detection */}
      <form 
        name="contact-form" 
        data-netlify="true" 
        hidden
      >
        <input type="text" name="firstName" autoComplete="given-name" />
        <input type="text" name="lastName" autoComplete="family-name" />
        <input type="email" name="email" autoComplete="email" />
        <input type="text" name="companyName" autoComplete="organization" />
        <select name="companySize" autoComplete="organization-title">
          <option value="micro">1-9 employees</option>
          <option value="small">10-49 employees</option>
          <option value="medium">50-249 employees</option>
          <option value="large">250+ employees</option>
        </select>
        <textarea name="message" autoComplete="off"></textarea>
        <input type="text" name="preferredLanguage" autoComplete="language" />
      </form>
      
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="container mx-auto px-4 py-24 max-w-5xl">
          {/* Add Breadcrumb */}
          <div className="mb-8">
            <BreadcrumbStructured 
              items={breadcrumbItems} 
              pageType="contact"
            />
          </div>
          
          <BackButton />
          <div className="space-y-8 mt-8">
            <ContactHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default ContactPage;
