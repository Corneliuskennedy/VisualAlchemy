# Bilingual System Overhaul - Top 1% Performance Plan
**Goal:** Create a world-class, bulletproof bilingual system that converts

---

## Current Problems

### 1. Content Scattered Everywhere ❌
- `siteContent.ts` - Dutch-only content
- `translations/index.ts` - Some translations, incomplete
- Components have hardcoded `isNL ? "Dutch" : "English"` everywhere
- No single source of truth

### 2. Inconsistent Usage ❌
- Some use `useTranslations()`
- Some use `useLanguage()` directly  
- Some have hardcoded strings
- `useLocalizedContent` only handles homepage

### 3. LanguageContext Issues ❌
- Complex logic with multiple useEffects
- Race conditions potential
- Flags to prevent loops (bandaid solution)
- Not reliable

---

## Solution: Unified Content System

### Architecture

```
src/
  content/
    ├── index.ts              # Main content export (unified)
    ├── homepage.ts           # Homepage content (en/nl)
    ├── services.ts           # Services content (en/nl)
    ├── navigation.ts         # Navigation content (en/nl)
    ├── common.ts             # Common/shared content (en/nl)
    └── types.ts              # TypeScript types
```

### Key Principles

1. **Single Source of Truth** - All content in one organized structure
2. **Type Safety** - Full TypeScript support with autocomplete
3. **Performance** - Memoized hooks, optimized re-renders
4. **Reliability** - Simple LanguageContext, no race conditions
5. **Developer Experience** - Easy to add new content, clear structure

---

## Implementation Steps

### Phase 1: Create Unified Content Structure ✅
- [x] Create content structure
- [ ] Migrate all homepage content
- [ ] Migrate all service pages content
- [ ] Migrate navigation content
- [ ] Migrate common/shared content

### Phase 2: Simplify LanguageContext ✅
- [ ] Refactor to state machine pattern
- [ ] Remove complex useEffects
- [ ] Add proper error handling
- [ ] Test thoroughly

### Phase 3: Create Content Hooks ✅
- [ ] `useContent()` - Main hook for all content
- [ ] `usePageContent(page)` - Page-specific content
- [ ] `useCommonContent()` - Shared content
- [ ] Optimize with memoization

### Phase 4: Update All Components ✅
- [ ] Replace hardcoded strings
- [ ] Update to use new hooks
- [ ] Remove ternary operators
- [ ] Test language switching

### Phase 5: Testing & Polish ✅
- [ ] Test all pages
- [ ] Verify language switching works
- [ ] Check SEO (hreflang tags)
- [ ] Performance audit

---

## Content Structure Example

```typescript
// src/content/homepage.ts
export const homepageContent = {
  en: {
    hero: {
      headline: "Build. Optimize. Create.",
      subline: "We design systems...",
      ctaText: "Discover How"
    },
    segmentation: { ... },
    whyUs: { ... }
  },
  nl: {
    hero: {
      headline: "Build. Optimize. Create.",
      subline: "Wij ontwerpen systemen...",
      ctaText: "Ontdek Hoe"
    },
    segmentation: { ... },
    whyUs: { ... }
  }
};
```

---

## Benefits

✅ **Single Source of Truth** - All content organized  
✅ **Type Safe** - Full TypeScript support  
✅ **Performant** - Optimized re-renders  
✅ **Reliable** - No race conditions  
✅ **Maintainable** - Easy to add/update content  
✅ **SEO Ready** - Proper hreflang implementation  
✅ **Conversion Optimized** - Easy to A/B test content

---

**Status:** Ready to implement



