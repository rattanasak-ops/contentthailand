# PHASES.md — ContentThailand PoC Build Plan
# ใช้ไฟล์นี้เป็น checklist ประจำทุก Phase

## ภาพรวม 8 Phases (35 วัน สำหรับ Demo)

| Phase | ชื่อ | วัน | Priority |
|-------|------|-----|----------|
| P0 | Setup + Design System + Mock Data | 1-2 | 🔴 FIRST |
| P1 | Homepage WOW | 3-5 | 🔴 HIGH |
| P2 | Films Listing + Detail | 6-9 | 🔴 HIGH |
| P3 | Search | 10-12 | 🔴 HIGH |
| P4 | Series + Persons + Companies + News | 13-20 | 🟡 MED |
| P5 | Admin Dashboard WOW | 21-25 | 🔴 HIGH |
| P6 | Admin CMS Tables | 26-30 | 🟡 MED |
| P7 | Static Pages + Legal | 31-32 | 🟢 LOW |
| P8 | Polish + Docker + Deploy | 33-35 | 🔴 HIGH |

---

## PHASE 0 — Setup + Design System + Mock Data
> เป้าหมาย: monorepo พร้อม, DB seed แล้ว, design tokens ใช้ได้

### 0.1 Monorepo Init
```bash
mkdir contentthailand-poc && cd contentthailand-poc
pnpm init
# สร้าง pnpm-workspace.yaml
# สร้าง apps/web, apps/admin
# สร้าง packages/ui, packages/types, packages/mock-data
```

### 0.2 Next.js Setup
```bash
cd apps/web
pnpm create next-app . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
pnpm add framer-motion lucide-react
pnpm dlx shadcn-ui@latest init
# เลือก: Dark theme, CSS variables, zinc base
```

### 0.3 shadcn/ui Components to Install
```bash
pnpm dlx shadcn-ui@latest add button card badge input
pnpm dlx shadcn-ui@latest add table tabs select
pnpm dlx shadcn-ui@latest add dialog sheet dropdown-menu
pnpm dlx shadcn-ui@latest add skeleton avatar separator
pnpm dlx shadcn-ui@latest add chart  # for admin charts
```

### 0.4 Tailwind Config — Custom Tokens
```typescript
// tailwind.config.ts — extend with brand colors
extend: {
  colors: {
    midnight: '#0D1B2A',
    navy: { DEFAULT: '#1A3A5C', hover: '#1E4976' },
    gold: { DEFAULT: '#C9A84C', light: '#E8B84B', muted: '#8B6914' },
    surface: '#F8F7F4',
  },
  fontFamily: {
    display: ['Playfair Display', 'serif'],
    thai: ['Sarabun', 'sans-serif'],
    body: ['Noto Sans Thai', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  animation: {
    'film-scroll': 'filmScroll 20s linear infinite',
    'count-up': 'countUp 2s ease-out forwards',
    'shimmer': 'shimmer 2s infinite',
  }
}
```

### 0.5 Docker Compose — Local Dev
```yaml
# docker-compose.yml
version: '3.9'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: contentthailand
      POSTGRES_USER: ct_user
      POSTGRES_PASSWORD: ct_pass_local
    ports: ["5432:5432"]
    volumes: ["postgres_data:/var/lib/postgresql/data"]
  
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
  
  web:
    build: ./apps/web
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://ct_user:ct_pass_local@postgres:5432/contentthailand
    depends_on: [postgres, redis]
  
  strapi:
    build: ./apps/admin
    ports: ["1337:1337"]
    depends_on: [postgres]
```

### 0.6 Prisma Setup
```bash
cd apps/web
pnpm add prisma @prisma/client
pnpm prisma init
# แก้ schema.prisma ตาม DB_SCHEMA.md
pnpm prisma migrate dev --name init
pnpm prisma generate
```

### 0.7 Strapi Setup
```bash
cd apps/admin
pnpm create strapi-app . --quickstart --no-run
# เพิ่ม content types: Film, TvSeries, Person, Company, Genre, News
```

### 0.8 Mock Data Seed
สร้าง `prisma/seed.ts` พร้อม Thai data จริง:
- 30 Films (ภาพยนตร์ไทยที่คนรู้จัก)
- 15 TV Series (ละครดัง)
- 30 Persons (ผู้กำกับ/นักแสดงจริง)
- 10 Companies (บริษัทจริง)
- 10 News articles
- Genres: ดราม่า/สยองขวัญ/โรแมนติก/คอมเมดี้/แอคชัน/สารคดี

