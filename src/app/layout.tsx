'use client';

import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import "@/styles/loading.css";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from "react";
import { SkipToContent } from "@/components/A11y/SkipToContent";
import { HTMLLangUpdater } from "@/components/SEO/HTMLLangUpdater";
import CriticalContentPreloader from "@/components/SEO/CriticalContentPreloader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import WebVitalsMonitor from "@/components/WebVitalsMonitor";
import GlobalInteractiveGrid from "@/components/ScrollBasedNightSky";
import { ThemeTransition } from "@/components/ui/ThemeTransition";
import InstallPrompt from "@/lib/pwa/InstallPrompt";
import { usePrefetcher } from "@/lib/performance/Prefetcher";
import PerformanceMonitor from "@/components/performance/Monitor";
import HydrationHandler from "@/components/loading/HydrationHandler";

const inter = Inter({ subsets: ["latin"] });
const archivo = Archivo({ 
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Lazy load all major components
const NavbarV2 = lazy(() => import("@/components/NavbarV2/index").then(module => ({ 
  default: module.NavbarV2 
})));
const Footer = lazy(() => import("@/components/Footer"));
const MobileCTA = lazy(() => import("@/components/ui/MobileCTA").then(module => ({ 
  default: module.MobileCTA || module.default 
})));
const FloatingCTA = lazy(() => import("@/components/conversion/FloatingCTA").then(module => ({ 
  default: module.FloatingCTA || module.default 
})));
const ExitIntentPopup = lazy(() => import("@/components/conversion/ExitIntentPopup").then(module => ({ 
  default: module.ExitIntentPopup || module.default 
})));
const BehaviorTracker = lazy(() => import("@/components/BehaviorTracker").then(module => ({ 
  default: module.BehaviorTracker || module.default 
})));
const AIChatbot = lazy(() => import("@/components/chatbot/AIChatbot").then(module => ({ 
  default: module.AIChatbot || module.default 
})));
const AccessibilityControls = lazy(() => import("@/components/A11y/AccessibilityControls").then(module => ({ 
  default: module.AccessibilityControls || module.default 
})));
const TranslationDebug = lazy(() => import("@/components/TranslationDebug").then(module => ({ 
  default: module.TranslationDebug 
})));

// Loading fallbacks
const NavbarFallback = () => (
  <div className="hidden md:block h-20 bg-background border-b border-border/10" />
);

const MainFallback = () => (
  <div className="min-h-screen bg-background animate-pulse" />
);

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  // Initialize prefetcher
  usePrefetcher({
    enabled: true,
    delay: 100,
    maxConcurrent: 3,
    priorityRoutes: ['/contact', '/services', '/about'],
  });

  return (
    <>
      {children}
      <PerformanceMonitor show={process.env.NODE_ENV === 'development'} />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={archivo.variable}>
      <head>
        {/* Font is loaded via next/font/google - no manual preload needed */}
        {/* Favicon and app icons - Multiple formats for maximum compatibility */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/faviconOctomatic.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo/octomatic-200.png" type="image/png" sizes="200x200" />
        <link rel="icon" href="/logo/octomatic-400.png" type="image/png" sizes="400x400" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo/octomatic-200.png" sizes="200x200" />
        <link rel="apple-touch-icon" href="/logo/octomatic-400.png" sizes="400x400" />
        <link rel="apple-touch-icon" href="/logo/octomatic-800.png" sizes="800x800" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/logo/octomatic-200.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* SEO Meta Tags */}
        <title>Octomatic - AI Automation for Dutch SMEs</title>
        <meta name="description" content="Transform your business with AI automation. We help Dutch SMEs streamline operations, reduce costs, and scale efficiently through intelligent automation solutions." />
        <meta name="keywords" content="AI automation, Dutch SME, business automation, process optimization, artificial intelligence, workflow automation" />
        <meta name="author" content="Kennet Timmers" />
        <meta name="creator" content="Octomatic" />
        <meta name="publisher" content="Octomatic" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://octomatic.ai" />
        <meta property="og:site_name" content="Octomatic" />
        <meta property="og:title" content="Octomatic - AI Automation for Dutch SMEs" />
        <meta property="og:description" content="Transform your business with AI automation. We help Dutch SMEs streamline operations, reduce costs, and scale efficiently through intelligent automation solutions." />
        <meta property="og:image" content="/octomatic-image-2025.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Octomatic AI Automation Platform" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Octomatic - AI Automation for Dutch SMEs" />
        <meta name="twitter:description" content="Transform your business with AI automation. We help Dutch SMEs streamline operations, reduce costs, and scale efficiently through intelligent automation solutions." />
        <meta name="twitter:image" content="/octomatic-image-2025.png" />
        <meta name="twitter:creator" content="@octomaticai" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Canonical and Language Alternatives */}
        <link rel="canonical" href="https://octomatic.ai/" />
        <link rel="alternate" hrefLang="en" href="https://octomatic.ai/" />
        <link rel="alternate" hrefLang="nl" href="https://octomatic.ai/nl" />
        
        {/* Performance: Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.className} ${archivo.variable} bg-background text-foreground font-archivo`}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              enableColorScheme={true}
            >
              <LanguageProvider>
                <AuthProvider>
                  <WebVitalsMonitor />
                  <HydrationHandler />
                  <ThemeTransition>
                    <div className="min-h-screen relative overflow-x-hidden">
                    <GlobalInteractiveGrid />
                      {/* Critical SEO components - render immediately */}
                      <HTMLLangUpdater />
                      <CriticalContentPreloader />
                      <SkipToContent contentId="main-content" />

                      <div className="relative z-20">
                        <Suspense fallback={<NavbarFallback />}>
                          <NavbarV2 />
                        </Suspense>
                      </div>

                      <main 
                        id="main-content" 
                        role="main" 
                        className="relative z-10 main-content min-h-[calc(100vh-5rem)]"
                        aria-label="Main content"
                      >
                        <LayoutContent>
                          {children}
                        </LayoutContent>
                      </main>

                    <div className="relative z-10">
                      <Suspense fallback={<div className="h-[200px] bg-secondary border-t border-border/10" />}>
                        <Footer />
                      </Suspense>
                    </div>

                    {/* Mobile CTA - Only shows on mobile */}
                    <Suspense fallback={null}>
                      <MobileCTA 
                        primaryAction="book"
                        phoneNumber="+31 6 46402090"
                        bookingUrl="/contact"
                      />
                    </Suspense>

                    {/* Floating CTA - Desktop only */}
                    <Suspense fallback={null}>
                      {typeof window !== 'undefined' && (
                        <FloatingCTA 
                          showAfterScroll={300}
                          audience="universal"
                        />
                      )}
                    </Suspense>

                    {/* Exit Intent Popup */}
                    <Suspense fallback={null}>
                      <ExitIntentPopup 
                        showOnPages={['/build', '/optimize', '/create', '/get-started']}
                        audience="universal"
                        delay={500}
                      />
                    </Suspense>

                    {/* Behavior Tracker - AI Personalization */}
                    <Suspense fallback={null}>
                      <BehaviorTracker />
                    </Suspense>

                    {process.env.NODE_ENV === 'development' && (
                      <Suspense fallback={null}>
                        <TranslationDebug />
                      </Suspense>
                    )}

                    {/* PWA Install Prompt */}
                    <Suspense fallback={null}>
                      <InstallPrompt />
                    </Suspense>

                    {/* AI Chatbot */}
                    <Suspense fallback={null}>
                      <AIChatbot position="bottom-right" />
                    </Suspense>

                    {/* Accessibility Controls */}
                    <Suspense fallback={null}>
                      <AccessibilityControls position="bottom-left" />
                    </Suspense>
                    </div>
                  </ThemeTransition>
                </AuthProvider>
              </LanguageProvider>
            </ThemeProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}