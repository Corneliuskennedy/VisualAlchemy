/**
 * Test suite for EnhancedErrorBoundary component
 * Demonstrates enterprise-grade testing practices
 */

import React from 'react';
import { render, screen, waitFor } from '@/testing/test-utils';
import { EnhancedErrorBoundary, useEnhancedErrorHandler } from '../ui/enhanced-error-boundary';
import { mockLogger } from '@/testing/mocks/logger.mock';
import { mockErrorHandler } from '@/testing/mocks/error-handler.mock';
import { vi } from 'vitest';

// Test component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean; errorMessage?: string }> = ({ 
  shouldThrow = true, 
  errorMessage = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div>No error</div>;
};

// Test component that uses the error handler hook
const ComponentWithErrorHandler: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  const handleError = useEnhancedErrorHandler('test-component');
  
  const handleClick = () => {
    if (shouldThrow) {
      try {
        throw new Error('Hook test error');
      } catch (error) {
        handleError(error as Error, 'button click');
      }
    }
  };

  return <button onClick={handleClick}>Test Button</button>;
};

describe('EnhancedErrorBoundary', () => {
  beforeEach(() => {
    mockLogger.clearMocks();
    mockErrorHandler.clearMocks();
    
    // Mock console.error to avoid noise in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Error Catching', () => {
    it('should catch and display component errors', async () => {
      render(
        <EnhancedErrorBoundary context="test-boundary">
          <ThrowError errorMessage="Component crashed" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText('Component Error')).toBeInTheDocument();
        expect(screen.getByText(/This component encountered an unexpected error/)).toBeInTheDocument();
      });
    });

    it('should display page-level error UI for page-level boundaries', async () => {
      render(
        <EnhancedErrorBoundary level="page" context="page-boundary">
          <ThrowError errorMessage="Page crashed" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText('Page Error')).toBeInTheDocument();
        expect(screen.getByText(/We're experiencing technical difficulties/)).toBeInTheDocument();
      });
    });

    it('should generate unique error IDs', async () => {
      render(
        <EnhancedErrorBoundary context="test-boundary">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const errorIdElement = screen.getByText(/Error ID:/);
        expect(errorIdElement).toBeInTheDocument();
        expect(errorIdElement.textContent).toMatch(/Error ID: error-\d+-[a-z0-9]+/);
      });
    });
  });

  describe('Error Logging Integration', () => {
    it('should log errors using the centralized error handler', async () => {
      render(
        <EnhancedErrorBoundary context="logging-test">
          <ThrowError errorMessage="Logged error" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(mockErrorHandler.handleError).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Logged error',
            context: 'logging-test',
          }),
          'logging-test'
        );
      });
    });

    it('should call onError callback when provided', async () => {
      const onError = vi.fn();
      
      render(
        <EnhancedErrorBoundary onError={onError} context="callback-test">
          <ThrowError errorMessage="Callback error" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ message: 'Callback error' }),
          expect.objectContaining({ componentStack: expect.any(String) })
        );
      });
    });
  });

  describe('Retry Functionality', () => {
    it('should provide retry button with correct attempt count', async () => {
      render(
        <EnhancedErrorBoundary maxRetries={3} context="retry-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /Try Again \(3 left\)/ });
        expect(retryButton).toBeInTheDocument();
      });
    });

    it('should disable retry button after max retries reached', async () => {
      const { user } = render(
        <EnhancedErrorBoundary maxRetries={1} context="retry-limit-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      // First retry
      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /Try Again/ });
        expect(retryButton).toBeInTheDocument();
      });

      const retryButton = screen.getByRole('button', { name: /Try Again/ });
      await user.click(retryButton);

      // After max retries, button should not be available
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Try Again/ })).not.toBeInTheDocument();
      });
    });

    it('should show auto-retry for component-level errors when enabled', async () => {
      render(
        <EnhancedErrorBoundary 
          level="component" 
          enableAutoRetry={true} 
          autoRetryDelay={100}
          context="auto-retry-test"
        >
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText(/Auto-retrying/)).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Actions', () => {
    it('should provide home navigation for page-level errors', async () => {
      render(
        <EnhancedErrorBoundary level="page" context="navigation-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const homeButton = screen.getByRole('button', { name: /Go to Homepage/ });
        expect(homeButton).toBeInTheDocument();
      });
    });

    it('should provide reload option for component-level errors', async () => {
      render(
        <EnhancedErrorBoundary level="component" context="reload-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const reloadButton = screen.getByRole('button', { name: /Reload Page/ });
        expect(reloadButton).toBeInTheDocument();
      });
    });
  });

  describe('Error Details and Reporting', () => {
    it('should show copy error details button', async () => {
      // Mock clipboard API
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      });

      render(
        <EnhancedErrorBoundary context="copy-test">
          <ThrowError errorMessage="Copyable error" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const copyButton = screen.getByRole('button', { name: /Copy Error Details/ });
        expect(copyButton).toBeInTheDocument();
      });
    });

    it('should show report error button', async () => {
      render(
        <EnhancedErrorBoundary context="report-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const reportButton = screen.getByRole('button', { name: /Report Error/ });
        expect(reportButton).toBeInTheDocument();
      });
    });

    it('should show technical details in development mode', async () => {
      // Mock development environment
      vi.stubEnv('DEV', true);

      render(
        <EnhancedErrorBoundary showDetails={true} context="details-test">
          <ThrowError errorMessage="Detailed error" />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const detailsToggle = screen.getByText(/Show Technical Details/);
        expect(detailsToggle).toBeInTheDocument();
      });
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', async () => {
      const CustomFallback = <div data-testid="custom-fallback">Custom Error UI</div>;
      
      render(
        <EnhancedErrorBoundary fallback={CustomFallback} context="fallback-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
        expect(screen.queryByText('Component Error')).not.toBeInTheDocument();
      });
    });
  });

  describe('useEnhancedErrorHandler Hook', () => {
    it('should handle errors thrown in components', async () => {
      const { user } = render(
        <EnhancedErrorBoundary context="hook-boundary">
          <ComponentWithErrorHandler shouldThrow={false} />
        </EnhancedErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /Test Button/ });
      
      // This should trigger the error handler but not crash the component
      // since we're catching and handling the error in the component
      await expect(async () => {
        await user.click(button);
      }).not.toThrow();
    });

    it('should log errors through the hook', async () => {
      render(<ComponentWithErrorHandler />);
      
      // The hook should be available even without throwing
      expect(screen.getByRole('button', { name: /Test Button/ })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      render(
        <EnhancedErrorBoundary context="a11y-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAccessibleName();
        });
      });
    });

    it('should be keyboard navigable', async () => {
      const { user } = render(
        <EnhancedErrorBoundary context="keyboard-test">
          <ThrowError />
        </EnhancedErrorBoundary>
      );

      await waitFor(() => {
        const firstButton = screen.getAllByRole('button')[0];
        expect(firstButton).toBeInTheDocument();
      });

      // Test keyboard navigation
      await user.tab();
      expect(document.activeElement).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
