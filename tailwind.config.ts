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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "flip-top-blur": "flipTopBlur 1.5s ease-in-out infinite",
      },
      keyframes: {
        flipTopBlur: {
          "0%": {
            transform: "rotateX(0deg)",
            filter: "blur(0)",
          },
          "50%": {
            transform: "rotateX(90deg)",
            filter: "blur(5px)",
          },
          "100%": {
            transform: "rotateX(180deg)",
            filter: "blur(0)",
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
