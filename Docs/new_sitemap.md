วนที่ 2: New Sitemap — โครงสร้างใหม่ที่สมบูรณ์

🆕 New Sitemap — Full Architecture
contentthailand.com (ใหม่ — Next.js + Headless CMS)
│
├── 🏠 HOME (หน้าแรก)
│   ├── Hero Section — Cinematic Banner + Search
│   ├── Quick Stats Dashboard (ตัวเลขสำคัญ)
│   ├── Latest Films (ภาพยนตร์ล่าสุด)
│   ├── Latest TV Series (ละครล่าสุด)
│   ├── Featured Person (บุคลากรเด่น)
│   ├── Industry News (ข่าวอุตสาหกรรม)
│   ├── Featured Company
│   └── Related: Quick links ทุก section
│
├── 🎬 FILMS (ภาพยนตร์)
│   ├── /films — Films Listing Page
│   │   ├── Filter: ปี / ประเภท / ผู้กำกับ / รางวัล
│   │   ├── Sort: ใหม่สุด / ชื่อ A-Z / ปีฉาย
│   │   └── View: Grid / List
│   │
│   └── /films/[slug] — Film Detail Page ✨
│       ├── Hero: Poster + ข้อมูลหลัก
│       ├── Synopsis (ภาษาไทย + อังกฤษ)
│       ├── Cast & Crew (พร้อม link ไป Person page)
│       ├── Production Details
│       ├── Awards & Festivals
│       ├── Gallery
│       ├── Related Films ← ป้องกัน Killer Page
│       ├── Same Director Films ← Related Content
│       ├── Same Genre Films ← Related Content
│       └── Share Card (Social Sharing)
│
├── 📺 TV SERIES (ละครโทรทัศน์)
│   ├── /series — Series Listing Page
│   │   ├── Filter: ปี / ประเภท / ช่อง / ยุค
│   │   └── Sort: ใหม่สุด / ชื่อ A-Z
│   │
│   └── /series/[slug] — Series Detail Page ✨
│       ├── Hero: Cover + ข้อมูลหลัก
│       ├── ข้อมูล: จำนวนตอน / ช่องทางเผยแพร่ / วันฉาย
│       ├── Cast & Crew
│       ├── Episodes Overview
│       ├── Related Series ← ป้องกัน Killer Page
│       ├── Same Channel Series ← Related Content
│       └── Share Card
│
├── 👥 PERSONNEL (บุคลากร)
│   ├── /personnel — Personnel Listing
│   │   ├── Filter: ตำแหน่ง / ยุค / ผลงาน
│   │   └── Alpha Index: ก-ฮ / A-Z
│   │
│   └── /personnel/[slug] — Person Detail Page ✨
│       ├── Hero: Photo + ชื่อ + ตำแหน่ง
│       ├── Biography
│       ├── Filmography Timeline ← Interactive
│       ├── Awards Won
│       ├── Worked With (network ของบุคคลนี้)
│       ├── Related Persons ← ป้องกัน Killer Page
│       ├── Films in Same Era ← Related Content
│       └── Share Profile Card ← Viral Feature
│
├── 🏢 COMPANIES (บริษัท)
│   ├── /companies — Company Listing
│   │   ├── Filter: ประเภท / ขนาด / ปีก่อตั้ง
│   │   └── Sort: ชื่อ A-Z / ผลงานมากสุด
│   │
│   └── /companies/[slug] — Company Detail Page ✨
│       ├── Hero: Logo + ข้อมูลบริษัท
│       ├── About Company
│       ├── Portfolio (ผลงานทั้งหมด)
│       ├── Key Personnel
│       ├── Contact Information
│       ├── Related Companies ← ป้องกัน Killer Page
│       └── Share Company Card
│
├── 📊 DASHBOARD (สรุปข้อมูล) ← NEW
│   ├── /dashboard — Overview Dashboard
│   │   ├── Statistics: จำนวนทั้งหมดแต่ละหมวด
│   │   ├── Chart: ภาพยนตร์ใหม่รายปี (2563-ปัจจุบัน)
│   │   ├── Chart: ละครใหม่รายปี
│   │   ├── Chart: จำนวนบุคลากรแต่ละตำแหน่ง
│   │   ├── Chart: ผู้เข้าชมรายเดือน
│   │   ├── Top Films / Series / Persons
│   │   └── Export: Excel / PDF ← ตาม TOR
│   │
│   └── (Backend Dashboard แยกต่างหากสำหรับ Admin)
│
├── 📚 KNOWLEDGE BASE (คลังข้อมูล) ← ENHANCED
│   ├── /knowledge — Knowledge Hub
│   │   ├── ฐานข้อมูลภาพยนตร์
│   │   ├── ฐานข้อมูลละครโทรทัศน์
│   │   ├── งานวิจัยและรายงาน
│   │   └── เอกสารอื่นๆ
│   │
│   └── /knowledge/[slug] — Document Detail
│       ├── Preview / Read Online
│       ├── Download PDF
│       └── Related Documents ← Related Content
│
├── 📰 NEWS (ข่าวสาร) ← RESTRUCTURED
│   ├── /news — News Listing
│   │   ├── Filter: หมวดหมู่ / ปี
│   │   └── Featured News
│   │
│   └── /news/[slug] — News Detail
│       ├── Article Content
│       ├── Related News ← ป้องกัน Killer Page
│       └── Share Article
│
├── 📝 APPLY (สมัคร/ยื่นคำขอ) ← NEW (ตาม TOR 4.4.8)
│   ├── /apply — Application Hub
│   │
│   ├── /apply/film-incentive — มาตรการถ่ายทำในประเทศ
│   │   ├── ข้อมูลมาตรการ (Thai + English)
│   │   ├── เงื่อนไขและสิทธิ์
│   │   ├── Smart Application Form ✨
│   │   ├── Document Upload
│   │   ├── Track Application Status
│   │   └── Export ข้อมูล Excel/PDF (Admin)
│   │
│   └── /apply/digital-content — มาตรการ Digital Content
│       ├── ข้อมูลมาตรการ
│       ├── Smart Application Form ✨
│       └── Document Upload
│
├── 🔍 SEARCH (ค้นหา) ← NEW
│   └── /search?q=[query] — Search Results Page
│       ├── Results: All / Films / Series / Personnel / Companies
│       ├── Filters: ปี / ประเภท / etc.
│       ├── Smart Suggestions
│       └── No Results → Related Suggestions
│
├── ℹ️ ABOUT (เกี่ยวกับเรา) ← ENHANCED
│   ├── /about — About ContentThailand
│   │   ├── พันธกิจ วิสัยทัศน์ เป้าหมาย
│   │   ├── หน่วยงานที่เกี่ยวข้อง
│   │   └── Timeline ประวัติความเป็นมา
│   │
│   └── /about/partners — หน่วยงานพันธมิตร
│
├── 📞 CONTACT (ติดต่อเรา)
│   └── /contact
│       ├── Contact Form ← ระบบแจ้งเตือน Email
│       ├── ที่อยู่สำนักงาน + แผนที่
│       └── Social Media Links
│
├── 🔧 SYSTEM PAGES
│   ├── /404 — Custom Not Found (cinematic design)
│   ├── /500 — Server Error Page
│   ├── /privacy — นโยบายความเป็นส่วนตัว (PDPA)
│   ├── /cookie-policy — นโยบายคุกกี้
│   ├── /sitemap — HTML Sitemap
│   └── /sitemap.xml — XML Sitemap (SEO)
│
└── 🔐 ADMIN (หลังบ้าน — แยก subdomain)
    └── admin.contentthailand.com
        ├── Dashboard (สถิติ + visitor analytics)
        ├── Film Management (CRUD)
        ├── Series Management (CRUD)
        ├── Personnel Management (CRUD)
        ├── Company Management (CRUD)
        ├── Knowledge Base Management
        ├── News Management
        ├── Application Management
        ├── User Management
        ├── System Settings
        └── Export Center (Excel/PDF)

