/**
 * Physics-Based Animation Engine
 * 
 * Implements spring physics for natural, fluid animations
 * Uses mathematical models for realistic motion
 * 
 * Technical Showcase:
 * - Advanced animation mathematics
 * - Performance-optimized calculations
 * - Custom physics implementation
 * - GPU-accelerated transforms
 */

export interface SpringConfig {
  mass: number; // Mass of the object (affects inertia)
  stiffness: number; // Spring stiffness (affects speed)
  damping: number; // Damping coefficient (affects oscillation)
  precision: number; // Precision threshold for stopping
}

export interface SpringState {
  position: number;
  velocity: number;
  target: number;
}

export class PhysicsEngine {
  private readonly defaultConfig: SpringConfig = {
    mass: 1,
    stiffness: 100,
    damping: 10,
    precision: 0.01,
  };

  /**
   * Calculate spring physics step
   * Uses Hooke's law: F = -kx (force = -stiffness * displacement)
   * With damping: F = -kx - cv (force = -stiffness * displacement - damping * velocity)
   */
  calculateSpringStep(
    state: SpringState,
    config: Partial<SpringConfig> = {}
  ): SpringState {
    const cfg = { ...this.defaultConfig, ...config };
    
    const displacement = state.target - state.position;
    const springForce = cfg.stiffness * displacement;
    const dampingForce = cfg.damping * state.velocity;
    const acceleration = (springForce - dampingForce) / cfg.mass;
    
    const newVelocity = state.velocity + acceleration * 0.016; // 60fps = 16ms per frame
    const newPosition = state.position + newVelocity * 0.016;
    
    return {
      position: newPosition,
      velocity: newVelocity,
      target: state.target,
    };
  }

  /**
   * Check if spring has reached equilibrium
   */
  isAtRest(state: SpringState, config: Partial<SpringConfig> = {}): boolean {
    const cfg = { ...this.defaultConfig, ...config };
    const displacement = Math.abs(state.target - state.position);
    const velocity = Math.abs(state.velocity);
    
    return displacement < cfg.precision && velocity < cfg.precision;
  }

  /**
   * Calculate bounce physics
   * Uses elastic collision model
   */
  calculateBounce(
    velocity: number,
    restitution: number = 0.8 // Coefficient of restitution (bounciness)
  ): number {
    return velocity * -restitution;
  }

  /**
   * Calculate ease-out curve
   * Uses cubic ease-out function
   */
  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Calculate ease-in-out curve
   * Uses smooth step function
   */
  easeInOutCubic(t: number): number {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Calculate elastic easing
   * Creates bouncy, elastic effect
   */
  elasticEasing(t: number, amplitude: number = 1, period: number = 0.3): number {
    if (t === 0 || t === 1) return t;
    
    const s = period / 4;
    return amplitude * Math.pow(2, -10 * t) * 
           Math.sin((t - s) * (2 * Math.PI) / period) + 1;
  }

  /**
   * Calculate gravity physics
   * For falling/rising animations
   */
  calculateGravity(
    position: number,
    velocity: number,
    gravity: number = 9.8,
    deltaTime: number = 0.016
  ): { position: number; velocity: number } {
    const newVelocity = velocity + gravity * deltaTime;
    const newPosition = position + newVelocity * deltaTime;
    
    return { position: newPosition, velocity: newVelocity };
  }

  /**
   * Calculate momentum
   * For swipe/throw gestures
   */
  calculateMomentum(
    velocity: number,
    friction: number = 0.95
  ): number {
    return velocity * friction;
  }

  /**
   * Interpolate between two values
   * Uses linear interpolation with optional easing
   */
  lerp(
    start: number,
    end: number,
    t: number,
    easing?: (t: number) => number
  ): number {
    const easedT = easing ? easing(t) : t;
    return start + (end - start) * easedT;
  }

  /**
   * Clamp value between min and max
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Map value from one range to another
   */
  map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

// Singleton instance
let engineInstance: PhysicsEngine | null = null;

export const getPhysicsEngine = (): PhysicsEngine => {
  if (!engineInstance) {
    engineInstance = new PhysicsEngine();
  }
  return engineInstance;
};

export default PhysicsEngine;


