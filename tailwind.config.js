/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent" : "#1A293B",
        "action" : "#0057FA",
        "action-light" : "#E9EEFF" 
      }
    },
    fontFamily: 
    {
      "helvetica" : "Helvetica",
      "garamond" : "Garamond",
    },
  },
  plugins: [],
}

