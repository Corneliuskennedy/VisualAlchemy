'use client';

import React from 'react';
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import useLanguage from "@/contexts/LanguageContext";
import { Logo } from "./ui/logo";
import { useFooter } from "@/hooks/useContent";

const Footer = () => {
  const { language } = useLanguage();
  const footer = useFooter();
  const currentYear = new Date().getFullYear();
  const isNL = language === 'nl';

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
      { label: footer.company.about, href: '/about-us' },
      { label: footer.company.ourWork, href: '/our-work' },
      { label: footer.company.contact, href: '/contact' },
      { label: footer.company.blog, href: '/blog' }
    ],
    services: [
      { label: footer.services.optimize, href: '/optimize' },
      { label: footer.services.build, href: '/build' },
      { label: footer.services.create, href: '/create' }
    ],
    legal: [
      { label: footer.legal.privacy, href: '/privacy-policy' },
      { label: footer.legal.terms, href: '/terms-of-service' },
      { label: footer.legal.cookies, href: '/cookies' }
    ],
    social: [
      { label: footer.social.linkedin, href: 'https://linkedin.com/in/kennet-timmers' },
      { label: footer.social.twitter, href: 'https://twitter.com/octomaticai' },
      { label: footer.social.instagram, href: 'https://instagram.com/octomaticai' }
    ]
  };

  return (
    <footer className="relative border-t border-border bg-background">

      <div className="container relative mx-auto px-4 py-16 z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <Logo variant="footer" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {footer.description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${footer.contact.email}?subject=Business Optimization Inquiry`}
                  className="text-sm hover:text-button-primary transition-colors mobile-contact-link"
                >
                  {footer.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${footer.contact.phoneNumber.replace(/\s/g, '')}`}
                  className="text-sm hover:text-button-primary transition-colors mobile-contact-link"
                >
                  {footer.contact.phoneNumber}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm">{footer.contact.address}</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <span className="text-sm">{footer.contact.kvk}: {footer.contact.kvkNumber}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">{footer.company.title}</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                    onClick={handleLinkClick}
                    className="text-muted-foreground hover:text-button-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">
              {isNL ? 'Diensten' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                    onClick={handleLinkClick}
                    className="text-muted-foreground hover:text-button-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">{footer.legal.title}</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  {link.href === '/cookies' ? (
                    <span className="text-muted-foreground/80 text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                      onClick={handleLinkClick}
                      className="text-muted-foreground hover:text-button-primary text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-muted-foreground text-sm">
              <span>© {currentYear} Octomatic. {footer.copyright}</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <h5 className="text-foreground text-sm font-medium">{footer.social.title}</h5>
              <div className="flex items-center space-x-4">
                {links.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-button-primary transition-colors duration-200 text-sm"
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