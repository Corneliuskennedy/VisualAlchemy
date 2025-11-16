/**
 * Team Section Component
 * Premium team showcase with image support
 * Ready for professional photos
 */

'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useHomepage } from '@/hooks/useContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { generatePersonSchema } from '@/lib/seo/EntityFirstSEO';
import { authors } from '@/data/authors';
import { getSafeImageSrc } from '@/lib/image-error-handler';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
  expertise: string[];
}

interface TeamSectionProps {
  className?: string;
}

const TeamSectionComponent: React.FC<TeamSectionProps> = ({ className = '' }) => {
  const homepage = useHomepage();
  const { containerVariants, itemVariants, fadeInUp } = useOptimizedAnimations();

  // Team data - Replace with actual team members
  // Images should be placed in /public/team/ directory
  // Memoize team members to prevent recreation on every render
  const teamMembers = React.useMemo<TeamMember[]>(() => [
    {
      name: 'Kennet Timmers',
      role: 'Founder & Lead Developer',
      bio: '6+ years building beautiful, high-quality websites. Expert in Cursor AI, modern web development, and creating systems that scale.',
      image: '/team/kennet_timmers.webp', // Update path when photo is added
      linkedin: 'https://linkedin.com/in/kennet-timmers',
      github: 'https://github.com/kennet-timmers',
      email: 'kennet@octomatic.ai',
      expertise: ['Cursor AI', 'Next.js', 'TypeScript', 'Web Development'],
    },
    {
      name: 'Timo',
      role: 'UI/UX Designer',
      bio: 'Creating intuitive and beautiful user experiences that delight users and drive conversions. Expert in user research, interface design, and design systems.',
      image: '/team/timo.webp', // Update path when photo is added
      linkedin: undefined, // Add LinkedIn URL if available
      github: undefined,
      email: undefined, // Add email if available
      expertise: ['UI Design', 'UX Research', 'Design Systems', 'User Testing'],
    },
    {
      name: 'Boris',
      role: 'Meta & Marketing Specialist',
      bio: 'Driving growth through strategic marketing campaigns and Meta advertising. Expert in paid social, conversion optimization, and data-driven marketing.',
      image: '/team/boris.webp', // Update path when photo is added
      linkedin: undefined, // Add LinkedIn URL if available
      github: undefined,
      email: undefined, // Add email if available
      expertise: ['Meta Ads', 'Marketing Strategy', 'Conversion Optimization', 'Paid Social'],
    },
  ], []);

  // Generate Person schemas for Entity-First SEO (E-E-A-T signals)
  // Memoize to prevent recalculation on every render
  const personSchemas = React.useMemo(() => teamMembers
    .map(member => {
      const author = authors['kennet-timmers']; // Match by name or create mapping
      if (author && member.name === author.name) {
        return generatePersonSchema(author);
      }
      return null;
    })
    .filter(Boolean) as any[], [teamMembers]);

  // Inject Person schemas for Entity-First SEO (E-E-A-T) - replaces Helmet
  useEffect(() => {
    if (personSchemas.length === 0) return;

    personSchemas.forEach((schema, index) => {
      const scriptId = `team-person-schema-${index}`;
      let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(schema);
    });

    // Cleanup function
    return () => {
      personSchemas.forEach((_, index) => {
        const scriptId = `team-person-schema-${index}`;
        const scriptElement = document.getElementById(scriptId);
        if (scriptElement) {
          scriptElement.remove();
        }
      });
    };
  }, [personSchemas]);

  return (
    <>

      <section 
        id="team"
        aria-labelledby="team-heading"
        className={`py-24 md:py-32 px-6 md:px-8 relative z-10 snap-start bg-background ${className}`}
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        {/* Subtle background image */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pexels-caner-kokcu-636242728-34671003.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px', amount: 0.2 }}
            variants={containerVariants}
            className="space-y-16 md:space-y-20"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Section Header - Left-aligned with cards */}
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.h2
                id="team-heading"
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-archivo font-bold
                         text-heading dark:text-white
                         tracking-tight leading-[0.95]"
              >
                {homepage.team?.headline || 'Meet the Team'}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl max-w-3xl leading-relaxed 
                         text-body dark:text-white/90 font-archivo"
              >
                {homepage.team?.description || 'The experts behind every beautiful website we build. 6+ years of experience crafting premium web experiences with Cursor AI.'}
              </motion.p>
            </motion.div>

            {/* Team Grid - Portrait Cards with Hover Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {teamMembers.map((member, index) => {
                // Use placeholder images from public/images for portraits
                const portraitImages = [
                  '/images/pexels-caner-kokcu-636242728-34671003.webp',
                  '/images/pexels-dagmara-dombrovska-22732579-26698447.webp',
                  '/images/pexels-dawid-tkocz-2157133464-34721374.webp',
                ];
                const portraitImage = portraitImages[index] || portraitImages[0];
                
                return (
                  <motion.div
                    key={member.name}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="group relative 
                             overflow-hidden
                             transition-all duration-500 ease-out
                             border border-border/30 dark:border-white/10
                             hover:border-border/50 dark:hover:border-white/20
                             transform-gpu
                             bg-background dark:bg-black
                             shadow-lg hover:shadow-2xl
                             cursor-pointer"
                  >
                    {/* Portrait Image Section - Top Half */}
                    <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden">
                      <Image
                        src={portraitImage}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        priority={index === 0}
                        unoptimized={false}
                      />
                      
                      {/* Gradient overlay - subtle, gets stronger on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
                                    group-hover:from-black/60 group-hover:via-black/30 group-hover:to-transparent
                                    transition-all duration-500" />
                    </div>
                    
                    {/* Text Section - Bottom Half (Always Visible) */}
                    <div className="relative bg-black p-6 md:p-8">
                      {/* Name & Role */}
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-archivo font-bold mb-1.5 
                                     text-white uppercase tracking-wide">
                          {member.name.toUpperCase()}
                        </h3>
                        <div className="h-px w-12 bg-white/30 mb-3" />
                        <div className="text-sm md:text-base font-medium 
                                      text-white/70 uppercase tracking-wider">
                          {member.role.toUpperCase()}
                        </div>
                      </div>

                      {/* Social Links - Always Visible */}
                      <div className="flex items-center gap-4 text-xs text-white/50 uppercase tracking-wider mb-4">
                        {member.linkedin && <span>LI</span>}
                        {member.github && <span>GH</span>}
                        {member.email && <span>EM</span>}
                      </div>

                      {/* More Info Link */}
                      <div className="flex items-center justify-end">
                        <span className="text-xs text-white/60 uppercase tracking-wider group-hover:text-white/80 transition-colors duration-300">
                          More Info →
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay - Beautiful Content Reveal */}
                    <div className="absolute inset-0 
                                  bg-gradient-to-t from-black/95 via-black/90 to-black/80 
                                  backdrop-blur-sm
                                  p-8 md:p-10
                                  flex flex-col justify-end
                                  opacity-0 group-hover:opacity-100
                                  transition-opacity duration-500 ease-out
                                  pointer-events-none group-hover:pointer-events-auto">
                      {/* Bio - Appears on hover */}
                      <div className="mb-6 transform translate-y-4 group-hover:translate-y-0 
                                    opacity-0 group-hover:opacity-100
                                    transition-all duration-500 delay-75 ease-out">
                        <p className="text-base md:text-lg leading-relaxed 
                                    text-white/95 font-archivo font-light mb-6">
                          {member.bio}
                        </p>
                      </div>

                      {/* Expertise Tags - Appear on hover */}
                      <div className="flex flex-wrap gap-2 mb-6
                                    transform translate-y-4 group-hover:translate-y-0 
                                    opacity-0 group-hover:opacity-100
                                    transition-all duration-500 delay-150 ease-out">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium font-archivo
                                     bg-white/10 text-white/90
                                     border border-white/20
                                     backdrop-blur-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Social Links - Interactive on hover */}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10
                                    transform translate-y-4 group-hover:translate-y-0 
                                    opacity-0 group-hover:opacity-100
                                    transition-all duration-500 delay-200 ease-out">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg 
                                     bg-white/5 hover:bg-white/10
                                     text-white/70 hover:text-white
                                     transition-all duration-300
                                     hover:scale-110"
                            aria-label={`${member.name} LinkedIn`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg 
                                     bg-white/5 hover:bg-white/10
                                     text-white/70 hover:text-white
                                     transition-all duration-300
                                     hover:scale-110"
                            aria-label={`${member.name} GitHub`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 rounded-lg 
                                     bg-white/5 hover:bg-white/10
                                     text-white/70 hover:text-white
                                     transition-all duration-300
                                     hover:scale-110"
                            aria-label={`Email ${member.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA - Minimal & Premium */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-12 md:pt-16"
            >
              <p className="text-lg md:text-xl text-body dark:text-white/70 mb-8 font-light">
                {homepage.team?.ctaText || 'Ready to work with us?'}
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2.5
                         px-8 py-4
                         bg-white text-black hover:bg-transparent hover:text-white
                         border-2 border-white
                         font-medium font-archivo text-base
                         rounded-sm
                         transition-all duration-300 ease-in-out
                         active:scale-[0.98]
                         cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
                <Mail className="h-4 w-4" />
              </motion.a>
            </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export const TeamSection = React.memo(TeamSectionComponent);
TeamSection.displayName = 'TeamSection';

export default TeamSection;

