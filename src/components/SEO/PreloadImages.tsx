import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Component to handle preloaded images based on the current route
 * This ensures images are properly preloaded with the correct 'as' attribute
 * and are actually used on the page to avoid browser warnings
 */
export const PreloadImages: React.FC = () => {
  const pathname = usePathname();
  const path = pathname;
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const preloadedRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  // Force certain images to always be included in the preloaded images
  // This ensures any statically preloaded images are always "used" in our hidden container
  useEffect(() => {
    // Get all current preload links in the head
    const currentPreloads = Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]'));
    const preloadedPaths = currentPreloads.map(link => link.getAttribute('href')).filter(Boolean) as string[];
    
    // Add these to our state to ensure they're rendered in the hidden container
    if (preloadedPaths.length > 0) {
      setPreloadedImages(prev => {
        const combinedPaths = [...prev];
        preloadedPaths.forEach(path => {
          if (!combinedPaths.includes(path)) {
            combinedPaths.push(path);
          }
        });
        return combinedPaths;
      });
    }
  }, []);

  useEffect(() => {
    // Track which images have already been preloaded to avoid duplicates
    const alreadyPreloaded = preloadedRef.current;
    
    // Clean up any existing preload links to avoid duplicates
    const existingPreloads = document.head.querySelectorAll('link[rel="preload"][data-auto-preload="true"]');
    existingPreloads.forEach(node => {
      // Check if this preload should only be used on specific pages
      const onlyOn = node.getAttribute('data-only-on');
      if (onlyOn) {
        const allowedPaths = onlyOn.split(',');
        const isHomePage = path === '/' || path === '/nl';
        const shouldKeep = (allowedPaths.includes('homepage') && isHomePage) || 
                          allowedPaths.some(allowedPath => path.includes(allowedPath));
        
        // Remove preload if not applicable for current page
        if (!shouldKeep) {
          node.remove();
          const href = node.getAttribute('href');
          if (href && alreadyPreloaded.has(href)) {
            alreadyPreloaded.delete(href);
          }
        }
      } else {
        // If no restriction specified, remove to avoid duplication
        node.remove();
      }
    });

    // Determine which images to preload based on the current route
    const imagesToPreload: Array<{ path: string, type: string, priority: 'high' | 'low', onlyIfVisible?: boolean }> = [];

    // Amsterdam-specific pages
    if (path.includes('amsterdam') || path === '/' || path === '/nl') {
      imagesToPreload.push({ 
        path: '/images/hero-amsterdam.webp', 
        type: 'image/webp',
        priority: 'high'
      });
      
      // Only preload case study image if we're on a page that actually shows it
      if (path.includes('amsterdam') || path.includes('case-study')) {
        imagesToPreload.push({ 
          path: '/images/amsterdam-case-study.jpg', 
          type: 'image/jpeg',
          priority: 'low',
          onlyIfVisible: true // Only preload if the element will be visible
        });
      }
    }

    // Service pages
    if (path.includes('/services/') || path === '/services' || path === '/nl/services') {
      imagesToPreload.push({ 
        path: '/images/business-process-automation.jpg', 
        type: 'image/jpeg',
        priority: 'high'
      });
    }

    // Store the paths for rendering
    setPreloadedImages(prev => {
      const combinedPaths = [...imagesToPreload.map(img => img.path)];
      
      // Also check for any statically preloaded images in the head
      const staticPreloads = Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]:not([data-auto-preload="true"])'));
      staticPreloads.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !combinedPaths.includes(href)) {
          combinedPaths.push(href);
        }
      });
      
      return combinedPaths;
    });

    // Create preload links for each image
    imagesToPreload.forEach(image => {
      // Skip if already preloaded
      if (alreadyPreloaded.has(image.path)) {
        return;
      }
      
      // For images that should only be preloaded if visible, check if the element exists in the DOM
      if (image.onlyIfVisible) {
        // Check if there's an img tag or background with this image
        const imgExists = document.querySelector(`img[src*="${image.path}"]`);
        const bgExists = Array.from(document.querySelectorAll('[style*="background"]')).some(
          el => (el as HTMLElement).style.backgroundImage.includes(image.path)
        );
        
        // Skip preloading if the image won't be used
        if (!imgExists && !bgExists) {
          return;
        }
      }
      
      // Only preload if the image isn't already in the DOM
      if (!document.querySelector(`img[src="${image.path}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = image.path;
        link.as = 'image';
        link.type = image.type;
        link.setAttribute('data-auto-preload', 'true');
        link.setAttribute('fetchPriority', image.priority);
        
        // For high priority images, add them to the head immediately
        if (image.priority === 'high') {
          document.head.appendChild(link);
          alreadyPreloaded.add(image.path);
        } else {
          // For low priority images, defer loading
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              document.head.appendChild(link);
              alreadyPreloaded.add(image.path);
            }, { timeout: 1000 });
          } else {
            setTimeout(() => {
              document.head.appendChild(link);
              alreadyPreloaded.add(image.path);
            }, 500);
          }
        }
      }
    });

    // Set up a timer to check if preloaded images are actually used
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    
    // After 5 seconds, check if preloaded images are used and remove unused preloads
    timerRef.current = window.setTimeout(() => {
      const preloadLinks = document.head.querySelectorAll('link[rel="preload"][data-auto-preload="true"]');
      
      preloadLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check if this image is actually used in the DOM
        const isUsed = document.querySelector(`img[src="${href}"]`) || 
                       Array.from(document.querySelectorAll('[style*="background"]')).some(
                         el => (el as HTMLElement).style.backgroundImage.includes(href)
                       );
        
        // If not used, remove the preload link
        if (!isUsed) {
          link.remove();
          if (href && alreadyPreloaded.has(href)) {
            alreadyPreloaded.delete(href);
          }
        }
      });
    }, 5000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [path]);

  // Actually render the images in a hidden container to satisfy the browser's requirement
  // that preloaded resources are used
  return (
    <div 
      id="preloaded-images-container"
      style={{
        position: 'absolute',
        width: '0',
        height: '0',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0,
        visibility: 'hidden'
      }}
      aria-hidden="true"
    >
      {preloadedImages.map((src, index) => (
        <img
          key={`preload-${index}-${src}`}
          src={src}
          alt=""
          width="1"
          height="1"
          style={{
            position: 'absolute',
            opacity: '0.01',
            pointerEvents: 'none'
          }}
          data-preloaded-image="true"
          loading="eager"
          onLoad={() => {
            // Mark image as loaded in the DOM
            const img = document.querySelector(`img[src="${src}"]`);
            if (img) {
              img.setAttribute('data-preloaded', 'true');
            }
          }}
        />
      ))}
    </div>
  );
};

export default PreloadImages; 