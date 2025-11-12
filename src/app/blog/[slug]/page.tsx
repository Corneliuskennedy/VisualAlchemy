'use client';

import { useParams, notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { blogSupabase as supabase } from '@/lib/supabaseClients';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from '@/hooks/useTranslations';
import { BlogSkeleton } from "@/components/blog/BlogSkeleton";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { getBlogImageSrcSet, getBlogImageUrl } from '@/lib/image-utils';
import { UnifiedSEO } from '@/components/SEO';
import { AuthorBio } from '@/components/AuthorBio';
import { SGESummary } from '@/components/SGESummary';
import { getAuthorBySlug } from '@/data/authors';
import { Suspense } from 'react';

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { t, language } = useTranslations();
  const isNL = language === 'nl';

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Blog post slug is required');
      }
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles ( display_name ),
          blog_tags ( tags ( name, slug ) )
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (blogError) {
        console.error("Error fetching blog post:", blogError);
        throw blogError;
      }
      
      if (!blogData) {
        console.warn(`Blog post not found for slug: ${slug}`);
        return null;
      }

      return blogData;
    },
    enabled: !!slug,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  // Handle error or not found
  if (isError || !post) {
    notFound();
  }

  // Get author data if available
  const authorData = post.author_slug ? getAuthorBySlug(post.author_slug) : null;

  return (
    <>
      <UnifiedSEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        canonicalUrl={`https://www.octomatic.ai/blog/${post.slug}`}
        ogImage={getBlogImageUrl(post.cover_image_path)}
        pageType="article"
        keywords={post.meta_keywords || ''}
        publishedTime={post.created_at}
        modifiedTime={post.updated_at}
        author={post.profiles?.display_name || post.author || 'Octomatic'}
      />

      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        <article className="min-h-screen pt-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => router.push(isNL ? '/nl/blog' : '/blog')}
              className="mb-8 hover:bg-secondary/20 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              {t('navigation', 'menu.back')}
            </Button>

            {/* Blog Header */}
            <BlogHeader 
              title={post.title}
              created_at={post.created_at}
              author={post.profiles?.display_name || post.author}
              tags={post.blog_tags}
            />

            {/* Cover Image */}
            {(post.cover_image || post.cover_image_path) && (
              <div className="mb-12">
                <BlogCoverImage 
                  src={getBlogImageUrl(post.cover_image_path || post.cover_image)}
                  alt={post.title}
                  srcSet={getBlogImageSrcSet(post.cover_image_path)}
                />
              </div>
            )}

            {/* SGE Summary */}
            {post.sge_summary && (
              <div className="mb-12">
                <SGESummary summary={post.sge_summary} />
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-12 dark:prose-invert">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content"
              />
            </div>

            {/* Author Bio */}
            {authorData && (
              <div className="mb-12">
                <AuthorBio author={authorData} />
              </div>
            )}

            {/* Tags */}
            {post.blog_tags && post.blog_tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.blog_tags.map((blogTag: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                    >
                      {blogTag.tags?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="border-t border-border pt-8">
              <Button 
                variant="outline" 
                onClick={() => router.push(isNL ? '/nl/blog' : '/blog')}
                className="hover:bg-secondary/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('blogPage', 'backToBlog')}
              </Button>
            </div>
          </div>
        </article>
      </Suspense>
    </>
  );
};

export default BlogPostPage;
