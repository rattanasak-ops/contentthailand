# API_SPEC.md — ContentThailand REST API Specification
# PoC: Next.js API Routes | Production: Strapi v4 REST API

## Base URLs
```
PoC (Next.js):  http://localhost:3000/api
Strapi:         http://localhost:1337/api
Production:     https://contentthailand.com/api
```

## Standard Response Shape
```typescript
// Success
{ data: T, meta: { total: number, page: number, limit: number }, error: null }

// Error
{ data: null, meta: null, error: { message: string, code: string } }
```

## Authentication (Admin endpoints)
```
Header: Authorization: Bearer <jwt_token>
Roles:  super_admin | editor | viewer
```

---

## PUBLIC ENDPOINTS

### 🎬 Films

#### GET /api/films
ดึงรายการภาพยนตร์ทั้งหมด (paginated)

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | หน้าที่ต้องการ |
| limit | number | 20 | จำนวนต่อหน้า (max 100) |
| year | number | — | กรองตามปี เช่น 2023 |
| genre | string | — | slug ของ genre |
| company | number | — | company ID |
| sort | string | createdAt:desc | เรียงตาม field:asc/desc |
| search | string | — | ค้นหาในชื่อ (TH+EN) |
| status | string | published | published/draft/all |

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "bad-genius-2017",
      "titleTh": "ฉลาดเกมส์โกง",
      "titleEn": "Bad Genius",
      "year": 2017,
      "duration": 130,
      "posterUrl": "/images/films/bad-genius.jpg",
      "genres": [{ "id": 2, "nameTh": "ระทึกขวัญ", "nameEn": "Thriller" }],
      "company": { "id": 1, "nameTh": "จีดีเอช 559", "nameEn": "GDH 559" },
      "status": "published"
    }
  ],
  "meta": { "total": 562, "page": 1, "limit": 20 },
  "error": null
}
```

#### GET /api/films/:slug
ดึงข้อมูลภาพยนตร์ละเอียด (พร้อม cast, crew, awards)

**Response includes:** film + genres + crew (with person details) + awards + relatedFilms (5 รายการ)

#### GET /api/films/featured
ดึง 6 ภาพยนตร์ featured สำหรับ homepage carousel

---

### 📺 TV Series

#### GET /api/series
Query Params: page, limit, year, genre, channel, sort, search

#### GET /api/series/:slug
Full detail with cast + episodes summary + related series

#### GET /api/series/featured
6 series for homepage

---

### 👥 Persons

#### GET /api/persons
**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| role | string | director/actor/producer/cinematographer |
| search | string | ค้นหาชื่อ TH+EN |
| page, limit, sort | — | standard |

#### GET /api/persons/:slug
Full profile: bio + filmography (films + series) + awards

---

### 🏢 Companies

#### GET /api/companies
**Query Params:** type (production/distribution/broadcaster), search, page, limit

#### GET /api/companies/:slug
Profile: info + films list + series list

---

### 📰 News

#### GET /api/news
**Query Params:** tag, search, page, limit, sort (publishedAt:desc default)

#### GET /api/news/:slug
Full article + related news (same tags)

---

### 🔍 Search

#### GET /api/search
**Query Params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| q | string | ✅ | คำค้นหา (min 2 chars) |
| type | string | — | film/series/person/company/all |
| limit | number | 8 | จำนวน (dropdown max 8, page max 30) |

**Response:**
```json
{
  "data": {
    "films": [
      {
        "id": 1, "slug": "bad-genius-2017",
        "titleTh": "ฉลาด<mark>เก</mark>มส์โกง",
        "titleEn": "Bad Genius",
        "year": 2017,
        "posterUrl": "...",
        "_type": "film"
      }
    ],
    "series": [...],
    "persons": [...],
    "companies": [...]
  },
  "meta": {
    "total": 24,
    "breakdown": { "films": 12, "series": 5, "persons": 7, "companies": 0 },
    "query": "เกมส์"
  },
  "error": null
}
```

**Implementation (PoC — PostgreSQL ILIKE):**
```typescript
// app/api/search/route.ts
// Uses ILIKE for mock full-text search
// Production: Elasticsearch with Thai ICU analyzer
WHERE "titleTh" ILIKE '%${q}%' OR "titleEn" ILIKE '%${q}%'
```

---

### 📊 Stats (Homepage)

#### GET /api/stats
สถิติสำหรับ homepage dashboard

**Response:**
```json
{
  "data": {
    "films": { "total": 562, "thisMonth": 12 },
    "series": { "total": 737, "thisMonth": 5 },
    "persons": { "total": 5888, "thisMonth": 43 },
    "companies": { "total": 681 },
    "totalViews": 1254036,
    "topSearches": ["บุพเพสันนิวาส", "ฉลาดเกมส์โกง", "พี่มาก"],
    "monthlyVisits": [
      { "month": "ม.ค.", "visits": 98000 },
      { "month": "ก.พ.", "visits": 112000 }
    ]
  },
  "error": null
}
```

---

## ADMIN ENDPOINTS (Auth Required)

### Dashboard Stats

#### GET /api/admin/stats
ข้อมูล dashboard (real-time simulation)

#### GET /api/admin/activity
Activity log feed

**Query Params:** page, limit, userId, action, startDate, endDate

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "userName": "สมศรี แอดมิน",
      "action": "CREATE",
      "entity": "Film",
      "entityName": "บุพเพสันนิวาส ภาค 2",
      "createdAt": "2569-03-05T14:30:00Z"
    }
  ]
}
```

