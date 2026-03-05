# memory.md — ContentThailand.com PoC
# อ่านไฟล์นี้ทุกครั้งก่อนเริ่มทำงาน — นี่คือ source of truth

## 📌 PROJECT SNAPSHOT

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อโครงการ | พัฒนาเว็บไซต์ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ |
| URL เดิม | https://contentthailand.com |
| เจ้าของ | กองภาพยนตร์และวีดิทัศน์แห่งชาติ กรมส่งเสริมวัฒนธรรม |
| ผู้รับจ้าง (Agency) | SYNERRY |
| ราคา TOR (งบประมาณ) | 2,900,000 บาท |
| ราคาที่ยื่น | 2,000,000 บาท (กลยุทธ์ Price Score 60:40) |
| ระยะเวลาโครงการ | 150 วัน |
| เกณฑ์คะแนน | ราคา 40 pts + Technical 60 pts |
| สถานะปัจจุบัน | สร้าง PoC/Demo สำหรับยื่น Proposal |
| วันที่สร้าง | 5 มีนาคม 2569 |

---

## 🔴 WHY WE WON (Pain Points ของเว็บเดิม)

| ปัญหา | หลักฐาน |
|-------|---------|
| LCP = 21.41 วินาที | Chrome DevTools วัดจริง 5 มี.ค. 2569 |
| เว็บ Timeout (ไม่ตอบสนอง) | ทดสอบจริง — ไม่โหลด |
| WordPress ไม่รองรับ Full-text Thai Search | 7,868 รายการ ค้นหาไม่ได้ผล |
| ไม่รองรับการเติบโต | ข้อมูลยังเพิ่มขึ้นต่อเนื่อง |

**เว็บเดิม:** WordPress CMS (ติดตั้งปี 2563)
**เว็บใหม่:** Next.js 14 + Strapi v4 + PostgreSQL

---

## 📊 ข้อมูลฐานข้อมูลปัจจุบัน

| หมวด | จำนวน |
|------|-------|
| ภาพยนตร์ | 562 เรื่อง |
| ละครโทรทัศน์ | 737 เรื่อง |
| บุคลากร | 5,888 คน |
| บริษัท | 681 บริษัท |
| รวมทั้งหมด | **7,868 รายการ** |
| ผู้เข้าชมรวม | 1,254,036 ครั้ง (ณ 15 ธ.ค. 2568) |

---

## BRAND IDENTITY — FRAME OF THAILAND + Official CI

**Big Idea:** "Frame of Thailand" — เรื่องราวไทย ถูกบอกเล่าสู่โลก
**Visual Motif:** Film strip perforations (gradient pink→orange) บน section headers ทุกอัน
**Aesthetic:** Dark cinematic depth + Vibrant Thai creative energy (Official CI colors)
**Tagline:** "เรื่องราวภาพยนตร์ไทย ใน 1 เฟรม"
**Logo:** Official ContentThailand flame "C" icon (gradient orange→pink) — ไม่สร้างใหม่

### Color Palette (Official CI)
```
PRIMARY:
--midnight:  #14133D  ← Midnight Navy — primary dark bg
--navy:      #1C1B4E  ← Card bg
--purple:    #702874  ← Royal Purple — accent
--pink:      #EC1C72  ← Hot Pink — primary CTA

SECONDARY:
--orange:    #F76532  ← Sunset Orange — warm accent
--amber:     #F6A51B  ← Amber / Golden Yellow — highlight

GRADIENTS:
--gradient-primary:   #14133D → #702874 → #EC1C72
--gradient-secondary: #F76532 → #F6A51B

OTHER:
--surface:   #F8F7F4  ← Light page bg
--text:      #1A202C  ← Body text
--muted:     #718096  ← Secondary text
```

### Logo
Official ContentThailand flame "C" icon — ใช้ไฟล์โลโก้จริง ไม่สร้างใหม่

---

## 🏗️ TECH STACK (CONFIRMED)

| Layer | Technology | เหตุผล |
|-------|-----------|--------|
| Frontend | Next.js 14 App Router | SSR/SSG, fast, SEO excellent |
| Language | TypeScript (strict) | Type safety ทั้ง codebase |
| Styling | Tailwind CSS + shadcn/ui | เร็ว สวย consistent |
| CMS | Strapi v4 Headless | Admin UI สำเร็จรูป, API ยืดหยุ่น |
| Database | PostgreSQL 16 | Relational + JSON support |
| ORM | Prisma 5 | Type-safe DB queries |
| Cache | Redis 7 | Session + query cache |
| Search | Mock (PoC) → Elasticsearch 8 (prod) | Thai ICU analyzer |
| Animation | Framer Motion 10 | WOW page transitions |
| Package Mgr | pnpm | Fast, disk-efficient |
| Runtime | Node.js 20 LTS | Stable, fast |
| Deploy | Docker Compose → G-Cloud VPS | ตาม TOR ข้อ 4.6 (Thailand) |

