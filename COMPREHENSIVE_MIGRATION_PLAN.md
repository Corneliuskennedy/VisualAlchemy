# Comprehensive Migration Plan: Unified Content System
**Goal:** Migrate 100% of content to unified bilingual system - Professional, systematic, bulletproof

---

## 📊 Migration Audit Summary

### Files Requiring Migration: ~92 files identified

**Breakdown:**
- **Pages (App Router):** ~25 pages
- **Components:** ~50 components  
- **Sections:** ~15 section components
- **Hooks/Utils:** ~2 files

---

## 🎯 Migration Strategy

### Phase 1: Content Modules Creation (Foundation)
Create all content modules before migrating components

### Phase 2: Core Components (High Traffic)
Migrate homepage, navigation, footer, and key CTAs

### Phase 3: Section Components (Reusable)
Migrate all section components used across pages

### Phase 4: Page Components (Full Pages)
Migrate all page-level components

### Phase 5: Service Pages (Business Critical)
Migrate all service pages with full content

### Phase 6: Utility & Edge Cases
Migrate remaining utilities, forms, and edge cases

### Phase 7: Testing & Validation
Comprehensive testing and cleanup

---

## 📋 DETAILED MIGRATION PLAN

### PHASE 1: Content Modules Creation ⚠️ CRITICAL FOUNDATION

#### Step 1.1: Create Core Content Modules
**Priority:** P0 - BLOCKING

**Tasks:**
1. ✅ `homepage.ts` - DONE
2. ✅ `common.ts` - DONE  
3. ✅ `navigation.ts` - DONE
4. [ ] `footer.ts` - Footer content (company, legal, social links)
5. [ ] `problems.ts` - Problem sections content (startup, SME)
6. [ ] `statistics.ts` - Statistics/metrics content
7. [ ] `services.ts` - Services pages content (build, optimize, create)
8. [ ] `sections.ts` - Reusable section content (hero, CTA, proof, etc.)
9. [ ] `forms.ts` - Form labels, placeholders, validation messages
10. [ ] `blog.ts` - Blog page content (if needed)

**Files to Create:**
- `src/content/footer.ts`
- `src/content/problems.ts`
- `src/content/statistics.ts`
- `src/content/services.ts`
- `src/content/sections.ts`
- `src/content/forms.ts`
- `src/content/blog.ts`

**Estimated Time:** 2-3 hours

---

#### Step 1.2: Create Service Page Content Modules
**Priority:** P0 - BLOCKING

**Tasks:**
1. [ ] `services/build.ts` - Build page content
2. [ ] `services/optimize.ts` - Optimize page content
3. [ ] `services/create.ts` - Create page content
4. [ ] `services/individual.ts` - Individual service pages (CRM, hiring, etc.)

**Files to Create:**
- `src/content/services/build.ts`
- `src/content/services/optimize.ts`
- `src/content/services/create.ts`
- `src/content/services/individual.ts`

**Estimated Time:** 2-3 hours

---

#### Step 1.3: Update Content Index & Types
**Priority:** P0 - BLOCKING

**Tasks:**
1. [ ] Update `src/content/types.ts` with all new interfaces
2. [ ] Update `src/content/index.ts` to export all modules
3. [ ] Update `src/hooks/useContent.ts` with new hooks

**Estimated Time:** 30 minutes

---

### PHASE 2: Core Components Migration ⚠️ HIGH PRIORITY

#### Step 2.1: Footer Component
**File:** `src/components/Footer.tsx`
**Priority:** P0 - High visibility
**Status:** Uses translations, needs migration to unified system

**Tasks:**
1. [ ] Create `src/content/footer.ts` with all footer content
2. [ ] Update Footer.tsx to use `useContent().footer`
3. [ ] Remove `useTranslations()` dependency
4. [ ] Test language switching

**Estimated Time:** 30 minutes

---

#### Step 2.2: Navigation Components
**File:** `src/components/NewNavbar.tsx`, `src/components/Navbar.tsx`
**Priority:** P0 - High visibility
**Status:** Partially uses translations

**Tasks:**
1. [ ] Verify navigation content in `navigation.ts` is complete
2. [ ] Update Navbar components to use `useNavigation()`
3. [ ] Remove any hardcoded strings
4. [ ] Test language switching

**Estimated Time:** 30 minutes

---

#### Step 2.3: Mobile CTA Component
**File:** `src/components/ui/MobileCTA.tsx`
**Priority:** P1 - High conversion impact

**Tasks:**
1. [ ] Add mobile CTA content to `common.ts` or `sections.ts`
2. [ ] Update component to use unified content
3. [ ] Test on mobile devices

**Estimated Time:** 20 minutes

---

### PHASE 3: Section Components Migration ⚠️ MEDIUM-HIGH PRIORITY

