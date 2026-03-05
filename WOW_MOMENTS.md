# WOW_MOMENTS.md — Demo Strategy for Committee Judges
# ทุก WOW ต้องพร้อมก่อน Demo — checklist นี้คือ Definition of Done สำหรับ Presentation

## 🎯 Judge Journey Map
กรรมการจะเห็นอะไรบ้าง และต้องรู้สึกอะไรในแต่ละขั้นตอน:

```
1. เปิด URL → [WOW #1 Hero] → รู้สึก: "โอ้โห สวยมาก ไม่เหมือนเว็บภาครัฐทั่วไปเลย"
2. เห็น Stats → [WOW #2 Counter] → รู้สึก: "ข้อมูลเยอะมาก น่าเชื่อถือ"
3. Scroll Films → [WOW #3 Cards] → รู้สึก: "ดูเหมือน Netflix ไทย"
4. พิมพ์ค้นหา → [WOW #4 Search] → รู้สึก: "เร็วมาก ค้นหาได้จริง"
5. คลิก Film → [WOW #5 Detail] → รู้สึก: "ข้อมูลครบ ออกแบบดีมาก"
6. เปิด Admin → [WOW #6 Dashboard] → รู้สึก: "ระบบหลังบ้านก็สวยด้วย มืออาชีพ"
7. เห็น Data Table → [WOW #7 CMS] → รู้สึก: "จัดการข้อมูลได้จริง ใช้งานง่าย"
8. ปิดหน้าจอ → ความทรงจำ: "เว็บนี้น่าจะดีที่สุดในบรรดาที่ยื่นมา"
```

---

## WOW #1 — Cinematic Hero Banner

**หน้าที่:** `/` (Homepage)
**Timing:** ทันทีที่เปิดหน้า (First Impression = ทุกอย่าง)

**ต้องทำให้ได้:**
- [ ] Full viewport height (100vh), dark background
- [ ] Cinematic backdrop image (ภาพจาก Thai film — dark overlay 60%)
- [ ] Film grain texture CSS overlay (`opacity: 0.03`)
- [ ] Film strip animation: ◼◼◼◼ เลื่อนซ้าย-ขวา ช้าๆ (20s loop)
- [ ] Title "CONTENT THAILAND" — Playfair Display font, white, large
- [ ] Subtitle ภาษาไทย — "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ"
- [ ] Search bar — full width, gold border glow, placeholder "ค้นหาภาพยนตร์ ละคร บุคลากร..."
- [ ] Entrance animations: title slides up, search fades in (Framer Motion, stagger 0.2s)
- [ ] Scroll indicator: animated chevron down

**CSS Film Grain:**
```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.04;
  pointer-events: none;
}
```

---

## WOW #2 — Animated Stats Counter

**หน้าที่:** `/` (Section ใต้ Hero)
**Timing:** trigger เมื่อ scroll เข้า viewport

**ต้องทำให้ได้:**
- [ ] 4 cards: ภาพยนตร์ / ละครโทรทัศน์ / บุคลากร / ผู้เข้าชม
- [ ] Numbers count up from 0 → ค่าจริง (2 วินาที, easeOut)
- [ ] Gold number color, large font (Playfair Display 56px)
- [ ] Card: dark navy bg, subtle gold top border, shadow
- [ ] "+12 เดือนนี้" badge (green, small) ใต้ตัวเลขหลัก
- [ ] Intersection Observer — animate once on enter

**Animation Hook:**
```typescript
// hooks/useCountUp.ts
export function useCountUp(end: number, duration: number = 2000) {
  // Returns animated number value
  // Uses requestAnimationFrame for smooth counting
}
```

---

## WOW #3 — Film Card Hover Reveal

**หน้าที่:** `/`, `/films`
**Timing:** Mouse hover

**ต้องทำให้ได้:**
- [ ] Card resting state: poster image + title + year badge
- [ ] Hover transition (0.3s ease-in-out):
  - Dark overlay rises from bottom (70% opacity)
  - Synopsis text revealed (2-3 lines, clamped)
  - Gold border appears (1px → 2px, glow `box-shadow: 0 0 20px gold/30%`)
  - "ดูรายละเอียด →" button slides up
