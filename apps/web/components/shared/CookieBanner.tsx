"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("ct-cookie-consent");
    if (!choice) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("ct-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("ct-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] rounded-2xl p-4 sm:p-5 shadow-[var(--ct-shadow)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie className="w-6 h-6 text-amber flex-shrink-0 hidden sm:block" />
          <p className="text-[var(--ct-text-secondary)] font-thai text-sm flex-1">
            เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ โดยการใช้เว็บไซต์นี้ต่อ คุณยอมรับ{" "}
            <a href="/privacy" className="text-amber hover:underline">นโยบายความเป็นส่วนตัว</a> ของเรา
          </p>
          <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
            <Button
              onClick={accept}
              className="flex-1 sm:flex-none bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold text-sm"
            >
              ยอมรับทั้งหมด
            </Button>
            <Button
              variant="outline"
              onClick={decline}
              className="flex-1 sm:flex-none border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] font-thai text-sm"
            >
              ปฏิเสธ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
