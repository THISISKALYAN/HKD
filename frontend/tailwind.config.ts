import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"TC EN"', 'sans-serif'],
        nav: ['"TC EN"', 'sans-serif'],
        body: ['"TC EN"', 'sans-serif'],
        card: ['"TC EN"', 'sans-serif'],
        sans: ['"TC EN"', 'sans-serif'],
        serif: ['"TC EN"', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#0B5DB7',
          darkBlue: '#072149',
          gold: '#d4af37',
          yellow: '#f5c518'
        },
        saffron: {
          light: '#FFB84D',
          DEFAULT: '#FF9933',
          dark: '#E65100',
        },
        charcoal: {
          50: '#F9F9FB',
          100: '#EAEAEB',
          700: '#3D3D3E',
          800: '#1E1E1F',
          900: '#121213',
        },
        cream: {
          50: '#FFFEFA',
          DEFAULT: '#FFFBF2',
          dark: '#F5EEDB',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

