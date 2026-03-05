# DESIGN_SYSTEM.md — Frame of Thailand Design System (Merged with Official CI)
# ทุก component ต้องผ่าน spec นี้ — ห้าม improvise นอก spec
# MERGED: Official ContentThailand CI colors + "Frame of Thailand" cinematic concept

## Brand Personality
- **Premium** — ไม่ใช่เว็บภาครัฐทั่วไป
- **Cinematic** — รู้สึกเหมือนเปิด Netflix ไทย + Thai creative energy
- **Trustworthy** — ข้อมูลน่าเชื่อถือ รัฐบาลสนับสนุน
- **Vibrant** — สีสันจาก CI จริง: Navy + Purple + Pink + Orange = พลังสร้างสรรค์ไทย
- **Warm** — Thai cultural warmth, not cold corporate

## Brand Concept: "Frame of Thailand" + Official CI
- Film strip motif (from Frame of Thailand concept) = visual signature
- Color palette from official ContentThailand CI = brand continuity
- Midnight Navy background = cinematic dark mode
- Gradient accents (Purple→Pink, Orange→Amber) = vibrant Thai energy
- Logo: Official ContentThailand flame "C" icon (gradient orange→pink)

---

## Color System

### Primary Palette (from Official CI)
```css
:root {
  /* Dark Theme (default) — CI Primary */
  --midnight:       #14133D;   /* Midnight Navy — primary dark bg */
  --navy:           #1C1B4E;   /* Card bg (lighter navy) */
  --navy-hover:     #252466;   /* Card hover */
  --navy-subtle:    #191847;   /* Subtle dark variant */

  /* Brand Purple — CI Primary */
  --purple:         #702874;   /* Royal Purple — accent */
  --purple-light:   #8B3591;   /* Hover purple */
  --purple-muted:   #5A2060;   /* Subtle purple */

  /* Brand Pink — CI Primary */
  --pink:           #EC1C72;   /* Hot Pink / Fuchsia — primary CTA */
  --pink-light:     #F43F8A;   /* Hover pink */
  --pink-muted:     #C41660;   /* Subtle pink */

  /* Brand Orange — CI Secondary */
  --orange:         #F76532;   /* Sunset Orange — warm accent */
  --orange-light:   #F9844A;   /* Hover orange */

  /* Brand Amber — CI Secondary */
  --amber:          #F6A51B;   /* Amber / Golden Yellow — highlight */
  --amber-light:    #F8B840;   /* Hover amber */

  /* Gradients (from CI) */
  --gradient-primary:   linear-gradient(135deg, #14133D 0%, #702874 50%, #EC1C72 100%);
  --gradient-secondary: linear-gradient(135deg, #F76532 0%, #F6A51B 100%);
  --gradient-accent:    linear-gradient(135deg, #702874 0%, #EC1C72 100%);

  /* Light Theme */
  --surface:        #F8F7F4;
  --surface-alt:    #F2F4F7;
  --surface-card:   #FFFFFF;

  /* Text */
  --text-primary:   #1A202C;
  --text-secondary: #4A5568;
  --text-muted:     #718096;
  --text-on-dark:   #F8F7F4;
  --text-on-pink:   #FFFFFF;
  --text-on-orange: #14133D;

  /* Status */
  --success:        #276749;
  --success-bg:     #F0FFF4;
  --error:          #C53030;
  --error-bg:       #FFF5F5;
  --warning:        #C05621;
  --warning-bg:     #FFFBEB;
  --info:           #2B6CB0;
  --info-bg:        #EBF8FF;

  /* Borders */
  --border:         #E2E8F0;
  --border-dark:    rgba(255,255,255,0.08);
  --border-pink:    rgba(236, 28, 114, 0.4);
  --border-purple:  rgba(112, 40, 116, 0.4);
}
```

### Tailwind Config Extension
```typescript
// tailwind.config.ts
colors: {
  midnight: '#14133D',
  navy: {
    DEFAULT: '#1C1B4E',
    hover: '#252466',
    subtle: '#191847',
  },
  purple: {
    DEFAULT: '#702874',
    light: '#8B3591',
    muted: '#5A2060',
  },
  pink: {
    DEFAULT: '#EC1C72',
    light: '#F43F8A',
    muted: '#C41660',
  },
  orange: {
    DEFAULT: '#F76532',
    light: '#F9844A',
  },
  amber: {
    DEFAULT: '#F6A51B',
    light: '#F8B840',
  },
  surface: {
    DEFAULT: '#F8F7F4',
    alt: '#F2F4F7',
  },
}
```

---

## 📝 Typography

