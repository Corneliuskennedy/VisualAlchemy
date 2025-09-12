import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.octomatic.ai'
  
  // Core pages
  const routes = [
    '',
    '/about',
    '/services',
    '/services/ai-automation-amsterdam',
    '/services/ai-service-fulfillment',
    '/services/lead-generation',
    '/services/crm-buildouts', 
    '/services/hiring-systems',
    '/services/project-management',
    '/services/sops-consulting',
    '/services/startup-kickoff-lab',
    '/contact',
    '/blog',
    '/automation-strategy-workshop',
    '/checklist',
    '/partnership',
    '/get-started',
    '/projects',
    '/tools/automation-roi-calculator',
    '/reports/state-of-ai-dutch-smes-2025',
    '/author/kennet-timmers',
    '/privacy',
    '/terms',
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
      priority: route === '' ? 1.0 : route.includes('/services') ? 0.9 : 0.8,
    })
    
    // Dutch version
    sitemapEntries.push({
      url: `${baseUrl}/nl${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : route.includes('/blog') ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route.includes('/services') ? 0.9 : 0.8,
    })
  })
  
  return sitemapEntries
}
