import React, { useEffect } from 'react';

export function AccessibilityEnhancements() {
  useEffect(() => {
    // Add skip navigation link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    // Show skip link on focus
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    // Insert as first element in body
    if (document.body && !document.querySelector('.skip-link')) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Add main content landmark
    const rootElement = document.getElementById('root');
    if (rootElement && !rootElement.querySelector('#main-content')) {
      const mainContent = document.createElement('main');
      mainContent.id = 'main-content';
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('aria-label', 'Main content');
      
      // Wrap existing content
      while (rootElement.firstChild) {
        mainContent.appendChild(rootElement.firstChild);
      }
      rootElement.appendChild(mainContent);
    }

    // Add ARIA landmarks for better navigation
    const addAriaLandmarks = () => {
      // Navigation landmark
      const navElements = document.querySelectorAll('nav:not([role])');
      navElements.forEach(nav => {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
      });

      // Button accessibility
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach(button => {
        if (!button.textContent?.trim()) {
          button.setAttribute('aria-label', 'Action button');
        }
      });

      // Link accessibility
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach(link => {
        if (!link.textContent?.trim() && !link.querySelector('img[alt]')) {
          link.setAttribute('aria-label', 'Navigation link');
        }
      });

      // Form accessibility
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]):not([id])');
      inputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
          input.setAttribute('aria-label', placeholder);
        }
      });

      // Image accessibility
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach(img => {
        img.setAttribute('alt', 'Image');
      });

      // Add focus indicators for better keyboard navigation
      const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (!htmlElement.style.outline && !getComputedStyle(htmlElement).outline) {
          htmlElement.addEventListener('focus', () => {
            htmlElement.style.outline = '2px solid #3b82f6';
            htmlElement.style.outlineOffset = '2px';
          });
          
          htmlElement.addEventListener('blur', () => {
            htmlElement.style.outline = '';
            htmlElement.style.outlineOffset = '';
          });
        }
      });
    };

    // Run immediately and on DOM changes
    addAriaLandmarks();
    
    // Observer for dynamic content
    const observer = new MutationObserver(() => {
      addAriaLandmarks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      observer.disconnect();
      const existingSkipLink = document.querySelector('.skip-link');
      if (existingSkipLink) {
        existingSkipLink.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Mobile-specific contact enhancements
export function MobileContactEnhancements() {
  useEffect(() => {
    // Add mobile-specific contact links
    const addMobileContactLinks = () => {
      // Find contact information and make it mobile-friendly
      const phoneNumbers = document.querySelectorAll('*:not(a)');
      phoneNumbers.forEach(element => {
        if (element.textContent?.includes('+31-20-123-4567') && !element.closest('a[href^="tel:"]')) {
          const phoneLink = document.createElement('a');
          phoneLink.href = 'tel:+31201234567';
          phoneLink.className = 'mobile-phone-link';
          phoneLink.style.cssText = `
            color: #3b82f6;
            text-decoration: none;
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            background: rgba(59, 130, 246, 0.1);
            margin: 0 4px;
          `;
          phoneLink.textContent = '+31-20-123-4567';
          phoneLink.setAttribute('aria-label', 'Call Octomatic Amsterdam office');
          
          // Replace text content
          if (element.textContent) {
            element.innerHTML = element.innerHTML.replace(
              '+31-20-123-4567',
              phoneLink.outerHTML
            );
          }
        }
      });

      // Add email links
      const emailElements = document.querySelectorAll('*:not(a)');
      emailElements.forEach(element => {
        if (element.textContent?.includes('hello@octomatic.ai') && !element.closest('a[href^="mailto:"]')) {
          const emailLink = document.createElement('a');
          emailLink.href = 'mailto:hello@octomatic.ai?subject=AI Automation Inquiry';
          emailLink.className = 'mobile-email-link';
          emailLink.style.cssText = `
            color: #3b82f6;
            text-decoration: none;
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            background: rgba(59, 130, 246, 0.1);
            margin: 0 4px;
          `;
          emailLink.textContent = 'hello@octomatic.ai';
          emailLink.setAttribute('aria-label', 'Send email to Octomatic');
          
          // Replace text content
          if (element.textContent) {
            element.innerHTML = element.innerHTML.replace(
              'hello@octomatic.ai',
              emailLink.outerHTML
            );
          }
        }
      });
    };

    // Run after a short delay to ensure content is loaded
    const timer = setTimeout(addMobileContactLinks, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
} 