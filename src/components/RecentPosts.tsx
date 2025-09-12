import { useQuery } from "@tanstack/react-query";
import { blogSupabase as supabase } from '@/lib/supabaseClients';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDateSync } from "@/utils/date";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export const RecentPosts = () => {
  const router = useRouter();

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
        console.error("Error fetching blogs:", error);
        return [];
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-secondary/20 backdrop-blur-sm">
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
    );
  }

  // Filter blogs to only show those with images
  const blogsWithImages = blogs?.filter((blog) => blog.cover_image || blog.cover_image_path) || [];

  if (!blogs || blogs.length === 0 || blogsWithImages.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-400">No blog posts found</h2>
        <p className="text-gray-500 mt-2">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogsWithImages.map((blog) => (
        <Card 
          key={blog.id} 
          className="bg-black/40 backdrop-blur-xl border border-gray-800/50 hover:border-[#324c9e]/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer group overflow-hidden"
          onClick={() => router.push(`/blog/${blog.slug}`)}
        >
          <div className="relative h-52 overflow-hidden">
            {blog.cover_image ? (
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#324c9e]/20 to-[#324c9e]/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>
          
          <CardHeader className="relative space-y-2">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={blog.created_at} className="text-gray-400 text-sm">
                  {formatDateSync(new Date(blog.created_at), "MMMM dd, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blog.profiles?.display_name || blog.author || 'Author'}</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white leading-tight group-hover:text-[#324c9e] transition-colors line-clamp-2">
              {blog.title}
            </h2>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-400 line-clamp-3 mb-4">{blog.excerpt}</p>
            <div className="text-[#324c9e] group-hover:text-[#324c9e]/80 transition-colors text-sm font-medium flex items-center gap-1">
              Read More 
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
