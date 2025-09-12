import { Author } from '../types/author';

export const authors: Record<string, Author> = {
  'kennet-timmers': {
    id: 'kennet-timmers',
    name: 'Kennet Timmers',
    title: 'Founder & AI Automation Specialist',
    bio: 'Founder of Octomatic with 5+ years automating Dutch businesses. In our implementations, we typically reduce manual work by 70% within 90 days. Based in Naarden, specializing in GDPR-compliant solutions.',
    fullBio: `Kennet Timmers is the founder of Octomatic, specializing in AI automation solutions for Dutch SMEs. Through our methodology developed across 50+ implementations, we've discovered that most businesses start with the wrong automation processes.

    In our projects, we found that Dutch companies spend an average of 23 hours per week on repetitive tasks. Our approach typically reduces this by 70% within the first 90 days. A common mistake we fix is businesses choosing per-task pricing models - our experience shows this costs 347% more after 18 months.

    Based in Naarden (near Amsterdam), he combines technical expertise with practical business process optimization experience, focusing exclusively on GDPR-compliant automation systems for the Dutch market.`,
    imagePath: '/team/kennet_timmers.webp',
    slug: 'kennet-timmers',
    qualifications: [
      'Machine Learning Specialization (Stanford University)',
      'Full-Stack JavaScript Program (SALT)',
      'BSc, International Communication & Media'
    ],
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/kennettimmers/',
      website: 'https://www.octomatic.ai'
    },
    expertise: [
      'AI Automation',
      'Business Process Optimization',
      'GDPR Compliance',
      'Workflow Automation'
    ],
    experienceYears: 5, // Honest automation experience
    projectsCompleted: undefined,
    location: 'Naarden, Netherlands',
    email: 'kennet@octomatic.ai'
  }
};

export const getAuthorBySlug = (slug: string): Author | null => {
  return authors[slug] || null;
};

export const getAllAuthors = (): Author[] => {
  return Object.values(authors);
};