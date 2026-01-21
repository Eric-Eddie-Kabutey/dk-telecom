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
          DEFAULT: "#4A3FF7",
          dark: "#0051bb",
        },
        secondary: {
          DEFAULT: "hsl(215, 25%, 27%)",
        },
        dark: {
          DEFAULT: "#101828",
        },
        darkPrimary: {
          DEFAULT: "#1D1962",
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
