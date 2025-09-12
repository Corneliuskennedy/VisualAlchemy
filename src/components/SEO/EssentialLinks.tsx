import React from 'react';
import Link from 'next/link';
import useLanguage from '@/contexts/LanguageContext';

export function EssentialLinks() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  return (
    <nav className="sr-only" aria-label="Essential navigation links for SEO">
      <Link href={isNL ? '/nl' : '/'}>
        {isNL ? 'Home' : 'Home'}
      </Link>
      <Link href={isNL ? '/nl/services' : '/services'}>
        {isNL ? 'Diensten' : 'Services'}
      </Link>
      <Link href={isNL ? '/nl/contact' : '/contact'}>
        {isNL ? 'Contact' : 'Contact'}
      </Link>
      <Link href={isNL ? '/nl/blog' : '/blog'}>
        {isNL ? 'Blog' : 'Blog'}
      </Link>
      <Link href={isNL ? '/nl/privacy' : '/privacy'}>
        {isNL ? 'Privacy' : 'Privacy'}
      </Link>
    </nav>
  );
} 