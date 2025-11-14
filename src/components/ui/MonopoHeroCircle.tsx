'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function MonopoHeroCircle() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Grainy Gradient Background - Monopo Style */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Base gradient background - Multi-color transitions */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(220, 38, 127, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 20%, #0a0a1a 40%, #0a1a2a 60%, #0a0a1a 80%, #0a0a0a 100%)
            `,
          }}
        />
        
        {/* Grainy texture overlay - Subtle film grain */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>

      {/* Large Circular Element - Monopo's Signature Circle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity, scale }}
      >
        {/* Outer blurred circle - Soft diffusion */}
        <motion.div
          className="relative w-[85vw] max-w-[900px] aspect-square rounded-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `
              radial-gradient(circle at 50% 20%, rgba(220, 38, 127, 0.4) 0%, transparent 45%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.5) 0%, transparent 55%),
              radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 45%),
              radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, transparent 65%)
            `,
            filter: 'blur(80px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Middle circle - More defined */}
        <motion.div
          className="absolute w-[70vw] max-w-[700px] aspect-square rounded-full"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `
              radial-gradient(circle at 50% 15%, rgba(220, 38, 127, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 50% 65%, rgba(139, 92, 246, 0.6) 0%, transparent 60%),
              radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)
            `,
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Inner circle - Sharpest definition */}
        <motion.div
          className="absolute w-[55vw] max-w-[550px] aspect-square rounded-full"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `
              radial-gradient(circle at 50% 10%, rgba(220, 38, 127, 0.6) 0%, transparent 55%),
              radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.7) 0%, transparent 65%),
              radial-gradient(circle at 50% 95%, rgba(59, 130, 246, 0.6) 0%, transparent 55%)
            `,
            filter: 'blur(30px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </>
  );
}

