#!/usr/bin/env node

/**
 * Theme Audit Helper Script
 * 
 * Scans pages for potential theme issues:
 * - Hardcoded colors (not using CSS variables)
 * - Missing dark mode classes
 * - Potential theme inconsistencies
 * 
 * Usage:
 *   node scripts/theme-audit-helper.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Common hardcoded color patterns
const hardcodedColorPatterns = [
  /#[0-9a-fA-F]{3,6}/g, // Hex colors
  /rgb\([^)]+\)/g, // RGB colors
  /rgba\([^)]+\)/g, // RGBA colors
  /(?:bg|text|border)-(?:white|black|gray|red|blue|green|yellow|purple|pink|indigo)-(?:50|100|200|300|400|500|600|700|800|900)/g, // Tailwind hardcoded colors
];

// CSS variable patterns (good)
const cssVariablePatterns = [
  /var\(--[^)]+\)/g,
  /bg-background/g,
  /text-foreground/g,
  /border-border/g,
];

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.ts') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for hardcoded colors
  hardcodedColorPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      // Filter out known good patterns
      const badMatches = matches.filter(match => {
        // Skip if it's a CSS variable
        if (match.includes('var(')) return false;
        // Skip common safe colors (like #fff, #000 in specific contexts)
        if (match === '#fff' || match === '#000') {
          // Check context - might be okay
          return false; // Conservative - flag for review
        }
        return true;
      });
      
      if (badMatches.length > 0) {
        issues.push({
          type: 'hardcoded-color',
          matches: [...new Set(badMatches)].slice(0, 5), // Limit to 5 examples
          count: badMatches.length,
        });
      }
    }
  });
  
  // Check for missing dark mode classes
  const hasDarkMode = content.includes('dark:') || content.includes('darkMode');
  const hasThemeProvider = content.includes('ThemeProvider') || content.includes('useTheme');
  
  // Check for className without dark: variant
  const classNameMatches = content.match(/className=["'][^"']*["']/g) || [];
  const classesWithoutDark = classNameMatches.filter(cls => {
    const classContent = cls.match(/className=["']([^"']+)["']/)?.[1] || '';
    // Check if it has bg-, text-, or border- but no dark: variant
    if ((classContent.includes('bg-') || classContent.includes('text-') || classContent.includes('border-')) &&
        !classContent.includes('dark:') &&
        !classContent.includes('bg-background') &&
        !classContent.includes('text-foreground')) {
      return true;
    }
    return false;
  });
  
  if (classesWithoutDark.length > 0) {
    issues.push({
      type: 'missing-dark-mode',
      count: classesWithoutDark.length,
      examples: classesWithoutDark.slice(0, 3),
    });
  }
  
  return issues;
}

function auditPages() {
  log('\n🔍 Starting Theme Audit...\n', 'cyan');
  
  const srcDir = path.join(process.cwd(), 'src', 'app');
  
  if (!fs.existsSync(srcDir)) {
    log('❌ src/app directory not found', 'red');
    process.exit(1);
  }
  
  log('Finding page files...', 'blue');
  const pageFiles = findPageFiles(srcDir);
  log(`Found ${pageFiles.length} page file(s)\n`, 'green');
  
  const results = {
    total: pageFiles.length,
    withIssues: 0,
    issues: [],
  };
  
  pageFiles.forEach(filePath => {
    const relativePath = path.relative(process.cwd(), filePath);
    const issues = auditFile(filePath);
    
    if (issues.length > 0) {
      results.withIssues++;
      results.issues.push({
        file: relativePath,
        issues,
      });
    }
  });
  
  // Report results
  log('\n📊 Audit Results:\n', 'cyan');
  log(`Total pages: ${results.total}`, 'blue');
  log(`Pages with issues: ${results.withIssues}`, results.withIssues > 0 ? 'yellow' : 'green');
  log(`Pages clean: ${results.total - results.withIssues}`, 'green');
  
  if (results.issues.length > 0) {
    log('\n⚠️  Issues Found:\n', 'yellow');
    
    results.issues.forEach(({ file, issues }) => {
      log(`\n📄 ${file}`, 'blue');
      issues.forEach(issue => {
        if (issue.type === 'hardcoded-color') {
          log(`  ⚠️  Hardcoded colors found (${issue.count} instances)`, 'yellow');
          log(`     Examples: ${issue.matches.join(', ')}`, 'yellow');
        } else if (issue.type === 'missing-dark-mode') {
          log(`  ⚠️  Potential missing dark mode variants (${issue.count} instances)`, 'yellow');
        }
      });
    });
    
    log('\n💡 Recommendations:', 'cyan');
    log('  1. Replace hardcoded colors with CSS variables (bg-background, text-foreground, etc.)', 'cyan');
    log('  2. Add dark: variants for all color classes', 'cyan');
    log('  3. Test theme switching on affected pages', 'cyan');
  } else {
    log('\n✅ No issues found! All pages appear theme-compliant.', 'green');
  }
  
  log('\n📝 Next Steps:', 'cyan');
  log('  1. Review flagged pages manually', 'cyan');
  log('  2. Fix hardcoded colors', 'cyan');
  log('  3. Add dark mode variants where needed', 'cyan');
  log('  4. Test theme switching on all pages', 'cyan');
}

auditPages();

