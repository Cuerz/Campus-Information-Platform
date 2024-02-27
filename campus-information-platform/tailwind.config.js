/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { 'btn-green': '#4fb081', 'btn-hover-green': '#4aa579' },
    },
  },
  plugins: [],
};
