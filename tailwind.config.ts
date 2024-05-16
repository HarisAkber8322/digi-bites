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
        pepperBlack: "#111111",
        dullBlakc: "#333333",
        lightorange: "#fc6a57",
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
