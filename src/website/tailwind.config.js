/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFF2E1',
        'darken': '#2F327D',
        'yellow-500': '#F48C06',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'floating': 'floating 3s ease-in-out infinite',
        'floating-4': 'floating-4 4s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translate(0, 0px)' },
          '50%': { transform: 'translate(0, 8px)' },
          '100%': { transform: 'translate(0, -0px)' },
        },
        'floating-4': {
          '0%': { transform: 'translate(0, 0px)' },
          '50%': { transform: 'translate(0, 8px)' },
          '100%': { transform: 'translate(0, -0px)' },
        },
      },
    },
  },
  plugins: [],
}