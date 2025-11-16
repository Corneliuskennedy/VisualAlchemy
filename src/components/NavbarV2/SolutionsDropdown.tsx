/**
 * Solutions Dropdown Component
 * Optimized dropdown with smooth animations, no theme flash, and improved UI/UX
 */

'use client';

import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface SolutionItem {
  label: string;
  href: string;
  description: string;
  shortDescription?: string;
}

interface SolutionsDropdownProps {
  isActiveRoute: (href: string) => boolean;
}

const SOLUTIONS: SolutionItem[] = [
  {
    label: 'Build a New System',
    href: '/build',
    description: 'Transform your idea into a fully automated platform that scales with your business.',
    shortDescription: 'From concept to automated platform',
  },
  {
    label: 'Optimize Your Business',
    href: '/optimize',
    description: 'Eliminate operational chaos and scale efficiently with intelligent automation solutions.',
    shortDescription: 'Streamline operations and scale',
  },
  {
    label: 'Create Viral Content',
    href: '/create',
    description: 'Produce stunning, AI-driven visuals that capture attention and drive engagement.',
    shortDescription: 'AI-powered visual content',
  },
];

const SOLUTIONS_NL: SolutionItem[] = [
  {
    label: 'Bouw een Nieuw Systeem',
    href: '/nl/build',
    description: 'Zet je idee om in een volledig geautomatiseerd platform dat meegroeit met je bedrijf.',
    shortDescription: 'Van concept tot geautomatiseerd platform',
  },
  {
    label: 'Optimaliseer Je Bedrijf',
    href: '/nl/optimize',
    description: 'Elimineer operationele chaos en schaal efficiënt met intelligente automatisering.',
    shortDescription: 'Stroomlijn operaties en schaal',
  },
  {
    label: 'Maak Virale Content',
    href: '/nl/create',
    description: 'Produceer verbluffende, AI-gedreven visuals die aandacht trekken en engagement stimuleren.',
    shortDescription: 'AI-gedreven visuele content',
  },
];

