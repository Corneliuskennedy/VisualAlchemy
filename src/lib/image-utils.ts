import { blogSupabase as supabase } from '@/lib/supabaseClients';

const BLOG_BUCKET = 'blog-images';
const IMAGE_SIZES = {
  small: { width: 400, height: 225 },
  medium: { width: 800, height: 450 },
  large: { width: 1600, height: 900 }
} as const;

type ImageSize = keyof typeof IMAGE_SIZES;

/**
 * Uploads a blog cover image in multiple sizes
 * @param file The original image file
 * @param slug The blog post slug
 * @returns The base path of the uploaded images
 */
export async function uploadBlogCoverImage(file: File, slug: string) {
  try {
    // Convert to WebP and resize for each size
    const imagePath = `covers/${slug}`;
    
    // Upload each size
    for (const [size, { width }] of Object.entries(IMAGE_SIZES)) {
      const fileName = `${width}.webp`;
      const filePath = `${imagePath}/${fileName}`;
      
      // Here you would typically resize the image to the correct width before uploading
      // For now, we'll just upload the original and let Supabase handle the transformation
      const { error } = await supabase.storage
        .from(BLOG_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) throw error;
    }

    return imagePath;
  } catch (error) {
    console.error('Error uploading blog cover image:', error);
    throw error;
  }
}

/**
 * Gets the URL for a blog image at a specific size
 * @param path The base path of the image (e.g., 'covers/my-blog-post')
 * @param size The desired size (small, medium, or large)
 * @returns The full URL for the image
 */
export function getBlogImageUrl(path: string, size: ImageSize = 'medium') {
  if (!path) return '/fallback.jpg';

  const { width } = IMAGE_SIZES[size];
  const { data } = supabase.storage
    .from(BLOG_BUCKET)
    .getPublicUrl(`${path}/${width}.webp`);

  return data.publicUrl;
}

/**
 * Generates srcSet for blog images
 * @param path The base path of the image
 * @returns Object with srcSet and sizes strings
 */
export function getBlogImageSrcSet(path: string) {
  if (!path) return {
    srcSet: '/fallback.jpg',
    sizes: '100vw'
  };

  const srcSet = Object.entries(IMAGE_SIZES)
    .map(([size, { width }]) => {
      const url = getBlogImageUrl(path, size as ImageSize);
      return `${url} ${width}w`;
    })
    .join(', ');

  return {
    srcSet,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  };
}

// Mobile-optimized image utilities with lazy loading of heavy functions

/**
 * Basic image URL generation - always available
 */
export const getImageUrl = (src: string, width?: number, quality: number = 85): string => {
  if (!src) return '';
  
  // If it's already a full URL, return as-is
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }
  
  // Basic path handling for local images
  const basePath = src.startsWith('/') ? src : `/${src}`;
  
  // For simple cases, return the basic path
  if (!width) {
    return basePath;
  }
  
  // Basic responsive image URL (without heavy processing)
  const ext = src.split('.').pop()?.toLowerCase();
  const nameWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));
  
  // Return WebP if supported, otherwise original
  if (typeof window !== 'undefined') {
    const supportsWebP = window.document?.createElement('canvas')
      ?.toDataURL('image/webp')
      ?.indexOf('data:image/webp') === 0;
    
    if (supportsWebP && ['jpg', 'jpeg', 'png'].includes(ext || '')) {
      return `${nameWithoutExt}_${width}.webp`;
    }
  }
  
  return `${nameWithoutExt}_${width}.${ext}`;
};

/**
 * Basic image preloading - lightweight
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Mobile-optimized image loading with intersection observer
 */
export const createImageObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Lazy-loaded heavy image processing functions
 * These are only loaded when actually needed to reduce initial bundle size
 */

// Lazy load image compression
export const compressImage = async (
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920
): Promise<Blob> => {
  // Dynamically import heavy image processing only when needed
  const { compressImageHeavy } = await import('./image-utils-heavy');
  return compressImageHeavy(file, quality, maxWidth);
};

// Lazy load image resizing
export const resizeImage = async (
  src: string,
  width: number,
  height: number,
  quality: number = 0.9
): Promise<string> => {
  const { resizeImageHeavy } = await import('./image-utils-heavy');
  return resizeImageHeavy(src, width, height, quality);
};

// Lazy load image format conversion
export const convertToWebP = async (src: string, quality: number = 0.8): Promise<string> => {
  const { convertToWebPHeavy } = await import('./image-utils-heavy');
  return convertToWebPHeavy(src, quality);
};

// Lazy load image optimization
export const optimizeImage = async (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): Promise<string> => {
  const { optimizeImageHeavy } = await import('./image-utils-heavy');
  return optimizeImageHeavy(src, options);
};

/**
 * Mobile-specific image utilities
 */
export const getMobileImageSizes = (baseWidth: number): string => {
  // Mobile-first responsive sizes
  const sizes = [
    `(max-width: 480px) ${Math.min(baseWidth, 480)}px`,
    `(max-width: 768px) ${Math.min(baseWidth, 768)}px`,
    `(max-width: 1024px) ${Math.min(baseWidth, 1024)}px`,
    `${baseWidth}px`
  ];
  
  return sizes.join(', ');
};

export const generateSrcSet = (src: string, widths: number[]): string => {
  return widths
    .map(width => `${getImageUrl(src, width)} ${width}w`)
    .join(', ');
};

/**
 * Performance-optimized image loading
 */
export const loadImageWithFallback = async (
  src: string,
  fallbackSrc?: string
): Promise<string> => {
  try {
    await preloadImage(src);
    return src;
  } catch (error) {
    if (fallbackSrc) {
      try {
        await preloadImage(fallbackSrc);
        return fallbackSrc;
      } catch (fallbackError) {
        console.warn('Both primary and fallback images failed to load');
        throw fallbackError;
      }
    }
    throw error;
  }
};

/**
 * Critical image detection for preloading
 */
export const isCriticalImage = (src: string): boolean => {
  const criticalPatterns = [
    'hero',
    'logo',
    'above-fold',
    'critical',
    'header'
  ];
  
  return criticalPatterns.some(pattern => 
    src.toLowerCase().includes(pattern)
  );
};

/**
 * Mobile bandwidth detection
 */
export const getConnectionSpeed = (): 'slow' | 'fast' | 'unknown' => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  
  if (connection) {
    // Slow connections: 2G, slow-2g
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      return 'slow';
    }
    // Fast connections: 4g
    if (connection.effectiveType === '4g') {
      return 'fast';
    }
  }
  
  return 'unknown';
};

/**
 * Adaptive image loading based on connection
 */
export const getAdaptiveImageUrl = (
  src: string,
  width: number,
  options: { quality?: number; forceWebP?: boolean } = {}
): string => {
  const connectionSpeed = getConnectionSpeed();
  
  let quality = options.quality || 85;
  
  // Reduce quality on slow connections
  if (connectionSpeed === 'slow') {
    quality = Math.max(quality * 0.7, 50);
  }
  
  return getImageUrl(src, width, quality);
}; 