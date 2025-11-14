# Structured Data Testing Guide
**Date:** January 2025  
**Status:** Testing Instructions

---

## ✅ Implementation Complete

The structured data components have been created and integrated:
- ✅ `StructuredDataInjector` component
- ✅ `UnifiedSEO` updated to use injector
- ✅ `AdvancedStructuredData` updated

---

## 🔍 Testing Structured Data

### Important Note: Client-Side Injection

**The structured data is injected client-side** using `useEffect`, so it won't appear in the server-rendered HTML source. This is normal and expected behavior.

### Method 1: Browser Console (Recommended)

1. **Open your site** in the browser (http://localhost:3000)
2. **Open DevTools** (F12 or Cmd+Option+I)
3. **Go to Console tab**
4. **Run this command:**
   ```javascript
   document.querySelectorAll('script[type="application/ld+json"]')
   ```
5. **Expected Result:** Should see 5+ script elements

**To see the actual data:**
```javascript
Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => JSON.parse(s.textContent))
```

### Method 2: Elements Tab

1. **Open DevTools → Elements tab**
2. **Press Cmd+F (Mac) or Ctrl+F (Windows)**
3. **Search for:** `application/ld+json`
4. **Expected Result:** Should find multiple script tags

### Method 3: Network Tab

1. **Open DevTools → Network tab**
2. **Reload the page**
3. **Filter by:** `Doc` or `Document`
4. **Click on the main document**
5. **Go to Response tab**
6. **Search for:** `application/ld+json`
7. **Note:** May not show if injected client-side

### Method 4: View Page Source (Limited)

1. **Right-click → View Page Source**
2. **Search for:** `application/ld+json`
3. **Note:** Won't show client-side injected scripts
4. **This is expected** - scripts are added after page load

---

## ✅ Validation Tests

### Test 1: Count Scripts

**Expected:** 5+ JSON-LD scripts on homepage

```javascript
document.querySelectorAll('script[type="application/ld+json"]').length
```

### Test 2: Check Schema Types

**Expected:** Should include:
- Organization
- LocalBusiness
- WebSite
- BreadcrumbList
- FAQPage (homepage)

```javascript
const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(s => JSON.parse(s.textContent))
  .map(s => s['@type']);

console.log('Schema types:', schemas);
```

### Test 3: Validate JSON

**Check for valid JSON:**

```javascript
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
let valid = 0;
let invalid = 0;

scripts.forEach((script, i) => {
  try {
    JSON.parse(script.textContent);
    valid++;
  } catch (e) {
    console.error(`Script ${i} invalid:`, e);
    invalid++;
  }
});

console.log(`Valid: ${valid}, Invalid: ${invalid}`);
```

---

## 🌐 Google Rich Results Test

### Steps:

1. **Go to:** https://search.google.com/test/rich-results
2. **Enter URL:** Your production URL or localhost:3000 (if accessible)
3. **Click "Test URL"**
4. **Review Results**

### Expected Results:

- ✅ No errors
- ✅ Rich results eligible
- ✅ Organization schema recognized
- ✅ LocalBusiness schema recognized
- ✅ WebSite schema recognized

### If Testing Localhost:

**Note:** Google's tool may not be able to access localhost. Options:
1. Deploy to staging/production
2. Use ngrok to expose localhost
3. Test manually in browser console

---

## 🔧 Troubleshooting

### No Scripts Found?

1. **Check if UnifiedSEO is being used:**
   - Look for `<UnifiedSEO` in page component
   - Check if it's imported correctly

2. **Check browser console for errors:**
   - Look for React errors
   - Check for JavaScript errors

3. **Verify component is client-side:**
   - StructuredDataInjector uses `'use client'`
   - Should be in client component

4. **Check React Query:**
   - Ensure page is fully loaded
   - Wait for hydration to complete

### Scripts Found But Invalid?

1. **Check JSON syntax:**
   - Use JSON.parse() to validate
   - Check for trailing commas
   - Verify all strings are quoted

2. **Check schema structure:**
   - Verify @context is present
   - Verify @type is present
   - Check required fields

---

## 📊 Success Criteria

**Day 1 Complete When:**
- ✅ 5+ JSON-LD scripts found in browser DOM
- ✅ All scripts have valid JSON
- ✅ Expected schema types present
- ✅ Google Rich Results Test passes (if accessible)
- ✅ No console errors

---

## 🚀 Next Steps After Testing

1. **If tests pass:** Mark Day 1 complete, move to Day 2-3
2. **If issues found:** Fix errors, re-test
3. **Document results:** Update CEO_STRATEGIC_PLAN.md

---

## 💡 Quick Test Script

Save this as a browser bookmarklet for quick testing:

```javascript
javascript:(function(){
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  console.log(`Found ${scripts.length} structured data scripts`);
  const types = Array.from(scripts).map(s => {
    try {
      return JSON.parse(s.textContent)['@type'];
    } catch(e) {
      return 'INVALID';
    }
  });
  console.log('Schema types:', types);
  console.log('Full schemas:', Array.from(scripts).map(s => JSON.parse(s.textContent)));
})();
```

---

**Status:** Ready for testing  
**Next Action:** Test in browser console

