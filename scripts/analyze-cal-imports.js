#!/usr/bin/env node

/**
 * Script to analyze all Cal.com imports in the codebase
 * Helps identify which files are importing Cal.com and might cause SSR issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '..', 'src');

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (!file.startsWith('.') && file !== 'node_modules') {
        findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(srcDir, filePath);
  
  const calImports = [];
  
  // Check for direct imports
  if (content.includes('@calcom/embed-react')) {
    calImports.push({
      type: 'direct',
      line: content.split('\n').findIndex(line => line.includes('@calcom/embed-react')) + 1
    });
  }
  
  // Check for hook imports
  if (content.includes('useCal') || content.includes('use-cal')) {
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('useCal') || line.includes('use-cal')) {
        calImports.push({
          type: 'hook',
          line: index + 1,
          content: line.trim()
        });
      }
    });
  }
  
  // Check for CalIntroCallClient
  if (content.includes('CalIntroCallClient')) {
    calImports.push({
      type: 'component',
      line: content.split('\n').findIndex(line => line.includes('CalIntroCallClient')) + 1
    });
  }
  
  // Check for data-cal attributes (these are fine, just informational)
  const dataCalMatches = content.match(/data-cal-[a-z-]+/g);
  if (dataCalMatches) {
    calImports.push({
      type: 'attribute',
      count: dataCalMatches.length
    });
  }
  
  return calImports.length > 0 ? { file: relativePath, imports: calImports } : null;
}

console.log('🔍 Analyzing Cal.com imports...\n');

const files = findFiles(srcDir);
const results = files
  .map(analyzeFile)
  .filter(Boolean);

console.log(`Found ${results.length} files with Cal.com references:\n`);

results.forEach(({ file, imports }) => {
  console.log(`📄 ${file}`);
  imports.forEach(imp => {
    if (imp.type === 'direct') {
      console.log(`   ⚠️  Direct import @calcom/embed-react (line ${imp.line})`);
    } else if (imp.type === 'hook') {
      console.log(`   ⚠️  Hook usage (line ${imp.line}): ${imp.content.substring(0, 60)}...`);
    } else if (imp.type === 'component') {
      console.log(`   ⚠️  CalIntroCallClient component (line ${imp.line})`);
    } else if (imp.type === 'attribute') {
      console.log(`   ℹ️  data-cal-* attributes (${imp.count} found)`);
    }
  });
  console.log('');
});

// Summary
const directImports = results.filter(r => r.imports.some(i => i.type === 'direct')).length;
const hookImports = results.filter(r => r.imports.some(i => i.type === 'hook')).length;
const componentImports = results.filter(r => r.imports.some(i => i.type === 'component')).length;

console.log('\n📊 Summary:');
console.log(`   Direct imports: ${directImports}`);
console.log(`   Hook imports: ${hookImports}`);
console.log(`   Component imports: ${componentImports}`);
console.log(`   Total files with Cal.com references: ${results.length}`);

// Check if any are in app directory (these are the problematic ones)
const appFiles = results.filter(r => r.file.startsWith('app/'));
if (appFiles.length > 0) {
  console.log('\n⚠️  Files in app/ directory that might cause SSR issues:');
  appFiles.forEach(({ file, imports }) => {
    const hasDirectOrHook = imports.some(i => i.type === 'direct' || i.type === 'hook' || i.type === 'component');
    if (hasDirectOrHook) {
      console.log(`   - ${file}`);
    }
  });
}

