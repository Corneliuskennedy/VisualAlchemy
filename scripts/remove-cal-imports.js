#!/usr/bin/env node

/**
 * Script to remove all Cal.com hook imports and calls from pages
 * This prevents webpack from analyzing the use-cal.tsx file which contains
 * commented-out Cal.com imports that cause SSR build errors
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/our-work/page.tsx',
  'src/app/services/crm-buildouts/page.tsx',
  'src/app/services/page.tsx',
  'src/app/services/lead-generation/page.tsx',
  'src/app/services/hiring-systems/page.tsx',
  'src/app/services/ai-service-fulfillment/page.tsx',
  'src/app/services/ai-automation-amsterdam/page.tsx',
  'src/app/services/startup-kickoff-lab/page.tsx',
  'src/app/automation-strategy-workshop/page.tsx',
  'src/app/get-started/page.tsx',
  'src/app/author/kennet-timmers/page.tsx',
  'src/app/tools/automation-roi-calculator/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/partnership/page.tsx',
  'src/app/services/sops-consulting/page.tsx',
  'src/app/services/project-management/page.tsx',
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Remove import statements
  const importPatterns = [
    /import\s*{\s*useCalWorkshop\s*}\s*from\s*['"]@\/hooks\/use-cal['"];?\s*\n/g,
    /import\s*{\s*useCalIntroCall\s*}\s*from\s*['"]@\/hooks\/use-cal['"];?\s*\n/g,
    /import\s*{\s*useCalWorkshop\s*,\s*useCalIntroCall\s*}\s*from\s*['"]@\/hooks\/use-cal['"];?\s*\n/g,
    /import\s*{\s*useCalIntroCall\s*,\s*useCalWorkshop\s*}\s*from\s*['"]@\/hooks\/use-cal['"];?\s*\n/g,
  ];

  importPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, '');
      modified = true;
    }
  });

  // Remove hook calls (with optional comments before them)
  const hookCallPatterns = [
    /\s*\/\/.*Cal\.com.*\n\s*useCalWorkshop\(\);\s*\n/g,
    /\s*\/\/.*Cal\.com.*\n\s*useCalIntroCall\(\);\s*\n/g,
    /\s*useCalWorkshop\(\);\s*\n/g,
    /\s*useCalIntroCall\(\);\s*\n/g,
  ];

  hookCallPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, '');
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
  }
});

console.log('\n✅ All files processed!');

