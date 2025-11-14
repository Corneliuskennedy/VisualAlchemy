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
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.cal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://*.cal.com https://vitals.vercel-insights.com; frame-src https://*.cal.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
