/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quebec-blue': '#1E3A8A', // Quebec blue color
        'quebec-blue-light': '#3B82F6',
        'quebec-blue-dark': '#1E40AF',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
