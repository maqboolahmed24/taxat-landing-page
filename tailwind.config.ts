import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-2": "hsl(var(--surface-2) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        text: "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-2": "hsl(var(--accent-2) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        warn: "hsl(var(--warn) / <alpha-value>)",
        danger: "hsl(var(--danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"],
        display: ["var(--font-display)", "var(--font-sans)"],
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--border) / 0.7), 0 0 42px hsl(var(--accent) / 0.14)",
        "glow-lg": "0 0 0 1px hsl(var(--border) / 0.6), 0 0 80px hsl(var(--accent-2) / 0.18)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.65) 1px, transparent 0)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        pulseGlow: "pulseGlow 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
