# Octomatic Website Architecture
**Version:** 2.0  
**Last Updated:** January 2025  
**Framework:** Next.js 15.5.3 (App Router)

---

## 🏗️ System Overview

The Octomatic website is built on a modern, scalable architecture designed for:
- **Performance:** Core Web Vitals optimization, lazy loading, code splitting
- **SEO:** Comprehensive structured data, internationalization, modern SEO (2025)
- **Conversion:** AI-powered personalization, A/B testing, analytics
- **Accessibility:** WCAG 2.1 AA+ compliance, keyboard navigation, screen readers
- **Maintainability:** TypeScript strict mode, component-based architecture, clear separation of concerns

---

## 📁 Directory Structure

```
octomatic-next/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── [segment]/         # Route segments
│   │   └── [dynamic]/         # Dynamic routes
│   │
│   ├── components/             # React components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── sections/          # Page sections
│   │   ├── personalization/   # AI-powered components
│   │   ├── SEO/              # SEO components
│   │   ├── forms/            # Form components
│   │   └── realtime/         # Real-time features
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── personalization/  # ML-based personalization
│   │   ├── analytics/        # Analytics & tracking
│   │   ├── performance/     # Performance optimization
│   │   ├── animations/      # Animation engine
│   │   └── state/            # State management
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── contexts/              # React contexts
│   ├── content/               # Content management
│   ├── translations/          # i18n translations
│   └── types/                 # TypeScript types
│
├── public/                    # Static assets
├── tests/                     # Test files
└── docs/                      # Documentation
```

---

## 🎯 Core Architecture Principles

### 1. Component-Based Architecture

**Pattern:** Atomic Design + Feature-Based Organization

```
components/
├── ui/              # Atoms (Button, Input, Card)
├── sections/        # Molecules (Hero, Pricing, CTA)
├── personalization/ # Features (SmartCTA, IntentDetector)
└── SEO/            # Domain-specific (StructuredData, Meta)
```

**Benefits:**
- Reusability across pages
- Clear component hierarchy
- Easy to test and maintain
- Type-safe props with TypeScript

---

### 2. Data Flow Architecture

**Pattern:** Unidirectional Data Flow + Context API

```
User Action
    ↓
Component Event Handler
    ↓
Hook/Context Update
    ↓
State Change
    ↓
Re-render (Optimized)
```

**Key Flows:**

1. **Content Flow:**
   ```
   Content Files (content/*.ts)
       ↓
   Content Hooks (hooks/useContent.ts)
       ↓
   Components (via props)
   ```

2. **Language Flow:**
   ```
   LanguageContext (contexts/LanguageContext.tsx)
       ↓
   URL Middleware (middleware.ts)
       ↓
   Content Selection (hooks/useContent.ts)
       ↓
   Component Rendering
   ```

3. **Personalization Flow:**
   ```
   Behavior Tracking (hooks/useBehaviorTracking.ts)
       ↓
   Intent Detection (lib/personalization/IntentDetector.ts)
       ↓
   Content Optimization (lib/personalization/ContentOptimizer.ts)
       ↓
   Smart Component Rendering
   ```

---

### 3. Performance Architecture

**Strategy:** Progressive Enhancement + Lazy Loading

**Implementation:**
- **Server Components:** Default (no 'use client')
- **Client Components:** Only when needed (interactivity, hooks)
- **Code Splitting:** Route-based + component-based
- **Image Optimization:** Next/Image with WebP/AVIF
- **Font Optimization:** Next/font with display: swap

**Performance Features:**
- Predictive prefetching (`lib/performance/Prefetcher.ts`)
- Image optimization with blur-up (`lib/performance/ImageOptimizer.ts`)
- Real-time performance monitoring (`components/performance/Monitor.tsx`)

---

### 4. SEO Architecture

**Strategy:** Multi-Layer SEO Implementation

**Layers:**

1. **Technical SEO:**
   - Meta tags (components/SEO/UnifiedSEO.tsx)
   - Structured data (components/SEO/AdvancedStructuredData.tsx)
   - Sitemap (app/sitemap.ts)
   - Robots.txt (app/robots.ts)

2. **Content SEO:**
   - Semantic HTML
   - Proper heading hierarchy
   - Alt text for images
   - Internal linking

