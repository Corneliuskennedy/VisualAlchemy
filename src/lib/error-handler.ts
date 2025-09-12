/**
 * Enterprise-grade error handling system for Octomatic
 * Provides structured error handling, monitoring, and recovery
 */

import { logger, LogLevel } from './logger';

export enum ErrorCategory {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  SYSTEM = 'SYSTEM',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
  USER_INPUT = 'USER_INPUT',
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface ErrorMetadata {
  category: ErrorCategory;
  severity: ErrorSeverity;
  context?: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  stackTrace?: string;
  additionalData?: Record<string, any>;
}

export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode: number;
  public readonly category: ErrorCategory;
  public readonly severity: ErrorSeverity;
  public readonly context?: string;
  public readonly metadata: ErrorMetadata;

  constructor(
    message: string,
    category: ErrorCategory = ErrorCategory.SYSTEM,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: string,
    additionalData?: Record<string, any>
  ) {
    super(message);
    
    this.name = 'AppError';
    this.isOperational = isOperational;
    this.statusCode = statusCode;
    this.category = category;
    this.severity = severity;
    this.context = context;
    
    this.metadata = {
      category,
      severity,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      stackTrace: this.stack,
      additionalData,
    };
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NetworkError extends AppError {
  constructor(message: string, statusCode: number, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.NETWORK, ErrorSeverity.HIGH, statusCode, true, context, additionalData);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.VALIDATION, ErrorSeverity.LOW, 400, true, context, additionalData);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.AUTHENTICATION, ErrorSeverity.HIGH, 401, true, context, additionalData);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.AUTHORIZATION, ErrorSeverity.HIGH, 403, true, context, additionalData);
    this.name = 'AuthorizationError';
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.BUSINESS_LOGIC, ErrorSeverity.MEDIUM, 422, true, context, additionalData);
    this.name = 'BusinessLogicError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string, statusCode: number, context?: string, additionalData?: Record<string, any>) {
    super(message, ErrorCategory.EXTERNAL_SERVICE, ErrorSeverity.HIGH, statusCode, true, context, additionalData);
    this.name = 'ExternalServiceError';
  }
}

export interface ErrorRecoveryStrategy {
  canRecover: (error: Error | AppError) => boolean;
  recover: (error: Error | AppError) => Promise<any> | any;
  maxRetries?: number;
  retryDelay?: number;
}

export class ErrorHandler {
  private static recoveryStrategies: ErrorRecoveryStrategy[] = [];
  private static errorCounts: Map<string, number> = new Map();
  private static maxErrorsPerMinute = 10;
  private static errorTimestamps: number[] = [];

  /**
   * Register a recovery strategy
   */
  public static registerRecoveryStrategy(strategy: ErrorRecoveryStrategy): void {
    this.recoveryStrategies.push(strategy);
  }

  /**
   * Handle an error with logging, monitoring, and recovery attempts
   */
  public static async handleError(
    error: Error | AppError,
    context?: string,
    attemptRecovery: boolean = true
  ): Promise<any> {
    // Rate limiting to prevent error spam
    if (this.isErrorRateLimited()) {
      logger.warn('Error rate limit exceeded, suppressing error handling', 'ErrorHandler');
      return;
    }

    // Log the error
    this.logError(error, context);

    // Report to monitoring service
    await this.reportToMonitoring(error, context);

    // Attempt recovery if enabled
    if (attemptRecovery) {
      return this.attemptRecovery(error);
    }
  }

