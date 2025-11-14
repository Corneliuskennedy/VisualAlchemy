/**
 * @deprecated Use useContent() or useHomepage() from '@/hooks/useContent' instead
 * This file is kept for backward compatibility but will be removed
 */

'use client';

import { useHomepage } from './useContent';

/**
 * @deprecated Use useHomepage() instead
 */
export function useLocalizedContent() {
  // Re-export for backward compatibility
  return useHomepage();
}

/**
 * @deprecated Use useHomepage() instead
 */
export function useHomepageContent() {
  return useHomepage();
}

