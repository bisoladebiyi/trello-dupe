/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0D66E4",
        "dark": "#182B4D"
      },
      boxShadow: {
        "custom": "rgba(0, 0, 0, 0.1) 0px 0px 10px"
      }
    },
  },
  plugins: [],
}