ส่วนที่ 3: Related Content Strategy — ป้องกัน Killer Page ทุกหน้า

🔗 Related Content Matrix
หน้าRelated Content ที่ต้องมีLogic การแสดงผลFilm Detail1. ภาพยนตร์ผู้กำกับคนเดียวกันSame director_id2. ภาพยนตร์ประเภทเดียวกันSame genre tag3. ภาพยนตร์ยุคเดียวกัน (±2 ปี)year BETWEEN4. ภาพยนตร์ที่ทีมงานคนเดียวกันShared crew membersSeries Detail1. ละครช่องเดียวกันSame channel2. ละครประเภทเดียวกันSame genre3. ละครนักแสดงคนเดียวกันShared cast4. ละครยุคเดียวกันSame eraPerson Detail1. บุคลากรตำแหน่งเดียวกันSame role2. บุคลากรที่เคยร่วมงานShared films3. บุคลากรยุคเดียวกันSame era4. ผลงานล่าสุดของบุคคลนี้Latest worksCompany Detail1. บริษัทประเภทเดียวกันSame type2. บริษัทที่เคยร่วมงานShared productions3. ผลงานของบริษัทนี้Company filmsNews Detail1. ข่าวหมวดเดียวกันSame category2. ข่าวที่เกี่ยวข้องกับ entityTagged entities3. ข่าวล่าสุดLatest news

🔗 Related Content UI Pattern
═══════════════════════════════════════════════════════
  ภาพยนตร์ที่เกี่ยวข้อง
═══════════════════════════════════════════════════════

  [🎬 Card] [🎬 Card] [🎬 Card] [🎬 Card]
   ผู้กำกับ   ประเภท    ยุคเดียวกัน  ทีมงานเดียวกัน
   คนเดียวกัน เดียวกัน

───────────────────────────────────────────────────────

  บุคลากรในเรื่องนี้
═══════════════════════════════════════════════════════

  [👤 Card] [👤 Card] [👤 Card] [👤 Card] [👤 Card]
   ผู้กำกับ   นักแสดง   นักแสดง    ตากล้อง    ดนตรี
              นำชาย     นำหญิง

