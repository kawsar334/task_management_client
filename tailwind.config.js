/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // blue: '#9538E2',     
        bl: '#febd18',  
        bgcolor:'#161b1d',
        mn:"#161c2d",
        tc:"#d35400",
        teal:"#5bd9b3"
           
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
