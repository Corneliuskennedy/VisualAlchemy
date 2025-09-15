'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'strong' | 'premium';
  hover?: boolean;
  glow?: boolean;
  border?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true,
  glow = false,
  border = true,
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl
    transition-all duration-300 ease-out
    transform-gpu will-change-transform
  `;

  const variants = {
    default: `
      bg-white/5 backdrop-blur-md
      ${border ? 'border border-white/10' : ''}
      ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1' : ''}
      shadow-lg shadow-black/10
    `,
    subtle: `
      bg-white/3 backdrop-blur-sm
      ${border ? 'border border-white/5' : ''}
      ${hover ? 'hover:bg-white/5 hover:border-white/10' : ''}
      shadow-md shadow-black/5
    `,
    strong: `
      bg-white/10 backdrop-blur-lg
      ${border ? 'border border-white/20' : ''}
      ${hover ? 'hover:bg-white/15 hover:border-white/30 hover:scale-[1.01]' : ''}
      shadow-xl shadow-black/20
    `,
    premium: `
      bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
      ${border ? 'border border-white/20' : ''}
      ${hover ? 'hover:from-white/15 hover:to-white/10 hover:scale-[1.02] hover:-translate-y-2' : ''}
      shadow-2xl shadow-black/25
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br 
      before:from-[#4585f4]/10 before:to-[#6B8AE6]/10 before:opacity-0
      ${hover ? 'hover:before:opacity-100' : ''}
      before:transition-opacity before:duration-300
    `
  };

  const glowClasses = glow ? `
    after:absolute after:inset-0 after:rounded-[inherit]
    after:bg-gradient-to-r after:from-[#4585f4]/20 after:to-[#6B8AE6]/20
    after:opacity-0 hover:after:opacity-100 after:blur-xl
    after:transition-opacity after:duration-300 after:-z-10
  ` : '';

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
