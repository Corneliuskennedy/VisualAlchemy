/**
 * Team Section Component
 * Premium team showcase with image support
 * Ready for professional photos
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useHomepage } from '@/hooks/useContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { generatePersonSchema } from '@/lib/seo/EntityFirstSEO';
import { authors } from '@/data/authors';

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

export const TeamSection: React.FC<TeamSectionProps> = ({ className = '' }) => {
  const homepage = useHomepage();
  const { containerVariants, itemVariants, fadeInUp } = useOptimizedAnimations();

  // Team data - Replace with actual team members
  // Images should be placed in /public/team/ directory
  const teamMembers: TeamMember[] = [
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
  ];

  // Generate Person schemas for Entity-First SEO (E-E-A-T signals)
  const personSchemas = teamMembers
    .map(member => {
      const author = authors['kennet-timmers']; // Match by name or create mapping
      if (author && member.name === author.name) {
        return generatePersonSchema(author);
      }
      return null;
    })
    .filter(Boolean) as any[];

  return (
    <>
      {/* Person schemas for Entity-First SEO (E-E-A-T) */}
      {personSchemas.length > 0 && (
        <Helmet>
          {personSchemas.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
        </Helmet>
      )}

      <section 
      id="team"
      aria-labelledby="team-heading"
      className={`py-32 px-4 relative z-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.h2
              id="team-heading"
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold 
                       text-[#0F172A] dark:text-white
                       tracking-tight"
            >
              {homepage.team?.headline || 'Meet the Team'}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed 
                       text-[#1E293B] dark:text-gray-300"
            >
              {homepage.team?.description || 'The experts behind every beautiful website we build.'}
            </motion.p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative p-8 lg:p-10 
                         rounded-2xl 
                         border-2 
                         transition-all duration-500 ease-out
                         bg-gradient-to-br from-card via-card to-card/95
                         dark:from-card dark:via-card dark:to-card/95
                         border-border/50 dark:border-border/50
                         hover:border-[#4585f4]/50 dark:hover:border-[#4585f4]/50
                         backdrop-blur-sm 
                         shadow-xl hover:shadow-2xl 
                         hover:shadow-[#4585f4]/20 dark:hover:shadow-[#4585f4]/20
                         transform-gpu
                         text-center"
              >
                {/* Team Member Photo */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 
                              rounded-2xl overflow-hidden
                              ring-4 ring-[#4585f4]/20 dark:ring-[#4585f4]/30
                              group-hover:ring-[#4585f4]/40 dark:group-hover:ring-[#4585f4]/50
                              transition-all duration-500
                              shadow-xl">
                  {/* Placeholder for when image doesn't exist */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4585f4]/20 to-[#6B8AE6]/20 
                                flex items-center justify-center
                                text-[#4585f4] dark:text-[#6B8AE6]
                                font-bold text-4xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Actual image - will show when photo is added */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    onError={(e) => {
                      // Hide image if it doesn't exist, show placeholder
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2 
                             text-[#0F172A] dark:text-white
                             group-hover:text-[#4585f4] dark:group-hover:text-[#6B8AE6]
                             transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="text-lg font-semibold mb-4 
                              text-[#4585f4] dark:text-[#6B8AE6]">
                  {member.role}
                </div>

                {/* Bio */}
                <p className="text-base leading-relaxed mb-6 
                            text-[#1E293B] dark:text-gray-300">
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium
                               bg-[#4585f4]/10 dark:bg-[#4585f4]/20
                               text-[#4585f4] dark:text-[#6B8AE6]
                               border border-[#4585f4]/20 dark:border-[#4585f4]/30
                               transition-all duration-300
                               group-hover:bg-[#4585f4]/20 dark:group-hover:bg-[#4585f4]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg 
                               bg-background/50 dark:bg-background/50
                               hover:bg-[#4585f4]/10 dark:hover:bg-[#4585f4]/20
                               text-[#4585f4] dark:text-[#6B8AE6]
                               transition-all duration-300
                               hover:scale-110"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg 
                               bg-background/50 dark:bg-background/50
                               hover:bg-[#4585f4]/10 dark:hover:bg-[#4585f4]/20
                               text-[#4585f4] dark:text-[#6B8AE6]
                               transition-all duration-300
                               hover:scale-110"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg 
                               bg-background/50 dark:bg-background/50
                               hover:bg-[#4585f4]/10 dark:hover:bg-[#4585f4]/20
                               text-[#4585f4] dark:text-[#6B8AE6]
                               transition-all duration-300
                               hover:scale-110"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-lg text-[#475569] dark:text-gray-400 mb-6">
              {homepage.team?.ctaText || 'Ready to work with us?'}
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2
                       px-8 py-4
                       bg-gradient-to-r from-[#4585f4] via-[#5A8FF5] to-[#6B8AE6]
                       text-white font-semibold text-lg
                       rounded-xl
                       transition-all duration-500
                       shadow-xl shadow-[#4585f4]/25
                       hover:shadow-2xl hover:shadow-[#4585f4]/40
                       hover:scale-105
                       transform-gpu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
              <Mail className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default TeamSection;

