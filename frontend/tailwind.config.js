/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C2EBC',
        secondary: '#5C218B',
        accent: '#8B5DBC',
      },
    },
  },
  plugins: [],
}
