import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MobileOptimizationProps {
  enableViewportFit?: boolean;
  enableTouchEvents?: boolean;
  enableTapTargets?: boolean;
  enableAppBanner?: boolean;
  appName?: string;
  appIcon?: string;
  enablePWAMeta?: boolean;
  pwaIcon?: string;
  splashScreens?: Array<{
    media: string;
    href: string;
    sizes: string;
  }>;
}

/**
 * MobileOptimization component enhances the site for mobile users
 * by adding mobile-specific meta tags, improving tap targets,
 * and enabling app-like features.
 */
const MobileOptimization: React.FC<MobileOptimizationProps> = ({
  enableViewportFit = true,
  enableTouchEvents = true, 
  enableTapTargets = true,
  enableAppBanner = true,
  appName = 'Octomatic',
  appIcon = '/logo/octomatic-800.png',
  enablePWAMeta = true,
  pwaIcon = '/logo/octomatic-512.png',
  splashScreens = [
    {
      media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      href: '/splashscreens/iPhone_13_Pro.png',
      sizes: '1170x2532'
    },
    {
      media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      href: '/splashscreens/iPhone_11.png', 
      sizes: '828x1792'
    }
  ]
}) => {
  // CSS for mobile tap target optimization
  const tapTargetCSS = enableTapTargets ? `
    /* Ensure buttons and links have at least 44x44px tap targets */
    @media (max-width: 768px) {
      a, button, input[type="button"], input[type="submit"] {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Increase tap spacing */
      ul.mobile-nav li, 
      .footer-links li,
      .mobile-menu-item {
        margin-bottom: 8px;
        padding: 8px 0;
      }
      
      /* Ensure adequate spacing between interactive elements */
      .tap-target {
        padding: 12px;
      }
      
      /* Make form elements more tappable */
      input, select, textarea {
        min-height: 44px;
        font-size: 16px; /* Prevent iOS zoom */
      }
    }
  ` : '';

  return (
    <Helmet>
      {/* Viewport settings for mobile optimization */}
      {enableViewportFit && (
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      )}
      
      {/* Touch event optimizations */}
      {enableTouchEvents && (
        <>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="format-detection" content="telephone=no" />
        </>
      )}
      
      {/* App banner for mobile */}
      {enableAppBanner && (
        <>
          <meta name="apple-itunes-app" content="app-id=123456789" />
          <meta name="apple-mobile-web-app-title" content={appName} />
          <link rel="apple-touch-icon" href={appIcon} />
        </>
      )}
      
      {/* PWA metadata */}
      {enablePWAMeta && (
        <>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#324c9e" />
          <meta name="application-name" content={appName} />
          <link rel="icon" sizes="512x512" href={pwaIcon} />
        </>
      )}
      
      {/* Splash screens for iOS */}
      {splashScreens.map((screen, index) => (
        <link 
          key={index}
          rel="apple-touch-startup-image"
          media={screen.media}
          href={screen.href}
          sizes={screen.sizes}
        />
      ))}
      
      {/* Add tap target optimization CSS */}
      {enableTapTargets && (
        <style type="text/css">{tapTargetCSS}</style>
      )}
    </Helmet>
  );
};

export default MobileOptimization; 