- [ ] Scale: `transform: scale(1.02)` on hover
- [ ] Genre badges show in bottom-left
- [ ] Cursor: pointer

```css
.film-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.film-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 0 2px var(--gold), 0 0 30px rgba(201, 168, 76, 0.2);
}
```

---

## WOW #4 — Instant Search (Type-as-you-go)

**หน้าที่:** Hero search bar + Navbar search
**Timing:** As user types

**ต้องทำให้ได้:**
- [ ] Debounce 300ms (ไม่ lag ขณะพิมพ์)
- [ ] Dropdown appears below input (dark card, shadow)
- [ ] Results grouped: 🎬 ภาพยนตร์ | 📺 ละคร | 👤 บุคลากร
- [ ] Each result: thumbnail (left) + title + year (right)
- [ ] **Keyword highlighted in gold** in matching text
- [ ] Loading spinner while fetching
- [ ] "ดูผลทั้งหมด {n} รายการ →" footer link
- [ ] Keyboard navigation: ↑↓ arrow, Enter go to result, Esc close
- [ ] Empty state: "ไม่พบ '{query}' — ลองค้นหาด้วยคำอื่น"
- [ ] Max dropdown height 400px, scrollable
- [ ] Click outside → close

---

## WOW #5 — Film Detail Page (Cinematic Layout)

**หน้าที่:** `/films/[slug]`
**Timing:** On page load

**ต้องทำให้ได้:**
- [ ] Full-width backdrop image (top 50% of page), gradient fade to dark below
- [ ] Floating poster (2:3 ratio) overlapping hero + content area
- [ ] Title: Thai (large, Playfair) + English (smaller, muted)
- [ ] Info pills: ปี | ความยาว | ประเภท (gold pills)
- [ ] Synopsis tabs: ไทย / English (smooth tab switch)
- [ ] Cast grid: 4-6 people, photo + name + role
- [ ] Person cards link to `/persons/[slug]`
- [ ] Awards timeline (ถ้ามี)
- [ ] Related films carousel (same genre)
- [ ] Share buttons: Facebook, X, copy link
- [ ] Breadcrumb: หน้าหลัก > ภาพยนตร์ > ฉลาดเกมส์โกง
- [ ] "แก้ไขข้อมูล" link (admin only, shows if logged in)

---

## WOW #6 — Admin Dashboard

**หน้าที่:** `/dashboard`
**Timing:** Immediately on open — judges must see this screen actively

**ต้องทำให้ได้:**
- [ ] Dark sidebar (navy), gold active indicator, smooth collapse
- [ ] 4 stat cards top row — animated count-up on load
- [ ] Line chart: "ผู้เข้าชมรายเดือน" (12 months, recharts)
- [ ] Donut chart: "เนื้อหาตามประเภท" (film/series/person ratio)
- [ ] Activity feed (right panel):
  - Avatar + action + time ("5 นาทีที่แล้ว")
  - Auto-scrolling or new item appears every 8s (mock polling)
  - Colors: green = CREATE, blue = UPDATE, red = DELETE
- [ ] System status panel:
  - Each service: green dot + "Online" or red "Offline"
  - CPU/RAM/Disk gauges (mock values, look real)
  - "Last backup: วันนี้ 06:00 น. ✅"
- [ ] Top searches bar chart (horizontal, gold bars)
- [ ] Responsive: sidebar collapses on < 1024px

---

## WOW #7 — Admin CMS Table

**หน้าที่:** `/dashboard/films`
**Timing:** Show judges the management capability

**ต้องทำให้ได้:**
- [ ] Table with 30 mock films visible
- [ ] Sortable columns (click header → asc/desc arrow)
- [ ] Search filter bar above table
- [ ] Status badge: 🟢 Published / 🟡 Draft / ⚫ Archived
- [ ] Row hover: subtle highlight
- [ ] Actions: Edit (drawer) | View | Archive
- [ ] Edit drawer: opens from right (shadcn Sheet), form fields populated
- [ ] "บันทึก" button → success toast "บันทึกข้อมูลสำเร็จ ✅"
- [ ] Pagination: "แสดง 1-20 จาก 562 รายการ"
- [ ] Bulk select: checkboxes + "เลือก 5 รายการ" floating action bar
- [ ] Export CSV button (mock download)

