# PROMPT_P0.md — Phase 0 Cursor Prompt (Copy → Paste ใน Cursor Chat)
# ใช้ prompt นี้เริ่มงานทันที

---

## 📋 PROMPT สำหรับ Phase 0 (Setup + Design System + Mock Data)

```
อ่าน memory.md, .cursorrules, PHASES.md, DESIGN_SYSTEM.md และ DB_SCHEMA.md ก่อน
แล้วทำ Phase 0 ทั้งหมด:

1. สร้าง monorepo structure ตาม memory.md (pnpm workspaces)
2. Init Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui (dark theme)
3. Install ทุก shadcn/ui components ที่ระบุใน PHASES.md ข้อ 0.3
4. สร้าง tailwind.config.ts พร้อม custom colors และ fonts จาก DESIGN_SYSTEM.md
5. สร้าง lib/fonts.ts ด้วย next/font (Playfair Display, Sarabun, Noto Sans Thai)
6. สร้าง types/index.ts พร้อม interfaces ทั้งหมด: Film, TvSeries, Person, Company, Genre, Award, News
7. สร้าง components/layout/FilmStrip.tsx ตาม spec ใน DESIGN_SYSTEM.md
8. สร้าง components/layout/Navbar.tsx (dark, with TH/EN language toggle)
9. สร้าง components/layout/Footer.tsx (dark, with links)
10. สร้าง lib/mock-data/films.ts พร้อม 30 ภาพยนตร์ไทยจริง (titleTh, titleEn, year, synopsis)
11. สร้าง lib/mock-data/series.ts พร้อม 15 ละครไทย
12. สร้าง lib/mock-data/persons.ts พร้อม 30 บุคลากรไทย (ผู้กำกับ + นักแสดง)
13. สร้าง lib/mock-data/companies.ts พร้อม 10 บริษัทจริง
14. สร้าง docker-compose.yml ตาม PHASES.md ข้อ 0.5
15. สร้าง prisma/schema.prisma ตาม DB_SCHEMA.md
16. สร้าง lib/utils.ts พร้อม: cn(), formatThaiDate(), formatNumber(), slugify()
17. สร้าง contexts/LanguageContext.tsx
18. สร้าง app/(public)/layout.tsx ด้วย fonts + dark bg + Navbar + Footer

ตรวจสอบว่า:
- pnpm dev รันได้
- TypeScript: 0 errors (pnpm tsc --noEmit)
- localhost:3000 แสดง dark background + gold accent
- ไม่มี console errors
```

---

## 📋 PROMPT สำหรับ Phase 1 (Homepage WOW)

```
Phase 0 เสร็จแล้ว อ่าน WOW_MOMENTS.md ข้อ WOW #1 และ WOW #2 ก่อน

สร้าง Homepage (/app/(public)/page.tsx) พร้อม sections ต่อไปนี้:

1. HeroBanner component:
   - Full viewport height (100vh)
   - Background: dark overlay 60% บนภาพ backdrop (ใช้ CSS gradient ถ้าไม่มีรูปจริง)
   - Film grain texture overlay (CSS noise pattern opacity 0.04)
   - FilmStrip animation: horizontal scroll ซ้าย-ขวา ช้าๆ (ใช้ CSS animation keyframes)
   - Title: "CONTENT THAILAND" Playfair Display 72px white
   - Subtitle: "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ" Sarabun
   - Search bar: full width, gold border, placeholder ภาษาไทย
   - Entrance animations: Framer Motion stagger (title, subtitle, search)
   - Scroll indicator: animated chevron

2. StatsCounter section (4 animated cards):
   - 562 ภาพยนตร์ / 737 ละครโทรทัศน์ / 5,888 บุคลากร / 1,254,036 ผู้เข้าชม
   - Count up from 0 on scroll-enter (Intersection Observer + Framer Motion)
   - Gold numbers, Playfair Display font
   - "+12 เดือนนี้" green badge ใต้ตัวเลข

3. FilmCarousel: "ภาพยนตร์ล่าสุด" — horizontal scroll, 6 cards จาก mock data
4. SeriesCarousel: "ละครโทรทัศน์ล่าสุด" — same pattern
5. NewsSection: 3 latest news cards
6. Footer ด้วยข้อมูล: กองภาพยนตร์และวีดิทัศน์แห่งชาติ

Design: ตาม DESIGN_SYSTEM.md — dark, gold accents, film strip motifs
ทุก section มี FilmStrip decoration บน heading
```

---

## 📋 PROMPT สำหรับ Phase 2 (Films)

```
Phase 1 เสร็จแล้ว สร้าง Films section:

1. /films (listing page):
   - FilmStrip header: "ฐานข้อมูลภาพยนตร์"
   - Filter bar: ปี (dropdown) / ประเภท (multi-select) / บริษัท (dropdown)
   - Sort: ใหม่สุด / ชื่อ A-Z / ปีที่ฉาย
   - Grid/List view toggle (icon buttons)
   - FilmCard grid: 30 mock films
   - Pagination controls
   - Result count: "แสดง 1-20 จาก 562 เรื่อง"

2. FilmCard component (grid variant):
   - Poster: 2:3 ratio, rounded-xl
   - Year badge: gold pill top-right
   - Genre badge: bottom-left
   - Hover: dark overlay + synopsis + gold border glow (see WOW_MOMENTS.md WOW #3)
   - Click → /films/[slug]

3. /films/[slug] (detail page):
   - Cinematic hero: full-width backdrop, gradient to dark
   - Floating poster (2:3, shadow-2xl) overlapping hero
   - Title (Thai + English), year, duration, genre chips
   - Synopsis tabs: ภาษาไทย / English
   - Cast & Crew grid (4-6 people from mock data)
   - Related films carousel (same genre)
   - Breadcrumb: หน้าหลัก > ภาพยนตร์ > {title}
   - Share buttons

Mock data จาก lib/mock-data/films.ts (ข้อมูลจริงไทย 30 เรื่อง)
```

