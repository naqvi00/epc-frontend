/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat'],
        body: ['Playfair+Display'],
      },
      colors: {
        brand: {
          navy: '#0A1235',
          navy2: '#0D1845',
          blue: '#1E5AA8',
          teal: '#2D8E9E',
          ink: '#0B0F1D',
          paper: '#FFFFFF',
          mist: '#F5F7FB',
          line: '#E6EAF2',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(10, 18, 53, 0.08)',
        header: '0 8px 30px rgba(10, 18, 53, 0.06)',
      },
    },
  },
  plugins: [],
};
