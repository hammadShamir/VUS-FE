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
        primary: "#002655",
        secondary: "#FFFFED",
        background: "#FFFFFF",
        foreground: "#2F4137",
        accentColor: "#F7F8FA"
      },
    },
  },
  plugins: [],
};
export default config;
