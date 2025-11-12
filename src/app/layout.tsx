  'use client';

import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
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

const inter = Inter({ subsets: ["latin"] });
const archivo = Archivo({ 
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Lazy load all major components
const NewNavbar = lazy(() => import("@/components/NewNavbar").then(module => ({ default: module.NewNavbar })));
const Footer = lazy(() => import("@/components/Footer"));
const MobileCTA = lazy(() => import("@/components/ui/MobileCTA").then(module => ({ default: module.MobileCTA })));
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
        <link rel="icon" href="/faviconOctomatic.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo/octomatic-200.png" type="image/png" sizes="200x200" />
        <link rel="icon" href="/logo/octomatic-400.png" type="image/png" sizes="400x400" />
        <link rel="shortcut icon" href="/faviconOctomatic.svg" type="image/svg+xml" />
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
                  <ThemeTransition>
                    <div className="min-h-screen relative overflow-x-hidden">
                    <GlobalInteractiveGrid />
                      {/* Critical SEO components - render immediately */}
                      <HTMLLangUpdater />
                      <CriticalContentPreloader />
                      <SkipToContent contentId="main-content" />

                      <header role="banner" className="relative z-20">
                        <Suspense fallback={<NavbarFallback />}>
                          <NewNavbar />
                        </Suspense>
                      </header>

                      <main 
                        id="main-content" 
                        role="main" 
                        className="relative z-10 main-content pt-0 md:pt-20"
                        aria-label="Main content"
                      >
                        <Suspense fallback={<MainFallback />}>
                          {children}
                        </Suspense>
                      </main>

                    <footer role="contentinfo" className="relative z-10">
                      <Suspense fallback={<div className="h-[200px] bg-secondary border-t border-border/10" />}>
                        <Footer />
                      </Suspense>
                    </footer>

                    {/* Mobile CTA - Only shows on mobile */}
                    <Suspense fallback={null}>
                      <MobileCTA 
                        primaryAction="book"
                        phoneNumber="+31 6 46402090"
                        bookingUrl="/contact"
                      />
                    </Suspense>

                    {process.env.NODE_ENV === 'development' && (
                      <Suspense fallback={null}>
                        <TranslationDebug />
                      </Suspense>
                    )}
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