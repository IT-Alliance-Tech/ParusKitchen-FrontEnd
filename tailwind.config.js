/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9faf7',
          100: '#f2f5ed',
          200: '#e1e9d5',
          300: '#c8d8b3',
          400: '#a8c287',
          500: '#87a96b',
          600: '#6d8c53',
          700: '#5a7344',
          800: '#495d39',
          900: '#3e4e32',
        },
        beige: {
          50: '#fefcf8',
          100: '#fdf9f1',
          200: '#faf2e0',
          300: '#f7e6c4',
          400: '#f2d49b',
          500: '#f5f5dc',
          600: '#d4c4a8',
          700: '#b19d7d',
          800: '#8f7c5a',
          900: '#756448',
        },
        orange: {
          50: '#fff9f5',
          100: '#fef2e8',
          200: '#fde1c5',
          300: '#fbca97',
          400: '#f8ab67',
          500: '#f4a460',
          600: '#e0894a',
          700: '#bc6c3f',
          800: '#96553a',
          900: '#794632',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};