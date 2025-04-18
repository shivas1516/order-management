/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX files in src/
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)', // Reference index.css variables
        'primary-hover': 'var(--primary-hover)',
        background: 'var(--background-color)',
        card: 'var(--card-background)',
        text: 'var(--text-color)',
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
    },
  },
  plugins: [],
};