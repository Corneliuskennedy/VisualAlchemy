'use client';

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Minimal Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 backdrop-blur-md bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono font-bold text-sm tracking-wider hover:text-[#10b981] transition-colors" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            VISUAL_ALCHEMY
          </Link>
          <div className="flex items-center gap-4 font-mono text-xs text-gray-400" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            <a 
              href="https://www.octomatic.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#10b981] transition-colors"
            >
              part of octomatic.ai
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24 max-w-5xl pt-32">
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-8 text-gray-400 hover:text-white hover:bg-white/5 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div 
            className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            INITIATE PROJECT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Deploy?
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your educational content with AI-powered visuals. Tell me about your project, and I'll respond within 24 hours.
          </p>
        </div>

        {/* Form - Centered, Single Column */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
          
          {/* Minimal Contact Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              <Mail className="h-4 w-4 text-[#10b981]" />
              <a
                href="mailto:kennet@octomatic.ai"
                className="hover:text-[#10b981] transition-colors"
              >
                kennet@octomatic.ai
              </a>
              <span className="mx-2">•</span>
              <span>Response within 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
