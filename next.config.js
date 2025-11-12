/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // 1. Redirect the old master "Services" page to the new Homepage Hub
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      // 2. Redirect all old, granular service pages to the new "Optimize" Spoke
      { source: '/services/ai-automation-amsterdam', destination: '/optimize', permanent: true },
      { source: '/services/ai-service-fulfillment', destination: '/optimize', permanent: true },
      { source: '/services/crm-buildouts', destination: '/optimize', permanent: true },
      { source: '/services/lead-generation', destination: '/optimize', permanent: true },
      { source: '/services/hiring-systems', destination: '/optimize', permanent: true },
      { source: '/services/project-management', destination: '/optimize', permanent: true },
      { source: '/services/sops-consulting', destination: '/optimize', permanent: true },
      { source: '/services/startup-kickoff-lab', destination: '/build', permanent: true },
      // 3. Redirect the old Segment pages to their new Spoke equivalents
      {
        source: '/startup-kickoff-lab',
        destination: '/build',
        permanent: true,
      },
      {
        source: '/business-automation',
        destination: '/optimize',
        permanent: true,
      },
      // 4. Standardize old page names
      {
        source: '/projects',
        destination: '/projecten',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/over-ons',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
