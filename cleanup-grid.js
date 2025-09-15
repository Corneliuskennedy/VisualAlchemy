#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentsToClean = [
  'Pricing.tsx',
  'WorkflowSteps.tsx', 
  'FinalCTA.tsx',
  'Services.tsx',
  'Footer.tsx',
  'Testimonials.tsx',
  'FAQ.tsx',
  'BlogInsights.tsx',
  'Problems.tsx'
];

const componentsDir = path.join(__dirname, 'src/components');

componentsToClean.forEach(componentFile => {
  const filePath = path.join(componentsDir, componentFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${componentFile}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove orphaned isLargeScreen grid background blocks
  const gridPatterns = [
    // Pattern: {isLargeScreen && ( <div>...</div> )}
    /\s*\{isLargeScreen &&[^}]*\([^}]*<div[^>]*absolute[^>]*>[^<]*<\/div>\s*\)\}/g,
    // Pattern: {isLargeScreen && <div>...</div>}  
    /\s*\{isLargeScreen &&\s*\([^}]*<div[^>]*absolute[^>]*>\s*<\/div>\s*\)\}/g,
    // Simpler pattern
    /\s*\{isLargeScreen &&[\s\S]*?<\/div>\s*\)/g
  ];
  
  gridPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, '');
      modified = true;
    }
  });
  
  // Remove unused isLargeScreen imports and declarations
  if (content.includes('isLargeScreen') && !content.includes('isLargeScreen &&')) {
    // Only remove if not used elsewhere
    const isLargeScreenUsages = (content.match(/isLargeScreen/g) || []).length;
    if (isLargeScreenUsages <= 2) { // Just import and declaration
      content = content.replace(/import.*useIsLargeScreen.*;\n?/g, '');
      content = content.replace(/const isLargeScreen = useIsLargeScreen\(\);\n?\s*/g, '');
      modified = true;
    }
  }
  
  // Update section classes
  content = content.replace(/className="py-24 relative overflow-hidden bg-\[#0A0A0A\]"/g, 'className="py-16 relative z-10 overflow-hidden"');
  content = content.replace(/className="py-24 relative bg-\[#0A0A0A\]"/g, 'className="py-16 relative z-10"');
  content = content.replace(/className="py-24 bg-\[#0A0A0A\] relative"/g, 'className="py-16 relative z-10"');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned: ${componentFile}`);
  } else {
    console.log(`⏭️  No changes needed: ${componentFile}`);
  }
});

console.log('🧹 Grid cleanup complete!');
