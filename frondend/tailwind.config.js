/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: 0, transform: 'rotate(-180deg)' },
          '100%': { opacity: 1, transform: 'rotate(0deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-out",
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        zoomIn: 'zoomIn 0.5s ease-out forwards',
        rotateIn: 'rotateIn 0.7s ease-out forwards',
        bounce: 'bounce 1s ease-in-out infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
        fadeInDown: "fadeInDown 1s ease-out",
        
        gradientText: "gradientText 3s ease infinite",
      },
    },
  },

};
