/**
 * Performance Monitoring Dashboard
 * 
 * Real-time performance metrics display
 * Shows Core Web Vitals and custom metrics
 * 
 * Technical Showcase:
 * - Performance API usage
 * - Real-time monitoring
 * - Data visualization
 * - Developer tools
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Zap, Clock, Download, X } from 'lucide-react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface PerformanceMetrics {
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
  inp: number | null;
  custom: Record<string, number>;
}

interface PerformanceMonitorProps {
  show?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoHide?: boolean;
  autoHideDelay?: number;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  show = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  autoHide = true,
  autoHideDelay = 5000,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    inp: null,
    custom: {},
  });
  const [isVisible, setIsVisible] = useState(show);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!show) return;

    // Collect Web Vitals
    onCLS((metric) => {
      setMetrics((prev) => ({ ...prev, cls: metric.value }));
    });

    onFID((metric) => {
      setMetrics((prev) => ({ ...prev, fid: metric.value }));
    });

    onFCP((metric) => {
      setMetrics((prev) => ({ ...prev, fcp: metric.value }));
    });

    onLCP((metric) => {
      setMetrics((prev) => ({ ...prev, lcp: metric.value }));
    });

    onTTFB((metric) => {
      setMetrics((prev) => ({ ...prev, ttfb: metric.value }));
    });

    onINP((metric) => {
      setMetrics((prev) => ({ ...prev, inp: metric.value }));
    });

    // Collect custom metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = window.performance;
      
      // Navigation timing
      const navTiming = perfData.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        setMetrics((prev) => ({
          ...prev,
          custom: {
            ...prev.custom,
            domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
            loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
          },
        }));
      }

      // Resource timing
      const resources = perfData.getEntriesByType('resource') as PerformanceResourceTiming[];
      const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      setMetrics((prev) => ({
        ...prev,
        custom: {
          ...prev.custom,
          totalResources: resources.length,
          totalSize: Math.round(totalSize / 1024), // KB
        },
      }));
    }

    // Auto-hide after delay
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [show, autoHide, autoHideDelay]);

  const getScore = (value: number | null, thresholds: { good: number; needsImprovement: number }): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
    if (value === null) return 'unknown';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getScoreColor = (score: string): string => {
    switch (score) {
      case 'good':
        return 'text-green-400 dark:text-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'poor':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatValue = (value: number | null, unit: string = 'ms'): string => {
    if (value === null) return '-';
    return `${value.toFixed(0)} ${unit}`;
  };

  const exportMetrics = () => {
    const data = {
      timestamp: new Date().toISOString(),
      metrics,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-metrics-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  if (isMinimized) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <Button
          onClick={() => setIsMinimized(false)}
          aria-label="Restore performance monitor"
          size="sm"
          variant="outline"
          className="bg-card border-border shadow-lg"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Performance
        </Button>
      </div>
    );
  }

  return (
    <Card className={`fixed ${positionClasses[position]} z-50 w-80 max-h-96 overflow-auto shadow-2xl border-2 border-border`}>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-button-primary" />
            <h3 className="font-bold text-heading">Performance</h3>
          </div>
          <div className="flex gap-1">
            <Button
              onClick={exportMetrics}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              title="Export metrics"
              aria-label="Export metrics"
            >
              <Download className="h-3 w-3" aria-hidden="true" />
            </Button>
            <Button
              onClick={() => setIsMinimized(true)}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              title="Minimize"
              aria-label="Minimize performance monitor"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-heading">Core Web Vitals</h4>
          
          <MetricRow
            label="LCP"
            value={formatValue(metrics.lcp)}
            score={getScore(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}
          />
          <MetricRow
            label="FID"
            value={formatValue(metrics.fid)}
            score={getScore(metrics.fid || 0, { good: 100, needsImprovement: 300 })}
          />
          <MetricRow
            label="CLS"
            value={metrics.cls !== null ? metrics.cls.toFixed(3) : '-'}
            score={getScore(metrics.cls || 0, { good: 0.1, needsImprovement: 0.25 })}
          />
          <MetricRow
            label="FCP"
            value={formatValue(metrics.fcp)}
            score={getScore(metrics.fcp || 0, { good: 1800, needsImprovement: 3000 })}
          />
          <MetricRow
            label="INP"
            value={formatValue(metrics.inp)}
            score={getScore(metrics.inp || 0, { good: 200, needsImprovement: 500 })}
          />
          <MetricRow
            label="TTFB"
            value={formatValue(metrics.ttfb)}
            score={getScore(metrics.ttfb || 0, { good: 800, needsImprovement: 1800 })}
          />
        </div>

        {/* Custom Metrics */}
        {Object.keys(metrics.custom).length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <h4 className="text-sm font-semibold text-heading">Custom Metrics</h4>
            {Object.entries(metrics.custom).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-body capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-heading font-mono">{typeof value === 'number' ? value.toFixed(0) : value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

interface MetricRowProps {
  label: string;
  value: string;
  score: 'good' | 'needs-improvement' | 'poor' | 'unknown';
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value, score }) => {
  const getScoreColor = (s: string): string => {
    switch (s) {
      case 'good':
        return 'text-green-400 dark:text-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'poor':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-body">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-mono font-semibold ${getScoreColor(score)}`}>{value}</span>
        {score !== 'unknown' && (
          <span className={`w-2 h-2 rounded-full ${
            score === 'good' ? 'bg-green-500' :
            score === 'needs-improvement' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor;

