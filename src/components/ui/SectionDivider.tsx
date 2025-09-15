import React from 'react';

interface SectionDividerProps {
  variant?: 'blue' | 'gradient' | 'subtle';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'gradient', 
  className = '' 
}) => {
  const variants = {
    blue: 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent',
    gradient: 'bg-gradient-to-r from-transparent via-blue-400/30 via-indigo-400/30 to-transparent',
    subtle: 'bg-gradient-to-r from-transparent via-gray-600/20 to-transparent'
  };

  return (
    <div className={`relative w-full py-12 ${className}`}>
      <div className="container mx-auto px-6">
        <div 
          className={`h-[1px] w-full ${variants[variant]}`}
          style={{
            background: variant === 'gradient' 
              ? 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 25%, rgba(99, 102, 241, 0.3) 75%, transparent 100%)'
              : undefined
          }}
        />
        
        {/* Optional glow effect */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(8px)'
          }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
