#!/usr/bin/env node

/**
 * Analyze Unused Code
 * 
 * Identifies potentially unused JavaScript and CSS
 * Run: node scripts/analyze-unused-code.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// Get all JS/TS files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get all CSS files
function getAllCSSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
        getAllCSSFiles(filePath, fileList);
      }
    } else if (/\.css$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Analyze imports
function analyzeImports() {
  console.log('🔍 Analyzing unused code...\n');
  
  const jsFiles = getAllFiles(SRC_DIR);
  const cssFiles = getAllCSSFiles(SRC_DIR);
  
  // Collect all imports
  const allImports = new Set();
  const allExports = new Set();
  const fileExports = new Map();
  
  jsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(PROJECT_ROOT, file);
    
    // Find imports
    const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*(?:\s*,\s*)?)?\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    const imports = [];
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
      allImports.add(match[1]);
    }
    
    // Find exports
    const exportRegex = /export\s+(?:default\s+)?(?:function|const|class|let|var)\s+(\w+)/g;
    const exports = [];
    
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
      allExports.add(match[1]);
    }
    
    if (exports.length > 0) {
      fileExports.set(relativePath, exports);
    }
  });
  
  // Find potentially unused exports
  console.log('📊 Analysis Results:\n');
  console.log(`Total JS/TS files: ${jsFiles.length}`);
  console.log(`Total CSS files: ${cssFiles.length}`);
  console.log(`Total imports: ${allImports.size}`);
  console.log(`Total exports: ${allExports.size}\n`);
  
  // Check for unused exports
  const unusedExports = [];
  fileExports.forEach((exports, file) => {
    exports.forEach(exp => {
      // Check if this export is imported anywhere
      let isUsed = false;
      jsFiles.forEach(checkFile => {
        if (checkFile === file) return;
        const content = fs.readFileSync(checkFile, 'utf-8');
        // Simple check - could be improved
        if (content.includes(exp)) {
          isUsed = true;
        }
      });
      
      if (!isUsed) {
        unusedExports.push({ file, export: exp });
      }
    });
  });
  
  if (unusedExports.length > 0) {
    console.log('⚠️  Potentially unused exports:');
    unusedExports.forEach(({ file, export: exp }) => {
      console.log(`   - ${exp} in ${file}`);
    });
  } else {
    console.log('✅ No obviously unused exports found');
  }
  
  // Analyze CSS
  console.log('\n📦 CSS Analysis:');
  let totalCSSSize = 0;
  cssFiles.forEach(file => {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalCSSSize += stats.size;
    console.log(`   ${path.relative(PROJECT_ROOT, file)}: ${sizeKB} KB`);
  });
  
  console.log(`\nTotal CSS size: ${(totalCSSSize / 1024).toFixed(2)} KB`);
  console.log(`Target: < 50 KB (currently ${(totalCSSSize / 1024).toFixed(2)} KB)`);
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('1. Run "npm run build" and check .next/static/css for actual bundle sizes');
  console.log('2. Use PurgeCSS or Tailwind purge to remove unused CSS');
  console.log('3. Consider code splitting for large components');
  console.log('4. Use dynamic imports for heavy libraries');
}

// Run analysis
try {
  analyzeImports();
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}


