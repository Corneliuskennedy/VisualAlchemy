import React, { Suspense } from 'react';
import { Metadata } from 'next';

// Components for SME/Business Page
import LoadingFallback from '@/components/LoadingFallback';
import SectionDivider from '@/components/ui/SectionDivider';

// SME-specific sections
import SMEHeroSection from '@/components/sections/SMEHeroSection';
import SMEProfitLeakSection from '@/components/sections/SMEProfitLeakSection';
import SMETransformationSection from '@/components/sections/SMETransformationSection';
import SMEClientResultsSection from '@/components/sections/SMEClientResultsSection';
import SMEProcessSection from '@/components/sections/SMEProcessSection';
import SMEAuditConversionSection from '@/components/sections/SMEAuditConversionSection';

export const metadata: Metadata = {
  title: 'Business Automation - Save €50,000+ Through Smart Automation | Octomatic',
  description: 'Transform your established business with intelligent automation. Save €50,000+ annually, reclaim 20+ hours per week, and scale without operational chaos.',
  keywords: 'business automation, SME automation, process optimization, cost savings, operational efficiency, Dutch business automation, ROI guarantee',
  openGraph: {
    title: 'Business Automation - Save €50,000+ Through Smart Automation',
    description: 'Transform your established business with intelligent automation. Save €50,000+ annually and reclaim 20+ hours per week.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Automation - Save €50,000+ Through Smart Automation',
    description: 'Transform your established business with intelligent automation. Save €50,000+ annually and reclaim 20+ hours per week.',
  },
  alternates: {
    canonical: 'https://octomatic.nl/business-automation',
    languages: {
      'en': 'https://octomatic.nl/business-automation',
      'nl': 'https://octomatic.nl/nl/business-automation',
    },
  },
};

export default function BusinessAutomationPage() {
  return (
    <>
      <div className="min-h-screen relative">
        <main className="relative z-10" id="main-content">
          {/* SIMPLIFIED SME CONVERSION FUNNEL: Hero → Problem → Solution → Conversion */}
          
          {/* Section 1: SME Hero - Cost Savings & Efficiency Focus */}
          <SMEHeroSection />
          
          <SectionDivider variant="gradient" />
          
          {/* Section 2: Hidden Profit Leak - €67,560 loss, operational chaos */}
          <SMEProfitLeakSection />
          
          <SectionDivider variant="blue" />
          
          {/* Section 3: Client Results - Social proof with before/after */}
          <Suspense fallback={<LoadingFallback />}>
            <SMEClientResultsSection />
          </Suspense>
          
          <SectionDivider variant="gradient" />
          
          {/* Section 4: Free Process Audit - Single, clear conversion */}
          <SMEAuditConversionSection />
        </main>
      </div>
    </>
  );
}
