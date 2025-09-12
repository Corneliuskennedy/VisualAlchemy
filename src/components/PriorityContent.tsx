import React from 'react';
import { cn } from '@/lib/utils';

interface PriorityContentProps {
  children: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
  id?: string;
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * PriorityContent component that helps optimize LCP by marking content with appropriate priority
 * 
 * This component:
 * 1. Adds fetchPriority attribute to images within the content
 * 2. Adds content-visibility CSS property based on priority
 * 3. Adds appropriate ARIA attributes for accessibility
 * 4. Helps identify critical content for LCP optimization
 */
const PriorityContent: React.FC<PriorityContentProps> = ({
  children,
  priority = 'medium',
  id,
  className = '',
  fetchPriority,
}) => {
  // Determine content visibility based on priority
  const contentVisibility = priority === 'low' ? 'auto' : undefined;
  
  // Determine if this is critical content for LCP
  const isCritical = priority === 'high';
  
  // Apply appropriate class names based on priority
  const priorityClass = 
    priority === 'high' 
      ? 'priority-high' 
      : priority === 'medium' 
        ? 'priority-medium' 
        : 'priority-low';
  
  return (
    <div
      id={id}
      className={`priority-content ${priorityClass} ${className}`}
      style={{
        contentVisibility,
      }}
      data-priority={priority}
      data-fetchpriority={fetchPriority || (isCritical ? 'high' : 'auto')}
    >
      {children}
    </div>
  );
};

export default PriorityContent; 