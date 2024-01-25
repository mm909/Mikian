/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#282828", //"#fbf1c7",//fbf1c7
        "bg2": "#32302f",
        "text1": "#0F0F0F", //0F0F0F
      },
    },
  },
  plugins: [],
}