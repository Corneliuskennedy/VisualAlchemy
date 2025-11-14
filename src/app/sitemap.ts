import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.octomatic.ai'
  
  // Core pages - Only canonical URLs (no redirecting routes)
  const routes = [
    '', // Homepage
    '/build', // Spoke: Build
    '/optimize', // Spoke: Optimize
    '/create', // Spoke: Create
    '/about-us', // Canonical about page
    '/our-work', // Canonical projects page
    '/contact',
    '/blog',
    '/automation-strategy-workshop',
    '/checklist',
    '/partnership',
    '/tools/automation-roi-calculator',
    '/reports/state-of-ai-dutch-smes-2025',
    '/author/kennet-timmers',
    '/privacy-policy', // Canonical privacy page
    '/terms-of-service', // Canonical terms page
    '/cookies',
    '/careers'
  ]
  
  // Generate sitemap entries for both EN and NL versions
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  routes.forEach(route => {
    // English version
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : route.includes('/blog') ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : ['/build', '/optimize', '/create'].includes(route) ? 0.9 : 0.8,
    })
    
    // Dutch version
    sitemapEntries.push({
      url: `${baseUrl}/nl${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : route.includes('/blog') ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : ['/build', '/optimize', '/create'].includes(route) ? 0.9 : 0.8,
    })
  })
  
  return sitemapEntries
}
