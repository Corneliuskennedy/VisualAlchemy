# SEO Component Migration Guide

## Overview

This guide helps migrate from the old `SEO` and `Meta` components to the new `UnifiedSEO` component that fixes all Ahrefs issues.

## Key Improvements

1. **Title Length**: Automatically truncates titles to 60 characters with proper ellipsis
2. **Meta Description Length**: Automatically truncates descriptions to 160 characters
3. **OG URL**: Always matches canonical URL 
4. **Language Detection**: Detects language from URL path directly (more reliable)
5. **Unified API**: Single component with consistent props across all pages

## Migration Steps

### 1. Update Imports

**Old:**
```tsx
import { SEO } from '@/components/SEO';
// or
import { Meta } from '@/components/SEO/Meta';
```

**New:**
```tsx
import { UnifiedSEO } from '@/components/SEO';
```

### 2. Update Component Usage

#### Basic Page (from SEO component)

**Old:**
```tsx
<SEO 
  title="Page Title"
  meta_description="Page description"
  page_type="service"
/>
```

**New:**
```tsx
<UnifiedSEO 
  title="Page Title"
  description="Page description"
  pageType="service"
/>
```

#### Basic Page (from Meta component)

**Old:**
```tsx
<Meta 
  title="Page Title"
  description="Page description"
  h1="Hidden H1 for accessibility"
/>
```

**New:**
```tsx
<UnifiedSEO 
  title="Page Title"
  description="Page description"
  h1="Hidden H1 for accessibility"
/>
```

### 3. Prop Changes

| Old Prop (SEO) | Old Prop (Meta) | New Prop (UnifiedSEO) |
|----------------|-----------------|------------------------|
| meta_description | description | description |
| page_type | - | pageType |
| meta_keywords | keywords | keywords |
| og_title | - | (auto-generated from title) |
| og_description | - | (auto-generated from description) |
| og_image | ogImage | ogImage |
| canonical_url | canonicalUrl | canonicalUrl |
| structured_data | - | (auto-generated) |

### 4. Page Type Values

The `pageType` prop now uses these values:
- `'home'` - Homepage
- `'service'` - Service pages
- `'blog'` - Blog listing page
- `'blogPost'` - Individual blog posts
- `'article'` - Article pages
- `'report'` - Report pages
- `'contact'` - Contact page
- `'about'` - About page

### 5. Examples by Page Type

#### Homepage
```tsx
<UnifiedSEO 
  title="Stop reacting. Start directing."
  description="In our 4-hour workshop, we teach your team..."
  h1="Stop reacting. Start directing."
  pageType="home"
/>
```

#### Service Page
```tsx
<UnifiedSEO 
  title="AI Automation Amsterdam"
  description="Expert AI automation services in Amsterdam..."
  pageType="service"
  serviceType="AI Automation Consulting"
  areaServed="Amsterdam"
/>
```

#### Blog Post
```tsx
<UnifiedSEO 
  title={blog.title}
  description={blog.excerpt}
  pageType="blogPost"
  author={blog.author}
  publishedTime={blog.published_at}
  modifiedTime={blog.updated_at}
  keywords={blog.tags}
  ogImage={blog.cover_image}
/>
```

#### Report Page
```tsx
<UnifiedSEO 
  title="State of AI in Dutch SMEs 2025"
  description="Comprehensive report on AI adoption..."
  pageType="report"
  publishedTime="2025-01-01"
/>
```

## Common Migration Patterns

### 1. Pages using getDefaultMetadata

**Old:**
```tsx
const metadata = getDefaultMetadata(location.pathname);

<SEO 
  title={metadata.title}
  meta_description={metadata.meta_description}
  // ... other props
/>
```

**New:**
```tsx
// Just pass the specific values you want to override
<UnifiedSEO 
  title="Your Page Title"
  description="Your page description"
/>
```

### 2. Dynamic Titles with Translations

**Old:**
```tsx
const pageTitle = isNL 
  ? 'AI in Dutch SMEs 2025 | Onderzoeksrapport | Octomatic'
  : 'AI Dutch SMEs 2025 | Research Report | Octomatic';

<SEO title={pageTitle} />
```

**New:**
```tsx
// Don't include "| Octomatic" - it's added automatically
const pageTitle = isNL 
  ? 'AI in Dutch SMEs 2025 | Onderzoeksrapport'
  : 'AI Dutch SMEs 2025 | Research Report';

<UnifiedSEO title={pageTitle} />
```

### 3. Conditional noIndex

**Old:**
```tsx
{!blog && <SEO title="Blog Post Not Found" />}
```

**New:**
```tsx
{!blog && <UnifiedSEO title="Blog Post Not Found" noIndex={true} />}
```

## Testing After Migration

1. **Title Length**: Check that titles are under 60 characters in the browser
2. **Description Length**: Check meta descriptions are under 160 characters
3. **Language Detection**: Verify HTML lang attribute matches the URL (/nl = 'nl', others = 'en')
4. **OG Tags**: Use Facebook Debugger to verify OG tags
5. **Structured Data**: Use Google's Rich Results Test

## Checklist for Each Page

- [ ] Import changed to UnifiedSEO
- [ ] Props updated (meta_description → description, page_type → pageType)
- [ ] Removed "| Octomatic" from titles (added automatically)
- [ ] Verified title length < 60 chars
- [ ] Verified description length < 160 chars
- [ ] Tested language detection (EN vs NL)
- [ ] Checked canonical URL is correct
- [ ] Verified OG URL matches canonical 