### 0.9 Core Components
- [ ] `components/layout/FilmStrip.tsx` — film strip decoration
- [ ] `components/layout/Navbar.tsx` — dark navbar + language toggle
- [ ] `components/layout/Footer.tsx` — dark footer
- [ ] `lib/fonts.ts` — next/font config
- [ ] `lib/utils.ts` — cn(), formatThaiDate(), formatNumber()
- [ ] `types/index.ts` — all TypeScript interfaces

**✅ Phase 0 Done When:**
- `pnpm dev` runs without errors
- `localhost:3000` shows default Next.js page with brand colors
- `localhost:1337` shows Strapi admin panel
- `pnpm prisma studio` shows seeded data
- All shadcn/ui components installed
- FilmStrip component renders

---

## PHASE 1 — Homepage WOW
> เป้าหมาย: กรรมการเปิดหน้าแรกแล้ว WOW ทันที

### 1.1 HeroBanner Component
```
Layout:
- Full viewport height (100vh)
- Background: backdrop-blur cinematic image (dark overlay 60%)
- Film grain texture overlay (CSS noise)
- FilmStrip decoration top and bottom
- Center: Logo + Tagline (Thai + English)
- Large Search Bar (full width, gold border)
- Scroll indicator arrow

Animations (Framer Motion):
- Title: stagger fade-up on load
- Search bar: slide-up with delay
- Film strip: horizontal scroll animation
```

### 1.2 StatsCounter Component
```
4 animated counters:
  562       ภาพยนตร์
  737       ละครโทรทัศน์
  5,888     บุคลากร
  1,254,036 ผู้เข้าชม

Animation: count up from 0 on scroll-enter (Intersection Observer)
Layout: 4-column grid, dark cards, gold numbers
```

### 1.3 FilmCarousel Component
```
- Horizontal scrolling film posters
- Title: "ภาพยนตร์ล่าสุด" with FilmStrip decoration
- Cards: 16:9 poster ratio, title overlay on hover
- Navigation: prev/next arrows + drag scroll
- Show 6 cards, load from mock data
```

### 1.4 TV Series Section
- Same as FilmCarousel but for series
- Different card aspect ratio (vertical poster)

### 1.5 Featured Person Section
- 3 featured persons with photo + name + role
- Link to /persons/[slug]

### 1.6 News Section
- 3 latest news cards (horizontal on desktop, vertical on mobile)

### 1.7 Language Toggle
- TH / EN button in navbar
- Store preference in localStorage
- All text switches: สร้าง `useLanguage()` hook + context

**✅ Phase 1 Done When:**
- Homepage looks premium at 1280px, 768px, 375px
- All 4 stat counters animate on scroll
- Carousels scroll smoothly
- Language toggle switches TH/EN
- No console errors

---

## PHASE 2 — Films Listing + Detail
> เป้าหมาย: กรรมการ browse films แล้วรู้สึกเหมือนใช้เว็บจริง

### 2.1 Films Listing Page `/films`
```
Layout:
- FilmStrip header: "ฐานข้อมูลภาพยนตร์"
- Filter bar: ปี / ประเภท / บริษัท / สถานะ
- Sort: ใหม่สุด / ชื่อ A-Z / ปีที่ฉาย
- View toggle: Grid (poster cards) / List (table rows)
- Pagination: 20 per page
- Result count: "แสดง 1-20 จาก 562 เรื่อง"
```

### 2.2 FilmCard Component
```
Grid card:
- Poster image (2:3 ratio) with shimmer skeleton
- Year badge (gold pill, top-right)
- Genre badge (bottom-left)
- Hover: dark overlay reveals synopsis (2-3 lines)
- Hover: gold border glow transition 0.3s
- Title (Thai + English)
- "ดูรายละเอียด →" link

List row:
- Small thumbnail (left)
- Title + year + genre + company (center)
- View button (right)
```

### 2.3 Film Detail Page `/films/[slug]`
```
Hero Section (cinematic):
- Full-width backdrop image (blur bottom gradient)
- Poster (left, 2:3 ratio, shadow)
- Right side: Title + Year + Duration + Genre chips
- Synopsis (TH/EN tabs)
- Production company badge

Cast & Crew Section:
- Director (featured card)
- Actors grid (photo + name + role)
- Each person links to /persons/[slug]

Awards Section:
- Timeline-style awards list

Gallery Section:
- 4-image grid (placeholder for real images)

Related Films:
- "ภาพยนตร์ที่เกี่ยวข้อง" — same genre/director
- FilmCarousel component reused

Share Card:
- Social share buttons (Facebook, X, copy link)
- Open Graph meta image preview
```

**✅ Phase 2 Done When:**
- /films shows grid with 30 mock films
- Filters change displayed results
- /films/[slug] shows full cinematic detail
- Cast links work (→ person page)
- Mobile responsive

---

