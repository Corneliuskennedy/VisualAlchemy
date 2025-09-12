import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  fluid?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  noPadding?: boolean;
}

/**
 * ResponsiveContainer component that provides:
 * 1. Consistent padding across screen sizes
 * 2. Configurable max-width based on breakpoints
 * 3. Fluid option for full-width containers
 * 4. Ability to render as different HTML elements
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  as: Component = 'div',
  fluid = false,
  maxWidth = 'xl',
  className,
  noPadding = false,
  ...props
}) => {
  // Map maxWidth to Tailwind classes
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto',
        !noPadding && 'px-4 sm:px-6 md:px-8',
        !fluid && maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer; 