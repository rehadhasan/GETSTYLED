/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#be123c',
        'secondary': '#ee456b',
        'white': '#ffffff',
        'black': '#000000',
        'green': '#16a34a',
        'blue': '#3b82f6',
        'bg-primary': '#be123c',
        'bg-secondary': '#e11d48',
        'bg-footer':'#4a071d',
        'bg-white': '#ffffff',
        'bg-green': '#16a34a',
        'bg-blue': '#3b82f6',
        'bg-black': '#000000',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
}