## PHASE 3 — Search
> เป้าหมาย: ค้นหาแล้วเห็นผลทันที — กรรมการต้องประทับใจ

### 3.1 SearchBar Component (Global)
```
- อยู่ใน Navbar (ขยายเมื่อคลิก) + Hero banner
- Debounce 300ms
- ขณะพิมพ์: แสดง dropdown results (max 8 items)
  - Films section: poster thumbnail + title
  - Persons section: photo + name + role
  - Series section: thumbnail + title
- Footer dropdown: "ดูผลทั้งหมด {n} รายการ →"
- Keyboard: ↑↓ navigate, Enter → /search?q=xxx, Esc close
- Thai keyword highlighting (bold + gold color)
```

### 3.2 Search Results Page `/search?q=xxx`
```
- H1: "ผลการค้นหา: {query}" + result count
- Tabs: ทั้งหมด / ภาพยนตร์ / ละคร / บุคลากร / บริษัท
- Each tab: grid of result cards
- Keyword highlighted in titles
- "ไม่พบผลลัพธ์" empty state (with search suggestions)
- Recent searches (localStorage)
```

### 3.3 Mock Search API
```typescript
// app/api/search/route.ts
// GET /api/search?q=xxx&type=film|series|person
// Returns: filtered mock data with highlight markers
```

**✅ Phase 3 Done When:**
- Type "บุพเพสันนิวาส" → dropdown shows film
- Type "นนทรีย์" → shows director
- /search?q=xxx shows tabbed results
- Empty state shows correctly
- Mobile keyboard doesn't break layout

---

## PHASE 4 — Series + Persons + Companies + News
> เป้าหมาย: ครบ 11 หน้า TOR

### 4.1 TV Series (same pattern as Films)
- `/series` — listing with filters (channel, year, genre)
- `/series/[slug]` — detail (episodes list, cast)

### 4.2 Persons
- `/persons` — listing (filter by role: ผู้กำกับ/นักแสดง/โปรดิวเซอร์)
- `/persons/[slug]` — profile: bio + photo + filmography timeline

### 4.3 Companies
- `/companies` — listing (filter by type: production/distribution)
- `/companies/[slug]` — profile: logo + film catalog + series list

### 4.4 News
- `/news` — listing (latest first, tag filters)
- `/news/[slug]` — article (full content, related news)

### 4.5 Library `/library`
- Knowledge resources: research papers, industry reports, statistics
- Downloadable documents (mock PDF links)
- Category filter

**✅ Phase 4 Done When:**
- All 11+ TOR pages exist and are navigable
- No broken links
- Mobile responsive across all pages

---

## PHASE 5 — Admin Dashboard WOW
> เป้าหมาย: เปิดหน้า Dashboard แล้วกรรมการเชื่อว่าระบบ production-ready

### 5.1 Admin Layout
```
Sidebar (left, dark navy):
- ContentThailand logo
- Navigation: Dashboard / Films / Series / Persons / Companies / News / Users / Logs / System
- Active state: gold left border + gold text
- Collapse to icon on mobile
- User avatar + role badge at bottom
```

### 5.2 Dashboard Page `/dashboard`
```
Row 1 — Big Stats (4 cards, animated count-up):
  📽  562 ภาพยนตร์ (+12 เดือนนี้)
  📺  737 ละครโทรทัศน์ (+5 เดือนนี้)
  👥  5,888 บุคลากร (+43 เดือนนี้)
  👁  1,254,036 ผู้เข้าชมรวม

Row 2 — Charts:
  Left:  Line chart — Monthly visitors (last 12 months)
  Right: Donut chart — Content by category

Row 3 — Activity + System:
  Left:  "กิจกรรมล่าสุด" feed (mock real-time, 10 items)
         Each: avatar + action + timestamp
         e.g. "Admin เพิ่มภาพยนตร์ บุพเพสันนิวาส 2 นาทีที่แล้ว"
  Right: System Status panel
         ✅ Database: Online
         ✅ Web Server: Online (Uptime 99.9%)
         ✅ Search: Online
         ✅ Backup: Last run 06:00 (success)
         ⚡ CPU: 12% | RAM: 3.2GB/16GB | Disk: 45%
```

### 5.3 Top Searches Widget
- Bar chart: "คำค้นหายอดนิยม" (top 10 keywords)

**✅ Phase 5 Done When:**
- Dashboard loads in <2s
- All charts render (recharts or shadcn chart)
- Activity feed scrolls smoothly
- System status cards display
- Mobile sidebar collapses correctly

---

## PHASE 6 — Admin CMS Tables
> เป้าหมาย: กรรมการเห็นว่าระบบ Manage ข้อมูลได้จริง

