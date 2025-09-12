
import { Skeleton } from "@/components/ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mt-24 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full mb-8 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );
};
