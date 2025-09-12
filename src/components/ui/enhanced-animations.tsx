import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  className,
  delay = 0,
  duration = 600,
  direction = 'up',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      case 'down': return 'translate3d(0, -40px, 0)';
      case 'left': return 'translate3d(40px, 0, 0)';
      case 'right': return 'translate3d(-40px, 0, 0)';
      default: return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn('transition-all ease-out', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  hoverScale = 1.02,
  hoverRotate = 0
}) => {
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer',
        'hover:shadow-xl hover:shadow-[#4585f4]/10',
        className
      )}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${hoverRotate}deg) rotateY(0deg) scale3d(${hoverScale}, ${hoverScale}, 1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }}
    >
      {children}
    </div>
  );
};

interface PulseIconProps {
  children: React.ReactNode;
  className?: string;
  pulseColor?: string;
}

export const PulseIcon: React.FC<PulseIconProps> = ({
  children,
  className,
  pulseColor = '#4585f4'
}) => {
  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-20"
        style={{ backgroundColor: pulseColor }}
      />
      <div
        className="absolute inset-0 rounded-full animate-pulse opacity-10"
        style={{ backgroundColor: pulseColor }}
      />
      {children}
    </div>
  );
};

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'from-[#4585f4] to-[#6B8AE6]'
}) => {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        gradient,
        className
      )}
    >
      {children}
    </span>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  amplitude = 10,
  duration = 3000,
  delay = 0
}) => {
  return (
    <div
      className={cn('animate-float', className)}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        '--float-amplitude': `${amplitude}px`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// CSS for floating animation (to be added to global styles)
export const floatingKeyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(var(--float-amplitude, -10px)); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`; 