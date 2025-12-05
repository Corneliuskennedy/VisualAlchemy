'use client';

import React, { Suspense, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { UnifiedSEO } from '@/components/SEO';
import BreadcrumbStructured from '@/components/SEO/BreadcrumbStructured';
import { FileText, Download, TrendingUp, BarChart3, Users, Euro, CheckCircle, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import GridBackground from '@/components/ui/GridBackground';
import { useToast } from '@/components/ui/use-toast';

const StateOfAIReportPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const isLargeScreen = useIsLargeScreen();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const breadcrumbItems = [
    {
      title: 'Home',
      titleNL: 'Home',
      href: isNL ? '/nl' : '/',
      isRoot: true
    },
    {
      title: isNL ? 'Rapporten' : 'Reports',
      titleNL: 'Rapporten',
      href: isNL ? '/nl/reports' : '/reports',
      isCurrent: false
    },
    {
      title: isNL ? 'State of AI Dutch SMEs 2025' : 'State of AI Dutch SMEs 2025',
      titleNL: 'State of AI Dutch SMEs 2025',
      href: isNL ? '/nl/reports/state-of-ai-dutch-smes-2025' : '/reports/state-of-ai-dutch-smes-2025',
      isCurrent: true
    }
  ];

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission (replace with actual webhook)
    const webhookUrl = 'https://n8n.octomatic.ai/webhook/report-download';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          companyName,
          report: 'state-of-ai-dutch-smes-2025',
          language,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsDownloaded(true);
        toast({
          title: isNL ? 'Rapport verzonden!' : 'Report sent!',
          description: isNL ? 'Check uw email voor de download link.' : 'Check your email for the download link.',
        });
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: isNL ? 'Download mislukt' : 'Download failed',
        description: isNL ? 'Probeer het later opnieuw.' : 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reportHighlights = [
    {
      icon: Users,
      stat: "73%",
      label: isNL ? "Nederlandse MKB bedrijven" : "Dutch SME companies",
      description: isNL ? "Overwegen AI automatisering in 2025" : "Considering AI automation in 2025"
    },
    {
      icon: Euro,
      stat: "€42k",
      label: isNL ? "Gemiddelde jaarlijkse besparing" : "Average annual savings",
      description: isNL ? "Door AI automatisering implementatie" : "Through AI automation implementation"
    },
    {
      icon: TrendingUp,
      stat: "156%",
      label: isNL ? "ROI binnen 18 maanden" : "ROI within 18 months",
      description: isNL ? "Voor bedrijven die AI automatisering adopteren" : "For companies adopting AI automation"
    },
    {
      icon: BarChart3,
      stat: "89%",
      label: isNL ? "Productiviteitsverbetering" : "Productivity improvement",
      description: isNL ? "Gerapporteerd door early adopters" : "Reported by early adopters"
    }
  ];

  const reportContents = [
    {
      title: isNL ? "Executive Summary" : "Executive Summary",
      description: isNL ? "Belangrijkste bevindingen en aanbevelingen voor Nederlandse MKB" : "Key findings and recommendations for Dutch SMEs"
    },
    {
      title: isNL ? "Markt Analyse" : "Market Analysis", 
      description: isNL ? "Huidige staat van AI adoptie in Nederlandse bedrijven" : "Current state of AI adoption in Dutch businesses"
    },
    {
      title: isNL ? "ROI Berekeningen" : "ROI Calculations",
      description: isNL ? "Gedetailleerde kosten-baten analyse met real-world voorbeelden" : "Detailed cost-benefit analysis with real-world examples"
    },
    {
      title: isNL ? "Implementation Roadmap" : "Implementation Roadmap",
      description: isNL ? "Stap-voor-stap gids om AI automatisering te implementeren" : "Step-by-step guide to implement AI automation"
    },
    {
      title: isNL ? "Case Studies" : "Case Studies",
      description: isNL ? "Succesverhalen van Nederlandse bedrijven" : "Success stories from Dutch companies"
    },
    {
      title: isNL ? "2025 Voorspellingen" : "2025 Predictions",
      description: isNL ? "Trends en ontwikkelingen voor het komende jaar" : "Trends and developments for the coming year"
    }
  ];

  if (isDownloaded) {
    return (
      <>
        <UnifiedSEO 
          title={isNL ? "Rapport Verzonden - State of AI Dutch SMEs 2025 | Octomatic" : "Report Sent - State of AI Dutch SMEs 2025 | Octomatic"}
          description={isNL ? "Uw rapport is verzonden! Check uw email voor de download link van de State of AI Dutch SMEs 2025 rapport." : "Your report has been sent! Check your email for the download link of the State of AI Dutch SMEs 2025 report."}
          noIndex={true}
        />
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center p-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              {isNL ? "Rapport verzonden!" : "Report sent!"}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {isNL 
                ? "We hebben de State of AI Dutch SMEs 2025 rapport naar uw email verzonden. Check uw inbox (en spam folder) voor de download link."
                : "We've sent the State of AI Dutch SMEs 2025 report to your email. Check your inbox (and spam folder) for the download link."
              }
            </p>
            <Button asChild>
              <Link href={isNL ? '/nl' : '/'}>
                {isNL ? 'Terug naar Home' : 'Back to Home'}
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UnifiedSEO 
        title={isNL ? "State of AI Dutch SMEs 2025 - Gratis Rapport | Octomatic" : "State of AI Dutch SMEs 2025 - Free Report | Octomatic"}
        description={isNL ? "Download gratis rapport: State of AI Dutch SMEs 2025. Marktanalyse, ROI berekeningen, case studies en implementatie roadmap voor Nederlandse MKB." : "Download free report: State of AI Dutch SMEs 2025. Market analysis, ROI calculations, case studies and implementation roadmap for Dutch SMEs."}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/reports/state-of-ai-dutch-smes-2025" : "https://www.octomatic.ai/reports/state-of-ai-dutch-smes-2025"}
        keywords={isNL ? "AI rapport, Nederlandse MKB, automatisering, ROI, case studies" : "AI report, Dutch SMEs, automation, ROI, case studies"}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A]">
          <section className="py-16 md:py-20 relative bg-[#0A0A0A]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GridBackground className="pointer-events-none" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-8">
                <BreadcrumbStructured 
                  items={breadcrumbItems} 
                  pageType="article"
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

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-[#4585f4]/10 border border-[#4585f4]/20 rounded-full px-4 py-2">
                        <FileText className="w-4 h-4 text-[#4585f4]" />
                        <span className="text-[#4585f4] font-medium text-sm">
                          {isNL ? "Gratis Rapport 2025" : "Free Report 2025"}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "State of AI Nederlandse MKB 2025" : "State of AI Dutch SMEs 2025"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Ontdek hoe Nederlandse MKB bedrijven AI automatisering adopteren, wat de ROI is, en hoe u kunt beginnen. Inclusief case studies en implementation roadmap."
                      ) : (
                        "Discover how Dutch SMEs are adopting AI automation, what the ROI is, and how you can get started. Including case studies and implementation roadmap."
                      )}
                    </h2>
                    
                    <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Download className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {isNL ? "Wat u krijgt:" : "What you get:"}
                          </h3>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "42 pagina's marktonderzoek" : "42 pages of market research"}
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "ROI calculator & templates" : "ROI calculator & templates"}
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "Nederlandse case studies" : "Dutch case studies"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Form */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {isNL ? "Download Gratis Rapport" : "Download Free Report"}
                        </h3>
                        <p className="text-gray-300">
                          {isNL ? "Vul uw gegevens in voor directe toegang" : "Fill in your details for instant access"}
                        </p>
                      </div>

                      <form onSubmit={handleDownload} className="space-y-6">
                        <div className="relative">
                          <Input
                            type="text"
                            name="firstName"
                            placeholder={isNL ? "Voornaam" : "First name"}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="pl-10"
                            required
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>

                        <div className="relative">
                          <Input
                            type="email"
                            name="email"
                            placeholder={isNL ? "E-mail adres" : "Email address"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>

                        <div className="relative">
                          <Input
                            type="text"
                            name="companyName"
                            placeholder={isNL ? "Bedrijfsnaam (optioneel)" : "Company name (optional)"}
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="pl-10"
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-[#4585f4] hover:bg-[#4585f4]/90 text-white py-4 text-lg font-semibold"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            isNL ? "Verzenden..." : "Sending..."
                          ) : (
                            <>
                              <Download className="mr-2 h-5 w-5" />
                              {isNL ? "Download Rapport" : "Download Report"}
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          {isNL 
                            ? "We respecteren uw privacy. Geen spam, alleen waardevolle inzichten."
                            : "We respect your privacy. No spam, only valuable insights."
                          }
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Report Highlights */}
          <section className="py-24 bg-[#0A0A0A] relative">
            {isLargeScreen && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GridBackground className="pointer-events-none opacity-30" />
              </div>
            )}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Belangrijkste bevindingen" : "Key findings"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Inzichten uit ons onderzoek naar AI automatisering in Nederlandse MKB bedrijven"
                    : "Insights from our research into AI automation in Dutch SME companies"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {reportHighlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-[#4585f4]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-[#4585f4]" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-[#4585f4] mb-4">{highlight.stat}</div>
                      <div className="text-lg font-semibold text-white mb-2">{highlight.label}</div>
                      <div className="text-gray-400 text-sm">{highlight.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Report Contents */}
          <section className="py-24 bg-[#0A0A0A] relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isNL ? "Rapport inhoud" : "Report contents"}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  {isNL 
                    ? "Een complete gids voor AI automatisering in Nederlandse bedrijven"
                    : "A complete guide to AI automation in Dutch businesses"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reportContents.map((content, index) => (
                  <div key={index} className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#4585f4]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#4585f4] font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">{content.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{content.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
};

export default StateOfAIReportPage;
