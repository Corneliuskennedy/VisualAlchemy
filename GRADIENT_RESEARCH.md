# Monopo Gradient Research & Implementation Plan

## 🔍 Research Findings

### Monopo's Actual Implementation

**Web Component:** `<monopo-gradient>`  
**Technology:** Custom Web Component with Shadow DOM + Canvas  
**Canvas Size:** 1181x992px (fixed aspect ratio)

### Key Parameters (from Monopo.co.jp):

```javascript
{
  color1: "#80f6ff",      // Cyan
  color2: "#3b488c",      // Deep blue
  color3: "#884ef4",      // Purple
  color4: "#d73c3c",      // Red
  colorsize: 0.8,
  colorspacing: 0.33,     // Very tight spacing
  colorrotation: 1.24840734641021,  // ~71 degrees
  colorspread: 10,        // High spread for blending
  coloroffset: [-0.973876953125, -0.755390625],
  displacement: 2.378571428571429,  // High displacement for texture
  seed: 3915.15875,
  position: [-1.8283292510943407, 1.3235562192065857],
  zoom: 0.75,             // Zoomed in
  spacing: 4.24,          // Wide spacing
  noretina: true
}
```

### Critical Insights:

1. **Edge Blending:** The gradient fades to background color at edges (contained look)
2. **High Displacement:** Creates grainy, textured appearance
3. **Tight Color Spacing:** 0.33 creates visible color bands
4. **Zoomed In:** 0.75 zoom makes gradient fill more of the canvas
5. **Multiple Wave Frequencies:** Creates organic, flowing patterns

---

## 🎯 Implementation Strategy

### Problem: Gradient Looks "Floating" on Monopo

**Solution:** Edge blending technique
- Gradient fades to background color at edges
- Creates a "contained" look
- Makes it feel intentional and premium

### How to Achieve Edge Blending:

1. **Radial Mask:** Apply a radial gradient mask from center to edges
2. **Edge Fade:** Blend gradient colors with background color near edges
3. **Vignette Effect:** Darken/fade edges to match background

---

## 📋 Implementation Plan

### Phase 1: Edge Blending
- [ ] Detect background color (dark/light mode)
- [ ] Apply radial fade mask
- [ ] Blend gradient edges with background color
- [ ] Create smooth transition

### Phase 2: Improved Algorithm
- [ ] Use Monopo's exact parameters as reference
- [ ] Implement proper color spacing (0.33)
- [ ] Add high displacement for grain (2.37)
- [ ] Multiple wave frequencies for organic look

### Phase 3: Grain Texture
- [ ] Add proper grain overlay
- [ ] Match Monopo's grain intensity
- [ ] Ensure grain works with edge blending

### Phase 4: Hero Integration
- [ ] Integrate into homepage hero
- [ ] Ensure proper z-index layering
- [ ] Test parallax effect
- [ ] Verify edge blending works

---

## 🔧 Technical Details

### Edge Blending Algorithm:

```typescript
// Calculate distance from center
const dist = Math.sqrt((x - centerX)² + (y - centerY)²);
const maxDist = Math.sqrt(width² + height²) / 2;

// Edge fade factor (0 = center, 1 = edge)
const edgeFactor = Math.min(1, dist / (maxDist * 0.8));

// Blend with background color
const blendedColor = {
  r: gradientColor.r * (1 - edgeFactor) + bgColor.r * edgeFactor,
  g: gradientColor.g * (1 - edgeFactor) + bgColor.g * edgeFactor,
  b: gradientColor.b * (1 - edgeFactor) + bgColor.b * edgeFactor,
};
```

### Background Color Detection:

- Dark mode: `#0A0A0A` or `rgb(10, 10, 10)`
- Light mode: `#FFFFFF` or `rgb(255, 255, 255)`
- Use CSS variable: `var(--background)` or `bg-background`

---

## 🎨 Visual Goal

**Monopo's Effect:**
- Gradient appears to "float" on the hero
- Edges fade seamlessly into background
- Contained, intentional look
- Premium, expensive appearance

**Our Implementation:**
- Match Monopo's visual effect
- Edge blending for contained look
- Proper grain texture
- Smooth, organic gradients

---

**Next Steps:**
1. Implement edge blending
2. Use Monopo's parameters as reference
3. Test on hero section
4. Refine until it matches Monopo's premium look

