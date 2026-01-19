/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cdec: {
          cyan: "#90F1EF",
          orange: "#FE7F2D",
          yellow: "#FCCA46",
          purple: "#A7A5C6",
          slate: "#5D707F",
        },
      },
    },
  },
  plugins: [],
}