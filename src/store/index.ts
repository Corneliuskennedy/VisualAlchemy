/**
 * Centralized state management for Octomatic using Zustand
 * Provides type-safe, performant state management across the application
 */

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { logger } from '@/lib/logger';

// Type definitions for different state slices
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'nl';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

export interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  modals: {
    contactForm: boolean;
    newsletter: boolean;
    cookieConsent: boolean;
  };
}

export interface ROICalculatorState {
  inputs: {
    hoursPerWeek: number;
    hourlyWage: number;
    implementationCost: number;
    monthlyOperatingCost: number;
    processName: string;
    email: string;
  };
  results: {
    monthlySavings: number;
    annualSavings: number;
    paybackPeriod: number;
    roiPercentage: number;
  } | null;
  showResults: boolean;
  emailSubmitted: boolean;
}

export interface PerformanceState {
  metrics: {
    pageLoadTime: number;
    bundleSize: number;
    memoryUsage: number;
    coreWebVitals: {
      LCP: number;
      FID: number;
      CLS: number;
    };
  };
  slowOperations: Array<{
    operation: string;
    duration: number;
    timestamp: number;
  }>;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  autoClose?: boolean;
  duration?: number;
}

// Main application state interface
interface AppState {
  // State slices
  userPreferences: UserPreferences;
  ui: UIState;
  roiCalculator: ROICalculatorState;
  performance: PerformanceState;

  // User preference actions
  setTheme: (theme: UserPreferences['theme']) => void;
  setLanguage: (language: UserPreferences['language']) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setFontSize: (fontSize: UserPreferences['fontSize']) => void;

  // UI actions
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;

  // ROI Calculator actions
  updateROIInput: (field: keyof ROICalculatorState['inputs'], value: string | number) => void;
  setROIResults: (results: ROICalculatorState['results']) => void;
  setShowROIResults: (show: boolean) => void;
  setEmailSubmitted: (submitted: boolean) => void;
  resetROICalculator: () => void;

  // Performance actions
  updatePerformanceMetric: (metric: keyof PerformanceState['metrics'], value: any) => void;
  addSlowOperation: (operation: string, duration: number) => void;
  clearPerformanceData: () => void;

  // Utility actions
  resetState: () => void;
  hydrateFromLocalStorage: () => void;
}

// Initial state values
const initialUserPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  reducedMotion: false,
  fontSize: 'medium',
};

const initialUIState: UIState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  loading: false,
  error: null,
  notifications: [],
  modals: {
    contactForm: false,
    newsletter: false,
    cookieConsent: false,
  },
};

const initialROICalculatorState: ROICalculatorState = {
  inputs: {
    hoursPerWeek: 10,
    hourlyWage: 35,
    implementationCost: 5000,
    monthlyOperatingCost: 200,
    processName: '',
    email: '',
  },
  results: null,
  showResults: false,
  emailSubmitted: false,
};

const initialPerformanceState: PerformanceState = {
  metrics: {
    pageLoadTime: 0,
    bundleSize: 0,
    memoryUsage: 0,
    coreWebVitals: {
      LCP: 0,
      FID: 0,
      CLS: 0,
    },
  },
  slowOperations: [],
};

