import React, { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';

type MetricName = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB' | 'INP';

interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Only send analytics in production
const SEND_TO_ANALYTICS = process.env.NODE_ENV === 'production';

// ELITE THRESHOLDS - Top 0.1% Performance (2025)
// These are significantly more stringent than Google's "Good" thresholds
const thresholds = {
  CLS: { good: 0.01, poor: 0.1 },      // Elite: ≤ 0.01 (Google "Good": ≤ 0.1)
  FID: { good: 100, poor: 300 },       // First Input Delay (ms) - deprecated, use INP
  LCP: { good: 1200, poor: 2500 },     // Elite: ≤ 1.2s (Google "Good": ≤ 2.5s)
  FCP: { good: 800, poor: 1800 },      // First Contentful Paint (ms)
  TTFB: { good: 200, poor: 800 },      // Elite: ≤ 200ms (Google "Good": ≤ 800ms)
  INP: { good: 100, poor: 200 }        // Elite: ≤ 100ms (Google "Good": ≤ 200ms)
};

// Get rating based on thresholds
const getRating = (name: keyof typeof thresholds, value: number): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= thresholds[name].good) return 'good';
  return value <= thresholds[name].poor ? 'needs-improvement' : 'poor';
};

// Convert metric to a more readable format for logging
const formatMetric = (metric: WebVitalMetric) => {
  let formattedValue: string | number = metric.value;
  
  // Format based on metric type
  if (metric.name === 'CLS') {
    formattedValue = metric.value.toFixed(3); // CLS has no units
  } else {
    formattedValue = `${Math.round(metric.value)}ms`;
  }
  
  return {
    metric: metric.name,
    value: formattedValue,
    rating: metric.rating
  };
};

const sendToAnalytics = (metric: WebVitalMetric) => {
  // Only log in development to reduce console noise
  if (process.env.NODE_ENV === 'development') {
    console.info('Web Vitals metric:', formatMetric(metric));
  }
  
  // Only send to analytics in production
  if (!SEND_TO_ANALYTICS) {
    return;
  }

  // Example of sending to Google Analytics
  const analyticsData = {
    eventName: 'web-vitals',
    eventParams: {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // Convert CLS to milliseconds-like value for consistency
      metric_id: metric.id, // Unique ID for this particular metric instance
      metric_name: metric.name,
      metric_rating: metric.rating,
    },
  };

  // Send to your analytics provider
  try {
    // Replace with your actual analytics implementation
    if (window.gtag) {
      window.gtag('event', analyticsData.eventName, analyticsData.eventParams);
    }
  } catch (e) {
    console.error('Failed to send web vitals to analytics', e);
  }
};

// Create metric handler
const createMetricHandler = () => {
  return (metric: Metric) => {
    const rating = getRating(metric.name as keyof typeof thresholds, metric.value);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const isElite = (name: string, value: number) => {
        if (name === 'LCP') return value <= 1200;
        if (name === 'INP') return value <= 100;
        if (name === 'CLS') return value <= 0.01;
        return false;
      };
      
      const eliteStatus = isElite(metric.name, metric.value) ? '⚡ ELITE' : '';
      const status = rating === 'poor' ? '⚠️ POOR' : rating === 'needs-improvement' ? '⚠️ NEEDS IMPROVEMENT' : '✅ GOOD';
      
      console.log(`📊 Web Vital: ${metric.name}: ${metric.value}${metric.name === 'CLS' ? '' : 'ms'} - ${status} ${eliteStatus}`);
    }

    // Send to analytics in production
    if (SEND_TO_ANALYTICS && typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
          custom_map: {
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: rating,
          }
        });
      }

      // Performance API for debugging
      if ('performance' in window && 'mark' in window.performance) {
        window.performance.mark(`web-vitals:${metric.name}:${metric.value}`);
      }
    }
  };
};

interface WebVitalsMonitorProps {
  // Optional props for configuration
}

export const WebVitalsMonitor: React.FC<WebVitalsMonitorProps> = () => {
  useEffect(() => {
    // Load web vitals and use our custom handler
    // INP is the new metric (replaces FID in 2024+)
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      const handler = createMetricHandler();
      
      // Core Web Vitals (2025)
      onCLS(handler);  // Cumulative Layout Shift - Elite: ≤ 0.01
      onLCP(handler);  // Largest Contentful Paint - Elite: ≤ 1.2s
      onINP(handler);  // Interaction to Next Paint - Elite: ≤ 100ms (replaces FID)
      
      // Additional metrics
      onFCP(handler);  // First Contentful Paint
      onTTFB(handler); // Time To First Byte
      
      // FID is deprecated but keep for backwards compatibility
      if (onFID) {
        onFID(handler);
      }
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }, []);

  // This component doesn't render anything
  return null;
};

export default WebVitalsMonitor; 