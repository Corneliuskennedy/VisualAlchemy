'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroWebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Organic growth particles (flowers/foliage simulation)
    interface OrganicParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      growthRate: number;
      color: string;
      type: 'flower' | 'leaf';
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    const particles: OrganicParticle[] = [];
    const particleCount = 40;

    // Initialize organic particles
    for (let i = 0; i < particleCount; i++) {
      const type = Math.random() > 0.5 ? 'flower' : 'leaf';
      const colors = type === 'flower' 
        ? ['#ff6b9d', '#ffc857', '#c44569', '#f8b500', '#ff8c42']
        : ['#2d5016', '#3d6b1f', '#4a7c28', '#5a8c35'];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 2,
        maxRadius: Math.random() * 15 + 10,
        growthRate: Math.random() * 0.05 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.3,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    }

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Draw flower
    const drawFlower = (x: number, y: number, radius: number, color: string, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Petals
      const petalCount = 5;
      for (let i = 0; i < petalCount; i++) {
        ctx.beginPath();
        ctx.ellipse(
          Math.cos((i * Math.PI * 2) / petalCount) * radius * 0.6,
          Math.sin((i * Math.PI * 2) / petalCount) * radius * 0.6,
          radius * 0.4,
          radius * 0.6,
          (i * Math.PI * 2) / petalCount,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Center
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffc857';
      ctx.fill();

      ctx.restore();
    };

    // Draw leaf
    const drawLeaf = (x: number, y: number, radius: number, color: string, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.8, radius * 0.5, rotation, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Vein
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -radius * 0.5);
      ctx.lineTo(0, radius * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Growth animation
        if (particle.radius < particle.maxRadius && particle.life < particle.maxLife) {
          particle.radius += particle.growthRate;
          particle.life++;
        }

        // Mouse interaction - gentle repulsion
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx -= (dx / distance) * force * 0.01;
          particle.vy -= (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Boundary wrap
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw based on type
        if (particle.type === 'flower') {
          drawFlower(
            particle.x,
            particle.y,
            particle.radius,
            particle.color,
            particle.rotation,
            particle.opacity
          );
        } else {
          drawLeaf(
            particle.x,
            particle.y,
            particle.radius,
            particle.color,
            particle.rotation,
            particle.opacity
          );
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#101010]" />
      
      {/* WebGL Canvas with organic growth */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </motion.div>
  );
}

