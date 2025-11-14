'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    if (!trackRef.current) return;
    const card = trackRef.current.children[index] as HTMLElement;
    if (!card) return;

    if (isMobile) {
      const start = card.offsetTop;
      const containerHeight = trackRef.current.parentElement?.clientHeight || 0;
      trackRef.current.parentElement?.scrollTo({
        top: start - containerHeight / 2 + card.clientHeight / 2,
        behavior: 'smooth',
      });
    } else {
      const start = card.offsetLeft;
      const containerWidth = trackRef.current.parentElement?.clientWidth || 0;
      trackRef.current.parentElement?.scrollTo({
        left: start - containerWidth / 2 + card.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const activate = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    centerCard(index);
  };

  const go = (step: number) => {
    const newIndex = Math.min(Math.max(currentIndex + step, 0), cards.length - 1);
    activate(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) go(1);
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) go(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    centerCard(currentIndex);
  }, [isMobile]);

  // Default images - can be replaced with actual images
  const defaultBgImages = [
    '/images/build-bg.webp',
    '/images/optimize-bg.webp',
    '/images/create-bg.webp',
  ];

  const defaultThumbImages = [
    '/images/build-thumb.webp',
    '/images/optimize-thumb.webp',
    '/images/create-thumb.webp',
  ];

  return (
    <section className="py-40 md:py-48 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-archivo font-bold text-heading dark:text-white">
            {headline}
          </h2>
          
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-border/20 bg-background hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => go(1)}
              disabled={currentIndex === cards.length - 1}
              className="w-10 h-10 rounded-full border border-border/20 bg-background hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-5 scroll-smooth scrollbar-hide`}
            style={{
              scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === currentIndex;
              const bgImage = card.bgImage || defaultBgImages[index] || '';
              const thumbImage = card.thumbImage || defaultThumbImages[index] || '';

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    flexBasis: isActive ? (isMobile ? '100%' : '30rem') : (isMobile ? '100%' : '5rem'),
                    transform: isActive && !isMobile ? 'translateY(-6px)' : 'translateY(0)',
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`
                    relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer
                    ${isMobile ? 'h-auto min-h-[80px]' : 'h-[26rem]'}
                    ${isActive ? 'shadow-2xl' : 'shadow-md'}
                    transition-all duration-300
                  `}
                  onClick={() => activate(index)}
                  onMouseEnter={() => {
                    if (!isMobile && window.matchMedia('(hover: hover)').matches) {
                      activate(index);
                    }
                  }}
                >
                  {/* Background Image */}
                  {bgImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${bgImage})`,
                        filter: isActive ? 'brightness(0.9) saturate(100%)' : 'brightness(0.75) saturate(75%)',
                      }}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[1]" />

                  {/* Content */}
                  <div
                    className={`
                      relative z-[2] h-full flex
                      ${isActive ? (isMobile ? 'flex-col p-6' : 'flex-row items-center p-8 gap-6') : 'flex-col items-center justify-center p-4'}
                      transition-all duration-300
                    `}
                  >
                    {/* Thumbnail Image - Only shown when active */}
                    {isActive && thumbImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className={`
                          ${isMobile ? 'w-full h-48 mb-4' : 'w-[133px] h-[269px] flex-shrink-0'}
                          rounded-lg overflow-hidden shadow-lg
                        `}
                      >
                        <img
                          src={thumbImage}
                          alt={card.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Text Content */}
                    <div className={`flex-1 ${isMobile && isActive ? 'space-y-4' : ''}`}>
                      <h3
                        className={`
                          font-archivo font-bold text-white
                          ${isActive
                            ? isMobile
                              ? 'text-2xl mb-2'
                              : 'text-3xl md:text-4xl mb-3'
                            : 'text-lg md:text-xl writing-vertical-rl rotate-180'
                          }
                          transition-all duration-300
                        `}
                      >
                        {card.title}
                      </h3>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
                            {card.description}
                          </p>

                          <Link
                            href={card.href}
                            className="inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="px-6 py-3 rounded-full bg-[#4585f4] hover:bg-[#5A8FF5] text-white font-semibold text-sm transition-colors duration-300">
                              {card.ctaText.replace(' →', '')}
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator - Hidden on mobile */}
        {!isMobile && (
          <div className="flex gap-2 justify-center mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => activate(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex
                    ? 'bg-[#4585f4] scale-125'
                    : 'bg-white/35 hover:bg-white/50'
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

