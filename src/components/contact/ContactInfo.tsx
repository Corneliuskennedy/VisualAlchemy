import { Mail, MapPin, Phone, Clock, Briefcase } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';

export const ContactInfo = () => {
  const { t } = useTranslations();
  
  return (
    <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {t('contactPage', 'info.title')}
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Mail className="h-4 w-4 mt-1 text-gray-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-200">{t('contactPage', 'info.email')}</p>
            <a
              href="mailto:kennet@octomatic.ai"
              className="text-sm text-gray-100 hover:text-electric-blue transition-colors"
            >
              kennet@octomatic.ai
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="h-4 w-4 mt-1 text-gray-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-200">{t('contactPage', 'info.phone')}</p>
            <a
              href={`tel:${t('contactPage', 'info.phoneNumber').replace(/\s/g, '')}`}
              className="text-sm text-gray-100 hover:text-electric-blue transition-colors"
            >
              {t('contactPage', 'info.phoneNumber')}
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin className="h-4 w-4 mt-1 text-gray-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-200">{t('contactPage', 'info.address')}</p>
            <p className="text-sm text-gray-200">{t('contactPage', 'info.addressValue')}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Briefcase className="h-4 w-4 mt-1 text-gray-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-200">{t('contactPage', 'info.kvk')}</p>
            <p className="text-sm text-gray-200">{t('contactPage', 'info.kvkNumber')}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Clock className="h-4 w-4 mt-1 text-gray-300" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-200">{t('contactPage', 'info.hours')}</p>
            <p className="text-sm text-gray-200">{t('contactPage', 'info.hoursValue')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 