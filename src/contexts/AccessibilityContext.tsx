import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AccessibilityContextType {
  /** Whether the user is navigating with keyboard */
  isKeyboardUser: boolean;
  
  /** Whether reduced motion is preferred */
  prefersReducedMotion: boolean;
  
  /** Whether high contrast is preferred */
  prefersHighContrast: boolean;
  
  /** Set focus to a specific element by ID */
  setFocusToElement: (elementId: string) => void;
  
  /** Trap focus within a specific element (for modals, etc.) */
  trapFocus: (elementId: string | null) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  const [focusTrappedElement, setFocusTrappedElement] = useState<string | null>(null);
  
  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        // Add a class to the body for styling focus states
        document.body.classList.add('user-is-tabbing');
      }
    };
    
    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      // Remove the class when mouse is used
      document.body.classList.remove('user-is-tabbing');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Detect high contrast preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    setPrefersHighContrast(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Set focus to a specific element
  const setFocusToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }, []);
  
  // Trap focus within a specific element (for modals, etc.)
  const trapFocus = useCallback((elementId: string | null) => {
    setFocusTrappedElement(elementId);
  }, []);
  
  // Handle focus trapping
  useEffect(() => {
    if (!focusTrappedElement) return;
    
    const trapContainer = document.getElementById(focusTrappedElement);
    if (!trapContainer) return;
    
    const focusableElements = trapContainer.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // If shift+tab on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If tab on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
      
      // Allow escape key to close modal
      if (e.key === 'Escape') {
        setFocusTrappedElement(null);
      }
    };
    
    // Focus the first element when trap is activated
    firstElement?.focus();
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusTrappedElement]);
  
  const value = {
    isKeyboardUser,
    prefersReducedMotion,
    prefersHighContrast,
    setFocusToElement,
    trapFocus,
  };
  
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityProvider; 