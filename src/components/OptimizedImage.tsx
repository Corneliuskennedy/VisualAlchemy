import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useLanguage from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
  isHero?: boolean;
  isThumbnail?: boolean;
  imgClassName?: string;
  addStructuredData?: boolean;
  imageUrl?: string;
  caption?: string;
  locale?: {
    alt?: string;
    caption?: string;
  };
}

/**
 * OptimizedImage component for better image loading, SEO, and performance.
 * Includes features like lazy loading, width/height attributes, and optional structured data.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onLoad,
  onError,
  placeholder,
  blurDataURL,
  isHero = false,
  isThumbnail = false,
  imgClassName = '',
  addStructuredData = false,
  imageUrl = '',
  caption = '',
  locale = {}
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(placeholder || '');
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine proper alt text based on language
  const finalAlt = isNL && locale.alt ? locale.alt : alt;
  const finalCaption = isNL && locale.caption ? locale.caption : caption;
  
  // Generate WebP and fallback sources
  const generateSources = (originalSrc: string) => {
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const extension = originalSrc.match(/\.(jpg|jpeg|png)$/i)?.[1] || 'jpg';
    
    return {
      webp: `${baseSrc}.webp`,
      original: originalSrc,
      fallback: `${baseSrc}.${extension}`
    };
  };

  const sources = generateSources(src);

  // Enhanced lazy loading with Intersection Observer
  useEffect(() => {
    if (priority) {
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageClasses = cn(
    'transition-opacity duration-300',
    {
      'opacity-0': !isLoaded && !hasError,
      'opacity-100': isLoaded,
      'opacity-50': hasError
    },
    className
  );

  // Enhanced alt text for SEO
  const enhancedAlt = alt || 'Octomatic AI Automation - Business Process Optimization';

  // Determine aspect ratio for padding-bottom calculation in wrapper
  const aspectRatio = (height && width) ? (height / width * 100) : 56.25; // Default to 16:9 if no dimensions
  
  // Generate image schema markup if requested
  let imageSchema = null;
  if (addStructuredData) {
    const fullImageUrl = imageUrl || (src.startsWith('https://') ? src : `https://www.octomatic.ai${src}`);
    
    imageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      'contentUrl': fullImageUrl,
      'description': finalAlt,
      'name': finalCaption || finalAlt,
      'width': width,
      'height': height,
      'representativeOfPage': isHero,
      'thumbnail': isThumbnail ? {
        '@type': 'ImageObject',
        'contentUrl': fullImageUrl.replace('.webp', '-thumbnail.webp'),
        'width': Math.round((width || 0) / 4),
        'height': Math.round((height || 0) / 4)
      } : undefined,
      'caption': finalCaption || undefined
    };
  }
  
  return (
    <>
      {addStructuredData && imageSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(imageSchema)}
          </script>
        </Helmet>
      )}
      
      <div 
        className={`img-wrapper ${className}`} 
        style={{
          paddingBottom: `${aspectRatio}%`,
          position: 'relative',
          width: '100%'
        }}
      >
        {/* Placeholder/Blur effect */}
        {blurDataURL && !isLoaded && (
          <img
            src={blurDataURL}
            alt=""
            className={cn(
              'absolute inset-0 w-full h-full object-cover scale-110 blur-sm',
              'transition-opacity duration-300',
              isLoaded ? 'opacity-0' : 'opacity-100'
            )}
            aria-hidden="true"
          />
        )}

        {/* Main optimized image */}
        <picture>
          {/* WebP source for modern browsers */}
          <source
            srcSet={currentSrc ? sources.webp : ''}
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={currentSrc || placeholder}
            alt={enhancedAlt}
            width={width}
            height={height}
            className={imageClasses}
            loading={priority ? 'eager' : loading}
            decoding={decoding}
            fetchPriority={priority ? 'high' : fetchPriority}
            onLoad={handleLoad}
            onError={handleError}
            sizes={sizes}
            // Enhanced SEO attributes
            itemProp="image"
            role="img"
          />
        </picture>

        {/* Loading state */}
        {!isLoaded && !hasError && currentSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
            <span className="text-sm">Failed to load image</span>
          </div>
        )}

        {finalCaption && (
          <figcaption className="text-sm text-gray-400 mt-2 italic text-center">
            {finalCaption}
          </figcaption>
        )}
      </div>
    </>
  );
};

export default OptimizedImage; 