'use client';

import React, { Suspense, lazy } from 'react';
import { usePathname } from 'next/navigation';
import { UnifiedSEO } from '@/components/SEO';
import { EssentialLinks } from '@/components/SEO/EssentialLinks';
import { useTranslations } from '@/hooks/useTranslations';
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { useCalWorkshop, useCalIntroCall } from '@/hooks/use-cal';

// Critical component - load immediately for H1 and LCP
import Hero from "@/components/Hero";

// Defer non-critical components
const Statistics = lazy(() => import("@/components/Statistics"));
const CalculationExplanation = lazy(() => import("@/components/CalculationExplanation"));
const CommonMistakes = lazy(() => import("@/components/CommonMistakes"));
const LocalSupport = lazy(() => import("@/components/LocalSupport"));
const Problems = lazy(() => import("@/components/Problems"));
const Benefits = lazy(() => import("@/components/Benefits"));
const WorkflowSteps = lazy(() => import("@/components/WorkflowSteps"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const BlogInsights = lazy(() => import("@/components/BlogInsights"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));

const SectionDivider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#324c9e] to-transparent" />
);

// Optimized loading component
const LoadingFallback = React.memo(() => (
  <div className="h-48 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#324c9e]" />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

export default function HomePage() {
  const pathname = usePathname();
  const { language, getSection } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  
  // Initialize Cal.com embeds
  useCalWorkshop();
  useCalIntroCall();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState({}, '', '/');
        }
      }
    }
  }, [pathname]);

  const metaTitle = isNL 
    ? "Bespaar €50.000+ per jaar met AI Automatisering Amsterdam | Octomatic" 
    : "Save €50,000+ per year with AI Automation Amsterdam | Octomatic";
  const metaDescription = isNL 
    ? "Nederlandse bedrijven besteden 23 uur per week aan repetitieve taken. Verminder handmatig werk met 40-70% in 90 dagen. Lokale ondersteuning vanuit Naarden kantoor."
    : "Dutch businesses spend 23 hours per week on repetitive tasks. Reduce manual work by 40-70% in 90 days. Local support from Naarden office near Amsterdam.";

  return (
    <>
      <UnifiedSEO 
        title={metaTitle}
        description={metaDescription}
        h1={isNL ? "Bespaar €50.000+ per jaar met AI automatisering" : "Save €50,000+ per year with AI automation"}
      />
      
      {/* Add essential links for SEO crawlability */}
      <EssentialLinks />
      
      <div className="min-h-screen bg-[#0A0A0A] relative">
        <main className="relative z-[60]">
          {/* Critical Hero section - no lazy loading for H1 and LCP */}
          <section id="hero" aria-label="Hero section" suppressHydrationWarning>
            <Hero />
          </section>
          
          <SectionDivider />
          
          {/* Statistics Section */}
          <section id="statistics" className="py-16" aria-label="Key statistics and insights">
            <Suspense fallback={<LoadingFallback />}>
              <Statistics />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Calculation Explanation Section */}
          <section id="calculation-explanation" className="py-16" aria-label="How we calculate savings">
            <Suspense fallback={<LoadingFallback />}>
              <CalculationExplanation />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Common Mistakes Section */}
          <section id="common-mistakes" className="py-16" aria-label="Common automation mistakes">
            <Suspense fallback={<LoadingFallback />}>
              <CommonMistakes />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Local Support Section */}
          <section id="local-support" className="py-16" aria-label="Local support and training">
            <Suspense fallback={<LoadingFallback />}>
              <LocalSupport />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Problems Section */}
          <section id="problems" className="py-16" aria-label="Problems we solve">
            <Suspense fallback={<LoadingFallback />}>
              <Problems />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Benefits Section */}
          <section id="benefits" className="py-16" aria-label="Benefits of automation">
            <Suspense fallback={<LoadingFallback />}>
              <Benefits />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Workflow Steps */}
          <section id="how-it-works" className="py-16" aria-label="How it works">
            <Suspense fallback={<LoadingFallback />}>
              <WorkflowSteps />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Testimonials */}
          <section id="testimonials" className="py-16" aria-label="Customer testimonials">
            <Suspense fallback={<LoadingFallback />}>
              <Testimonials />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* FAQ */}
          <section id="faq" className="py-16" aria-label="Frequently asked questions">
            <Suspense fallback={<LoadingFallback />}>
              <FAQ />
            </Suspense>
          </section>
          
          <SectionDivider />
          
          {/* Blog Insights */}
          <section id="blog" className="py-16" aria-label="Latest insights">
            <Suspense fallback={<LoadingFallback />}>
              <BlogInsights />
            </Suspense>
          </section>
          
          {/* Final CTA */}
          <section id="cta" className="py-16" aria-label="Get started">
            <Suspense fallback={<LoadingFallback />}>
              <FinalCTA />
            </Suspense>
          </section>
        </main>
      </div>
    </>
  );
}