import React from 'react';
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { blogSupabase as supabase } from '@/lib/supabaseClients';
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import useLanguage from "@/contexts/LanguageContext";
import { getBlogImageSrcSet, getBlogImageUrl } from '@/lib/image-utils';

const BlogInsights = () => {
  const { language, t } = useLanguage();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

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

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <section id="blog" className="py-16 relative overflow-hidden">
        <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#4585f4]">Expert</span> insights & guides
            </h2>
            <Link 
              href={language === "nl" ? "/nl/blog" : "/blog"}
              onClick={handleLinkClick}
              className="text-white/80 hover:text-white font-medium inline-flex items-center group transition-colors duration-300"
            >
              View all posts
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main feature post - 8 columns wide */}
            <div className="md:col-span-8 h-[540px]">
              <div className="w-full h-full relative rounded-3xl overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
              </div>
            </div>
            
            {/* Secondary posts - 4 columns wide */}
            <div className="md:col-span-4 flex flex-col space-y-6 h-[540px]">
              <div className="flex-1 relative rounded-3xl overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
              </div>
              <div className="flex-1 relative rounded-3xl overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Filter blogs to only include those with images, then take first 3
  const featuredBlogs = blogs.filter((blog) => blog.cover_image || blog.cover_image_path).slice(0, 3);

  // If no blogs with images, don't render the section
  if (featuredBlogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-16 relative overflow-hidden">
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-[#4585f4]">Expert</span> insights & guides
          </h2>
          <Link 
            href={language === "nl" ? "/nl/blog" : "/blog"}
            onClick={handleLinkClick}
            className="text-white/80 hover:text-white font-medium inline-flex items-center group transition-colors duration-300"
          >
            View all posts
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main feature post - 8 columns */}
          {featuredBlogs.length > 0 && (
            <Link 
              href={language === "nl" ? `/nl/blog/${featuredBlogs[0].slug}` : `/blog/${featuredBlogs[0].slug}`}
              onClick={handleLinkClick}
              className="md:col-span-8 block relative rounded-3xl overflow-hidden h-[540px] hover:opacity-95 transition-all duration-300 group"
            >
              <div className="absolute inset-0 w-full h-full">
                <picture className="w-full h-full">
                  <source
                    type="image/webp"
                    {...getBlogImageSrcSet(featuredBlogs[0].cover_image_path)}
                  />
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={getBlogImageUrl(featuredBlogs[0].cover_image_path)}
                    alt={featuredBlogs[0].title}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={900}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/fallback.jpg';
                    }}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <h3 className="mb-4 text-xl text-white font-medium line-clamp-2">{featuredBlogs[0].title}</h3>
                  <p className="text-gray-300 line-clamp-2">{featuredBlogs[0].excerpt}</p>
                </div>
              </div>
            </Link>
          )}
          
          {/* Secondary posts column - 4 columns */}
          <div className="md:col-span-4 flex flex-col space-y-6 h-[540px]">
            {featuredBlogs.length > 1 && (
              <Link 
                href={language === "nl" ? `/nl/blog/${featuredBlogs[1].slug}` : `/blog/${featuredBlogs[1].slug}`}
                onClick={handleLinkClick}
                className="flex-1 block relative rounded-3xl overflow-hidden hover:opacity-95 transition-all duration-300 group"
              >
                <div className="absolute inset-0 w-full h-full">
                  <picture className="w-full h-full">
                    <source
                      type="image/webp"
                      {...getBlogImageSrcSet(featuredBlogs[1].cover_image_path)}
                    />
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={getBlogImageUrl(featuredBlogs[1].cover_image_path)}
                      alt={featuredBlogs[1].title}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={450}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/fallback.jpg';
                      }}
                    />
                  </picture>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="mb-2 text-base text-white font-medium line-clamp-2">{featuredBlogs[1].title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-1">{featuredBlogs[1].excerpt}</p>
                  </div>
                </div>
              </Link>
            )}
            
            {featuredBlogs.length > 2 && (
              <Link 
                href={language === "nl" ? `/nl/blog/${featuredBlogs[2].slug}` : `/blog/${featuredBlogs[2].slug}`}
                onClick={handleLinkClick}
                className="flex-1 block relative rounded-3xl overflow-hidden hover:opacity-95 transition-all duration-300 group"
              >
                <div className="absolute inset-0 w-full h-full">
                  <picture className="w-full h-full">
                    <source
                      type="image/webp"
                      {...getBlogImageSrcSet(featuredBlogs[2].cover_image_path)}
                    />
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={getBlogImageUrl(featuredBlogs[2].cover_image_path)}
                      alt={featuredBlogs[2].title}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={450}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/fallback.jpg';
                      }}
                    />
                  </picture>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="mb-2 text-base text-white font-medium line-clamp-2">{featuredBlogs[2].title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-1">{featuredBlogs[2].excerpt}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogInsights;
