import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#DC2626", dark: "#B91C1C" },
        accent: "#EF4444",
        dark: { DEFAULT: "#0A0A0A", card: "#1F1F1F" },
        light: "#F5F5F5",
        beginner: "#ef4444",
        learning: "#eab308",
        proficient: "#22c55e",
        mastered: "#3b82f6",
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(220, 38, 38, 0.3)",
        "red-glow-lg": "0 0 40px rgba(220, 38, 38, 0.4)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(220, 38, 38, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(220, 38, 38, 0.5)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
