import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

/**
 * Performance Tests
 * 
 * Lighthouse performance audits for all critical pages
 * Ensures Core Web Vitals meet targets
 * 
 * Technical Showcase:
 * - Performance testing expertise
 * - Core Web Vitals monitoring
 * - Lighthouse integration
 * - Multi-page performance auditing
 */

// Critical pages to audit
const CRITICAL_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
  { path: '/our-work', name: 'Our Work' },
  { path: '/build', name: 'Build' },
  { path: '/optimize', name: 'Optimize' },
  { path: '/create', name: 'Create' },
  { path: '/blog', name: 'Blog' },
];

test.describe('Performance Tests', () => {
  // Skip in CI unless explicitly enabled (requires Chrome)
  const shouldRunPerformanceTests = process.env.RUN_PERFORMANCE_TESTS === 'true';

  test.skip(!shouldRunPerformanceTests, 'Performance tests disabled by default');

  // Lighthouse audit for each critical page
  for (const pageInfo of CRITICAL_PAGES) {
    test(`${pageInfo.name} (${pageInfo.path}) meets performance targets`, async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Lighthouse only works in Chromium');
      
      await page.goto(pageInfo.path);
      
      await playAudit({
        page,
        thresholds: {
          performance: 85, // Slightly lower threshold for initial audits
          accessibility: 95,
          'best-practices': 90,
          seo: 95,
        },
        port: 9222,
      });
    });
  }

  // Core Web Vitals measurement for each critical page
  for (const pageInfo of CRITICAL_PAGES) {
    test(`${pageInfo.name} (${pageInfo.path}) Core Web Vitals`, async ({ page }) => {
      await page.goto(pageInfo.path);
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      
      // Measure LCP (Largest Contentful Paint)
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry;
            resolve(lastEntry.startTime);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // Timeout after 10 seconds
          setTimeout(() => {
            observer.disconnect();
            resolve(null);
          }, 10000);
        });
      });
      
      if (lcp && typeof lcp === 'number') {
        console.log(`${pageInfo.name} LCP: ${lcp}ms`);
        expect(lcp).toBeLessThan(2500); // LCP should be < 2.5s (target: ≤ 1.2s)
      }
      
      // Measure FCP (First Contentful Paint)
      const fcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              resolve(fcpEntry.startTime);
            }
          });
          observer.observe({ entryTypes: ['paint'] });
          
          setTimeout(() => {
            observer.disconnect();
            resolve(null);
          }, 10000);
        });
      });
      
      if (fcp && typeof fcp === 'number') {
        console.log(`${pageInfo.name} FCP: ${fcp}ms`);
        expect(fcp).toBeLessThan(1800); // FCP should be < 1.8s (target: < 800ms)
      }
      
      // Measure CLS (Cumulative Layout Shift)
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
          });
          observer.observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => {
            observer.disconnect();
            resolve(clsValue);
          }, 10000);
        });
      });
      
      if (cls && typeof cls === 'number') {
        console.log(`${pageInfo.name} CLS: ${cls}`);
        expect(cls).toBeLessThan(0.1); // CLS should be < 0.1 (target: < 0.1)
      }
      
      // Measure FID (First Input Delay) - requires user interaction
      // This is measured separately as it requires actual interaction
    });
  }

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

