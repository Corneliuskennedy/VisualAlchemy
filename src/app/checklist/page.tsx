'use client';

import React, { Suspense, useState } from 'react';
import { UnifiedSEO } from '@/components/SEO';
import GridBackground from '@/components/ui/GridBackground';
import { FadeInView } from '@/components/ui/enhanced-animations';
import { Shield, Calendar, Bell, ArrowRight, CheckCircle, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/components/ui/use-toast';

const ChecklistPage: React.FC = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const pageTitle = isNL 
    ? 'Gratis GDPR Compliance Checklist - 48 Punten | Octomatic'
    : 'Free GDPR Compliance Checklist - 48 Points | Octomatic';
    
  const pageDescription = isNL
    ? 'Download gratis GDPR compliance checklist met 48 essentiële checkpoints voor Nederlandse bedrijven. Zorg voor volledige AVG compliance in 2025.'
    : 'Download free GDPR compliance checklist with 48 essential checkpoints for Dutch businesses. Ensure complete GDPR compliance in 2025.';

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const webhookUrl = 'https://n8n.octomatic.ai/webhook/gdpr-checklist-download';
    
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
          checklist: 'gdpr-compliance-48-points',
          language,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsDownloaded(true);
        toast({
          title: isNL ? 'Checklist verzonden!' : 'Checklist sent!',
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

  if (isDownloaded) {
    return (
      <>
        <UnifiedSEO 
          title={isNL ? "Checklist Verzonden - GDPR Compliance | Octomatic" : "Checklist Sent - GDPR Compliance | Octomatic"}
          description={pageDescription}
          noIndex={true}
        />
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center p-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              {isNL ? "Checklist verzonden!" : "Checklist sent!"}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {isNL 
                ? "We hebben de GDPR Compliance Checklist naar uw email verzonden. Check uw inbox (en spam folder) voor de download link."
                : "We've sent the GDPR Compliance Checklist to your email. Check your inbox (and spam folder) for the download link."
              }
            </p>
            <Button asChild>
              <a href={isNL ? '/nl' : '/'}>
                {isNL ? 'Terug naar Home' : 'Back to Home'}
              </a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UnifiedSEO 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={isNL ? "https://www.octomatic.ai/nl/checklist" : "https://www.octomatic.ai/checklist"}
        ogImage="/octomatic-image-2025.png"
        pageType="service"
        keywords={isNL 
          ? 'GDPR compliance, AVG compliance, privacy framework, data bescherming, compliance checklist'
          : 'GDPR compliance, privacy framework, data protection, compliance checklist, privacy by design'
        }
      />
      
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] animate-pulse" />}>
        <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden pt-20">
          {/* Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GridBackground className="pointer-events-none opacity-30" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                  <FadeInView>
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium text-sm">
                          {isNL ? "Gratis GDPR Checklist" : "Free GDPR Checklist"}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                        {isNL ? "48-Punts GDPR Compliance Checklist" : "48-Point GDPR Compliance Checklist"}
                      </h1>
                      <div className="w-24 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                      {isNL ? (
                        "Zorg voor volledige AVG compliance met onze uitgebreide checklist, speciaal ontwikkeld voor Nederlandse bedrijven."
                      ) : (
                        "Ensure complete GDPR compliance with our comprehensive checklist, specifically developed for Dutch businesses."
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
                              {isNL ? "48 essentiële compliance checkpoints" : "48 essential compliance checkpoints"}
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "Nederlandse wetgeving specifiek" : "Dutch legislation specific"}
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "Implementatie tijdlijnen" : "Implementation timelines"}
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              {isNL ? "Prioriteiten framework" : "Priority framework"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </FadeInView>
                </div>

                {/* Download Form */}
                <div className="relative">
                  <FadeInView>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {isNL ? "Download Gratis Checklist" : "Download Free Checklist"}
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
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            isNL ? "Verzenden..." : "Sending..."
                          ) : (
                            <>
                              <Download className="mr-2 h-5 w-5" />
                              {isNL ? "Download Checklist" : "Download Checklist"}
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          {isNL 
                            ? "We respecteren uw privacy. Geen spam, alleen waardevolle GDPR inzichten."
                            : "We respect your privacy. No spam, only valuable GDPR insights."
                          }
                        </p>
                      </form>
                    </div>
                  </FadeInView>
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-24">
                <FadeInView>
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                      {isNL ? "Waarom deze checklist?" : "Why this checklist?"}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                      {isNL 
                        ? "Ontwikkeld door Nederlandse privacy experts voor lokale bedrijven"
                        : "Developed by Dutch privacy experts for local businesses"
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {isNL ? "Nederlandse Wetgeving" : "Dutch Legislation"}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {isNL 
                          ? "Specifiek afgestemd op Nederlandse AVG implementatie en Autoriteit Persoonsgegevens richtlijnen"
                          : "Specifically tailored to Dutch GDPR implementation and Data Protection Authority guidelines"
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {isNL ? "Praktische Implementatie" : "Practical Implementation"}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {isNL 
                          ? "Stap-voor-stap implementatie gids met realistische tijdlijnen en resource planning"
                          : "Step-by-step implementation guide with realistic timelines and resource planning"
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-800/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Bell className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {isNL ? "Expert Ondersteuning" : "Expert Support"}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {isNL 
                          ? "Ontwikkeld door Octomatic's privacy en compliance experts met Nederlandse marktkennis"
                          : "Developed by Octomatic's privacy and compliance experts with Dutch market knowledge"
                        }
                      </p>
                    </div>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default ChecklistPage;