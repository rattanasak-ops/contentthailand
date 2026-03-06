# WCAG 2.1 AA Accessibility Widget — BOI Website (boi.go.th)

> Prompt สำหรับ Cursor / Claude Code — กรอกค่าเฉพาะ BOI แล้ว พร้อมใช้งาน
> อ้างอิง: TOR §4.2.17, มาตรฐานเว็บไซต์ภาครัฐ DGA 3.0 (มสพร. 11-2566)
>
> **เอกสารที่เกี่ยวข้อง**: `Docs/boi_analysis.md` §9 (WCAG checklist), `Docs/tor.md` §4.2.17 (TOR requirement)

---

## Security Notes สำหรับ Widget

Widget ต้อง comply กับ security rules:

1. **CSP Nonce Compatibility**: Widget ต้อง**ไม่** inject `<style>` tags แบบ dynamic — ใช้ CSS classes ใน static stylesheet แทน (prefix `a11y-`). ถ้าจำเป็นต้อง inject `<style>` ต้องใส่ `nonce` attribute
2. **ห้าม unsafe-inline**: CSS overrides ทั้งหมดต้องอยู่ใน CSS file ที่ import ผ่าน Next.js (ไม่ใช่ inline `<style>`)
3. **localStorage ปลอดภัย**: เก็บแค่ UI preferences (ไม่ใช่ข้อมูลส่วนบุคคล) → ไม่ต้อง PDPA consent สำหรับส่วนนี้
4. **TTS (Text-to-Speech)**: ใช้ browser-native `speechSynthesis` API — ไม่ถูกบล็อกโดย `Permissions-Policy: microphone=()` (TTS คือ output ไม่ใช่ input)
5. **Lighthouse Target**: TOR กำหนด >= 80 ทุก category, เป้าหมายเรา >= 90 สำหรับ Accessibility

---

## PROMPT (Copy ทั้งหมดด้านล่างนี้)

````markdown
# Task: สร้าง WCAG 2.1 AA Accessibility Widget สำหรับเว็บไซต์ BOI

## บทบาทของคุณ
คุณคือทีม 5 ตำแหน่งทำงานร่วมกัน:
1. **Senior WCAG Accessibility Consultant** — กำหนด requirement ตาม WCAG 2.1 AA + DGA 3.0, ตรวจ ARIA, contrast ratio
2. **Senior Frontend Architect** — ออกแบบ component architecture แบบ isolated ไม่กระทบเว็บเดิม
3. **UX/UI Designer** — ออกแบบ floating panel ที่สวย ใช้ง่าย accessible ในตัวเอง สไตล์ premium (glassmorphism)
4. **i18n Engineer** — จัดการ 7 ภาษา สำหรับทุก label/tooltip
5. **QA Accessibility Tester** — ทดสอบ keyboard nav, screen reader, focus trap, Lighthouse, achecker.ca

## ข้อมูล Project
- **Project:** เว็บไซต์ BOI (สำนักงานคณะกรรมการส่งเสริมการลงทุน) — boi.go.th
- **Framework:** Next.js 15 App Router
- **CSS Framework:** Tailwind CSS v4
- **i18n Library:** next-intl
- **Locales:** th, en, ja, zh, ko, de, fr (default: th)
- **Animation Library:** framer-motion 11
- **Icon Library:** lucide-react
- **Typography:** Noto Sans Thai + Inter (via next/font)

## ข้อมูลสี / Design Tokens
- **Primary Color:** #1B2A4A — Navy (ใช้กับ header panel, active state)
- **Accent Color:** #C5A572 — Gold (ใช้กับ highlight, indicator dot, focus ring)
- **Background:** #F8FAFC — Light
- **Border:** #E2E8F0 — Slate
- **Contrast Ratio:** ต้อง >= 4.5:1 (ตัวอักษรปกติ), >= 3:1 (ตัวอักษรขนาดใหญ่)

## ข้อกำหนดการวาง Widget
- **ตำแหน่งปุ่ม:** fixed top-right, z-index: 70
- **ตำแหน่ง panel:** ด้านข้างของปุ่ม, z-index: 71
- **ไฟล์ layout:** app/[locale]/layout.tsx
- **ไฟล์ CSS:** app/globals.css

---

## ข้อกำหนดตาม TOR §4.2.17

เว็บไซต์ต้องผ่านการตรวจสอบตามมาตรฐานเว็บไซต์ภาครัฐ (Government Website Standard) เวอร์ชันล่าสุด:

