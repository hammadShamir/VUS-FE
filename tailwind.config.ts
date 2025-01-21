import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  safelist: [
    "absolute",
    "inset-0",
    "lg:absolute",
    "relative",
    "z-10",
    // Add other Tailwind classes you use dynamically
  ],

  theme: {
    extend: {
      colors: {
        primary: "#002655",
        secondary: "#FFFFED",
        background: "#FFFFFF",
        foreground: "#2F4137",
        accentColor: "#F7F8FA",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
