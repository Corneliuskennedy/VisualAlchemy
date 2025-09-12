/**
 * Enhanced Error Boundary with enterprise-grade error handling
 * Integrates with centralized logging and error monitoring systems
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from './alert';
import { handleError, AppError, ErrorCategory, ErrorSeverity } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import { useAppStore } from '@/store';

interface EnhancedErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
  errorId: string;
  copied: boolean;
  autoRetrying: boolean;
}

interface EnhancedErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  maxRetries?: number;
  context?: string;
  showDetails?: boolean;
  level?: 'page' | 'component' | 'feature';
  enableAutoRetry?: boolean;
  autoRetryDelay?: number;
}

export class EnhancedErrorBoundary extends Component<EnhancedErrorBoundaryProps, EnhancedErrorBoundaryState> {
  private retryTimeout?: NodeJS.Timeout;

  constructor(props: EnhancedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
      errorId: '',
      copied: false,
      autoRetrying: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EnhancedErrorBoundaryState> {
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { context, level = 'component' } = this.props;
    
    // Create structured error for better tracking
    const structuredError = new AppError(
      error.message,
      ErrorCategory.SYSTEM,
      level === 'page' ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
      500,
      true,
      context || 'EnhancedErrorBoundary',
      {
        componentStack: errorInfo.componentStack,
        errorBoundaryLevel: level,
        retryCount: this.state.retryCount,
        errorId: this.state.errorId,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        timestamp: new Date().toISOString(),
      }
    );

    // Log the error using our centralized system
    handleError(structuredError, context);
    
    // Update app store with error state
    if (typeof window !== 'undefined') {
      useAppStore.getState().setError(error.message);
      useAppStore.getState().addNotification({
        type: 'error',
        title: level === 'page' ? 'Page Error' : 'Component Error',
        message: 'An unexpected error occurred. Our team has been notified.',
        autoClose: level !== 'page',
        duration: 8000,
      });
    }
    
    this.setState({
      error: structuredError,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: level === 'page',
        custom_map: {
          error_id: this.state.errorId,
          error_boundary_level: level,
          retry_count: this.state.retryCount,
        },
      });
    }

    // Auto-retry for component-level errors if enabled
    if (this.props.enableAutoRetry && level === 'component' && this.state.retryCount === 0) {
      this.scheduleAutoRetry();
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  scheduleAutoRetry = () => {
    const delay = this.props.autoRetryDelay || 2000;
    
    this.setState({ autoRetrying: true });
    
    logger.info('Auto-retry scheduled for component error', this.props.context, {
      errorId: this.state.errorId,
      delay,
    });

    this.retryTimeout = setTimeout(() => {
      this.handleRetry(true);
    }, delay);
  };

  handleRetry = (isAutoRetry: boolean = false) => {
    const maxRetries = this.props.maxRetries || 3;
    
    if (this.state.retryCount < maxRetries) {
      logger.info(
        isAutoRetry ? 'Auto-retry executed' : 'Manual retry attempted', 
        this.props.context, 
        {
          retryCount: this.state.retryCount + 1,
          errorId: this.state.errorId,
          isAutoRetry,
        }
      );

      // Clear error from app store
      if (typeof window !== 'undefined') {
        useAppStore.getState().setError(null);
      }

      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1,
        copied: false,
        autoRetrying: false,
      }));
    }
  };

  handleGoHome = () => {
    logger.userAction('Navigate to home from error boundary', this.props.context, {
      errorId: this.state.errorId,
    });

    // Clear error from app store
    if (typeof window !== 'undefined') {
      useAppStore.getState().setError(null);
    }

    window.location.href = '/';
  };

  handleReload = () => {
    logger.userAction('Page reload from error boundary', this.props.context, {
      errorId: this.state.errorId,
    });
    window.location.reload();
  };

  handleCopyError = async () => {
    if (!this.state.error) return;

    const errorDetails = {
      errorId: this.state.errorId,
      message: this.state.error.message,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      level: this.props.level || 'component',
      context: this.props.context || 'unknown',
      retryCount: this.state.retryCount,
      stack: this.state.error.stack,
      componentStack: this.state.errorInfo?.componentStack,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      this.setState({ copied: true });
      
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);

      logger.userAction('Error details copied to clipboard', this.props.context, {
        errorId: this.state.errorId,
      });
    } catch (err) {
      logger.error('Failed to copy error details', this.props.context, err);
    }
  };

  handleReportError = () => {
    const subject = `Error Report: ${this.state.errorId}`;
    const body = `Error ID: ${this.state.errorId}
Error Message: ${this.state.error?.message}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
`;

    const mailtoLink = `mailto:support@octomatic.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);

    logger.userAction('Error report initiated', this.props.context, {
      errorId: this.state.errorId,
    });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const maxRetries = this.props.maxRetries || 3;
      const canRetry = this.state.retryCount < maxRetries;
      const { level = 'component', showDetails = false } = this.props;
      const isPageLevel = level === 'page';

      return (
        <div className={isPageLevel 
          ? "min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 flex items-center justify-center p-4"
          : "min-h-[400px] flex items-center justify-center p-4"
        }>
          <Card className={`max-w-lg w-full ${isPageLevel ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className={`w-8 h-8 text-red-500 ${this.state.autoRetrying ? 'animate-pulse' : ''}`} />
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                {isPageLevel ? 'Page Error' : 'Component Error'}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {this.state.autoRetrying
                  ? "Attempting to recover automatically..."
                  : isPageLevel 
                    ? "We're experiencing technical difficulties. Our team has been notified and is working on a fix."
                    : "This component encountered an unexpected error. The rest of the page should work normally."
                }
              </CardDescription>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Error ID: {this.state.errorId}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {canRetry && !this.state.autoRetrying && (
                  <Button
                    onClick={() => this.handleRetry(false)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again ({maxRetries - this.state.retryCount} left)
                  </Button>
                )}
                
                {this.state.autoRetrying && (
                  <Button
                    disabled
                    className="flex-1 bg-blue-600 text-white opacity-75"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Auto-retrying...
                  </Button>
                )}
                
                <Button
                  onClick={isPageLevel ? this.handleGoHome : this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  {isPageLevel ? (
                    <>
                      <Home className="w-4 h-4 mr-2" />
                      Go to Homepage
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reload Page
                    </>
                  )}
                </Button>
              </div>

              {/* Utility Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={this.handleCopyError}
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  {this.state.copied ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Error Details
                    </>
                  )}
                </Button>

                <Button
                  onClick={this.handleReportError}
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Report Error
                </Button>
              </div>

              {/* Error Details */}
              {(process.env.NODE_ENV === 'development' || showDetails) && this.state.error && (
                <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <Bug className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-800 dark:text-red-300">
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium hover:text-red-600 dark:hover:text-red-200">
                        Show Technical Details
                      </summary>
                      <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded text-xs font-mono text-red-900 dark:text-red-200 overflow-auto max-h-48">
                        <div className="grid gap-2">
                          <div><strong>Error ID:</strong> {this.state.errorId}</div>
                          <div><strong>Message:</strong> {this.state.error.message}</div>
                          <div><strong>Level:</strong> {level}</div>
                          <div><strong>Context:</strong> {this.props.context || 'unknown'}</div>
                          <div><strong>Retry Count:</strong> {this.state.retryCount}</div>
                          <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
                        </div>
                        
                        {this.state.error.stack && (
                          <div className="mt-3 pt-3 border-t border-red-300 dark:border-red-600">
                            <strong>Stack Trace:</strong>
                            <pre className="whitespace-pre-wrap text-xs mt-1">
                              {this.state.error.stack}
                            </pre>
                          </div>
                        )}
                        
                        {this.state.errorInfo?.componentStack && (
                          <div className="mt-3 pt-3 border-t border-red-300 dark:border-red-600">
                            <strong>Component Stack:</strong>
                            <pre className="whitespace-pre-wrap text-xs mt-1">
                              {this.state.errorInfo.componentStack}
                            </pre>
                          </div>
                        )}
                      </div>
                    </details>
                  </AlertDescription>
                </Alert>
              )}

              {/* Help Text */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If this problem persists, please{' '}
                  <button 
                    onClick={this.handleReportError}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                  >
                    contact our support team
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors with enhanced logging
export const useEnhancedErrorHandler = (context?: string) => {
  return (error: Error, errorInfo?: string) => {
    const structuredError = new AppError(
      error.message,
      ErrorCategory.SYSTEM,
      ErrorSeverity.MEDIUM,
      500,
      true,
      context || 'useEnhancedErrorHandler',
      {
        hookUsage: true,
        additionalInfo: errorInfo,
        timestamp: new Date().toISOString(),
      }
    );

    handleError(structuredError, context);
    
    // Update app store
    if (typeof window !== 'undefined') {
      useAppStore.getState().setError(error.message);
      useAppStore.getState().addNotification({
        type: 'error',
        title: 'Unexpected Error',
        message: 'An error occurred. Please try again.',
      });
    }
    
    throw error; // Re-throw to trigger ErrorBoundary
  };
};

export default EnhancedErrorBoundary;
