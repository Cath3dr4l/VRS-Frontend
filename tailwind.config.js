/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        text: "#e8dedf",
        background: "#181618",
        primary: "#aa132f",
        secondary: "#908c89",
        accent: "#d93667",
      },
    },
  },
  plugins: [],
};
