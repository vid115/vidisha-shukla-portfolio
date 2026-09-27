/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1420",
          soft: "#131A28",
          surface: "#161D2C",
          border: "#242D42",
        },
        paper: {
          DEFAULT: "#F6F7FB",
          soft: "#FFFFFF",
          surface: "#FFFFFF",
          border: "#DEE2EC",
        },
        brass: {
          50: "#FBF3E6",
          100: "#F5E3C2",
          200: "#EFCF95",
          300: "#E9BB68",
          400: "#E2A44E",
          500: "#D08E33",
          600: "#B3791F",
          700: "#8C5F19",
        },
        signal: {
          50: "#EAF2FE",
          100: "#CFE2FC",
          200: "#A4C6F7",
          300: "#79AAF0",
          400: "#5A97E0",
          500: "#3E7DCB",
          600: "#2E63A8",
          700: "#254F87",
        },
        // Used sparingly, only to label the Node.js side of the Philips
        // data-flow diagram — a deliberate nod to Node's own brand green,
        // not a general-purpose third accent.
        moss: {
          100: "#DCEDE3",
          300: "#8FC4A6",
          400: "#6BAE86",
          500: "#4F9169",
          600: "#3B7352",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      fontSize: {
        // Fluid sizes (clamp) so headings scale smoothly across breakpoints
        // instead of jumping at fixed points.
        "display-xl": ["clamp(2.75rem, 5.2vw, 4.75rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.1rem, 3.4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 2vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(16,20,33,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,20,33,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,20,33,0.06), 0 8px 24px -12px rgba(16,20,33,0.18)",
        "soft-dark": "0 1px 2px rgba(0,0,0,0.3), 0 12px 32px -16px rgba(0,0,0,0.55)",
      },
      maxWidth: {
        content: "1180px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1%, -3%)" },
          "30%": { transform: "translate(2%, 1%)" },
          "50%": { transform: "translate(-2%, 2%)" },
          "70%": { transform: "translate(1%, -1%)" },
          "90%": { transform: "translate(-1%, 3%)" },
        },
        "flow-x": {
          "0%": { left: "0%", opacity: "0" },
          "12%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        "flow-x-reverse": {
          "0%": { left: "100%", opacity: "0" },
          "12%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { left: "0%", opacity: "0" },
        },
        "flow-y": {
          "0%": { top: "0%", opacity: "0" },
          "12%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "soft-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        grain: "grain-shift 8s steps(6) infinite",
        "flow-x": "flow-x 2.2s ease-in-out infinite",
        "flow-x-reverse": "flow-x-reverse 2.2s ease-in-out infinite",
        "flow-y": "flow-y 2.2s ease-in-out infinite",
        "soft-float": "soft-float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
