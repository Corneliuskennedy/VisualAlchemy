export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  fullBio?: string; // Extended biography for author pages
  imagePath: string;
  slug: string;
  qualifications?: string[];
  socialProfiles?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  expertise?: string[];
  experienceYears?: number;
  projectsCompleted?: number;
  location?: string;
  email?: string;
}

export interface AuthorPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  readingTime: number;
}

export interface AuthorPageData extends Author {
  posts: AuthorPost[];
  totalPosts: number;
} 