import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import useLanguage from '@/contexts/LanguageContext';

interface MobileCTAProps {
  showOnMobile?: boolean;
  primaryAction?: 'call' | 'book';
  phoneNumber?: string;
  bookingUrl?: string;
}

export const MobileCTA: React.FC<MobileCTAProps> = ({
  showOnMobile = true,
  primaryAction = 'book',
  phoneNumber = '+31646402090',
  bookingUrl = '/contact'
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleBooking = () => {
    window.location.href = bookingUrl;
  };

  if (!showOnMobile || !isVisible) return null;

  // Use the correct translation structure with fallbacks
  const bookConsultation = t('cta', 'bookConsultation') || 'Book free consultation';
  const callNow = t('cta', 'call') || 'Call now';

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9999] md:hidden transition-all duration-500 ease-out ${
        isMinimized ? 'translate-y-0' : 'translate-y-0'
      }`}
      role="region"
      aria-label="Mobile call to action"
      data-cta="mobile"
      style={{ zIndex: 9999 }}
    >
      {/* Minimized state - Ultra clean pill */}
      {isMinimized && (
        <div className="mx-4 mb-4">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full bg-gradient-to-r from-[#4585f4] to-[#324c9e] text-white py-3 px-6 rounded-full flex items-center justify-between shadow-2xl hover:shadow-[#4585f4]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Expand call to action"
          >
            <span className="font-medium text-sm">{bookConsultation}</span>
            <ChevronUp className="h-4 w-4 opacity-70" />
          </button>
        </div>
      )}

      {/* Full CTA - Perfectly balanced design */}
      {!isMinimized && (
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-4">
            {/* Action buttons - Hero layout */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleBooking}
                className="flex-1 bg-gradient-to-r from-[#4585f4] to-[#324c9e] hover:from-[#4585f4]/90 hover:to-[#324c9e]/90 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4585f4]/25 hover:scale-[1.02] active:scale-[0.98] group"
                aria-label="Book free consultation"
                data-cta="mobile-book"
              >
                <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-base font-semibold">{bookConsultation}</span>
              </button>

              <button
                onClick={handleCall}
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] group backdrop-blur-sm"
                aria-label="Call us now"
                data-cta="mobile-call"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{callNow}</span>
              </button>
            </div>

            {/* Minimize control - Subtle and elegant */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/40 hover:text-white/70 transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label="Minimize call to action"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCTA; 