/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      transitionDuration: {
        '800': '800ms', // Ajoute une durée personnalisée de 1500ms
      },
    },
  },
  plugins: [],
}