// Create the store with middleware
export const useAppStore = create<AppState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // Initial state
          userPreferences: initialUserPreferences,
          ui: initialUIState,
          roiCalculator: initialROICalculatorState,
          performance: initialPerformanceState,

          // User preference actions
          setTheme: (theme) => {
            set((state) => ({
              userPreferences: { ...state.userPreferences, theme }
            }));
            logger.userAction('Theme changed', 'AppStore', { theme });
          },

          setLanguage: (language) => {
            set((state) => ({
              userPreferences: { ...state.userPreferences, language }
            }));
            logger.userAction('Language changed', 'AppStore', { language });
          },

          setReducedMotion: (reducedMotion) => {
            set((state) => ({
              userPreferences: { ...state.userPreferences, reducedMotion }
            }));
            logger.userAction('Reduced motion toggled', 'AppStore', { reducedMotion });
          },

          setFontSize: (fontSize) => {
            set((state) => ({
              userPreferences: { ...state.userPreferences, fontSize }
            }));
            logger.userAction('Font size changed', 'AppStore', { fontSize });
          },

          // UI actions
          setSidebarOpen: (open) => {
            set((state) => ({
              ui: { ...state.ui, sidebarOpen: open }
            }));
          },

          setMobileMenuOpen: (open) => {
            set((state) => ({
              ui: { ...state.ui, mobileMenuOpen: open }
            }));
          },

          setLoading: (loading) => {
            set((state) => ({
              ui: { ...state.ui, loading }
            }));
          },

          setError: (error) => {
            set((state) => ({
              ui: { ...state.ui, error }
            }));
            if (error) {
              logger.error('App error set', 'AppStore', { error });
            }
          },

          addNotification: (notification) => {
            const newNotification: Notification = {
              ...notification,
              id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: Date.now(),
            };

            set((state) => ({
              ui: {
                ...state.ui,
                notifications: [...state.ui.notifications, newNotification]
              }
            }));

            logger.info('Notification added', 'AppStore', {
              type: notification.type,
              title: notification.title,
            });

            // Auto-remove notification if specified
            if (notification.autoClose !== false) {
              const duration = notification.duration || 5000;
              setTimeout(() => {
                get().removeNotification(newNotification.id);
              }, duration);
            }
          },

          removeNotification: (id) => {
            set((state) => ({
              ui: {
                ...state.ui,
                notifications: state.ui.notifications.filter(n => n.id !== id)
              }
            }));
          },

          clearNotifications: () => {
            set((state) => ({
              ui: { ...state.ui, notifications: [] }
            }));
          },

          openModal: (modal) => {
            set((state) => ({
              ui: {
                ...state.ui,
                modals: { ...state.ui.modals, [modal]: true }
              }
            }));
            logger.userAction('Modal opened', 'AppStore', { modal });
          },

          closeModal: (modal) => {
            set((state) => ({
              ui: {
                ...state.ui,
                modals: { ...state.ui.modals, [modal]: false }
              }
            }));
            logger.userAction('Modal closed', 'AppStore', { modal });
          },

          closeAllModals: () => {
            set((state) => ({
              ui: {
                ...state.ui,
                modals: {
                  contactForm: false,
                  newsletter: false,
                  cookieConsent: false,
                }
              }
            }));
          },

          // ROI Calculator actions
          updateROIInput: (field, value) => {
            set((state) => ({
              roiCalculator: {
                ...state.roiCalculator,
                inputs: { ...state.roiCalculator.inputs, [field]: value }
              }
            }));
          },

          setROIResults: (results) => {
            set((state) => ({
              roiCalculator: { ...state.roiCalculator, results }
            }));
          },

          setShowROIResults: (show) => {
            set((state) => ({
              roiCalculator: { ...state.roiCalculator, showResults: show }
            }));
          },

          setEmailSubmitted: (submitted) => {
            set((state) => ({
              roiCalculator: { ...state.roiCalculator, emailSubmitted: submitted }
            }));
          },

          resetROICalculator: () => {
            set((state) => ({
              roiCalculator: initialROICalculatorState
            }));
            logger.userAction('ROI Calculator reset', 'AppStore');
          },

          // Performance actions
          updatePerformanceMetric: (metric, value) => {
            set((state) => ({
              performance: {
                ...state.performance,
                metrics: { ...state.performance.metrics, [metric]: value }
              }
            }));
          },

          addSlowOperation: (operation, duration) => {
            set((state) => ({
              performance: {
                ...state.performance,
                slowOperations: [
                  ...state.performance.slowOperations.slice(-9), // Keep only last 10
                  { operation, duration, timestamp: Date.now() }
                ]
              }
            }));
          },

          clearPerformanceData: () => {
            set((state) => ({
              performance: initialPerformanceState
            }));
          },

          // Utility actions
          resetState: () => {
            set({
              userPreferences: initialUserPreferences,
              ui: initialUIState,
              roiCalculator: initialROICalculatorState,
              performance: initialPerformanceState,
            });
            logger.info('App state reset', 'AppStore');
          },

          hydrateFromLocalStorage: () => {
            // This will be called automatically by the persist middleware
            logger.info('State hydrated from localStorage', 'AppStore');
          },
        }),
        {
          name: 'octomatic-store',
          // Only persist user preferences and ROI calculator data
          partialize: (state) => ({
            userPreferences: state.userPreferences,
            roiCalculator: {
              inputs: state.roiCalculator.inputs,
              emailSubmitted: state.roiCalculator.emailSubmitted,
            },
          }),
          // Custom storage implementation with error handling
          storage: {
            getItem: (key) => {
              try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
              } catch (error) {
                logger.error('Failed to read from localStorage', 'AppStore', { key, error });
                return null;
              }
            },
            setItem: (key, value) => {
              try {
                localStorage.setItem(key, JSON.stringify(value));
              } catch (error) {
                logger.error('Failed to write to localStorage', 'AppStore', { key, error });
              }
            },
            removeItem: (key) => {
              try {
                localStorage.removeItem(key);
              } catch (error) {
                logger.error('Failed to remove from localStorage', 'AppStore', { key, error });
              }
            },
          },
        }
      )
    ),
    {
      name: 'octomatic-store',
      // Enable Redux DevTools only in development
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// Selectors for common state access patterns
export const selectUserPreferences = (state: AppState) => state.userPreferences;
export const selectUIState = (state: AppState) => state.ui;
export const selectROICalculator = (state: AppState) => state.roiCalculator;
export const selectPerformance = (state: AppState) => state.performance;
export const selectTheme = (state: AppState) => state.userPreferences.theme;
export const selectLanguage = (state: AppState) => state.userPreferences.language;
export const selectLoading = (state: AppState) => state.ui.loading;
export const selectError = (state: AppState) => state.ui.error;
export const selectNotifications = (state: AppState) => state.ui.notifications;

// Computed selectors
export const selectHasError = (state: AppState) => state.ui.error !== null;
export const selectHasNotifications = (state: AppState) => state.ui.notifications.length > 0;
export const selectIsAnyModalOpen = (state: AppState) => 
  Object.values(state.ui.modals).some(Boolean);

// Hook for subscribing to specific state changes
export const useStoreSubscription = <T>(
  selector: (state: AppState) => T,
  callback: (value: T, previousValue: T) => void
) => {
  return useAppStore.subscribe(
    selector,
    callback,
    {
      equalityFn: (a, b) => a === b,
      fireImmediately: false,
    }
  );
};

// Performance monitoring integration
if (typeof window !== 'undefined') {
  // Subscribe to performance updates
  useAppStore.subscribe(
    (state) => state.performance.slowOperations,
    (slowOperations) => {
      if (slowOperations.length > 0) {
        const latest = slowOperations[slowOperations.length - 1];
        if (latest.duration > 1000) {
          logger.warn('Slow operation detected in store', 'AppStore', latest);
        }
      }
    }
  );

  // Subscribe to error changes
  useAppStore.subscribe(
    (state) => state.ui.error,
    (error) => {
      if (error) {
        // Could integrate with error monitoring service here
        logger.error('UI error occurred', 'AppStore', { error });
      }
    }
  );
}

export default useAppStore;