### Font Loading (next/font)
```typescript
// lib/fonts.ts
import { Playfair_Display, Sarabun, Noto_Sans_Thai, JetBrains_Mono } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-thai',
  display: 'swap',
})

export const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})
```

### Type Scale
```css
/* Display — Hero titles, section headers */
.text-display-xl  { font: 700 4.5rem/1.1 var(--font-display); }
.text-display-lg  { font: 700 3.5rem/1.2 var(--font-display); }
.text-display-md  { font: 700 2.5rem/1.2 var(--font-display); }

/* Thai Headings */
.text-heading-xl  { font: 700 2rem/1.3 var(--font-thai); }
.text-heading-lg  { font: 700 1.5rem/1.4 var(--font-thai); }
.text-heading-md  { font: 600 1.25rem/1.4 var(--font-thai); }

/* Body */
.text-body-lg     { font: 400 1.125rem/1.7 var(--font-body); }
.text-body-md     { font: 400 1rem/1.7 var(--font-body); }
.text-body-sm     { font: 400 0.875rem/1.6 var(--font-body); }
.text-caption     { font: 400 0.75rem/1.5 var(--font-body); }
```

---

## 🧩 Core Components

### 1. FilmStrip — Brand Motif
```tsx
// components/layout/FilmStrip.tsx
// Usage: <FilmStrip><h2>ภาพยนตร์ไทย</h2></FilmStrip>

interface FilmStripProps {
  children: React.ReactNode
  color?: 'pink' | 'orange' | 'white' | 'muted'  // pink = CI primary accent
  size?: 'sm' | 'md' | 'lg'
}

// Renders:
// ◼ ◼ ◼ ◼ ◼ [children] ◼ ◼ ◼ ◼ ◼
// With gradient pink→orange color (CI accent) and slight opacity variation
```

### 2. FilmCard — Core content card
```tsx
// components/films/FilmCard.tsx

interface FilmCardProps {
  film: {
    slug: string
    titleTh: string
    titleEn: string
    year: number
    posterUrl?: string
    genres: Array<{ nameTh: string; nameEn: string }>
    synopsisTh?: string
  }
  variant?: 'grid' | 'list' | 'featured'
  lang?: 'th' | 'en'
}

// Grid variant: 2:3 poster ratio card
// List variant: horizontal row
// Featured variant: larger with synopsis visible
```

### 3. SearchBar — Instant search
```tsx
// components/search/SearchBar.tsx

interface SearchBarProps {
  placeholder?: string
  variant?: 'hero' | 'navbar' | 'page'
  onSearch?: (query: string) => void
  autoFocus?: boolean
}

// Hero: full width, large, gold border
// Navbar: compact, expands on focus
// Page: standard, in search page header
```

### 4. StatsCard — Animated counter
```tsx
// components/home/StatsCard.tsx

interface StatsCardProps {
  value: number
  label: string
  sublabel?: string    // e.g. "+12 เดือนนี้"
  icon?: LucideIcon
  prefix?: string      // e.g. "฿"
  suffix?: string      // e.g. "+"
  duration?: number    // animation ms, default 2000
}
```

### 5. Badge — Status + Genre tags
```tsx
// components/ui/Badge variants (extend shadcn)

// Variants:
// - pink:    bg-pink text-white (primary CTA)
// - orange:  bg-orange text-midnight
// - purple:  bg-purple text-white
// - amber:   bg-amber text-midnight
// - navy:    bg-navy text-white
// - success: bg-success/20 text-success border-success/30
// - error:   bg-error/20 text-error
// - outline-pink: border-pink text-pink bg-transparent
// - genre:   bg-navy-subtle text-pink-muted text-xs
// - gradient: bg-gradient-to-r from-orange to-amber text-midnight (featured)
```

### 6. DataTable — Admin table
```tsx
// components/admin/DataTable.tsx

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  totalCount: number
  onPageChange: (page: number) => void
  onSort: (field: string, order: 'asc' | 'desc') => void
  onSearch: (query: string) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  isLoading?: boolean
}
```

### 7. Skeleton — Loading state
```tsx
// components/ui/Skeleton variants

<FilmCardSkeleton />          // grid card with shimmer
<FilmCardSkeletonList />      // list row shimmer
<StatsCardSkeleton />         // counter card
<TableRowSkeleton rows={5} /> // admin table rows
<HeroSkeleton />              // hero banner placeholder
```

---

## 📐 Layout Patterns

