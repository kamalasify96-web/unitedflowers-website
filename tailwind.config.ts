import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grove: "#4E7738",
        deep: "#1E3318",
        lime: "#B7CF3E",
        sprout: "#DCE8A6",
        gold: "#F4B334",
        amber: "#E08A1E",
        earth: "#89603E",
        cream: "#FBF7EC",
        husk: "#EFE8D6",
        ink: "#1B2416",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        "display-ar": ["var(--font-alexandria)", "sans-serif"],
        "body-ar": ["var(--font-plex-arabic)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
