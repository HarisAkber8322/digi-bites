/** @type {import('tailwindcss').Config} */
const config = {
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
        transparent: "#00000000",
        // gray
        bgGrey: "#f1f1f1",
        ExtraLightGray: "#eeeeee",
        lightGray: "#dddddd",
        gray: "#aaaaaa",
        // black
        pepperBlack: "#303030",
        dullblack: "#333333",
        lightBlack: "#111111",
        themeYellow: "#fbbc09",
        themeOrange: "#fc6a57",
      },
      boxShadow: {
        yellow: "0 20px 5px #fbbc09", // Adjust the color and opacity as needed
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
