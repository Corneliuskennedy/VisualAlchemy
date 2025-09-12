import { cn } from "@/lib/utils";

interface BlogCoverImageProps {
  src: string;
  alt: string;
  className?: string;
  srcSet?: {
    srcSet: string;
    sizes: string;
  };
}

export const BlogCoverImage = ({ src, alt, className, srcSet }: BlogCoverImageProps) => {
  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden rounded-2xl", className)}>
      <picture>
        {srcSet && (
          <source
            type="image/webp"
            srcSet={srcSet.srcSet}
            sizes={srcSet.sizes}
          />
        )}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          style={{
            aspectRatio: '16/9',
            objectFit: 'cover'
          }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/fallback.jpg';
          }}
        />
      </picture>
    </div>
  );
};
