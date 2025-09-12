import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, ExternalLink } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from './alert';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  maxRetries?: number;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        retryCount={this.state.retryCount}
        maxRetries={this.props.maxRetries || 3}
        onRetry={this.handleRetry}
        onReload={this.handleReload}
        onGoHome={this.handleGoHome}
      />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
  maxRetries: number;
  onRetry: () => void;
  onReload: () => void;
  onGoHome: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  retryCount,
  maxRetries,
  onRetry,
  onReload,
  onGoHome
}) => {
  const canRetry = retryCount < maxRetries;
  const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network');
  const isAuthError = error?.message?.includes('auth') || error?.message?.includes('unauthorized');

  const getErrorMessage = () => {
    if (isNetworkError) {
      return "We're having trouble connecting to our servers. Please check your internet connection and try again.";
    }
    if (isAuthError) {
      return "There was an authentication issue. Please try logging in again.";
    }
    return "Something unexpected happened. We're working to fix this issue.";
  };

  const getErrorTitle = () => {
    if (isNetworkError) return "Connection Problem";
    if (isAuthError) return "Authentication Error";
    return "Oops! Something went wrong";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-xl text-white">
            {getErrorTitle()}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {getErrorMessage()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {canRetry && (
              <Button
                onClick={onRetry}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again {retryCount > 0 && `(${retryCount}/${maxRetries})`}
              </Button>
            )}
            
            <Button
              onClick={onReload}
              variant="outline"
              className="flex-1 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Page
            </Button>
          </div>

          <Button
            onClick={onGoHome}
            variant="outline"
            className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && error && (
            <Alert className="bg-gray-800 border-gray-700 mt-6">
              <Bug className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-gray-300">
                <details className="mt-2">
                  <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300">
                    Show Error Details
                  </summary>
                  <div className="mt-2 p-2 bg-gray-900 rounded text-xs font-mono text-gray-400 overflow-auto max-h-40">
                    <div className="text-red-400 font-bold mb-2">{error.message}</div>
                    <div className="whitespace-pre-wrap">{error.stack}</div>
                    {errorInfo && (
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <div className="text-blue-400 font-bold mb-1">Component Stack:</div>
                        <div className="whitespace-pre-wrap">{errorInfo.componentStack}</div>
                      </div>
                    )}
                  </div>
                </details>
              </AlertDescription>
            </Alert>
          )}

          {/* Help Text */}
          <div className="text-center pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              If this problem persists, please{' '}
              <a 
                href="mailto:support@octomatic.ai" 
                className="text-green-400 hover:text-green-300 underline"
              >
                contact our support team
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error);
    
    // You could integrate with error reporting service here
    // Example: Sentry.captureException(error);
    
    throw error; // Re-throw to trigger ErrorBoundary
  };
}; 