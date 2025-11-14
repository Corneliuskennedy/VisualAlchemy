/**
 * Professional Navbar Styles
 * Expert-level design: Glassmorphism + Smart Contrast + Elegant Typography
 */

export const navbarStyles = {
  // Glassmorphism background with adaptive opacity
  background: {
    base: 'backdrop-blur-xl backdrop-saturate-150',
    scrolled: 'backdrop-blur-xl backdrop-saturate-150',
    // Smooth gradient overlay for depth
    overlay: 'bg-gradient-to-b from-background/80 via-background/60 to-background/40',
  },
  
  // Border - subtle and elegant
  border: {
    base: 'border-b border-border/20',
    scrolled: 'border-b border-border/40 shadow-lg shadow-black/5',
  },
  
  // Text colors - smart and adaptive
  text: {
    // Base: High contrast, elegant
    base: 'text-foreground/95',
    hover: 'text-foreground',
    active: 'text-button-primary font-semibold',
    // Subtle transition
    transition: 'transition-colors duration-200 ease-out',
  },
  
  // Link styles - professional and clean
  link: {
    base: 'px-4 py-2 rounded-lg font-medium text-sm lg:text-base',
    hover: 'hover:bg-accent/10 hover:text-foreground',
    active: 'bg-accent/15 text-button-primary',
    focus: 'focus:outline-none focus:ring-2 focus:ring-button-primary/50 focus:ring-offset-2',
  },
  
  // Button styles
  button: {
    base: 'px-5 py-2.5 rounded-lg font-semibold text-sm',
    primary: 'bg-button-primary hover:bg-button-primary-hover text-white',
    shadow: 'shadow-lg hover:shadow-xl transition-shadow duration-200',
  },
};

