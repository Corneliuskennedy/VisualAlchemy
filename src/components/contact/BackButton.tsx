import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from '@/hooks/useTranslations';

export const BackButton = () => {
  const { t, language } = useTranslations();
  
  return (
    <Link href={language === 'nl' ? '/nl' : '/'}>
      <Button 
        variant="ghost" 
        className="mb-8 text-gray-300 hover:text-white hover:bg-secondary/20 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        {t('navigation', 'menu.back')}
      </Button>
    </Link>
  );
};