───────────────────────────────────────────────────────

  บริษัทที่เกี่ยวข้อง
═══════════════════════════════════════════════════════

  [🏢 Card] [🏢 Card] [🏢 Card]
   ผู้สร้าง   จัดจำหน่าย  สนับสนุน

ส่วนที่ 4: Content Strategy — แต่ละหน้าต้องมีอะไร

📋 Content Blueprint ทุกหน้าหลัก
🏠 หน้าแรก — Content Priority
ABOVE THE FOLD (เห็นก่อนเลื่อน)
├── Hero: Cinematic full-width banner + Tagline
├── Mega Search Bar (ค้นหาแบบ unified)
└── Quick Stats: 4 ตัวเลขสำคัญ

SECTION 1: ภาพยนตร์ล่าสุด (6 cards)
SECTION 2: ละครโทรทัศน์ล่าสุด (6 cards)
SECTION 3: Industry Dashboard Preview
SECTION 4: บุคลากรเด่น (Featured Persons)
SECTION 5: ข่าวสารล่าสุด (3 cards)
SECTION 6: Call-to-Action — สมัครมาตรการ
FOOTER: Links + หน่วยงาน + Contact
🎬 Film Detail — Content Must-Have
REQUIRED FIELDS (TOR 4.4.2):
✅ ชื่อเรื่อง (TH + EN)
✅ ปีที่เข้าฉาย
✅ วันที่เข้าฉาย
✅ ความยาว (นาที)
✅ ประเภท/แนว
✅ รายชื่อทีมงานหลัก

ENHANCED FIELDS (WOW):
⭐ Poster Image (ความละเอียดสูง)
⭐ Synopsis (TH + EN)
⭐ Awards & Nominations
⭐ Production Company
⭐ Budget / Box Office (ถ้ามี)
⭐ Film Gallery (still photos)
⭐ Trailer Link
⭐ Related Films (4 cards)
⭐ Cast & Crew (with photos + links)
⭐ Share Card (Social)

ส่วนที่ 5: SEO Content Architecture
URL STRUCTURE (SEO Optimized)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Films:     /films/[year]-[thai-slug]
             เช่น /films/2566-hlan-ma
  Series:    /series/[year]-[thai-slug]
  Person:    /personnel/[name-slug]
  Company:   /companies/[name-slug]
  News:      /news/[year]/[month]/[slug]

SCHEMA.ORG MARKUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Film page:    Movie schema
  Person page:  Person schema
  Company:      Organization schema
  News:         NewsArticle schema
  Homepage:     WebSite + SearchAction schema

META TAG TEMPLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Title:       [ชื่อหนัง] ([ปี]) | ContentThailand
  Description: [Synopsis 160 chars] ค้นหาข้อมูล...
  OG Image:    Poster 1200x630px
  Twitter:     Summary Large Image card

ส่วนที่ 6: Killer Page Prevention Strategy
🛡️ Anti-Killer Page Framework
ทุกหน้า Detail ต้องมี "EXIT PATHS" อย่างน้อย 3 เส้นทาง

PATTERN: 3-LAYER ESCAPE SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Layer 1: DIRECT RELATIONS
  → บุคลากรในเรื่องนี้ (always visible)
  → บริษัทที่สร้าง (always visible)

Layer 2: CONTENT RELATIONS
  → ภาพยนตร์ประเภทเดียวกัน
  → ยุคเดียวกัน / ปีเดียวกัน
  → ผู้กำกับคนเดียวกัน

Layer 3: DISCOVERY PATHS
  → ดูภาพยนตร์ทั้งหมดของ [บุคคลนี้]
  → ดูภาพยนตร์ประเภท [genre นี้] ทั้งหมด
  → กลับไปที่ Dashboard
  → ข่าวล่าสุดที่เกี่ยวข้อง

STICKY SIDEBAR (Desktop)
  → Table of Contents ของหน้านี้
  → Quick links to related entities
  → Share buttons (persistent)

