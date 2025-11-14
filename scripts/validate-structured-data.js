#!/usr/bin/env node

/**
 * Structured Data Validation Script
 * 
 * Validates JSON-LD structured data on pages by checking:
 * - Valid JSON syntax
 * - Required @context and @type fields
 * - Date format compliance (ISO 8601)
 * - URL format (absolute URLs)
 * 
 * Usage:
 *   node scripts/validate-structured-data.js [url]
 * 
 * Example:
 *   node scripts/validate-structured-data.js http://localhost:3000
 */

const https = require('https');
const http = require('http');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
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
  // Extract JSON-LD scripts using regex (no external dependencies needed)
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [];
  let match;
  let index = 0;
  
  while ((match = jsonLdRegex.exec(html)) !== null) {
    matches.push({
      index: index++,
      content: match[1].trim(),
      line: 'unknown', // Line numbers not available with regex
    });
  }
  
  return matches;
}

function validateSchema(schema, index) {
  const errors = [];
  const warnings = [];
  
  // Check JSON validity
  let data;
  try {
    data = JSON.parse(schema.content);
  } catch (e) {
    errors.push(`Schema ${index}: Invalid JSON - ${e.message}`);
    return { errors, warnings, data: null };
  }
  
  // Check @context
  if (!data['@context']) {
    errors.push(`Schema ${index}: Missing @context`);
  } else if (data['@context'] !== 'https://schema.org') {
    warnings.push(`Schema ${index}: @context is "${data['@context']}", expected "https://schema.org"`);
  }
  
  // Check @type
  if (!data['@type']) {
    errors.push(`Schema ${index}: Missing @type`);
  }
  
  // Validate date formats (ISO 8601)
  const dateFields = ['datePublished', 'dateModified', 'dateCreated', 'uploadDate'];
  dateFields.forEach(field => {
    if (data[field]) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
      if (!dateRegex.test(data[field])) {
        warnings.push(`Schema ${index}: ${field} format may be invalid: "${data[field]}"`);
      }
    }
  });
  
  // Check for relative URLs (should be absolute)
  function checkUrls(obj, path = '') {
    if (typeof obj === 'string' && obj.startsWith('/') && !obj.startsWith('//')) {
      warnings.push(`Schema ${index}: Relative URL found at ${path}: "${obj}"`);
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        checkUrls(obj[key], path ? `${path}.${key}` : key);
      });
    }
  }
  
  checkUrls(data);
  
  // Type-specific validations
  if (data['@type'] === 'Organization') {
    if (!data.name) warnings.push(`Schema ${index}: Organization missing name`);
    if (!data.url) warnings.push(`Schema ${index}: Organization missing url`);
  }
  
  if (data['@type'] === 'Article') {
    if (!data.headline) warnings.push(`Schema ${index}: Article missing headline`);
    if (!data.datePublished) warnings.push(`Schema ${index}: Article missing datePublished`);
  }
  
  if (data['@type'] === 'FAQPage' && Array.isArray(data.mainEntity)) {
    data.mainEntity.forEach((item, i) => {
      if (!item['@type']) {
        errors.push(`Schema ${index}: FAQ item ${i} missing @type`);
      }
      if (!item.question) {
        errors.push(`Schema ${index}: FAQ item ${i} missing question`);
      }
      if (!item.answer) {
        errors.push(`Schema ${index}: FAQ item ${i} missing answer`);
      }
    });
  }
  
  return { errors, warnings, data };
}

async function validatePage(url) {
  log(`\n🔍 Validating structured data for: ${url}\n`, 'blue');
  
  try {
    const html = await fetchHTML(url);
    const schemas = extractStructuredData(html);
    
    if (schemas.length === 0) {
      log('⚠️  No structured data found on this page', 'yellow');
      return { valid: false, errors: ['No structured data found'], warnings: [] };
    }
    
    log(`Found ${schemas.length} structured data schema(s)\n`, 'green');
    
    const allErrors = [];
    const allWarnings = [];
    const schemaTypes = [];
    
    schemas.forEach((schema) => {
      const { errors, warnings, data } = validateSchema(schema, schema.index);
      
      if (data) {
        schemaTypes.push(data['@type'] || 'Unknown');
        log(`  Schema ${schema.index}: ${data['@type'] || 'Unknown'}`, 'blue');
      }
      
      allErrors.push(...errors);
      allWarnings.push(...warnings);
    });
    
    // Summary
    log(`\n📊 Summary:`, 'blue');
    log(`  Types found: ${schemaTypes.join(', ')}`, 'blue');
    log(`  Errors: ${allErrors.length}`, allErrors.length > 0 ? 'red' : 'green');
    log(`  Warnings: ${allWarnings.length}`, allWarnings.length > 0 ? 'yellow' : 'green');
    
    // Display errors
    if (allErrors.length > 0) {
      log(`\n❌ Errors:`, 'red');
      allErrors.forEach(error => log(`  • ${error}`, 'red'));
    }
    
    // Display warnings
    if (allWarnings.length > 0) {
      log(`\n⚠️  Warnings:`, 'yellow');
      allWarnings.forEach(warning => log(`  • ${warning}`, 'yellow'));
    }
    
    if (allErrors.length === 0 && allWarnings.length === 0) {
      log(`\n✅ All structured data is valid!`, 'green');
    }
    
    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings,
      schemas: schemaTypes,
    };
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    return { valid: false, errors: [error.message], warnings: [] };
  }
}

// Main execution
const url = process.argv[2] || 'http://localhost:3000';

if (!url.startsWith('http')) {
  log('❌ Please provide a valid URL (e.g., http://localhost:3000)', 'red');
  process.exit(1);
}

validatePage(url)
  .then((result) => {
    process.exit(result.valid ? 0 : 1);
  })
  .catch((error) => {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });

