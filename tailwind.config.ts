import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "bar-grow": {
          from: { width: "0%", opacity: "0.6" },
          to: { width: "var(--bar-w)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.4)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(59,130,246,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease both",
        "bar-grow": "bar-grow 1s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
