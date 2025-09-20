/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#22C55E',
        'primary-orange': '#FFA833',
        'cream': '#FFF8F0',
        'light-cream': '#FFFCF7'
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