3. **Modern SEO (2025):**
   - Entity-First SEO (knowledge graph)
   - GEO (Generative Engine Optimization)
   - E-E-A-T signals
   - Content freshness

**International SEO:**
- Hreflang tags (EN/NL)
- Language-specific URLs (/nl/*)
- Geographic targeting (Amsterdam, Netherlands)

---

### 5. State Management Architecture

**Pattern:** Context API + Custom Hooks + Zustand (when needed)

**State Types:**

1. **UI State:** React useState/useReducer
2. **Theme State:** next-themes (ThemeProvider)
3. **Language State:** LanguageContext (custom)
4. **Form State:** React Hook Form
5. **Server State:** React Query (@tanstack/react-query)
6. **Global State:** Zustand (when needed)

**State Persistence:**
- Theme: localStorage (via next-themes)
- Language: URL + localStorage
- Form data: localStorage (auto-save)
- Analytics: Client-side only (privacy-compliant)

---

## 🔧 Key Components

### Core Components

#### 1. Homepage (`app/page.tsx`)
**Purpose:** Main landing page with conversion optimization

**Sections:**
- Hero (with visual storytelling)
- Segmentation Engine (startup vs SME)
- Social Proof
- Why Us
- Team Section
- Final CTA

**Features:**
- AI-powered personalization
- Real-time activity indicators
- Animated grid background
- Floating visual elements

---

#### 2. SmartCTA (`components/personalization/SmartCTA.tsx`)
**Purpose:** AI-powered call-to-action with dynamic optimization

**Features:**
- Intent detection (startup vs SME)
- Multi-armed bandit A/B testing
- Real-time performance tracking
- Dynamic content selection

**Technical:**
- ML-based intent scoring
- Statistical significance testing
- Privacy-compliant (client-side only)

---

#### 3. GridBackground (`components/ui/GridBackground.tsx`)
**Purpose:** Interactive grid background with visual effects

**Features:**
- Static grid (mobile/small screens)
- Interactive grid (desktop, mouse-responsive)
- Floating particles
- Animated gradients
- Theme-aware (light/dark)

**Performance:**
- Lazy loading (Suspense)
- GPU-accelerated animations
- Reduced motion support

---

#### 4. UnifiedSEO (`components/SEO/UnifiedSEO.tsx`)
**Purpose:** Comprehensive SEO component

**Features:**
- Meta tags (title, description, OG, Twitter)
- Structured data (JSON-LD)
- Hreflang tags
- Canonical URLs
- Geographic targeting

**Page Types Supported:**
- Homepage
- Service pages
- Blog posts
- Article pages

---

## 🔄 Data Flow Examples

### Example 1: Language Switching

```
User clicks language switcher
    ↓
LanguageContext.setLanguage('nl')
    ↓
URL updates (/nl/*)
    ↓
Middleware detects language
    ↓
Content hooks fetch Dutch content
    ↓
Components re-render with Dutch text
```

### Example 2: Personalization

```
User scrolls/clicks/interacts
    ↓
BehaviorTracker captures events
    ↓
IntentDetector analyzes behavior
    ↓
ContentOptimizer selects best variant
    ↓
SmartCTA renders personalized content
```

### Example 3: Form Submission

```
User fills form
    ↓
React Hook Form validates
    ↓
Auto-save to localStorage
    ↓
User submits
    ↓
n8n webhook receives data
    ↓
Success state shown
    ↓
Analytics event tracked
```

---

## 🎨 Styling Architecture

**Framework:** Tailwind CSS 3.4.0

**Pattern:** Utility-First + Component Classes

**Structure:**
```
globals.css          # Global styles, CSS variables
tailwind.config.ts   # Tailwind configuration
components/*.tsx     # Component-specific styles
```

**Design System:**
- Colors: Brand blue (#4585f4), semantic colors
- Typography: Archivo font, responsive scale
- Spacing: Consistent spacing system
- Shadows: Brand shadows, glow effects
- Animations: Custom keyframes, transitions

---

## 🧪 Testing Architecture

**Framework:** Playwright (E2E) + Jest (Unit)

**Test Types:**
1. **E2E Tests:** User flows, conversion paths
2. **Accessibility Tests:** WCAG compliance (axe-core)
3. **Performance Tests:** Lighthouse, Core Web Vitals
4. **Unit Tests:** Component logic, utilities

**Test Structure:**
```
tests/
├── e2e/
│   ├── conversion.spec.ts
│   └── accessibility.spec.ts
└── performance/
    └── lighthouse.spec.ts
```

---

## 🚀 Deployment Architecture

**Platform:** Vercel

**Features:**
- Automatic deployments (Git push)
- Preview deployments (PR)
- Edge network (CDN)
- Serverless functions
- Analytics integration

**Build Process:**
1. Install dependencies
2. Type check (TypeScript)
3. Lint (ESLint)
4. Build (Next.js)
5. Deploy (Vercel)

---

## 📊 Performance Architecture

**Targets:**
- Lighthouse Performance: 95+
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- TTI: < 3.5s

**Optimizations:**
- Code splitting (route-based)
- Image optimization (WebP/AVIF)
- Font optimization (next/font)
- Lazy loading (below-fold)
- Predictive prefetching
- Service worker caching

---

## 🔐 Security Architecture

**Headers:**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: origin-when-cross-origin

**Privacy:**
- Client-side analytics only
- No PII tracking
- GDPR-compliant
- Cookie consent ready

---

## 🎯 Design Decisions

### Why Next.js App Router?
- **SEO:** Server-side rendering, static generation
- **Performance:** Automatic code splitting, image optimization
- **Developer Experience:** File-based routing, TypeScript support
- **Modern:** Latest React features, streaming

### Why TypeScript?
- **Type Safety:** Catch errors at compile time
- **Developer Experience:** Autocomplete, refactoring
- **Maintainability:** Self-documenting code
- **Scalability:** Easier to scale team

### Why Tailwind CSS?
- **Performance:** Small bundle size, purging unused styles
- **Developer Experience:** Rapid development, consistency
- **Maintainability:** No CSS conflicts, clear patterns
- **Flexibility:** Custom utilities, design system

### Why Context API over Redux?
- **Simplicity:** Less boilerplate, easier to understand
- **Performance:** Sufficient for our use case
- **Bundle Size:** Smaller than Redux
- **Modern:** React 19 patterns

---

## 📈 Scalability Considerations

**Current Scale:**
- 30+ pages
- 60+ URLs (bilingual)
- 200+ components
- ~100KB average bundle size

**Scaling Strategies:**
1. **Code Splitting:** Route-based, component-based
2. **Lazy Loading:** Below-fold content, heavy components
3. **Caching:** Service worker, CDN, ISR
4. **Database:** Supabase (scalable PostgreSQL)
5. **CDN:** Vercel Edge Network

**Future Considerations:**
- Micro-frontends (if needed)
- Database sharding (if scale requires)
- Edge functions (for global performance)
- GraphQL (if API complexity grows)

---

## 🔍 Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No `any` types
- Proper type definitions
- JSDoc comments for complex functions

**Linting:**
- ESLint configured
- Next.js recommended rules
- Custom rules for consistency

**Testing:**
- E2E tests for critical paths
- Unit tests for utilities
- Accessibility tests (axe-core)
- Performance tests (Lighthouse)

**Documentation:**
- README.md (project overview)
- ARCHITECTURE.md (this file)
- Component JSDoc comments
- Inline comments for complex logic

---

## 🎓 Learning Resources

**For New Developers:**
1. Read this ARCHITECTURE.md
2. Review README.md
3. Check component examples (SmartCTA, GridBackground)
4. Run `npm run dev` and explore
5. Read Next.js App Router docs

**Key Files to Understand:**
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `contexts/LanguageContext.tsx` - Language management
- `components/personalization/SmartCTA.tsx` - Personalization example
- `lib/personalization/IntentDetector.ts` - ML logic

---

## 📝 Maintenance Guidelines

**Adding New Pages:**
1. Create `app/[route]/page.tsx`
2. Add SEO component (UnifiedSEO)
3. Add to sitemap (`app/sitemap.ts`)
4. Add content (`content/*.ts`)
5. Test in both languages

**Adding New Components:**
1. Create component file
2. Add TypeScript types
3. Add JSDoc comments
4. Add to appropriate directory
5. Export from index if needed

**Updating Content:**
1. Edit content files (`content/*.ts`)
2. Update both EN and NL versions
3. Test language switching
4. Verify SEO meta tags

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Maintained By:** Octomatic Development Team

