'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  gradient?: boolean;
  glow?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  gradient = false,
  glow = false,
  disabled,
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
    disabled:pointer-events-none disabled:opacity-50
    transform-gpu will-change-transform
  `;

  const variants = {
    primary: `
      bg-[#4585f4] hover:bg-[#3b73e0] text-white
      shadow-lg shadow-[#4585f4]/25 hover:shadow-xl hover:shadow-[#4585f4]/40
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[#4585f4]/50
    `,
    secondary: `
      bg-white/10 hover:bg-white/20 text-white border border-white/20
      backdrop-blur-sm hover:backdrop-blur-md
      shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-white/50
    `,
    ghost: `
      bg-transparent hover:bg-white/5 text-gray-300 hover:text-white
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-white/50
    `,
    premium: `
      bg-gradient-to-r from-[#4585f4] via-[#6B8AE6] to-[#4585f4]
      bg-size-200 hover:bg-pos-100 text-white
      shadow-2xl shadow-[#4585f4]/30 hover:shadow-[#4585f4]/50
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[#4585f4]/50
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/0 before:via-white/10 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      before:transition-transform before:duration-700 before:ease-out
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
    xl: 'px-8 py-4 text-lg rounded-xl gap-3'
  };

  const glowClasses = glow ? `
    before:absolute before:inset-0 before:rounded-[inherit] 
    before:bg-gradient-to-r before:from-[#4585f4] before:to-[#6B8AE6]
    before:opacity-0 hover:before:opacity-20 before:blur-xl
    before:transition-opacity before:duration-300 before:-z-10
  ` : '';

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        glowClasses,
        gradient && 'bg-gradient-to-r from-[#4585f4] to-[#6B8AE6]',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default PremiumButton;
