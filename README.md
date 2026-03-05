# ContentThailand PoC — Cursor AI Files
# วางไฟล์ทั้งหมดนี้ที่ root ของโปรเจค

## 📁 ไฟล์ในชุดนี้

| ไฟล์ | ใช้ทำอะไร |
|------|----------|
| `.cursorrules` | **Rules หลัก** — AI ต้องอ่านก่อนทุกครั้ง: roles, stack, patterns, conventions |
| `memory.md` | **Project Context** — ข้อมูลทั้งหมดของโปรเจค: client, budget, brand, decisions |
| `PHASES.md` | **Build Plan** — 8 phases พร้อม checklist ละเอียด + setup commands |
| `TOR_COMPLIANCE.md` | **TOR Mapping** — ทุก TOR ข้อ → code implementation |
| `DESIGN_SYSTEM.md` | **Design Tokens** — colors, typography, components, animations |
| `API_SPEC.md` | **API Reference** — ทุก endpoint: params, response shape, mock impl |
| `DB_SCHEMA.md` | **Database** — Prisma schema ครบ + ERD + Data Dictionary (TOR 4.11) |
| `WOW_MOMENTS.md` | **Demo Strategy** — 10 WOW moments + judge journey + demo script |
| `PROMPT_P0.md` | **Ready-to-use Prompts** — copy-paste ใน Cursor สำหรับแต่ละ Phase |

---

## 🚀 วิธีใช้กับ Cursor

### ขั้นตอนที่ 1: วางไฟล์
```bash
# วางทุกไฟล์ที่ root ของโปรเจค
contentthailand-poc/
├── .cursorrules       ← ← ← สำคัญที่สุด
├── memory.md
├── PHASES.md
├── TOR_COMPLIANCE.md
├── DESIGN_SYSTEM.md
├── API_SPEC.md
├── DB_SCHEMA.md
├── WOW_MOMENTS.md
└── PROMPT_P0.md
```

### ขั้นตอนที่ 2: เริ่ม Phase 0
เปิด Cursor Chat แล้ว copy prompt จาก `PROMPT_P0.md` หัวข้อ "Phase 0"

### ขั้นตอนที่ 3: ทำตามลำดับ Phase
P0 → P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8

แต่ละ Phase: ใช้ prompt ใน `PROMPT_P0.md` + เช็ค checklist ใน `PHASES.md`

---

## ⚡ Quick Reference

### Tech Stack
```
Frontend:  Next.js 14 App Router + TypeScript
Styling:   Tailwind CSS + shadcn/ui
CMS:       Strapi v4
Database:  PostgreSQL 16 + Prisma 5
Cache:     Redis 7
Animation: Framer Motion 10
Deploy:    Docker Compose → VPS G-Cloud
Package:   pnpm (Node.js 20)
```

### Key Design Tokens
```
--midnight: #0D1B2A   (dark background)
--navy:     #1A3A5C   (card background)
--gold:     #C9A84C   (accent color)
--surface:  #F8F7F4   (light background)

Font Display:  Playfair Display
Font Thai:     Sarabun
Font Body:     Noto Sans Thai
```

### TOR Summary
```
4.4  → 11+ หน้า (เราทำ 14+ หน้า)
4.5  → CMS + Admin Dashboard
4.6  → G-Cloud Thailand VPS
4.7  → Backup Daily/Weekly/Monthly
4.8  → SEO + Google Analytics
4.9  → Full-text Search (Thai+EN)
4.11 → ERD + Data Dictionary (DB_SCHEMA.md)
4.13 → Log + Activity (Winston)
4.14 → SSL (Let's Encrypt)
4.16 → อบรม Admin ≥ 5 คน
4.17 → PDPA + Cookie Consent
```

### Mock Data Stats (แสดงใน Demo)
```
ภาพยนตร์:     562 เรื่อง
ละครโทรทัศน์: 737 เรื่อง
บุคลากร:      5,888 คน
บริษัท:       681 บริษัท
ผู้เข้าชม:    1,254,036 ครั้ง
```

---

## ⚠️ Critical Rules

1. **pnpm เท่านั้น** — ห้าม npm หรือ yarn
2. **TypeScript strict** — ห้าม `any`
3. **TOR comment** — ทุก feature ที่ตอบ TOR ต้องมี comment `// TOR 4.x`
4. **ไม่มี real data** — PoC ใช้ mock data ทั้งหมด
5. **G-Cloud ไม่ใช่ AWS** — production deploy
6. **ราคายื่น 2,000,000 บาท** — ไม่ใช่ 2,900,000

---

## 📞 Contact

| ช่องทาง | ข้อมูล |
|---------|-------|
| Agency | SYNERRY |
| Support | 083-634-0895 |
| Email | support@synerry.com |
| Emergency | คุณปิยนุช 091-705-8375 |
| Emergency | คุณรัตนศักดิ์ 081-824-4249 |
