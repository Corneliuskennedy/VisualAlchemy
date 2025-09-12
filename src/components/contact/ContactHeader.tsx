import { useTranslations } from '@/hooks/useTranslations';

export const ContactHeader = () => {
  const { t } = useTranslations();
  
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-[#324c9e] to-[#6E59A5] bg-clip-text text-transparent">
        {t('contactPage', 'title')}
      </h1>
      <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
        {t('contactPage', 'subtitle')}
      </p>
    </div>
  );
};
