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
      {/* Grainy Gradient Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Base gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(220, 38, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
              linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a0a1a 50%, #0a1a2a 75%, #0a0a0a 100%)
            `,
          }}
        />
        
        {/* Grainy texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>

      {/* Large Circular Element with Gradient */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity, scale }}
      >
        <motion.div
          className="relative w-[90vw] max-w-[800px] aspect-square rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `
              radial-gradient(circle at 50% 30%, rgba(220, 38, 127, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 50% 60%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
              radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)
            `,
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Inner circle with sharper gradient */}
        <motion.div
          className="absolute w-[70vw] max-w-[600px] aspect-square rounded-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `
              radial-gradient(circle at 50% 20%, rgba(220, 38, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)
            `,
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </>
  );
}

