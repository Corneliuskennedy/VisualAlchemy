/**
 * Dynamic Content Optimization Engine
 * 
 * Optimizes content, CTAs, and offers based on detected intent
 * Uses multi-armed bandit algorithm for A/B testing
 * 
 * Technical Showcase:
 * - Adaptive content delivery
 * - A/B testing with statistical significance
 * - Real-time optimization
 * - Privacy-compliant personalization
 */

import { IntentType, IntentScore } from './types';

interface ContentVariant {
  id: string;
  content: {
    headline: string;
    cta: string;
    offer?: string;
    testimonial?: string;
  };
  performance: {
    impressions: number;
    conversions: number;
    conversionRate: number;
  };
}

interface ContentSet {
  startup: ContentVariant[];
  sme: ContentVariant[];
  universal: ContentVariant[];
}

class ContentOptimizer {
  private contentSets: ContentSet = {
    startup: [],
    sme: [],
    universal: [],
  };

  private readonly epsilon = 0.1; // Exploration rate (10% exploration, 90% exploitation)

  /**
   * Initialize content variants
   */
  initializeVariants(variants: {
    startup?: ContentVariant[];
    sme?: ContentVariant[];
    universal?: ContentVariant[];
  }): void {
    if (variants.startup) this.contentSets.startup = variants.startup;
    if (variants.sme) this.contentSets.sme = variants.sme;
    if (variants.universal) this.contentSets.universal = variants.universal;
  }

  /**
   * Get optimized content for intent
   * Uses multi-armed bandit algorithm
   */
  getOptimizedContent(intent: IntentScore): ContentVariant {
    const variants = this.contentSets[intent.type] || this.contentSets.universal;

    if (variants.length === 0) {
      throw new Error(`No content variants available for intent: ${intent.type}`);
    }

    // Multi-armed bandit: epsilon-greedy strategy
    const shouldExplore = Math.random() < this.epsilon;

    if (shouldExplore || variants.every(v => v.performance.impressions < 10)) {
      // Exploration: choose random variant
      return this.selectRandomVariant(variants);
    } else {
      // Exploitation: choose best performing variant
      return this.selectBestVariant(variants);
    }
  }

  /**
   * Select random variant (exploration)
   */
  private selectRandomVariant(variants: ContentVariant[]): ContentVariant {
    const index = Math.floor(Math.random() * variants.length);
    return variants[index];
  }

  /**
   * Select best performing variant (exploitation)
   * Uses Upper Confidence Bound (UCB) algorithm
   */
  private selectBestVariant(variants: ContentVariant[]): ContentVariant {
    const totalImpressions = variants.reduce((sum, v) => sum + v.performance.impressions, 0);

    // Calculate UCB score for each variant
    const scoredVariants = variants.map(variant => {
      const impressions = variant.performance.impressions;
      const conversionRate = variant.performance.conversionRate;
      
      // UCB formula: mean + confidence interval
      const confidenceInterval = Math.sqrt(
        (2 * Math.log(totalImpressions)) / Math.max(impressions, 1)
      );
      
      const ucbScore = conversionRate + confidenceInterval;
      
      return {
        variant,
        score: ucbScore,
      };
    });

    // Select variant with highest UCB score
    scoredVariants.sort((a, b) => b.score - a.score);
    return scoredVariants[0].variant;
  }

  /**
   * Record impression (content shown)
   */
  recordImpression(variantId: string, intent: IntentType): void {
    const variants = this.contentSets[intent] || this.contentSets.universal;
    const variant = variants.find(v => v.id === variantId);
    
    if (variant) {
      variant.performance.impressions++;
      this.updateConversionRate(variant);
    }
  }

  /**
   * Record conversion (goal achieved)
   */
  recordConversion(variantId: string, intent: IntentType): void {
    const variants = this.contentSets[intent] || this.contentSets.universal;
    const variant = variants.find(v => v.id === variantId);
    
    if (variant) {
      variant.performance.conversions++;
      this.updateConversionRate(variant);
    }
  }

  /**
   * Update conversion rate
   */
  private updateConversionRate(variant: ContentVariant): void {
    if (variant.performance.impressions > 0) {
      variant.performance.conversionRate = 
        variant.performance.conversions / variant.performance.impressions;
    }
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats(intent?: IntentType) {
    const intents: IntentType[] = intent 
      ? [intent] 
      : ['startup', 'sme', 'universal'];

    return intents.map(i => ({
      intent: i,
      variants: this.contentSets[i].map(v => ({
        id: v.id,
        performance: { ...v.performance },
      })),
    }));
  }

  /**
   * Reset performance data
   */
  resetPerformance(): void {
    Object.values(this.contentSets).forEach((variants: ContentVariant[]) => {
      variants.forEach((variant: ContentVariant) => {
        variant.performance = {
          impressions: 0,
          conversions: 0,
          conversionRate: 0,
        };
      });
    });
  }
}

// Singleton instance
let optimizerInstance: ContentOptimizer | null = null;

export const getContentOptimizer = (): ContentOptimizer => {
  if (!optimizerInstance) {
    optimizerInstance = new ContentOptimizer();
  }
  return optimizerInstance;
};

export default ContentOptimizer;

