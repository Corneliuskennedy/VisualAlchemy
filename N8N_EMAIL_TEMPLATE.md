# N8N Email Template voor Visual Alchemy Contact Form

## 📧 **Email Subject:**
```
New Lead from Visual Alchemy Website
```

## 📝 **Email Body Template:**

```
Hi Kennet,

You've just received a new project request from the Visual Alchemy website. Here are the details:

• Name: {{ $json.body.name }}
• Email: {{ $json.body.email }}
• Project Type: {{ $json.body.projectType }}
• Message: {{ $json.body.message }}

Source: {{ $json.body.source }}

Make sure to follow up promptly.

—
Visual Alchemy Website Assistant
```

## 🔧 **N8N Workflow Setup:**

### **1. Webhook Node:**
- De webhook ontvangt de volgende payload:
```json
{
  "name": "...",
  "email": "...",
  "projectType": "...",
  "message": "...",
  "source": "visual-alchemy-contact"
}
```

### **2. Email Node (Gmail/Outlook/etc):**
- **To:** kennet@octomatic.ai
- **Subject:** `New Lead from Visual Alchemy Website`
- **Body:** Gebruik de template hierboven

### **3. Project Type Mapping (Optioneel):**
Als je de projectType wilt omzetten naar leesbare tekst, voeg een "Set" node toe:

**Project Type Values:**
- `single-video` → "Single Video Project"
- `series` → "Video Series / Multiple Videos"
- `channel-rebrand` → "Channel Rebrand / Visual Identity"
- `other` → "Other Project"

**Set Node Example:**
```
projectTypeLabel: 
  {{ $json.body.projectType === 'single-video' ? 'Single Video Project' : 
     $json.body.projectType === 'series' ? 'Video Series / Multiple Videos' :
     $json.body.projectType === 'channel-rebrand' ? 'Channel Rebrand / Visual Identity' :
     'Other Project' }}
```

Dan gebruik in email: `{{ $json.projectTypeLabel }}` in plaats van `{{ $json.body.projectType }}`

---

## 📋 **Alternatieve Verbeterde Template:**

```
Hi Kennet,

🎯 NEW LEAD FROM VISUAL ALCHEMY WEBSITE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact Details:
   Name: {{ $json.body.name }}
   Email: {{ $json.body.email }}

📹 Project Information:
   Project Type: {{ $json.body.projectType }}
   
💬 Message:
   {{ $json.body.message || '(No message provided)' }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source: Visual Alchemy Contact Form
Response Time: Within 24 hours

—
Visual Alchemy Website Assistant
```

---

## ✅ **Checklist voor N8N:**

- [ ] Webhook node ontvangt de payload correct
- [ ] Email node is geconfigureerd met juiste credentials
- [ ] Email template gebruikt de juiste velden (`$json.body.name`, `$json.body.email`, etc.)
- [ ] Subject line bevat "Visual Alchemy"
- [ ] Email wordt verstuurd naar kennet@octomatic.ai
- [ ] Workflow is geactiveerd

---

## 🧪 **Test Payload:**

Gebruik deze payload om te testen in n8n:

```json
{
  "body": {
    "name": "Test User",
    "email": "test@example.com",
    "projectType": "series",
    "message": "This is a test message from Visual Alchemy website",
    "source": "visual-alchemy-contact"
  }
}
```