### Public Page Layout
```tsx
// app/(public)/layout.tsx
<html>
  <body className="bg-midnight text-text-on-dark font-thai">
    <Navbar />           {/* sticky top, dark */}
    <CookieBanner />     {/* TOR 4.17, sticky bottom */}
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

### Admin Layout
```tsx
// app/(admin)/layout.tsx
<div className="flex min-h-screen bg-midnight">
  <Sidebar />           {/* fixed left, nav items */}
  <div className="flex-1 ml-64"> {/* ml = sidebar width */}
    <AdminHeader />     {/* top bar: breadcrumb + user */}
    <main className="p-6">{children}</main>
  </div>
</div>
```

### Page Header Pattern
```tsx
// Every listing page starts with:
<section className="bg-gradient-to-b from-navy to-midnight py-16">
  <FilmStrip>
    <h1 className="text-display-lg text-gold font-display">ภาพยนตร์ไทย</h1>
  </FilmStrip>
  <p className="text-text-muted">{totalCount} รายการ</p>
</section>
```

### Grid Patterns
```css
/* Film poster grid */
.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
/* Mobile: 2 cols, Tablet: 3-4 cols, Desktop: 5-6 cols */

/* Content card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

---

## 🎬 Animation Specs

### Page Transitions
```typescript
// Using Framer Motion
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}
```

### Stagger Children (listing pages)
```typescript
const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.08 }
  }
}
const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}
```

### Film Card Hover (CSS — no JS needed)
```css
.film-card {
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s ease;
}
.film-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 0 0 1px var(--pink), 0 20px 40px rgba(0,0,0,0.4),
              0 0 30px rgba(236, 28, 114, 0.2);
}
.film-card .overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.film-card:hover .overlay {
  opacity: 1;
}
```

### Skeleton Shimmer
```css
@keyframes shimmer {
  0%   { background-position: -1000px 0; }
  100% { background-position:  1000px 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    #1C1B4E 25%,
    #252466 37%,
    #1C1B4E 63%
  );
  background-size: 1000px 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: 4px;
}
```

---

## 📱 Responsive Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'xs':  '375px',   // iPhone SE
  'sm':  '640px',   // Landscape phone
  'md':  '768px',   // iPad
  'lg':  '1024px',  // iPad Pro / Small laptop
  'xl':  '1280px',  // Standard desktop
  '2xl': '1536px',  // Large desktop
}
```

### Mobile Navigation
```tsx
// components/layout/MobileNav.tsx
// Bottom tab bar on xs/sm:
// [🏠 หน้าหลัก] [🔍 ค้นหา] [🎬 ภาพยนตร์] [📺 ละคร] [☰ เมนู]
// Fixed bottom, dark bg, gold active indicator
```

---

## 🌐 Bilingual Pattern

```typescript
// lib/i18n.ts
type Lang = 'th' | 'en'

// Content fields: titleTh / titleEn, synopsisTh / synopsisEn
// Helper:
export function getLocalizedField<T extends { [key: string]: any }>(
  item: T,
  field: string,
  lang: Lang
): string {
  const thKey = `${field}Th`
  const enKey = `${field}En`
  return lang === 'th'
    ? item[thKey] || item[enKey] || ''
    : item[enKey] || item[thKey] || ''
}

// Usage:
// getLocalizedField(film, 'title', lang) → ชื่อไทย or English title
```

### Language Context
```typescript
// contexts/LanguageContext.tsx
// Provides: lang, setLang
// Persists in: localStorage('ct-lang')
// Default: 'th'
```

---

## 🎯 DO / DON'T

### DO
- ✅ Dark backgrounds (Midnight Navy #14133D) for all primary pages
- ✅ Pink (#EC1C72) as primary CTA / accent — buttons, links, active states
- ✅ Orange→Amber gradient for secondary accents — badges, highlights, featured items
- ✅ Purple (#702874) for supporting accent — section dividers, hover states
- ✅ Large film strip art with motion (gradient pink→orange perforations)
- ✅ Typography contrast: Playfair Display for hero, Sarabun for UI
- ✅ Generous white space inside dark sections
- ✅ Rounded corners: `rounded-xl` (16px) for cards
- ✅ Use official ContentThailand flame logo (not custom)
- ✅ Gradient Primary (Navy→Purple→Pink) for hero banners and page headers

### DON'T
- ❌ White/light backgrounds for main content (only for light-mode-specific sections)
- ❌ Use gold (#C9A84C) — replaced by Amber (#F6A51B) from CI
- ❌ Small, cluttered layouts
- ❌ Generic sans-serif for headers (must be Playfair or Sarabun)
- ❌ Sharp corners on cards (always rounded-xl)
- ❌ Green/teal/cyan accent colors — strictly CI palette only
- ❌ Use colors NOT from the CI palette
