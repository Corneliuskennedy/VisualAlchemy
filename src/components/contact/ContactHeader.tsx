import { useTranslations } from '@/hooks/useTranslations';

export const ContactHeader = () => {
  const { language } = useTranslations();
  const isNL = language === 'nl';
  
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        {isNL ? 'Laten we een gesprek beginnen.' : "Let's start a conversation."}
      </h1>
      <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
        {isNL 
          ? 'Of je nu een duidelijk project voor ogen hebt of gewoon de mogelijkheden wilt verkennen, we zijn hier om te helpen. Vul het onderstaande formulier in, en we nemen binnen één werkdag contact met je op.'
          : 'Whether you have a clear project in mind or just want to explore the possibilities, we\'re here to help. Fill out the form below, and we\'ll get back to you within one business day.'}
      </p>
    </div>
  );
};
