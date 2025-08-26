/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "Quicksand", "ui-sans-serif", "system-ui"]
      },
      colors: {
        salsaRed: "#e11d48",
        salsaOrange: "#fb923c",
        salsaYellow: "#fde047",
        salsaPurple: "#a78bfa"
      }
    },
  },
  plugins: [],
}
