"use client";

import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="font-display text-4xl text-[var(--ct-text-primary)] font-bold mb-2">เกิดข้อผิดพลาด</h1>
        <p className="text-[var(--ct-text-muted)] font-thai mb-8">
          ขออภัย เกิดข้อผิดพลาดในการโหลดหน้านี้ กรุณาลองใหม่อีกครั้ง
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F6A51B] hover:bg-[#F6A51B]/80 text-[#14133D] rounded-xl font-thai font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            ลองใหม่อีกครั้ง
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] hover:text-[var(--ct-text-primary)] rounded-xl font-thai font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
