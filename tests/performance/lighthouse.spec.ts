import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

/**
 * Performance Tests
 * 
 * Lighthouse performance audits
 * Ensures Core Web Vitals meet targets
 * 
 * Technical Showcase:
 * - Performance testing expertise
 * - Core Web Vitals monitoring
 * - Lighthouse integration
 */

test.describe('Performance Tests', () => {
  // Skip in CI unless explicitly enabled (requires Chrome)
  const shouldRunPerformanceTests = process.env.RUN_PERFORMANCE_TESTS === 'true';

  test.skip(!shouldRunPerformanceTests, 'Performance tests disabled by default');

  test('homepage meets performance targets', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Lighthouse only works in Chromium');
    
    await page.goto('/');
    
    await playAudit({
      page,
      thresholds: {
        performance: 90,
        accessibility: 95,
        'best-practices': 90,
        seo: 95,
      },
      port: 9222,
    });
  });

  test('homepage Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure LCP
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        setTimeout(() => resolve(null), 5000);
      });
    });
    
    if (lcp) {
      expect(lcp).toBeLessThan(2500); // LCP should be < 2.5s
    }
    
    // Measure FCP
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries[0].startTime);
        }).observe({ entryTypes: ['paint'] });
        
        setTimeout(() => resolve(null), 5000);
      });
    });
    
    if (fcp) {
      expect(fcp).toBeLessThan(1800); // FCP should be < 1.8s
    }
  });

  test('page load time is acceptable', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // Should load in < 5 seconds
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      (error) => 
        !error.includes('favicon') && 
        !error.includes('analytics') &&
        !error.includes('third-party')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('bundle size is reasonable', async ({ page }) => {
    await page.goto('/');
    
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return entries
        .filter((entry) => entry.initiatorType === 'script' || entry.initiatorType === 'link')
        .map((entry) => ({
          name: entry.name,
          size: entry.transferSize,
          type: entry.initiatorType,
        }));
    });
    
    const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0);
    const totalSizeKB = totalSize / 1024;
    
    // Total JS/CSS should be < 500KB
    expect(totalSizeKB).toBeLessThan(500);
  });
});

