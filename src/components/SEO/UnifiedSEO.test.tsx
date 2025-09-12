import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { UnifiedSEO } from './UnifiedSEO';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@testing-library/jest-dom';

// Mock window.location for tests
const mockLocation = (pathname: string) => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname,
      href: `https://www.octomatic.ai${pathname}`,
      origin: 'https://www.octomatic.ai'
    },
    writable: true
  });
};

describe('UnifiedSEO Component - Ahrefs Compliance Tests', () => {
  beforeEach(() => {
    // Clear document head before each test
    document.head.innerHTML = '';
    document.title = '';
    
    // Clear any stored language preferences
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  });

  describe('Title Tests', () => {
    it('should keep titles under 60 characters', async () => {
      const longTitle = 'This is a very long title that exceeds the recommended length for SEO';
      
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO title={longTitle} />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.title.length).toBeLessThanOrEqual(60);
      });
    });

    it('should ensure page title and OG title match', async () => {
      const title = 'Test Page';
      
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO title={title} />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        expect(document.title).toBe(ogTitle?.getAttribute('content'));
      });
    });

    it('should append " | Octomatic" to titles consistently', async () => {
      const title = 'Test Page';
      
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO title={title} />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.title).toBe(`${title} | Octomatic`);
      });
    });
  });

  describe('Meta Description Tests', () => {
    it('should keep meta descriptions under 160 characters', async () => {
      const longDescription = 'This is a very long description that exceeds the recommended length for SEO purposes and should be truncated to ensure it displays properly in search engine results pages without being cut off';
      
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO description={longDescription} />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const metaDesc = document.querySelector('meta[name="description"]');
        const content = metaDesc?.getAttribute('content') || '';
        expect(content.length).toBeLessThanOrEqual(160);
      });
    });
  });

  describe('Open Graph Tests', () => {
    it('should ensure OG URL matches canonical URL', async () => {
      mockLocation('/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automation" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const canonical = document.querySelector('link[rel="canonical"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        expect(canonical?.getAttribute('href')).toBe(ogUrl?.getAttribute('content'));
      });
    });

    it('should include all required OG tags', async () => {
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO 
                title="Test Page"
                description="Test description"
              />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.querySelector('meta[property="og:title"]')).toBeInTheDocument();
        expect(document.querySelector('meta[property="og:description"]')).toBeInTheDocument();
        expect(document.querySelector('meta[property="og:image"]')).toBeInTheDocument();
        expect(document.querySelector('meta[property="og:url"]')).toBeInTheDocument();
        expect(document.querySelector('meta[property="og:type"]')).toBeInTheDocument();
        expect(document.querySelector('meta[property="og:site_name"]')).toBeInTheDocument();
      });
    });
  });

  describe('Twitter Card Tests', () => {
    it('should include all required Twitter card tags', async () => {
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO 
                title="Test Page"
                description="Test description"
              />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.querySelector('meta[name="twitter:card"]')).toBeInTheDocument();
        expect(document.querySelector('meta[name="twitter:title"]')).toBeInTheDocument();
        expect(document.querySelector('meta[name="twitter:description"]')).toBeInTheDocument();
        expect(document.querySelector('meta[name="twitter:image"]')).toBeInTheDocument();
        expect(document.querySelector('meta[name="twitter:site"]')).toBeInTheDocument();
      });
    });
  });

  describe('Hreflang Tests', () => {
    it('should ensure HTML lang matches hreflang for current page', async () => {
      mockLocation('/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automation" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const htmlLang = document.documentElement.getAttribute('lang');
        const selfHreflang = document.querySelector('link[rel="alternate"][href="https://www.octomatic.ai/services/ai-automation"]');
        const hreflangValue = selfHreflang?.getAttribute('hreflang');
        
        // HTML lang should be 'en' and hreflang should be 'en'
        expect(htmlLang).toBe('en');
        expect(hreflangValue).toBe('en');
      });
    });

    it('should include reciprocal hreflang tags for all language versions', async () => {
      mockLocation('/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automation" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        const hreflangValues = Array.from(hreflangTags).map(tag => ({
          lang: tag.getAttribute('hreflang'),
          href: tag.getAttribute('href')
        }));

        // Should have en, nl-NL, and x-default
        expect(hreflangValues).toHaveLength(3);
        expect(hreflangValues).toContainEqual({
          lang: 'en',
          href: 'https://www.octomatic.ai/services/ai-automation'
        });
        expect(hreflangValues).toContainEqual({
          lang: 'nl-NL',
          href: 'https://www.octomatic.ai/nl/services/ai-automation'
        });
        expect(hreflangValues).toContainEqual({
          lang: 'x-default',
          href: 'https://www.octomatic.ai/services/ai-automation'
        });
      });
    });

    it('should handle Dutch pages correctly', async () => {
      mockLocation('/nl/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/nl/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automatisering" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const htmlLang = document.documentElement.getAttribute('lang');
        expect(htmlLang).toBe('nl');
        
        const canonical = document.querySelector('link[rel="canonical"]');
        expect(canonical?.getAttribute('href')).toBe('https://www.octomatic.ai/nl/services/ai-automation');
      });
    });
  });

  describe('Structured Data Tests', () => {
    it('should include valid structured data', async () => {
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO 
                title="Test Page"
                description="Test description"
                pageType="service"
              />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        expect(structuredData).toBeInTheDocument();
        
        const data = JSON.parse(structuredData?.textContent || '{}');
        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBeDefined();
      });
    });
  });

  describe('Special Cases', () => {
    it('should handle homepage correctly without trailing slash issues', async () => {
      mockLocation('/');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/']}>
            <LanguageProvider>
              <UnifiedSEO title="Homepage" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const enHreflang = document.querySelector('link[hreflang="en"]');
        const nlHreflang = document.querySelector('link[hreflang="nl-NL"]');
        
        expect(enHreflang?.getAttribute('href')).toBe('https://www.octomatic.ai/');
        expect(nlHreflang?.getAttribute('href')).toBe('https://www.octomatic.ai/nl');
      });
    });

    it('should handle title length gracefully for long service names', async () => {
      const serviceTitle = 'Advanced AI-Powered Marketing Automation Solutions for Enterprise Businesses';
      
      render(
        <HelmetProvider>
          <MemoryRouter>
            <LanguageProvider>
              <UnifiedSEO title={serviceTitle} />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.title.length).toBeLessThanOrEqual(60);
        expect(document.title).toContain('...');
      });
    });

    it('should handle non-existent blog posts gracefully', async () => {
      mockLocation('/blog/non-existent-post');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/blog/non-existent-post']}>
            <LanguageProvider>
              <UnifiedSEO 
                title="Blog Post Not Found"
                noIndex={true}
              />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        expect(robotsMeta?.getAttribute('content')).toContain('noindex');
      });
    });
  });

  describe('Language Context Tests', () => {
    it('should detect language from URL correctly for English pages', async () => {
      mockLocation('/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automation" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.getAttribute('lang')).toBe('en');
      });
    });

    it('should detect language from URL correctly for Dutch pages', async () => {
      mockLocation('/nl/services/ai-automation');
      
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/nl/services/ai-automation']}>
            <LanguageProvider>
              <UnifiedSEO title="AI Automatisering" />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.getAttribute('lang')).toBe('nl');
      });
    });
  });
}); 