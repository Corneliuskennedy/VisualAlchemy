/**
 * Image Error Handler
 * 
 * Prevents crashes when images are missing or fail to load
 * Handles Next.js Image optimization errors gracefully
 */

export function handleImageError(
  error: Error | Event,
  fallbackSrc?: string
): void {
  // Prevent error propagation
  if (error instanceof Event) {
    error.preventDefault();
    error.stopPropagation();
  }

  // Log in development only
  if (process.env.NODE_ENV === 'development') {
    console.warn('Image failed to load:', error);
  }
}

/**
 * Check if an image exists before trying to load it
 * This prevents Next.js Image optimization from crashing on missing files
 */
export async function checkImageExists(src: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    // Server-side: assume image exists (Next.js will handle 404)
    return true;
  }

  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Safe image source - returns placeholder if image doesn't exist
 * Prevents Next.js Image optimization from crashing on missing files
 */
export function getSafeImageSrc(src: string, placeholder?: string): string {
  if (!src) return placeholder || '';
  
  // List of known missing images - return empty to prevent processing
  const missingImages = [
    '/team/timo.webp',
    '/team/boris.webp',
  ];

  if (missingImages.includes(src)) {
    // Return empty string to prevent Next.js from trying to optimize
    return '';
  }

  return src;
}

