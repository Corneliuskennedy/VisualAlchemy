import useLanguage from '@/contexts/LanguageContext';
import { translations } from '@/translations';

export const TranslationDebug = () => {
  const { language } = useLanguage();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const missingTranslations: { section: string; key: string; subkey?: string }[] = [];

  // Check all translations
  Object.entries(translations.en).forEach(([section, sectionData]) => {
    Object.entries(sectionData as Record<string, any>).forEach(([key, keyData]) => {
      if (typeof keyData === 'object') {
        Object.keys(keyData).forEach((subkey) => {
          try {
            const translation = (translations as any)[language][section][key][subkey];
            if (!translation) {
              missingTranslations.push({ section, key, subkey });
            }
          } catch {
            missingTranslations.push({ section, key, subkey });
          }
        });
      } else {
        try {
          const translation = (translations as any)[language][section][key];
          if (!translation) {
            missingTranslations.push({ section, key });
          }
        } catch {
          missingTranslations.push({ section, key });
        }
      }
    });
  });

  if (missingTranslations.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-red-100 border border-red-300 rounded-lg shadow-lg">
      <h3 className="text-red-800 font-bold mb-2">Missing Translations ({language})</h3>
      <div className="max-h-60 overflow-auto">
        <ul className="text-sm text-red-700">
          {missingTranslations.map(({ section, key, subkey }, index) => (
            <li key={index}>
              {section}.{key}{subkey ? `.${subkey}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 