# Image Requirements & Specifications
**Date:** January 2025  
**Status:** 📋 **COMPREHENSIVE IMAGE AUDIT**  
**Purpose:** Complete list of all images needed for the Octomatic website

---

## 🎯 Executive Summary

**Total Images Needed:** ~25-30 images  
**Priority Levels:** HIGH (immediate), MEDIUM (soon), LOW (polish)  
**Formats:** WebP (primary), AVIF (fallback), PNG (logos/icons)

---

## 🏠 HOMEPAGE

### 1. Hero Section - Gradient Background Image ⭐ HIGH PRIORITY
**Status:** Designer creating Monopo-inspired gradient  
**Location:** `/public/images/hero-gradient.webp`  
**Specs:**
- **Type:** Static gradient image (like Monopo.co.jp hero)
- **Dimensions:** 1920x1080px (16:9 aspect ratio)
- **Format:** WebP (optimized)
- **Style:** Subtle, elegant gradient (not too vibrant)
- **Purpose:** Background for hero section with parallax effect
- **Notes:** 
  - Should work with dark/light mode
  - Text overlay must remain readable
  - Consider parallax scroll effect (like Monopo)

**Implementation Notes:**
- Add parallax scroll effect on scroll
- Gradient should be subtle, not overpowering
- Consider multiple versions for different screen sizes

---

### 2. Center-Mode Slider Cards (Segmentation Section)
**Status:** Currently using gradient backgrounds  
**Location:** `/public/images/segmentation/`  
**Specs:**
- **Type:** Background images or keep gradients
- **Dimensions:** 1200x800px (3:2 aspect ratio)
- **Format:** WebP
- **Quantity:** 3 images (one per card)
- **Priority:** LOW (gradients work well currently)

**Current State:** Using CSS gradients - works well, optional upgrade

---

### 3. Social Proof / Client Logos
**Status:** ✅ Complete (SVG logos exist)  
**Location:** `/public/logo/`  
**Current Logos:**
- Monuta.svg ✅
- Vilaverde.svg ✅
- GTA Hood Expert.svg ✅

**No action needed** - logos are already in place

---

### 4. Team Section
**Status:** ⚠️ Needs professional photos  
**Location:** `/public/team/`  
**Specs:**
- **Type:** Professional headshots
- **Dimensions:** 800x800px (square, 1:1)
- **Format:** WebP
- **Style:** Professional, consistent lighting, clean background
- **Quantity:** 1+ (Kennet Timmers + any team members)

**Current:** `/team/kennet_timmers.webp` exists but may need update

**Requirements:**
- Professional headshot
- Consistent style across all team members
- Clean, neutral background
- High quality (for retina displays)

---

## 🎨 CREATE PAGE (`/create`)

### 5. Hero Section - AI Animation Video ⭐ HIGH PRIORITY
**Status:** User creating video of AI animations  
**Location:** `/public/videos/create-hero-ai-animations.mp4`  
**Specs:**
- **Type:** Video (MP4/H.264 or WebM)
- **Dimensions:** 1920x1080px (16:9)
- **Duration:** 10-30 seconds (loop)
- **Format:** 
  - Primary: MP4 (H.264)
  - Fallback: WebM (VP9)
- **File Size:** < 5MB (optimized)
- **Purpose:** Showcase AI-generated animations/visuals
- **Style:** 
  - Showcase the AI animations you're creating
  - Cinematic, high-quality
  - Should loop seamlessly
  - Consider muted autoplay with controls

**Implementation Notes:**
- Use HTML5 `<video>` with autoplay, loop, muted
- Add poster image for loading state
- Consider lazy loading below fold
- Add play/pause controls for accessibility

**Poster Image (Fallback):**
- **Location:** `/public/images/create-hero-poster.webp`
- **Dimensions:** 1920x1080px
- **Format:** WebP
- **Purpose:** Shows before video loads

---