| เครื่องมือตรวจ | URL | เกณฑ์ |
|---|---|---|
| WCAG Checker | https://achecker.ca/checker | WCAG 2.1 Level AA — ผ่าน |
| Markup Validation | https://validator.w3.org | 0 errors |
| CSS Validation | https://jigsaw.w3.org/css-validator | 0 errors |
| PageSpeed Insights | https://pagespeed.web.dev | Mobile >= 90, Desktop >= 95 |

---

## ข้อกำหนดตาม DGA 3.0 (มสพร. 11-2566)

มาตรฐานเว็บไซต์ภาครัฐ เวอร์ชัน 3.0 กำหนดให้เว็บไซต์ภาครัฐต้องผ่าน WCAG 2.1 Level AA
รายการที่เกี่ยวข้องกับ Accessibility Widget โดยตรง:

### DGA 3.0 — Accessibility Checklist

**เนื้อหาที่ต้องมี (Mandatory Content):**
- [ ] Sitemap page ที่ใช้งานได้จริง
- [ ] Search bar เข้าถึงได้จากทุกหน้า
- [ ] Privacy Policy (PDPA compliant)
- [ ] Cookie Consent + Cookie Policy
- [ ] **Accessibility Statement** — ประกาศระดับ WCAG 2.1 AA conformance
- [ ] Breadcrumb navigation ทุกหน้า

**Accessibility ที่ต้องทำ (ตาม DGA 3.0 + WCAG 2.1 AA):**
- [ ] รูปภาพทุกรูปมี alt text
- [ ] Contrast ratio >= 4.5:1 (ตัวอักษรปกติ), >= 3:1 (ตัวอักษรขนาดใหญ่)
- [ ] Keyboard navigation ครบ — ใช้งานได้โดยไม่ต้องใช้เมาส์
- [ ] Skip navigation link (ข้ามไปเนื้อหาหลัก)
- [ ] โครงสร้าง HTML semantic (h1-h6 ลำดับถูกต้อง, landmark roles)
- [ ] Screen reader compatible — ARIA labels ครบ
- [ ] Video ทุกตัวมี captions
- [ ] Audio description หรือ transcript สำหรับ video
- [ ] ผู้ใช้สามารถปรับขนาดตัวอักษรได้ (ไม่ lock ด้วย px)
- [ ] **High contrast mode** — ตัวเลือกสำหรับผู้มีปัญหาด้านสายตา
- [ ] ไม่มี content กระพริบเกิน 3 ครั้ง/วินาที
- [ ] Error messages ในฟอร์มชัดเจน ระบุจุดที่ผิด
- [ ] Form labels เชื่อมกับ input อย่างถูกต้อง (htmlFor/id)
- [ ] Focus visible ทุก interactive element
- [ ] ประกาศ lang attribute บน HTML (lang="th" / lang="en" ฯลฯ)
- [ ] Navigation consistent ทุกหน้า
- [ ] Responsive ทุก breakpoint (Mobile/Tablet/Desktop)
- [ ] ไม่ใช้สีเพียงอย่างเดียวในการสื่อความหมาย

**Technical / Security (DGA 3.0):**
- [ ] HTTPS ทั้งเว็บ
- [ ] Domain ภายใต้ .go.th
- [ ] W3C-valid HTML + CSS

---

## ฟีเจอร์ทั้ง 14 ข้อ

### กลุ่ม A — ปรับขนาด (Slider +/- Controls, range 6 ระดับ, default = ระดับ 3)

| # | ชื่อ TH | ชื่อ EN | วิธี implement |
|---|---------|---------|---------------|
| 1 | ขนาดเนื้อหา | Content Size | CSS class บน `<html>` → `zoom: 0.85/0.9/1/1.1/1.2/1.3` |
| 2 | ขนาดแบบอักษร | Font Size | CSS class บน `<html>` → `font-size: 81.25%/87.5%/100%/112.5%/125%/137.5%` |
| 3 | ความสูงของบรรทัด | Line Height | CSS class บน `<html>` → `body { line-height: 1.2/1.4/1.6/1.8/2.0/2.4 }` |
| 4 | ระยะห่างของอักษร | Letter Spacing | CSS class บน `<html>` → `body { letter-spacing: -0.5/0/0.5/1/1.5/2.5 px }` |

### กลุ่ม B — เน้นเนื้อหา (Toggle Buttons)

