#!/usr/bin/env node

/**
 * Route Verification Script
 * Verifies all routes exist and checks for inconsistencies
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Routes from build output (37 routes)
const buildRoutes = [
  '/',
  '/_not-found',
  '/about',
  '/author/kennet-timmers',
  '/automation-strategy-workshop',
  '/blog',
  '/blog/[slug]',
  '/build',
  '/business-automation',
  '/careers',
  '/checklist',
  '/contact',
  '/cookies',
  '/create',
  '/get-started',
  '/optimize',
  '/over-ons',
  '/partnership',
  '/privacy',
  '/projecten',
  '/projects',
  '/reports/state-of-ai-dutch-smes-2025',
  '/robots.txt',
  '/services',
  '/services/ai-automation-amsterdam',
  '/services/ai-service-fulfillment',
  '/services/crm-buildouts',
  '/services/hiring-systems',
  '/services/lead-generation',
  '/services/project-management',
  '/services/sops-consulting',
  '/services/startup-kickoff-lab',
  '/sitemap.xml',
  '/startup-kickoff-lab',
  '/terms',
  '/tools/automation-roi-calculator',
];

// Expected redirects from next.config.js
const expectedRedirects = {
  '/services': '/',
  '/services/ai-automation-amsterdam': '/optimize',
  '/services/ai-service-fulfillment': '/optimize',
  '/services/crm-buildouts': '/optimize',
  '/services/lead-generation': '/optimize',
  '/services/hiring-systems': '/optimize',
  '/services/project-management': '/optimize',
  '/services/sops-consulting': '/optimize',
  '/services/startup-kickoff-lab': '/build',
  '/startup-kickoff-lab': '/build',
  '/business-automation': '/optimize',
  '/projects': '/projecten',
  '/about': '/over-ons',
};

function findPageFiles(dir, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const routePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Check for page.tsx in this directory
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        routes.push({
          route: `/${routePath}`,
          file: pagePath,
          type: 'page',
        });
      }
      
      // Recursively check subdirectories
      routes.push(...findPageFiles(fullPath, routePath));
    } else if (entry.name === 'page.tsx' && basePath === '') {
      // Root page
      routes.push({
        route: '/',
        file: fullPath,
        type: 'page',
      });
    }
  }

  return routes;
}

function verifyRoutes() {
  console.log('🔍 Verifying Routes...\n');

  // Find all page files
  const existingPages = findPageFiles(appDir);
  
  console.log(`📁 Found ${existingPages.length} page files:\n`);
  existingPages.forEach(({ route, file }) => {
    console.log(`  ✓ ${route.padEnd(50)} → ${path.relative(appDir, file)}`);
  });

  console.log('\n\n🔄 Checking Redirects...\n');
  
  const redirectIssues = [];
  Object.entries(expectedRedirects).forEach(([source, destination]) => {
    const sourceExists = existingPages.some(p => p.route === source || p.route === source + '/');
    const destExists = existingPages.some(p => p.route === destination || p.route === destination + '/');
    
    if (!destExists && destination !== '/') {
      redirectIssues.push({
        source,
        destination,
        issue: `Destination page not found: ${destination}`,
      });
    }
    
    console.log(`  ${sourceExists ? '✓' : '⚠'} ${source.padEnd(45)} → ${destination}${destExists || destination === '/' ? '' : ' ⚠ MISSING'}`);
  });

  console.log('\n\n📊 Summary:\n');
  console.log(`  Total page files: ${existingPages.length}`);
  console.log(`  Expected redirects: ${Object.keys(expectedRedirects).length}`);
  console.log(`  Redirect issues: ${redirectIssues.length}`);

  if (redirectIssues.length > 0) {
    console.log('\n⚠️  Issues Found:\n');
    redirectIssues.forEach(({ source, destination, issue }) => {
      console.log(`  - ${source} → ${destination}: ${issue}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All routes verified successfully!');
    process.exit(0);
  }
}

verifyRoutes();

