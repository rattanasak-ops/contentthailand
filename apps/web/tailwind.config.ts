import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Official ContentThailand CI colors + Frame of Thailand concept
      colors: {
        // CI Primary — Dark backgrounds
        midnight: "#14133D",
        navy: {
          DEFAULT: "#1C1B4E",
          hover: "#252466",
          subtle: "#191847",
        },
        // CI Primary — Accent colors
        purple: {
          DEFAULT: "#702874",
          light: "#8B3591",
          muted: "#5A2060",
        },
        pink: {
          DEFAULT: "#EC1C72",
          light: "#F43F8A",
          muted: "#C41660",
        },
        // CI Secondary — Warm accents
        orange: {
          DEFAULT: "#F76532",
          light: "#F9844A",
        },
        amber: {
          DEFAULT: "#F6A51B",
          light: "#F8B840",
        },
        // Light backgrounds
        surface: {
          DEFAULT: "#F8F7F4",
          alt: "#F2F4F7",
        },
        // shadcn/ui mapped colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        number: ["var(--font-number)", "sans-serif"],
        thai: ["var(--font-thai)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "film-scroll": "filmScroll 20s linear infinite",
        "count-up": "countUp 2s ease-out forwards",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "shine-sweep": "shineSweep 0.8s ease-in-out",
        "aurora-rotate": "auroraRotate 3s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "text-shimmer": "textShimmer 2s linear infinite",
      },
      keyframes: {
        filmScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        shineSweep: {
          "0%": { transform: "translateX(-100%) rotate(-45deg)" },
          "100%": { transform: "translateX(200%) rotate(-45deg)" },
        },
        auroraRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
