#!/usr/bin/env node

/**
 * Performance Baseline Script
 * 
 * Runs Lighthouse audits on all critical pages and generates a baseline report
 * Run: node scripts/performance-baseline.js
 * 
 * Requirements:
 * - lighthouse CLI: npm install -g lighthouse
 * - Or use playwright-lighthouse (already installed)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CRITICAL_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
  { path: '/our-work', name: 'Our Work' },
  { path: '/build', name: 'Build' },
  { path: '/optimize', name: 'Optimize' },
  { path: '/create', name: 'Create' },
  { path: '/blog', name: 'Blog' },
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'performance-baseline');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🚀 Starting Performance Baseline Audit...\n');
console.log(`Base URL: ${BASE_URL}\n`);

const results = [];

for (const page of CRITICAL_PAGES) {
  console.log(`📊 Auditing ${page.name} (${page.path})...`);
  
  try {
    // Use playwright-lighthouse if available, otherwise use lighthouse CLI
    const url = `${BASE_URL}${page.path}`;
    
    // For now, just log - actual lighthouse run should be done via Playwright tests
    console.log(`   URL: ${url}`);
    console.log(`   Status: ⏳ Use "npm run test:performance" to run full audit\n`);
    
    results.push({
      page: page.name,
      path: page.path,
      url,
      status: 'pending',
    });
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    results.push({
      page: page.name,
      path: page.path,
      status: 'error',
      error: error.message,
    });
  }
}

// Generate summary report
const reportPath = path.join(OUTPUT_DIR, 'baseline-summary.json');
fs.writeFileSync(
  reportPath,
  JSON.stringify({
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: results,
    nextSteps: [
      'Run: RUN_PERFORMANCE_TESTS=true npm run test:performance',
      'Review Lighthouse reports in test-results/',
      'Compare scores against elite targets (LCP ≤ 1.2s, INP ≤ 100ms, CLS ≤ 0.01)',
    ],
  }, null, 2)
);

console.log('✅ Baseline summary saved to:', reportPath);
console.log('\n📋 Next Steps:');
console.log('1. Start dev server: npm run dev');
console.log('2. Run performance tests: RUN_PERFORMANCE_TESTS=true npm run test:performance');
console.log('3. Review results and identify bottlenecks\n');


