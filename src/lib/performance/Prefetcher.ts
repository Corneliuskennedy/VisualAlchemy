/**
 * Predictive Prefetcher
 * 
 * Intelligently prefetches likely next pages based on:
 * - User behavior patterns
 * - Link hover/intent
 * - Scroll position
 * - Navigation history
 * 
 * Technical Showcase:
 * - Predictive algorithms
 * - Performance optimization
 * - Resource management
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';

interface PrefetchConfig {
  enabled: boolean;
  delay: number; // Delay before prefetching on hover (ms)
  maxConcurrent: number; // Max concurrent prefetches
  priorityRoutes: string[]; // Routes to always prefetch
}

class Prefetcher {
  private prefetchedRoutes = new Set<string>();
  private pendingPrefetches = new Set<string>();
  private hoverTimers = new Map<string, NodeJS.Timeout>();
  private config: PrefetchConfig;
  private router: any;

  constructor(config: Partial<PrefetchConfig> = {}) {
    this.config = {
      enabled: true,
      delay: 100, // Prefetch after 100ms hover
      maxConcurrent: 3,
      priorityRoutes: ['/contact', '/services', '/about'],
      ...config,
    };
  }

  setRouter(router: any) {
    this.router = router;
  }

  /**
   * Prefetch a route
   */
  async prefetch(href: string): Promise<void> {
    // Normalize href
    const normalizedHref = this.normalizeHref(href);

    // Skip if already prefetched or pending
    if (
      this.prefetchedRoutes.has(normalizedHref) ||
      this.pendingPrefetches.has(normalizedHref)
    ) {
      return;
    }

    // Skip if max concurrent reached
    if (this.pendingPrefetches.size >= this.config.maxConcurrent) {
      return;
    }

    // Skip external links
    if (normalizedHref.startsWith('http') || normalizedHref.startsWith('//')) {
      return;
    }

    // Skip hash links
    if (normalizedHref.startsWith('#')) {
      return;
    }

    this.pendingPrefetches.add(normalizedHref);

    try {
      // Use Next.js router prefetch
      if (this.router) {
        await this.router.prefetch(normalizedHref);
      } else {
        // Fallback: prefetch via link element
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = normalizedHref;
        link.as = 'document';
        document.head.appendChild(link);
      }

      this.prefetchedRoutes.add(normalizedHref);
    } catch (error) {
      console.warn('[Prefetcher] Failed to prefetch:', normalizedHref, error);
    } finally {
      this.pendingPrefetches.delete(normalizedHref);
    }
  }

  /**
   * Prefetch on link hover (with delay)
   */
  onLinkHover(href: string): void {
    if (!this.config.enabled) return;

    const normalizedHref = this.normalizeHref(href);

    // Clear existing timer
    const existingTimer = this.hoverTimers.get(normalizedHref);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      this.prefetch(normalizedHref);
      this.hoverTimers.delete(normalizedHref);
    }, this.config.delay);

    this.hoverTimers.set(normalizedHref, timer);
  }

  /**
   * Cancel hover prefetch
   */
  onLinkLeave(href: string): void {
    const normalizedHref = this.normalizeHref(href);
    const timer = this.hoverTimers.get(normalizedHref);
    if (timer) {
      clearTimeout(timer);
      this.hoverTimers.delete(normalizedHref);
    }
  }

  /**
   * Prefetch visible links in viewport
   */
  prefetchVisibleLinks(): void {
    if (!this.config.enabled) return;

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    const viewportLinks: string[] = [];

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const rect = link.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;

      if (isVisible) {
        viewportLinks.push(href);
      }
    });

    // Prefetch priority routes first
    const priorityLinks = viewportLinks.filter((href) =>
      this.config.priorityRoutes.some((route) => href.includes(route))
    );

    priorityLinks.forEach((href) => this.prefetch(href));

    // Then prefetch other visible links (limited)
    viewportLinks
      .filter((href) => !priorityLinks.includes(href))
      .slice(0, 2)
      .forEach((href) => this.prefetch(href));
  }

  /**
   * Prefetch likely next page based on current route
   */
  prefetchLikelyNext(currentPath: string): void {
    if (!this.config.enabled) return;

    const likelyNext: Record<string, string[]> = {
      '/': ['/contact', '/services', '/about'],
      '/services': ['/contact', '/about'],
      '/about': ['/contact', '/services'],
      '/contact': ['/services'],
      '/blog': ['/contact'],
    };

    const nextRoutes = likelyNext[currentPath] || [];
    nextRoutes.forEach((route) => this.prefetch(route));
  }

  /**
   * Normalize href
   */
  private normalizeHref(href: string): string {
    // Remove hash and query params for prefetching
    const url = new URL(href, window.location.origin);
    return url.pathname;
  }

  /**
   * Clear all prefetches
   */
  clear(): void {
    this.prefetchedRoutes.clear();
    this.pendingPrefetches.clear();
    this.hoverTimers.forEach((timer) => clearTimeout(timer));
    this.hoverTimers.clear();
  }
}

// Singleton instance
let prefetcherInstance: Prefetcher | null = null;

export const getPrefetcher = (config?: Partial<PrefetchConfig>): Prefetcher => {
  if (!prefetcherInstance) {
    prefetcherInstance = new Prefetcher(config);
  }
  return prefetcherInstance;
};

/**
 * React hook for prefetching
 */
export const usePrefetcher = (config?: Partial<PrefetchConfig>) => {
  const router = useRouter();
  const prefetcherRef = useRef<Prefetcher | null>(null);

  useEffect(() => {
    if (!prefetcherRef.current) {
      prefetcherRef.current = getPrefetcher(config);
      prefetcherRef.current.setRouter(router);
    }

    // Prefetch likely next pages on mount
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      prefetcherRef.current.prefetchLikelyNext(currentPath);

      // Prefetch visible links after a delay
      setTimeout(() => {
        prefetcherRef.current?.prefetchVisibleLinks();
      }, 1000);
    }

    // Set up link hover listeners
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an Element (not a Text node or other type)
      if (!target || !(target instanceof Element)) {
        return;
      }
      const link = target.closest('a[href]') as HTMLAnchorElement;
      if (link && link.href) {
        prefetcherRef.current?.onLinkHover(link.href);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an Element (not a Text node or other type)
      if (!target || !(target instanceof Element)) {
        return;
      }
      const link = target.closest('a[href]') as HTMLAnchorElement;
      if (link && link.href) {
        prefetcherRef.current?.onLinkLeave(link.href);
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [router, config]);

  return prefetcherRef.current;
};

export default getPrefetcher;