### 6. Portfolio Section Images
**Status:** ⚠️ Needs portfolio project images  
**Location:** `/public/images/portfolio/`  
**Specs:**
- **Type:** Project screenshots/thumbnails
- **Dimensions:** 1200x800px (3:2)
- **Format:** WebP
- **Quantity:** 3-6 images (one per portfolio item)
- **Style:** 
  - Screenshots of AI-generated content
  - Before/after comparisons
  - High-quality visuals

**Current Projects (from code):**
1. AI B-Roll Reel - Tech Channel
2. AI B-Roll Reel - Finance Channel
3. (Add more as needed)

---

## 📄 ABOUT US PAGE (`/about-us`)

### 7. Founder/Team Photo
**Status:** ⚠️ Needs update  
**Location:** `/public/team/kennet_timmers.webp`  
**Specs:**
- **Type:** Professional photo
- **Dimensions:** 1200x1600px (3:4 portrait)
- **Format:** WebP
- **Style:** Professional, approachable
- **Purpose:** Founder profile section

**Current:** File exists but may need professional update

---

## 🛠️ SERVICES PAGES

### 8. Service Page Hero Images
**Status:** ⚠️ Needs service-specific images  
**Location:** `/public/images/services/`  
**Specs:**
- **Type:** Service-specific illustrations or photos
- **Dimensions:** 1920x800px (wide format)
- **Format:** WebP
- **Quantity:** 8+ images (one per service page)
- **Style:** 
  - Abstract/illustrative
  - Service-specific
  - Professional

**Service Pages:**
- `/services/crm-buildouts`
- `/services/lead-generation`
- `/services/hiring-systems`
- `/services/ai-automation-amsterdam`
- `/services/ai-service-fulfillment`
- `/services/startup-kickoff-lab`
- `/optimize`
- `/build`

---

## 📝 BLOG

### 9. Blog Post Cover Images
**Status:** ⚠️ Needs system for blog images  
**Location:** `/public/images/blog/` or Supabase storage  
**Specs:**
- **Type:** Blog post cover images
- **Dimensions:** 1200x630px (Open Graph ratio)
- **Format:** WebP
- **Style:** 
  - Blog-specific
  - Text overlay friendly
  - Consistent style

**Note:** Currently using `cover_image_path` from Supabase

---

## 🎭 FOOTER - Parallax Effect (Monopo-Inspired)

### 10. Footer Background Image ⭐ HIGH PRIORITY
**Status:** Needs Monopo-inspired parallax image  
**Location:** `/public/images/footer-parallax.webp`  
**Specs:**
- **Type:** Subtle background image with parallax effect
- **Dimensions:** 1920x600px (wide format)
- **Format:** WebP
- **Style:** 
  - Subtle, elegant (like Monopo)
  - Works with dark/light mode
  - Parallax scroll effect on scroll
  - Should not distract from footer content

**Implementation Notes:**
- Add parallax scroll effect (like Monopo footer)
- Image should move slower than scroll
- Consider multiple layers for depth
- Ensure text remains readable

**Monopo Reference:**
- Clean, minimal footer
- Subtle parallax background
- Text remains clear and readable
- Professional aesthetic

---

## 🖼️ GENERAL / MISC

### 11. Open Graph / Social Sharing Image
**Status:** ✅ Exists (`/octomatic-image-2025.png`)  
**Location:** `/public/octomatic-image-2025.png`  
**Specs:**
- **Dimensions:** 1200x630px (Open Graph standard)
- **Format:** PNG (for compatibility)
- **Purpose:** Social media sharing preview

**Current:** ✅ File exists - verify it's up to date

---

### 12. Favicon & App Icons
**Status:** ✅ Complete  
**Location:** `/public/logo/` and `/public/faviconOctomatic.svg`  
**Current:**
- faviconOctomatic.svg ✅
- octomatic-200.png ✅
- octomatic-400.png ✅
- octomatic-800.png ✅

**No action needed**

---

## 📊 PRIORITY MATRIX

