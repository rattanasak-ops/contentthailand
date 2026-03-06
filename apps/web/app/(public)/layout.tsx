import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { AccessibilityWidget } from "@/components/shared/AccessibilityWidget";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
        <AccessibilityWidget />
      </SmoothScroll>
    </LanguageProvider>
  );
}