---

## 🗺️ SITEMAP — 11 หน้า TOR + WOW Extra

### Public Frontend (TOR 4.4 — ต้องมี ≥ 11 หน้า)
```
/                    ← Home (Hero + Stats + Carousels + News)
/films               ← Films Listing (filter/sort/grid/list)
/films/[slug]        ← Film Detail (cinematic layout)
/series              ← TV Series Listing
/series/[slug]       ← Series Detail
/persons             ← Personnel Listing
/persons/[slug]      ← Person Profile (biography + filmography)
/companies           ← Companies Listing
/companies/[slug]    ← Company Profile
/news                ← News Listing
/news/[slug]         ← News Article
/library             ← Knowledge Library (research, reports)
/search              ← Search Results Page
/about               ← About ContentThailand
/contact             ← Contact
/privacy             ← Privacy Policy (PDPA TOR 4.17)
```

### Admin Backend (TOR 4.5)
```
/dashboard           ← Real-time stats + charts
/dashboard/films     ← Film CRUD table
/dashboard/series    ← Series CRUD table
/dashboard/persons   ← Personnel CRUD table
/dashboard/companies ← Companies CRUD table
/dashboard/news      ← News CRUD table
/dashboard/users     ← User & Role management (RBAC)
/dashboard/logs      ← Activity + access log (TOR 4.13)
/dashboard/system    ← System health + backup status
```

---

## 🗄️ DATABASE ENTITIES

### Core Tables
1. **films** — id, slug, titleTh, titleEn, year, duration, synopsisTh, synopsisEn, posterUrl, backdropUrl, status, companyId
2. **tv_series** — id, slug, titleTh, titleEn, year, episodes, channel, synopsisTh, synopsisEn, coverUrl, status, companyId
3. **persons** — id, slug, nameTh, nameEn, role[], biographyTh, biographyEn, photoUrl, birthYear
4. **companies** — id, slug, nameTh, nameEn, type, logoUrl, website
5. **genres** — id, nameTh, nameEn
6. **film_crew** — filmId, personId, role (junction)
7. **series_crew** — seriesId, personId, role (junction)
8. **awards** — id, name, category, year, filmId, personId, festival
9. **news** — id, slug, titleTh, titleEn, contentTh, contentEn, coverUrl, tags[], publishedAt

### Relationships
- Film/Series → Company (many-to-one)
- Film/Series → Genre (many-to-many)
- Film/Series → Person via FilmCrew/SeriesCrew (many-to-many with role)
- Film/Person → Award (one-to-many)

---

## 🌱 MOCK DATA (ภาษาไทยจริง)

### Films (30 รายการ — ตัวอย่าง)
```typescript
{ titleTh: "บุพเพสันนิวาส", titleEn: "Love Destiny", year: 2018, genre: "drama" }
{ titleTh: "ฉลาดเกมส์โกง", titleEn: "Bad Genius", year: 2017, genre: "thriller" }
{ titleTh: "พี่มาก..พระโขนง", titleEn: "Pee Mak", year: 2013, genre: "horror-comedy" }
{ titleTh: "สัตว์ประหลาด!", titleEn: "Monstrum", year: 2020, genre: "horror" }
{ titleTh: "ไทบ้าน เดอะซีรีส์", titleEn: "Thaiban", year: 2017, genre: "comedy" }
```

### Persons (30 คน — ตัวอย่าง)
```typescript
{ nameTh: "นนทรีย์ นิมิบุตร", nameEn: "Nonzee Nimibutr", role: ["director"] }
{ nameTh: "จินตหรา สุขพัฒน์", nameEn: "Chintara Sukapatana", role: ["actor"] }
{ nameTh: "อนันดา เอเวอริ่งแฮม", nameEn: "Ananda Everingham", role: ["actor"] }
```

### Companies (10 บริษัท)
```typescript
{ nameTh: "จีดีเอช 559", nameEn: "GDH 559", type: "production" }
{ nameTh: "สหมงคลฟิล์ม", nameEn: "Sahamongkol Film", type: "distribution" }
{ nameTh: "ไทยทีวีสีช่อง 3", nameEn: "Channel 3", type: "broadcaster" }
```

---

