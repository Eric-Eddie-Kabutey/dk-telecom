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
      fontSize: {
        'display': ['clamp(3.5rem, 4.42vw + 2.46rem, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['clamp(2.5rem, 2.65vw + 1.875rem, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['clamp(2rem, 1.76vw + 1.58rem, 3rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['clamp(1.5rem, 1.32vw + 1.19rem, 2.25rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['clamp(1.25rem, 0.88vw + 1.04rem, 1.75rem)', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'h5': ['clamp(1.125rem, 0.44vw + 1.02rem, 1.375rem)', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'h6': ['clamp(1rem, 0.22vw + 0.95rem, 1.125rem)', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '700' }],
        'button': ['0.875rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],
      },
      spacing: {
        'section': 'clamp(4rem, 8vw + 2rem, 10rem)',
        'fluid-gap': 'clamp(1rem, 1.5vw + 0.5rem, 2rem)',
        'stack-lg': 'clamp(2rem, 3vw + 1rem, 4rem)',
        'stack-md': 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',
        'stack-sm': 'clamp(1rem, 1vw + 0.25rem, 1.5rem)',
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/resources/hero-bg.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
export default config;