---

## WOW #8 — Language Toggle TH ↔ EN

**หน้าที่:** All pages (Navbar)
**Timing:** One click switches everything

**ต้องทำให้ได้:**
- [ ] TH | EN toggle button in navbar (pill style)
- [ ] Active language: gold background
- [ ] All content switches: titles, descriptions, nav labels, footer
- [ ] Smooth crossfade animation (0.2s)
- [ ] Preference saved in localStorage
- [ ] Thai font for TH mode, Inter for EN mode
- [ ] Date format switches: ภาษาไทย / English format

---

## WOW #9 — Skeleton Loading States

**หน้าที่:** All listing pages
**Timing:** While data loads

**ต้องทำให้ได้:**
- [ ] Film grid skeleton: grey/navy shimmer cards (same size as real cards)
- [ ] Gold shimmer wave animation (left to right)
- [ ] Stats counter skeleton: grey rectangles
- [ ] Text skeleton: varying width lines (60%, 80%, 40%)
- [ ] Minimum show time: 600ms (even if data fast — so judges see it)

```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1A3A5C 25%, #1E4976 50%, #1A3A5C 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

## WOW #10 — Mobile Premium Feel

**หน้าที่:** All pages
**Breakpoints:** 375px, 390px, 428px (iPhone), 768px (iPad)

**ต้องทำให้ได้:**
- [ ] Bottom navigation bar on mobile (Home | ค้นหา | ภาพยนตร์ | ละคร | ☰)
- [ ] Touch-friendly tap targets (min 44x44px)
- [ ] Horizontal scroll carousels (snap scrolling)
- [ ] Full-screen search on mobile (covers screen)
- [ ] Film grid: 2 columns on mobile, 3 on tablet
- [ ] Hero text size scales down gracefully
- [ ] Admin sidebar: hidden on mobile, toggle hamburger

---

## DEMO SCRIPT (30-minute presentation)

### นาที 0-2: เปิด Homepage
"นี่คือ contentthailand.com ใหม่ — ออกแบบให้เหมือน platform ระดับโลก"
→ แสดง Hero, ให้ตัวเลข Counter ทำงาน

### นาที 2-5: Search Demo
"ลองค้นหา 'ฉลาด' — ผลลัพธ์ขึ้นทันทีขณะพิมพ์"
→ พิมพ์ในช่อง search, แสดง dropdown, highlight

### นาที 5-10: Film Detail
"คลิกเข้าไปดู Bad Genius"
→ แสดง cinematic layout, cast, related films

### นาที 10-15: Content Browse
"เรามีครบทุกประเภท — ภาพยนตร์ ละคร บุคลากร บริษัท"
→ Navigate ผ่านแต่ละ section

### นาที 15-22: Admin Dashboard
"ตอนนี้ขอแสดงระบบหลังบ้าน"
→ เปิด /dashboard, ชี้ charts, activity feed
→ เปิด Films table, ทำ Edit demo

### นาที 22-25: TOR Compliance
"ทุกฟีเจอร์ตอบครบตาม TOR"
→ แสดง TOR_COMPLIANCE.md, ชี้แต่ละข้อ

### นาที 25-30: Q&A
เตรียมตอบ: Security? Backup? Timeline? Budget?

---

## Pre-Demo Checklist (ทำก่อน Demo 1 วัน)

- [ ] Docker Compose starts cleanly (`docker compose up -d`)
- [ ] Seed data loaded (30 films, 30 persons visible)
- [ ] Search working for: "ฉลาด", "บุพเพ", "นนทรีย์"
- [ ] All 11 public pages load without error
- [ ] Admin dashboard charts render
- [ ] Edit form opens and saves (mock success toast)
- [ ] Language toggle works (TH ↔ EN)
- [ ] Lighthouse score ≥ 90
- [ ] Mobile view tested (375px Chrome DevTools)
- [ ] No console errors
- [ ] Presentation URL ready (VPS IP or ngrok backup)
- [ ] Backup: localhost demo as fallback
