import React from 'react';
import Link from 'next/link';
import { Author } from '../types/author';
import { ExternalLink } from 'lucide-react';

interface AuthorBioProps {
  author: Author;
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'default' | 'compact';
}

export const AuthorBio: React.FC<AuthorBioProps> = ({ 
  author, 
  className = '',
  variant = 'light',
  size = 'default'
}) => {
  const authorPageUrl = `/author/${author.slug}`;
  const isCompact = size === 'compact';

  // Theme-based styles
  const isDark = variant === 'dark';
  const styles = {
    container: isDark 
      ? 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10' 
      : 'bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300',
    name: isDark ? 'text-white' : 'text-gray-900',
    title: isDark ? 'text-blue-400' : 'text-blue-600',
    bio: isDark ? 'text-gray-300' : 'text-gray-600',
    linkedinButton: isDark
      ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-500/30'
      : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
  };

  const imageSize = isCompact ? 48 : 56;
  const padding = isCompact ? 'p-3' : 'p-4';

  // Enhanced Person Schema for Google 2025 Authority
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title,
    "description": author.bio,
    "image": `https://www.octomatic.ai${author.imagePath}`,
    "url": `https://www.octomatic.ai${authorPageUrl}`,
    "worksFor": {
      "@type": "Organization",
      "name": "Octomatic",
      "url": "https://www.octomatic.ai",
      "sameAs": ["https://www.linkedin.com/company/octomatic-ai/"]
    },
    "expertise": author.expertise || [],
    "knowsAbout": [
      "AI Automation Amsterdam",
      "GDPR-Compliant Workflow Design",
      "Dutch SME Process Optimization",
      "Business Process Automation Netherlands"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Experience", 
      "description": `${author.experienceYears}+ years automation experience with 50+ Dutch implementations`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": author.location || "Naarden",
      "addressCountry": "Netherlands"
    },
    "sameAs": Object.values(author.socialProfiles || {}).filter(Boolean)
  };

  return (
    <div 
      className={`author-bio ${styles.container} ${padding} ${className} transition-all duration-200`}
      itemScope 
      itemType="https://schema.org/Person"
    >
      {/* Simple JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />

      <div className="flex items-start gap-3">
        {/* Author Image */}
        <Link href={authorPageUrl} className="flex-shrink-0" itemProp="image">
          <img
            src={author.imagePath}
            alt={`${author.name} - ${author.title}`}
            width={imageSize}
            height={imageSize}
            className={`${isCompact ? 'w-12 h-12' : 'w-14 h-14'} rounded-full object-cover ring-2 ring-gray-200 hover:ring-blue-400 transition-all`}
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="${imageSize}" height="${imageSize}" viewBox="0 0 ${imageSize} ${imageSize}" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="${imageSize/2}" cy="${imageSize/2}" r="${imageSize/2}" fill="${isDark ? '#374151' : '#F3F4F6'}"/>
                  <circle cx="${imageSize/2}" cy="${imageSize/2.5}" r="${imageSize/6}" fill="${isDark ? '#9CA3AF' : '#6B7280'}"/>
                  <path d="M${imageSize/4} ${imageSize*0.75}C${imageSize/4} ${imageSize*0.65} ${imageSize/3} ${imageSize*0.6} ${imageSize/2} ${imageSize*0.6}C${imageSize*2/3} ${imageSize*0.6} ${imageSize*3/4} ${imageSize*0.65} ${imageSize*3/4} ${imageSize*0.75}" 
                        fill="${isDark ? '#9CA3AF' : '#6B7280'}"/>
                </svg>
              `)}`;
            }}
          />
        </Link>

        {/* Author Information */}
        <div className="flex-1 min-w-0">
          {/* Name and Title */}
          <h3 className={`author-name ${isCompact ? 'text-base' : 'text-lg'} font-semibold ${styles.name} mb-1`}>
            <Link 
              href={authorPageUrl}
              className="hover:underline"
              itemProp="name"
            >
              {author.name}
            </Link>
          </h3>
          <p className={`${isCompact ? 'text-sm' : 'text-base'} ${styles.title} mb-2`} itemProp="jobTitle">
            {author.title}
          </p>
          
          {/* Simple Bio */}
          <p className={`author-bio ${styles.bio} ${isCompact ? 'text-sm' : 'text-base'} leading-relaxed mb-3`} itemProp="description">
            {author.bio}
          </p>

          {/* LinkedIn Link */}
          {author.socialProfiles?.linkedin && (
            <a
              href={author.socialProfiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium border transition-colors ${styles.linkedinButton}`}
              aria-label={`Connect with ${author.name} on LinkedIn`}
              itemProp="sameAs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}; 