| # | ชื่อ TH | ชื่อ EN | วิธี implement |
|---|---------|---------|---------------|
| 5 | เน้นหัวเรื่อง | Highlight Headings | CSS class → `h1-h6 { outline: 3px solid #C5A572; background: rgba(197,165,114,0.08) }` |
| 6 | เน้นลิงก์ | Highlight Links | CSS class → `a { outline: 2px solid #C5A572; text-decoration: underline }` |

### กลุ่ม C — โหมดการแสดงผล (Toggle Buttons)

| # | ชื่อ TH | ชื่อ EN | วิธี implement |
|---|---------|---------|---------------|
| 7 | คอนทราสต์มืด | Dark Contrast | `html { filter: invert(1) hue-rotate(180deg) }` + re-invert img/video/canvas |
| 8 | คอนทราสต์สว่าง | Light Contrast | `html { filter: contrast(1.15) brightness(1.1) }` |
| 9 | ภาพขาวดำ | Grayscale | `html { filter: grayscale(100%) }` |
| 10 | คอนทราสต์สูง | High Contrast | `html { filter: contrast(1.4) }` |
| 11 | ความอิ่มตัวสีสูง | High Saturation | `html { filter: saturate(2) }` |
| 12 | ความอิ่มตัวสีต่ำ | Low Saturation | `html { filter: saturate(0.3) }` |
| 13 | เน้นเมื่อชี้ | Highlight Cursor | `html *:hover { outline: 3px solid #C5A572 }` |
| 14 | อ่านออกเสียง | Text to Speech | Web Speech API — `speechSynthesis.speak()` — detect locale for voice |

## กฎ Mutual Exclusion
- `darkContrast` <-> `lightContrast` เลือกได้ทีละอัน
- `highSaturation` <-> `lowSaturation` เลือกได้ทีละอัน

## State Management
```typescript
interface A11yState {
  contentSize: number;        // 0-5, default 2
  fontSize: number;           // 0-5, default 2
  lineHeight: number;         // 0-5, default 2
  letterSpacing: number;      // 0-5, default 2
  highlightHeadings: boolean;
  highlightLinks: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  grayscale: boolean;
  highContrast: boolean;
  highSaturation: boolean;
  lowSaturation: boolean;
  highlightHover: boolean;
  textToSpeech: boolean;
}
```
- Persist ด้วย localStorage key: `"a11y-preferences"`
- Load on mount, save on every state change
- Reset button คืนค่าทั้งหมดเป็น default

## CSS Strategy (สำคัญมาก — ห้ามกระทบเว็บเดิม)
1. ทุก CSS class ต้องมี prefix `a11y-` เช่น `a11y-font-3`, `a11y-dark-contrast`
2. ทุก class ใส่บน `<html>` element เท่านั้น (ไม่แก้ style ของ component อื่น)
3. ใช้ `!important` เฉพาะ accessibility overrides
4. Dark contrast mode ต้อง re-invert `img, video, canvas, svg image, [style*="background-image"]`
5. Widget panel เอง (class `a11y-panel-root`) ต้อง re-invert ใน dark mode เพื่อให้อ่านได้
6. **ห้าม** inject `<style>` tags แบบ dynamic — ทุก CSS ต้องอยู่ใน static stylesheet (CSP compliance)

## Keyboard & ARIA (ห้ามข้าม)
- **Tab / Shift+Tab** — เลื่อนระหว่าง controls
- **Enter / Space** — toggle ปุ่ม
- **Escape** — ปิด panel + return focus ไปที่ปุ่มเปิด
- **Focus trap** — Tab ไม่หลุดออกนอก panel ตอนเปิด
- ปุ่มเปิด: `aria-label`, `aria-expanded`, `aria-controls="a11y-panel"`
- Panel: `role="dialog"`, `aria-label`, `aria-modal="true"`
- Toggle: `aria-pressed="true/false"`
- Slider group: `role="group"`, `aria-label`
- State change: `<div role="status" aria-live="polite">` (hidden, screen reader only)

