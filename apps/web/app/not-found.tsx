import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Film reel decoration */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple/20 to-navy border-2 border-white/10 flex items-center justify-center">
          <Film className="w-10 h-10 text-white/20" />
        </div>

        <h1 className="font-display text-7xl text-white font-bold mb-2">404</h1>
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-[1px] bg-amber/30" />
          ))}
        </div>
        <p className="text-white/50 font-thai text-lg mb-2">ไม่พบหน้าที่คุณต้องการ</p>
        <p className="text-white/30 font-body text-sm mb-8">
          หน้าที่คุณค้นหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber/80 text-midnight rounded-xl font-thai font-semibold transition-colors"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
