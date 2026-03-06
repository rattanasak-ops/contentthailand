"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  X,
  RotateCcw,
  Minus,
  Plus,
  Heading,
  Link2,
  Moon,
  Sun,
  ImageOff,
  CircleDot,
  Palette,
  Droplets,
  MousePointer,
  Volume2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Translations (th / en) ─────────────────────────────────────────
const translations = {
  th: {
    title: "การเข้าถึง",
    subtitle: "ปรับการแสดงผลตามความต้องการ",
    reset: "คืนค่าเริ่มต้น",
    close: "ปิด",
    contentSize: "ขนาดเนื้อหา",
    fontSize: "ขนาดตัวอักษร",
    lineHeight: "ความสูงบรรทัด",
    letterSpacing: "ระยะห่างตัวอักษร",
    highlightHeadings: "เน้นหัวเรื่อง",
    highlightLinks: "เน้นลิงก์",
    darkContrast: "คอนทราสต์มืด",
    lightContrast: "คอนทราสต์สว่าง",
    grayscale: "ภาพขาวดำ",
    highContrast: "คอนทราสต์สูง",
    highSaturation: "ความอิ่มตัวสีสูง",
    lowSaturation: "ความอิ่มตัวสีต่ำ",
    highlightHover: "เน้นเมื่อชี้",
    textToSpeech: "อ่านออกเสียง",
    ttsActive: "เลือกข้อความที่ต้องการฟัง",
    default: "ค่าเริ่มต้น",
  },
  en: {
    title: "Accessibility",
    subtitle: "Adjust display to your needs",
    reset: "Reset",
    close: "Close",
    contentSize: "Content Size",
    fontSize: "Font Size",
    lineHeight: "Line Height",
    letterSpacing: "Letter Spacing",
    highlightHeadings: "Highlight Headings",
    highlightLinks: "Highlight Links",
    darkContrast: "Dark Contrast",
    lightContrast: "Light Contrast",
    grayscale: "Grayscale",
    highContrast: "High Contrast",
    highSaturation: "High Saturation",
    lowSaturation: "Low Saturation",
    highlightHover: "Highlight Cursor",
    textToSpeech: "Text to Speech",
    ttsActive: "Select text to listen",
    default: "Default",
  },
} as const;

// ─── State shape ─────────────────────────────────────────────────────
interface A11yState {
  contentSize: number; // 0-5, default 2
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highlightHeadings: boolean;
  highlightLinks: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  grayscale: boolean;
  highContrast: boolean;
  highSaturation: boolean;
  lowSaturation: boolean;
  highlightHover: boolean;
  textToSpeech: boolean;
}

const DEFAULT_STATE: A11yState = {
  contentSize: 2,
  fontSize: 2,
  lineHeight: 2,
  letterSpacing: 2,
  highlightHeadings: false,
  highlightLinks: false,
  darkContrast: false,
  lightContrast: false,
  grayscale: false,
  highContrast: false,
  highSaturation: false,
  lowSaturation: false,
  highlightHover: false,
  textToSpeech: false,
};

const STORAGE_KEY = "a11y-preferences";

// ─── CSS class mappings ──────────────────────────────────────────────
const CONTENT_SIZE_CLASSES = [
  "a11y-content-0",
  "a11y-content-1",
  "a11y-content-2",
  "a11y-content-3",
  "a11y-content-4",
  "a11y-content-5",
];
const FONT_SIZE_CLASSES = [
  "a11y-font-0",
  "a11y-font-1",
  "a11y-font-2",
  "a11y-font-3",
  "a11y-font-4",
  "a11y-font-5",
];
const LINE_HEIGHT_CLASSES = [
  "a11y-lh-0",
  "a11y-lh-1",
  "a11y-lh-2",
  "a11y-lh-3",
  "a11y-lh-4",
  "a11y-lh-5",
];
const LETTER_SPACING_CLASSES = [
  "a11y-ls-0",
  "a11y-ls-1",
  "a11y-ls-2",
  "a11y-ls-3",
  "a11y-ls-4",
  "a11y-ls-5",
];

