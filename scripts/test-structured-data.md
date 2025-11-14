# Structured Data Testing Guide

This guide helps you test structured data with Google Rich Results Test and other validation tools.

## Quick Start

### 1. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

**Steps:**
1. Build your application: `npm run build && npm start`
2. Navigate to the page you want to test (e.g., `http://localhost:3000`)
3. Copy the full HTML source (View Page Source)
4. Go to Google Rich Results Test
5. Click "Test Code" tab
6. Paste the HTML source
7. Review any errors or warnings

**Alternative:** Use the "Test URL" tab if your site is deployed

### 2. Schema.org Validator

**URL:** https://validator.schema.org/

**Steps:**
1. Extract JSON-LD from your page source
2. Paste into Schema.org Validator
3. Review validation results

### 3. Automated Testing Script

Run the automated test script:

```bash
npm run test:structured-data
```

## Pages to Test

### Critical Pages (Test First)
- `/` - Homepage (Organization, WebSite, FAQ schemas)
- `/about-us` - About page (Person schemas)
- `/services` - Services page (Service schemas)
- `/contact` - Contact page (LocalBusiness schema)

### Service Pages
- `/services/ai-automation-amsterdam`
- `/services/crm-buildouts`
- `/services/lead-generation`
- `/services/project-management`
- `/services/sops-consulting`
- `/services/startup-kickoff-lab`

### Blog Pages
- `/blog` - Blog listing (CollectionPage schema)
- `/blog/[slug]` - Individual posts (Article schema)

## Expected Schemas by Page

### Homepage (`/`)
- ✅ Organization schema
- ✅ WebSite schema (with searchAction)
- ✅ FAQPage schema (5 FAQs)
- ✅ BreadcrumbList schema

### Service Pages
- ✅ Service schema
- ✅ FAQPage schema (4 FAQs)
- ✅ BreadcrumbList schema
- ✅ Organization schema (via UnifiedSEO)

### Blog Posts
- ✅ Article schema
- ✅ Person schema (author)
- ✅ Organization schema
- ✅ BreadcrumbList schema

### About Page
- ✅ Person schemas (team members)
- ✅ Organization schema
- ✅ BreadcrumbList schema

## Common Issues & Fixes

### Issue: Missing required fields
**Fix:** Check `src/components/SEO/UnifiedSEO.tsx` and ensure all required fields are populated

### Issue: Invalid date format
**Fix:** Ensure dates are in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)

### Issue: Duplicate schemas
**Fix:** Check that schemas aren't being rendered multiple times

### Issue: Missing @context
**Fix:** Ensure all JSON-LD includes `"@context": "https://schema.org"`

## Testing Checklist

- [ ] Homepage structured data validates
- [ ] All service pages validate
- [ ] Blog posts validate
- [ ] Person schemas validate
- [ ] FAQ schemas validate
- [ ] Breadcrumb schemas validate
- [ ] No duplicate schemas
- [ ] All dates in ISO 8601 format
- [ ] All URLs are absolute
- [ ] Images have proper dimensions

## Automated Validation

Create a test script to validate structured data:

```typescript
// scripts/validate-structured-data.ts
import { JSDOM } from 'jsdom';

async function validateStructuredData(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');
  
  const errors: string[] = [];
  
  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || '');
      
      // Validate @context
      if (!data['@context']) {
        errors.push(`Schema ${index}: Missing @context`);
      }
      
      // Validate @type
      if (!data['@type']) {
        errors.push(`Schema ${index}: Missing @type`);
      }
      
      // Check for common issues
      if (data.datePublished && !/^\d{4}-\d{2}-\d{2}/.test(data.datePublished)) {
        errors.push(`Schema ${index}: Invalid datePublished format`);
      }
      
    } catch (e) {
      errors.push(`Schema ${index}: Invalid JSON - ${e}`);
    }
  });
  
  return errors;
}
```

## Resources

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Structured Data Testing Tool](https://developers.google.com/search/docs/appearance/structured-data)
- [JSON-LD Playground](https://json-ld.org/playground/)

