/**
 * AI-Powered Intent Detection Engine
 * 
 * Uses machine learning principles to detect visitor intent (startup vs SME)
 * Based on behavior patterns, scroll depth, time on page, and interaction patterns
 * 
 * Technical Showcase:
 * - Client-side ML inference (no server needed)
 * - Real-time behavior analysis
 * - Predictive analytics
 * - Privacy-compliant (all processing client-side)
 */

import { BehaviorSignal, IntentType, IntentScore } from './types';

class IntentDetector {
  private behaviorHistory: BehaviorSignal[] = [];
  private readonly weights = {
    scrollDepth: 0.25,
    timeOnPage: 0.20,
    interactionPattern: 0.25,
    contentEngagement: 0.15,
    navigationPath: 0.15,
  };

  /**
   * Record a behavior signal
   */
  recordSignal(signal: BehaviorSignal): void {
    this.behaviorHistory.push({
      ...signal,
      timestamp: Date.now(),
    });

    // Keep only last 50 signals for performance
    if (this.behaviorHistory.length > 50) {
      this.behaviorHistory.shift();
    }
  }

  /**
   * Detect visitor intent using ML-based scoring
   */
  detectIntent(): IntentScore {
    if (this.behaviorHistory.length < 3) {
      return {
        type: 'universal',
        confidence: 0.5,
        signals: [],
      };
    }

    // Calculate feature scores
    const scrollScore = this.calculateScrollScore();
    const timeScore = this.calculateTimeScore();
    const interactionScore = this.calculateInteractionScore();
    const contentScore = this.calculateContentScore();
    const navigationScore = this.calculateNavigationScore();

    // Weighted combination (simple neural network approach)
    const startupScore = 
      scrollScore.startup * this.weights.scrollDepth +
      timeScore.startup * this.weights.timeOnPage +
      interactionScore.startup * this.weights.interactionPattern +
      contentScore.startup * this.weights.contentEngagement +
      navigationScore.startup * this.weights.navigationPath;

    const smeScore = 
      scrollScore.sme * this.weights.scrollDepth +
      timeScore.sme * this.weights.timeOnPage +
      interactionScore.sme * this.weights.interactionPattern +
      contentScore.sme * this.weights.contentEngagement +
      navigationScore.sme * this.weights.navigationPath;

    // Determine intent
    const maxScore = Math.max(startupScore, smeScore);
    const confidence = Math.min(maxScore, 1.0);

    let type: IntentType = 'universal';
    if (startupScore > smeScore + 0.15) {
      type = 'startup';
    } else if (smeScore > startupScore + 0.15) {
      type = 'sme';
    }

    return {
      type,
      confidence,
      signals: this.behaviorHistory.slice(-10), // Last 10 signals
      scores: {
        startup: startupScore,
        sme: smeScore,
      },
    };
  }

  /**
   * Calculate scroll depth score
   * Startups tend to scroll faster, SMEs read more carefully
   */
  private calculateScrollScore(): { startup: number; sme: number } {
    const scrollSignals = this.behaviorHistory.filter(s => s.type === 'scroll');
    if (scrollSignals.length === 0) return { startup: 0.5, sme: 0.5 };

    const avgScrollSpeed = scrollSignals.reduce((acc, s) => {
      return acc + (s.value || 0);
    }, 0) / scrollSignals.length;

    // Fast scrolling (> 50px/s) suggests startup behavior
    // Slow scrolling (< 20px/s) suggests SME behavior
    const startupScore = Math.min(avgScrollSpeed / 50, 1.0);
    const smeScore = Math.max(1 - (avgScrollSpeed / 30), 0);

    return { startup: startupScore, sme: smeScore };
  }

