# WhatsApp Link Preview Troubleshooting Guide

## 🔍 **Probleem: Link preview werkt niet op WhatsApp**

WhatsApp gebruikt Open Graph tags om link previews te genereren, maar heeft specifieke vereisten en een hardnekkige cache.

---

## ✅ **Wat we hebben geïmplementeerd:**

- ✅ `og:image` - Volledige URL naar de image
- ✅ `og:image:type` - MIME type (image/png)
- ✅ `og:image:width` - 1201 pixels
- ✅ `og:image:height` - 631 pixels
- ✅ `og:image:alt` - Alt text voor toegankelijkheid
- ✅ `og:title` - Titel van de pagina
- ✅ `og:description` - Beschrijving
- ✅ `og:url` - Canonical URL
- ✅ Image is publiek toegankelijk (geen login vereist)
- ✅ Image is 475KB (binnen WhatsApp limieten)
- ✅ Image is 1201x631 pixels (voldoet aan minimum 1200x630)

---

## 🐛 **Mogelijke Oorzaken:**

### 1. **WhatsApp Cache (Meest Waarschijnlijk)**
WhatsApp cache is zeer hardnekkig en kan dagen tot weken duren voordat het wordt bijgewerkt.

**Oplossing:**
- Wacht 24-48 uur na het deployen van wijzigingen
- Deel de link opnieuw na een paar dagen
- WhatsApp heeft geen officiële cache-clearing tool

### 2. **Image Loading Snelheid**
WhatsApp heeft een timeout van ongeveer 3 seconden voor het laden van images.

**Check:**
- Test of de image snel laadt: `https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png`
- Image moet binnen 3 seconden laden

### 3. **HTTPS Certificaat Problemen**
WhatsApp vereist geldige HTTPS certificaten.

**Check:**
- Test de URL in een browser
- Controleer of het SSL certificaat geldig is

### 4. **Image File Size**
Hoewel 475KB binnen de limieten valt, kan een kleinere image sneller laden.

**Optie:**
- Overweeg image optimalisatie (WebP format kan kleiner zijn)
- Of verklein de PNG met tools zoals TinyPNG

---

## 🧪 **Testen:**

### 1. **Test de Open Graph Tags:**
```bash
curl -s https://visuals.octomatic.ai/ | grep -i "og:image"
```

### 2. **Test Image Toegankelijkheid:**
```bash
curl -I https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png
```

### 3. **Gebruik Facebook Debugger:**
- Ga naar: https://developers.facebook.com/tools/debug/
- Voer URL in: `https://visuals.octomatic.ai/`
- Klik "Scrape Again"
- Als Facebook de image ziet, zou WhatsApp het ook moeten zien

### 4. **Test met andere tools:**
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

---

## 🔧 **Mogelijke Fixes:**

### Fix 1: Image Optimalisatie
Als de image te langzaam laadt, optimaliseer deze:

```bash
# Met ImageMagick (als geïnstalleerd)
convert public/images/Graph_Image_visual_Alchemy.png \
  -quality 85 \
  -strip \
  public/images/Graph_Image_visual_Alchemy_optimized.png
```

### Fix 2: WebP Format (Beter voor Performance)
Converteer naar WebP voor kleinere file size:

```bash
# Met cwebp (als geïnstalleerd)
cwebp -q 85 public/images/Graph_Image_visual_Alchemy.png \
  -o public/images/Graph_Image_visual_Alchemy.webp
```

Dan update `layout.tsx` om WebP te gebruiken (maar houd PNG als fallback).

### Fix 3: Verklein Image Size
Als 475KB te groot is, verklein de image:

```bash
# Met ImageMagick
convert public/images/Graph_Image_visual_Alchemy.png \
  -resize 1200x630 \
  -quality 85 \
  public/images/Graph_Image_visual_Alchemy_smaller.png
```

---

## ⏰ **Timeline:**

- **Direct:** Test met Facebook Debugger
- **24 uur:** WhatsApp cache begint te verversen
- **48-72 uur:** Meeste WhatsApp gebruikers zien nieuwe preview
- **1 week:** Volledige cache refresh

---

## 📱 **Alternatieve Test Methode:**

1. Deel de link in een WhatsApp groep waar je admin bent
2. Verwijder het bericht
3. Wacht 24 uur
4. Deel opnieuw

---

## ✅ **Checklist:**

- [ ] Image is toegankelijk op: `https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png`
- [ ] Image laadt binnen 3 seconden
- [ ] Open Graph tags zijn correct in de HTML
- [ ] Facebook Debugger toont de image correct
- [ ] SSL certificaat is geldig
- [ ] Image is minimaal 1200x630 pixels
- [ ] Image file size is redelijk (< 1MB)

---

## 🆘 **Als het nog steeds niet werkt:**

1. **Wacht langer** - WhatsApp cache kan zeer hardnekkig zijn
2. **Test met een andere URL** - Voeg een query parameter toe: `?v=2`
3. **Controleer server logs** - Kijk of WhatsApp de image probeert te laden
4. **Overweeg een CDN** - Images via CDN laden vaak sneller
5. **Test op verschillende devices** - Soms werkt het op iOS maar niet op Android (of vice versa)

---

## 📝 **Notities:**

- WhatsApp gebruikt dezelfde Open Graph tags als Facebook
- Als Facebook de preview correct toont, zou WhatsApp het ook moeten doen
- WhatsApp cache is harder te clearen dan Facebook cache
- Image moet publiek toegankelijk zijn (geen authentication)
- Image moet een geldige HTTPS URL zijn