#### Step 3.1: Problem Sections
**Files:**
- `src/components/sections/ProblemSection.tsx`
- `src/components/sections/StartupProblem.tsx`
- `src/components/sections/SMEProblem.tsx`
- `src/components/Problems.tsx`

**Priority:** P1 - High conversion impact

**Tasks:**
1. [ ] Create `src/content/problems.ts` with all problem content
2. [ ] Migrate ProblemSection.tsx
3. [ ] Migrate StartupProblem.tsx
4. [ ] Migrate SMEProblem.tsx
5. [ ] Migrate Problems.tsx
6. [ ] Test all problem sections

**Estimated Time:** 1.5 hours

---

#### Step 3.2: Solution Sections
**Files:**
- `src/components/sections/SolutionSection.tsx`
- `src/components/sections/StartupSolution.tsx`
- `src/components/sections/SMESolution.tsx`

**Priority:** P1 - High conversion impact

**Tasks:**
1. [ ] Create solution content in `sections.ts`
2. [ ] Migrate all solution components
3. [ ] Test language switching

**Estimated Time:** 1 hour

---

#### Step 3.3: Proof/Social Proof Sections
**Files:**
- `src/components/sections/SocialProofSection.tsx`
- `src/components/sections/StartupProof.tsx`
- `src/components/sections/SMEProof.tsx`

**Priority:** P1 - Trust building

**Tasks:**
1. [ ] Add proof content to `sections.ts`
2. [ ] Migrate all proof components
3. [ ] Test

**Estimated Time:** 45 minutes

---

#### Step 3.4: Statistics Component
**File:** `src/components/Statistics.tsx`
**Priority:** P1 - High visibility

**Tasks:**
1. [ ] Create `src/content/statistics.ts`
2. [ ] Migrate Statistics.tsx
3. [ ] Remove hardcoded ternaries
4. [ ] Test

**Estimated Time:** 30 minutes

---

#### Step 3.5: Other Section Components
**Files:**
- `src/components/LocalSupport.tsx`
- `src/components/CommonMistakes.tsx`
- `src/components/CalculationExplanation.tsx`
- `src/components/AudienceSelector.tsx`
- `src/components/Benefits.tsx`
- `src/components/Comparison.tsx`
- `src/components/Pricing.tsx`
- `src/components/FAQ.tsx`
- `src/components/Testimonials.tsx`
- `src/components/FinalCTA.tsx`

**Priority:** P2 - Medium priority

**Tasks:**
1. [ ] Create content modules for each
2. [ ] Migrate components one by one
3. [ ] Test each migration

**Estimated Time:** 3-4 hours

---

### PHASE 4: Page Components Migration ⚠️ MEDIUM PRIORITY

#### Step 4.1: Service Pages (Build, Optimize, Create)
**Files:**
- `src/app/build/page.tsx`
- `src/app/optimize/page.tsx`
- `src/app/create/page.tsx`

**Priority:** P1 - Business critical

**Tasks:**
1. [ ] Create service page content modules
2. [ ] Migrate build page
3. [ ] Migrate optimize page
4. [ ] Migrate create page
5. [ ] Test all service pages

**Estimated Time:** 2 hours

---

