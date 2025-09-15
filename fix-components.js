#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentsToFix = [
  'WorkflowSteps.tsx',
  'Pricing.tsx', 
  'Problems.tsx',
  'FinalCTA.tsx',
  'FAQ.tsx',
  'BlogInsights.tsx',
  'BrandsSection.tsx',
  'TestimonialsAndCases.tsx',
  'Testimonials.tsx',
  'Services.tsx',
  'Comparison.tsx',
  'PressLogos.tsx',
  'Benefits.tsx'
];

const componentsDir = path.join(__dirname, 'src/components');

componentsToFix.forEach(componentFile => {
  const filePath = path.join(componentsDir, componentFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${componentFile}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove GridBackground imports
  if (content.includes("import GridBackground from")) {
    content = content.replace(/import GridBackground from [^;]+;\n?/g, '');
    modified = true;
  }
  
  // Remove useIsLargeScreen if only used for GridBackground
  const useIsLargeScreenMatches = content.match(/const isLargeScreen = useIsLargeScreen\(\);/);
  const gridBackgroundUsage = content.match(/isLargeScreen &&[\s\S]*?GridBackground/);
  
  if (useIsLargeScreenMatches && gridBackgroundUsage && !content.includes('isLargeScreen') || 
      (content.match(/isLargeScreen/g) || []).length <= 2) {
    content = content.replace(/import.*useIsLargeScreen.*;\n?/g, '');
    content = content.replace(/const isLargeScreen = useIsLargeScreen\(\);\n?/g, '');
    modified = true;
  }
  
  // Fix section wrapper - multiple patterns
  const sectionPatterns = [
    // Pattern 1: py-16 md:py-24 bg-[#0A0A0A] relative
    {
      old: /(<section className="py-16 md:py-24 bg-\[#0A0A0A\] relative"[^>]*>)\s*\{isLargeScreen &&[\s\S]*?<\/div>\s*\}\s*(<div className="container mx-auto px-4[^"]*"[^>]*>)/g,
      new: '$1\n      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">'
    },
    // Pattern 2: py-24 bg-[#0A0A0A] relative  
    {
      old: /(<section className="py-24 bg-\[#0A0A0A\] relative"[^>]*>)\s*\{isLargeScreen &&[\s\S]*?<\/div>\s*\}\s*(<div className="container mx-auto px-4[^"]*"[^>]*>)/g,
      new: '$1\n      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">'
    },
    // Pattern 3: Just update section class
    {
      old: /className="py-16 md:py-24 bg-\[#0A0A0A\] relative"/g,
      new: 'className="py-16 relative z-10"'
    },
    {
      old: /className="py-24 bg-\[#0A0A0A\] relative"/g,
      new: 'className="py-16 relative z-10"'
    },
    // Pattern 4: Update container
    {
      old: /className="container mx-auto px-4[^"]*"/g,
      new: 'className="mx-auto px-6 w-full max-w-6xl relative z-10"'
    }
  ];
  
  sectionPatterns.forEach(pattern => {
    if (pattern.old.test(content)) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  });
  
  // Remove standalone GridBackground usage
  content = content.replace(/\s*\{isLargeScreen &&[\s\S]*?<GridBackground[\s\S]*?\/>\s*<\/div>\s*\}/g, '');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${componentFile}`);
  } else {
    console.log(`⏭️  No changes needed: ${componentFile}`);
  }
});

console.log('🎯 Component standardization complete!');
