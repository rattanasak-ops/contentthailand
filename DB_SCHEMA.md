# DB_SCHEMA.md — ContentThailand Database Schema
# TOR ข้อ 4.11: Data Dictionary + ERD

## ERD Overview

```
┌──────────┐    ┌──────────────┐    ┌──────────┐
│  Genre   │◄───│  FilmGenres  │───►│   Film   │
└──────────┘    └──────────────┘    └────┬─────┘
                                         │ companyId
┌──────────┐    ┌──────────────┐    ┌────▼─────┐
│  Genre   │◄───│SeriesGenres  │───►│ TvSeries │
└──────────┘    └──────────────┘    └────┬─────┘
                                         │ companyId
┌──────────┐◄────────────────────────────┘
│ Company  │◄───────────────────────────────────┐
└──────────┘                                    │
                                                │
┌──────────┐    ┌──────────────┐    ┌──────────┐
│  Person  │◄───│  FilmCrew    │───►│   Film   │
│          │◄───│ SeriesCrew   │───►│ TvSeries │
│          │◄───│   Award      │    └──────────┘
└──────────┘    └──────────────┘
```

---

## Full Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// FILMS
// ─────────────────────────────────────────
model Film {
  id          Int        @id @default(autoincrement())
  slug        String     @unique
  titleTh     String
  titleEn     String
  year        Int
  duration    Int?                      // minutes
  synopsisTh  String?    @db.Text
  synopsisEn  String?    @db.Text
  posterUrl   String?
  backdropUrl String?
  trailerUrl  String?
  imdbId      String?
  status      String     @default("published") // published|draft|archived
  viewCount   Int        @default(0)
  
  // Relations
  company     Company?   @relation(fields: [companyId], references: [id])
  companyId   Int?
  genres      Genre[]    @relation("FilmGenres")
  crew        FilmCrew[]
  awards      Award[]
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@index([year])
  @@index([status])
}

// ─────────────────────────────────────────
// TV SERIES
// ─────────────────────────────────────────
model TvSeries {
  id          Int          @id @default(autoincrement())
  slug        String       @unique
  titleTh     String
  titleEn     String
  year        Int
  endYear     Int?
  episodes    Int?
  channel     String?
  synopsisTh  String?      @db.Text
  synopsisEn  String?      @db.Text
  coverUrl    String?
  backdropUrl String?
  trailerUrl  String?
  status      String       @default("published")
  viewCount   Int          @default(0)
  
  // Relations
  company     Company?     @relation(fields: [companyId], references: [id])
  companyId   Int?
  genres      Genre[]      @relation("SeriesGenres")
  crew        SeriesCrew[]
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  @@index([year])
  @@index([channel])
}

// ─────────────────────────────────────────
// PERSONS (Personnel)
// ─────────────────────────────────────────
model Person {
  id            Int          @id @default(autoincrement())
  slug          String       @unique
  nameTh        String
  nameEn        String
  roles         String[]     // ["director", "actor", "producer", "cinematographer"]
  biographyTh   String?      @db.Text
  biographyEn   String?      @db.Text
  photoUrl      String?
  birthYear     Int?
  birthplace    String?
  nationality   String       @default("Thai")
  websiteUrl    String?
  imdbUrl       String?
  
  // Relations
  filmCrew      FilmCrew[]
  seriesCrew    SeriesCrew[]
  awards        Award[]
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@index([nameTh])
  @@index([nameEn])
}

