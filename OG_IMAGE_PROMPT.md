# Open Graph Image Prompt voor Visual Alchemy

## 📐 **Dimensies**
**1200 x 630 pixels** (1.91:1 aspect ratio - standaard voor social media previews)

---

## 🎨 **Super Prompt voor Nanobanana Pro**

```
Create a sleek, modern Open Graph social media preview image (1200x630px) for Visual Alchemy, a premium video editing service for finance creators. 

VISUAL STYLE:
- Ultra-dark background (#050505 - near black)
- Emerald green (#10b981) as primary accent color
- Minimalist, tech-forward aesthetic
- Clean, professional design with subtle depth
- Modern typography-focused layout

COMPOSITION:
- Left side (60%): Large, bold text overlay
  * Main headline: "VISUAL_ALCHEMY" in monospace font, emerald green (#10b981), extra bold
  * Tagline below: "Your Audio. My Visuals. Unfair Retention." in white, medium weight
  * Subtext: "Viral Visuals for Finance Creators" in light gray, smaller
- Right side (40%): Abstract visual element
  * Subtle emerald green gradient glow (radial, soft)
  * Abstract geometric shapes or waveform visualization
  * Very subtle grid pattern overlay (barely visible)
  * Depth through layered gradients

COLOR PALETTE:
- Background: #050505 (near black)
- Primary accent: #10b981 (emerald-500)
- Text: #FFFFFF (white) and #9CA3AF (gray-400)
- Accent glow: rgba(16, 185, 129, 0.3-0.6) variations

TYPOGRAPHY:
- Monospace font for "VISUAL_ALCHEMY" (tech aesthetic)
- Clean sans-serif for tagline
- High contrast for readability
- Text should be crisp and readable at small sizes

ELEMENTS TO INCLUDE:
- Subtle emerald green radial gradient in top-right corner
- Minimal geometric accent (could be abstract waveform, circuit pattern, or minimalist finance chart)
- Clean, professional spacing
- No cluttered elements
- Focus on text readability

MOOD:
- Premium, professional
- Tech-forward, modern
- Finance/creator industry focused
- Sleek and sophisticated
- High-end service positioning

TECHNICAL REQUIREMENTS:
- 1200x630 pixels exactly
- High resolution, sharp text
- Optimized for social media compression
- Text must be readable when scaled down to thumbnail size
- Dark theme optimized (works well on dark backgrounds)
```

---

## 🎯 **Alternatieve Kortere Prompt (Als de bovenstaande te lang is)**

```
Modern Open Graph image (1200x630px) for Visual Alchemy - premium video editing for finance creators. Dark background (#050505), emerald green (#10b981) accents. Left side: Bold "VISUAL_ALCHEMY" monospace text in emerald, tagline "Your Audio. My Visuals. Unfair Retention." in white below. Right side: Subtle emerald gradient glow with abstract geometric elements. Minimalist, tech-forward, professional aesthetic. High contrast, readable typography. Clean spacing, no clutter.
```

---

## 📋 **Design Checklist**

- [ ] Exact 1200x630 pixels
- [ ] Dark background (#050505)
- [ ] Emerald green (#10b981) as primary color
- [ ] "VISUAL_ALCHEMY" prominently displayed
- [ ] Tagline included: "Your Audio. My Visuals. Unfair Retention."
- [ ] Subtext: "Viral Visuals for Finance Creators"
- [ ] Text readable at thumbnail size
- [ ] Professional, premium aesthetic
- [ ] No cluttered elements
- [ ] High contrast for social media

---

## 💡 **Tips voor Nanobanana Pro**

1. **Text First**: Zorg dat de tekst groot en leesbaar is - dit is het belangrijkste element
2. **Contrast**: Hoge contrast tussen tekst en achtergrond
3. **Simple**: Minder is meer - geen overbodige elementen
4. **Brand Colors**: Gebruik exact #10b981 voor emerald en #050505 voor achtergrond
5. **Test**: Preview de afbeelding op verschillende social platforms om te zien hoe het eruit ziet

---

## 🔄 **Na Generatie**

Zodra je de afbeelding hebt:
1. Sla op als `og-image.png` of `og-image.webp` in `/public/`
2. Update `src/app/layout.tsx` met het nieuwe pad
3. Test met [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Test met [Twitter Card Validator](https://cards-dev.twitter.com/validator)

