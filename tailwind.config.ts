import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Primary ───────────────────────────────────────────────────
        brand: {
          50:  "#F1F5EB", // Primary Surface — tonal card/section backgrounds
          100: "#E0EDDB",
          200: "#C4E0C4",
          300: "#8CE08C", // Primary Green Light — accents & background fills
          400: "#5CC85C",
          500: "#3AAD3A",
          600: "#186E28", // Primary Green — CTA buttons, active states, icons
          700: "#145520",
          800: "#0F3E18",
          900: "#0A2910",
          950: "#051508",
        },
        // ── Backgrounds & Surfaces ──────────────────────────────────────────
        sage: {
          50:  "#F8FAF3", // App Background
          100: "#F1F5EB", // Primary Surface
          200: "#E2E3DC", // Surface Container — borders & dividers
          300: "#C8CCC5",
          400: "#ADB4A8", // Light Gray — placeholders & disabled states
          500: "#8A9285",
          600: "#5D645C", // Medium Gray — secondary text & metadata
          700: "#474D46",
          800: "#2D342C", // Deep Charcoal — primary text
          900: "#1F261E",
        },
        // ── Dark editorial palette for intro/landing page ───────────────────
        forest: {
          50:  "#F2F7F2",
          100: "#DEE9DE",
          200: "#B5D1B5",
          300: "#82B282",
          400: "#519151",
          500: "#2F712F",
          600: "#1F5A1F",
          700: "#1A481A",
          800: "#143814",
          900: "#0E2A0E",
          950: "#071507",
        },
        // ── Typography ──────────────────────────────────────────────────────
        ink: {
          50:  "#F5F5F0",
          100: "#E8E6DF",
          200: "#D1CFC5",
          300: "#B2AF9F",
          400: "#ADB4A8", // Light Gray — placeholders & disabled
          500: "#5D645C", // Medium Gray — secondary text
          600: "#474D46",
          700: "#2D342C", // Deep Charcoal — primary text
          800: "#232922",
          900: "#1A1E19",
          950: "#111110",
        },
        cream:     "#F8FAF3", // App Background — off-white, paper-like
        parchment: "#F1F5EB", // Primary Surface — tonal tint
        // ── Semantic ────────────────────────────────────────────────────────
        warning: "#E6B34D", // Warning/Pending — soft gold
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card:        "0 2px 16px 0 rgba(0,0,0,0.06)",
        "card-hover":"0 8px 32px 0 rgba(0,0,0,0.10)",
        float:       "0 4px 24px 0 rgba(24,110,40,0.18)",
        "float-dark":"0 8px 40px 0 rgba(0,0,0,0.40)",
        glow:        "0 0 40px 0 rgba(24,110,40,0.25)",
      },
      animation: {
        "fade-in":   "fadeIn 0.4s ease-out",
        "slide-up":  "slideUp 0.4s ease-out",
        "scale-in":  "scaleIn 0.3s ease-out",
        shimmer:     "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