### 🔴 HIGH PRIORITY (Do First)
1. **Homepage Hero Gradient** - Designer creating (Monopo-inspired)
2. **Create Page Hero Video** - User creating (AI animations)
3. **Footer Parallax Image** - Needs Monopo-inspired parallax background
4. **Team Photos** - Professional headshots needed

### 🟡 MEDIUM PRIORITY (Do Soon)
5. **Service Page Hero Images** - 8+ service-specific images
6. **Portfolio Images** - Create page portfolio section
7. **About Us Founder Photo** - Update professional photo

### 🟢 LOW PRIORITY (Polish)
8. **Blog Cover Images** - System for blog post images
9. **Segmentation Card Images** - Optional upgrade from gradients
10. **Additional Team Photos** - As team grows

---

## 🎬 VIDEO REQUIREMENTS

### Create Page Hero Video
**Specifications:**
- **Codec:** H.264 (MP4) or VP9 (WebM)
- **Resolution:** 1920x1080px (Full HD)
- **Frame Rate:** 30fps or 60fps
- **Bitrate:** ~5-8 Mbps (for quality)
- **Duration:** 10-30 seconds (loop)
- **Audio:** None (muted)
- **Optimization:** 
  - Compress for web (< 5MB)
  - Multiple quality versions (1080p, 720p, 480p)
  - Consider using `<video>` with `srcset` for responsive

**Content Ideas:**
- Showcase AI-generated animations
- B-roll footage examples
- Visual effects demonstrations
- Process previews

---

## 🎨 DESIGN GUIDELINES

### Image Style Consistency
- **Color Palette:** Match brand colors (#4585f4 primary blue)
- **Tone:** Professional, modern, clean
- **Aesthetic:** Minimal, elegant (like Monopo)
- **Dark Mode:** Ensure images work in both themes
- **Accessibility:** High contrast, readable text overlays

### Technical Requirements
- **Format:** WebP (primary), AVIF (fallback), PNG (logos)
- **Optimization:** Compress all images (< 200KB each)
- **Responsive:** Provide multiple sizes (srcset)
- **Lazy Loading:** Below-fold images lazy load
- **Alt Text:** Descriptive alt text for all images

---

## 📝 IMPLEMENTATION CHECKLIST

### Phase 1: Critical Images (Week 1)
- [ ] Homepage hero gradient image (designer)
- [ ] Create page hero video (user)
- [ ] Footer parallax background image
- [ ] Team professional photos

### Phase 2: Service Images (Week 2)
- [ ] CRM Buildouts hero image
- [ ] Lead Generation hero image
- [ ] Hiring Systems hero image
- [ ] AI Automation Amsterdam hero image
- [ ] AI Service Fulfillment hero image
- [ ] Startup Kickoff Lab hero image
- [ ] Optimize page hero image
- [ ] Build page hero image

### Phase 3: Portfolio & Content (Week 3)
- [ ] Portfolio project images (Create page)
- [ ] Blog cover image system
- [ ] About Us founder photo update

### Phase 4: Polish (Ongoing)
- [ ] Additional team photos
- [ ] Blog post cover images (as needed)
- [ ] Optional segmentation card images

---

## 🔗 REFERENCE LINKS

**Monopo Inspiration:**
- Homepage: https://monopo.co.jp/
- Footer parallax effect (scroll to bottom)
- Hero gradient style

**Image Optimization Tools:**
- Squoosh.app (Google) - Image compression
- Cloudinary - Image CDN and optimization
- TinyPNG - PNG/WebP compression

---

## 📞 NEXT STEPS

1. **Designer:** Create Monopo-inspired gradient for homepage hero
2. **User:** Create AI animation video for Create page hero
3. **Developer:** Implement parallax effects (footer + hero)
4. **Photographer:** Schedule professional team photos
5. **Designer:** Create service-specific hero images

---

**Last Updated:** January 2025  
**Next Review:** After Phase 1 completion

