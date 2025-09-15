import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type AudienceType = 'startup' | 'sme' | null;

interface AudienceSegmentationHook {
  audience: AudienceType;
  setAudience: (audience: AudienceType) => void;
  isFirstVisit: boolean;
  switchAudience: (newAudience: AudienceType) => void;
}

export function useAudienceSegmentation(): AudienceSegmentationHook {
  const [audience, setAudienceState] = useState<AudienceType>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL parameter first
    const pathParam = searchParams.get('path') as AudienceType;
    
    // Check localStorage for returning visitors
    const storedPreference = typeof window !== 'undefined' 
      ? localStorage.getItem('audiencePreference') as AudienceType
      : null;

    if (pathParam && (pathParam === 'startup' || pathParam === 'sme')) {
      setAudienceState(pathParam);
      setIsFirstVisit(false);
      // Store the preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('audiencePreference', pathParam);
      }
    } else if (storedPreference) {
      setAudienceState(storedPreference);
      setIsFirstVisit(false);
    } else {
      // First time visitor - show audience selector
      setIsFirstVisit(true);
    }
  }, [searchParams]);

  const setAudience = (newAudience: AudienceType) => {
    setAudienceState(newAudience);
    setIsFirstVisit(false);
    
    if (typeof window !== 'undefined' && newAudience) {
      localStorage.setItem('audiencePreference', newAudience);
      
      // Track analytics event
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'audience_selected', {
          audience_type: newAudience,
          page_title: document.title,
        });
      }
    }

    // Update URL without page reload
    if (newAudience) {
      const newUrl = `/?path=${newAudience}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const switchAudience = (newAudience: AudienceType) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'path_switched', {
        from_audience: audience,
        to_audience: newAudience,
      });
    }
    setAudience(newAudience);
  };

  return {
    audience,
    setAudience,
    isFirstVisit,
    switchAudience,
  };
}

// Analytics helper functions
export const trackSectionView = (sectionName: string, audience: AudienceType) => {
  if (typeof window.gtag !== 'undefined' && audience) {
    window.gtag('event', 'section_viewed', {
      section_name: sectionName,
      audience_type: audience,
    });
  }
};

export const trackCTAClick = (ctaName: string, audience: AudienceType) => {
  if (typeof window.gtag !== 'undefined' && audience) {
    window.gtag('event', 'cta_clicked', {
      cta_name: ctaName,
      audience_type: audience,
    });
  }
};

export const trackBookingInitiated = (audience: AudienceType) => {
  if (typeof window.gtag !== 'undefined' && audience) {
    window.gtag('event', 'booking_initiated', {
      audience_type: audience,
    });
  }
};
