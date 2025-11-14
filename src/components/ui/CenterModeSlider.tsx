'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  title: string;
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

export function CenterModeSlider({ headline, cards }: CenterModeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const centerCard = (index: number) => {
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
  };

  const activate = (index: number) => {
    if (index === currentIndex || index < 0 || index >= cards.length) return;
    setCurrentIndex(index);
    // Delay centering to allow animation to start
    setTimeout(() => centerCard(index), 50);
  };

  const go = (step: number) => {
    const newIndex = Math.min(Math.max(currentIndex + step, 0), cards.length - 1);
    activate(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        go(1);
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        go(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    // Center on mount and when mobile state changes
    setTimeout(() => centerCard(currentIndex), 100);
  }, [isMobile]);

  // Default gradient backgrounds (no images needed)
  const gradientBackgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  ];

  return (
    <section className="py-40 md:py-48 px-4 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-bold text-heading dark:text-white max-w-2xl">
            {headline}
          </h2>
          
          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-border/30 bg-background/80 backdrop-blur-sm hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={() => go(1)}
              disabled={currentIndex === cards.length - 1}
              className="w-12 h-12 rounded-full border border-border/30 bg-background/80 backdrop-blur-sm hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Slider Container - Properly centered and sized */}
        <div 
          ref={containerRef}
          className="overflow-hidden"
          style={{
            height: isMobile ? 'auto' : '32rem',
            maxHeight: isMobile ? 'none' : '32rem',
          }}
        >
          <div
            ref={trackRef}
            className={`
              flex ${isMobile ? 'flex-col' : 'flex-row'} 
              ${isMobile ? 'gap-6' : 'gap-6'} 
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

              return (
                <motion.div
                  key={index}
                  layout
                  initial={false}
                  animate={{
                    width: isMobile 
                      ? '100%' 
                      : isActive 
                        ? '36rem' 
                        : '6rem',
                    height: isMobile 
                      ? isActive 
                        ? 'auto' 
                        : '6rem'
                      : '26rem',
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`
                    relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                    ${isActive ? 'shadow-2xl' : 'shadow-lg'}
                    ${isMobile ? 'w-full' : ''}
                    transition-shadow duration-300
                  `}
                  style={{
                    scrollSnapAlign: 'center',
                  }}
                  onClick={() => activate(index)}
                  onMouseEnter={() => {
                    if (!isMobile && window.matchMedia('(hover: hover)').matches) {
                      activate(index);
                    }
                  }}
                >
                  {/* Background Gradient */}
                  <div
                    className="absolute inset-0 transition-all duration-600"
                    style={{
                      background: bgGradient,
                      opacity: isActive ? 1 : 0.7,
                    }}
                  />

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-[1]" />

                  {/* Content */}
                  <div
                    className={`
                      relative z-[2] h-full flex
                      ${isActive 
                        ? (isMobile ? 'flex-col p-8' : 'flex-row items-center p-10 gap-8') 
                        : 'flex-col items-center justify-center p-4'
                      }
                      transition-all duration-300
                    `}
                  >
                    {/* Title - Always visible */}
                    <h3
                      className={`
                        font-archivo font-bold text-white
                        ${isActive
                          ? isMobile
                            ? 'text-3xl mb-4'
                            : 'text-4xl md:text-5xl mb-0 flex-shrink-0'
                          : 'text-lg md:text-xl'
                        }
                        ${!isActive && !isMobile ? 'writing-vertical-rl rotate-180' : ''}
                        transition-all duration-300
                        ${isActive && !isMobile ? 'w-48' : ''}
                      `}
                    >
                      {card.title}
                    </h3>

                    {/* Active Content */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isMobile ? 0 : -20 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className={`flex-1 ${isMobile ? 'space-y-6' : 'space-y-6 max-w-md'}`}
                        >
                          <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                            {card.description}
                          </p>

                          <Link
                            href={card.href}
                            className="inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-base transition-all duration-300 border border-white/20 hover:border-white/40">
                              {card.ctaText.replace(' →', '')}
                            </button>
                          </Link>
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
}
