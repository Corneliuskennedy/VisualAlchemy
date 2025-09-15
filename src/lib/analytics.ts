// Google Analytics 4 Event Tracking
// This file provides type-safe analytics tracking for the Octomatic website

// Type declaration for gtag (avoiding conflicts with existing declarations)
type GtagFunction = (command: string, targetId: string, config?: any) => void;

// Analytics Events for Pre-Launch Audit Checklist
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

// Audience Selection Events (Primary KPI)
export const trackAudienceSelection = (audienceType: 'startup' | 'sme', source: 'selector' | 'url_parameter' | 'navigation') => {
  trackEvent('audience_selected', {
    audience_type: audienceType,
    source: source,
    timestamp: new Date().toISOString()
  });
};

// Path Switching Events (Secondary KPI)
export const trackPathSwitch = (fromAudience: 'startup' | 'sme' | null, toAudience: 'startup' | 'sme') => {
  trackEvent('path_switched', {
    from_audience: fromAudience,
    to_audience: toAudience,
    timestamp: new Date().toISOString()
  });
};

// CTA Click Events (Conversion Tracking)
export const trackCTAClick = (ctaType: string, audience: 'startup' | 'sme' | 'universal', ctaText: string, section: string) => {
  trackEvent('cta_clicked', {
    cta_type: ctaType, // 'primary', 'secondary', 'pricing'
    audience: audience,
    cta_text: ctaText,
    section: section, // 'hero', 'earned_segmentation', 'pricing', etc.
    timestamp: new Date().toISOString()
  });
};

// Theme Toggle Events (UX Tracking)
export const trackThemeToggle = (newTheme: 'dark' | 'light') => {
  trackEvent('theme_switched', {
    new_theme: newTheme,
    timestamp: new Date().toISOString()
  });
};

// Scroll Depth Events (Engagement Tracking)
export const trackScrollDepth = (section: string, depth: number) => {
  trackEvent('scroll_depth', {
    section: section,
    depth_percentage: depth,
    timestamp: new Date().toISOString()
  });
};

// Form Submission Events (Lead Generation)
export const trackFormSubmission = (formType: string, audience: 'startup' | 'sme' | 'universal', success: boolean) => {
  trackEvent('form_submission', {
    form_type: formType, // 'contact', 'newsletter', 'booking'
    audience: audience,
    success: success,
    timestamp: new Date().toISOString()
  });
};

// Page View Events with Path Segmentation
export const trackPageView = (pagePath: string, audience: 'startup' | 'sme' | null = null) => {
  trackEvent('page_view', {
    page_path: pagePath,
    audience: audience,
    timestamp: new Date().toISOString()
  });
};

// Calendar Booking Events (Primary Conversion)
export const trackCalendarBooking = (audience: 'startup' | 'sme', pricingTier?: string) => {
  trackEvent('calendar_booking', {
    audience: audience,
    pricing_tier: pricingTier, // '€399', '€4500', '€1500/m' for startup
    timestamp: new Date().toISOString(),
    conversion_value: pricingTier === '€399' ? 399 : pricingTier === '€4500' ? 4500 : 1500
  });
};

// Funnel Step Tracking (For A/B Testing)
export const trackFunnelStep = (step: string, audience: 'startup' | 'sme' | 'universal') => {
  trackEvent('funnel_step', {
    step: step, // 'hero_engagement', 'problem_scroll', 'social_proof_engagement', etc.
    audience: audience,
    timestamp: new Date().toISOString()
  });
};

// Error Tracking
export const trackError = (errorType: string, errorMessage: string, page: string) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    page: page,
    timestamp: new Date().toISOString()
  });
};

// A/B Test Variant Tracking (For Future Tests)
export const trackABTestVariant = (testName: string, variant: 'A' | 'B', audience: 'startup' | 'sme' | 'universal') => {
  trackEvent('ab_test_variant', {
    test_name: testName,
    variant: variant,
    audience: audience,
    timestamp: new Date().toISOString()
  });
};
