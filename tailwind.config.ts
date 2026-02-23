import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        accent: {
          DEFAULT: "var(--color-accent)",
          dim: "var(--color-accent-dim)",
          border: "var(--color-accent-border)",
        },
        gold: {
          DEFAULT: "var(--color-gold)",
        },
        border: "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
        "theme-text": "var(--color-text)",
        "theme-muted": "var(--color-text-muted)",
        "theme-faint": "var(--color-text-faint)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      animation: {
        "scan-line": "scanLine 3s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "accent-glow": "0 0 40px var(--color-accent-dim)",
        "accent-glow-lg": "0 0 80px var(--color-accent-dim)",
        "gold-glow": "0 0 40px rgba(200,169,110,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