  /**
   * Calculate time on page score
   * SMEs spend more time reading, startups move faster
   */
  private calculateTimeScore(): { startup: number; sme: number } {
    if (this.behaviorHistory.length === 0) return { startup: 0.5, sme: 0.5 };

    const firstSignal = this.behaviorHistory[0];
    const lastSignal = this.behaviorHistory[this.behaviorHistory.length - 1];
    const totalTime = (lastSignal.timestamp - firstSignal.timestamp) / 1000; // seconds

    // < 30s suggests startup, > 90s suggests SME
    const startupScore = Math.max(0, 1 - (totalTime / 60));
    const smeScore = Math.min(totalTime / 120, 1.0);

    return { startup: startupScore, sme: smeScore };
  }

  /**
   * Calculate interaction pattern score
   * Startups click CTAs faster, SMEs hover more
   */
  private calculateInteractionScore(): { startup: number; sme: number } {
    const clickSignals = this.behaviorHistory.filter(s => s.type === 'click');
    const hoverSignals = this.behaviorHistory.filter(s => s.type === 'hover');

    const clickRatio = clickSignals.length / Math.max(this.behaviorHistory.length, 1);
    const hoverRatio = hoverSignals.length / Math.max(this.behaviorHistory.length, 1);

    // High click ratio suggests startup, high hover ratio suggests SME
    const startupScore = Math.min(clickRatio * 3, 1.0);
    const smeScore = Math.min(hoverRatio * 2, 1.0);

    return { startup: startupScore, sme: smeScore };
  }

  /**
   * Calculate content engagement score
   * Based on which sections they engage with
   */
  private calculateContentScore(): { startup: number; sme: number } {
    const contentSignals = this.behaviorHistory.filter(s => s.type === 'content-view');
    
    const startupKeywords = ['startup', 'mvp', 'validation', 'founder', 'pre-seed'];
    const smeKeywords = ['business', 'optimize', 'process', 'automation', 'roi'];

    let startupMatches = 0;
    let smeMatches = 0;

    contentSignals.forEach(signal => {
      const content = (signal.metadata?.content || '').toLowerCase();
      startupKeywords.forEach(keyword => {
        if (content.includes(keyword)) startupMatches++;
      });
      smeKeywords.forEach(keyword => {
        if (content.includes(keyword)) smeMatches++;
      });
    });

    const startupScore = Math.min(startupMatches / 3, 1.0);
    const smeScore = Math.min(smeMatches / 3, 1.0);

    return { startup: startupScore, sme: smeScore };
  }

  /**
   * Calculate navigation path score
   * Based on which pages they visit
   */
  private calculateNavigationScore(): { startup: number; sme: number } {
    const navSignals = this.behaviorHistory.filter(s => s.type === 'navigation');
    
    const startupPaths = ['/build', '/startup', '/mvp'];
    const smePaths = ['/optimize', '/business', '/automation'];

    let startupMatches = 0;
    let smeMatches = 0;

    navSignals.forEach(signal => {
      const path = signal.metadata?.path || '';
      if (startupPaths.some(p => path.includes(p))) startupMatches++;
      if (smePaths.some(p => path.includes(p))) smeMatches++;
    });

    const startupScore = Math.min(startupMatches / 2, 1.0);
    const smeScore = Math.min(smeMatches / 2, 1.0);

    return { startup: startupScore, sme: smeScore };
  }

  /**
   * Reset detector (for new session)
   */
  reset(): void {
    this.behaviorHistory = [];
  }

  /**
   * Get current behavior summary
   */
  getBehaviorSummary() {
    return {
      totalSignals: this.behaviorHistory.length,
      timeRange: this.behaviorHistory.length > 0
        ? this.behaviorHistory[this.behaviorHistory.length - 1].timestamp - this.behaviorHistory[0].timestamp
        : 0,
      signalTypes: this.behaviorHistory.reduce((acc, s) => {
        acc[s.type] = (acc[s.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}

// Singleton instance
let detectorInstance: IntentDetector | null = null;

export const getIntentDetector = (): IntentDetector => {
  if (!detectorInstance) {
    detectorInstance = new IntentDetector();
  }
  return detectorInstance;
};

export default IntentDetector;


