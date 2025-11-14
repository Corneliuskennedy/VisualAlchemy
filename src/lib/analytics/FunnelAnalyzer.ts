/**
 * Conversion Funnel Analyzer
 * 
 * Analyzes conversion funnels and identifies drop-off points
 * Provides insights for optimization
 * 
 * Technical Showcase:
 * - Data analysis
 * - Funnel optimization
 * - Conversion tracking
 */

'use client';

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  dropoffRate: number; // Percentage of users who dropped off at this stage
  avgTimeToStage: number; // Average time (ms) to reach this stage
}

export interface FunnelAnalysis {
  stages: FunnelStage[];
  totalEntered: number;
  totalConverted: number;
  overallConversionRate: number;
  biggestDropoff: FunnelStage | null;
  recommendations: string[];
}

export class FunnelAnalyzer {
  /**
   * Analyze conversion funnel
   */
  analyzeFunnel(stages: Array<{ id: string; name: string; count: number }>): FunnelAnalysis {
    if (stages.length === 0) {
      return {
        stages: [],
        totalEntered: 0,
        totalConverted: 0,
        overallConversionRate: 0,
        biggestDropoff: null,
        recommendations: [],
      };
    }

    const totalEntered = stages[0]?.count || 0;
    const totalConverted = stages[stages.length - 1]?.count || 0;
    const overallConversionRate = totalEntered > 0 
      ? (totalConverted / totalEntered) * 100 
      : 0;

    // Calculate dropoff rates
    const analyzedStages: FunnelStage[] = stages.map((stage, index) => {
      const previousCount = index > 0 ? stages[index - 1].count : totalEntered;
      const dropoffRate = previousCount > 0 
        ? ((previousCount - stage.count) / previousCount) * 100 
        : 0;

      return {
        ...stage,
        dropoffRate,
        avgTimeToStage: this.estimateTimeToStage(index), // Placeholder - would come from real data
      };
    });

    // Find biggest dropoff
    const biggestDropoff = analyzedStages.reduce((biggest, stage) => {
      return stage.dropoffRate > (biggest?.dropoffRate || 0) ? stage : biggest;
    }, analyzedStages[0]);

    // Generate recommendations
    const recommendations = this.generateRecommendations(analyzedStages, biggestDropoff);

    return {
      stages: analyzedStages,
      totalEntered,
      totalConverted,
      overallConversionRate,
      biggestDropoff,
      recommendations,
    };
  }

  /**
   * Estimate time to stage (placeholder - would use real analytics data)
   */
  private estimateTimeToStage(stageIndex: number): number {
    // Rough estimates based on typical user behavior
    const estimates = [0, 5000, 15000, 30000, 60000]; // milliseconds
    return estimates[Math.min(stageIndex, estimates.length - 1)];
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(
    stages: FunnelStage[],
    biggestDropoff: FunnelStage
  ): string[] {
    const recommendations: string[] = [];

    if (biggestDropoff.dropoffRate > 50) {
      recommendations.push(
        `High dropoff at "${biggestDropoff.name}" stage (${biggestDropoff.dropoffRate.toFixed(1)}%). Consider optimizing this step.`
      );
    }

    if (stages.length > 0) {
      const firstStageDropoff = stages[0].dropoffRate;
      if (firstStageDropoff > 30) {
        recommendations.push(
          'High initial dropoff. Consider improving page load speed and initial value proposition.'
        );
      }
    }

    if (stages.length > 1) {
      const lastStage = stages[stages.length - 1];
      const secondToLast = stages[stages.length - 2];
      if (lastStage.dropoffRate > 40) {
        recommendations.push(
          `High dropoff between "${secondToLast.name}" and "${lastStage.name}". Simplify the conversion process.`
        );
      }
    }

    // Check for long average times
    const slowStages = stages.filter((s) => s.avgTimeToStage > 30000);
    if (slowStages.length > 0) {
      recommendations.push(
        `Some stages take longer than expected. Consider reducing friction at: ${slowStages.map((s) => s.name).join(', ')}`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push('Funnel performance looks good! Continue monitoring for optimization opportunities.');
    }

    return recommendations;
  }

  /**
   * Compare two funnels
   */
  compareFunnels(
    baseline: FunnelAnalysis,
    variant: FunnelAnalysis
  ): {
    improvement: number;
    isSignificant: boolean;
    insights: string[];
  } {
    const improvement = variant.overallConversionRate - baseline.overallConversionRate;
    const improvementPercent = baseline.overallConversionRate > 0
      ? (improvement / baseline.overallConversionRate) * 100
      : 0;

    // Simple significance check (would use proper statistical test in production)
    const isSignificant = Math.abs(improvement) > 1 && 
                         variant.totalEntered > 100 &&
                         baseline.totalEntered > 100;

    const insights: string[] = [];

    if (improvement > 0) {
      insights.push(`Variant shows ${improvementPercent.toFixed(1)}% improvement in conversion rate.`);
    } else if (improvement < 0) {
      insights.push(`Variant shows ${Math.abs(improvementPercent).toFixed(1)}% decrease in conversion rate.`);
    } else {
      insights.push('No significant difference between variants.');
    }

    // Compare stage-by-stage
    const minStages = Math.min(baseline.stages.length, variant.stages.length);
    for (let i = 0; i < minStages; i++) {
      const baselineStage = baseline.stages[i];
      const variantStage = variant.stages[i];
      
      if (variantStage.dropoffRate < baselineStage.dropoffRate) {
        insights.push(
          `Improved retention at "${variantStage.name}" stage (${(baselineStage.dropoffRate - variantStage.dropoffRate).toFixed(1)}% reduction in dropoff).`
        );
      }
    }

    return {
      improvement,
      isSignificant,
      insights,
    };
  }
}

// Singleton instance
let funnelAnalyzerInstance: FunnelAnalyzer | null = null;

export const getFunnelAnalyzer = (): FunnelAnalyzer => {
  if (!funnelAnalyzerInstance) {
    funnelAnalyzerInstance = new FunnelAnalyzer();
  }
  return funnelAnalyzerInstance;
};

export default getFunnelAnalyzer;

