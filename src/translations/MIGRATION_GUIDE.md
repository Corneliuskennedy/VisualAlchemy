# Translation System Migration Guide

## Overview

This guide helps you migrate from the monolithic translation system to the new modular, type-safe translation system.

## What's Changed

### Before (Monolithic)
```typescript
// Single massive file: src/translations/index.ts (1,446 lines)
import { translations } from '@/translations';
const { t } = useLanguage();
const text = t('hero', 'title1');
```

### After (Modular)
```typescript
// Modular files organized by section
import { useTranslations } from '@/hooks/useTranslations';
const { t } = useTranslations();
const text = t('hero', 'title1'); // Type-safe with autocomplete
```

## Benefits of the New System

1. **Type Safety**: TypeScript interfaces ensure translation keys exist
2. **Modularity**: Translations split into logical sections
3. **Maintainability**: Easier to find and update specific translations
4. **Developer Experience**: Autocomplete and IntelliSense support
5. **Validation**: Built-in tools to check for missing translations

## Migration Steps

### Step 1: Update Import Statements

**Old:**
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
const { t } = useLanguage();
```

**New:**
```typescript
import { useTranslations } from '@/hooks/useTranslations';
const { t } = useTranslations();
```

### Step 2: Use New Translation Components (Optional)

**Old:**
```typescript
<p>{t('hero', 'subtitle')}</p>
```

**New:**
```typescript
import { TranslatedText } from '@/components/TranslationProvider';

<TranslatedText 
  section="hero" 
  key="subtitle" 
  fallback="Default subtitle"
  as="p"
/>
```

### Step 3: Access Entire Sections

**Old:**
```typescript
const heroTitle = t('hero', 'title1');
const heroSubtitle = t('hero', 'subtitle');
```

**New:**
```typescript
const { getSection } = useTranslations();
const heroSection = getSection('hero');
// Now you have access to all hero translations with type safety
```

## File Structure

```
src/translations/
├── types.ts                    # TypeScript interfaces
├── index.ts                    # Legacy monolithic file (being phased out)
├── modular/
│   └── index.ts               # New modular index
└── sections/
    ├── navigation.ts          # Navigation translations
    ├── hero.ts               # Hero section translations
    ├── cta.ts                # CTA translations
    └── ...                   # More sections to be added
```

## Adding New Translation Sections

### 1. Define Types
Add interfaces to `src/translations/types.ts`:

```typescript
export interface NewSectionTranslations {
  title: string;
  description: string;
  items: {
    item1: string;
    item2: string;
  };
}
```

### 2. Create Section File
Create `src/translations/sections/newSection.ts`:

```typescript
import { NewSectionTranslations } from '../types';

export const newSection: Record<'en' | 'nl', NewSectionTranslations> = {
  en: {
    title: "English Title",
    description: "English description",
    items: {
      item1: "Item 1",
      item2: "Item 2"
    }
  },
  nl: {
    title: "Nederlandse Titel",
    description: "Nederlandse beschrijving",
    items: {
      item1: "Item 1",
      item2: "Item 2"
    }
  }
};
```

### 3. Update Modular Index
Add to `src/translations/modular/index.ts`:

```typescript
import { newSection } from '../sections/newSection';

export const modularTranslations: Translations = {
  en: {
    // ... existing sections
    newSection: newSection.en,
  },
  nl: {
    // ... existing sections
    newSection: newSection.nl,
  }
};
```

## Validation Tools

### Check for Missing Translations
```typescript
import { validateTranslations } from '@/utils/translationUtils';
import { modularTranslations } from '@/translations/modular';

const missingKeys = validateTranslations(modularTranslations);
console.log('Missing translations:', missingKeys);
```

### Extract All Translation Keys
```typescript
import { extractTranslationKeys } from '@/utils/translationUtils';

const keys = extractTranslationKeys(modularTranslations.en);
console.log('All translation keys:', keys);
```

## Best Practices

### 1. Use Descriptive Keys
```typescript
// Good
t('hero', 'mainTitle')
t('navigation', 'menu.contact')

// Avoid
t('hero', 'title1')
t('nav', 'c')
```

### 2. Group Related Translations
```typescript
// Group by feature or page
t('contactPage', 'form.name')
t('contactPage', 'form.email')
t('contactPage', 'form.submit')
```

### 3. Use Fallbacks
```typescript
<TranslatedText 
  section="hero" 
  key="title" 
  fallback="Welcome to our site"
/>
```

### 4. Leverage Type Safety
```typescript
const { getSection } = useTranslations();
const heroSection = getSection('hero');
// TypeScript will provide autocomplete for heroSection.title, etc.
```

## Troubleshooting

### Missing Translation Keys
If you see `section.key` in the UI, it means the translation is missing. Check:
1. The key exists in the English translations
2. The key exists in other language translations
3. The section is properly imported in the modular index

### Type Errors
If you get TypeScript errors:
1. Ensure the interface is defined in `types.ts`
2. Check that the actual translation structure matches the interface
3. Use type assertions (`as any`) temporarily if needed

### Performance
The new system is designed to be performant, but if you notice issues:
1. Use `useMemo` for expensive translation operations
2. Consider using `TranslatedText` components for static content
3. Use `getSection` to get multiple translations at once

## Migration Checklist

- [ ] Update import statements in components
- [ ] Replace `useLanguage` with `useTranslations` where appropriate
- [ ] Test all translation keys work correctly
- [ ] Add missing translations for non-English languages
- [ ] Update any custom translation logic
- [ ] Remove unused translation imports
- [ ] Test the application thoroughly

## Support

If you encounter issues during migration:
1. Check the console for missing translation warnings
2. Use the validation tools to identify missing keys
3. Refer to the existing monolithic file for reference
4. Create an issue with specific error details 