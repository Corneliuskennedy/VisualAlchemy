#!/usr/bin/env node

/**
 * Test Structured Data DOM Rendering
 * 
 * Starts a dev server, opens homepage, and checks if structured data
 * scripts are present in the DOM.
 * 
 * Usage:
 *   node scripts/test-structured-data-dom.js
 * 
 * Prerequisites:
 *   - Dev server should be running on localhost:3000
 *   - Or provide URL as argument: node scripts/test-structured-data-dom.js http://localhost:3000
 */

const http = require('http');

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

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractStructuredData(html) {
  // Extract JSON-LD scripts
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [];
  let match;
  let index = 0;
  
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1].trim());
      matches.push({
        index: index++,
        type: data['@type'] || 'Unknown',
        context: data['@context'] || 'Missing',
        id: match[0].match(/id=["']([^"']+)["']/)?.[1] || 'no-id',
        content: data,
      });
    } catch (e) {
      matches.push({
        index: index++,
        type: 'Invalid JSON',
        context: 'Error',
        id: 'error',
        error: e.message,
      });
    }
  }
  
  return matches;
}

async function testStructuredData(url) {
  log(`\n🔍 Testing structured data rendering for: ${url}\n`, 'cyan');
  
  try {
    log('Fetching HTML...', 'blue');
    const html = await fetchHTML(url);
    
    log('Extracting structured data scripts...', 'blue');
    const schemas = extractStructuredData(html);
    
    log(`\n📊 Results:\n`, 'cyan');
    log(`Found ${schemas.length} structured data script(s)`, schemas.length >= 5 ? 'green' : schemas.length > 0 ? 'yellow' : 'red');
    
    if (schemas.length === 0) {
      log('\n❌ No structured data found in HTML!', 'red');
      log('   This could mean:', 'yellow');
      log('   1. StructuredDataInjector is not rendering', 'yellow');
      log('   2. Scripts are injected client-side only (check browser console)', 'yellow');
      log('   3. Component is not being used on this page', 'yellow');
      log('\n💡 Tip: Check browser console for client-side injected scripts', 'cyan');
      return { success: false, count: 0 };
    }
    
    log('\n📋 Schema Details:\n', 'cyan');
    schemas.forEach((schema, i) => {
      log(`  ${i + 1}. ${schema.type}`, 'blue');
      log(`     Context: ${schema.context}`, 'blue');
      log(`     ID: ${schema.id}`, 'blue');
      if (schema.error) {
        log(`     ⚠️  Error: ${schema.error}`, 'red');
      }
    });
    
    // Check for expected schemas
    const expectedTypes = ['Organization', 'LocalBusiness', 'WebSite', 'BreadcrumbList'];
    const foundTypes = schemas.map(s => s.type);
    const missingTypes = expectedTypes.filter(type => !foundTypes.includes(type));
    
    if (missingTypes.length > 0) {
      log(`\n⚠️  Missing expected schema types: ${missingTypes.join(', ')}`, 'yellow');
    }
    
    // Success criteria
    const success = schemas.length >= 5 && missingTypes.length === 0;
    
    if (success) {
      log(`\n✅ SUCCESS: Structured data is rendering correctly!`, 'green');
      log(`   Found ${schemas.length} schemas (target: 5+)`, 'green');
      log(`   All expected types present`, 'green');
    } else {
      log(`\n⚠️  PARTIAL: Structured data found but may need improvement`, 'yellow');
      if (schemas.length < 5) {
        log(`   Found ${schemas.length} schemas (target: 5+)`, 'yellow');
      }
      if (missingTypes.length > 0) {
        log(`   Missing types: ${missingTypes.join(', ')}`, 'yellow');
      }
    }
    
    log(`\n💡 Next Steps:`, 'cyan');
    log(`   1. Validate schemas: npm run test:structured-data`, 'cyan');
    log(`   2. Test with Google Rich Results Test: https://search.google.com/test/rich-results`, 'cyan');
    log(`   3. Check browser console for client-side injected scripts`, 'cyan');
    
    return { success, count: schemas.length, schemas };
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    log(`\n💡 Make sure dev server is running: npm run dev`, 'cyan');
    return { success: false, error: error.message };
  }
}

// Main execution
const url = process.argv[2] || 'http://localhost:3000';

if (!url.startsWith('http')) {
  log('❌ Please provide a valid URL (e.g., http://localhost:3000)', 'red');
  process.exit(1);
}

testStructuredData(url)
  .then((result) => {
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });

