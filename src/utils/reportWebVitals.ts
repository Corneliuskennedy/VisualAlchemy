import type { Metric } from 'web-vitals';

/**
 * Reports Web Vitals metrics to your analytics provider
 * @param onPerfEntry Optional callback for performance entries
 */
export function reportWebVitals(onPerfEntry?: (metric: Metric) => void): void {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry); // Cumulative Layout Shift
      onFID(onPerfEntry); // First Input Delay
      onFCP(onPerfEntry); // First Contentful Paint
      onLCP(onPerfEntry); // Largest Contentful Paint
      onTTFB(onPerfEntry); // Time to First Byte
    }).catch((error) => {
      console.error('Error importing web-vitals:', error);
    });
  }
}

interface WebVitalMetric {
  name: string;
  delta: number;
  id: string;
}

/**
 * Sends Web Vitals metrics to Google Analytics
 * This is a simple implementation - customize based on your analytics provider
 */
export function sendToAnalytics({ name, delta, id }: WebVitalMetric): void {
  // Assumes you're using Google Analytics
  const analyticsData = {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    nonInteraction: true,
    transport: 'beacon',
  };

  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'web_vitals', analyticsData);
  } else if (window.ga) {
    window.ga('send', 'event', analyticsData);
  } else {
    // Log to console if no analytics is available
    console.log('Web Vitals:', analyticsData);
  }
}

// Add TypeScript interface for window object
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams: Record<string, unknown>) => void;
    ga?: (command: string, hitType: string, eventParams: Record<string, unknown>) => void;
  }
}

export default reportWebVitals; 