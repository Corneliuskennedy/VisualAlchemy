# Structured Data Rendering Fix
**Issue:** Structured data (JSON-LD) not appearing in DOM  
**Root Cause:** `react-helmet-async` doesn't properly inject into `<head>` in Next.js App Router  
**Priority:** 🔴 CRITICAL

---

## Problem Analysis

**Current Implementation:**
- `UnifiedSEO` uses `react-helmet-async` (Helmet component)
- Structured data added via `<Helmet><script type="application/ld+json">`
- HelmetProvider is configured in layout
- **But:** Scripts not appearing in DOM

**Why It's Not Working:**
- Next.js App Router has server-rendered `<head>`
- `react-helmet-async` is client-side only
- Helmet can't modify server-rendered head in App Router
- Need to use Next.js Metadata API or direct DOM injection

---

## Solution Options

### Option 1: Use Next.js Metadata API (Recommended)
**Pros:**
- Server-side rendering
- Works with App Router
- Better SEO (crawled immediately)

**Cons:**
- Requires converting pages to server components
- More refactoring needed

### Option 2: Direct DOM Injection (Quick Fix)
**Pros:**
- Works immediately
- No major refactoring
- Client-side injection

**Cons:**
- Not server-rendered
- May not be crawled as quickly

### Option 3: Use next/script Component
**Pros:**
- Next.js native
- Works with App Router
- Can be server-rendered

**Cons:**
- Need to refactor injection method

---

## Recommended Fix: Direct DOM Injection

**Implementation:**
1. Create `StructuredDataInjector` component
2. Use `useEffect` to inject scripts directly into `<head>`
3. Ensure scripts are added after mount
4. Clean up on unmount

**File:** `src/components/SEO/StructuredDataInjector.tsx`

```tsx
'use client';

import { useEffect } from 'react';

interface StructuredDataInjectorProps {
  data: object | object[];
  id?: string;
}

export function StructuredDataInjector({ data, id = 'structured-data' }: StructuredDataInjectorProps) {
  useEffect(() => {
    // Remove existing script if present
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    
    // Append to head
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);

  return null;
}
```

**Update UnifiedSEO:**
- Keep Helmet for meta tags (works for those)
- Use StructuredDataInjector for JSON-LD
- Ensure both work together

---

## Testing

After fix:
1. Check DOM: `document.querySelectorAll('script[type="application/ld+json"]')`
2. Should find multiple scripts
3. Validate with Google Rich Results Test
4. Check Schema.org validator

---

**Status:** Ready to implement  
**Time Estimate:** 30 minutes  
**Impact:** Critical - Fixes SEO feature

