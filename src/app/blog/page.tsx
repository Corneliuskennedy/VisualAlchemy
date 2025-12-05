'use client';

// Force dynamic rendering to avoid translation dependency issues
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { useQuery } from "@tanstack/react-query";
import { blogSupabase as supabase } from '@/lib/supabaseClients';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState, Suspense } from "react";
import { UnifiedSEO } from '@/components/SEO';
import { getBlogImageSrcSet, getBlogImageUrl } from '@/lib/image-utils';
import { formatDateSync, formatDate } from "@/utils/date";

const BlogPage = () => {
  const router = useRouter();
  const { t, language } = useTranslations();
  const [dateFormatter, setDateFormatter] = useState<boolean>(false);
  const isNL = language === 'nl';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Preload the date formatter
    formatDate(new Date(), "MMMM dd, yyyy").then(() => {
      setDateFormatter(true);
    });
  }, []);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["published-blogs-with-authors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles (
            display_name
          ),
          blog_tags (
            tags (
              name,
              slug
            )
          )
        `)
        .eq("published", true)
        .order('created_at', { ascending: false });

      if (error) {
        const errorDetails = {
          message: error.message || 'Unknown error',
          details: error.details || null,
          hint: error.hint || null,
          code: error.code || null,
        };
        console.error("Error fetching blogs:", errorDetails);
        return [];
      }

      return data;
    },
  });

  const optimizeImageUrl = (url: string, width: number = 800) => {
    if (!url) return "/fallback.jpg";
    
    // Handle Supabase storage URLs
    if (url.includes('storage.googleapis.com')) {
      // Extract the base URL and add size parameter
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?width=${width}&quality=80&format=webp`;
    }
    
    // Handle Unsplash URLs
    if (url.includes("unsplash.com")) {
      return `${url.split("?")[0]}?q=80&w=${width}&fit=crop`;
    }
    
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border border-border">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <UnifiedSEO 
        title={t('blogPage', 'metaTitle')} 
        description={t('blogPage', 'subtitle')}
      />

      <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
        <div className="min-h-screen pt-20">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push(language === 'nl' ? '/nl' : '/')}
              className="mb-8 hover:bg-secondary/20 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              {t('navigation', 'menu.back')}
            </Button>

            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 text-foreground">{t('blogPage', 'title')}</h1>
              <p className="text-xl text-muted-foreground">
                {t('blogPage', 'subtitle')}
              </p>
            </div>

            {/* Filter blogs to only show those with images */}
            {(() => {
              const blogsWithImages = blogs?.filter((blog) => blog.cover_image || blog.cover_image_path) || [];
              
              if (blogsWithImages.length === 0) {
                return (
                  <div className="text-center py-12">
                    <h2 className="text-xl text-muted-foreground">No blog posts with images found</h2>
                    <p className="text-muted-foreground/70 mt-2">Check back later for new content</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogsWithImages.map((blog) => (
                <Card 
                  key={blog.id} 
                  className="bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => router.push(language === 'nl' ? `/nl/blog/${blog.slug}` : `/blog/${blog.slug}`)}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <div className="w-full h-full" style={{ aspectRatio: '16/9' }}>
                      <picture>
                        <source
                          type="image/webp"
                          {...getBlogImageSrcSet(blog.cover_image_path)}
                        />
                        <img
                          src={getBlogImageUrl(blog.cover_image_path)}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={450}
                          style={{
                            aspectRatio: '16/9',
                            objectFit: 'cover'
                          }}
                        />
                      </picture>
                    </div>
                  </div>
                  
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={blog.created_at}>
                          {formatDateSync(new Date(blog.created_at), "MMMM dd, yyyy")}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blog.profiles?.display_name || blog.author || t('blogPage', 'author')}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                    <div className="pt-4">
                      <span className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2">
                        {t('blogPage', 'readMore')}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
                </div>
              );
            })()}
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default BlogPage;
