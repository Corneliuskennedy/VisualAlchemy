/**
 * ImagePlaceholder Component
 * 
 * Empty placeholder for images that need to be added.
 * Provides visual indication of where images should go with optional label.
 * 
 * Features:
 * - Theme-aware styling
 * - Optional label/text
 * - Aspect ratio support
 * - Loading state support
 * - Accessible
 * 
 * @component
 */

'use client';

import React from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  /**
   * Width of the placeholder
   */
  width?: number | string;
  
  /**
   * Height of the placeholder
   */
  height?: number | string;
  
  /**
   * Aspect ratio (e.g., "16/9", "4/3", "1/1")
   */
  aspectRatio?: string;
  
  /**
   * Optional label to display
   */
  label?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Show border
   */
  showBorder?: boolean;
  
  /**
   * Show icon
   */
  showIcon?: boolean;
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = '100%',
  height,
  aspectRatio,
  label,
  className = '',
  size = 'md',
  showBorder = true,
  showIcon = true,
}) => {
  // Calculate aspect ratio padding
  const aspectRatioStyle = aspectRatio
    ? {
        aspectRatio,
      }
    : height
    ? { height }
    : { paddingBottom: '56.25%' }; // Default 16:9

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        'bg-gradient-to-br from-muted/30 to-muted/50',
        'dark:from-muted/20 dark:to-muted/30',
        showBorder && 'border border-dashed border-border/50',
        'rounded-lg',
        'flex items-center justify-center',
        'transition-all duration-300',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        ...aspectRatioStyle,
      }}
      role="img"
      aria-label={label || 'Image placeholder'}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
        {showIcon && (
          <ImageIcon 
            size={iconSizes[size]} 
            className="opacity-40 dark:opacity-30"
            aria-hidden="true"
          />
        )}
        {label && (
          <span className={cn(
            'font-medium text-center px-4',
            sizeClasses[size],
            'opacity-60 dark:opacity-50'
          )}>
            {label}
          </span>
        )}
      </div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default ImagePlaceholder;


