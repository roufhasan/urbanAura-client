/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b88e2f",
        charcoal: "#3a3a3a",
        cream: "#f9f1e7",
        keppel: "#2ec1ac",
        lightCoral: "#e97171",
        lightGray: "#f4f5f7",
        grayStone: "#b0b0b0",
        steelGray: "#898989",
        cadetGray: "#9f9f9f",
        paleGray: "#D9D9D9",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      backgroundClip: {
        text: "text",
      },
      textFillColor: {
        transparent: "transparent",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-text": {
          "background-image":
            "linear-gradient(to right, #ffffff, #cacaca, #b88e2f)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
