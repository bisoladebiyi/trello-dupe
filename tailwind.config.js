/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0052CC"
      },
      boxShadow: {
        "custom": "rgba(0, 0, 0, 0.1) 0px 0px 10px"
      }
    },
  },
  plugins: [],
}

