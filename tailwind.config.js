/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        'dark-card': '#141414',
        'dark-border': '#2a2a2a',
      },
    },
  },
  plugins: [],
}
