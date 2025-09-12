/**
 * Enterprise-grade performance monitoring system for Octomatic
 * Tracks performance metrics, monitors Core Web Vitals, and provides insights
 */

import { logger } from './logger';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percentage';
  timestamp: number;
  context?: string;
  metadata?: Record<string, any>;
}

export interface CoreWebVitalsMetrics {
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  INP?: number; // Interaction to Next Paint
  TTFB?: number; // Time to First Byte
  FCP?: number; // First Contentful Paint
}

export interface MemoryMetrics {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  memoryUsagePercentage: number;
}

export interface NetworkMetrics {
  effectiveType: string;
  rtt: number;
  downlink: number;
  saveData: boolean;
}

export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map();
  private static performanceObserver?: PerformanceObserver;
  private static webVitalsData: CoreWebVitalsMetrics = {};
  private static isInitialized = false;
  private static metricsBuffer: PerformanceMetric[] = [];
  private static readonly MAX_BUFFER_SIZE = 100;

  /**
   * Initialize performance monitoring
   */
  public static initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.setupPerformanceObserver();
    this.setupWebVitalsTracking();
    this.setupMemoryMonitoring();
    this.setupNetworkMonitoring();
    this.setupPageVisibilityTracking();
    
    this.isInitialized = true;
    logger.info('Performance monitoring initialized', 'PerformanceMonitor');
  }

  /**
   * Start timing an operation
   */
  public static startTiming(label: string, context?: string): void {
    const startTime = performance.now();
    this.metrics.set(label, startTime);
    
    logger.debug(`Started timing: ${label}`, context);
  }

  /**
   * End timing an operation and record the metric
   */
  public static endTiming(label: string, context?: string, metadata?: Record<string, any>): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      logger.warn(`Performance timing not found: ${label}`, context);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(label);

    this.recordMetric({
      name: label,
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      context,
      metadata,
    });

    logger.performance(label, duration, context, metadata);
    return duration;
  }

  /**
   * Measure an async operation
   */
  public static async measureAsync<T>(
    label: string,
    asyncFn: () => Promise<T>,
    context?: string,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.startTiming(label, context);
    
    try {
      const result = await asyncFn();
      this.endTiming(label, context, { ...metadata, success: true });
      return result;
    } catch (error) {
      this.endTiming(label, context, { 
        ...metadata, 
        success: false, 
        error: (error as Error).message 
      });
      throw error;
    }
  }

  /**
   * Measure a synchronous operation
   */
  public static measureSync<T>(
    label: string,
    syncFn: () => T,
    context?: string,
    metadata?: Record<string, any>
  ): T {
    this.startTiming(label, context);
    
    try {
      const result = syncFn();
      this.endTiming(label, context, { ...metadata, success: true });
      return result;
    } catch (error) {
      this.endTiming(label, context, { 
        ...metadata, 
        success: false, 
        error: (error as Error).message 
      });
      throw error;
    }
  }

  /**
   * Record a custom performance metric
   */
  public static recordMetric(metric: PerformanceMetric): void {
    this.metricsBuffer.push(metric);
    
    // Trim buffer if it gets too large
    if (this.metricsBuffer.length > this.MAX_BUFFER_SIZE) {
      this.metricsBuffer.shift();
    }

    // Log significant performance issues
    if (metric.unit === 'ms' && metric.value > 1000) {
      logger.warn(`Slow operation detected: ${metric.name}`, metric.context, {
        duration: `${metric.value.toFixed(2)}ms`,
        ...metric.metadata,
      });
    }
  }

  /**
   * Get Core Web Vitals metrics
   */
  public static getCoreWebVitals(): CoreWebVitalsMetrics {
    return { ...this.webVitalsData };
  }

  /**
   * Get memory usage metrics
   */
  public static getMemoryMetrics(): MemoryMetrics | null {
    if (typeof window === 'undefined' || !('memory' in performance)) {
      return null;
    }

    const memory = (performance as any).memory;
    const memoryUsagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      memoryUsagePercentage,
    };
  }

  /**
   * Get network information
   */
  public static getNetworkMetrics(): NetworkMetrics | null {
    if (typeof window === 'undefined' || !('connection' in navigator)) {
      return null;
    }

    const connection = (navigator as any).connection;
    
    return {
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      downlink: connection.downlink,
      saveData: connection.saveData,
    };
  }

  /**
   * Get performance summary
   */
  public static getPerformanceSummary(): {
    coreWebVitals: CoreWebVitalsMetrics;
    memoryMetrics: MemoryMetrics | null;
    networkMetrics: NetworkMetrics | null;
    customMetrics: PerformanceMetric[];
    recommendations: string[];
  } {
    const coreWebVitals = this.getCoreWebVitals();
    const memoryMetrics = this.getMemoryMetrics();
    const networkMetrics = this.getNetworkMetrics();
    const recommendations = this.generateRecommendations(coreWebVitals, memoryMetrics);

    return {
      coreWebVitals,
      memoryMetrics,
      networkMetrics,
      customMetrics: [...this.metricsBuffer],
      recommendations,
    };
  }

  /**
   * Setup Performance Observer for Web Vitals
   */
  private static setupPerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      // Observe different types of performance entries
      this.performanceObserver.observe({ entryTypes: ['navigation', 'resource', 'measure', 'paint'] });
      
      // Observe layout shifts if supported
      if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.webVitalsData.CLS = clsValue;
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      }
    } catch (error) {
      logger.error('Failed to setup Performance Observer', 'PerformanceMonitor', error);
    }
  }

  /**
   * Setup Web Vitals tracking
   */
  private static setupWebVitalsTracking(): void {
    if (typeof window === 'undefined') return;

    // Track LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.webVitalsData.LCP = lastEntry.startTime;
        
        this.recordMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          unit: 'ms',
          timestamp: Date.now(),
          context: 'WebVitals',
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      logger.debug('LCP tracking not supported', 'PerformanceMonitor');
    }

    // Track FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.webVitalsData.FCP = entry.startTime;
            
            this.recordMetric({
              name: 'FCP',
              value: entry.startTime,
              unit: 'ms',
              timestamp: Date.now(),
              context: 'WebVitals',
            });
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (error) {
      logger.debug('FCP tracking not supported', 'PerformanceMonitor');
    }

    // Track TTFB (Time to First Byte)
    window.addEventListener('load', () => {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
        this.webVitalsData.TTFB = ttfb;
        
        this.recordMetric({
          name: 'TTFB',
          value: ttfb,
          unit: 'ms',
          timestamp: Date.now(),
          context: 'WebVitals',
        });
      }
    });
  }

  /**
   * Setup memory monitoring
   */
  private static setupMemoryMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor memory usage periodically
    setInterval(() => {
      const memoryMetrics = this.getMemoryMetrics();
      if (memoryMetrics) {
        // Alert if memory usage is high
        if (memoryMetrics.memoryUsagePercentage > 80) {
          logger.warn('High memory usage detected', 'PerformanceMonitor', {
            memoryUsagePercentage: memoryMetrics.memoryUsagePercentage.toFixed(2),
            usedMB: (memoryMetrics.usedJSHeapSize / 1024 / 1024).toFixed(2),
          });
        }

        this.recordMetric({
          name: 'MemoryUsage',
          value: memoryMetrics.memoryUsagePercentage,
          unit: 'percentage',
          timestamp: Date.now(),
          context: 'MemoryMonitor',
          metadata: memoryMetrics,
        });
      }
    }, 30000); // Check every 30 seconds
  }

  /**
   * Setup network monitoring
   */
  private static setupNetworkMonitoring(): void {
    if (typeof window === 'undefined' || !('connection' in navigator)) {
      return;
    }

    const connection = (navigator as any).connection;
    
    // Log initial network conditions
    const networkMetrics = this.getNetworkMetrics();
    if (networkMetrics) {
      logger.info('Network conditions detected', 'PerformanceMonitor', networkMetrics);
    }

    // Monitor network changes
    connection.addEventListener('change', () => {
      const updatedMetrics = this.getNetworkMetrics();
      if (updatedMetrics) {
        logger.info('Network conditions changed', 'PerformanceMonitor', updatedMetrics);
        
        this.recordMetric({
          name: 'NetworkChange',
          value: updatedMetrics.downlink,
          unit: 'count',
          timestamp: Date.now(),
          context: 'NetworkMonitor',
          metadata: updatedMetrics,
        });
      }
    });
  }

  /**
   * Setup page visibility tracking
   */
  private static setupPageVisibilityTracking(): void {
    if (typeof window === 'undefined') return;

    let pageLoadTime = Date.now();
    let visibilityStart = Date.now();

    document.addEventListener('visibilitychange', () => {
      const now = Date.now();
      
      if (document.visibilityState === 'hidden') {
        const visibleTime = now - visibilityStart;
        
        this.recordMetric({
          name: 'PageVisibleTime',
          value: visibleTime,
          unit: 'ms',
          timestamp: now,
          context: 'VisibilityTracker',
        });
      } else {
        visibilityStart = now;
      }
    });

    // Track total session time on page unload
    window.addEventListener('beforeunload', () => {
      const sessionTime = Date.now() - pageLoadTime;
      
      this.recordMetric({
        name: 'SessionTime',
        value: sessionTime,
        unit: 'ms',
        timestamp: Date.now(),
        context: 'SessionTracker',
      });
    });
  }

  /**
   * Handle performance entries from PerformanceObserver
   */
  private static handlePerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        this.handleNavigationEntry(entry as PerformanceNavigationTiming);
        break;
      case 'resource':
        this.handleResourceEntry(entry as PerformanceResourceTiming);
        break;
      case 'measure':
        this.handleMeasureEntry(entry);
        break;
      case 'paint':
        this.handlePaintEntry(entry);
        break;
    }
  }

  /**
   * Handle navigation timing entries
   */
  private static handleNavigationEntry(entry: PerformanceNavigationTiming): void {
    const metrics = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      domInteractive: entry.domInteractive - entry.fetchStart,
    };

    Object.entries(metrics).forEach(([name, value]) => {
      this.recordMetric({
        name,
        value,
        unit: 'ms',
        timestamp: Date.now(),
        context: 'Navigation',
      });
    });
  }

  /**
   * Handle resource timing entries
   */
  private static handleResourceEntry(entry: PerformanceResourceTiming): void {
    // Only track slow resources
    if (entry.duration > 1000) {
      this.recordMetric({
        name: 'SlowResource',
        value: entry.duration,
        unit: 'ms',
        timestamp: Date.now(),
        context: 'ResourceTiming',
        metadata: {
          name: entry.name,
          transferSize: entry.transferSize,
          encodedBodySize: entry.encodedBodySize,
        },
      });
    }
  }

  /**
   * Handle measure entries
   */
  private static handleMeasureEntry(entry: PerformanceEntry): void {
    this.recordMetric({
      name: entry.name,
      value: entry.duration,
      unit: 'ms',
      timestamp: Date.now(),
      context: 'UserTiming',
    });
  }

  /**
   * Handle paint entries
   */
  private static handlePaintEntry(entry: PerformanceEntry): void {
    if (entry.name === 'first-contentful-paint') {
      this.webVitalsData.FCP = entry.startTime;
    }
  }

  /**
   * Generate performance recommendations
   */
  private static generateRecommendations(
    coreWebVitals: CoreWebVitalsMetrics,
    memoryMetrics: MemoryMetrics | null
  ): string[] {
    const recommendations: string[] = [];

    // LCP recommendations
    if (coreWebVitals.LCP && coreWebVitals.LCP > 2500) {
      recommendations.push('Optimize Largest Contentful Paint (LCP) - consider image optimization, server response time, or resource loading');
    }

    // FCP recommendations
    if (coreWebVitals.FCP && coreWebVitals.FCP > 1800) {
      recommendations.push('Improve First Contentful Paint (FCP) - reduce render-blocking resources or optimize critical rendering path');
    }

    // CLS recommendations
    if (coreWebVitals.CLS && coreWebVitals.CLS > 0.1) {
      recommendations.push('Reduce Cumulative Layout Shift (CLS) - ensure images and ads have dimensions, avoid inserting content above existing content');
    }

    // Memory recommendations
    if (memoryMetrics && memoryMetrics.memoryUsagePercentage > 70) {
      recommendations.push('High memory usage detected - consider optimizing component renders or cleaning up unused objects');
    }

    // TTFB recommendations
    if (coreWebVitals.TTFB && coreWebVitals.TTFB > 600) {
      recommendations.push('Improve Time to First Byte (TTFB) - optimize server response time or consider CDN usage');
    }

    return recommendations;
  }

  /**
   * Clear all metrics and reset monitoring
   */
  public static reset(): void {
    this.metrics.clear();
    this.metricsBuffer = [];
    this.webVitalsData = {};
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    
    this.isInitialized = false;
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PerformanceMonitor.initialize());
  } else {
    PerformanceMonitor.initialize();
  }
}

// Export convenience functions
export const startTiming = (label: string, context?: string) =>
  PerformanceMonitor.startTiming(label, context);

export const endTiming = (label: string, context?: string, metadata?: Record<string, any>) =>
  PerformanceMonitor.endTiming(label, context, metadata);

export const measureAsync = <T>(
  label: string,
  asyncFn: () => Promise<T>,
  context?: string,
  metadata?: Record<string, any>
) => PerformanceMonitor.measureAsync(label, asyncFn, context, metadata);

export const measureSync = <T>(
  label: string,
  syncFn: () => T,
  context?: string,
  metadata?: Record<string, any>
) => PerformanceMonitor.measureSync(label, syncFn, context, metadata);

export const recordMetric = (metric: PerformanceMetric) =>
  PerformanceMonitor.recordMetric(metric);

export const getPerformanceSummary = () =>
  PerformanceMonitor.getPerformanceSummary();