#### Step 4.2: Other Pages
**Files:**
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/services/page.tsx`
- `src/app/get-started/page.tsx`
- `src/app/careers/page.tsx`
- `src/app/partnership/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/projecten/page.tsx`
- `src/app/over-ons/page.tsx`

**Priority:** P2 - Medium priority

**Tasks:**
1. [ ] Audit each page for content
2. [ ] Create content modules
3. [ ] Migrate pages
4. [ ] Test

**Estimated Time:** 4-5 hours

---

#### Step 4.3: Individual Service Pages
**Files:**
- `src/app/services/lead-generation/page.tsx`
- `src/app/services/crm-buildouts/page.tsx`
- `src/app/services/hiring-systems/page.tsx`
- `src/app/services/project-management/page.tsx`
- `src/app/services/ai-service-fulfillment/page.tsx`
- `src/app/services/ai-automation-amsterdam/page.tsx`
- `src/app/services/sops-consulting/page.tsx`
- `src/app/services/startup-kickoff-lab/page.tsx`

**Priority:** P2 - Medium priority

**Tasks:**
1. [ ] Create `services/individual.ts` content module
2. [ ] Migrate each service page
3. [ ] Test

**Estimated Time:** 3-4 hours

---

### PHASE 5: Forms & Interactive Components ⚠️ MEDIUM PRIORITY

#### Step 5.1: Contact Form
**File:** `src/components/contact/ContactForm.tsx`
**Priority:** P1 - High conversion impact

**Tasks:**
1. [ ] Create `src/content/forms.ts`
2. [ ] Migrate ContactForm.tsx
3. [ ] Test form submission

**Estimated Time:** 45 minutes

---

#### Step 5.2: Other Forms
**Files:**
- `src/components/SignupForm.tsx`
- `src/components/FilloutForm.tsx`

**Priority:** P2 - Medium priority

**Tasks:**
1. [ ] Add form content to `forms.ts`
2. [ ] Migrate forms
3. [ ] Test

**Estimated Time:** 1 hour

---

### PHASE 6: Blog & Content Pages ⚠️ LOW-MEDIUM PRIORITY

#### Step 6.1: Blog Pages
**Files:**
- `src/app/blog/page.tsx`
- `src/components/BlogInsights.tsx`
- `src/components/blog/BlogHeader.tsx`

**Priority:** P2 - Blog content comes from Supabase, mainly UI strings

**Tasks:**
1. [ ] Create `src/content/blog.ts` for UI strings
2. [ ] Migrate blog page UI strings
3. [ ] Test

**Estimated Time:** 30 minutes

---

### PHASE 7: Cleanup & Optimization ⚠️ FINAL PHASE

#### Step 7.1: Remove Old Systems
**Tasks:**
1. [ ] Remove deprecated `useLocalizedContent.ts` (after all migrations)
2. [ ] Remove unused imports
3. [ ] Clean up old translation files (if not needed)
4. [ ] Update documentation

**Estimated Time:** 1 hour

---

#### Step 7.2: Testing & Validation
**Tasks:**
1. [ ] Test language switching on all pages
2. [ ] Verify no hardcoded strings remain
3. [ ] Check console for errors
4. [ ] Test on multiple browsers
5. [ ] Performance audit
6. [ ] SEO check (hreflang tags)

**Estimated Time:** 2-3 hours

---

#### Step 7.3: Documentation
**Tasks:**
1. [ ] Update README with content system docs
2. [ ] Create developer guide for adding content
3. [ ] Document content structure
4. [ ] Create migration completion report

**Estimated Time:** 1 hour

---

## 📈 Progress Tracking

### Content Modules Status
- [x] homepage.ts ✅
- [x] common.ts ✅
- [x] navigation.ts ✅
- [ ] footer.ts
- [ ] problems.ts
- [ ] statistics.ts
- [ ] services.ts
- [ ] sections.ts
- [ ] forms.ts
- [ ] blog.ts
- [ ] services/build.ts
- [ ] services/optimize.ts
- [ ] services/create.ts
- [ ] services/individual.ts

### Components Migration Status
- [x] Homepage (page.tsx) ✅
- [x] LanguageSwitcher ✅
- [ ] Footer
- [ ] Navbar/NewNavbar
- [ ] MobileCTA
- [ ] ProblemSection
- [ ] StartupProblem
- [ ] SMEProblem
- [ ] Problems
- [ ] Statistics
- [ ] SolutionSection
- [ ] StartupSolution
- [ ] SMESolution
- [ ] SocialProofSection
- [ ] StartupProof
- [ ] SMEProof
- [ ] LocalSupport
- [ ] CommonMistakes
- [ ] CalculationExplanation
- [ ] AudienceSelector
- [ ] Benefits
- [ ] Comparison
- [ ] Pricing
- [ ] FAQ
- [ ] Testimonials
- [ ] FinalCTA
- [ ] ContactForm
- [ ] Build page
- [ ] Optimize page
- [ ] Create page
- [ ] Other pages (10+)

---

## 🎯 Success Criteria

### Technical
- ✅ Zero hardcoded `isNL ? "Dutch" : "English"` ternaries
- ✅ All content in unified system
- ✅ Type-safe content access
- ✅ No console errors
- ✅ Language switching works everywhere

### Performance
- ✅ No performance regression
- ✅ Memoized hooks working correctly
- ✅ Fast language switching (<200ms)

### Quality
- ✅ Consistent content structure
- ✅ Easy to maintain
- ✅ Well documented

---

## ⏱️ Estimated Total Time

**Phase 1:** 4-6 hours (Content modules)
**Phase 2:** 1.5 hours (Core components)
**Phase 3:** 6-7 hours (Section components)
**Phase 4:** 9-11 hours (Page components)
**Phase 5:** 2 hours (Forms)
**Phase 6:** 30 minutes (Blog)
**Phase 7:** 4-5 hours (Cleanup & Testing)

**Total:** ~27-32 hours

---

## 🚀 Execution Order

1. **Start with Phase 1** - Create all content modules (foundation)
2. **Then Phase 2** - Core components (high visibility)
3. **Then Phase 3** - Sections (reusable, high impact)
4. **Then Phase 4** - Pages (complete pages)
5. **Then Phase 5** - Forms (interactive)
6. **Then Phase 6** - Blog (lower priority)
7. **Finally Phase 7** - Cleanup & testing

---

**Status:** Ready to execute Phase 1
**Next Step:** Create footer.ts content module



