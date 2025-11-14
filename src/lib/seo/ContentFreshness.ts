/**
 * Content Freshness Management
 * 
 * Tracks and manages content update dates for 2025 SEO.
 * Content freshness is a ranking factor - search engines favor recently updated content.
 * 
 * Strategy:
 * - Track lastModified dates for all pages
 * - Update dates when content changes significantly
 * - Use structured data to signal freshness
 */

export interface ContentMetadata {
  publishedTime: string; // ISO 8601 format (YYYY-MM-DD)
  modifiedTime: string; // ISO 8601 format (YYYY-MM-DD)
  updateFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Get content freshness metadata for a page
 * 
 * @param {string} pagePath - Page path (e.g., '/', '/optimize', '/build')
 * @returns {ContentMetadata} Content metadata with dates
 */
export function getContentFreshness(pagePath: string): ContentMetadata {
  // Base dates - update these when content changes significantly
  const basePublished = '2019-01-01'; // Original site launch
  const baseModified = new Date().toISOString().split('T')[0]; // Current date

  // Page-specific modification dates
  // Update these dates when you make significant content changes
  // Last comprehensive update: 2025-11-14
  const pageModifications: Record<string, string> = {
    // Main pages
    '/': '2025-11-14', // Homepage - update when hero/content changes
    '/optimize': '2025-11-14',
    '/build': '2025-11-14',
    '/create': '2025-11-14',
    '/contact': '2025-11-14',
    '/about-us': '2025-11-14',
    '/about': '2025-11-14',
    '/get-started': '2025-11-14',
    '/services': '2025-11-14',
    '/projects': '2025-11-14',
    '/projecten': '2025-11-14',
    '/our-work': '2025-11-14',
    '/careers': '2025-11-14',
    '/partnership': '2025-11-14',
    '/checklist': '2025-11-14',
    '/startup-kickoff-lab': '2025-11-14',
    '/business-automation': '2025-11-14',
    '/automation-strategy-workshop': '2025-11-14',
    '/over-ons': '2025-11-14',
    
    // Service pages
    '/services/ai-automation-amsterdam': '2025-11-14',
    '/services/ai-service-fulfillment': '2025-11-14',
    '/services/crm-buildouts': '2025-11-14',
    '/services/hiring-systems': '2025-11-14',
    '/services/lead-generation': '2025-11-14',
    '/services/project-management': '2025-11-14',
    '/services/sops-consulting': '2025-11-14',
    '/services/startup-kickoff-lab': '2025-11-14',
    
    // Legal/Policy pages
    '/privacy': '2025-11-14',
    '/privacy-policy': '2025-11-14',
    '/terms': '2025-11-14',
    '/terms-of-service': '2025-11-14',
    '/cookies': '2025-11-14',
    
    // Tools & Reports
    '/tools/automation-roi-calculator': '2025-11-14',
    '/reports/state-of-ai-dutch-smes-2025': '2025-11-14',
    
    // Blog & Author pages (dynamic - will use baseModified)
    '/blog': '2025-11-14',
    '/author/kennet-timmers': '2025-11-14',
  };

  return {
    publishedTime: basePublished,
    modifiedTime: pageModifications[pagePath] || baseModified,
    updateFrequency: 'monthly', // How often content is reviewed/updated
  };
}

/**
 * Format date for structured data (ISO 8601)
 * 
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} ISO 8601 formatted date
 */
export function formatDateForSchema(dateString: string): string {
  return new Date(dateString).toISOString();
}

/**
 * Check if content should be updated based on freshness
 * 
 * @param {ContentMetadata} metadata - Content metadata
 * @param {number} daysThreshold - Days threshold (default: 90)
 * @returns {boolean} True if content should be updated
 */
export function shouldUpdateContent(metadata: ContentMetadata, daysThreshold: number = 90): boolean {
  const modifiedDate = new Date(metadata.modifiedTime);
  const daysSinceUpdate = (Date.now() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > daysThreshold;
}