// ─────────────────────────────────────────
// COMPANIES
// ─────────────────────────────────────────
model Company {
  id          Int        @id @default(autoincrement())
  slug        String     @unique
  nameTh      String
  nameEn      String
  type        String     // "production" | "distribution" | "streaming" | "broadcaster"
  logoUrl     String?
  website     String?
  description String?    @db.Text
  founded     Int?
  
  // Relations
  films       Film[]
  series      TvSeries[]
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// ─────────────────────────────────────────
// GENRES
// ─────────────────────────────────────────
model Genre {
  id      Int        @id @default(autoincrement())
  slug    String     @unique
  nameTh  String
  nameEn  String
  
  // Relations
  films   Film[]     @relation("FilmGenres")
  series  TvSeries[] @relation("SeriesGenres")
}

// ─────────────────────────────────────────
// FILM CREW (Junction: Film ↔ Person)
// ─────────────────────────────────────────
model FilmCrew {
  film      Film    @relation(fields: [filmId], references: [id], onDelete: Cascade)
  filmId    Int
  person    Person  @relation(fields: [personId], references: [id])
  personId  Int
  role      String  // "director" | "actor" | "producer" | "cinematographer" | "editor" | "composer"
  
  @@id([filmId, personId, role])
  @@index([personId])
}

// ─────────────────────────────────────────
// SERIES CREW (Junction: TvSeries ↔ Person)
// ─────────────────────────────────────────
model SeriesCrew {
  series    TvSeries @relation(fields: [seriesId], references: [id], onDelete: Cascade)
  seriesId  Int
  person    Person   @relation(fields: [personId], references: [id])
  personId  Int
  role      String
  
  @@id([seriesId, personId, role])
  @@index([personId])
}

// ─────────────────────────────────────────
// AWARDS
// ─────────────────────────────────────────
model Award {
  id        Int      @id @default(autoincrement())
  name      String                           // "รางวัลสุพรรณหงส์"
  category  String?                          // "ภาพยนตร์ยอดเยี่ยม"
  year      Int
  festival  String?                          // "งานประกาศรางวัลสุพรรณหงส์"
  isWinner  Boolean  @default(true)
  
  // Belongs to either Film OR Person
  film      Film?    @relation(fields: [filmId], references: [id])
  filmId    Int?
  person    Person?  @relation(fields: [personId], references: [id])
  personId  Int?
  
  createdAt DateTime @default(now())
  
  @@index([year])
  @@index([filmId])
  @@index([personId])
}

// ─────────────────────────────────────────
// NEWS
// ─────────────────────────────────────────
model News {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  titleTh     String
  titleEn     String?
  contentTh   String    @db.Text
  contentEn   String?   @db.Text
  excerptTh   String?
  coverUrl    String?
  tags        String[]
  status      String    @default("published")
  viewCount   Int       @default(0)
  publishedAt DateTime  @default(now())
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([publishedAt])
  @@index([status])
}

// ─────────────────────────────────────────
// SEARCH LOG (for analytics — TOR 4.13)
// ─────────────────────────────────────────
model SearchLog {
  id        Int      @id @default(autoincrement())
  query     String
  results   Int
  userId    String?
  ipAddress String?
  createdAt DateTime @default(now())
  
  @@index([createdAt])
  @@index([query])
}

// ─────────────────────────────────────────
// ACTIVITY LOG (TOR 4.13)
// ─────────────────────────────────────────
model ActivityLog {
  id         Int      @id @default(autoincrement())
  userId     String
  userName   String
  action     String   // "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "EXPORT"
  entity     String   // "Film" | "Person" | "News"
  entityId   Int?
  entityName String?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
  
  @@index([createdAt])
  @@index([userId])
}
```

---

## Data Dictionary

### Film
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | Int | ✅ | Primary key, auto-increment |
| slug | String | ✅ | URL-friendly unique identifier (e.g. "pee-mak-2013") |
| titleTh | String | ✅ | ชื่อภาษาไทย |
| titleEn | String | ✅ | Title in English |
| year | Int | ✅ | ปีที่ฉาย (ค.ศ.) |
| duration | Int | — | ความยาว (นาที) |
| synopsisTh | Text | — | เนื้อเรื่องภาษาไทย |
| synopsisEn | Text | — | Synopsis in English |
| posterUrl | String | — | URL รูป poster (2:3 ratio) |
| backdropUrl | String | — | URL รูป backdrop (16:9 ratio) |
| status | String | ✅ | published / draft / archived |
| companyId | Int | — | FK → Company.id |

### Person
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | Int | ✅ | Primary key |
| slug | String | ✅ | URL slug |
| nameTh | String | ✅ | ชื่อภาษาไทย |
| nameEn | String | ✅ | Name in English |
| roles | String[] | ✅ | บทบาท: director/actor/producer/etc. |
| biographyTh | Text | — | ประวัติภาษาไทย |
| photoUrl | String | — | URL รูปถ่าย |
| nationality | String | ✅ | Default: "Thai" |

### Genre Values
```
ดราม่า        / Drama
สยองขวัญ      / Horror
โรแมนติก      / Romance
คอมเมดี้      / Comedy
แอคชัน        / Action
ผจญภัย        / Adventure
ระทึกขวัญ     / Thriller
สารคดี        / Documentary
แอนิเมชัน    / Animation
ครอบครัว      / Family
```

### FilmCrew Role Values
```
director       ผู้กำกับ
actor          นักแสดง
producer       โปรดิวเซอร์
cinematographer ผู้กำกับภาพ
editor         ตัดต่อ
composer       ดนตรี
writer         บท
```

---

## Seed Data Samples (prisma/seed.ts)

```typescript
// Films to seed (ภาพยนตร์ไทยจริง)
const films = [
  {
    slug: "bad-genius-2017",
    titleTh: "ฉลาดเกมส์โกง",
    titleEn: "Bad Genius",
    year: 2017,
    duration: 130,
    synopsisTh: "ลินน์ นักเรียนเก่งที่ใช้ความฉลาดโกงข้อสอบ STIC เพื่อช่วยเพื่อนที่ต้องการสมัครเข้าเรียนต่อมหาวิทยาลัยในออสเตรเลีย",
    synopsisEn: "A genius high school student becomes entangled in a test cheating scheme with international stakes.",
    posterUrl: "/images/films/bad-genius.jpg",
  },
  {
    slug: "pee-mak-phrakanong-2013",
    titleTh: "พี่มาก..พระโขนง",
    titleEn: "Pee Mak",
    year: 2013,
    duration: 105,
    synopsisTh: "มาก ทหารหาญที่กลับบ้านหลังสงคราม พร้อมด้วยเพื่อนทหารอีก 4 คน แต่กลับพบว่าภรรยาของเขาอาจไม่ใช่คนธรรมดา",
    synopsisEn: "Mak returns from war with friends to his village, but they begin to suspect his wife Nak may be a ghost.",
  },
  {
    slug: "love-destiny-2018",
    titleTh: "บุพเพสันนิวาส",
    titleEn: "Love Destiny",
    year: 2018,
    duration: 0, // series
    synopsisTh: "ออแอ๋ว นักโบราณคดียุคปัจจุบันที่ถูกส่งย้อนเวลาไปในยุคกรุงศรีอยุธยา",
  },
  {
    slug: "teacher-thai-2023",
    titleTh: "ครูไทย",
    titleEn: "Thai Teacher",
    year: 2023,
    duration: 95,
    synopsisTh: "ครูหนุ่มที่ถูกส่งไปสอนในโรงเรียนชนบทห่างไกล ค้นพบความหมายที่แท้จริงของการศึกษา",
  },
]
```

---

## Index Strategy

```sql
-- Performance indexes (run after migration)
CREATE INDEX idx_films_year ON "Film"(year);
CREATE INDEX idx_films_status ON "Film"(status);
CREATE INDEX idx_persons_name ON "Person"("nameTh", "nameEn");
CREATE INDEX idx_news_published ON "News"("publishedAt" DESC);
CREATE INDEX idx_search_log_query ON "SearchLog"(query);
CREATE INDEX idx_activity_log_created ON "ActivityLog"("createdAt" DESC);

-- Full-text search (Thai) — Production only with Elasticsearch
-- PoC: Use PostgreSQL ILIKE for mock search
```
