'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  title: string;
  expandedTitle?: string;
  description: string;
  ctaText: string;
  href: string;
  bgImage?: string;
  thumbImage?: string;
}

interface CenterModeSliderProps {
  headline: string;
  cards: Card[];
}

export const CenterModeSlider = React.memo(function CenterModeSlider({ headline, cards }: CenterModeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Debounced mobile check function to prevent excessive updates
  const checkMobileTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const checkMobile = React.useCallback(() => {
    // Clear existing timeout
    if (checkMobileTimeoutRef.current) {
      clearTimeout(checkMobileTimeoutRef.current);
    }
    
    // Debounce resize checks
    checkMobileTimeoutRef.current = setTimeout(() => {
      const isMobileNow = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(prev => {
        // Only update if actually changed
        if (prev !== isMobileNow) {
          return isMobileNow;
        }
        return prev;
      });
    }, 150); // 150ms debounce
  }, []);

  useEffect(() => {
    // Initial check
    const isMobileNow = window.matchMedia('(max-width: 767px)').matches;
    setIsMobile(isMobileNow);
    
    // Add debounced resize listener
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (checkMobileTimeoutRef.current) {
        clearTimeout(checkMobileTimeoutRef.current);
      }
    };
  }, [checkMobile]);

  // Memoize centerCard function
  const centerCard = React.useCallback((index: number) => {
    if (!trackRef.current || !containerRef.current) return;
    
    const card = trackRef.current.children[index] as HTMLElement;
    if (!card) return;

    if (isMobile) {
      const cardTop = card.offsetTop;
      const cardHeight = card.clientHeight;
      const containerHeight = containerRef.current.clientHeight;
      const scrollTop = cardTop - (containerHeight / 2) + (cardHeight / 2);
      
      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    } else {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const containerWidth = containerRef.current.clientWidth;
      const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [isMobile]);

  // Memoize activate function
  const activate = React.useCallback((index: number) => {
    if (index === currentIndex || index < 0 || index >= cards.length) return;
    setCurrentIndex(index);
    // Delay centering to allow animation to start
    requestAnimationFrame(() => {
      setTimeout(() => centerCard(index), 50);
    });
  }, [currentIndex, cards.length, centerCard]);

  // Memoize go function
  const go = React.useCallback((step: number) => {
    const newIndex = Math.min(Math.max(currentIndex + step, 0), cards.length - 1);
    activate(newIndex);
  }, [currentIndex, cards.length, activate]);

  // Memoize keyboard handler
  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      go(1);
    }
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      go(-1);
    }
  }, [go]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    // Center on mount and when mobile state changes
    requestAnimationFrame(() => {
      setTimeout(() => centerCard(currentIndex), 100);
    });
  }, [isMobile, currentIndex, centerCard]);

  // Background images for cards - using provided stock images
  const cardImages = [
    '/images/pexels-dagmara-dombrovska-22732579-26698447.webp',
    '/images/pexels-dawid-tkocz-2157133464-34721374.webp',
    '/images/pexels-ekamelev-7798651.webp',
  ];
  
  // Default gradient backgrounds (fallback if images don't load)
  const gradientBackgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  ];

        return (
          <section className="pt-8 md:pt-12 pb-16 md:pb-20 px-6 md:px-8 relative z-10 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header - Left-aligned with card content */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-bold text-heading dark:text-white">
            {headline}
          </h2>
        </div>

        {/* Slider Container - Properly centered and sized */}
        <div 
          ref={containerRef}
          className="overflow-hidden"
          style={{
            height: isMobile ? 'auto' : '40rem',
            maxHeight: isMobile ? 'none' : '40rem',
          }}
        >
          <div
            ref={trackRef}
            className={`
              flex ${isMobile ? 'flex-col' : 'flex-row'} 
              ${isMobile ? 'gap-8' : 'gap-8'} 
              items-center
              ${isMobile ? '' : 'justify-center'}
              scroll-smooth
            `}
            style={{
              scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
              height: isMobile ? 'auto' : '100%',
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === currentIndex;
              const bgGradient = gradientBackgrounds[index] || gradientBackgrounds[0];
              const cardImage = cardImages[index] || cardImages[0];

              // Memoize handlers per card
              const handleClick = React.useCallback(() => activate(index), [activate, index]);
              const handleMouseEnter = React.useCallback(() => {
                if (!isMobile && window.matchMedia('(hover: hover)').matches) {
                  activate(index);
                }
              }, [isMobile, activate, index]);

              return (
                <motion.div
                  key={index}
                  layout
                  initial={false}
                  animate={{
                    width: isMobile 
                      ? '100%' 
                      : isActive 
                        ? '48rem' 
                        : '9rem',
                    height: isMobile 
                      ? isActive 
                        ? 'auto' 
                        : '8rem'
                      : '34rem',
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1], // Smooth easing
                  }}
                  className={`
                    relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                    ${isActive ? 'shadow-2xl ring-2 ring-white/10' : 'shadow-lg'}
                    ${isMobile ? 'w-full' : ''}
                    transition-shadow duration-500
                    will-change-transform
                    transform-gpu
                  `}
                  style={{
                    scrollSnapAlign: 'center',
                  }}
                  onClick={handleClick}
                  onMouseEnter={handleMouseEnter}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${cardImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  
                  {/* Gradient Overlay - Only shows when NOT active */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 z-[1] gradient-overlay transition-opacity duration-500 ease-out"
                      style={{
                        background: bgGradient,
                        opacity: 0.5,
                      }}
                    />
                  )}

                  {/* Dark Overlay for text readability - Enhanced for better contrast */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 z-[1] dark-overlay transition-opacity duration-500 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0.85,
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`
                      relative z-[2] h-full flex
                      ${isActive 
                        ? (isMobile ? 'flex-col p-10' : 'flex-row items-start p-12 gap-12') 
                        : 'flex-col items-center justify-center p-6'
                      }
                    `}
                  >
                    {/* Collapsed Title - Vertical rotated text */}
                    <AnimatePresence mode="wait">
                      {!isActive && (
                        <motion.h3
                          key={`collapsed-title-${index}`}
                          initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
                          animate={{ opacity: 1, rotate: 90, scale: 1 }}
                          exit={{ 
                            opacity: 0, 
                            rotate: 90, 
                            scale: 0.85,
                            transition: {
                              duration: 0.2, // Smooth exit timing
                              ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease in-out for natural feel
                            },
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease in-out
                          }}
                          className={`
                            font-archivo font-bold text-white select-none whitespace-nowrap
                            ${isMobile
                              ? 'text-3xl md:text-4xl'
                              : 'text-4xl md:text-5xl lg:text-6xl flex items-center justify-center'
                            }
                          `}
                          style={{
                            textShadow: '0 3px 16px rgba(0, 0, 0, 0.5), 0 1px 8px rgba(0, 0, 0, 0.3)',
                            letterSpacing: '0.1em',
                            WebkitTextStroke: !isMobile ? '0.5px rgba(255, 255, 255, 0.1)' : 'none',
                            transformOrigin: 'center center',
                          }}
                        >
                          {card.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>

                    {/* Expanded Content Container */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`expanded-content-${index}`}
                          initial={false}
                          className={`relative w-full h-full flex flex-col ${isMobile ? 'p-8' : 'p-10 md:p-12'}`}
                        >
                          {/* Title and Description Container - Properly spaced */}
                          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row items-start'} ${isMobile ? 'gap-8' : 'gap-12 md:gap-16'} flex-1`}>
                            {/* Left Column - Title and Button */}
                            <div className={`flex flex-col ${isMobile ? 'w-full' : 'w-[240px] md:w-[280px]'} ${isMobile ? 'gap-6' : 'gap-8'}`}>
                              {/* Expanded Title - Reduced size, better spacing */}
                              <motion.h1
                                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                  duration: 0.5,
                                  delay: 0.45,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`
                                  font-archivo font-bold text-white select-none
                                  ${isMobile
                                    ? 'text-4xl md:text-5xl leading-[1.1]'
                                    : 'text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight'
                                  }
                                `}
                                style={{
                                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                {(card.expandedTitle || card.title).split(' ').map((word, wordIndex) => (
                                  <span key={wordIndex} className="block">
                                    {word}
                                  </span>
                                ))}
                              </motion.h1>

                              {/* CTA Button - Under the h1 - Elegant black/white */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                  duration: 0.5,
                                  delay: 0.7,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="w-fit"
                              >
                                <Link
                                  href={card.href}
                                  className="inline-block"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = card.href;
                                    }}
                                    type="button"
                                    className="px-6 py-2.5 md:px-8 md:py-3 rounded-sm bg-white text-black hover:bg-transparent hover:text-white border-2 border-white font-medium text-sm md:text-base transition-all duration-300 ease-in-out active:scale-[0.98] cursor-pointer">
                                    {card.ctaText.replace(' →', '')}
                                  </button>
                                </Link>
                              </motion.div>
                            </div>

                            {/* Right Column - Description */}
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.5,
                                delay: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={`
                                text-white/95 leading-relaxed flex-1
                                ${isMobile 
                                  ? 'text-lg md:text-xl' 
                                  : 'text-lg md:text-xl lg:text-2xl max-w-[500px]'
                                }
                              `}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                              }}
                            >
                              {card.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator - Hidden on mobile */}
        {!isMobile && (
          <div className="flex gap-3 justify-center mt-12">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => activate(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex
                    ? 'bg-[#4585f4] scale-125 w-8'
                    : 'bg-white/40 hover:bg-white/60'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

