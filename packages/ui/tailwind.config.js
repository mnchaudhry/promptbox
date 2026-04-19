/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../apps/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E0E0E",
        surface: {
          DEFAULT: "#131313",
          lowest: "#0E0E0E",
          highest: "#353534",
        },
        primary: {
          DEFAULT: "#FF4F00",
          container: "#FF4F00",
          on: "#000000",
        },
        secondary: {
          DEFAULT: "#DFFF00",
          container: "#DFFF00",
          on: "#000000",
        },
        outline: "#333333",
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      boxShadow: {
        brutalist: "4px 4px 0px 0px #000000",
        "brutalist-orange": "4px 4px 0px 0px #FF4F00",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
};