## Text-to-Speech Implementation (7 ภาษา)
```typescript
// Voice mapping สำหรับ 7 ภาษา BOI
const VOICE_MAP: Record<string, string> = {
  th: 'th-TH',
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  de: 'de-DE',
  fr: 'fr-FR',
};

// เมื่อ TTS mode เปิด:
// 1. Add event listener "mouseup" บน document
// 2. เมื่อ user select text แล้วปล่อยเมาส์ → อ่านออกเสียง
// 3. ใช้ locale ปัจจุบันเพื่อเลือก voice จาก VOICE_MAP
// 4. Cancel utterance เก่าก่อนอ่านใหม่
// 5. เมื่อปิด TTS mode → cancel + remove listener

const utterance = new SpeechSynthesisUtterance(selectedText);
utterance.lang = VOICE_MAP[currentLocale] || 'en-US';
utterance.rate = 0.9;
speechSynthesis.cancel();
speechSynthesis.speak(utterance);
```

## i18n — Translation Keys (7 ภาษา)

Widget ต้องมี translation สำหรับทุก label ใน 7 ภาษา:

```typescript
// ตัวอย่าง structure ใน messages/th.json
{
  "a11y": {
    "title": "การเข้าถึง",
    "subtitle": "ปรับการแสดงผลตามความต้องการ",
    "reset": "คืนค่าเริ่มต้น",
    "close": "ปิด",
    "contentSize": "ขนาดเนื้อหา",
    "fontSize": "ขนาดแบบอักษร",
    "lineHeight": "ความสูงของบรรทัด",
    "letterSpacing": "ระยะห่างของอักษร",
    "highlightHeadings": "เน้นหัวเรื่อง",
    "highlightLinks": "เน้นลิงก์",
    "darkContrast": "คอนทราสต์มืด",
    "lightContrast": "คอนทราสต์สว่าง",
    "grayscale": "ภาพขาวดำ",
    "highContrast": "คอนทราสต์สูง",
    "highSaturation": "ความอิ่มตัวสีสูง",
    "lowSaturation": "ความอิ่มตัวสีต่ำ",
    "highlightHover": "เน้นเมื่อชี้",
    "textToSpeech": "อ่านออกเสียง",
    "ttsActive": "เลือกข้อความที่ต้องการฟัง",
    "default": "ค่าเริ่มต้น"
  }
}

// messages/en.json
{
  "a11y": {
    "title": "Accessibility",
    "subtitle": "Adjust display to your needs",
    "reset": "Reset",
    "close": "Close",
    "contentSize": "Content Size",
    "fontSize": "Font Size",
    "lineHeight": "Line Height",
    "letterSpacing": "Letter Spacing",
    "highlightHeadings": "Highlight Headings",
    "highlightLinks": "Highlight Links",
    "darkContrast": "Dark Contrast",
    "lightContrast": "Light Contrast",
    "grayscale": "Grayscale",
    "highContrast": "High Contrast",
    "highSaturation": "High Saturation",
    "lowSaturation": "Low Saturation",
    "highlightHover": "Highlight Cursor",
    "textToSpeech": "Text to Speech",
    "ttsActive": "Select text to listen",
    "default": "Default"
  }
}

// messages/ja.json
{
  "a11y": {
    "title": "アクセシビリティ",
    "subtitle": "表示をお好みに調整",
    "reset": "リセット",
    "close": "閉じる",
    "contentSize": "コンテンツサイズ",
    "fontSize": "フォントサイズ",
    "lineHeight": "行の高さ",
    "letterSpacing": "文字間隔",
    "highlightHeadings": "見出しを強調",
    "highlightLinks": "リンクを強調",
    "darkContrast": "ダークコントラスト",
    "lightContrast": "ライトコントラスト",
    "grayscale": "グレースケール",
    "highContrast": "ハイコントラスト",
    "highSaturation": "高彩度",
    "lowSaturation": "低彩度",
    "highlightHover": "カーソル強調",
    "textToSpeech": "テキスト読み上げ",
    "ttsActive": "読み上げるテキストを選択",
    "default": "デフォルト"
  }
}

// messages/zh.json
{
  "a11y": {
    "title": "无障碍",
    "subtitle": "根据您的需求调整显示",
    "reset": "重置",
    "close": "关闭",
    "contentSize": "内容大小",
    "fontSize": "字体大小",
    "lineHeight": "行高",
    "letterSpacing": "字间距",
    "highlightHeadings": "突出标题",
    "highlightLinks": "突出链接",
    "darkContrast": "暗色对比",
    "lightContrast": "亮色对比",
    "grayscale": "灰度",
    "highContrast": "高对比度",
    "highSaturation": "高饱和度",
    "lowSaturation": "低饱和度",
    "highlightHover": "突出光标",
    "textToSpeech": "文字转语音",
    "ttsActive": "选择要朗读的文字",
    "default": "默认"
  }
}

// messages/ko.json
{
  "a11y": {
    "title": "접근성",
    "subtitle": "필요에 맞게 화면을 조정하세요",
    "reset": "초기화",
    "close": "닫기",
    "contentSize": "콘텐츠 크기",
    "fontSize": "글꼴 크기",
    "lineHeight": "줄 높이",
    "letterSpacing": "자간",
    "highlightHeadings": "제목 강조",
    "highlightLinks": "링크 강조",
    "darkContrast": "다크 대비",
    "lightContrast": "라이트 대비",
    "grayscale": "흑백",
    "highContrast": "높은 대비",
    "highSaturation": "높은 채도",
    "lowSaturation": "낮은 채도",
    "highlightHover": "커서 강조",
    "textToSpeech": "음성 읽기",
    "ttsActive": "읽을 텍스트를 선택하세요",
    "default": "기본값"
  }
}

// messages/de.json
{
  "a11y": {
    "title": "Barrierefreiheit",
    "subtitle": "Anzeige nach Ihren Bedürfnissen anpassen",
    "reset": "Zurücksetzen",
    "close": "Schließen",
    "contentSize": "Inhaltsgröße",
    "fontSize": "Schriftgröße",
    "lineHeight": "Zeilenhöhe",
    "letterSpacing": "Zeichenabstand",
    "highlightHeadings": "Überschriften hervorheben",
    "highlightLinks": "Links hervorheben",
    "darkContrast": "Dunkler Kontrast",
    "lightContrast": "Heller Kontrast",
    "grayscale": "Graustufen",
    "highContrast": "Hoher Kontrast",
    "highSaturation": "Hohe Sättigung",
    "lowSaturation": "Niedrige Sättigung",
    "highlightHover": "Cursor hervorheben",
    "textToSpeech": "Vorlesen",
    "ttsActive": "Text zum Vorlesen auswählen",
    "default": "Standard"
  }
}

// messages/fr.json
{
  "a11y": {
    "title": "Accessibilité",
    "subtitle": "Ajustez l'affichage selon vos besoins",
    "reset": "Réinitialiser",
    "close": "Fermer",
    "contentSize": "Taille du contenu",
    "fontSize": "Taille de police",
    "lineHeight": "Hauteur de ligne",
    "letterSpacing": "Espacement des lettres",
    "highlightHeadings": "Surligner les titres",
    "highlightLinks": "Surligner les liens",
    "darkContrast": "Contraste sombre",
    "lightContrast": "Contraste clair",
    "grayscale": "Niveaux de gris",
    "highContrast": "Contraste élevé",
    "highSaturation": "Saturation élevée",
    "lowSaturation": "Saturation faible",
    "highlightHover": "Surligner le curseur",
    "textToSpeech": "Synthèse vocale",
    "ttsActive": "Sélectionnez le texte à écouter",
    "default": "Par défaut"
  }
}
```

