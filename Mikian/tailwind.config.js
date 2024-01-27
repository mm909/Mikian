/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Courier New"', 'monospace'],
      },
      colors: {
        "primary": "#E0E0E6",
        "secondary": "#407753",
        "text-white": "#0F0F0F",
        "text-black": "#F5F5F5",
      },
    },
  },
  plugins: [],
}