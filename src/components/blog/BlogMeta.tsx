import { Helmet } from 'react-helmet-async';
import { getBlogImageUrl } from '@/lib/image-utils';

interface BlogMetaProps {
  post: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    excerpt?: string;
    cover_image?: string;
    cover_image_path?: string;
    created_at: string;
    updated_at?: string;
    blog_tags?: Array<{ tags: { name: string; slug: string } }>;
    slug: string;
  };
}

export const BlogMeta = ({ post }: BlogMetaProps) => {
  // Data processing logic can remain if needed by other parts of the blog page
  const publishDate = new Date(post.created_at).toISOString();
  const metaImage = post.cover_image_path ? getBlogImageUrl(post.cover_image_path) : post.cover_image;
  const logoImage = {
    small: '/logo/octomatic-200.png',
    medium: '/logo/octomatic-400.png',
    large: '/logo/octomatic-800.png',
    xlarge: '/logo/octomatic-1200.png',
  };
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": metaImage,
    "datePublished": publishDate,
    "dateModified": post.updated_at || publishDate,
    "author": {
      "@type": "Organization",
      "name": "Octomatic",
      "logo": {
        "@type": "ImageObject",
        "url": logoImage.large,
        "width": 800,
        "height": 156
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Octomatic",
      "logo": {
        "@type": "ImageObject",
        "url": logoImage.large,
        "width": 800,
        "height": 156
      }
    },
    "keywords": post.blog_tags?.map(tag => tag.tags.name).join(", ")
  };

  const title = post.meta_title || post.title ? `${post.meta_title || post.title} | Octomatic` : 'Octomatic';
  const description = post.meta_description || post.excerpt || 'Octomatic - Empowering Your Digital Journey';
  const url = `https://octomatic.ai/blog/${post.slug}`;

  // You could potentially return structured data or props needed by the parent page
  // For example:
  // return { title, description, url, metaImage, schemaData };
  
  // Returning null as it no longer renders UI or head tags directly
  return null;
};
