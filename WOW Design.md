# ContentThailand — WOW Design Master Plan v2.0

> **Blueprint สำหรับ Redesign ContentThailand**
> **ให้ระดับ BFI + TMDb Visual + Letterboxd Emotion + Linear Polish**
> Version 2.0 | March 2026

---

## 1. Design Philosophy

> **"The National Lens of Thai Content"**
>
> ContentThailand ต้องรู้สึกเหมือน "โรงภาพยนตร์ระดับชาติ" ที่ทันสมัย —
> Cinematic, authoritative, culturally rich, แต่ไม่ boring.
> ทุก interaction รู้สึกเหมือน "เปิดม่านหนัง"
> เหมือน BFI authority ผสม Letterboxd emotion ผสม Linear polish.
>
> **"เห็นทุกเรื่องราว ค้นพบทุกแรงบันดาลใจ"**

### Target Impression (สิ่งที่กรรมการต้องรู้สึกใน 3 วินาทีแรก)

| ความรู้สึก | ทำอย่างไร |
|-----------|----------|
| **"ทันสมัยมาก"** | Premium animations, glassmorphism, scroll-driven reveals, cinematic depth |
| **"น่าเชื่อถือ"** | Government branding ชัด, ข้อมูลครบ, design สะอาดสง่า |
| **"ใช้งานง่าย"** | Navigation ชัด, search ฉลาด, responsive ทุกหน้าจอ |
| **"ระดับสากล"** | สลับ TH/EN ได้ทันที, design เทียบ BFI/TMDb, accessibility เกินมาตรฐาน |
| **"ครบทุกระบบ"** | กดได้ทุกปุ่ม ไม่มี dead-end, detail pages ครบ, admin dashboard พร้อม |

### Context ของโครงการ

```
ผู้ว่าจ้าง:     กระทรวงวัฒนธรรม / กรมส่งเสริมวัฒนธรรม
โดเมน:         contentthailand.com
ประเภท:        National Content Database (ภาพยนตร์, ซีรีส์, บุคลากร, บริษัท)
Benchmark:     BFI (UK), KoBiz/KOFIC (Korea), TMDb, Letterboxd
เป้าหมาย:      ฐานข้อมูลสื่อเนื้อหาไทยที่ดีที่สุดในอาเซียน
Demo:          Mock data, pitching mode — UX/UI ต้องกดได้ทุกจุด
Theme:         Dark theme (midnight #14133D) — cinematic first
```

---

## 2. Current Problems Analysis

### จากการ Audit Source Code ทั้งหมด

| ปัญหา | ระดับ | สาเหตุใน Code | ผลกระทบ |
|--------|-------|---------------|---------|
| **ไม่มีรูปภาพจริง** | CRITICAL | Mock data ไม่มี poster/thumbnail URLs → แสดง fallback initials ตัวอักษร | เว็บดูว่าง ไม่มีชีวิต ไม่น่าเชื่อถือ ทำลาย wow factor 40%+ |
| **Animation แค่พอใช้ได้** | CRITICAL | มี Framer Motion แต่ใช้แค่ fade/slide พื้นฐาน ไม่มี stagger, scroll-trigger, parallax | หน้าจอรู้สึกแข็ง ไม่มี cinematic flow |
| **Cards แบน ไม่มี depth** | HIGH | Scale 1.02 + pink glow เบาๆ ไม่พอ ไม่มี z-layer, edge light, gradient overlay | การ์ดดูเหมือน template ไม่ premium |
| **Hero ยังไม่ทรงพลังพอ** | HIGH | Poster collage 8% opacity + gradient ดี แต่ขาด parallax, video BG, particle effects | First impression ไม่ปัง ไม่จดจำ |
| **Typography ไม่ dramatic** | MEDIUM | Playfair Display ดี แต่ใช้ไม่เต็มศักยภาพ ขาด letter-spacing play, weight variety | ดูเรียบเกินไป ไม่มี personality ของ film industry |
| **Micro-interaction ขาด** | HIGH | ไม่มี skeleton loading, button press feedback, page transitions | UX รู้สึก "นิ่ง" ไม่ responsive ต่อ user |
| **Accent colors ใช้น้อย** | MEDIUM | Navy/midnight dominant เกินไป pink/orange/amber ใช้แค่ badge, hover | ขาด visual variety ดู monotone |
| **Carousel ไม่ wow** | MEDIUM | Horizontal scroll + chevron พื้นฐาน ไม่มี snap, indicator, stagger animation | ดูเหมือน basic slider ไม่ cinematic |
| **Content density ไม่ดี** | MEDIUM | Text 10px, genre truncate 2, synopsis cramped | อ่านยาก ข้อมูลไม่ครบ |
| **ไม่มี page transition** | MEDIUM | Route change = hard cut ไม่มี fade/slide | ขาด flow ระหว่างหน้า |
| **Recharts ไม่ได้ใช้** | LOW | Install แล้วแต่ไม่มี data visualization ใดๆ | พลาดโอกาสสร้าง wow ด้วย interactive charts |
| **Admin dashboard ยังว่าง** | HIGH | Routes สร้างแล้วแต่ไม่มี content | Pitching demo ไม่ครบ |
| **Detail pages ไม่มี** | CRITICAL | ไม่มีหน้ารายละเอียดหนัง/คน/บริษัท ที่สมบูรณ์ | กดการ์ดไปแล้วเจอหน้าว่าง |

### สิ่งที่ดีอยู่แล้ว (ไม่ต้องรื้อ — BUILD ON TOP)

