/**
 * PWA Install Prompt Component
 * 
 * Shows a custom install prompt for Progressive Web App installation
 * Handles beforeinstallprompt event and provides custom UI
 * 
 * Technical Showcase:
 * - PWA installation API
 * - Custom install UI
 * - User preference tracking
 * - Analytics integration
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import useLanguage from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (typeof window !== 'undefined') {
      // Check if running as standalone (installed)
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }

      // Check if user previously dismissed
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (dismissed) {
        const dismissedTime = parseInt(dismissed, 10);
        const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
        // Show again after 7 days
        if (daysSinceDismissed < 7) {
          setIsDismissed(true);
          return;
        }
      }
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      
      // Track installation
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_installed', {
          event_category: 'engagement',
          event_label: 'pwa_install'
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      // Track acceptance
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install_accepted', {
          event_category: 'engagement',
          event_label: 'pwa_install'
        });
      }
    } else {
      // Track dismissal
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install_dismissed', {
          event_category: 'engagement',
          event_label: 'pwa_install'
        });
      }
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    
    // Track dismissal
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pwa_install_dismissed', {
        event_category: 'engagement',
        event_label: 'pwa_install'
      });
    }
  };

  // Don't show if installed, dismissed, or no prompt available
  if (isInstalled || isDismissed || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-card border-2 border-border rounded-xl shadow-2xl p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-button-primary/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-6 w-6 text-button-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-heading mb-1">
                {isNL ? 'Installeer Octomatic' : 'Install Octomatic'}
              </h3>
              <p className="text-sm text-body mb-4">
                {isNL 
                  ? 'Voeg toe aan je startscherm voor snellere toegang en offline gebruik'
                  : 'Add to your home screen for faster access and offline use'}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  className="bg-button-primary text-white hover:bg-button-primary/90"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isNL ? 'Installeer' : 'Install'}
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-body hover:text-heading"
                >
                  {isNL ? 'Later' : 'Later'}
                </Button>
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-body hover:text-heading transition-colors flex-shrink-0"
            aria-label={isNL ? 'Sluiten' : 'Close'}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;