  /**
   * Handle async errors with automatic retry logic
   */
  public static async handleAsyncError<T>(
    asyncFn: () => Promise<T>,
    context?: string,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFn();
      } catch (error) {
        lastError = error as Error;
        
        logger.warn(
          `Async operation failed (attempt ${attempt}/${maxRetries})`,
          context,
          { error: (error as Error).message, attempt }
        );

        if (attempt === maxRetries) {
          await this.handleError(lastError, context, false);
          throw lastError;
        }

        // Wait before retry with exponential backoff
        await this.sleep(retryDelay * Math.pow(2, attempt - 1));
      }
    }

    throw lastError!;
  }

  /**
   * Create a safe wrapper for functions that might throw
   */
  public static createSafeWrapper<T extends (...args: any[]) => any>(
    fn: T,
    context?: string,
    fallbackValue?: ReturnType<T>
  ): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
      try {
        const result = fn(...args);
        
        // Handle promises
        if (result instanceof Promise) {
          return result.catch((error) => {
            this.handleError(error, context);
            return fallbackValue;
          }) as ReturnType<T>;
        }
        
        return result;
      } catch (error) {
        this.handleError(error as Error, context);
        return fallbackValue as ReturnType<T>;
      }
    }) as T;
  }

  /**
   * Log error with appropriate level and context
   */
  private static logError(error: Error | AppError, context?: string): void {
    const errorContext = context || (error instanceof AppError ? error.context : 'Unknown');
    
    if (error instanceof AppError) {
      const level = this.getLogLevelFromSeverity(error.severity);
      
      (logger as any).log(level, error.message, errorContext, {
        category: error.category,
        severity: error.severity,
        statusCode: error.statusCode,
        isOperational: error.isOperational,
        metadata: error.metadata,
      });
    } else {
      logger.error(error.message, errorContext, {
        name: error.name,
        stack: error.stack,
        isOperational: false,
      });
    }
  }

  /**
   * Convert error severity to log level
   */
  private static getLogLevelFromSeverity(severity: ErrorSeverity): LogLevel {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        return LogLevel.ERROR;
      case ErrorSeverity.MEDIUM:
        return LogLevel.WARN;
      case ErrorSeverity.LOW:
        return LogLevel.INFO;
      default:
        return LogLevel.ERROR;
    }
  }

  /**
   * Report error to monitoring service
   */
  private static async reportToMonitoring(error: Error | AppError, context?: string): Promise<void> {
    try {
      // Only report in production or staging
      if (process.env.NODE_ENV === 'development') {
        return;
      }

      const errorData = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        ...(error instanceof AppError && {
          category: error.category,
          severity: error.severity,
          statusCode: error.statusCode,
          isOperational: error.isOperational,
          metadata: error.metadata,
        }),
      };

      // Send to monitoring service (e.g., Sentry, LogRocket, etc.)
      if (process.env.NEXT_PUBLIC_ERROR_MONITORING_ENDPOINT) {
        await fetch(process.env.NEXT_PUBLIC_ERROR_MONITORING_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: errorData,
            source: 'octomatic-frontend',
            environment: process.env.NODE_ENV,
          }),
        });
      }
    } catch (monitoringError) {
      logger.error('Failed to report error to monitoring service', 'ErrorHandler', {
        originalError: error.message,
        monitoringError: (monitoringError as Error).message,
      });
    }
  }

  /**
   * Attempt error recovery using registered strategies
   */
  private static async attemptRecovery(error: Error | AppError): Promise<any> {
    for (const strategy of this.recoveryStrategies) {
      if (strategy.canRecover(error)) {
        try {
          logger.info('Attempting error recovery', 'ErrorHandler', {
            error: error.message,
            strategy: strategy.constructor.name,
          });
          
          return await strategy.recover(error);
        } catch (recoveryError) {
          logger.error('Error recovery failed', 'ErrorHandler', {
            originalError: error.message,
            recoveryError: (recoveryError as Error).message,
          });
        }
      }
    }
    
    logger.warn('No recovery strategy found for error', 'ErrorHandler', {
      error: error.message,
      availableStrategies: this.recoveryStrategies.length,
    });
    
    return null;
  }

  /**
   * Check if error rate limiting should be applied
   */
  private static isErrorRateLimited(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    
    // Remove old timestamps
    this.errorTimestamps = this.errorTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
    
    // Add current timestamp
    this.errorTimestamps.push(now);
    
    return this.errorTimestamps.length > this.maxErrorsPerMinute;
  }

  /**
   * Sleep utility for retry delays
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get error statistics
   */
  public static getErrorStats(): {
    totalErrors: number;
    errorsInLastMinute: number;
    errorsByCategory: Record<string, number>;
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const errorsInLastMinute = this.errorTimestamps.filter(timestamp => timestamp > oneMinuteAgo).length;
    
    return {
      totalErrors: this.errorTimestamps.length,
      errorsInLastMinute,
      errorsByCategory: Object.fromEntries(this.errorCounts),
    };
  }

  /**
   * Clear error statistics (useful for testing)
   */
  public static clearStats(): void {
    this.errorTimestamps = [];
    this.errorCounts.clear();
  }
}

// Export convenience functions
export const handleError = (error: Error | AppError, context?: string) =>
  ErrorHandler.handleError(error, context);

export const handleAsyncError = <T>(
  asyncFn: () => Promise<T>,
  context?: string,
  maxRetries?: number,
  retryDelay?: number
) => ErrorHandler.handleAsyncError(asyncFn, context, maxRetries, retryDelay);

export const createSafeWrapper = <T extends (...args: any[]) => any>(
  fn: T,
  context?: string,
  fallbackValue?: ReturnType<T>
) => ErrorHandler.createSafeWrapper(fn, context, fallbackValue);

// Common error recovery strategies
export const networkRetryStrategy: ErrorRecoveryStrategy = {
  canRecover: (error) => error instanceof NetworkError && error.statusCode >= 500,
  recover: async (error) => {
    logger.info('Retrying network request after server error', 'NetworkRetryStrategy');
    // Implementation would retry the original request
    return null;
  },
  maxRetries: 3,
  retryDelay: 1000,
};

export const authTokenRefreshStrategy: ErrorRecoveryStrategy = {
  canRecover: (error) => error instanceof AuthenticationError,
  recover: async (error) => {
    logger.info('Attempting to refresh authentication token', 'AuthTokenRefreshStrategy');
    // Implementation would refresh the auth token
    return null;
  },
  maxRetries: 1,
  retryDelay: 0,
};

// Register default recovery strategies
ErrorHandler.registerRecoveryStrategy(networkRetryStrategy);
ErrorHandler.registerRecoveryStrategy(authTokenRefreshStrategy);
