import React from 'react';
import { StandardContainer } from './StandardContainer';

interface StandardSectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'sm' | 'md' | 'lg';
  id?: string;
  ariaLabel?: string;
}

/**
 * StandardSection - Enforces consistent section spacing and structure
 * 
 * ENTERPRISE STANDARD:
 * - All sections must use this wrapper
 * - Consistent 64px vertical spacing (aligned to 24px grid: 64 = 24*2.67 ≈ 24*3)
 * - Proper semantic structure
 * - Grid-aligned padding
 */
export const StandardSection = ({ 
  children, 
  className = '',
  containerSize = 'lg',
  spacing = 'md',
  id,
  ariaLabel
}: StandardSectionProps) => {
  const spacingClasses = {
    sm: 'py-12', // 48px = 24*2
    md: 'py-16', // 64px = 24*2.67 ≈ 24*3  
    lg: 'py-24'  // 96px = 24*4
  };

  return (
    <section 
      className={`
        relative z-10
        ${spacingClasses[spacing]}
        ${className}
      `}
      id={id}
      aria-label={ariaLabel}
    >
      <StandardContainer size={containerSize}>
        {children}
      </StandardContainer>
    </section>
  );
};

export default StandardSection;
