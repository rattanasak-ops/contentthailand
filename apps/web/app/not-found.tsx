import Link from "next/link";
import { Film, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Film reel decoration */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#702874]/20 to-[var(--ct-bg-elevated)] border-2 border-[var(--ct-border)] flex items-center justify-center">
          <Film className="w-10 h-10 text-[var(--ct-text-faint)]" />
        </div>

        <h1 className="font-display text-7xl text-[var(--ct-text-primary)] font-bold mb-2">404</h1>
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-[1px] bg-[#F6A51B]/30" />
          ))}
        </div>
        <p className="text-[var(--ct-text-secondary)] font-thai text-lg mb-2">ไม่พบหน้าที่คุณต้องการ</p>
        <p className="text-[var(--ct-text-muted)] font-body text-sm mb-8">
          หน้าที่คุณค้นหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F6A51B] hover:bg-[#F6A51B]/80 text-[#14133D] rounded-xl font-thai font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] hover:text-[var(--ct-text-primary)] rounded-xl font-thai font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            ค้นหา
          </Link>
        </div>
      </div>
    </div>
  );
}
