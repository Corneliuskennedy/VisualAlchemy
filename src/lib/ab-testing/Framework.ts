/**
 * A/B Testing Framework
 * 
 * Custom A/B testing implementation
 * Multi-variant testing with statistical significance
 * 
 * Technical Showcase:
 * - A/B testing expertise
 * - Statistical analysis
 * - Conversion optimization
 */

'use client';

interface Variant {
  id: string;
  name: string;
  weight: number; // 0-100, percentage of traffic
  conversions: number;
  impressions: number;
}

interface Test {
  id: string;
  name: string;
  variants: Variant[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  minSampleSize?: number;
  confidenceLevel?: number; // 0.95 = 95% confidence
}

export class ABTestingFramework {
  private tests: Map<string, Test> = new Map();
  private assignments: Map<string, string> = new Map(); // userId -> variantId

  /**
   * Create a new A/B test
   */
  createTest(test: Omit<Test, 'startDate' | 'isActive'>): Test {
    const newTest: Test = {
      ...test,
      startDate: new Date(),
      isActive: true,
      minSampleSize: test.minSampleSize || 100,
      confidenceLevel: test.confidenceLevel || 0.95,
    };

    this.tests.set(test.id, newTest);
    return newTest;
  }

  /**
   * Get variant for a user (consistent assignment)
   */
  getVariant(testId: string, userId: string): Variant | null {
    const test = this.tests.get(testId);
    if (!test || !test.isActive) {
      return null;
    }

    // Check if user already has an assignment
    const assignmentKey = `${testId}:${userId}`;
    const existingAssignment = this.assignments.get(assignmentKey);
    
    if (existingAssignment) {
      return test.variants.find((v) => v.id === existingAssignment) || null;
    }

    // Assign variant based on weights
    const variant = this.assignVariant(test, userId);
    if (variant) {
      this.assignments.set(assignmentKey, variant.id);
      this.recordImpression(testId, variant.id);
    }

    return variant;
  }

  /**
   * Assign variant based on weights
   */
  private assignVariant(test: Test, userId: string): Variant | null {
    // Use userId hash for consistent assignment
    const hash = this.hashUserId(userId);
    const random = hash % 100;

    let cumulativeWeight = 0;
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (random < cumulativeWeight) {
        return variant;
      }
    }

    return test.variants[0] || null;
  }

  /**
   * Hash userId for consistent assignment
   */
  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Record impression
   */
  recordImpression(testId: string, variantId: string): void {
    const test = this.tests.get(testId);
    if (!test) return;

    const variant = test.variants.find((v) => v.id === variantId);
    if (variant) {
      variant.impressions++;
    }
  }

  /**
   * Record conversion
   */
  recordConversion(testId: string, variantId: string): void {
    const test = this.tests.get(testId);
    if (!test) return;

    const variant = test.variants.find((v) => v.id === variantId);
    if (variant) {
      variant.conversions++;
    }
  }

  /**
   * Calculate conversion rate
   */
  getConversionRate(testId: string, variantId: string): number {
    const test = this.tests.get(testId);
    if (!test) return 0;

    const variant = test.variants.find((v) => v.id === variantId);
    if (!variant || variant.impressions === 0) return 0;

    return (variant.conversions / variant.impressions) * 100;
  }

  /**
   * Check if test has reached statistical significance
   */
  isStatisticallySignificant(testId: string): boolean {
    const test = this.tests.get(testId);
    if (!test || test.variants.length < 2) return false;

    // Check minimum sample size
    const totalImpressions = test.variants.reduce((sum, v) => sum + v.impressions, 0);
    if (totalImpressions < (test.minSampleSize || 100)) {
      return false;
    }

    // Simple z-test for two variants
    if (test.variants.length === 2) {
      const [variantA, variantB] = test.variants;
      
      const rateA = this.getConversionRate(testId, variantA.id) / 100;
      const rateB = this.getConversionRate(testId, variantB.id) / 100;

      if (variantA.impressions === 0 || variantB.impressions === 0) {
        return false;
      }

      // Calculate z-score
      const pooledRate = (variantA.conversions + variantB.conversions) / 
                        (variantA.impressions + variantB.impressions);
      
      const se = Math.sqrt(
        pooledRate * (1 - pooledRate) * 
        (1 / variantA.impressions + 1 / variantB.impressions)
      );

      if (se === 0) return false;

      const zScore = Math.abs((rateA - rateB) / se);
      const zCritical = 1.96; // For 95% confidence

      return zScore > zCritical;
    }

    return false;
  }

  /**
   * Get winning variant
   */
  getWinningVariant(testId: string): Variant | null {
    const test = this.tests.get(testId);
    if (!test || !this.isStatisticallySignificant(testId)) {
      return null;
    }

    return test.variants.reduce((winner, variant) => {
      const winnerRate = this.getConversionRate(testId, winner.id);
      const variantRate = this.getConversionRate(testId, variant.id);
      return variantRate > winnerRate ? variant : winner;
    }, test.variants[0]);
  }

  /**
   * Get test results
   */
  getTestResults(testId: string) {
    const test = this.tests.get(testId);
    if (!test) return null;

    return {
      test,
      variants: test.variants.map((variant) => ({
        ...variant,
        conversionRate: this.getConversionRate(testId, variant.id),
      })),
      isSignificant: this.isStatisticallySignificant(testId),
      winningVariant: this.getWinningVariant(testId),
    };
  }
}

// Singleton instance
let abTestingInstance: ABTestingFramework | null = null;

export const getABTestingFramework = (): ABTestingFramework => {
  if (!abTestingInstance) {
    abTestingInstance = new ABTestingFramework();
  }
  return abTestingInstance;
};

export default getABTestingFramework;

