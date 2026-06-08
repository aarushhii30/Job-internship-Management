/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff', 100: '#dbe7ff', 500: '#4f6bff',
          600: '#3b54f0', 700: '#2f44c4', 900: '#0f1648',
        },
      },
      boxShadow: { soft: '0 10px 30px -12px rgba(31,41,55,0.18)' },
    },
  },
  plugins: [],
};
