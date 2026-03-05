"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="font-display text-4xl text-white font-bold mb-2">เกิดข้อผิดพลาด</h1>
        <p className="text-white/50 font-thai mb-8">
          ขออภัย เกิดข้อผิดพลาดในการโหลดหน้านี้ กรุณาลองใหม่อีกครั้ง
        </p>
        <Button
          onClick={reset}
          className="bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold"
        >
          ลองใหม่อีกครั้ง
        </Button>
      </div>
    </div>
  );
}