function SolutionsDropdownComponent({ isActiveRoute }: SolutionsDropdownProps) {
  const pathname = usePathname();
  const isDutch = pathname.startsWith('/nl');
  const renderCountRef = useRef(0);
  const dropdownOpenRef = useRef(false);
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Track renders (debug only - disabled for production)
  useEffect(() => {
    renderCountRef.current += 1;
    // console.log('[SolutionsDropdown] Render #' + renderCountRef.current, {
    //   pathname,
    //   isDutch,
    //   isOpen,
    //   timestamp: new Date().toISOString(),
    // });
  });

  // Track dropdown state changes
  const handleOpenChange = useCallback((open: boolean) => {
    dropdownOpenRef.current = open;
    setIsOpen(open);
    // console.log('[SolutionsDropdown] Dropdown state changed', {
    //   open,
    //   timestamp: new Date().toISOString(),
    // });
  }, []);
  
  // Use memoized solutions to prevent re-renders
  const solutions = useMemo(() => {
    const result = isDutch ? SOLUTIONS_NL : SOLUTIONS;
    // console.log('[SolutionsDropdown] Solutions memoized', {
    //   isDutch,
    //   count: result.length,
    //   timestamp: new Date().toISOString(),
    // });
    return result;
  }, [isDutch]);

  // Stable key for dropdown to prevent re-mounting
  const dropdownKey = useMemo(() => {
    // console.log('[SolutionsDropdown] Dropdown key memoized');
    return 'solutions-dropdown';
  }, []);

  // Memoize active states to prevent recalculation
  const activeStates = useMemo(() => {
    const states = solutions.reduce((acc, solution) => {
      acc[solution.href] = isActiveRoute(solution.href);
      return acc;
    }, {} as Record<string, boolean>);
    // console.log('[SolutionsDropdown] Active states memoized', {
    //   states,
    //   timestamp: new Date().toISOString(),
    // });
    return states;
  }, [solutions, isActiveRoute]);

  // Memoize dropdown content to prevent re-render on theme change when closed
  // Only recreate if solutions/activeStates change, NOT on theme changes
  const dropdownContent = useMemo(() => {
    // console.log('[SolutionsDropdown] Dropdown content memoized', {
    //   solutionsCount: solutions.length,
    //   activeStatesCount: Object.keys(activeStates).length,
    //   timestamp: new Date().toISOString(),
    // });
    
    return (
      <DropdownMenuContent
        align="start"
        className={cn(
          'w-[420px] p-3',
          'bg-popover border-border text-popover-foreground',
          'shadow-2xl',
          // Smooth transitions for theme changes - 500ms to match theme transition
          'transition-[background-color,border-color,color] duration-500 ease-out',
          // Ensure smooth animations
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2'
        )}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
      <div className="space-y-1">
        {solutions.map((solution) => {
          const isActive = activeStates[solution.href];
          return (
            <DropdownMenuItem key={solution.href} asChild>
              <Link
                href={solution.href}
                className={cn(
                  'group relative',
                  'flex items-start gap-4 p-4',
                  'rounded-lg cursor-pointer',
                  'transition-all duration-200 ease-out',
                  'hover:bg-accent/50',
                  'focus:bg-accent/50 focus:outline-none',
                  isActive && 'bg-accent/30 ring-1 ring-border'
                )}
              >
                {/* Content wrapper - copy on the left */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className={cn(
                        'font-semibold text-base leading-tight',
                        'text-popover-foreground',
                        'group-hover:text-popover-foreground',
                        'transition-colors duration-200'
                      )}>
                        {solution.label}
                      </h3>
                      <p className={cn(
                        'text-sm mt-2 leading-relaxed',
                        'text-muted-foreground',
                        'group-hover:text-muted-foreground/90',
                        'transition-colors duration-200'
                      )}>
                        {solution.description}
                      </p>
                    </div>
                    {/* Arrow indicator */}
                    <ArrowRight 
                      className={cn(
                        'w-5 h-5 flex-shrink-0 mt-0.5',
                        'text-muted-foreground',
                        'group-hover:text-button-primary',
                        'group-hover:translate-x-1',
                        'transition-all duration-200 ease-out'
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <span className="text-xs font-medium text-button-primary">
                        {isDutch ? 'Huidige pagina' : 'Current page'}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </div>
    </DropdownMenuContent>
    );
  }, [solutions, activeStates, isDutch]); // Only recreate if these change, NOT theme

  return (
    <DropdownMenu key={dropdownKey} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'relative px-4 py-2 rounded-lg',
            'text-sm lg:text-base font-medium',
            'flex items-center gap-1.5',
            'transition-colors duration-200 ease-out',
            'text-foreground/80 hover:text-[#4585f4] dark:hover:text-[#6B8AE6]',
            'focus:outline-none focus:ring-2 focus:ring-button-primary/50 focus:ring-offset-2',
            'group',
            'data-[state=open]:text-[#4585f4] data-[state=open]:dark:text-[#6B8AE6] data-[state=open]:font-semibold'
          )}
          aria-label={isDutch ? 'Oplossingen menu' : 'Solutions menu'}
          aria-haspopup="true"
          type="button"
        >
          {/* Clean hover background - Blue only */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(135deg, rgba(69, 133, 244, 0.15) 0%, rgba(107, 138, 230, 0.12) 50%, rgba(69, 133, 244, 0.15) 100%)',
            }}
          />
          <span className="relative z-10">{isDutch ? 'Oplossingen' : 'Solutions'}</span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 relative z-10 transition-transform duration-200 ease-out",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  );
}

// Memoize component to prevent re-renders when parent re-renders due to theme changes
export const SolutionsDropdown = React.memo(SolutionsDropdownComponent, (prevProps, nextProps) => {
  const areEqual = prevProps.isActiveRoute === nextProps.isActiveRoute;
  // console.log('[SolutionsDropdown] Memo comparison', {
  //   areEqual,
  //   prevFunction: prevProps.isActiveRoute?.toString().substring(0, 50),
  //   nextFunction: nextProps.isActiveRoute?.toString().substring(0, 50),
  //   timestamp: new Date().toISOString(),
  // });
  // Only re-render if isActiveRoute function reference changes
  // Return true if props are equal (don't re-render), false if different (re-render)
  return areEqual;
});

