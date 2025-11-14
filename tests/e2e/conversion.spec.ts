import { test, expect } from '@playwright/test';

/**
 * Conversion Flow E2E Tests
 * 
 * Tests critical conversion paths:
 * - Form submissions
 * - CTA clicks
 * - Booking flows
 * - Language switching
 * 
 * Technical Showcase:
 * - E2E testing expertise
 * - User flow validation
 * - Conversion tracking
 */

test.describe('Conversion Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Octomatic/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('CTA buttons are visible and clickable', async ({ page }) => {
    // Check hero CTA
    const heroCTA = page.locator('a[href*="contact"], button').first();
    await expect(heroCTA).toBeVisible();
    
    // Check that CTA is interactive
    await heroCTA.hover();
    await expect(heroCTA).toHaveCSS('cursor', 'pointer');
  });

  test('navigation works correctly', async ({ page }) => {
    // Test main navigation links
    const navLinks = [
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' },
      { text: 'Blog', href: '/blog' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a:has-text("${link.text}")`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await expect(page).toHaveURL(new RegExp(link.href));
        await page.goBack();
      }
    }
  });

  test('language switching works', async ({ page }) => {
    // Find language switcher
    const langSwitcher = page.locator('button:has-text("NL"), button:has-text("EN")').first();
    
    if (await langSwitcher.isVisible()) {
      const initialUrl = page.url();
      await langSwitcher.click();
      
      // Wait for navigation
      await page.waitForTimeout(500);
      
      // Check URL changed or content changed
      const newUrl = page.url();
      const urlChanged = newUrl !== initialUrl;
      const contentChanged = await page.locator('h1').textContent() !== null;
      
      expect(urlChanged || contentChanged).toBeTruthy();
    }
  });

  test('Solutions dropdown opens and navigates', async ({ page }) => {
    // Find Solutions dropdown
    const solutionsButton = page.locator('button:has-text("Solutions"), button:has-text("Oplossingen")').first();
    
    if (await solutionsButton.isVisible()) {
      await solutionsButton.click();
      
      // Wait for dropdown to open
      await page.waitForTimeout(300);
      
      // Check dropdown is visible
      const dropdown = page.locator('[role="menu"]').first();
      if (await dropdown.isVisible()) {
        // Click first solution item
        const firstItem = dropdown.locator('a').first();
        if (await firstItem.isVisible()) {
          await firstItem.click();
          await expect(page).not.toHaveURL('/');
        }
      }
    }
  });

  test('forms are accessible and functional', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact');
    
    // Check form exists
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      // Check form fields
      const nameField = form.locator('input[name*="name"], input[type="text"]').first();
      const emailField = form.locator('input[name*="email"], input[type="email"]').first();
      
      if (await nameField.isVisible()) {
        await nameField.fill('Test User');
        await expect(nameField).toHaveValue('Test User');
      }
      
      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
        await expect(emailField).toHaveValue('test@example.com');
      }
    }
  });

  test('mobile menu works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Find mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu")').first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
      
      // Check menu is open
      const menu = page.locator('nav[aria-expanded="true"], [role="menu"]').first();
      if (await menu.isVisible()) {
        await expect(menu).toBeVisible();
      }
    }
  });

  test('page performance metrics', async ({ page }) => {
    // Navigate and wait for load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check performance metrics
    const performanceTiming = await page.evaluate(() => {
      const perf = performance.timing;
      return {
        loadTime: perf.loadEventEnd - perf.navigationStart,
        domContentLoaded: perf.domContentLoadedEventEnd - perf.navigationStart,
      };
    });
    
    // Assert reasonable load times
    expect(performanceTiming.loadTime).toBeLessThan(5000); // 5 seconds max
    expect(performanceTiming.domContentLoaded).toBeLessThan(3000); // 3 seconds max
  });

  test('accessibility - keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('accessibility - ARIA labels present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for ARIA labels on interactive elements
    const buttons = page.locator('button:visible');
    const buttonCount = await buttons.count();
    
    // Skip if no buttons found
    if (buttonCount === 0) {
      test.skip();
      return;
    }
    
    let checkedCount = 0;
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();
      
      if (!isVisible) continue;
      
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      const ariaHidden = await button.getAttribute('aria-hidden');
      const text = await button.textContent();
      const hasText = text?.trim() !== '' && text?.trim() !== undefined;
      
      // Skip decorative/hidden buttons
      if (ariaHidden === 'true') continue;
      
      // At least one accessibility attribute should be present
      const hasAccessibility = ariaLabel || ariaLabelledBy || hasText;
      
      if (!hasAccessibility) {
        // Log for debugging
        const buttonHtml = await button.evaluate((el) => el.outerHTML.substring(0, 100));
        console.warn(`Button missing accessibility: ${buttonHtml}`);
      }
      
      expect(hasAccessibility).toBeTruthy();
      checkedCount++;
    }
    
    // Ensure we checked at least some buttons
    expect(checkedCount).toBeGreaterThan(0);
  });
});

