import React, { useEffect } from 'react';

export function ContentQualityEnhancer() {
  useEffect(() => {
    const enhanceContent = () => {
      // Add content freshness indicators
      const addFreshnessSignals = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const mainContent = document.querySelector('main, .main-content, #main-content');
        if (mainContent && !mainContent.querySelector('.content-freshness')) {
          const freshnessIndicator = document.createElement('div');
          freshnessIndicator.className = 'content-freshness';
          freshnessIndicator.style.cssText = `
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: rgba(59, 130, 246, 0.05);
            border-left: 3px solid #3b82f6;
            border-radius: 0 4px 4px 0;
          `;
          freshnessIndicator.innerHTML = `
            <span>✨ Updated ${formattedDate} - Latest AI automation insights</span>
          `;
          
          const firstChild = mainContent.firstElementChild;
          if (firstChild) {
            mainContent.insertBefore(freshnessIndicator, firstChild);
          }
        }
      };

      // Add structured content sections
      const addStructuredSections = () => {
        const mainContent = document.querySelector('main, .main-content, #main-content');
        if (mainContent && !mainContent.querySelector('.enhanced-content-section')) {
          const benefitsSection = document.createElement('section');
          benefitsSection.className = 'enhanced-content-section benefits-section';
          benefitsSection.style.cssText = `
            margin: 2rem 0;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
            border-radius: 8px;
            border: 1px solid rgba(59, 130, 246, 0.1);
          `;
          
          benefitsSection.innerHTML = `
            <h3 style="color: #1f2937; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">
              🚀 Why Choose Our Amsterdam Solutions?
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
              <div style="padding: 1rem; background: white; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <strong style="color: #3b82f6;">⚡ Rapid Implementation</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #6b7280;">
                  Deploy intelligent process solutions within weeks, not months. Our proven methodology ensures quick wins.
                </p>
              </div>
              <div style="padding: 1rem; background: white; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <strong style="color: #3b82f6;">🎯 Amsterdam Expertise</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #6b7280;">
                  Local knowledge meets global best practices. We understand Dutch business culture and regulations.
                </p>
              </div>
              <div style="padding: 1rem; background: white; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <strong style="color: #3b82f6;">📊 Measurable ROI</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #6b7280;">
                  Track every euro saved and hour gained. Our solutions deliver 200-400% ROI within 6 months.
                </p>
              </div>
            </div>
          `;
          
          const firstHeading = mainContent.querySelector('h1, h2');
          const firstParagraph = mainContent.querySelector('p');
          const insertAfter = firstHeading || firstParagraph;
          
          if (insertAfter && insertAfter.parentNode) {
            insertAfter.parentNode.insertBefore(benefitsSection, insertAfter.nextSibling);
          }
        }
      };

      addFreshnessSignals();
      setTimeout(addStructuredSections, 1000);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhanceContent);
    } else {
      enhanceContent();
    }

    const observer = new MutationObserver((mutations) => {
      const hasNewContent = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );
      
      if (hasNewContent) {
        setTimeout(enhanceContent, 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 