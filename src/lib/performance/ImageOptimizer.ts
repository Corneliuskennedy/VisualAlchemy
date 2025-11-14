/**
 * Advanced Image Optimizer
 * 
 * Features:
 * - Blur-up technique (low-quality placeholder)
 * - Responsive image generation
 * - WebP/AVIF format detection
 * - Lazy loading optimization
 * - Intersection Observer integration
 * 
 * Technical Showcase:
 * - Advanced image optimization
 * - Performance techniques
 * - Modern web standards
 */

'use client';

interface ImageOptimizerOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  blur?: boolean;
  blurAmount?: number;
  lazy?: boolean;
  sizes?: string;
}

interface BlurData {
  dataURL: string;
  width: number;
  height: number;
}

export class ImageOptimizer {
  private static readonly BLUR_SIZE = 20; // Small size for blur placeholder
  private static readonly DEFAULT_QUALITY = 85;

  /**
   * Generate blur placeholder from image
   */
  static async generateBlurPlaceholder(
    src: string,
    blurAmount: number = 10
  ): Promise<string> {
    try {
      // Create a small canvas to generate blur
      const img = new Image();
      img.crossOrigin = 'anonymous';

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Set small size for blur
          canvas.width = ImageOptimizer.BLUR_SIZE;
          canvas.height =
            (ImageOptimizer.BLUR_SIZE * img.height) / img.width;

          // Draw and blur
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Apply blur effect
          const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const blurredData = this.applyBlur(imageData, blurAmount);
          ctx.putImageData(blurredData, 0, 0);

          // Convert to data URL
          const dataURL = canvas.toDataURL('image/jpeg', 0.3);
          resolve(dataURL);
        };

        img.onerror = () => {
          // Fallback: return a simple base64 placeholder
          resolve(this.getDefaultBlurPlaceholder());
        };

        img.src = src;
      });
    } catch (error) {
      console.warn('[ImageOptimizer] Failed to generate blur:', error);
      return this.getDefaultBlurPlaceholder();
    }
  }

  /**
   * Apply blur effect to image data
   */
  private static applyBlur(
    imageData: ImageData,
    radius: number
  ): ImageData {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const newData = new Uint8ClampedArray(data);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0,
          count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const idx = (ny * width + nx) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              a += data[idx + 3];
              count++;
            }
          }
        }

        const idx = (y * width + x) * 4;
        newData[idx] = r / count;
        newData[idx + 1] = g / count;
        newData[idx + 2] = b / count;
        newData[idx + 3] = a / count;
      }
    }

    return new ImageData(newData, width, height);
  }

  /**
   * Get default blur placeholder (simple gradient)
   */
  private static getDefaultBlurPlaceholder(): string {
    // Return a simple base64-encoded 1x1 pixel placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }

  /**
   * Generate responsive image srcset
   */
  static generateSrcSet(
    baseSrc: string,
    widths: number[] = [400, 800, 1200, 1600],
    format?: 'webp' | 'avif'
  ): string {
    const formatExt = format ? `.${format}` : '';
    return widths
      .map((width) => {
        const src = this.getOptimizedSrc(baseSrc, width, format);
        return `${src} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Get optimized image source
   */
  static getOptimizedSrc(
    src: string,
    width?: number,
    format?: 'webp' | 'avif',
    quality: number = ImageOptimizer.DEFAULT_QUALITY
  ): string {
    // If it's already a full URL with optimization params, return as-is
    if (src.includes('?') && (src.includes('width') || src.includes('w='))) {
      return src;
    }

    // Handle Next.js Image Optimization API
    if (src.startsWith('/') && !src.startsWith('//')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      params.set('q', quality.toString());
      if (format) params.set('f', format);

      return `${src}?${params.toString()}`;
    }

    // For external URLs, try to use their optimization APIs
    if (src.includes('supabase.co') || src.includes('storage.googleapis.com')) {
      const url = new URL(src);
      if (width) url.searchParams.set('width', width.toString());
      url.searchParams.set('quality', quality.toString());
      if (format) url.searchParams.set('format', format);
      return url.toString();
    }

    return src;
  }

  /**
   * Check if browser supports WebP
   */
  static async supportsWebP(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Check if browser supports AVIF
   */
  static async supportsAVIF(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    return new Promise((resolve) => {
      const avif = new Image();
      avif.onload = avif.onerror = () => {
        resolve(avif.height === 1);
      };
      avif.src =
        'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhhB';
    });
  }

  /**
   * Get best format for browser
   */
  static async getBestFormat(): Promise<'webp' | 'avif' | 'jpeg'> {
    if (await this.supportsAVIF()) return 'avif';
    if (await this.supportsWebP()) return 'webp';
    return 'jpeg';
  }

  /**
   * Preload image
   */
  static preloadImage(src: string, as: 'image' | 'fetch' = 'image'): void {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = as;
    document.head.appendChild(link);
  }

  /**
   * Lazy load image with Intersection Observer
   */
  static observeImage(
    img: HTMLImageElement,
    callback: () => void
  ): IntersectionObserver | null {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: load immediately
      callback();
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
      }
    );

    observer.observe(img);
    return observer;
  }
}

export default ImageOptimizer;

