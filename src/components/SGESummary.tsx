import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface SGESummaryProps {
  summary: string;
  bullets?: string[];
  className?: string;
  variant?: 'subtle' | 'hidden' | 'compact';
  pageTitle?: string;
}

export const SGESummary: React.FC<SGESummaryProps> = ({ 
  summary, 
  bullets = [], 
  className = '',
  variant = 'subtle',
  pageTitle = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Hidden variant - only for SEO, visually hidden but crawlable
  if (variant === 'hidden') {
    return (
      <div className="summary tldr sge-summary" style={{ position: 'absolute', left: '-9999px', top: '0', width: '1px', height: '1px', overflow: 'hidden' }}>
        <div className="executive-summary overview">
          <p>{summary}</p>
          {bullets.length > 0 && (
            <ul>
              {bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Schema markup for AI systems */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DefinedTerm",
              "name": `${pageTitle} Summary`,
              "description": summary,
              "inDefinedTermSet": "AI-Optimized Content Summaries",
              "termCode": "sge-tldr",
              "additionalProperty": bullets.map((bullet, index) => ({
                "@type": "PropertyValue",
                "name": `Key Point ${index + 1}`,
                "value": bullet
              }))
            })
          }}
        />
      </div>
    );
  }

  // Subtle variant - small toggle button in corner
  if (variant === 'subtle') {
    return (
      <div className={`fixed top-24 right-4 z-40 ${className}`}>
        <div className="relative">
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white hover:border-[#4585f4]/50 transition-all duration-200 shadow-lg"
            aria-expanded={isExpanded}
            aria-label="Toggle page summary"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Summary</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Expandable Content */}
          {isExpanded && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
              <div className="sge-summary summary">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-[#4585f4]" />
                  <span className="text-sm font-medium text-[#4585f4] uppercase tracking-wider">
                    Page Summary
                  </span>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed mb-3">
                  {summary}
                </p>

                {bullets.length > 0 && (
                  <ul className="space-y-1.5">
                    {bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-xs leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Schema markup for AI systems */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DefinedTerm",
              "name": `${pageTitle} Summary`,
              "description": summary,
              "inDefinedTermSet": "AI-Optimized Content Summaries",
              "termCode": "sge-tldr",
              "additionalProperty": bullets.map((bullet, index) => ({
                "@type": "PropertyValue",
                "name": `Key Point ${index + 1}`,
                "value": bullet
              }))
            })
          }}
        />
      </div>
    );
  }

  // Compact variant - inline, minimal
  return (
    <details className={`sge-summary summary bg-gray-900/30 border border-gray-800/50 rounded-lg ${className}`}>
      <summary className="cursor-pointer p-3 text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2">
        <Info className="w-4 h-4" />
        <span>Page Summary</span>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </summary>
      
      <div className="p-3 pt-0 border-t border-gray-800/30">
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          {summary}
        </p>

        {bullets.length > 0 && (
          <ul className="space-y-1">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Schema markup for AI systems */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": `${pageTitle} Summary`,
            "description": summary,
            "inDefinedTermSet": "AI-Optimized Content Summaries",
            "termCode": "sge-tldr",
            "additionalProperty": bullets.map((bullet, index) => ({
              "@type": "PropertyValue",
              "name": `Key Point ${index + 1}`,
              "value": bullet
            }))
          })
        }}
      />
    </details>
  );
}; 