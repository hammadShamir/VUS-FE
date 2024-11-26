import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002655',
        secondary: '#FFFFED',
        background: '#FFFFFF',
        foreground: '#2F4137',
        accentColor: '#F7F8FA',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
