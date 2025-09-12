import React from 'react';
import { cn } from "@/lib/utils";

interface GlowingBorderProps {
  variant?: 'static' | 'animated' | 'simple';
  children: React.ReactNode;
  className?: string;
}

const GlowingBorder = ({ 
  variant = 'static', 
  children, 
  className 
}: GlowingBorderProps) => {
  const baseStyles = "relative rounded-lg p-[2px] transition-all duration-300";
  
  const variants = {
    static: `
      bg-gradient-to-r from-[#0a0a2a] to-[#0011ff]
      before:absolute before:inset-[1px] before:rounded-[6px] before:bg-[#101112]
      before:content-[''] before:z-0
      after:absolute after:inset-0 after:rounded-lg after:p-[1px]
      after:bg-gradient-to-r after:from-[#0011ff] after:to-[#0033ff]
      after:content-[''] after:z-[-1]
      hover:shadow-[0_0_20px_rgba(0,17,255,0.4)]
      hover:after:opacity-80
    `,
    animated: `
      bg-gradient-to-r from-[#0011ff] to-[#0022ff]
      before:absolute before:inset-[1px] before:rounded-[6px] before:bg-[#101112]
      before:content-[''] before:z-0
      after:absolute after:inset-0 after:rounded-lg after:p-[1px]
      after:bg-gradient-to-r after:from-[#0011ff] after:to-[#0022ff]
      after:content-[''] after:z-[-1]
      animate-pulse
      hover:shadow-[0_0_30px_rgba(0,17,255,0.5)]
    `,
    simple: `
      border-2 border-[#0011ff]
      rounded-lg
      shadow-[0_0_15px_rgba(0,17,255,0.3)]
      hover:shadow-[0_0_20px_rgba(0,17,255,0.4)]
      transition-shadow duration-300
    `
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowingBorder;