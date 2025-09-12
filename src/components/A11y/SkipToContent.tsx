import React from 'react';
import { cn } from '@/lib/utils';

interface SkipToContentProps {
  contentId?: string;
  className?: string;
}

/**
 * SkipToContent component that allows keyboard users to bypass navigation
 * and jump directly to the main content of the page.
 * 
 * This is an essential accessibility feature for keyboard users.
 */
export const SkipToContent: React.FC<SkipToContentProps> = ({
  contentId = 'main-content',
  className,
}) => {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent; 