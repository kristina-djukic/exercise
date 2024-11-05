/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        syyclopsBlue: '#090f2d',
        syyclopsOrange: 'rgb(220 90 39)',
        syyclopsButton: '#EA6020',
        syyclopsHoverButton: '#e16a3a',
        tableColor: "#f2f4f8",
        
      },
      fontFamily:{
        wixDisplay: ['"Wix Madefor Display"', 'sans-serif'],
        wixText: ['"Wix Madefor Text"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