| จุดแข็ง | รายละเอียด |
|---------|-----------|
| **Color System ดี** | CI colors (midnight #14133D, pink #EC1C72, orange #F76532, amber #F6A51B, purple #702874) สวย มี identity |
| **Dark Theme เยี่ยม** | Midnight background สวย contrast ดี ดู cinematic |
| **Accessibility ครบ** | WCAG AA + 5-level zoom/font/spacing/contrast widget — เหนือกว่าทุก benchmark |
| **Font Selection ดี** | Playfair Display + Sarabun + Noto Sans Thai + JetBrains Mono ครบ |
| **Film Grain effect** | SVG noise overlay 4% opacity — premium texture |
| **Logo hover effects** | Multi-layer animation ดีมาก (glow + scale + letter-spacing + underline sweep) |
| **Bilingual** | TH/EN integrated ทั้ง font + content level |
| **Search UX** | Real-time search + category dropdown + keyboard nav |
| **Framer Motion installed** | v12.35.0 พร้อมใช้ แค่ยังไม่ได้ใช้เต็มศักยภาพ |

---

## 3. Roles — AI ต้องสวมบทบาท 6 ตำแหน่ง

### Role 1: Creative Director
| Item | Detail |
|------|--------|
| **หน้าที่** | กำหนด Visual Identity ทั้งหมด, Brand Consistency, Cinematic Atmosphere |
| **มุมมอง** | ต้องดู "official + cinematic" — เหมือน BFI ยุคใหม่ ผสม Letterboxd |
| **ตัดสินใจ** | สี, layout, atmosphere, visual hierarchy ของทุกหน้า |

### Role 2: Senior UX Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | User Flow, Information Architecture, Emotion Mapping |
| **มุมมอง** | กรรมการ + ผู้กำกับ + นักวิจัย + ประชาชนทั่วไปที่ค้นหาหนังไทย |
| **ตัดสินใจ** | Flow การค้นหา, detail page structure, admin workflow |

### Role 3: Senior UI Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | Visual Design ระดับ pixel-perfect, Component consistency |
| **มุมมอง** | ทุก component ต้อง premium + cinematic + readable |
| **ตัดสินใจ** | Card styles, poster layouts, visual hierarchy, spacing |

### Role 4: Motion Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | Animation, Micro-interaction, Scroll-driven effects |
| **มุมมอง** | Animation ต้อง "cinematic" — เหมือนเปิดม่านหนัง ไม่ใช่แค่ fade in |
| **ตัดสินใจ** | ทุก transition, hover effect, scroll reveal, page transition |

### Role 5: Frontend Architect
| Item | Detail |
|------|--------|
| **หน้าที่** | Code ที่ performant, accessible, SEO-optimized |
| **เครื่องมือ** | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12 |
| **ตัดสินใจ** | Component structure, animation performance, responsive breakpoints |

### Role 6: Bilingual Copywriter (TH/EN)
| Item | Detail |
|------|--------|
| **หน้าที่** | Copy ที่สื่อสารชัด ทั้งไทยและอังกฤษ |
| **มุมมอง** | ภาษาราชการที่ทันสมัย + วัฒนธรรมไทย — สง่า แต่เข้าถึงง่าย |
| **ตัดสินใจ** | Headlines, descriptions, CTA text, micro-copy ทุกหน้า |

---

## 4. Benchmarks (ต้องเทียบเท่าหรือชนะ)

### Tier 1: National Film Databases (คู่แข่งตรง)

| # | Brand | WOW Factor | เรียนรู้อะไร |
|---|-------|-----------|------------|
| 1 | **BFI** (bfi.org.uk) | Clean authority, dark elegance, government standard | Branding ที่สง่า, editorial layout, clean navigation |
| 2 | **KoBiz/KOFIC** (koreanfilm.or.kr) | Industry data depth, bilingual, market stats | Data dashboard, statistics page, professional network |
| 3 | **NFB** (nfb.ca) | Streaming + database, WCAG compliant, minimal design | Clean government UI, accessibility benchmark |

### Tier 2: Film Community (Visual + Emotion Reference)

| # | Brand | WOW Factor | เรียนรู้อะไร |
|---|-------|-----------|------------|
| 4 | **TMDb** (themoviedb.org) | Poster-centric, 2M+ visual assets, community-driven | Visual-first cards, poster grid layout, color extraction |
| 5 | **Letterboxd** (letterboxd.com) | Social film diary, cinematic UI, Gen Z viral | Poster wall, emotion design, social sharing, film lists |
| 6 | **MUBI** (mubi.com) | Curated cinema, editorial design, art-house aesthetic | Full-bleed imagery, editorial typography, cinematic scroll |

### Tier 3: Best-in-Class Dark UI (Design Reference)

| # | Brand | WOW Factor | เรียนรู้อะไร |
|---|-------|-----------|------------|
| 7 | **Linear** (linear.app) | Bento grid, gradient mesh, buttery animations | Layout composition, motion design, glassmorphism |
| 8 | **Vercel** (vercel.com) | Dramatic gradients, animated grid, dark + neon | Animated backgrounds, gradient art, typography scale |
| 9 | **Apple** (apple.com) | Scroll-driven animations, whitespace mastery | Sticky sections, zoom-on-scroll, cinematic reveal |
| 10 | **Stripe** (stripe.com) | Gradient mesh, clean data visualization, premium feel | Color gradients, animated illustrations, data cards |

---

## 5. Design System v2.0 — "Cinematic Authority"

### สิ่งที่เปลี่ยนจากปัจจุบัน

| ก่อน (Current) | หลัง (v2.0) |
|----------------|-------------|
| Poster collage 8% opacity | **Full-bleed cinematic hero + parallax + ambient glow** |
| Cards scale 1.02 + pink glow | **Cards with depth layers + edge glow + translateY(-8px) + poster zoom** |
| Fade/slide animations only | **Scroll-triggered reveals + staggered lists + parallax + page transitions** |
| No real images | **Real poster images from TMDB/curated + blur-hash placeholders** |
| Navy everywhere | **Layered depth: deepest → base → surface → raised → overlay (5 levels)** |
| Playfair underused | **Playfair for cinematic display + dramatic letter-spacing + text-gradient** |
| Carousel = basic scroll | **Snap carousel + staggered card entry + peek effect + dot indicators** |
| No loading states | **Skeleton screens with shimmer + blur-hash image loading** |
| Hard route changes | **Smooth page transitions (crossfade + slide)** |
| Stats counter basic | **Animated counters + glassmorphism cards + category color coding** |

### 5.1 Color System (Keep CI + Enhance Application)

```css
/* ============================================================
   ContentThailand Color System v2.0
   Foundation: Keep existing CI colors, enhance application
   ============================================================ */

/* === Existing CI Colors (KEEP - ห้ามเปลี่ยน) === */
--midnight: #14133D;
--pink: #EC1C72;
--purple: #702874;
--orange: #F76532;
--amber: #F6A51B;

/* === Background Depth Layers (สร้าง cinematic depth) === */
--ct-bg-deepest: #0E0D2A;        /* Deepest - body, hero backgrounds */
--ct-bg-base: #14133D;           /* Base - current midnight (keep) */
--ct-bg-surface: #1C1B4E;        /* Surface - cards (keep) */
--ct-bg-raised: #252466;         /* Raised - hover states (keep) */
--ct-bg-overlay: #2E2D70;        /* Overlays, modals, dropdowns */

/* === Glow System (สร้าง cinematic atmosphere) === */
--ct-glow-pink: 0 0 20px rgba(236, 28, 114, 0.15), 0 0 60px rgba(236, 28, 114, 0.05);
--ct-glow-orange: 0 0 20px rgba(247, 101, 50, 0.15), 0 0 60px rgba(247, 101, 50, 0.05);
--ct-glow-amber: 0 0 20px rgba(246, 165, 27, 0.15), 0 0 60px rgba(246, 165, 27, 0.05);
--ct-glow-purple: 0 0 20px rgba(112, 40, 116, 0.15), 0 0 60px rgba(112, 40, 116, 0.05);

/* === Ambient Background Glow === */
--ct-ambient-pink: radial-gradient(ellipse 800px 500px at 30% 20%, rgba(236, 28, 114, 0.04) 0%, transparent 70%);
--ct-ambient-purple: radial-gradient(ellipse 800px 500px at 70% 50%, rgba(112, 40, 116, 0.04) 0%, transparent 70%);
--ct-ambient-orange: radial-gradient(ellipse 600px 400px at 50% 0%, rgba(247, 101, 50, 0.03) 0%, transparent 70%);

/* === Glassmorphism Tokens === */
--ct-glass-bg: rgba(28, 27, 78, 0.6);
--ct-glass-border: rgba(255, 255, 255, 0.06);
--ct-glass-blur: blur(20px);
--ct-glass-hover: rgba(255, 255, 255, 0.03);

/* === Edge Light Effect (ขอบบนของ cards) === */
--ct-edge-light: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%);

/* === Category Color Coding === */
--ct-category-film: #EC1C72;      /* Films = Pink (primary) */
--ct-category-series: #F76532;    /* Series = Orange */
--ct-category-person: #F6A51B;    /* Persons = Amber */
--ct-category-company: #702874;   /* Companies = Purple */
--ct-category-news: #00B8FF;      /* News = Cyan */
--ct-category-award: #FFD700;     /* Awards = Gold */

/* === Gradient Definitions === */
--ct-gradient-hero: linear-gradient(135deg, #0E0D2A 0%, #14133D 30%, #1C1046 60%, #14133D 100%);
--ct-gradient-card-hover: linear-gradient(180deg, transparent 0%, rgba(20, 19, 61, 0.4) 40%, rgba(20, 19, 61, 0.95) 100%);
--ct-gradient-line: linear-gradient(90deg, transparent 0%, rgba(236, 28, 114, 0.3) 20%, rgba(247, 101, 50, 0.5) 50%, rgba(246, 165, 27, 0.3) 80%, transparent 100%);
--ct-gradient-accent: linear-gradient(135deg, #EC1C72 0%, #F76532 100%);
--ct-gradient-cta: linear-gradient(135deg, #EC1C72 0%, #702874 100%);
```

### 5.2 Typography (Keep Fonts + Enhance Usage)

```css
/* ============================================================
   Typography v2.0 - Cinematic + Authoritative
   Keep existing fonts, enhance usage
   ============================================================ */

/* Existing Fonts (KEEP):
   - Playfair Display (display/headings) --font-display
   - Sarabun (Thai headlines/body) --font-thai
   - Noto Sans Thai (body) --font-body
   - JetBrains Mono (code/technical) --font-mono
*/

/* === Display Headlines (Playfair Display - MAXIMIZE USAGE) === */
/* Hero: 56px-84px (clamp), weight 700, letter-spacing -0.02em
   ต้อง dramatic! ใช้กับ text-gradient สม่ำเสมอ */

/* === Section Titles (Playfair Display) === */
/* 28px-36px, weight 600-700, letter-spacing -0.01em
   ผสม FilmStrip decoration ให้ดู cinematic */

/* === Thai Body - เพิ่ม weight variety === */
/* Sarabun 600-700 สำหรับ card titles (ปัจจุบันใช้ 400 เกินไป)
   Noto Sans Thai 500 สำหรับ body (เพิ่ม readability) */

/* === Cinematic Text Effects === */
.ct-text-cinematic {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.ct-text-caption {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### 5.3 Premium CSS Utilities (สร้างใหม่)

```css
/* === Spotlight Effect === */
.ct-spotlight::before {
  content: '';
  position: absolute;
  top: -50%; left: 50%;
  transform: translateX(-50%);
  width: 200%; height: 200%;
  background: radial-gradient(ellipse at center, rgba(236, 28, 114, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

/* === Film Reel Border === */
.ct-reel-border {
  border-image: linear-gradient(to right, transparent, rgba(236, 28, 114, 0.3), rgba(247, 101, 50, 0.3), transparent) 1;
}

/* === Noise Grain (existing film-grain - KEEP) === */
/* SVG noise overlay at 4% opacity - already implemented */

/* === Glass Card === */
.ct-glass {
  background: var(--ct-glass-bg);
  backdrop-filter: var(--ct-glass-blur);
  border: 1px solid var(--ct-glass-border);
}

/* === Gradient Divider Line === */
.ct-divider {
  height: 1px;
  background: var(--ct-gradient-line);
}
```

---

## 6. Animation & Interaction Spec

### Design Principle

> **Animation ใน Film Database ต้อง "cinematic" —**
> - Page entrance = ม่านหนังเปิด
> - Card reveal = spotlight ส่องไป
> - Content load = film reel unwinding
> - ทุก transition ต้องรู้สึก smooth เหมือนดูหนัง ไม่สะดุด

### 6.1 Tech Stack

```json
{
  "existing": {
    "framer-motion": "^12.35.0",
    "tailwindcss-animate": "^1.0.7",
    "recharts": "^2.15.4"
  },
  "add": {
    "lenis": "^1.1.0"
  }
}
```

**ทำไมแค่เพิ่ม Lenis:**
- Framer Motion ที่มีอยู่ทำได้ทุกอย่าง (scroll trigger, stagger, layout animation, page transition)
- Lenis สำหรับ smooth scroll ให้ feel เหมือน Apple.com
- ไม่ต้อง GSAP — Framer Motion + React integrate ดีกว่า ลด bundle size
- Recharts มีอยู่แล้ว แค่ยังไม่ได้ใช้ — เอามา wow ที่ admin dashboard

### 6.2 Motion Components (สร้างใหม่)

```
apps/web/components/motion/
├── scroll-reveal.tsx        # Scroll-triggered animation wrapper
│   Props: direction (up|down|left|right), delay, duration, threshold
│   ใช้: Framer Motion useInView + motion.div
│
├── stagger-children.tsx     # Staggered children reveal
│   Props: staggerDelay (default 0.05s), direction
│   ใช้: Framer Motion variants + staggerChildren
│
├── text-reveal.tsx          # Word-by-word or char-by-char reveal
│   Props: text, type (word|char), staggerDelay
│   ใช้: Split text + Framer Motion stagger
│
├── page-transition.tsx      # Route transition wrapper
│   ใช้: AnimatePresence + motion.div at layout level
│
├── parallax-layer.tsx       # Parallax scroll effect
│   Props: speed (0.1-1.0), direction (vertical|horizontal)
│   ใช้: Framer Motion useScroll + useTransform
│
├── number-counter.tsx       # Enhanced animated counter
│   Props: target, duration, prefix, suffix
│   ใช้: Framer Motion animate + useInView
│
├── tilt-card.tsx            # 3D perspective tilt on mouse
│   Props: intensity, glare
│   ใช้: mousemove + CSS perspective transform
│
├── magnetic-button.tsx      # Button follows cursor slightly
│   Props: intensity
│   ใช้: mousemove + translate offset
│
└── presets.ts               # Shared animation constants
    fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, stagger
    Duration reference:
      instant:   100ms (hover, press)
      quick:     200ms (toggle, focus)
      normal:    300ms (card transition)
      smooth:    400ms (lift, reveal)
      dramatic:  500ms (hero, page transition)
      reveal:    600ms (section title, stagger)
      cinematic: 800ms (hero word-by-word)
      count:     2000ms (stats counter)
```

### 6.3 Scroll-Triggered Animations

| Element | Effect | Trigger | Duration |
|---------|--------|---------|----------|
| **Section Title** | Fade up + FilmStrip grow from center | Scroll into 20% viewport | 600ms stagger 100ms |
| **Card Grid** | Stagger fade-up ทีละใบ (50ms delay each) | Scroll into 15% viewport | 400ms per card |
| **Stats Counter** | Number count up + card scale in | Scroll into 30% viewport | 2000ms (count) + 400ms (card) |
| **News Cards** | Slide up + fade from bottom | Scroll into 20% viewport | 500ms stagger 80ms |
| **Feature Sections** | Alternating slide-left / slide-right | Scroll into 25% viewport | 600ms |
| **Footer** | Subtle fade up | Scroll into 10% viewport | 400ms |

### 6.4 Page Transitions

| Transition | Effect | Duration |
|-----------|--------|----------|
| **Page Enter** | Fade in + subtle slide up (20px) | 400ms |
| **Page Exit** | Fade out + slight scale down (0.98) | 300ms |
| **Modal Open** | Backdrop fade + content scale from 0.95 | 300ms spring |
| **Modal Close** | Reverse of open | 200ms |

### 6.5 Hover Interactions

```
Hover States (ทุก interactive element):
├── Buttons
│   ├── Primary CTA: scale(1.02) + glow shadow increase + gradient shift
│   ├── Secondary: border glow pink + bg subtle fill
│   ├── Ghost: text brighten + underline slide from left
│   └── Icon: scale(1.1) + color transition
├── Cards
│   ├── Film Card: translateY(-8px) + shadow deepen + edge glow + poster zoom(1.08)
│   ├── Series Card: same + orange accent instead of pink
│   ├── Person Card: avatar glow ring + info slide up
│   └── News Card: image zoom + title underline sweep
├── Navigation
│   ├── Nav Link: underline slide from left to right (gradient)
│   ├── Active: persistent gradient underline + text-white
│   └── Mobile Menu: slide from right + stagger items 50ms
├── Search
│   ├── Focus: expand width + pink glow border + backdrop blur increase
│   ├── Results: stagger fade-in 50ms each
│   └── Category Switch: tab slide animation
├── Carousel
│   ├── Card Enter: stagger slide-up from bottom
│   ├── Chevron Hover: scale(1.1) + bg opacity increase
│   └── Scroll: snap to card + momentum physics
└── Language Toggle
    └── Switch: sliding pill background (layout animation)
```

### 6.6 Hero Section Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| **Background** | Slow parallax on poster collage (0.3x speed) | Continuous on scroll |
| **Badge** | Fade up from 30px below | 0.3s delay, 0.6s duration |
| **Main Title** | Word-by-word reveal (Playfair Display) | 0.5s delay, stagger 0.08s per word |
| **Subtitle** | Fade up | 0.8s delay, 0.6s duration |
| **Search Bar** | Slide up + glow border appear | 1.0s delay, 0.5s duration |
| **Featured Card** | Slide in from right + scale + glow | 1.2s delay, 0.6s duration |
| **Scroll Indicator** | Bounce loop (existing) + fade in | 1.5s delay |
| **Stats Counter** | Count up when hero section ends | On scroll past hero |

---

## 7. Page-by-Page WOW Spec

### กฎทุกหน้า (ห้ามลืม)

1. **Scroll Animation >= 3 จุด** — ไม่มีหน้าไหนที่ "นิ่ง" ทั้งหน้า
2. **มี WOW moment >= 1 จุด** — จุดที่คนเห็นแล้ว "ว้าว"
3. **Real images** — ทุก card ต้องมีรูปจริง ห้ามมี fallback initials
4. **Responsive** — สวยทั้ง Desktop, Tablet, Mobile
5. **Bilingual** — TH/EN สลับได้ไม่แตก layout
6. **ไม่มี Dead Button** — ทุกปุ่มกดได้ แสดง mock result

---

### 7.1 Homepage `/` (Primary — First Impression)

| Section | WOW Factor | Emotion Target | Technique |
|---------|-----------|---------------|-----------|
| **Hero** | 5/5 | "นี่มันหนังชัดๆ!" | Poster wall parallax + text word-by-word reveal + ambient glow + featured card with tilt + search bar |
| **Stats Bar** | 4/5 | "ข้อมูลเยอะมาก" | Animated count-up + glassmorphism cards + category color coding + stagger entrance |
| **Film Carousel** | 5/5 | "อยากดูทุกเรื่อง" | Snap scroll + stagger card reveal + peek effect + enhanced card hover |
| **Series Carousel** | 4/5 | "มีซีรีส์ด้วย" | Same as film + orange accent |
| **News Section** | 4/5 | "ข่าวอัพเดทอยู่" | Asymmetric grid + stagger reveal + category badges |
| **CTA Section** | 5/5 | "อยากรู้เพิ่ม" | Dark section + ambient glow + gradient CTA button + film grain overlay |

**Hero Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ [NAVBAR — transparent, glassmorphism on scroll]              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ░░░░ POSTER WALL (parallax 0.3x, 12% opacity) ░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│          ┌── ambient glow (pink radial) ──┐                  │
│          │                                │                  │
│          │   CONTENT THAILAND             │                  │
│          │   (word-by-word reveal)        │                  │
│          │                                │                  │
│          │   ฐานข้อมูลสื่อเนื้อหาไทย            │                  │
│          │   ที่ใหญ่ที่สุด                      │                  │
│          │                                │                  │
│          │   [🔍 ค้นหาภาพยนตร์ ซีรีส์ บุคลากร...]   │                  │
│          │                                │                  │
│          └────────────────────────────────┘                  │
│                                                              │
│  ┌──────────┐  ← Featured Film Card                         │
│  │ POSTER   │     (floating, shadow, tilt on mouse,         │
│  │  IMAGE   │      pink edge glow, auto-rotate 5s)          │
│  │          │                                                │
│  └──────────┘                                                │
│                                                              │
│  12,000+ ภาพยนตร์  |  500+ ซีรีส์  |  3,000+ บุคลากร            │
│  (animated count-up, stagger entrance)                       │
│                                                              │
│  ▼ scroll indicator (pulse)                                  │
│                                                              │
│──────── gradient line divider (pink → orange → amber) ──────│
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Film Detail Page `/films/[slug]` (NEW — Pitching Critical)

| Section | WOW Factor | Emotion Target | Technique |
|---------|-----------|---------------|-----------|
| **Backdrop Hero** | 5/5 | "เหมือน TMDb!" | Full-width backdrop image + parallax + gradient overlay |
| **Info Panel** | 4/5 | "ข้อมูลครบจัง" | Poster + title + meta + synopsis + glassmorphism panel |
| **Cast Carousel** | 4/5 | "รู้จักทุกคน" | Circular avatar cards + scroll + category tabs |
| **Awards** | 5/5 | "น่าเชื่อถือ" | Gold glow badges + award icons + animated entrance |
| **Related Films** | 4/5 | "ค้นพบเพิ่ม" | Poster grid + stagger reveal + category link |

```
┌──────────────────────────────────────────────────────────────┐
│ [NAVBAR]                                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ░░░ BACKDROP IMAGE (full-width, 50vh, parallax) ░░░░░░░░  │
│  ░░░░░░░░░░░░░░ gradient overlay bottom ░░░░░░░░░░░░░░░░░  │
│                                                              │
│  ┌──────┐  Title (Playfair, 36px)                           │
│  │POSTER│  ชื่อไทย (Sarabun, 20px)                              │
│  │      │  2024 | Drama, Romance | 120 min                  │
│  │      │  ★ 8.5/10                                         │
│  │      │                                                    │
│  │      │  Synopsis text here...                             │
│  └──────┘                                                    │
│                                                              │
│  ═══════ gradient divider ═══════                            │
│                                                              │
│  [Cast & Crew]  [Production]  [Awards]  [Related]           │
│  ═══════════  (animated underline tabs)                      │
│                                                              │
│  Cast: circular avatar cards in horizontal scroll            │
│  Production: company logo cards                              │
│  Awards: gold glow badge cards                               │
│  Related: poster grid with stagger                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Person Detail Page `/persons/[slug]` (NEW — Pitching Critical)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌────────┐  Name (Playfair, 32px)                          │
│  │ PHOTO  │  ชื่อไทย (Sarabun, 18px)                            │
│  │(circle │  Director, Producer                              │
│  │ glow)  │  Born: 1975, Bangkok                             │
│  └────────┘                                                  │
│                                                              │
│  Biography text... (scroll reveal)                          │
│                                                              │
│  [Filmography]  [Awards]                                     │
│  ═══════════  (animated tabs)                                │
│                                                              │
│  Filmography: poster grid (filter by role)                  │
│  Awards: gold badges                                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 7.4 Library Page `/library` (Enhancement)

| Section | WOW Factor | Technique |
|---------|-----------|-----------|
| **Filter Tabs** | 4/5 | Animated sliding underline (Framer layout animation) |
| **Card Grid** | 4/5 | Stagger reveal on filter change (AnimatePresence) |
| **Category Colors** | 3/5 | Each resource type has its own accent color |

### 7.5 Admin Dashboard `/dashboard` (Pitching Critical)

| Section | WOW Factor | Emotion Target | Technique |
|---------|-----------|---------------|-----------|
| **Overview** | 4/5 | "Data-driven platform" | Stat cards with count-up + category colors + growth badges |
| **Charts** | 5/5 | "น่าเชื่อถือ" | Recharts: line/bar/pie charts with animation + dark theme |
| **Data Tables** | 4/5 | "จัดการง่าย" | Clean table + hover highlight + status badges + search |
| **Recent Activity** | 3/5 | "ทุกอย่างเคลื่อนไหว" | Timeline-style activity log |

```
┌──────────────────────────────────────────────────────────────┐
│ [SIDEBAR]  │  Dashboard Overview                             │
│            │                                                  │
│ Dashboard  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ Films      │  │12,847│ │  523 │ │3,241 │ │  187 │          │
│ Series     │  │Films │ │Series│ │People│ │Comps │          │
│ Persons    │  │+12%  │ │+8%   │ │+15%  │ │+5%   │          │
│ Companies  │  └──────┘ └──────┘ └──────┘ └──────┘          │
│ News       │                                                  │
│ Settings   │  ┌────────────────────┐ ┌──────────────┐       │
│            │  │ Content Growth     │ │ By Category  │       │
│            │  │ (Line Chart)       │ │ (Pie Chart)  │       │
│            │  │ ___/‾‾‾\___/‾‾    │ │    ◉ Film    │       │
│            │  │                    │ │    ◉ Series  │       │
│            │  └────────────────────┘ └──────────────┘       │
│            │                                                  │
│            │  Recent Films                                    │
│            │  ┌─────────────────────────────────────┐       │
│            │  │ Poster | Title | Year | Status | Act│       │
│            │  │ ────── | ───── | ──── | ────── | ───│       │
│            │  │ [img]  | หนัง1  | 2024 | ✅     | ✏️│       │
│            │  │ [img]  | หนัง2  | 2024 | ⏳     | ✏️│       │
│            │  └─────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. ห้ามทำ (Design Anti-patterns)

| # | ห้าม | เหตุผล |
|---|------|--------|
| 1 | ห้ามใช้ Light Theme เป็นหลัก | ContentThailand เป็น cinematic film database — **Dark theme คือ identity** |
| 2 | ห้ามสร้าง button/feature ที่ไม่ทำงาน | ถ้ายังไม่พร้อม = mock ด้วย toast/modal ไม่ใช่ปุ่มตาย |
| 3 | ห้าม animation เยอะจน laggy | ต้องรักษา 60fps — animation ต้อง purposeful ไม่ decorative |
| 4 | ห้ามใช้สีนอก Brand CI | midnight + pink + orange + amber + purple + category colors เท่านั้น |
| 5 | ห้าม layout แตกเมื่อสลับภาษา | Thai text ยาวกว่า English — ต้อง test ทั้ง 2 ภาษา |
| 6 | ห้ามแสดง fallback initials แทนรูป | ทุก card ต้องมี poster/photo — ถ้าไม่มีให้ใช้ blurred gradient placeholder |
| 7 | ห้ามใช้ generic placeholder text | ใช้ mock data ที่เหมือนจริง (หนังไทยจริง, คนจริง, บริษัทจริง) |
| 8 | ห้าม scroll ยาวไม่มีจุดพัก | ต้องมี gradient divider ทุก 3-4 sections |
| 9 | ห้ามเพิ่ม library ใหม่โดยไม่จำเป็น | ใช้ Framer Motion + Tailwind + Recharts ที่มีให้เต็มที่ก่อน |
| 10 | ห้ามมี section ว่างไม่มี visual | ทุก section ต้องมี icon/image/illustration ประกอบ |
| 11 | ห้าม text ต่ำกว่า 11px | Min readable size — เคยกำหนดไว้แล้ว |
| 12 | ห้ามใส่ text ใน SVG ที่จะ scale | Logo text ต้องเป็น HTML เสมอ (กฎที่มีอยู่) |

---

## 9. ต้องทำ (Design Requirements)

| # | ต้องทำ | เหตุผล |
|---|-------|--------|
| 1 | ทุกหน้ามี scroll-driven animation >= 3 จุด | สร้างความรู้สึก "มีชีวิต" ไม่ใช่ static HTML |
| 2 | ทุก card มี hover effect ที่น่าจดจำ | translateY(-8px) + glow + poster zoom — minimum |
| 3 | ทุกหน้ามี WOW moment >= 1 จุด | จุดที่คนเห็นแล้ว "ว้าว ทำได้ขนาดนี้" |
| 4 | ทุกตัวเลขสถิติมี counter animation | Count-up เมื่อ scroll เข้ามา |
| 5 | ทุก form submit ต้องมี feedback ทันที | Success toast/modal ไม่ใช่แค่ console.log |
| 6 | ทุกหน้ามี gradient divider ระหว่าง sections | สร้าง visual rhythm ไม่ใช่ hard cut |
| 7 | ใช้ motion components ที่สร้างใหม่ | ScrollReveal, StaggerChildren, TextReveal, TiltCard |
| 8 | Film grain overlay บน hero/dark sections | สร้าง cinematic texture (มีอยู่แล้ว — ใช้เพิ่ม) |
| 9 | Navbar glassmorphism on scroll | Transparent → glass effect เมื่อ scroll ลง |
| 10 | Category color coding ทุก card type | Film=pink, Series=orange, Person=amber, Company=purple |
| 11 | Mock data ต้องดูสมจริง | หนังไทยจริง, นักแสดงจริง, บริษัทจริง, poster จริง |
| 12 | Poster/photo images ทุก card | ห้าม fallback initials — ใช้ TMDB images หรือ gradient placeholder |
| 13 | Stagger animation ทุก card grid | Cards โผล่ทีละใบ delay 50ms ไม่ใช่โผล่พร้อมกัน |
| 14 | Page transitions | Fade + slide เมื่อเปลี่ยนหน้า |
| 15 | Mobile responsive ทุกหน้า | Stack layout, touch-friendly, swipe carousel |

---

## 10. Implementation Priority & Phases

### Phase 0: Quick Wins (Day 1-2) — ทำทันที ส่งผลทันที

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 0.1 | **เพิ่มรูปภาพจริงใน mock data** (TMDB posters for Thai films + persons) | CRITICAL | MEDIUM |
| 0.2 | **สร้าง ScrollReveal component** (Framer Motion useInView wrapper) | HIGH | LOW |
| 0.3 | **สร้าง StaggerChildren component** (stagger delay wrapper) | HIGH | LOW |
| 0.4 | **Card hover enhancement** (translateY -8px + deeper shadow + zoom 1.08) | HIGH | LOW |
| 0.5 | **Gradient line dividers** (CSS gradient ระหว่าง sections) | MEDIUM | LOW |
| 0.6 | **Hero text stagger** (word-by-word reveal ด้วย TextReveal) | HIGH | LOW |

### Phase 1: Foundation Enhancement (Day 3-5)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1.1 | **Wrap ทุก section ด้วย ScrollReveal + StaggerChildren** | HIGH | LOW |
| 1.2 | **Navbar glassmorphism on scroll** | MEDIUM | LOW |
| 1.3 | **Carousel: scroll-snap + peek + dot indicators** | HIGH | MEDIUM |
| 1.4 | **Stats counter: glassmorphism cards + category colors + progress bars** | MEDIUM | LOW |
| 1.5 | **Page transitions** (AnimatePresence at layout level) | MEDIUM | MEDIUM |
| 1.6 | **Install Lenis** for smooth scroll | MEDIUM | LOW |
| 1.7 | **Enhanced button/link hover** (underline slide, glow effects) | MEDIUM | LOW |
| 1.8 | **TiltCard** for featured film in hero | MEDIUM | LOW |

### Phase 2: Detail Pages (Day 6-10) — Pitching Critical

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 2.1 | **Film detail page** (backdrop parallax, poster, cast carousel, awards, related) | CRITICAL | HIGH |
| 2.2 | **Person detail page** (photo, bio, filmography grid, awards) | CRITICAL | HIGH |
| 2.3 | **Company detail page** (logo, filmography, contacts) | HIGH | MEDIUM |
| 2.4 | **News detail page** (editorial layout, related articles) | HIGH | MEDIUM |
| 2.5 | **Series detail page** (similar to film with episode list) | HIGH | MEDIUM |

### Phase 3: Admin Dashboard (Day 11-15) — Pitching Critical

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 3.1 | **Dashboard overview** (stat cards + count-up + Recharts line/pie) | CRITICAL | HIGH |
| 3.2 | **Films management** (data table + CRUD form + status badges) | CRITICAL | HIGH |
| 3.3 | **Persons management** (same pattern) | HIGH | MEDIUM |
| 3.4 | **Companies management** | HIGH | MEDIUM |
| 3.5 | **News management** | HIGH | MEDIUM |
| 3.6 | **Series management** | HIGH | MEDIUM |

### Phase 4: Polish & Advanced (Day 16+)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 4.1 | **Interactive data visualizations** (Recharts on public stats page) | HIGH | HIGH |
| 4.2 | **Skeleton loading states** (shimmer pattern) | MEDIUM | MEDIUM |
| 4.3 | **Hero parallax poster wall** (enhanced from 8% → 12% + parallax) | MEDIUM | MEDIUM |
| 4.4 | **Featured card mouse-follow tilt** (TiltCard component) | MEDIUM | LOW |
| 4.5 | **Advanced search with filters** (genre, year, type) | HIGH | HIGH |
| 4.6 | **Command palette** (Cmd+K search) | MEDIUM | MEDIUM |
| 4.7 | **Social sharing cards** (OG image generation) | MEDIUM | HIGH |

---

## 11. Quality Gate (ทุกหน้าต้องผ่าน 15 ข้อ)

### Universal Checks

| # | Check | Home | Detail | Library | Admin |
|---|-------|------|--------|---------|-------|
| 1 | **WOW moment >= 1** | Hero reveal | Backdrop parallax | Filter tabs | Chart animations |
| 2 | **Real images** | Poster wall + cards | Backdrop + poster | Thumbnails | Table thumbnails |
| 3 | **Scroll animation >= 3** | Section reveals | Content stagger | Grid reveal | N/A (single view) |
| 4 | **Hover interaction** | Card lift + glow | Cast cards + tabs | Resource cards | Table row highlight |
| 5 | **Typography hierarchy** | Playfair hero | Playfair title | Section titles | Clean data font |
| 6 | **Color meaningful** | Category coded | Genre badges | Type badges | Status badges |
| 7 | **Dark theme** | Layered depth | Glassmorphism | Surface variety | Clean dark |
| 8 | **Mobile responsive** | Stack layout | Scroll layout | 1-col grid | Sidebar collapse |
| 9 | **Load time < 3s** | Lazy images | Lazy sections | Pagination | Server render |
| 10 | **Accessibility** | WCAG AA | WCAG AA | WCAG AA | WCAG AA |

### ContentThailand-Specific Checks

| # | Check | Description |
|---|-------|------------|
| 11 | **Bilingual consistency** | ทุกหน้า TH/EN สลับได้ smooth ไม่มีข้อความหาย |
| 12 | **Government authority feel** | ดูน่าเชื่อถือ professional สง่า — ไม่ดูเหมือน startup |
| 13 | **Cinematic atmosphere** | Film grain, gradient depth, spotlight effects, ambient glow |
| 14 | **Data completeness** | ทุก card มีข้อมูลครบ ไม่มี "N/A" หรือ fallback initials |
| 15 | **Cultural sensitivity** | ภาพ/ข้อมูลภาพยนตร์ไทยถูกต้อง ไม่ผิดเพี้ยน |

---

## 12. Benchmark Scoring Target

| Dimension | BFI | TMDb | Letterboxd | KoBiz | **ContentThailand v2.0** |
|-----------|-----|------|-----------|-------|--------------------------|
| Visual Design | 4 | 4 | 5 | 2 | **5** |
| Data Authority | 5 | 3 | 2 | 5 | **5** |
| Animation/Motion | 2 | 3 | 3 | 1 | **4** |
| Mobile UX | 3 | 4 | 5 | 2 | **4** |
| Bilingual | 3 | 4 | 2 | 4 | **5** |
| Industry Stats | 3 | 2 | 1 | 5 | **4** |
| Accessibility | 4 | 3 | 3 | 2 | **5** |
| Overall WOW | 3 | 4 | 5 | 2 | **5** |

### Win Strategy

```
ContentThailand = BFI Authority + TMDb Visual + Letterboxd Emotion + Linear Polish
               + Thailand's Accessibility Leadership + Bilingual Excellence
```

เราชนะได้เพราะ:
1. Government sites (BFI, KoBiz) UI ดูเก่า — เราทำ modern ได้
2. Community sites (TMDb, Letterboxd) ไม่มี government authority — เรามี
3. ไม่มีใครใน ASEAN มี national film database ระดับนี้
4. Accessibility system ที่มีอยู่แล้วเหนือกว่าทุก benchmark

---

## 13. Session Start Prompt (สำหรับ AI)

```
คุณคือทีมพัฒนาเว็บระดับ Awwwards ที่ออกแบบ National Film Database:
- Creative Director: ทิศทาง cinematic + authoritative visual
- Senior UX Designer: User Flow สำหรับ กรรมการ + ผู้กำกับ + ประชาชน + นักวิจัย
- Senior UI Designer: Premium dark UI ที่ใช้ midnight + pink + orange CI
- Motion Designer: Cinematic animation ด้วย Framer Motion
- Frontend Architect: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
- Bilingual Copywriter: ไทย/อังกฤษ ภาษาราชการที่ทันสมัย

อ่านไฟล์ก่อนเริ่ม:
1. "WOW Design.md" (ไฟล์นี้)
2. Docs/Benchmark.md (คู่แข่งระดับโลก)
3. apps/web/app/globals.css (design tokens)

กฎสำคัญ:
- นี่คือ Pitching Demo — ใช้ mock data ได้ ทุกหน้าต้องดูสมบูรณ์
- Dark theme เป็นหลัก (#14133D midnight) — cinematic film database
- สี CI: midnight + pink (#EC1C72) + orange (#F76532) + amber (#F6A51B) + purple (#702874)
- ทุก card ต้องมี real poster/photo images — ห้ามมี fallback initials
- ทุกหน้าต้องมี scroll animation >= 3 จุด + WOW moment >= 1 จุด
- ทุกปุ่มต้องกดได้ → แสดง mock result (toast/modal/state change)
- ใช้ motion components: ScrollReveal, StaggerChildren, TextReveal, TiltCard, NumberCounter
- ทุก text ต้อง bilingual (TH/EN)
- Animation ต้อง cinematic — เหมือนเปิดม่านหนัง ไม่ใช่แค่ fade in
- ห้ามเพิ่ม library ใหม่โดยไม่จำเป็น — Framer Motion + Tailwind + Recharts เพียงพอ
- respects prefers-reduced-motion

Benchmark: ชนะ BFI + KoBiz ด้านความทันสมัย
เทียบเท่า TMDb + Letterboxd ด้าน visual
มี polish ระดับ Linear.app + Stripe.com
เป็นฐานข้อมูลภาพยนตร์ภาครัฐที่ดีที่สุดในอาเซียน
```

---

## Appendix A: Animation Duration Reference

```
Instant feedback:  100ms  (hover states, button press)
Quick transition:  200ms  (tab switch, toggle, focus)
Normal animation:  300ms  (card transition, link hover)
Smooth animation:  400ms  (card lift, scroll reveal)
Dramatic effect:   500ms  (hero entrance, page transition)
Reveal animation:  600ms  (section title, stagger group)
Cinematic reveal:  800ms  (hero title word-by-word)
Count up:          2000ms (stats counter animation)
```

## Appendix B: Component File Structure

```
apps/web/components/
├── motion/                        # NEW: Animation utilities
│   ├── scroll-reveal.tsx          # Scroll-triggered animation wrapper
│   ├── stagger-children.tsx       # Staggered children reveal
│   ├── text-reveal.tsx            # Word-by-word text reveal
│   ├── page-transition.tsx        # Route transition wrapper
│   ├── parallax-layer.tsx         # Parallax scroll effect
│   ├── number-counter.tsx         # Enhanced animated counter
│   ├── tilt-card.tsx              # 3D perspective tilt on mouse
│   ├── magnetic-button.tsx        # Button follows cursor slightly
│   └── presets.ts                 # Animation preset constants
├── ui/                            # Enhanced shadcn components
│   ├── glass-card.tsx             # Glassmorphism card
│   ├── gradient-button.tsx        # CTA button with gradient + glow
│   ├── animated-tabs.tsx          # Tabs with sliding indicator
│   └── gradient-divider.tsx       # Section divider with gradient line
├── home/                          # Enhanced existing
│   ├── HeroBanner.tsx             # ENHANCE: parallax + text stagger + ambient glow
│   ├── ContentCarousel.tsx        # ENHANCE: snap + peek + indicators + stagger
│   ├── FilmCard.tsx               # ENHANCE: hover depth + glow + poster zoom
│   ├── SeriesCard.tsx             # ENHANCE: hover depth + orange glow
│   ├── StatsCounter.tsx           # ENHANCE: glassmorphism + progress bars + category colors
│   └── NewsSection.tsx            # ENHANCE: stagger reveal + category badges
├── detail/                        # NEW: Detail page components
│   ├── film-hero.tsx              # Backdrop parallax hero
│   ├── cast-carousel.tsx          # Circular avatar carousel
│   ├── award-badges.tsx           # Gold glow award display
│   ├── filmography-grid.tsx       # Poster grid with filters
│   └── related-content.tsx        # Related items grid
├── admin/                         # NEW: Admin dashboard
│   ├── dashboard-stats.tsx        # Overview stat cards with count-up
│   ├── data-table.tsx             # Enhanced CRUD table
│   ├── chart-card.tsx             # Recharts wrapper (dark theme)
│   └── sidebar-nav.tsx            # Admin navigation
└── layout/                        # Enhanced existing
    ├── Navbar.tsx                  # ENHANCE: glassmorphism on scroll + gradient border
    ├── Footer.tsx                  # ENHANCE: scroll reveal + gradient divider
    └── ...existing files
```

## Appendix C: Image Strategy for Mock Data

```
Priority Order:
1. ภาพยนตร์ — ใช้ TMDB poster URLs สำหรับหนังไทย
   Format: https://image.tmdb.org/t/p/w500/{poster_path}
2. บุคลากร — ใช้ TMDB profile URLs สำหรับนักแสดง/ผู้กำกับไทย
3. ซีรีส์ — ใช้ TMDB backdrop URLs
4. บริษัท — ใช้ real company logos (Sahamongkol, GDH, GTH, Kantana etc.)
5. ข่าว — ใช้ Unsplash cinema-related images

Fallback Strategy (ห้ามใช้ single-letter initials):
- Generate blurred gradient placeholder ด้วย CSS
- ใช้สี category color เป็น base
- แสดง title text overlay บน gradient
```

## Appendix D: Tagline Options

| # | TH | EN | Use Case |
|---|----|----|----------|
| 1 | **"เห็นทุกเรื่องราว ค้นพบทุกแรงบันดาลใจ"** | "See Every Story. Discover Every Inspiration." | Primary — Hero headline |
| 2 | **"ฐานข้อมูลสื่อเนื้อหาไทยที่ใหญ่ที่สุด"** | "Thailand's Largest Content Database" | Secondary — Subheadline |
| 3 | **"เชื่อมโยงอุตสาหกรรมสื่อเนื้อหาไทยสู่โลก"** | "Connecting Thai Content Industry to the World" | About page |
| 4 | **"ค้นหา สำรวจ ค้นพบ"** | "Search. Explore. Discover." | CTA tagline |

---

> **"เห็นทุกเรื่องราว ค้นพบทุกแรงบันดาลใจ"**
> — ContentThailand, ฐานข้อมูลสื่อเนื้อหาไทยที่ใหญ่ที่สุด
