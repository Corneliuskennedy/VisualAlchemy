'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic, Cpu, Rocket, DollarSign, Building2, Palette, Shield, Brain, TrendingUp, Library, Settings } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { getVideoUrl } from '@/lib/video-utils';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [isPosterGenerated, setIsPosterGenerated] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const url = getVideoUrl('FInalWebsiteVideo.mp4');
    setVideoUrl(url);
    
    // Get poster image from Supabase
    const poster = getVideoUrl('openart_bkOTVqnL_upscaled.png');
    if (poster && poster !== url) {
      setPosterUrl(poster);
    }
    
    console.log('Video URL:', url);
    console.log('Poster URL:', poster);
  }, []);
  
  // Generate poster from video first frame
  const generatePoster = React.useCallback(() => {
    if (!videoRef.current || posterUrl || isPosterGenerated) return;
    
    const video = videoRef.current;
    if (video.readyState < 2 || video.videoWidth === 0) return;
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Seek to a frame that's likely to have content (not black)
      const originalTime = video.currentTime;
      video.currentTime = 0.5; // Try 0.5 seconds instead of 0.1
      
      const handleSeeked = () => {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          
          // Check if the image is not just black
          const imageData = ctx.getImageData(0, 0, Math.min(100, canvas.width), Math.min(100, canvas.height));
          const pixels = imageData.data;
          let hasContent = false;
          
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            // If any pixel is not black/dark, we have content
            if (r > 20 || g > 20 || b > 20) {
              hasContent = true;
              break;
            }
          }
          
          if (hasContent) {
            setPosterUrl(dataUrl);
            setIsPosterGenerated(true);
            video.poster = dataUrl;
          }
          
          video.currentTime = originalTime;
        } catch (err) {
          console.warn('Poster generation failed:', err);
        }
        video.removeEventListener('seeked', handleSeeked);
      };
      
      video.addEventListener('seeked', handleSeeked, { once: true });
    } catch (err) {
      console.warn('Poster generation setup failed:', err);
    }
  }, [posterUrl, isPosterGenerated]);
  
  const {
    containerVariants,
    itemVariants,
    heroTitleVariants,
    cardVariants,
    fadeInUp,
  } = useOptimizedAnimations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroReady(true);
    }, prefersReducedMotion ? 0 : 400);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Memoize hero headline words
  const heroHeadlineWords = useMemo(() => {
    const headline = "Your Audio. My Visuals. Unfair Retention.";
    return headline.split('. ').map((word, index, array) => {
      const isLast = index === array.length - 1;
      const cleanWord = isLast && word.endsWith('.') ? word.slice(0, -1) : word;
      return { word: cleanWord, isLast, index };
    });
  }, []);

  // Text hover effects - Emerald theme
  const handleHeroTextMouseEnter = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.textShadow = '0 4px 16px rgba(16, 185, 129, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)';
  }, []);
  
  const handleHeroTextMouseLeave = React.useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)';
  }, []);

  const scrollToProof = () => {
    const proofSection = document.getElementById('the-proof');
    proofSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative">
      {/* Minimal Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 backdrop-blur-md bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-mono font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            VISUAL_ALCHEMY
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-gray-400" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            <a 
              href="https://www.octomatic.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#10b981] transition-colors"
            >
              part of octomatic.ai
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Reduced Height */}
      <section 
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 md:py-28 overflow-hidden pt-24 border-y border-white/5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Hero Background - Emerald Theme Rich Multi-Color Premium Gradient */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            backgroundColor: '#050505',
            background: `
              radial-gradient(ellipse 40% 60% at 15% 35%, 
                rgba(16, 185, 129, 0.9) 0%,
                rgba(5, 150, 105, 0.7) 15%,
                rgba(4, 120, 87, 0.3) 35%,
                rgba(5, 5, 5, 0.9) 60%,
                rgba(5, 5, 5, 1) 100%
              ),
              radial-gradient(ellipse 35% 50% at 85% 25%, 
                rgba(52, 211, 153, 0.8) 0%,
                rgba(16, 185, 129, 0.6) 20%,
                rgba(4, 120, 87, 0.2) 45%,
                rgba(5, 5, 5, 0.95) 70%,
                rgba(5, 5, 5, 1) 100%
              ),
              radial-gradient(ellipse 30% 45% at 50% 95%, 
                rgba(16, 185, 129, 0.7) 0%,
                rgba(5, 150, 105, 0.4) 30%,
                rgba(5, 5, 5, 0.8) 60%,
                rgba(5, 5, 5, 1) 100%
              ),
              radial-gradient(ellipse 25% 40% at 30% 75%, 
                rgba(110, 231, 183, 0.6) 0%,
                rgba(16, 185, 129, 0.3) 40%,
                rgba(5, 5, 5, 0.85) 70%,
                rgba(5, 5, 5, 1) 100%
              ),
              radial-gradient(ellipse 25% 35% at 70% 55%, 
                rgba(167, 243, 208, 0.7) 0%,
                rgba(5, 150, 105, 0.4) 40%,
                rgba(5, 5, 5, 0.9) 70%,
                rgba(5, 5, 5, 1) 100%
              ),
              linear-gradient(135deg, 
                rgba(5, 5, 5, 0.6) 0%,
                rgba(5, 5, 5, 0.7) 25%,
                rgba(5, 5, 5, 0.85) 60%,
                rgba(5, 5, 5, 0.95) 100%
              )
            `,
            backgroundSize: '300% 300%, 280% 280%, 260% 260%, 240% 240%, 220% 220%, 100% 100%',
            backgroundPosition: '0% 50%, 100% 30%, 50% 100%, 25% 75%, 75% 60%, center',
            animation: 'gradient-flow 20s ease-in-out infinite, gradient-breathe 7s ease-in-out infinite, water-wave 14s ease-in-out infinite',
            willChange: 'background-position, transform, opacity',
            filter: 'contrast(1.5) saturate(1.7)',
          }}
        />
        
        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent/30 to-[#050505]/40" />
        
        <motion.div
          initial="hidden"
          animate={isHeroReady ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12 relative z-10"
        >
          {/* Clean Typography - Optimized for LCP */}
          <motion.h1
            id="hero-heading"
            variants={heroTitleVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-archivo font-bold leading-[1.05] tracking-tight
                     text-white flex flex-wrap justify-center items-center gap-2 md:gap-4
                     will-change-transform transform-gpu"
            style={{
              fontFamily: 'var(--font-archivo), system-ui, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
              contain: 'layout style paint',
            } as React.CSSProperties}
            aria-label="Your Audio. My Visuals. Unfair Retention."
          >
            {heroHeadlineWords.map(({ word, isLast, index }) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : -18,
                  x: prefersReducedMotion ? 0 : -12,
                  scale: 0.96,
                }}
                animate={isHeroReady ? { 
                  opacity: 1, 
                  y: 0, 
                  x: 0,
                  scale: 1,
                } : { 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : -18, 
                  x: prefersReducedMotion ? 0 : -12,
                  scale: 0.96,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.1,
                  delay: prefersReducedMotion ? 0 : (isHeroReady ? index * 0.3 : 0),
                  ease: [0.19, 1, 0.22, 1],
                }}
                onMouseEnter={handleHeroTextMouseEnter}
                onMouseLeave={handleHeroTextMouseLeave}
                className="inline-block will-change-transform transform-gpu"
              >
                {word === "My" || word === "Visuals" || word === "Unfair" || word === "Retention" ? (
                  <span className="text-[#10b981]">{word}</span>
                ) : (
                  word
                )}
                {isLast ? '.' : '. '}
              </motion.span>
            ))}
          </motion.h1>

          {/* Clean Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed
                     text-gray-400 font-normal"
          >
            I build high-performance Visual Assets for finance creators. You speak. I engineer the rest. Zero Administrative Drag.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div 
            variants={itemVariants} 
            className="pt-8 md:pt-10 lg:pt-12"
          >
            <Button
              onClick={() => {
                const videoSection = document.getElementById('the-video');
                videoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              size="lg"
              className="bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-lg px-8 py-6 rounded-sm border-2 border-[#10b981] transition-all duration-300 font-mono"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              Watch The Proof
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div 
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => {
                const videoSection = document.getElementById('the-video');
                videoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <p className="text-xs text-[#10b981] font-mono uppercase tracking-wider mb-2 group-hover:text-[#34d399] transition-colors" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                Scroll to Watch
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-[#10b981]/50 rounded-full flex items-start justify-center p-2 group-hover:border-[#10b981] transition-colors"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-[#10b981] rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* The Video Section - The Moneymaker */}
      <section 
        id="the-video" 
        className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <div 
              className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              // THE PROOF
            </div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              See It In <span className="text-[#10b981]">Action</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              This is what <span className="text-[#10b981] font-semibold">+2,000 subscribers</span> and <span className="text-[#10b981] font-semibold">117,000 views</span> looks like. One video. One client.
            </motion.p>
          </motion.div>
          
          {/* Video Comparison - Monitor Style */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="backdrop-blur-md bg-black/40 border-2 border-[#10b981]/30 p-2 rounded-sm shadow-2xl shadow-[#10b981]/10"
          >
            {/* Monitor Frame */}
            <div className="border-2 border-white/10 p-2 bg-black/60">
              <div className="aspect-video bg-[#050505] border border-white/5 overflow-hidden relative">
                {/* Monitor Scan Lines Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                }} />
                {videoUrl ? (
                  <>
                    {/* Show overlay only if no poster is available */}
                    {!posterUrl && (
                      <div 
                        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]"
                        onClick={(e) => {
                          const video = videoRef.current;
                          if (video) {
                            video.play().catch(err => console.error('Play failed:', err));
                            e.currentTarget.style.display = 'none';
                          }
                        }}
                      >
                        <div className="text-center p-8">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#059669]/10 border-2 border-[#10b981]/30 flex items-center justify-center mb-4 group-hover:from-[#10b981]/30 group-hover:to-[#059669]/20 transition-all mx-auto shadow-lg shadow-[#10b981]/20">
                            <svg className="w-12 h-12 text-[#10b981] ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          <p className="text-sm text-[#10b981] font-mono uppercase tracking-wider mb-2">Video Preview</p>
                          <p className="text-xs text-gray-500 font-mono">Click to Play</p>
                        </div>
                      </div>
                    )}
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      controls
                      className="w-full h-full object-cover relative z-10"
                      preload="metadata"
                      playsInline
                      poster={posterUrl || undefined}
                      onLoadedMetadata={(e) => {
                        const video = e.currentTarget;
                        // Generate poster if we don't have one
                        if (!posterUrl && video.readyState >= 2 && video.videoWidth > 0) {
                          setTimeout(() => generatePoster(), 100);
                        }
                      }}
                      onCanPlay={(e) => {
                        const video = e.currentTarget;
                        // Try generating poster when video can play
                        if (!posterUrl && !isPosterGenerated) {
                          generatePoster();
                        }
                      }}
                      onPlay={(e) => {
                        // Hide overlay when video starts playing
                        const overlay = e.currentTarget.previousElementSibling as HTMLElement;
                        if (overlay && overlay.style) {
                          overlay.style.display = 'none';
                        }
                      }}
                      onError={(e) => {
                        console.error('Video load error:', e);
                        console.error('Video URL:', videoUrl);
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <p className="text-sm font-mono mb-2">Loading video...</p>
                      <p className="text-xs text-gray-600">FInalWebsiteVideo.mp4</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
        
      {/* The Proof Section */}
      <section id="the-proof" className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={fadeInUp}
            className="mb-4 text-center"
          >
            <div 
              className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              PROOF OF MECHANISM
            </div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16"
            >
              Subject: <span className="text-[#10b981]">Black Swan Capitalist</span>
            </motion.h2>
          </motion.div>
          
          {/* Simple Stats Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 rounded-sm"
            >
              <div 
                className="text-5xl md:text-6xl font-mono font-bold text-[#10b981] mb-2" 
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                +2,000
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                GROWTH FROM 1 VIDEO
              </div>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 rounded-sm"
            >
              <div 
                className="text-5xl md:text-6xl font-mono font-bold text-[#10b981] mb-2" 
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                117,000
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                VS 44K AVG STANDARD UPLOAD
              </div>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 rounded-sm"
            >
              <div 
                className="text-5xl md:text-6xl font-mono font-bold text-[#10b981] mb-2" 
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                300%
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                PERFORMANCE INCREASE
              </div>
            </motion.div>
          </motion.div>
          
          {/* Verified Analytics Data */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={fadeInUp}
            className="mb-16"
          >
            <div 
              className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4 text-center"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              // VERIFIED_ANALYTICS_DATA
            </div>
            <div className="backdrop-blur-md bg-black/40 border-2 border-[#10b981]/30 p-6 rounded-sm relative overflow-hidden">
              {/* Green Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/10 via-transparent to-[#10b981]/10 pointer-events-none" />
              <div className="relative">
                {/* Two Proof Images - Stacked for Better Legibility */}
                <div className="space-y-6 mb-4">
                  <div className="bg-[#050505] border border-[#10b981]/20 rounded-sm overflow-hidden">
                    <Image
                      src="/images/video_1_proof.png"
                      alt="Video Proof 1 - Analytics Data"
                      width={1200}
                      height={900}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="bg-[#050505] border border-[#10b981]/20 rounded-sm overflow-hidden">
                    <Image
                      src="/images/Video_2_proof.png"
                      alt="Video Proof 2 - Analytics Data"
                      width={1200}
                      height={900}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-mono text-center italic" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  Fig 1.1: Actual retention & subscriber velocity from the pilot deployment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Mechanism Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
          >
            The Mechanism
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto font-mono"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            A binary input/output system. No creative meetings. No revisions hell.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: The Input */}
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-6 md:p-8 rounded-sm"
            >
              <div className="w-12 h-12 rounded-sm bg-[#10b981]/20 flex items-center justify-center mb-6 border border-[#10b981]/30">
                <Mic className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 
                className="text-xl md:text-2xl font-bold mb-4 font-mono uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                1. RAW INPUT
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your raw audio file. No lighting, no camera, no setup. Just your voice and your alpha.
              </p>
            </motion.div>

            {/* Card 2: The Alchemy */}
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-6 md:p-8 rounded-sm"
            >
              <div className="w-12 h-12 rounded-sm bg-[#10b981]/20 flex items-center justify-center mb-6 border border-[#10b981]/30">
                <Cpu className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 
                className="text-xl md:text-2xl font-bold mb-4 font-mono uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                2. VISUAL ENGINEERING
              </h3>
              <p className="text-gray-400 leading-relaxed">
                    I apply the 'Visual Essay' framework. Narrative Architecture & Data Visualization are engineered manually.
              </p>
            </motion.div>

            {/* Card 3: The Output */}
            <motion.div 
              variants={cardVariants}
              className="relative backdrop-blur-md bg-black/40 border border-white/10 p-6 md:p-8 rounded-sm"
            >
              <div className="w-12 h-12 rounded-sm bg-[#10b981]/20 flex items-center justify-center mb-6 border border-[#10b981]/30">
                <Rocket className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 
                className="text-xl md:text-2xl font-bold mb-4 font-mono uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                3. ASSET DEPLOYMENT
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Receive a 4K, algorithm-ready asset within 48 hours. Plug it into YouTube. Watch the retention graph flatline.
              </p>
            </motion.div>
          </motion.div>

          {/* The Leverage Equation */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative backdrop-blur-md bg-black/40 border-2 border-white/10 p-8 md:p-10 rounded-sm mt-12"
          >
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold mb-4 font-mono uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                The Leverage Equation
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Stop competing on 'Production Value.' Compete on Density. You provide the intellect; I provide the visual adrenaline. This is how you scale trust without scaling effort.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Portfolio Round Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative backdrop-blur-md bg-black/40 border-2 border-white/10 p-8 md:p-12 rounded-sm text-center"
          >
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-8 font-mono uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              The Portfolio Round
            </motion.h2>
            
            <div className="inline-block px-4 py-2 bg-[#10b981] text-black text-xs font-semibold uppercase tracking-wider rounded-sm mb-4 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              EARLY-BIRD DISCOUNT: 2/5 CLAIMED
            </div>
            <p className="text-sm text-gray-400 mb-8 font-mono text-center" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              Discounted pricing for the first 5 clients. <span className="text-[#10b981] font-semibold">3 spots remaining.</span>
            </p>
            
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span 
                  className="text-3xl text-gray-500 line-through font-mono" 
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  €1,250
                </span>
                <span 
                  className="text-6xl md:text-7xl font-mono font-bold text-[#10b981]"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  €597
                </span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-sm bg-[#10b981] mt-2 flex-shrink-0" />
                <span className="text-gray-300 font-mono text-sm" style={{ fontFamily: 'var(--font-mono), monospace' }}>Audio Analysis</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-sm bg-[#10b981] mt-2 flex-shrink-0" />
                <span className="text-gray-300 font-mono text-sm" style={{ fontFamily: 'var(--font-mono), monospace' }}>Visual Narrative</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-sm bg-[#10b981] mt-2 flex-shrink-0" />
                <span className="text-gray-300 font-mono text-sm" style={{ fontFamily: 'var(--font-mono), monospace' }}>48h Delivery</span>
              </div>
            </div>
            
            {/* The Zero-Risk Protocol */}
            <div className="backdrop-blur-md bg-black/60 border-2 border-[#10b981]/40 p-6 rounded-sm mb-8 relative overflow-hidden">
              {/* Warning-style border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 via-transparent to-[#10b981]/5 pointer-events-none" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/30 flex-shrink-0">
                    <Shield className="h-5 w-5 text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold mb-2 font-mono uppercase tracking-wider text-[#10b981]"
                      style={{ fontFamily: 'var(--font-mono), monospace' }}
                    >
                      The Zero-Risk Protocol
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      If the visual asset doesn't outperform your channel average retention in the first 60 seconds, I will refund the entire €597. The contract is voided. You pay €0. You keep the asset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder/Operator Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px', amount: 0.2 }}
            variants={cardVariants}
            className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 md:p-10 rounded-sm"
          >
            {/* Classified Personnel File Header */}
            <div className="mb-8 pb-4 border-b border-white/10">
              <div 
                className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-2"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                CLASSIFIED PERSONNEL FILE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Built by an Engineer, Not an Artist.
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-4">
                <div className="font-mono text-lg text-white" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  Kennet Timmers
                </div>
                <div className="text-gray-400 font-mono text-sm" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  Founder, Octomatic.ai
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-10">
              {/* Image/Avatar Column */}
              <div className="flex flex-col items-center md:items-start md:h-full">
                <div className="w-full md:w-48 md:min-h-[400px] rounded-sm border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden mb-4 flex items-center justify-center">
                  <img 
                    src="/images/Visual_alchemy_photo_kennet.png" 
                    alt="Kennet Timmers" 
                    className="w-full h-full object-contain max-h-full"
                  />
                </div>
              </div>

              {/* Credentials Column */}
              <div className="space-y-6">
                {/* Body Copy */}
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    I don't just 'edit videos.' I architect information flows.
                  </p>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                    With a background as <strong className="text-white">Academy Lead at Be Informed</strong> (RegTech) and <strong className="text-white">Head of Operations</strong>, I treat your content like a software product: structured, optimized, and engineered for retention.
                  </p>
                </div>

                {/* Track Record Micro-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {/* Academy Architect */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="w-10 h-10 rounded-sm bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/30">
                      <Library className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <div className="font-bold text-lg text-white">Academy Architect</div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      Former Academy Lead (Be Informed)
                    </div>
                    <div 
                      className="text-xs text-gray-500 font-mono mt-1 leading-relaxed"
                      style={{ fontFamily: 'var(--font-mono), monospace' }}
                    >
                      I didn't just work in RegTech; I built the education system from the ground up. I know exactly how to structure complex data so audiences <em>understand</em> and <em>retain</em> it.
                    </div>
                  </motion.div>

                  {/* Head of Operations */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="w-10 h-10 rounded-sm bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/30">
                      <Settings className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <div className="font-bold text-lg text-white">Head of Operations</div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      Founder at Octomatic
                    </div>
                    <div 
                      className="text-xs text-gray-500 font-mono mt-1 leading-relaxed"
                      style={{ fontFamily: 'var(--font-mono), monospace' }}
                    >
                      I build automation systems for SMEs to eliminate 20+ hours of drag. My delivery pipeline is zero-friction. You upload; I deploy. No administrative chaos.
                    </div>
                  </motion.div>

                  {/* ML Certified */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="w-10 h-10 rounded-sm bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/30">
                      <Brain className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <div className="font-bold text-lg text-white">ML Certified</div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      <span className="text-[#10b981] font-semibold">Stanford</span> / DeepLearning.AI
                    </div>
                    <div 
                      className="text-xs text-gray-500 font-mono mt-1 leading-relaxed"
                      style={{ fontFamily: 'var(--font-mono), monospace' }}
                    >
                      Specialized in Machine Learning & Model Deployment. I don't use 'magic' tools; I use engineered workflows to upscale, animate, and visualize your alpha.
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operational Protocols Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 text-center"
          >
            <div 
              className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              OPERATIONAL PROTOCOLS
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-12 font-mono uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem 
                value="item-1" 
                className="backdrop-blur-md bg-black/40 border border-white/10 rounded-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-[#10b981] transition-colors font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  Is this 100% AI?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  No. The strategy and narrative are human-engineered. AI is used for visual generation and upscaling only.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem 
                value="item-2" 
                className="backdrop-blur-md bg-black/40 border border-white/10 rounded-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-[#10b981] transition-colors font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  Do I own the rights?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  Yes. You own 100% of the asset and project files upon delivery.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem 
                value="item-3" 
                className="backdrop-blur-md bg-black/40 border border-white/10 rounded-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-[#10b981] transition-colors font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  What if I hate it?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  We do one round of 'Calibration' revisions. If you still hate it, you don't pay.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
          >
            Ready to Engineer Virality?
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Secure your allocation. Transform your content into high-retention, viral-ready videos.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-lg px-12 py-6 rounded-sm border-2 border-[#10b981] transition-all duration-300 font-mono"
                style={{ fontFamily: 'var(--font-mono), monospace' }}
              >
                Secure Allocation
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-2"
          >
            <p className="text-sm text-gray-500 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              Visual Alchemy is part of{' '}
              <a 
                href="https://www.octomatic.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#10b981] hover:underline transition-colors"
              >
                octomatic.ai
              </a>
            </p>
            <p className="text-xs text-gray-600 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              Amsterdam, NL
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