## Animation (Framer Motion 11)
- Panel เปิด: slide-in + fade + scale
- Panel ปิด: slide-out + fade + scale
- Easing: `[0.16, 1, 0.3, 1]` (expo-out)
- ปุ่ม hover: scale 1.08
- ปุ่ม tap: scale 0.92
- **ต้อง respect `prefers-reduced-motion: reduce`** — ปิดทุก animation

```typescript
// ตรวจ reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Framer Motion variants
const panelVariants = {
  hidden: prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 20, scale: 0.95 },
  visible: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, scale: 1, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.4 } },
  exit: prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } },
};
```

## UI Layout ของ Panel
```
+-------------------------------------+
| [logo] การเข้าถึง      [reset] [X]  | <- Header (Navy #1B2A4A bg, white text)
|        Accessibility                 |
+-------------------------------------+
| ! เลือกข้อความที่ต้องการฟัง          | <- TTS banner (Gold bg, ถ้าเปิด TTS)
+-------------------------------------+
| ขนาดเนื้อหา      [-] ค่าเริ่มต้น [+] | <- Slider control
| ขนาดแบบอักษร     [-] ค่าเริ่มต้น [+] |
| ความสูงของบรรทัด  [-] ค่าเริ่มต้น [+] |
| ระยะห่างของอักษร  [-] ค่าเริ่มต้น [+] |
+-------------------------------------+
| [H เน้นหัวเรื่อง] [link เน้นลิงก์]   | <- 2-col grid
+-------------------------------------+
| [moon คอนทราสต์มืด] [sun สว่าง]     | <- 2-col grid
| [img ภาพขาวดำ]    [circle สูง]      |
| [palette อิ่มสีสูง] [droplet ต่ำ]    |
| [pointer เน้นชี้]  [volume อ่านเสียง] |
+-------------------------------------+
|       WCAG 2.1 Level AA             | <- Footer badge
|       DGA 3.0 Compliant             |
+-------------------------------------+
```

