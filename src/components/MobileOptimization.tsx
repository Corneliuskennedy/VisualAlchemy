import { useEffect } from 'react';

interface MobileOptimizationProps {
  enableTapTargets?: boolean;
  enableViewportFit?: boolean;
  enableTouchEvents?: boolean;
  enableAppBanner?: boolean;
  enablePWAMeta?: boolean;
}

export const MobileOptimization: React.FC<MobileOptimizationProps> = ({
  enableTapTargets = true,
  enableViewportFit = true,
  enableTouchEvents = true,
  enableAppBanner = false,
  enablePWAMeta = true
}) => {
  useEffect(() => {
    // Only run on mobile devices
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    // Add mobile-specific optimizations
    const optimizations = [];

    if (enableTapTargets) {
      optimizations.push('tap-targets');
    }

    if (enableViewportFit) {
      // Add viewport-fit for devices with notches
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        const content = viewportMeta.getAttribute('content');
        if (content && !content.includes('viewport-fit')) {
          viewportMeta.setAttribute('content', content + ', viewport-fit=cover');
        }
      }
    }

    if (enableTouchEvents) {
      // Optimize touch events
      document.body.style.touchAction = 'manipulation';
    }

    if (enablePWAMeta) {
      // Add PWA meta tags if not present
      const addMetaTag = (name: string, content: string) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
        }
      };

      addMetaTag('mobile-web-app-capable', 'yes');
      addMetaTag('apple-mobile-web-app-capable', 'yes');
      addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    }

    // Cleanup function
    return () => {
      if (enableTouchEvents) {
        document.body.style.touchAction = '';
      }
    };
  }, [enableTapTargets, enableViewportFit, enableTouchEvents, enableAppBanner, enablePWAMeta]);

  return null;
};

export default MobileOptimization; 