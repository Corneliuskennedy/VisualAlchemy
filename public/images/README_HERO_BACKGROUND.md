# Hero Background Image Setup

## Image File Location
Save your hero gradient image as:
- **Path:** `/public/images/hero-gradient.webp`
- **Recommended Dimensions:** 1920x1080px (16:9 aspect ratio)
- **Format:** WebP (optimized for web)
- **Quality:** 85% (good balance of quality and file size)

## Current Implementation

The hero section currently uses a CSS gradient approximation that matches the described gradient:
- Left: Bright white → Pale lavender
- Middle: Purple arc → Medium blue  
- Right: Medium blue → Deep navy

## To Use Your Image File

1. Save your gradient image as `/public/images/hero-gradient.webp`
2. Uncomment the Image component in `src/app/page.tsx` (around line 90)
3. The CSS gradient will serve as a fallback/overlay

## Performance Optimization

- Image is set to `priority` for LCP optimization
- Quality set to 85% for optimal file size
- Uses Next.js Image component for automatic optimization
- CSS gradient fallback ensures instant rendering

## Alternative: CSS-Only Gradient

If you prefer to keep it CSS-only (better performance), the current gradient implementation is already optimized and will render instantly without any image load time.


