import { Calendar, User, Tag } from "lucide-react";
import { formatDateSync } from "@/utils/date";
import { Badge } from "@/components/ui/badge";
import useLanguage from "@/contexts/LanguageContext";

interface BlogHeaderProps {
  title: string;
  created_at: string;
  author?: string;
  tags?: Array<{ tags: { name: string; slug: string } }>;
}

export const BlogHeader = ({ title, created_at, author, tags }: BlogHeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        {title}
      </h1>
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={created_at} className="text-muted-foreground">
              {formatDateSync(new Date(created_at), "MMMM dd, yyyy")}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{author || t('blogPage', 'author')}</span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {tags.map(tag => (
              <Badge 
                key={tag.tags.slug}
                variant="secondary" 
                className="bg-secondary/50 hover:bg-secondary/70"
              >
                {tag.tags.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
