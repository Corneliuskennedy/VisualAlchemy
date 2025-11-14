/**
 * Types for Personalization Engine
 */

export type BehaviorSignalType = 
  | 'scroll'
  | 'click'
  | 'hover'
  | 'navigation'
  | 'content-view'
  | 'time-on-page'
  | 'form-interaction';

export type IntentType = 'startup' | 'sme' | 'universal';

export interface BehaviorSignal {
  type: BehaviorSignalType;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: number;
}

export interface IntentScore {
  type: IntentType;
  confidence: number;
  signals: BehaviorSignal[];
  scores?: {
    startup: number;
    sme: number;
  };
}

export interface PersonalizationConfig {
  enabled: boolean;
  updateInterval: number; // ms
  minConfidence: number; // 0-1
  fallbackIntent: IntentType;
}