ส่วนที่ 7: Multilingual Content Architecture
BILINGUAL STRATEGY (TH + EN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  URL Pattern:
  Thai:     contentthailand.com/films/...
  English:  contentthailand.com/en/films/...

  Language Toggle:
  [TH | EN] — Fixed position, always visible

  Content Parity (ต้องครบเท่ากัน):
  ✅ Navigation — ครบทั้ง 2 ภาษา
  ✅ Film/Series info — ครบทั้ง 2 ภาษา
  ✅ Application Form — ครบทั้ง 2 ภาษา
  ✅ Incentive Information — ครบทั้ง 2 ภาษา
  ✅ About & Contact — ครบทั้ง 2 ภาษา

  SEO hreflang tags:
  <link rel="alternate" hreflang="th" href="..."/>
  <link rel="alternate" hreflang="en" href="..."/>

✅ PHASE 6 SUMMARY — ตรวจสอบความครบถ้วน
หัวข้อครบ?วิเคราะห์ Sitemap เดิม + ปัญหา✅New Sitemap ครบทุกหน้า (ตาม TOR + WOW)✅Admin Sitemap แยก subdomain✅Related Content Matrix ทุกหน้า✅Related Content UI Pattern✅Content Blueprint ทุกหน้าหลัก✅SEO Content Architecture + Schema✅Anti-Killer Page Framework 3 Layer✅Multilingual Strategy TH + EN✅

📌 Phase 6 เสร็จสมบูรณ์ครับ
เมื่อ confirm แล้ว จะเริ่ม Phase 7: UX Strategy — Homepage Layout + 1-Click/2-Click/F-Sharp Design + UX Principles — วาง content หน้าแรกอย่างละเอียด พร้อมหลักการออกแบบ UX ที่ทำให้ user ใช้งานได้โดยไม่ต้องคิด


🖥️ PHASE 7: UX Strategy — Homepage Layout + UX Principles

ส่วนที่ 1: UX Principles — หลักการที่ยึดตลอดทั้งโปรเจกต์

🎯 7 UX Laws ที่นำมาใช้
1. HICK'S LAW — ยิ่งตัวเลือกน้อย ยิ่งตัดสินใจเร็ว
   ▶ Navigation หลักมีแค่ 6 items
   ▶ Filter แสดง top 5 ก่อน มี "เพิ่มเติม" ซ่อนไว้

2. FITTS'S LAW — ปุ่มสำคัญต้องใหญ่และอยู่ใกล้มือ
   ▶ Search bar อยู่ตรงกลาง above-the-fold
   ▶ CTA button ขนาดใหญ่ min 44x44px (touch target)

3. MILLER'S LAW — คนจำได้ 7±2 items
   ▶ Card grid แสดง 6 items ต่อ row สูงสุด
   ▶ Filter ไม่เกิน 7 ตัวเลือกต่อหมวด

4. F-PATTERN READING — ตาคนอ่านเป็นรูปตัว F
   ▶ ข้อมูลสำคัญอยู่แนวนอนบนสุดและซ้ายสุด
   ▶ Title, year, genre อยู่ left-aligned เสมอ

5. GESTALT — สมองจัดกลุ่มสิ่งที่คล้ายกัน
   ▶ Film cards ทุกตัวมี visual weight เท่ากัน
   ▶ Spacing บอก grouping โดยไม่ต้องใช้เส้น

6. PEAK-END RULE — จำช่วง peak และตอนจบ
   ▶ Peak: Search results ที่โหลดเร็วและสวย
   ▶ End: Share card ที่ภูมิใจแชร์ได้

7. PROGRESSIVE DISCLOSURE — แสดงข้อมูลเป็นชั้น
   ▶ Card → Summary → Detail → Full Data
   ▶ ไม่ overwhelm ผู้ใช้ด้วยข้อมูลทีเดียว

🏗️ 3-Click Rule + F-Sharp Navigation
CLICK DEPTH STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1-CLICK จาก Homepage ถึง:
  ✅ ภาพยนตร์ทั้งหมด
  ✅ ละครทั้งหมด
  ✅ บุคลากรทั้งหมด
  ✅ บริษัททั้งหมด
  ✅ Search Results
  ✅ Dashboard

2-CLICK จาก Homepage ถึง:
  ✅ Film Detail Page
  ✅ Person Detail Page
  ✅ Application Form
  ✅ News Article

3-CLICK จาก Homepage ถึง:
  ✅ Filtered Results (ผู้กำกับ + ปี + ประเภท)
  ✅ Company Portfolio
  ✅ Knowledge Document

F-SHARP PATTERN Application:
  ─────────────────────── ← Bar 1: Hero + Search (Full Width)
  ─────────────          ← Bar 2: Quick Stats + Filter
  ──────                 ← Stem: Sidebar + Latest Content

ส่วนที่ 2: Homepage Layout — Wire Frame ละเอียด

📐 Desktop Layout (1440px)
╔══════════════════════════════════════════════════════════════════╗
║  HEADER — Sticky Navigation                                      ║
║  [CT Logo]  ภาพยนตร์  ละคร  บุคลากร  บริษัท  คลัง  ข่าว  [🔍][TH|EN]║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 1: HERO — Cinematic Full Width                         ║
║  ┌──────────────────────────────────────────────────────────┐   ║
║  │                                                          │   ║
║  │   [CINEMATIC BACKGROUND — Film Still / Gradient Overlay] │   ║
║  │                                                          │   ║
║  │        ██████████████████████████████████               │   ║
║  │        █  CONTENT THAILAND                 █            │   ║
║  │        █  ฐานข้อมูลภาพยนตร์และละครไทย     █            │   ║
║  │        ██████████████████████████████████               │   ║
║  │                                                          │   ║
║  │   ┌────────────────────────────────────────────────┐    │   ║
║  │   │ 🔍  ค้นหาภาพยนตร์ ละคร บุคลากร บริษัท...    │    │   ║
║  │   └────────────────────────────────────────────────┘    │   ║
║  │                                                          │   ║
║  │   [ภาพยนตร์]  [ละครโทรทัศน์]  [บุคลากร]  [บริษัท]    │   ║
║  │    Quick Filter Tabs                                     │   ║
║  │                                                          │   ║
║  └──────────────────────────────────────────────────────────┘   ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 2: QUICK STATS DASHBOARD                               ║
║  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   ║
║  │  🎬        │ │  📺        │ │  👥        │ │  🏢        │   ║
║  │   562+     │ │   737+     │ │  5,888+    │ │   681+     │   ║
║  │ ภาพยนตร์  │ │ ละครTV    │ │ บุคลากร    │ │  บริษัท    │   ║
║  │ ↑12 ใหม่  │ │ ↑8 ใหม่   │ │ ↑45 ใหม่  │ │ ↑5 ใหม่   │   ║
║  └────────────┘ └────────────┘ └────────────┘ └────────────┘   ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 3: ภาพยนตร์ล่าสุด                                     ║
║  ─────────────────────────────────────  [ดูทั้งหมด →]          ║
║                                                                  ║
║  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ║
║  │      │  │      │  │      │  │      │  │      │  │      │  ║
║  │poster│  │poster│  │poster│  │poster│  │poster│  │poster│  ║
║  │      │  │      │  │      │  │      │  │      │  │      │  ║
║  │ 2:3  │  │ 2:3  │  │ 2:3  │  │ 2:3  │  │ 2:3  │  │ 2:3  │  ║
║  │      │  │      │  │      │  │      │  │      │  │      │  ║
║  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  ║
║  ชื่อหนัง  ชื่อหนัง  ชื่อหนัง  ชื่อหนัง  ชื่อหนัง  ชื่อหนัง  ║
║  ปี · แนว  ปี · แนว  ปี · แนว  ปี · แนว  ปี · แนว  ปี · แนว  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 4: ละครโทรทัศน์ล่าสุด [HORIZONTAL SCROLL]            ║
║  ─────────────────────────────────────  [ดูทั้งหมด →]          ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐                 ║
║  │ [COVER]    │  │ [COVER]    │  │ [COVER]    │  ◄──────►       ║
║  │ 16:9 ratio │  │ 16:9 ratio │  │ 16:9 ratio │                 ║
║  │            │  │            │  │            │                 ║
║  │ ชื่อละคร  │  │ ชื่อละคร  │  │ ชื่อละคร  │                 ║
║  │ ช่อง · ปี │  │ ช่อง · ปี │  │ ช่อง · ปี │                 ║
║  └────────────┘  └────────────┘  └────────────┘                 ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 5: TWO-COLUMN — Featured + News                        ║
║  ┌─────────────────────────┐  ┌──────────────────────────────┐  ║
║  │  📊 INDUSTRY SNAPSHOT   │  │  📰 ข่าวสารล่าสุด           │  ║
║  │                         │  │  ─────────────────────────── │  ║
║  │  Chart: หนังใหม่รายปี   │  │  • [ข่าว 1] — วันที่       │  ║
║  │  [Interactive Bar Chart]│  │  • [ข่าว 2] — วันที่       │  ║
║  │                         │  │  • [ข่าว 3] — วันที่       │  ║
║  │  [ดู Dashboard เต็ม →] │  │  • [ข่าว 4] — วันที่       │  ║
║  │                         │  │                              │  ║
║  │  (60% width)            │  │  [ดูข่าวทั้งหมด →]         │  ║
║  └─────────────────────────┘  └──────────────────────────────┘  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 6: บุคลากรเด่น                                        ║
║  ─────────────────────────────────────  [ดูทั้งหมด →]          ║
║  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐║
║  │ 👤 │  │ 👤 │  │ 👤 │  │ 👤 │  │ 👤 │  │ 👤 │  │ 👤 │  │ 👤 │║
║  │    │  │    │  │    │  │    │  │    │  │    │  │    │  │    │║
║  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘║
║  ชื่อ    ชื่อ    ชื่อ    ชื่อ    ชื่อ    ชื่อ    ชื่อ    ชื่อ  ║
║  ตำแหน่ง ตำแหน่ง ตำแหน่ง ตำแหน่ง ตำแหน่ง ตำแหน่ง ตำแหน่ง ตำแหน่ง║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SECTION 7: CALL TO ACTION — มาตรการส่งเสริม                   ║
║  ┌──────────────────────────────────────────────────────────┐   ║
║  │  [CINEMA GOLD BACKGROUND]                                │   ║
║  │                                                          │   ║
║  │  🎬 สมัครมาตรการส่งเสริมการถ่ายทำภาพยนตร์             │   ║
║  │  ในประเทศไทย — สิทธิพิเศษสำหรับผู้ผลิต                │   ║
║  │                                                          │   ║
║  │  [สมัครมาตรการถ่ายทำ]  [ดูเงื่อนไขและสิทธิ์]          │   ║
║  │                                                          │   ║
║  └──────────────────────────────────────────────────────────┘   ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  FOOTER                                                          ║
║  ┌──────────────┬──────────────┬──────────────┬─────────────┐   ║
║  │ Content      │ ลิงก์ด่วน   │ ติดต่อเรา   │ กระทรวง    │   ║
║  │ Thailand     │ ภาพยนตร์    │ ที่อยู่     │ วัฒนธรรม   │   ║
║  │ Logo + Desc  │ ละคร        │ โทรศัพท์   │ Logo        │   ║
║  │              │ บุคลากร     │ Email       │ + Links     │   ║
║  │              │ บริษัท      │ Social      │             │   ║
║  └──────────────┴──────────────┴──────────────┴─────────────┘   ║
║  © 2568 กระทรวงวัฒนธรรม | นโยบายความเป็นส่วนตัว | นโยบายคุกกี้ ║
╚══════════════════════════════════════════════════════════════════╝

📱 Mobile Layout (375px) — Mobile-First
╔══════════════════════════╗
║ HEADER (Sticky)          ║
║ [CT Logo]        [☰][🔍] ║
╠══════════════════════════╣
║                          ║
║  HERO (Full Width)       ║
║ ┌────────────────────┐   ║
║ │  [CINEMATIC BG]    │   ║
║ │                    │   ║
║ │  CONTENT THAILAND  │   ║
║ │  ภาพยนตร์ไทย      │   ║
║ │                    │   ║
║ │ ┌────────────────┐ │   ║
║ │ │ 🔍 ค้นหา...   │ │   ║
║ │ └────────────────┘ │   ║
║ └────────────────────┘   ║
║                          ║
║  QUICK STATS (2x2 Grid) ║
║  ┌─────────┐ ┌─────────┐ ║
║  │ 🎬 562 │ │ 📺 737 │ ║
║  │ภาพยนตร์│ │ ละครTV │ ║
║  └─────────┘ └─────────┘ ║
║  ┌─────────┐ ┌─────────┐ ║
║  │👥 5,888│ │ 🏢 681 │ ║
║  │บุคลากร │ │ บริษัท │ ║
║  └─────────┘ └─────────┘ ║
║                          ║
║  ภาพยนตร์ล่าสุด          ║
║  ─────────────  [ดูทั้งหมด]║
║  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ► ║
║  │  │ │  │ │  │ │  │   ║
║  └──┘ └──┘ └──┘ └──┘   ║
║  ชื่อ ชื่อ ชื่อ ชื่อ   ║
║                          ║
║  ละครล่าสุด              ║
║  ─────────────  [ดูทั้งหมด]║
║  ┌────────────────────┐  ║
║  │ [COVER 16:9]       │  ║
║  │ ชื่อละคร · ช่อง   │  ║
║  └────────────────────┘  ║
║  [◄] ●●○○○ [►]          ║
║                          ║
║  📊 Industry Snapshot    ║
║  [Bar Chart — Scrollable]║
║                          ║
║  📰 ข่าวสาร              ║
║  ─────────────           ║
║  • ข่าว 1                ║
║  • ข่าว 2                ║
║  • ข่าว 3                ║
║  [ดูข่าวทั้งหมด]         ║
║                          ║
║  👥 บุคลากรเด่น          ║
║  ┌──┐┌──┐┌──┐┌──┐►     ║
║  │  ││  ││  ││  │       ║
║  └──┘└──┘└──┘└──┘       ║
║                          ║
║  CTA Section             ║
║  ┌────────────────────┐  ║
║  │ 🎬 มาตรการส่งเสริม │  ║
║  │ [สมัครเลย]         │  ║
║  └────────────────────┘  ║
║                          ║
║  FOOTER (Accordion)      ║
║  + ลิงก์ด่วน [▾]        ║
║  + ติดต่อเรา [▾]         ║
║  © 2568 กระทรวงวัฒนธรรม ║
╚══════════════════════════╝

ส่วนที่ 3: Key Page UX — Film Detail + Search Results

🎬 Film Detail Page Layout
╔══════════════════════════════════════════════════════════════╗
║  BREADCRUMB: หน้าแรก > ภาพยนตร์ > ชื่อภาพยนตร์             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  HERO SECTION (Full Bleed)                                   ║
║  ┌──────────────────────────────────────────────────────┐   ║
║  │  [BACKDROP IMAGE — Blurred + Dark Overlay]           │   ║
║  │  ┌─────────┐  ชื่อภาพยนตร์ภาษาไทย (H1)             │   ║
║  │  │         │  Title in English                       │   ║
║  │  │ POSTER  │                                         │   ║
║  │  │  2:3    │  ⭐⭐⭐⭐  ปี · ความยาว · ประเภท         │   ║
║  │  │         │                                         │   ║
║  │  │         │  [🎬 ดูตัวอย่าง]  [📤 แชร์]            │   ║
║  │  └─────────┘  [📥 บันทึก]     [📊 Export]           │   ║
║  └──────────────────────────────────────────────────────┘   ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  TWO-COLUMN LAYOUT                                           ║
║  ┌──────────────────────────┐  ┌────────────────────────┐   ║
║  │  MAIN CONTENT (70%)      │  │  SIDEBAR (30%) STICKY  │   ║
║  │                          │  │                        │   ║
║  │  📋 ข้อมูลทั่วไป         │  │  📋 ข้อมูลย่อ          │   ║
║  │  ─────────────           │  │  ─────────             │   ║
║  │  ชื่อ: ...               │  │  ปีฉาย: 2566           │   ║
║  │  ปีที่เข้าฉาย: ...       │  │  ความยาว: 120 นาที     │   ║
║  │  ประเภท: ...             │  │  ผู้กำกับ: ...         │   ║
║  │  ความยาว: ...            │  │  ผู้สร้าง: ...         │   ║
║  │                          │  │                        │   ║
║  │  📝 เรื่องย่อ             │  │  🏆 รางวัล             │   ║
║  │  ─────────────           │  │  • รางวัล 1            │   ║
║  │  [Synopsis TH]           │  │  • รางวัล 2            │   ║
║  │  [Synopsis EN]           │  │                        │   ║
║  │                          │  │  🏢 บริษัทผู้สร้าง     │   ║
║  │  🎭 Cast & Crew           │  │  [Company Card Mini]   │   ║
║  │  ─────────────           │  │                        │   ║
║  │  [Person Card] x N       │  │  📤 แชร์               │   ║
║  │                          │  │  [FB][TW][IG][Copy]    │   ║
║  │  🏆 รางวัลและเทศกาล       │  │                        │   ║
║  │  ─────────────           │  │  ─────────────         │   ║
║  │  [Award Timeline]        │  │  สารบัญหน้านี้         │   ║
║  │                          │  │  • ข้อมูลทั่วไป        │   ║
║  │  🖼️ Gallery               │  │  • เรื่องย่อ           │   ║
║  │  [Photo Grid 3 cols]     │  │  • Cast & Crew         │   ║
║  │                          │  │  • รางวัล              │   ║
║  └──────────────────────────┘  │  • Gallery             │   ║
║                                │  • Related             │   ║
║                                └────────────────────────┘   ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  RELATED CONTENT SECTION                                     ║
║  ════════════════════════════════════════════════════════    ║
║                                                              ║
║  ภาพยนตร์โดยผู้กำกับคนเดียวกัน                             ║
║  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   ║
║  │poster│  │poster│  │poster│  │poster│                   ║
║  └──────┘  └──────┘  └──────┘  └──────┘                   ║
║                                                              ║
║  ภาพยนตร์ประเภทเดียวกัน                                    ║
║  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   ║
║  │poster│  │poster│  │poster│  │poster│                   ║
║  └──────┘  └──────┘  └──────┘  └──────┘                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Search Results Page UX
╔══════════════════════════════════════════════════════════════╗
║  🔍  [ค้นหา: "หลานม่า"                              ] [X]  ║
║  พบ 47 ผลลัพธ์  ใน: ภาพยนตร์(3) บุคลากร(12) บริษัท(2)    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌─────────────────────┐  ┌───────────────────────────────┐ ║
║  │  FILTER SIDEBAR     │  │  RESULTS AREA                 │ ║
║  │                     │  │                               │ ║
║  │  แสดงผล:            │  │  TAB BAR:                     │ ║
║  │  ○ ทั้งหมด (47)    │  │  [ทั้งหมด] [🎬 3] [📺 30] [👥 12] [🏢 2]│
║  │  ○ ภาพยนตร์ (3)    │  │                               │ ║
║  │  ○ ละคร (30)       │  │  SORT: [ความเกี่ยวข้อง ▾]    │ ║
║  │  ○ บุคลากร (12)    │  │                               │ ║
║  │  ○ บริษัท (2)      │  │  ┌─────────────────────────┐  │ ║
║  │                     │  │  │ 🎬 หลานม่า (2566)       │  │ ║
║  │  ─────────────      │  │  │ ผู้กำกับ: ปัทม์ วิสมิตะนันทน์│ │ ║
║  │  ปีที่ฉาย:          │  │  │ ประเภท: ดราม่า ครอบครัว  │  │ ║
║  │  □ 2567 (12)        │  │  │ [ดูรายละเอียด →]          │  │ ║
║  │  □ 2566 (18)        │  │  └─────────────────────────┘  │ ║
║  │  □ 2565 (9)         │  │                               │ ║
║  │  □ 2564 (8)         │  │  ┌─────────────────────────┐  │ ║
║  │                     │  │  │ 👤 ปัทม์ วิสมิตะนันทน์  │  │ ║
║  │  ─────────────      │  │  │ ผู้กำกับ / 15 ผลงาน      │  │ ║
║  │  ประเภท:            │  │  │ [ดูโปรไฟล์ →]            │  │ ║
║  │  □ ดราม่า           │  │  └─────────────────────────┘  │ ║
║  │  □ แอคชั่น          │  │                               │ ║
║  │  □ ตลก              │  │  [โหลดเพิ่มเติม...]           │ ║
║  │  + เพิ่มเติม        │  │                               │ ║
║  │                     │  └───────────────────────────────┘ ║
║  └─────────────────────┘                                     ║
╚══════════════════════════════════════════════════════════════╝

ส่วนที่ 4: Micro-Interactions & UX Details

⚡ Loading States
SKELETON SCREENS (แทน spinner)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Film Card Loading:
┌──────────┐
│ ░░░░░░░░ │  ← Shimmer animation
│ ░░░░░░░░ │     สีเทาอ่อน → ขาว → เทาอ่อน
│ ░░░░░░░░ │     ทิศทาง: ซ้าย → ขวา
│          │     Duration: 1.5s loop
│ ░░░░░░░░ │
│ ░░░░░    │
└──────────┘

Loading Message (Film Theme):
  "กำลังโหลดข้อมูลภาพยนตร์..."
  [░░░░░░░░░░░░░░░░░░░░░░░░] 67%
   ████████████████░░░░░░░░

🎯 Empty States
ไม่พบผลการค้นหา:
┌────────────────────────────────────────┐
│                                        │
│         🎬                             │
│                                        │
│   ไม่พบ "[คำค้นหา]"                   │
│                                        │
│   ลองค้นหาด้วย:                       │
│   • ชื่อย่อ หรือ ชื่อเต็ม            │
│   • ชื่อผู้กำกับหรือนักแสดง           │
│   • ปีที่ออกฉาย                       │
│                                        │
│   [ดูภาพยนตร์ทั้งหมด]                 │
│                                        │
└────────────────────────────────────────┘

🔔 Feedback & Notifications
TOAST NOTIFICATIONS (Bottom Right)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Success:  "คัดลอกลิงก์สำเร็จแล้ว"
  ⚠️ Warning:  "กรุณากรอกข้อมูลให้ครบ"
  ❌ Error:    "เกิดข้อผิดพลาด กรุณาลองใหม่"
  ℹ️ Info:     "กำลังดาวน์โหลดข้อมูล..."

COOKIE CONSENT (Bottom Banner)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ┌──────────────────────────────────────────┐
  │ 🍪 เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนา      │
  │ ประสบการณ์การใช้งาน                      │
  │ [ยอมรับทั้งหมด] [ตั้งค่า] [ปฏิเสธ]     │
  └──────────────────────────────────────────┘

ส่วนที่ 5: Accessibility UX Checklist
KEYBOARD NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Tab:      ย้ายระหว่าง interactive elements
  Enter:    เปิด / กดปุ่ม
  Escape:   ปิด modal / dropdown
  Arrow:    เลื่อนใน dropdown / carousel
  Space:    เลือก checkbox / toggle

FOCUS INDICATORS
  ✅ Focus ring สีทอง 3px บน elements
  ✅ Skip to main content link (first tab stop)
  ✅ Focus trap ใน modal dialogs

SCREEN READER
  ✅ Semantic HTML5 (nav, main, aside, footer)
  ✅ ARIA labels ทุก icon-only button
  ✅ Alt text ทุกรูปที่มีความหมาย
  ✅ Live regions สำหรับ dynamic content
  ✅ Heading hierarchy H1→H2→H3

COLOR & CONTRAST
  ✅ ไม่ใช้สีเป็น sole indicator
  ✅ Error แสดงด้วยสี + icon + text
  ✅ Contrast ratio ≥ 4.5:1 (AA) ทุกข้อความ

ส่วนที่ 6: Performance UX Targets
CORE WEB VITALS TARGETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  LCP (Largest Contentful Paint):   < 2.5s  ✅ Good
  FID (First Input Delay):          < 100ms ✅ Good
  CLS (Cumulative Layout Shift):    < 0.1   ✅ Good
  FCP (First Contentful Paint):     < 1.8s  ✅ Good
  TTFB (Time to First Byte):        < 800ms ✅ Good

STRATEGY TO ACHIEVE:
  ✅ Next.js SSG/ISR — pre-render ทุก page
  ✅ Image optimization — WebP + lazy load
  ✅ CDN Thailand Region (AWS/Azure)
  ✅ Critical CSS inline — ไม่ block render
  ✅ Font preload — ไม่มี FOUT
  ✅ Code splitting — โหลดเฉพาะที่ใช้

✅ PHASE 7 SUMMARY
หัวข้อครบ?7 UX Laws พร้อม application✅3-Click Rule + F-Sharp Pattern✅Homepage Layout — Desktop wireframe ละเอียด✅Homepage Layout — Mobile wireframe ละเอียด✅Film Detail Page Layout✅Search Results Page UX✅Skeleton Loading States✅Empty States Design✅Toast Notifications + Cookie Consent✅Accessibility UX Checklist✅Core Web Vitals Targets + Strategy✅

📌 Phase 7 เสร็จสมบูรณ์ครับ
เมื่อ confirm แล้ว จะเริ่ม Phase 8: Tech Stack + Software Architecture + Network Architecture + Security Model — เลือก stack ที่เหมาะกับ TOR ทุกข้อ พร้อม diagram architecture แบบสมบูรณ์ที่กรรมการเห็นแล้วรู้ว่าทีมนี้เข้าใจระบบจริง

