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
        brand: {
          50: "#f0faf4",
          100: "#dcf5e6",
          200: "#baeacf",
          300: "#86d9ad",
          400: "#4fc184",
          500: "#2aa865",
          600: "#1d8a51",
          700: "#196e42",
          800: "#185837",
          900: "#15482e",
          950: "#0a2819",
        },
        sage: {
          50: "#f6f8f4",
          100: "#eaefe5",
          200: "#d3dfca",
          300: "#b0c7a0",
          400: "#87aa72",
          500: "#678d52",
          600: "#517040",
          700: "#415934",
          800: "#36482c",
          900: "#2d3c25",
        },
        // Dark editorial palette for intro/landing page
        forest: {
          50:  "#f2f7f2",
          100: "#deeade",
          200: "#b9d2b9",
          300: "#8ab68a",
          400: "#5a9960",
          500: "#3d7d44",
          600: "#2e6434",
          700: "#244f29",
          800: "#1c3d20",
          900: "#162f19",
          950: "#0d1e10",
        },
        ink: {
          50:  "#f5f5f0",
          100: "#e8e6df",
          200: "#d1cfc5",
          300: "#b2af9f",
          400: "#8e8a78",
          500: "#726e5d",
          600: "#5a5748",
          700: "#464438",
          800: "#2e2d25",
          900: "#1c1c16",
          950: "#111110",
        },
        cream: "#faf9f6",
        parchment: "#f5f0e8",
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
        float:       "0 4px 24px 0 rgba(42,168,101,0.18)",
        "float-dark":"0 8px 40px 0 rgba(0,0,0,0.40)",
        glow:        "0 0 40px 0 rgba(42,168,101,0.25)",
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
