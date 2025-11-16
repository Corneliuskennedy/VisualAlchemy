'use client';

import React, { useRef } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import useLanguage from "@/contexts/LanguageContext";
import { Logo } from "./ui/logo";
import { useFooter } from "@/hooks/useContent";

const Footer = () => {
  const { language } = useLanguage();
  const footer = useFooter();
  const currentYear = new Date().getFullYear();
  const isNL = language === 'nl';
  const footerRef = useRef<HTMLElement>(null);

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
    <footer 
      ref={footerRef}
      className="relative border-t border-border/10 dark:border-white/10 bg-background z-10"
      style={{
        backgroundColor: 'hsl(var(--background))',
      }}
    >
      <div className="container relative mx-auto px-4 py-20 md:py-24 z-[1]">
        {/* Monopo-Inspired Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16">
          {/* Left Column: Logo + Description + Contact */}
          <div className="space-y-8">
            <Logo variant="footer" />
            <p className="text-muted-foreground dark:text-gray-600 text-sm leading-relaxed max-w-md">
              {footer.description}
            </p>
            
            {/* Contact Info - Clean, Text-Only (Monopo Style) */}
            <div className="space-y-3 text-sm text-muted-foreground dark:text-gray-600">
              <div>
                <a
                  href={`mailto:${footer.contact.email}?subject=Business Optimization Inquiry`}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {footer.contact.email}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${footer.contact.phoneNumber.replace(/\s/g, '')}`}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {footer.contact.phoneNumber}
                </a>
              </div>
              <div className="leading-relaxed">
                {footer.contact.address.split(',').map((line, idx) => (
                  <div key={idx}>{line.trim()}</div>
                ))}
              </div>
              <div>
                {footer.contact.kvk}: {footer.contact.kvkNumber}
              </div>
            </div>
          </div>

          {/* Right Column: Navigation Links - Organized Groups */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-medium text-foreground dark:text-black">
                {footer.company.title}
              </h4>
              <ul className="space-y-3">
                {links.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                      onClick={handleLinkClick}
                      className="text-xs md:text-sm text-muted-foreground dark:text-gray-600 hover:text-foreground dark:hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-medium text-foreground dark:text-black">
                {isNL ? 'Diensten' : 'Services'}
              </h4>
              <ul className="space-y-3">
                {links.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                      onClick={handleLinkClick}
                      className="text-xs md:text-sm text-muted-foreground dark:text-gray-600 hover:text-foreground dark:hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-medium text-foreground dark:text-black">
                {footer.legal.title}
              </h4>
              <ul className="space-y-3">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    {link.href === '/cookies' ? (
                      <span className="text-xs md:text-sm text-muted-foreground/60 dark:text-gray-400 cursor-not-allowed">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={(isNL ? `/nl${link.href}` : link.href).replace(/\/$/, "")}
                        onClick={handleLinkClick}
                        className="text-xs md:text-sm text-muted-foreground dark:text-gray-600 hover:text-foreground dark:hover:text-black transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Clean, Minimal (Monopo Style) */}
        <div className="pt-8 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Copyright */}
            <div className="text-xs text-muted-foreground dark:text-gray-600">
              © {currentYear} Octomatic. {footer.copyright}
            </div>
            
            {/* Social Links - Simple Text Links (No Icons) */}
            <div className="flex items-center gap-6">
              {links.social.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-muted-foreground dark:text-gray-600 hover:text-foreground dark:hover:text-black transition-colors duration-200"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;