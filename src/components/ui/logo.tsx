import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
  onClick?: () => void;
}

export const Logo = React.memo(({ 
  variant = 'header',
  className,
  onClick 
}: LogoProps) => {
  // Original SVG dimensions: 686.68 x 134.05
  const ASPECT_RATIO = 686.68 / 134.05; // roughly 5.12
  const HEIGHT = variant === 'header' ? 40 : 32; // Increased height for header
  const WIDTH = Math.round(HEIGHT * ASPECT_RATIO); // Maintains exact aspect ratio

  const image = (
    <img
      {...{
        src: "/octomaticLogo.svg",
        alt: "Octomatic",
        width: WIDTH,
        height: HEIGHT,
        className: cn(
          "object-contain select-none",
          variant === 'header' ? 'h-10 w-[164px]' : 'h-8 w-[100px]',
          className
        ),
        loading: variant === 'header' ? 'eager' : 'lazy',
        decoding: "async",
        fetchPriority: variant === 'header' ? 'high' : 'low',
        draggable: false,
      } as React.ImgHTMLAttributes<HTMLImageElement>}
    />
  );

  if (variant === 'header') {
    return (
      <Link
        href="/"
        className="flex items-center flex-shrink-0"
        onClick={onClick}
      >
        {image}
      </Link>
    );
  }

  return (
    <div className="flex items-center flex-shrink-0">
      {image}
    </div>
  );
});

Logo.displayName = 'Logo'; 