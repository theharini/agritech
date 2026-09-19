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
        theme: {
          bg: "var(--bg-main)",
          card: "var(--bg-card)",
          surface: "var(--bg-surface)",
          hover: "var(--bg-hover)",
          border: "var(--border-color)",
          text: "var(--text-main)",
          muted: "var(--text-muted)",
          primary: "var(--primary)",
          "primary-hover": "var(--primary-hover)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          badge: "var(--badge-bg)",
          "badge-text": "var(--badge-text)",
          glow: "var(--glow-color)",
        },
      },
      boxShadow: {
        neon: "0 0 15px var(--glow-color)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
