import { useEffect } from 'react';

interface PreloadImagesProps {
  // Optional props for configuration
}

export const PreloadImages: React.FC<PreloadImagesProps> = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/logo/octomatic-400.webp',
      '/images/VSM400.webp',
      '/team/kennet_timmers.webp'
    ];

    const preloadImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };

    // Only preload on fast connections to avoid wasting bandwidth
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType && 
          ['4g', 'slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
        if (connection.effectiveType === '4g') {
          criticalImages.forEach(preloadImage);
        }
      }
    } else {
      // Fallback: preload on unknown connections
      criticalImages.forEach(preloadImage);
    }
  }, []);

  return null;
};

export default PreloadImages; 