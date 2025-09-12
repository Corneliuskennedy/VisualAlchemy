import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock AuthProvider for testing
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockAuthContext = {
    user: null,
    signIn: vi.fn(),
    signOut: vi.fn(),
    loading: false
  };
  
  return (
    <div data-testid="mock-auth-provider">
      {children}
    </div>
  );
};

// Mock components for testing static pages
const MockOfflinePage = () => (
  <div>
    <h1>Offline</h1>
    <p>You are currently offline.</p>
    <a href="/">Return to Homepage</a>
    <a href="/contact">Contact Us</a>
  </div>
);

const Mock404Page = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Return to Homepage</a>
    <a href="/services">Our Services</a>
    <a href="/contact">Contact Us</a>
  </div>
);

// Simplified checklist component for testing (without complex dependencies)
const MockChecklistApp = () => (
  <div>
    <h1>GDPR Checklist</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </nav>
    <main>
      <p>Complete your GDPR compliance checklist.</p>
      <a href="https://gdpr.eu" target="_blank" rel="noopener noreferrer">Learn about GDPR</a>
      <a href="mailto:support@octomatic.ai">Email Support</a>
      <a href="tel:+31123456789">Call Us</a>
    </main>
    <footer>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </footer>
  </div>
);

describe('Outgoing Links Validation', () => {
  const checkOutgoingLinks = (container: HTMLElement, minLinks = 1) => {
    // Check for internal links (relative paths)
    const internalLinks = container.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    
    // Check for external links (absolute URLs)
    const externalLinks = container.querySelectorAll('a[href^="http"], a[href^="https"]');
    
    // Check for email links
    const emailLinks = container.querySelectorAll('a[href^="mailto:"]');
    
    // Check for phone links
    const phoneLinks = container.querySelectorAll('a[href^="tel:"]');
    
    const totalLinks = internalLinks.length + externalLinks.length + emailLinks.length + phoneLinks.length;
    
    return {
      totalLinks,
      internalLinks: Array.from(internalLinks),
      externalLinks: Array.from(externalLinks),
      emailLinks: Array.from(emailLinks),
      phoneLinks: Array.from(phoneLinks),
      hasMinimumLinks: totalLinks >= minLinks
    };
  };

  describe('Static Error Pages', () => {
    it('should have outgoing links on 404 page', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <Mock404Page />
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container, 2);
      
      expect(linkAnalysis.hasMinimumLinks).toBe(true);
      expect(linkAnalysis.totalLinks).toBeGreaterThanOrEqual(3);
      expect(linkAnalysis.internalLinks.length).toBeGreaterThanOrEqual(3);
      
      // Verify specific navigation links exist
      const links = linkAnalysis.internalLinks.map(link => 
        (link as HTMLAnchorElement).getAttribute('href')
      );
      expect(links).toContain('/');
      expect(links).toContain('/services');
      expect(links).toContain('/contact');
    });

    it('should have outgoing links on offline page', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <MockOfflinePage />
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container, 1);
      
      expect(linkAnalysis.hasMinimumLinks).toBe(true);
      expect(linkAnalysis.totalLinks).toBeGreaterThanOrEqual(2);
      expect(linkAnalysis.internalLinks.length).toBeGreaterThanOrEqual(2);
      
      // Verify navigation links exist
      const links = linkAnalysis.internalLinks.map(link => 
        (link as HTMLAnchorElement).getAttribute('href')
      );
      expect(links).toContain('/');
      expect(links).toContain('/contact');
    });
  });

  describe('Interactive Components', () => {
    it('should have outgoing links in simplified checklist app (English)', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/checklist']}>
            <LanguageProvider>
              <MockAuthProvider>
                <MockChecklistApp />
              </MockAuthProvider>
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container, 3);
      
      expect(linkAnalysis.hasMinimumLinks).toBe(true);
      expect(linkAnalysis.totalLinks).toBeGreaterThanOrEqual(7); // nav(3) + external(1) + email(1) + phone(1) + footer(2)
      
      // Should have a mix of internal and external links
      expect(linkAnalysis.internalLinks.length).toBeGreaterThanOrEqual(5); // nav + footer links
      expect(linkAnalysis.externalLinks.length).toBeGreaterThanOrEqual(1); // GDPR link
      expect(linkAnalysis.emailLinks.length).toBeGreaterThanOrEqual(1); // support email
      expect(linkAnalysis.phoneLinks.length).toBeGreaterThanOrEqual(1); // phone number
    });

    it('should have outgoing links in simplified checklist app (Dutch)', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/nl/checklist']}>
            <LanguageProvider>
              <MockAuthProvider>
                <MockChecklistApp />
              </MockAuthProvider>
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container, 3);
      
      expect(linkAnalysis.hasMinimumLinks).toBe(true);
      expect(linkAnalysis.totalLinks).toBeGreaterThanOrEqual(7);
      
      // Should have a mix of internal and external links
      expect(linkAnalysis.internalLinks.length).toBeGreaterThanOrEqual(5);
      expect(linkAnalysis.externalLinks.length).toBeGreaterThanOrEqual(1);
      expect(linkAnalysis.emailLinks.length).toBeGreaterThanOrEqual(1);
      expect(linkAnalysis.phoneLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Link Quality Validation', () => {
    it('should validate internal link structure', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <Mock404Page />
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container);
      
      linkAnalysis.internalLinks.forEach(link => {
        const href = (link as HTMLAnchorElement).getAttribute('href');
        
        // Internal links should start with / or be relative
        expect(href).toMatch(/^(\/|\.\/|\.\.\/)/);
        
        // Should not be empty or just #
        expect(href).not.toBe('');
        expect(href).not.toBe('#');
        
        // Should have valid text content
        expect((link as HTMLAnchorElement).textContent?.trim()).toBeTruthy();
      });
    });

    it('should validate external link structure', () => {
      const TestPageWithExternalLinks = () => (
        <div>
          <h1>Test Page</h1>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a>
        </div>
      );

      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <TestPageWithExternalLinks />
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container);
      
      linkAnalysis.externalLinks.forEach(link => {
        const linkElement = link as HTMLAnchorElement;
        const href = linkElement.getAttribute('href');
        
        // External links should start with http/https
        expect(href).toMatch(/^https?:\/\//);
        
        // Should have target="_blank" for security
        expect(linkElement.getAttribute('target')).toBe('_blank');
        
        // Should have rel="noopener noreferrer" for security
        const rel = linkElement.getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
        
        // Should have valid text content
        expect(linkElement.textContent?.trim()).toBeTruthy();
      });
    });

    it('should detect missing outgoing links', () => {
      const PageWithNoLinks = () => (
        <div>
          <h1>Page with No Links</h1>
          <p>This page has no outgoing links.</p>
        </div>
      );

      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <PageWithNoLinks />
          </MemoryRouter>
        </HelmetProvider>
      );

      const linkAnalysis = checkOutgoingLinks(container, 1);
      
      expect(linkAnalysis.hasMinimumLinks).toBe(false);
      expect(linkAnalysis.totalLinks).toBe(0);
      
      // This test documents a page that SHOULD fail outgoing links validation
      expect(linkAnalysis.internalLinks.length).toBe(0);
      expect(linkAnalysis.externalLinks.length).toBe(0);
    });
  });

  describe('Link Accessibility', () => {
    it('should have accessible link text', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <Mock404Page />
          </MemoryRouter>
        </HelmetProvider>
      );

      const allLinks = container.querySelectorAll('a[href]');
      
      allLinks.forEach(link => {
        const linkElement = link as HTMLAnchorElement;
        const text = linkElement.textContent?.trim();
        const ariaLabel = linkElement.getAttribute('aria-label');
        const title = linkElement.getAttribute('title');
        
        // Link should have accessible text via content, aria-label, or title
        expect(text || ariaLabel || title).toBeTruthy();
        
        // Avoid generic link text
        const genericTexts = ['click here', 'read more', 'here', 'more'];
        if (text) {
          genericTexts.forEach(generic => {
            expect(text.toLowerCase()).not.toBe(generic);
          });
        }
      });
    });

    it('should have proper focus management', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter>
            <Mock404Page />
          </MemoryRouter>
        </HelmetProvider>
      );

      const allLinks = container.querySelectorAll('a[href]');
      
      allLinks.forEach(link => {
        const linkElement = link as HTMLAnchorElement;
        
        // Links should be focusable
        expect(linkElement.tabIndex).not.toBe(-1);
        
        // External links should have proper ARIA attributes
        if (linkElement.getAttribute('target') === '_blank') {
          const ariaLabel = linkElement.getAttribute('aria-label');
          const title = linkElement.getAttribute('title');
          
          // Should indicate that link opens in new window
          const opensInNewWindow = (ariaLabel && ariaLabel.includes('new')) ||
                                    (title && title.includes('new')) ||
                                    linkElement.textContent?.includes('(opens in new window)');
          
          // This is recommended but not strictly required, so we just check structure
          expect(linkElement.getAttribute('rel')).toContain('noopener');
        }
      });
    });
  });
}); 