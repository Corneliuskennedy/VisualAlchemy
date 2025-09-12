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

// Define thresholds for each metric according to Core Web Vitals standards
const thresholds = {
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FID: { good: 100, poor: 300 },  // First Input Delay (ms)
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time To First Byte (ms)
  INP: { good: 200, poor: 500 }    // Interaction to Next Paint (ms)
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
    
    // Log to console in development - only for poor metrics to reduce noise
    if (process.env.NODE_ENV === 'development' && rating === 'poor') {
      console.warn(`⚠️ Poor Web Vital: ${metric.name}: ${metric.value} (${rating})`);
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
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      const handler = createMetricHandler();
      onCLS(handler);
      onFID(handler);
      onFCP(handler);
      onLCP(handler);
      onTTFB(handler);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }, []);

  // This component doesn't render anything
  return null;
};

export default WebVitalsMonitor; 