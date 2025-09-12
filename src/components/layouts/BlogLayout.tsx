import { RecentPosts } from "@/components/RecentPosts";

export const BlogLayout = () => {
  return (
    <div className="min-h-screen relative">
      <main className="relative pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 animate-fade-in relative z-[60]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Latest Posts
            </h2>
            <p className="text-xl text-[#CCCCCC] max-w-3xl mx-auto leading-relaxed">
              Insights on automation, operations, and technology
            </p>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="backdrop-blur-xl rounded-3xl border border-gray-800/50 bg-black/30 p-8 md:p-12 transition-all duration-300 hover:border-[#6B8AE6]/50 hover:shadow-2xl hover:shadow-[#6B8AE6]/10">
              <RecentPosts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogLayout;
