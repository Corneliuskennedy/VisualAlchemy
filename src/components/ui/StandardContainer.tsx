import React from 'react';

interface StandardContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * StandardContainer - Enforces consistent content width and alignment
 * 
 * ENTERPRISE STANDARD:
 * - All content must use this container for consistency
 * - Aligns to 24px grid system
 * - Consistent max-width across all sections
 */
export const StandardContainer = ({ 
  children, 
  className = '',
  size = 'lg'
}: StandardContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl'
  };

  return (
    <div className={`
      mx-auto px-6 w-full
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default StandardContainer;
