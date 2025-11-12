import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle language routing
 * 
 * This middleware:
 * 1. Intercepts /nl/* routes and rewrites them internally to /* (without /nl prefix)
 * 2. Preserves the /nl prefix in the URL for the client
 * 3. Sets a language header so components can detect the language server-side
 * 4. Handles root /nl route specially
 * 
 * This fixes the 404 issue on refresh for /nl/* routes because Next.js
 * doesn't have actual /nl/* folder routes - they're handled client-side.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Handle Dutch language routes (/nl/*)
  if (pathname.startsWith('/nl')) {
    // Log for debugging
    console.log(`[MIDDLEWARE] Handling /nl route: ${pathname} -> rewriting to internal route`);
    // Extract the path after /nl
    let pathWithoutLang = pathname.slice(3); // Remove '/nl' prefix
    
    // Handle root /nl route - rewrite to /
    if (!pathWithoutLang || pathWithoutLang === '') {
      pathWithoutLang = '/';
    }
    
    // Ensure path starts with /
    if (!pathWithoutLang.startsWith('/')) {
      pathWithoutLang = '/' + pathWithoutLang;
    }
    
    // Create a new URL with the rewritten path (without /nl)
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = pathWithoutLang;
    
    // Create response with rewritten URL
    const response = NextResponse.rewrite(rewriteUrl);
    
    // Set language header for server components to detect language
    response.headers.set('x-language', 'nl');
    
    console.log(`[MIDDLEWARE] Rewritten ${pathname} -> ${rewriteUrl.pathname}`);
    return response;
  }

  // For non-/nl routes, set language header to 'en'
  const response = NextResponse.next();
  response.headers.set('x-language', 'en');
  
  return response;
}

// Configure which routes should run this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
};

