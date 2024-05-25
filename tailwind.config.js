import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ExtraLightGray: "#eeeeee",
        lightGray: "#dddddd",
        gray: "#aaaaaa",
        pepperBlack: "#303030",
        pepperblack2: "#343434",
        dullblack: "#333333",
        dullyellow: "#fbbc09",
        lightorange: "#fc6a57",
        dullgrey: "#f6f6f6",
        blue1: "#2ec4b6",
        blue2: "#cbf3f0",
        white1: "#ffffff",
        brown1: "#ffbf69",
        orange1: "#ff9f1c",
      },
      screens: {
        xs: { max: "767px" }, //Mobile
        sm: { min: "768px", max: "1365px" }, //Tablet
        md: { min: "1366px" }, //Desktop
      },
    },
  },
  plugins: [],
};
export default config;
