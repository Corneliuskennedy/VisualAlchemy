import React, { Suspense } from 'react';
import { Metadata } from 'next';

// Components for Startup Page
import LoadingFallback from '@/components/LoadingFallback';
import SectionDivider from '@/components/ui/SectionDivider';

// Startup-specific sections
import StartupHeroSection from '@/components/sections/StartupHeroSection';
import StartupFoundersDilemmaSection from '@/components/sections/StartupFoundersDilemmaSection';
import StartupMVPSystemSection from '@/components/sections/StartupMVPSystemSection';
import StartupFounderStoriesSection from '@/components/sections/StartupFounderStoriesSection';
import StartupPricingSection from '@/components/sections/StartupPricingSection';
import StartupKickoffWorkshopSection from '@/components/sections/StartupKickoffWorkshopSection';
import StartupBookingConversionSection from '@/components/sections/StartupBookingConversionSection';

export const metadata: Metadata = {
  title: 'Startup Kickoff Lab - From Idea to Paying Customers in 30 Days | Octomatic',
  description: 'Transform your startup idea into a validated MVP with paying customers in just 30 days. Our proven LEAN framework helps Dutch founders build systematic operations from day one.',
  keywords: 'startup MVP, 30-day validation, startup kickoff, lean startup, Dutch startups, MVP development, startup automation, founder workshop',
  openGraph: {
    title: 'Startup Kickoff Lab - From Idea to Paying Customers in 30 Days',
    description: 'Transform your startup idea into a validated MVP with paying customers in just 30 days.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Kickoff Lab - From Idea to Paying Customers in 30 Days',
    description: 'Transform your startup idea into a validated MVP with paying customers in just 30 days.',
  },
  alternates: {
    canonical: 'https://octomatic.nl/startup-kickoff-lab',
    languages: {
      'en': 'https://octomatic.nl/startup-kickoff-lab',
      'nl': 'https://octomatic.nl/nl/startup-kickoff-lab',
    },
  },
};

export default function StartupKickoffLabPage() {
  return (
    <>
      <div className="min-h-screen relative">
        <main className="relative z-10" id="main-content">
          {/* STARTUP CONVERSION FUNNEL: Hero → Problem → Social Proof → Pricing → Conversion */}
          
          {/* Section 1: Startup Hero - Speed & Validation Focus */}
          <StartupHeroSection />
          
          <SectionDivider variant="gradient" />
          
          {/* Section 2: Founder's Dilemma - Cash burn vs customer discovery */}
          <StartupFoundersDilemmaSection />
          
          <SectionDivider variant="blue" />
          
          {/* Section 3: Founder Success Stories - Social proof and validation */}
          <Suspense fallback={<LoadingFallback />}>
            <StartupFounderStoriesSection />
          </Suspense>
          
          <SectionDivider variant="gradient" />
          
          {/* Section 4: Pricing Options - 3-tier pricing structure */}
          <StartupPricingSection />
          
          <SectionDivider variant="blue" />
          
          {/* Section 5: Workshop Booking - Single, clear conversion */}
          <StartupBookingConversionSection />
        </main>
      </div>
    </>
  );
}