---

### Film Management

#### GET /api/admin/films
Admin film list (includes draft/archived)

#### POST /api/admin/films
สร้างภาพยนตร์ใหม่ (mock — returns success)

**Body:**
```json
{
  "titleTh": "string",
  "titleEn": "string",
  "year": 2024,
  "duration": 120,
  "synopsisTh": "string",
  "synopsisEn": "string",
  "posterUrl": "string",
  "companyId": 1,
  "genreIds": [1, 2],
  "status": "draft"
}
```

#### PUT /api/admin/films/:id
อัพเดทข้อมูล (mock — returns success)

#### DELETE /api/admin/films/:id
Archive ภาพยนตร์ (soft delete — status = "archived")

---

### User Management

#### GET /api/admin/users
รายชื่อผู้ใช้ระบบ

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "สมศรี แอดมิน",
      "email": "somsri@culture.go.th",
      "role": "super_admin",
      "lastLogin": "2569-03-05T09:00:00Z",
      "status": "active"
    }
  ]
}
```

#### POST /api/admin/users
เพิ่มผู้ใช้ใหม่ (mock)

#### PUT /api/admin/users/:id/role
เปลี่ยน role

---

### Logs (TOR 4.13)

#### GET /api/admin/logs/access
Traffic/access logs

**Query Params:** startDate, endDate, page, limit

#### GET /api/admin/logs/activity
Activity logs (create/update/delete actions)

#### GET /api/admin/logs/search
Search query logs (popular terms)

---

## ERROR CODES

| Code | HTTP | Description |
|------|------|-------------|
| NOT_FOUND | 404 | Resource not found |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient role |
| VALIDATION_ERROR | 400 | Invalid request body |
| SERVER_ERROR | 500 | Internal server error |

---

## MOCK API IMPLEMENTATION (PoC)

```typescript
// lib/mock-api.ts
// PoC ใช้ mock data ไม่ต้อง call Strapi จริง

import { films } from '@/lib/mock-data/films'
import { series } from '@/lib/mock-data/series'
import { persons } from '@/lib/mock-data/persons'

export function mockSearch(query: string, limit = 8) {
  const q = query.toLowerCase()
  return {
    films: films.filter(f =>
      f.titleTh.includes(query) || f.titleEn.toLowerCase().includes(q)
    ).slice(0, limit),
    series: series.filter(s =>
      s.titleTh.includes(query) || s.titleEn.toLowerCase().includes(q)
    ).slice(0, limit),
    persons: persons.filter(p =>
      p.nameTh.includes(query) || p.nameEn.toLowerCase().includes(q)
    ).slice(0, limit),
  }
}
```
