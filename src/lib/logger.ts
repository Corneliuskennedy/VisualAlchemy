/**
 * Enterprise-grade logging system for Octomatic
 * Replaces console.log statements with structured, contextual logging
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableRemoteLogging: boolean;
  enableConsoleOutput: boolean;
  maxRetries: number;
  batchSize: number;
  flushInterval: number;
}

class Logger {
  private config: LoggerConfig;
  private logQueue: LogEntry[] = [];
  private flushTimer?: NodeJS.Timeout;
  private sessionId: string;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN,
      enableRemoteLogging: process.env.NODE_ENV !== 'development',
      enableConsoleOutput: process.env.NODE_ENV === 'development',
      maxRetries: 3,
      batchSize: 10,
      flushInterval: 5000,
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.setupFlushTimer();
    this.setupUnloadHandler();
  }

  /**
   * Log error level messages
   */
  error(message: string, context?: string, data?: any): void {
    this.log(LogLevel.ERROR, message, context, data);
  }

  /**
   * Log warning level messages
   */
  warn(message: string, context?: string, data?: any): void {
    this.log(LogLevel.WARN, message, context, data);
  }

  /**
   * Log info level messages
   */
  info(message: string, context?: string, data?: any): void {
    this.log(LogLevel.INFO, message, context, data);
  }

  /**
   * Log debug level messages
   */
  debug(message: string, context?: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, context, data);
  }

  /**
   * Log performance metrics
   */
  performance(operation: string, duration: number, context?: string, data?: any): void {
    this.log(LogLevel.INFO, `Performance: ${operation} completed in ${duration.toFixed(2)}ms`, context, {
      operation,
      duration,
      ...data,
    });
  }

  /**
   * Log user interactions
   */
  userAction(action: string, context?: string, data?: any): void {
    this.log(LogLevel.INFO, `User Action: ${action}`, context, {
      action,
      ...data,
    });
  }

  /**
   * Log API calls
   */
  apiCall(method: string, url: string, status: number, duration: number, context?: string): void {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    this.log(level, `API ${method} ${url} - ${status} (${duration.toFixed(2)}ms)`, context, {
      method,
      url,
      status,
      duration,
      type: 'api_call',
    });
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, context?: string, data?: any): void {
    if (level > this.config.level) return;

    const entry: LogEntry = {
      level,
      message,
      context,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };

    // Console output in development
    if (this.config.enableConsoleOutput) {
      this.outputToConsole(entry);
    }

    // Queue for remote logging
    if (this.config.enableRemoteLogging && level <= LogLevel.WARN) {
      this.queueForRemote(entry);
    }
  }

  /**
   * Output log entry to console with formatting
   */
  private outputToConsole(entry: LogEntry): void {
    const levelStr = LogLevel[entry.level];
    const contextStr = entry.context ? `[${entry.context}] ` : '';
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    
    const style = this.getConsoleStyle(entry.level);
    const prefix = `%c[${timestamp}] [${levelStr}] ${contextStr}`;
    
    if (entry.data) {
      console.log(prefix + entry.message, style, entry.data);
    } else {
      console.log(prefix + entry.message, style);
    }
  }

  /**
   * Get console styling for different log levels
   */
  private getConsoleStyle(level: LogLevel): string {
    switch (level) {
      case LogLevel.ERROR:
        return 'color: #ff4444; font-weight: bold;';
      case LogLevel.WARN:
        return 'color: #ff8800; font-weight: bold;';
      case LogLevel.INFO:
        return 'color: #0088ff;';
      case LogLevel.DEBUG:
        return 'color: #888888;';
      default:
        return '';
    }
  }

  /**
   * Queue log entry for remote logging
   */
  private queueForRemote(entry: LogEntry): void {
    this.logQueue.push(entry);
    
    if (this.logQueue.length >= this.config.batchSize) {
      this.flushLogs();
    }
  }

  /**
   * Flush queued logs to remote service
   */
  private async flushLogs(): Promise<void> {
    if (this.logQueue.length === 0) return;

    const logsToSend = [...this.logQueue];
    this.logQueue = [];

    try {
      await this.sendToRemote(logsToSend);
    } catch (error) {
      // Re-queue failed logs (with retry limit)
      if (this.config.maxRetries > 0) {
        this.logQueue.unshift(...logsToSend);
        this.config.maxRetries--;
      }
      
      if (this.config.enableConsoleOutput) {
        console.error('Failed to send logs to remote service:', error);
      }
    }
  }

  /**
   * Send logs to remote logging service
   */
  private async sendToRemote(logs: LogEntry[]): Promise<void> {
    // In a real implementation, this would send to a service like:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - Custom logging endpoint
    
    if (process.env.NEXT_PUBLIC_LOGGING_ENDPOINT) {
      const response = await fetch(process.env.NEXT_PUBLIC_LOGGING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logs,
          source: 'octomatic-frontend',
          environment: process.env.NODE_ENV,
        }),
      });

      if (!response.ok) {
        throw new Error(`Logging service responded with ${response.status}`);
      }
    }
  }

  /**
   * Setup automatic log flushing
   */
  private setupFlushTimer(): void {
    if (this.config.enableRemoteLogging) {
      this.flushTimer = setInterval(() => {
        this.flushLogs();
      }, this.config.flushInterval);
    }
  }

  /**
   * Setup handler for page unload to flush remaining logs
   */
  private setupUnloadHandler(): void {
    if (typeof window !== 'undefined' && this.config.enableRemoteLogging) {
      window.addEventListener('beforeunload', () => {
        this.flushLogs();
      });

      // Also handle visibility change for mobile
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flushLogs();
        }
      });
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flushLogs();
  }
}

// Create and export singleton logger instance
export const logger = new Logger();

// Export logger factory for custom configurations
export const createLogger = (config: Partial<LoggerConfig>) => new Logger(config);

// Export convenience functions
export const logError = (message: string, context?: string, data?: any) => 
  logger.error(message, context, data);

export const logWarn = (message: string, context?: string, data?: any) => 
  logger.warn(message, context, data);

export const logInfo = (message: string, context?: string, data?: any) => 
  logger.info(message, context, data);

export const logDebug = (message: string, context?: string, data?: any) => 
  logger.debug(message, context, data);

export const logPerformance = (operation: string, duration: number, context?: string, data?: any) =>
  logger.performance(operation, duration, context, data);

export const logUserAction = (action: string, context?: string, data?: any) =>
  logger.userAction(action, context, data);

export const logApiCall = (method: string, url: string, status: number, duration: number, context?: string) =>
  logger.apiCall(method, url, status, duration, context);
