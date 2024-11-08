/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',
        secondary: '#212121',
        accent: '#F5F5F5',
        highlight: '#FF5722',
        background: '#FFFFFF',
        text: '#333333',
      },
    },
  },
  plugins: [],
}