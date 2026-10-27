/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e4e4e4',
          800: '#1a1a1a',
          900: '#0f0f0f',
          gold: '#c5a880',
          'gold-light': '#e5cfb3',
          'gold-dark': '#a3845c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}