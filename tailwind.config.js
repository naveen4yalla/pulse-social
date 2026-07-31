/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f8',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
      },
      keyframes: {
        'pop-heart': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '15%': { transform: 'scale(1.2)', opacity: '0.95' },
          '30%': { transform: 'scale(0.95)', opacity: '0.95' },
          '45%,80%': { transform: 'scale(1)', opacity: '0.9' },
          '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
        'like-bounce': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'story-progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'typing-dot': {
          '0%,60%,100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      animation: {
        'pop-heart': 'pop-heart 0.9s ease-out forwards',
        'like-bounce': 'like-bounce 0.35s ease-out',
        'fade-in': 'fade-in 0.35s ease-out',
        'story-progress': 'story-progress linear forwards',
      },
    },
  },
  plugins: [],
}
