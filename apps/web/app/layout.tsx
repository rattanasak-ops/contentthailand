import type { Metadata } from "next";
import Script from "next/script";
import { playfair, spaceGrotesk, sarabun, notoSansThai, jetbrainsMono } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";

import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// TOR 4.8 — SEO metadata
export const metadata: Metadata = {
  title: {
    default: "ContentThailand — ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ",
    template: "%s | ContentThailand",
  },
  description:
    "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม",
  keywords: [
    "ภาพยนตร์ไทย",
    "Thai Film",
    "ละครโทรทัศน์",
    "ContentThailand",
    "ฐานข้อมูลภาพยนตร์",
  ],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ContentThailand",
    title: "ContentThailand — ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ",
    description: "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${sarabun.variable} ${notoSansThai.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
            {/* Accessibility: skip to content */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber focus:text-midnight focus:rounded-lg focus:font-thai focus:font-semibold"
            >
              ข้ามไปเนื้อหาหลัก
            </a>
            {children}
            <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
