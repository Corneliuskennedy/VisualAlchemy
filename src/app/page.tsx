import React, { Suspense } from 'react';
import { Metadata } from 'next';

// SEO Components
// import { UnifiedSEO } from '@/components/SEO/UnifiedSEO';
// import { EssentialLinks } from '@/components/SEO/EssentialLinks';

// Critical Components (loaded immediately)
import LoadingFallback from '@/components/LoadingFallback';

// Progressive Disclosure Landing Page Components (using existing components)
import HeroNew from '@/components/HeroNew';
import UniversalProblemSection from '@/components/sections/UniversalProblemSection';
import SocialProofBridgeSection from '@/components/sections/SocialProofBridgeSection';
import SolutionTeaseSection from '@/components/sections/SolutionTeaseSection';
import EarnedSegmentationSection from '@/components/sections/EarnedSegmentationSection';
import DynamicPathContentSection from '@/components/sections/DynamicPathContentSection';
import SectionDivider from '@/components/ui/SectionDivider';


export const metadata: Metadata = {
  title: 'Build Your Company\'s Operating System | Octomatic',
  description: 'Stop losing €67,560 annually to operational chaos. Build your systematic operating system in 30 days with proven frameworks used by 200+ Dutch companies.',
  keywords: 'business automation, operational efficiency, startup systems, SME automation, Dutch business optimization, systematic operations',
  openGraph: {
    title: 'Build Your Company\'s Operating System | Octomatic',
    description: 'Stop losing €67,560 annually to operational chaos. Build your systematic operating system in 30 days.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Company\'s Operating System | Octomatic',
    description: 'Stop losing €67,560 annually to operational chaos. Build your systematic operating system in 30 days.',
  },
  alternates: {
    canonical: 'https://octomatic.nl',
    languages: {
      'en': 'https://octomatic.nl',
      'nl': 'https://octomatic.nl/nl',
    },
  },
};

export default function Home() {
  return (
    <>
      {/* <UnifiedSEO />
      <EssentialLinks /> */}
      
      <div className="min-h-screen relative font-archivo">
        <main className="relative z-10" id="main-content">
          {/* PROGRESSIVE DISCLOSURE LANDING PAGE FLOW */}
          
          {/* Section 1: Universal Hero - No segmentation, universal relevance */}
          <HeroNew />
          
          <SectionDivider variant="gradient" />
          
          {/* Section 2: Universal Problem - Shared pain points with data */}
          <UniversalProblemSection />
          
          <SectionDivider variant="blue" />
          
          {/* Section 2.5: Social Proof Bridge - Build credibility before solution */}
          <SocialProofBridgeSection />
          
          <SectionDivider variant="gradient" />
          
          {/* Section 3: Solution Tease - Preview methodology without revealing everything */}
          <SolutionTeaseSection />
          
          <SectionDivider variant="blue" />
          
          {/* Section 4: Earned Segmentation - Choice feels like reward after value demonstration */}
          <EarnedSegmentationSection />
          
          <SectionDivider variant="gradient" />
          
          {/* Section 5: Dynamic Path Content - Personalized deep-dive based on selection */}
          <Suspense fallback={<LoadingFallback />}>
            <DynamicPathContentSection />
          </Suspense>
        </main>

      </div>
    </>
  );
}