## 📋 TOR COMPLIANCE QUICK REFERENCE

| ข้อ | กำหนด | สถานะ |
|-----|-------|-------|
| 4.4 | Front End ≥ 11 หน้า | ✅ 16 หน้า |
| 4.5 | Back End CMS | ✅ Strapi + Custom Dashboard |
| 4.6 | Cloud Thailand + IPv6 + Antivirus + Firewall | ✅ G-Cloud Docker |
| 4.7 | Backup Daily/Weekly/Monthly | ✅ scripts/backup.sh |
| 4.8 | SEO + Google Analytics | ✅ Next.js metadata + GA4 |
| 4.9 | Search | ✅ Instant search + /search page |
| 4.10 | Data Migration | ✅ prisma/seed.ts |
| 4.11 | Data Dictionary + ERD | ✅ docs/ERD.md |
| 4.13 | Log / Traffic | ✅ Winston logger |
| 4.14 | SSL | ✅ Nginx + Let's Encrypt |
| 4.16 | อบรม Admin | ✅ docs/admin-guide.md |
| 4.17 | PDPA / Cookie | ✅ CookieBanner component |

---

## 🏆 SCORING STRATEGY

| เกณฑ์ | คะแนน | กลยุทธ์ |
|-------|-------|--------|
| A. ราคา | 40/100 | ยื่น 2,000,000 = Price Score สูงสุด |
| B1. ผลงาน | 20/100 | ยื่นสัญญา ≥ 4 รายการ ≥ 1,400,000 บาท |
| B2. Technical Proposal | 15/100 | ครบ 4 ประเด็น: ปัญหา/แผน/Gantt/Risk |
| B3. Front+Back+DB+Mockup | 15/100 | Demo PoC นี้คือ B3 ทั้งหมด |
| B4. บุคลากร | 10/100 | ยื่น ≥ 5 คน (เกิน TOR ที่กำหนด) |
| **รวม** | **100/100** | **เป้าหมาย: คะแนนเต็ม** |

---

## 🔒 WARRANTY / SLA (ตาม TOR จริง)

- รับประกัน **≥ 1 ปี** หลังรับมอบงาน
- รับทราบปัญหา: **ภายใน 1 ชั่วโมง**
- เริ่มแก้ไข: **ภายใน 4 ชั่วโมง**
- แก้ไขเสร็จ: **ภายใน 24 ชั่วโมง**
- เกิน 24 ชม.: แจ้งสำนักปลัดฯ เป็นรายครั้ง
- จัดทำรายงานสรุปปัญหาทุกครั้ง
- ที่ปรึกษาระบบฟรีตลอดอายุประกัน

---

## 📞 CONTACT (ทีม Support)

| ช่องทาง | ข้อมูล |
|---------|-------|
| โทรศัพท์ | 083-634-0895 |
| Email | support@synerry.com |
| Line Group | สร้างหลังอบรมผู้ใช้งาน |
| Emergency 24/7 | คุณปิยนุช 091-705-8375 |
| Emergency 24/7 | คุณรัตนศักดิ์ 081-824-4249 |

---

## 📁 KEY FILES TO KNOW

| ไฟล์ | เนื้อหา |
|------|--------|
| `.cursorrules` | AI behavior rules ทั้งหมด |
| `memory.md` | ไฟล์นี้ — full context |
| `PHASES.md` | Phase checklist โดยละเอียด |
| `TOR_COMPLIANCE.md` | Mapping TOR ทุกข้อ → code |
| `DESIGN_SYSTEM.md` | Tokens, components, patterns |
| `API_SPEC.md` | API endpoints ทั้งหมด |
| `DB_SCHEMA.md` | Prisma schema + ERD notes |
| `WOW_MOMENTS.md` | Demo WOW checklist |
| `docker-compose.yml` | Local dev setup |
| `prisma/schema.prisma` | Database schema |
| `prisma/seed.ts` | Thai mock data seed |

---

## ⚠️ CRITICAL DECISIONS

1. **PoC scope:** Mock data เท่านั้น — ไม่ต้องเชื่อม live data
2. **Admin:** Strapi ทำงานแยก port 1337, Custom Dashboard อยู่ที่ /dashboard
3. **Search:** Mock instant search ใน PoC (ไม่ต้องใช้ Elasticsearch จริง)
4. **Deploy:** Docker Compose → VPS G-Cloud (ไม่ใช่ AWS)
5. **Budget:** ยื่นราคา 2,000,000 บาท (ไม่ใช่ 2,900,000)
6. **Language:** TypeScript strict ทั้งหมด — ห้าม any
