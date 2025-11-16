/**
 * Placeholder Image System
 * 
 * Centralized placeholder image management for the website.
 * Replace these with actual images when available.
 */

export const placeholderImages = {
  hero: {
    desktop: '/images/placeholder-hero.jpg',
    mobile: '/images/placeholder-hero-mobile.jpg',
    alt: 'Hero background image',
  },
  section: {
    one: '/images/placeholder-section-1.jpg',
    two: '/images/placeholder-section-2.jpg',
    three: '/images/placeholder-section-3.jpg',
    alt: 'Section image',
  },
  card: {
    one: '/images/placeholder-card-1.jpg',
    two: '/images/placeholder-card-2.jpg',
    three: '/images/placeholder-card-3.jpg',
    alt: 'Card image',
  },
  team: {
    kennet: '/team/kennet_timmers.webp',
    alt: 'Team member',
  },
  logo: {
    client: '/logo/placeholder-client.svg',
    alt: 'Client logo',
  },
} as const;

/**
 * Get placeholder image with fallback
 */
export function getPlaceholderImage(
  category: keyof typeof placeholderImages,
  key?: string
): string {
  const categoryImages = placeholderImages[category];
  
  if (key && typeof categoryImages === 'object' && key in categoryImages) {
    return (categoryImages as Record<string, string>)[key];
  }
  
  // Return first available image in category or fallback
  if (typeof categoryImages === 'object' && 'desktop' in categoryImages) {
    return categoryImages.desktop;
  }
  
  return '/images/placeholder.jpg';
}

/**
 * Generate placeholder image URL using a service (for development)
 */
export function generatePlaceholderUrl(
  width: number,
  height: number,
  text?: string
): string {
  const textParam = text ? `&text=${encodeURIComponent(text)}` : '';
  return `https://via.placeholder.com/${width}x${height}?text=${text || 'Placeholder'}${textParam}`;
}


