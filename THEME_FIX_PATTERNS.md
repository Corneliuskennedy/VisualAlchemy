# Theme Fix Patterns Reference
**Quick Reference Guide for Fixing Hardcoded Colors**

---

## 🎨 Common Color Mappings

### Background Colors

| Hardcoded | Replace With | Notes |
|-----------|--------------|-------|
| `#0A0A0A` | `bg-background` | Main dark background |
| `bg-gray-900` | `bg-background` or `bg-gray-900 dark:bg-background` | Dark backgrounds |
| `bg-gray-800` | `bg-secondary` or `bg-gray-800 dark:bg-secondary` | Secondary backgrounds |

### Text Colors

| Hardcoded | Replace With | Notes |
|-----------|--------------|-------|
| `text-gray-300` | `text-foreground` or `text-gray-300 dark:text-gray-100` | Main text |
| `text-gray-400` | `text-muted-foreground` or `text-gray-400 dark:text-gray-300` | Muted text |
| `#4585f4` | `text-[#4585f4] dark:text-[#6B8AE6]` | Brand primary (keep hex, add dark) |
| `#6B8AE6` | `text-[#4585f4] dark:text-[#6B8AE6]` | Brand secondary |

### Border Colors

| Hardcoded | Replace With | Notes |
|-----------|--------------|-------|
| `border-gray-800` | `border-border` or `border-gray-800 dark:border-border` | Standard borders |
| `border-gray-700` | `border-border` or `border-gray-700 dark:border-border` | Subtle borders |

---

## 📝 Fix Patterns

### Pattern 1: Simple Replacement

**Before:**
```tsx
className="bg-[#0A0A0A] text-gray-300"
```

**After:**
```tsx
className="bg-background text-foreground"
```

### Pattern 2: Add Dark Variant

**Before:**
```tsx
className="text-gray-300 bg-gray-900"
```

**After:**
```tsx
className="text-gray-300 dark:text-gray-100 bg-gray-900 dark:bg-background"
```

### Pattern 3: Brand Colors (Keep but Add Dark)

**Before:**
```tsx
className="text-[#4585f4]"
```

**After:**
```tsx
className="text-[#4585f4] dark:text-[#6B8AE6]"
```

### Pattern 4: Complex Classes

**Before:**
```tsx
className="bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
```

**After:**
```tsx
className="bg-gray-900 dark:bg-background border-gray-800 dark:border-border text-gray-300 dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-secondary"
```

---

## 🔍 Common Issues Found

### Issue 1: Hex Colors Without Dark Variants
- **Fix:** Add `dark:` variant or replace with theme variable

### Issue 2: Tailwind Gray Colors
- **Fix:** Replace with theme variables or add dark variants

### Issue 3: Brand Colors (#4585f4, #6B8AE6)
- **Fix:** Keep hex but add dark variant for consistency

---

## ✅ Checklist for Each File

- [ ] Replace `#0A0A0A` with `bg-background`
- [ ] Replace `text-gray-300` with `text-foreground` or add dark variant
- [ ] Replace `bg-gray-900` with `bg-background` or add dark variant
- [ ] Add `dark:` variants for all color classes
- [ ] Test in both light and dark mode
- [ ] Verify no visual regressions

---

## 🚀 Quick Fix Script Pattern

For each hardcoded color:
1. Identify if it's background, text, or border
2. Check if theme variable exists
3. Replace or add dark variant
4. Test theme switching

---

**Status:** Reference guide ready  
**Use with:** THEME_FIX_PRIORITY_PLAN.md

