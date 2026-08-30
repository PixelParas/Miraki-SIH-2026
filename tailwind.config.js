/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* Custom colours matching the iGOT Karmayogi brand */
      colors: {
        igot: {
          blue: "#1b439c",
          "blue-dark": "#123075",
          orange: "#F59E0B",
          "orange-dark": "#D97706",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}
