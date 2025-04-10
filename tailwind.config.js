/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nature': {
          100: '#e8f5e9',
          200: '#c8e6c9',
        }
      },
      fontFamily: {
        'game': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [],
}