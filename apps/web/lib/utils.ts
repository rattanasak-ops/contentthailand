import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
]

const THAI_MONTHS_SHORT = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
]

export function formatThaiDate(date: string | Date, short = false): string {
  const d = new Date(date)
  const day = d.getDate()
  const month = short ? THAI_MONTHS_SHORT[d.getMonth()] : THAI_MONTHS[d.getMonth()]
  const year = d.getFullYear() + 543
  return `${day} ${month} ${year}`
}

export function formatNumber(num: number): string {
  return num.toLocaleString("th-TH")
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  lang: "th" | "en"
): string {
  const thKey = `${field}Th` as keyof T
  const enKey = `${field}En` as keyof T
  if (lang === "th") {
    return (item[thKey] as string) || (item[enKey] as string) || ""
  }
  return (item[enKey] as string) || (item[thKey] as string) || ""
}
