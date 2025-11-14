/**
 * Accessibility Controls Component
 * User-facing controls for accessibility preferences
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, Type, Eye, Zap, Focus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAccessibilityManager, AccessibilityPreferences } from '@/lib/a11y/AccessibilityManager';
import useLanguage from '@/contexts/LanguageContext';

interface AccessibilityControlsProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  position = 'bottom-right',
  className = '',
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
    focusIndicators: true,
  });

  const manager = getAccessibilityManager();

  useEffect(() => {
    // Load initial preferences
    setPreferences(manager.getPreferences());

    // Subscribe to changes
    const unsubscribe = manager.subscribe(() => {
      setPreferences(manager.getPreferences());
    });

    return unsubscribe;
  }, [manager]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    manager.updatePreferences({ [key]: value });
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn('fixed z-50', positionClasses[position], className)}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full h-14 w-14 shadow-lg bg-button-primary hover:bg-button-primary-hover text-white"
          aria-label={isNL ? 'Toegankelijkheidsinstellingen' : 'Accessibility settings'}
          aria-expanded={isOpen}
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed z-50 w-full max-w-sm',
              'bg-popover border border-border rounded-lg shadow-2xl',
              'p-6 space-y-6',
              positionClasses[position],
              'mt-20'
            )}
            role="dialog"
            aria-label={isNL ? 'Toegankelijkheidsinstellingen' : 'Accessibility settings'}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {isNL ? 'Toegankelijkheid' : 'Accessibility'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label={isNL ? 'Sluiten' : 'Close'}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Font Size Control */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  {isNL ? 'Tekstgrootte' : 'Font Size'}
                </label>
              </div>
              <div className="flex gap-2">
                {(['smaller', 'normal', 'larger'] as const).map((size) => (
                  <Button
                    key={size}
                    variant={preferences.fontSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updatePreference('fontSize', size)}
                    className="flex-1"
                    aria-pressed={preferences.fontSize === size}
                  >
                    {size === 'smaller' && (isNL ? 'Kleiner' : 'Smaller')}
                    {size === 'normal' && (isNL ? 'Normaal' : 'Normal')}
                    {size === 'larger' && (isNL ? 'Groter' : 'Larger')}
                  </Button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  {isNL ? 'Hoog contrast' : 'High Contrast'}
                </label>
              </div>
              <button
                onClick={() => updatePreference('highContrast', !preferences.highContrast)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2',
                  preferences.highContrast ? 'bg-button-primary' : 'bg-muted'
                )}
                role="switch"
                aria-checked={preferences.highContrast}
                aria-label={isNL ? 'Hoog contrast' : 'High contrast'}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  {isNL ? 'Verminderde beweging' : 'Reduced Motion'}
                </label>
              </div>
              <button
                onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2',
                  preferences.reducedMotion ? 'bg-button-primary' : 'bg-muted'
                )}
                role="switch"
                aria-checked={preferences.reducedMotion}
                aria-label={isNL ? 'Verminderde beweging' : 'Reduced motion'}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Focus Indicators Toggle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Focus className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  {isNL ? 'Focus indicatoren' : 'Focus Indicators'}
                </label>
              </div>
              <button
                onClick={() => updatePreference('focusIndicators', !preferences.focusIndicators)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2',
                  preferences.focusIndicators ? 'bg-button-primary' : 'bg-muted'
                )}
                role="switch"
                aria-checked={preferences.focusIndicators}
                aria-label={isNL ? 'Focus indicatoren' : 'Focus indicators'}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    preferences.focusIndicators ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={() => {
                manager.reset();
                setIsOpen(false);
              }}
              className="w-full"
            >
              {isNL ? 'Reset naar standaard' : 'Reset to Default'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityControls;

