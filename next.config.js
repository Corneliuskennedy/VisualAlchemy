/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix lockfile warning by setting explicit root
  outputFileTracingRoot: require('path').join(__dirname),
  eslint: {
    // Temporarily ignore ESLint during build to avoid config conflicts
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Continue build even if there are TypeScript errors (we'll fix them)
    ignoreBuildErrors: false,
  },
  experimental: {
    // Optimize package imports for tree-shaking - reduces bundle size significantly
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      // Optimize all Radix UI packages for tree-shaking
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
    ],
    // DISABLED: Optimize CSS output - requires critters package
    // optimizeCss: true,
  },
  // Optimize CSS output - remove unused styles
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Performance budgets to catch regressions early
  webpack: (config, { isServer, dev }) => {
    // Cal.com package has been completely removed - no exclusion needed
    
    if (!isServer) {
      // Only show performance warnings in production builds
      // Dev mode bundles are intentionally larger (source maps, etc.)
      config.performance = {
        maxAssetSize: 250000, // 250 kB
        maxEntrypointSize: 250000, // 250 kB
        hints: dev ? false : 'warning', // Suppress warnings in dev mode
      };
      
      // Optimize chunk splitting for better code splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor chunks for better caching
            default: false,
            vendors: false,
            // Framer Motion in separate chunk (heavy library)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Radix UI in separate chunk
            radixUI: {
              name: 'radix-ui',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
            },
            // React Query in separate chunk (only used in blog)
            reactQuery: {
              name: 'react-query',
              test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Split React/Next.js into separate chunk (heavily cached)
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            // Next.js core in separate chunk
            nextjs: {
              name: 'nextjs',
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 35,
              reuseExistingChunk: true,
            },
            // Supabase client (only used in blog)
            supabase: {
              name: 'supabase',
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              priority: 15,
              reuseExistingChunk: true,
            },
            // Other vendor libraries
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  // Turbopack configuration (Next.js 15 format)
  turbopack: {
    resolveExtensions: [
      '.mdx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Prevent crashes on missing images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add error handling for missing images
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      // ============================================
      // HUB AND SPOKE ARCHITECTURE - 301 PERMANENT REDIRECTS
      // ============================================
      
      // 1. Services consolidation - redirect to homepage (the Hub)
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      
      // 2. Old service pages → /optimize (Optimize Spoke)
      { source: '/services/ai-automation-amsterdam', destination: '/optimize', permanent: true },
      { source: '/services/ai-service-fulfillment', destination: '/optimize', permanent: true },
      { source: '/services/crm-buildouts', destination: '/optimize', permanent: true },
      { source: '/services/lead-generation', destination: '/optimize', permanent: true },
      { source: '/services/hiring-systems', destination: '/optimize', permanent: true },
      { source: '/services/project-management', destination: '/optimize', permanent: true },
      { source: '/services/sops-consulting', destination: '/optimize', permanent: true },
      
      // 3. Startup services → /build (Build Spoke)
      { source: '/services/startup-kickoff-lab', destination: '/build', permanent: true },
      { source: '/startup-kickoff-lab', destination: '/build', permanent: true },
      
      // 4. Business automation → /optimize (Optimize Spoke)
      { source: '/business-automation', destination: '/optimize', permanent: true },
      
      // 5. Standardize page names to new architecture
      { source: '/projects', destination: '/our-work', permanent: true },
      { source: '/projecten', destination: '/our-work', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/over-ons', destination: '/about-us', permanent: true },
      
      // 6. Consolidate get-started into contact
      { source: '/get-started', destination: '/contact', permanent: true },
      
      // 7. Standardize legal pages
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // Handle /nl/* routes - rewrite to /* (middleware also handles this, but this is a fallback)
      {
        source: '/nl',
        destination: '/',
      },
      {
        source: '/nl/:path*',
        destination: '/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.cal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' https://*.supabase.co blob:; connect-src 'self' https://*.supabase.co https://*.cal.com https://vitals.vercel-insights.com https://*.octomatic.ai https://n8n.octomatic.ai; frame-src https://*.cal.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