## ไฟล์ที่ต้องสร้าง/แก้ไข
1. **`components/AccessibilityWidget.tsx`** — Component หลัก (portable, self-contained)
2. **`app/globals.css`** — เพิ่ม CSS classes สำหรับทุก mode (prefix `a11y-`)
3. **`messages/th.json`** — เพิ่ม translation keys (a11y namespace)
4. **`messages/en.json`** — เพิ่ม translation keys
5. **`messages/ja.json`** — เพิ่ม translation keys
6. **`messages/zh.json`** — เพิ่ม translation keys
7. **`messages/ko.json`** — เพิ่ม translation keys
8. **`messages/de.json`** — เพิ่ม translation keys
9. **`messages/fr.json`** — เพิ่ม translation keys
10. **`app/[locale]/layout.tsx`** — import + render `<AccessibilityWidget />` (1 บรรทัด)

## สิ่งที่ห้ามทำ
- ห้ามแก้ไข component อื่นในเว็บเดิม
- ห้ามเพิ่ม npm dependency ใหม่ (ใช้ next-intl, framer-motion, lucide-react ที่มีอยู่แล้ว)
- ห้ามใช้ inline style ที่มี `!important` (ยกเว้น a11y CSS overrides)
- ห้ามเปลี่ยน z-index ของ element เดิม
- ห้ามแก้ไข global CSS ที่ไม่ใช่ a11y-prefixed
- ห้าม inject `<style>` tags แบบ dynamic (CSP compliance)

## Checklist ก่อนส่งงาน

### Widget Functionality
- [ ] Build ผ่าน — zero errors
- [ ] หน้าเว็บหลักเปิดได้ปกติ — HTTP 200
- [ ] ทุก 14 ฟีเจอร์ทำงาน + reset ได้
- [ ] localStorage persist หลัง reload
- [ ] Keyboard navigation ครบ (Tab, Enter, Escape)
- [ ] Focus trap ทำงานตอน panel เปิด
- [ ] prefers-reduced-motion ปิด animation
- [ ] ไม่กระทบ style/layout ของเว็บเดิม
- [ ] TTS อ่านออกเสียงได้ทุก 7 ภาษา
- [ ] Panel scroll ได้ถ้าเนื้อหาเกินจอ (max-height)
- [ ] Mobile responsive (panel full-width บน mobile)

### มาตรฐานที่ต้องผ่าน (TOR §4.2.17 + DGA 3.0)
- [ ] achecker.ca — WCAG 2.1 Level AA Pass
- [ ] validator.w3.org — 0 errors (Markup)
- [ ] jigsaw.w3.org/css-validator — 0 errors (CSS)
- [ ] PageSpeed Insights — Mobile >= 90, Desktop >= 95
- [ ] Lighthouse Accessibility Score >= 90

### DGA 3.0 Compliance
- [ ] Skip navigation link มีอยู่ทุกหน้า
- [ ] Breadcrumb navigation ทุกหน้า
- [ ] Accessibility Statement page มีอยู่ในเว็บ
- [ ] Cookie Consent + Cookie Policy
- [ ] Privacy Policy (PDPA)
- [ ] Sitemap page ใช้งานได้
- [ ] lang attribute ถูกต้องตาม locale ปัจจุบัน
- [ ] alt text ครบทุกรูป
- [ ] Video captions (ถ้ามี video)
- [ ] HTTPS enforced
````

---

## อ้างอิง

| แหล่ง | URL |
|---|---|
| DGA 3.0 (มสพร. 11-2566) | https://standard.dga.or.th/standard/dga-std/8091/ |
| WCAG 2.1 — W3C | https://www.w3.org/TR/WCAG21/ |
| achecker.ca (ตาม TOR) | https://achecker.ca/checker |
| Thai Web Accessibility | https://www.thaiwebaccessibility.com |
| TOR §4.2.17 | ดู Docs/tor.md บรรทัด 79 |
| BOI Analysis §9 | ดู Docs/boi_analysis.md บรรทัด 516-553 |