---

## 📋 PROMPT สำหรับ Phase 3 (Search)

```
Phase 2 เสร็จแล้ว สร้าง Search system:

1. SearchBar component (ใน Navbar และ Hero):
   - Debounce 300ms
   - Dropdown results (max 8): แบ่ง Films / Series / Persons
   - Each result: thumbnail + titleTh (bold) + year
   - Thai keyword highlighted in gold (#C9A84C)
   - Keyboard navigation: ↑↓ Enter Esc
   - "ดูผลทั้งหมด {n} รายการ →" footer link
   - Empty state: "ไม่พบ '{query}'"
   - Loading: spinner icon ใน input

2. /search page:
   - URL: /search?q=xxx
   - H1: ผลการค้นหา: "{q}" ({total} รายการ)
   - Tabs: ทั้งหมด / ภาพยนตร์ / ละคร / บุคลากร / บริษัท
   - Results grid with keyword highlight
   - Empty state design
   - Recent searches (localStorage, max 5)

3. API route: /api/search?q=xxx&type=all
   - Filter mock data ด้วย ILIKE logic (string includes)
   - Return grouped results: { films, series, persons, companies }
   - Add <mark> tags around matching keyword for highlighting

ทดสอบ: ค้นหา "ฉลาด" → ขึ้น "ฉลาดเกมส์โกง"
ทดสอบ: ค้นหา "บุพเพ" → ขึ้น "บุพเพสันนิวาส"
```

---

## 📋 PROMPT สำหรับ Phase 5 (Admin Dashboard)

```
Phase 4 เสร็จแล้ว อ่าน WOW_MOMENTS.md WOW #6 ก่อน

สร้าง Admin Dashboard (/app/(admin)/):

1. Admin Layout:
   - Sidebar ซ้าย 256px dark navy
   - Logo + navigation items (Dashboard, Films, Series, Persons, Users, Logs, System)
   - Active: gold left border 3px + gold text
   - Collapse on mobile

2. Dashboard page (/dashboard):
   Row 1 - 4 Stat cards (animate count-up):
   - 562 ภาพยนตร์, 737 ละครโทรทัศน์, 5,888 บุคลากร, 1,254,036 ผู้เข้าชม
   
   Row 2 - Charts (ใช้ recharts หรือ shadcn charts):
   - Line chart: Monthly visitors 12 เดือน (mock data)
   - Donut chart: สัดส่วนเนื้อหาแต่ละประเภท
   
   Row 3 - Activity + System:
   - Activity feed: 10 รายการ mock actions ("Admin เพิ่ม Film X เมื่อ 5 นาทีที่แล้ว")
   - System status: Web ✅ / DB ✅ / Search ✅ / Backup ✅
   - Resource gauges: CPU 12% / RAM 3.2GB/16GB / Disk 45%

3. Films table (/dashboard/films):
   - DataTable component: sort, filter, pagination
   - Columns: # | Poster thumbnail | ชื่อไทย | ชื่ออังกฤษ | ปี | ประเภท | สถานะ | Actions
   - Edit → Sheet drawer opens with form
   - Submit form → Toast "บันทึกสำเร็จ ✅"

ทุก element ต้องดูเป็น production-ready ไม่ใช่ prototype
```

---

## 📋 PROMPT สำหรับ Phase 8 (Polish + Docker)

```
Phases 0-7 เสร็จแล้ว ทำ Production-ready Polish:

1. Performance:
   - Run Lighthouse audit
   - Fix ทุก issue จนได้ Performance ≥ 90
   - Verify all images ใช้ next/image
   - Add loading="lazy" สำหรับ below-fold images

2. SEO (TOR 4.8):
   - metadata export ทุกหน้า (title, description, OG)
   - สร้าง app/sitemap.ts
   - สร้าง app/robots.ts
   - เพิ่ม Google Analytics 4 script (placeholder MEASUREMENT_ID)

3. Accessibility:
   - All images: alt text ภาษาไทย
   - Focus rings visible
   - ARIA labels บน icon buttons
   - Skip-to-content link

4. Docker Compose Production:
   สร้าง docker-compose.prod.yml พร้อม:
   - web: Next.js production build (next build + next start)
   - strapi: production mode
   - postgres: 16-alpine with volume
   - redis: 7-alpine
   - nginx: reverse proxy (:80 → :3000 web, :1337 strapi)
   
5. สร้างไฟล์:
   - .env.example (ทุก env vars ที่ใช้)
   - nginx/nginx.conf
   - scripts/backup.sh (TOR 4.7)
   - README.md พร้อม setup instructions

ตรวจสอบ final checklist ใน WOW_MOMENTS.md ทุกข้อ
```
