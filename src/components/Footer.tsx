'use client';

import React from 'react';
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import useLanguage from "@/contexts/LanguageContext";
import { Logo } from "./ui/logo";

const Footer = () => {
  const { t, getSection } = useTranslations();
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isNL = language === 'nl';

  // Get sections for better performance
  const footerSection = getSection('footer');
  const contactPageSection = getSection('contactPage');

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSolutions = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const links = {
    company: [
      { label: footerSection.company.about, href: '/about' },
      { label: footerSection.company.careers, href: '/careers' },
      { label: footerSection.company.contact, href: '/contact' }
    ],
    legal: [
      { label: footerSection.legal.privacy, href: '/privacy' },
      { label: footerSection.legal.terms, href: '/terms' },
      { label: footerSection.legal.cookies, href: '/cookies' }
    ],
    social: [
      { label: footerSection.social.linkedin, href: 'https://linkedin.com/in/kennet-timmers' },
      { label: footerSection.social.twitter, href: 'https://twitter.com/octomaticai' },
      { label: footerSection.social.instagram, href: 'https://instagram.com/octomaticai' }
    ]
  };

  return (
    <footer className="relative" style={{ borderTop: '1px solid #4a5568' }}>

      <div className="container relative mx-auto px-4 py-16 z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="footer" />
            <p className="text-gray-400 text-sm leading-relaxed">
              {footerSection.description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:kennet@octomatic.ai?subject=Business Optimization Inquiry"
                  className="text-sm hover:text-electric-blue transition-colors mobile-contact-link"
                >
                  kennet@octomatic.ai
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${contactPageSection.info.phoneNumber.replace(/\s/g, '')}`}
                  className="text-sm hover:text-electric-blue transition-colors mobile-contact-link"
                >
                  {contactPageSection.info.phoneNumber}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm">{contactPageSection.info.addressValue}</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <span className="text-sm">{contactPageSection.info.kvk}: {contactPageSection.info.kvkNumber}</span>
              </div>
            </div>
          </div>

          {/* Services section removed to maintain strategy-first focus */}

          {/* Company */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-semibold text-white/90 text-lg">{footerSection.company.title}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={scrollToSolutions}
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {footerSection.company.about}
                </button>
              </li>
              <li>
                <span className="text-gray-500 text-sm cursor-not-allowed">
                  {footerSection.company.careers}
                </span>
              </li>
              <li>
                <Link
                  href={(isNL ? '/nl/services' : '/services').replace(/\/$/, "")}
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {isNL ? 'Strategische Oplossingen' : 'Strategic Solutions'}
                </Link>
              </li>
              <li>
                <Link
                  href={(isNL ? '/nl/blog' : '/blog').replace(/\/$/, "")}
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {footerSection.company.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={(isNL ? '/nl/contact' : '/contact').replace(/\/$/, "")}
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {footerSection.company.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={(isNL ? '/nl/checklist' : '/checklist').replace(/\/$/, "")}
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {isNL ? 'GDPR Checklist' : 'GDPR Checklist'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-semibold text-white/90 text-lg">{footerSection.legal.title}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={(isNL ? '/nl/privacy' : '/privacy').replace(/\/$/, "")}
                  // onClick={handleLinkClick} // Temporarily remove onClick for testing
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {footerSection.legal.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={(isNL ? '/nl/terms' : '/terms').replace(/\/$/, "")}
                  // onClick={handleLinkClick} // Temporarily remove onClick for testing
                  className="text-gray-400 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  {footerSection.legal.terms}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 text-sm cursor-not-allowed">
                  {footerSection.legal.cookies}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #4a5568' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© {currentYear} Octomatic. {footerSection.copyright}</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <h5 className="text-white/90 text-sm font-medium">{footerSection.social.title}</h5>
              <div className="flex items-center space-x-4">
                {links.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-electric-blue transition-colors duration-200 text-sm"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;