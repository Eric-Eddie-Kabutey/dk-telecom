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
        primary: {
          DEFAULT: "#0070f3",
          dark: "#0051bb",
        },
        secondary: {
          DEFAULT: "hsl(215, 25%, 27%)",
        },
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/resources/hero-bg.png')",
      },
    },
  },
  plugins: [],
};
export default config;