### 6.1 Data Table Component (Reusable)
```
Features:
- Sortable columns (click header)
- Filter row (search per column)
- Bulk select (checkboxes)
- Pagination (10/20/50 per page)
- Action buttons: View / Edit / Delete (mock)
- Export button (CSV — mock)
- Status badge (published/draft/archived)
```

### 6.2 Films Management `/dashboard/films`
```
Columns: #ID | Poster | ชื่อภาษาไทย | ชื่อภาษาอังกฤษ | ปี | ประเภท | บริษัท | สถานะ | Actions
Actions: Edit (opens drawer) | View (opens new tab) | Archive
```

### 6.3 Film Add/Edit Form
```
Form sections:
- ข้อมูลพื้นฐาน: titleTh, titleEn, year, duration
- เนื้อเรื่อง: synopsisTh (textarea), synopsisEn (textarea)
- การจัดประเภท: genre (multi-select), company (select)
- รูปภาพ: posterUrl, backdropUrl (file upload UI — mock)
- สถานะ: published / draft
Submit: "บันทึก" button (mock — shows success toast)
```

### 6.4 Users & Roles `/dashboard/users`
```
Table: Name | Email | Role | Last Login | Status | Actions
Roles displayed: Super Admin (red) / Editor (blue) / Viewer (gray)
Add User button: opens dialog with form
```

### 6.5 Activity Log `/dashboard/logs`
```
Table: Timestamp | User | Action | Entity | IP Address | Status
Filter: date range, user, action type
Export CSV button
```

**✅ Phase 6 Done When:**
- All management tables render with mock data
- Sorting and filtering work
- Edit form opens and submits with success toast
- Users table shows RBAC roles clearly

---

## PHASE 7 — Static Pages + Legal
> เป้าหมาย: ครบทุกหน้าตาม TOR

### 7.1 `/about`
- เกี่ยวกับ ContentThailand
- วิสัยทัศน์ + พันธกิจ
- ข้อมูลสถิติ
- ทีมงาน (mock)
- ประวัติความเป็นมา timeline

### 7.2 `/contact`
- ข้อมูลติดต่อ
- แผนที่ (Google Maps embed)
- Contact form (UI only — mock submit)

### 7.3 `/privacy` — PDPA
- นโยบายความเป็นส่วนตัว (ข้อความจริง ภาษาไทย)
- Cookie policy section
- Data subject rights section

### 7.4 CookieBanner Component
```
- Fixed bottom bar, dark bg, gold accept button
- Text: "เราใช้คุกกี้เพื่อพัฒนาประสบการณ์ของคุณ..."
- Buttons: "ยอมรับทั้งหมด" (gold) | "ตั้งค่า" (outline) | "ปฏิเสธ" (ghost)
- Stores choice in localStorage
- Disappears after choice
```

### 7.5 Error Pages
- `not-found.tsx` — 404 with film reel illustration
- `error.tsx` — generic error with retry button

---

## PHASE 8 — Polish + Docker + Deploy
> เป้าหมาย: Demo-ready, runs on VPS, looks production-grade

### 8.1 Performance
- [ ] Lighthouse score ≥ 90 on all pages
- [ ] All images: next/image with proper sizes
- [ ] Font optimization: next/font (no layout shift)
- [ ] Code splitting verified (bundle analyzer)
- [ ] API routes: add caching headers

### 8.2 Animation Polish
- [ ] Page transitions: fade between routes
- [ ] Scroll animations: elements slide-up on enter
- [ ] Film strip: continuous horizontal scroll animation
- [ ] Hover states: all interactive elements
- [ ] Loading: skeleton shimmer gold animation

### 8.3 SEO (TOR 4.8)
- [ ] `metadata` export on every page
- [ ] Open Graph images for sharing
- [ ] sitemap.xml generated
- [ ] robots.txt
- [ ] GA4 script injected in layout.tsx

### 8.4 Accessibility
- [ ] All images have `alt` text
- [ ] Focus ring visible on keyboard navigation
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Skip-to-content link
- [ ] ARIA labels on icon buttons

### 8.5 Docker Production
```yaml
# docker-compose.prod.yml
# Next.js: build + start (not dev)
# Strapi: production mode
# Nginx: reverse proxy + SSL termination
# Certbot: Let's Encrypt auto-renewal
```

### 8.6 Environment Files
```
.env.example (commit this)
.env.local   (never commit)
.env.prod    (never commit)
```

**✅ Phase 8 / Project Done When:**
- `docker compose -f docker-compose.prod.yml up` starts everything
- Demo URL accessible from VPS IP
- Lighthouse ≥ 90
- Mobile tested on real device
- All 11+ public pages load correctly
- Admin dashboard loads correctly
- No TypeScript errors (`pnpm tsc --noEmit`)
- No ESLint errors
