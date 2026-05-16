/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        paper: "#f7f4ee",
        ivory: "#fbf8f3",
        sand: "#d8c4a1",
        fog: "#dfe6e5",
        blue: "#738998",
        gold: "#b3925f",
        sage: "#9ea58d",
        ink: "#243036",
      },
      boxShadow: {
        editorial: "0 24px 60px rgba(78, 67, 50, 0.08)",
      },
    },
  },
  plugins: [],
};