// ─── TTS voice map ───────────────────────────────────────────────────
const VOICE_MAP: Record<string, string> = {
  th: "th-TH",
  en: "en-US",
};

// ─── Component ───────────────────────────────────────────────────────
export function AccessibilityWidget() {
  const { lang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang] || translations.th;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // ── Load from localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // ── Save to localStorage + apply classes ──
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    applyClasses(state);
  }, [state, mounted]);

  // ── Focus trap ──
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);

    // Focus first focusable
    requestAnimationFrame(() => {
      const first = panel.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    });

    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // ── TTS handler ──
  useEffect(() => {
    if (!state.textToSpeech || typeof window === "undefined") return;

    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (!selection) return;
      const utterance = new SpeechSynthesisUtterance(selection);
      utterance.lang = VOICE_MAP[lang] || "en-US";
      utterance.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      speechSynthesis.cancel();
    };
  }, [state.textToSpeech, lang]);

  // ── Announce change to screen readers ──
  const announce = useCallback((msg: string) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  }, []);

  // ── Helpers ──
  const updateSlider = (
    key: "contentSize" | "fontSize" | "lineHeight" | "letterSpacing",
    delta: number
  ) => {
    setState((prev) => {
      const next = Math.max(0, Math.min(5, prev[key] + delta));
      if (next === prev[key]) return prev;
      return { ...prev, [key]: next };
    });
    announce(`${t[key]}: ${state[key] + delta}`);
  };

  const toggleBool = (key: keyof A11yState) => {
    setState((prev) => {
      const val = !prev[key];
      const next = { ...prev, [key]: val };
      // Mutual exclusions
      if (key === "darkContrast" && val) next.lightContrast = false;
      if (key === "lightContrast" && val) next.darkContrast = false;
      if (key === "highSaturation" && val) next.lowSaturation = false;
      if (key === "lowSaturation" && val) next.highSaturation = false;
      return next;
    });
    announce(
      `${t[key as keyof typeof t]}: ${state[key as keyof A11yState] ? t.default : "on"}`
    );
  };

  const resetAll = () => {
    setState(DEFAULT_STATE);
    announce(t.reset);
  };

  // ── Reduced motion check ──
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const panelVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 20, scale: 0.95 },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            duration: 0.4,
          },
        },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } },
  };

  if (!mounted) return null;

  // ── Active count badge ──
  const activeCount =
    (state.contentSize !== 2 ? 1 : 0) +
    (state.fontSize !== 2 ? 1 : 0) +
    (state.lineHeight !== 2 ? 1 : 0) +
    (state.letterSpacing !== 2 ? 1 : 0) +
    (state.highlightHeadings ? 1 : 0) +
    (state.highlightLinks ? 1 : 0) +
    (state.darkContrast ? 1 : 0) +
    (state.lightContrast ? 1 : 0) +
    (state.grayscale ? 1 : 0) +
    (state.highContrast ? 1 : 0) +
    (state.highSaturation ? 1 : 0) +
    (state.lowSaturation ? 1 : 0) +
    (state.highlightHover ? 1 : 0) +
    (state.textToSpeech ? 1 : 0);

  return (
    <>
      {/* Screen reader live region */}
      <div ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      {/* Floating toolbar — top-right */}
      <div className="a11y-panel-root fixed top-20 right-4 z-[70] flex flex-col items-center gap-2">
        {/* WCAG Accessibility button */}
        <button
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          aria-label={t.title}
          aria-expanded={open}
          aria-controls="a11y-panel"
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-pink text-white shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
        >
          <Accessibility className="w-5 h-5" />
          {activeCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-amber text-midnight rounded-full">
              {activeCount}
            </span>
          )}
        </button>

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? (lang === "th" ? "เปลี่ยนเป็นโหมดสว่าง" : "Switch to light mode") : (lang === "th" ? "เปลี่ยนเป็นโหมดมืด" : "Switch to dark mode")}
          className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-primary)]"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-amber" /> : <Moon className="w-5 h-5 text-purple" />}
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-panel"
            ref={panelRef}
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="a11y-panel-root fixed top-[72px] right-[68px] z-[71] w-[340px] max-h-[calc(100vh-90px)] overflow-y-auto rounded-2xl shadow-2xl border backdrop-blur-xl sm:w-[360px] border-[var(--ct-border)] bg-[var(--ct-bg-elevated)]"
            style={{ backgroundColor: theme === "dark" ? "rgba(20,19,61,0.95)" : "rgba(255,255,255,0.97)" }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 rounded-t-2xl border-b border-[var(--ct-border)]" style={{ backgroundColor: theme === "dark" ? "#1C1B4E" : "#F0EDE8" }}>
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-pink" />
                <div>
                  <h2 className="text-sm font-bold font-thai text-[var(--ct-text-primary)]">
                    {t.title}
                  </h2>
                  <p className="text-[11px] font-thai text-[var(--ct-text-muted)]">
                    {t.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetAll}
                  aria-label={t.reset}
                  className="p-1.5 text-[var(--ct-text-muted)] hover:text-amber hover:bg-[var(--ct-bg-hover)] rounded-lg transition-colors text-[11px] font-thai"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label={t.close}
                  className="p-1.5 text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)] rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TTS Active Banner */}
            {state.textToSpeech && (
              <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-amber/10 border border-amber/20 text-amber text-xs font-thai flex items-center gap-2">
                <Volume2 className="w-4 h-4 flex-shrink-0" />
                {t.ttsActive}
              </div>
            )}

            <div className="p-3 space-y-3">
              {/* ── Group A: Sliders ── */}
              <div role="group" aria-label={t.contentSize} className="space-y-2" data-theme={theme}>
                <SliderControl
                  label={t.contentSize}
                  value={state.contentSize}
                  onDecrease={() => updateSlider("contentSize", -1)}
                  onIncrease={() => updateSlider("contentSize", 1)}
                  defaultLabel={t.default}
                />
                <SliderControl
                  label={t.fontSize}
                  value={state.fontSize}
                  onDecrease={() => updateSlider("fontSize", -1)}
                  onIncrease={() => updateSlider("fontSize", 1)}
                  defaultLabel={t.default}
                />
                <SliderControl
                  label={t.lineHeight}
                  value={state.lineHeight}
                  onDecrease={() => updateSlider("lineHeight", -1)}
                  onIncrease={() => updateSlider("lineHeight", 1)}
                  defaultLabel={t.default}
                />
                <SliderControl
                  label={t.letterSpacing}
                  value={state.letterSpacing}
                  onDecrease={() => updateSlider("letterSpacing", -1)}
                  onIncrease={() => updateSlider("letterSpacing", 1)}
                  defaultLabel={t.default}
                />
              </div>

              <div className="border-t border-[var(--ct-border)]" />

              {/* ── Group B: Highlight Toggles ── */}
              <div className="grid grid-cols-2 gap-2">
                <ToggleButton
                  icon={<Heading className="w-4 h-4" />}
                  label={t.highlightHeadings}
                  active={state.highlightHeadings}
                  onClick={() => toggleBool("highlightHeadings")}
                />
                <ToggleButton
                  icon={<Link2 className="w-4 h-4" />}
                  label={t.highlightLinks}
                  active={state.highlightLinks}
                  onClick={() => toggleBool("highlightLinks")}
                />
              </div>

              <div className="border-t border-[var(--ct-border)]" />

              {/* ── Group C: Display Toggles ── */}
              <div className="grid grid-cols-2 gap-2">
                <ToggleButton
                  icon={<Moon className="w-4 h-4" />}
                  label={t.darkContrast}
                  active={state.darkContrast}
                  onClick={() => toggleBool("darkContrast")}
                />
                <ToggleButton
                  icon={<Sun className="w-4 h-4" />}
                  label={t.lightContrast}
                  active={state.lightContrast}
                  onClick={() => toggleBool("lightContrast")}
                />
                <ToggleButton
                  icon={<ImageOff className="w-4 h-4" />}
                  label={t.grayscale}
                  active={state.grayscale}
                  onClick={() => toggleBool("grayscale")}
                />
                <ToggleButton
                  icon={<CircleDot className="w-4 h-4" />}
                  label={t.highContrast}
                  active={state.highContrast}
                  onClick={() => toggleBool("highContrast")}
                />
                <ToggleButton
                  icon={<Palette className="w-4 h-4" />}
                  label={t.highSaturation}
                  active={state.highSaturation}
                  onClick={() => toggleBool("highSaturation")}
                />
                <ToggleButton
                  icon={<Droplets className="w-4 h-4" />}
                  label={t.lowSaturation}
                  active={state.lowSaturation}
                  onClick={() => toggleBool("lowSaturation")}
                />
                <ToggleButton
                  icon={<MousePointer className="w-4 h-4" />}
                  label={t.highlightHover}
                  active={state.highlightHover}
                  onClick={() => toggleBool("highlightHover")}
                />
                <ToggleButton
                  icon={<Volume2 className="w-4 h-4" />}
                  label={t.textToSpeech}
                  active={state.textToSpeech}
                  onClick={() => toggleBool("textToSpeech")}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 text-center text-[10px] text-[var(--ct-text-faint)] border-t border-[var(--ct-border)] font-thai">
              WCAG 2.1 Level AA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function SliderControl({
  label,
  value,
  onDecrease,
  onIncrease,
  defaultLabel,
}: {
  label: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  defaultLabel: string;
}) {
  const isDefault = value === 2;
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--ct-bg-hover)] hover:opacity-80 transition-colors">
      <span className="text-xs text-[var(--ct-text-secondary)] font-thai flex-1 min-w-0 truncate">
        {label}
      </span>
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={onDecrease}
          disabled={value <= 0}
          aria-label={`${label} -`}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span
          className={`text-[11px] min-w-[52px] text-center font-thai ${
            isDefault ? "text-[var(--ct-text-faint)]" : "text-amber font-semibold"
          }`}
        >
          {isDefault ? defaultLabel : `${value - 2 > 0 ? "+" : ""}${value - 2}`}
        </span>
        <button
          onClick={onIncrease}
          disabled={value >= 5}
          aria-label={`${label} +`}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ToggleButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-thai transition-all w-full text-left ${
        active
          ? "bg-pink/15 text-pink border border-pink/30"
          : "bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] border border-transparent hover:text-[var(--ct-text-secondary)]"
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

// ─── Apply CSS classes to <html> ─────────────────────────────────────
function applyClasses(state: A11yState) {
  const html = document.documentElement;

  // Remove all a11y classes
  const existing = Array.from(html.classList).filter((c) =>
    c.startsWith("a11y-")
  );
  existing.forEach((c) => html.classList.remove(c));

  // Sliders
  html.classList.add(CONTENT_SIZE_CLASSES[state.contentSize]);
  html.classList.add(FONT_SIZE_CLASSES[state.fontSize]);
  html.classList.add(LINE_HEIGHT_CLASSES[state.lineHeight]);
  html.classList.add(LETTER_SPACING_CLASSES[state.letterSpacing]);

  // Toggles
  if (state.highlightHeadings) html.classList.add("a11y-highlight-headings");
  if (state.highlightLinks) html.classList.add("a11y-highlight-links");
  if (state.darkContrast) html.classList.add("a11y-dark-contrast");
  if (state.lightContrast) html.classList.add("a11y-light-contrast");
  if (state.grayscale) html.classList.add("a11y-grayscale");
  if (state.highContrast) html.classList.add("a11y-high-contrast");
  if (state.highSaturation) html.classList.add("a11y-high-saturation");
  if (state.lowSaturation) html.classList.add("a11y-low-saturation");
  if (state.highlightHover) html.classList.add("a11y-highlight-hover");
}
