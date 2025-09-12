import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { Meta } from './Meta';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@testing-library/jest-dom';

describe('Meta component', () => {
  beforeEach(() => {
    // Clear document head before each test
    const existingLinks = document.head.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());
    
    // Clear document title
    document.title = '';
  });

  it('should set the document title', async () => {
    const title = 'Test Page Title';

    render(
      <HelmetProvider>
        <MemoryRouter>
          <LanguageProvider>
            <Meta title={title} />
          </LanguageProvider>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Wait for React Helmet to update the document
    await waitFor(() => {
      expect(document.title).toBe(`${title} | Octomatic`);
    }, { timeout: 3000 });
  });

  it('should render a visually hidden h1 tag', async () => {
    const h1 = 'Test H1';

    render(
      <HelmetProvider>
        <MemoryRouter>
          <LanguageProvider>
            <Meta h1={h1} />
          </LanguageProvider>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Wait for component to render
    await waitFor(() => {
      const h1Element = screen.getByRole('heading', { level: 1 });
      expect(h1Element).toHaveTextContent(h1);
      expect(h1Element).toHaveClass('sr-only');
    });
  });

  describe('Reciprocal Hreflang Validation', () => {
    it('should render complete hreflang cluster for English homepage', async () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/']}>
            <LanguageProvider>
              <Meta />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      // Wait for React Helmet to update the DOM
      await waitFor(() => {
        const links = document.head.querySelectorAll('link[rel="alternate"]');
        expect(links.length).toBeGreaterThanOrEqual(3);
      }, { timeout: 5000 });
      
      const links = document.head.querySelectorAll('link[rel="alternate"]');
      const hreflangMap: Record<string, string> = {};
      Array.from(links).forEach(link => {
        const hreflang = link.getAttribute('hreflang');
        const href = link.getAttribute('href');
        if (hreflang && href) {
          hreflangMap[hreflang] = href;
        }
      });

      // Test reciprocal relationship
      expect(hreflangMap['en']).toBe('https://www.octomatic.ai/');
      expect(hreflangMap['nl-NL']).toBe('https://www.octomatic.ai/nl');
      expect(hreflangMap['x-default']).toBe('https://www.octomatic.ai/');
      
      // Critical test: ensure all required hreflang tags are present
      expect(Object.keys(hreflangMap)).toEqual(
        expect.arrayContaining(['en', 'nl-NL', 'x-default'])
      );
    });

    it('should render complete hreflang cluster for Dutch homepage', async () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/nl']}>
            <LanguageProvider>
              <Meta />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>
      );

      // Wait for React Helmet to update the DOM
      await waitFor(() => {
        const links = document.head.querySelectorAll('link[rel="alternate"]');
        expect(links.length).toBeGreaterThanOrEqual(3);
      }, { timeout: 5000 });
      
      const links = document.head.querySelectorAll('link[rel="alternate"]');
      const hreflangMap: Record<string, string> = {};
      Array.from(links).forEach(link => {
        const hreflang = link.getAttribute('hreflang');
        const href = link.getAttribute('href');
        if (hreflang && href) {
          hreflangMap[hreflang] = href;
        }
      });

      // Test reciprocal relationship for Dutch page
      expect(hreflangMap['en']).toBe('https://www.octomatic.ai/');
      expect(hreflangMap['nl-NL']).toBe('https://www.octomatic.ai/nl');
      expect(hreflangMap['x-default']).toBe('https://www.octomatic.ai/');
      
      // Critical: Dutch page must reference itself with nl-NL
      expect(hreflangMap['nl-NL']).toBeDefined();
      expect(hreflangMap['nl-NL']).toContain('/nl');
    });

    it('should render reciprocal hreflang for service pages', async () => {
      const testCases = [
        { path: '/services', expectedEn: 'https://www.octomatic.ai/services', expectedNl: 'https://www.octomatic.ai/nl/services' },
        { path: '/contact', expectedEn: 'https://www.octomatic.ai/contact', expectedNl: 'https://www.octomatic.ai/nl/contact' },
        { path: '/blog', expectedEn: 'https://www.octomatic.ai/blog', expectedNl: 'https://www.octomatic.ai/nl/blog' }
      ];

      for (const testCase of testCases) {
        // Clear previous test data
        const existingLinks = document.head.querySelectorAll('link[rel="alternate"]');
        existingLinks.forEach(link => link.remove());

        render(
          <HelmetProvider>
            <MemoryRouter initialEntries={[testCase.path]}>
              <LanguageProvider>
                <Meta />
              </LanguageProvider>
            </MemoryRouter>
          </HelmetProvider>
        );

        // Wait for React Helmet to update the DOM
        await waitFor(() => {
          const links = document.head.querySelectorAll('link[rel="alternate"]');
          expect(links.length).toBeGreaterThanOrEqual(3);
        }, { timeout: 5000 });
        
        const links = document.head.querySelectorAll('link[rel="alternate"]');
        const hreflangMap: Record<string, string> = {};
        Array.from(links).forEach(link => {
          const hreflang = link.getAttribute('hreflang');
          const href = link.getAttribute('href');
          if (hreflang && href) {
            hreflangMap[hreflang] = href;
          }
        });

        expect(hreflangMap['en']).toBe(testCase.expectedEn);
        expect(hreflangMap['nl-NL']).toBe(testCase.expectedNl);
        expect(hreflangMap['x-default']).toBe(testCase.expectedEn);
      }
    });

    it('should maintain hreflang consistency across language pairs', async () => {
      const languagePairs = [
        { en: '/services', nl: '/nl/services' },
        { en: '/contact', nl: '/nl/contact' },
        { en: '/checklist', nl: '/nl/checklist' }
      ];

      for (const pair of languagePairs) {
        // Test English page
        let existingLinks = document.head.querySelectorAll('link[rel="alternate"]');
        existingLinks.forEach(link => link.remove());

        render(
          <HelmetProvider>
            <MemoryRouter initialEntries={[pair.en]}>
              <LanguageProvider>
                <Meta />
              </LanguageProvider>
            </MemoryRouter>
          </HelmetProvider>
        );

        await waitFor(() => {
          const links = document.head.querySelectorAll('link[rel="alternate"]');
          expect(links.length).toBeGreaterThanOrEqual(3);
        }, { timeout: 5000 });
        
        const enLinks = document.head.querySelectorAll('link[rel="alternate"]');
        const enHreflangs: Record<string, string> = {};
        Array.from(enLinks).forEach(link => {
          const hreflang = link.getAttribute('hreflang');
          const href = link.getAttribute('href');
          if (hreflang && href) {
            enHreflangs[hreflang] = href;
          }
        });

        // Clear for Dutch test
        existingLinks = document.head.querySelectorAll('link[rel="alternate"]');
        existingLinks.forEach(link => link.remove());

        // Test Dutch page
        render(
          <HelmetProvider>
            <MemoryRouter initialEntries={[pair.nl]}>
              <LanguageProvider>
                <Meta />
              </LanguageProvider>
            </MemoryRouter>
          </HelmetProvider>
        );

        await waitFor(() => {
          const links = document.head.querySelectorAll('link[rel="alternate"]');
          expect(links.length).toBeGreaterThanOrEqual(3);
        }, { timeout: 5000 });
        
        const nlLinks = document.head.querySelectorAll('link[rel="alternate"]');
        const nlHreflangs: Record<string, string> = {};
        Array.from(nlLinks).forEach(link => {
          const hreflang = link.getAttribute('hreflang');
          const href = link.getAttribute('href');
          if (hreflang && href) {
            nlHreflangs[hreflang] = href;
          }
        });

        // Test bidirectional consistency
        expect(enHreflangs['nl-NL']).toBe(nlHreflangs['nl-NL']);
        expect(enHreflangs['en']).toBe(nlHreflangs['en']);
        expect(enHreflangs['x-default']).toBe(nlHreflangs['x-default']);
      }
    });
  });
}); 