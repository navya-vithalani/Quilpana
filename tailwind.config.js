/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Main website theme
        main: {
    50: '#6C5DD3' ,

100: '#9A8FE0' ,

200: '#5AA9B3' ,

300: '#88C0A1' ,
    text: '#333333', // optional
    bg: '#FFFFFF',   // optional
  },
  player: {
    50: '#FF7B54',
    100: '#FFB26B',
    200: '#FFD56B',
    300: '#939B62',
    text: '#333333',
    bg: '#FFF5F0',
  },
  creator: {
    50: '#0E185F',
    100: '#2FA4FF',
    200: '#00FFDD',
    300: '#E8FFC2',
    text: '#FFFFFF',
    bg: '#0A0A2A',
  },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        heading: ['Playfair Display', ...fontFamily.serif],
      },
      
      backgroundImage: {
    'main-hero': 'linear-gradient(135deg, #D47AE8 0%, #71c6d9 50%, #F4BEEE 100%)',
    'player-hero': 'linear-gradient(135deg, #FF7B54 0%, #FFB26B 50%, #FFD56B 100%)',
    'creator-hero': 'linear-gradient(135deg, #0E185F 0%, #2FA4FF 50%, #00FFDD 100%)',
    'nebula': 'linear-gradient(270deg, #D47AE8, #F4BEEE, #71c6d9, #b6fcd8)',
  },
  backgroundSize: {
    'nebula-size': '800% 800%',
  },
  keyframes: {
    'nebula-wave': {
      '0%': { 'background-position': '0% 50%' },
      '50%': { 'background-position': '100% 50%' },
      '100%': { 'background-position': '0% 50%' },
    },
  },
  animation: {
    'nebula-wave': 'nebula-wave 20s ease infinite',
  float: 'float 6s ease-in-out infinite',
        pulseSlow: 'pulse 3s infinite ease-in-out',
        spinSlow: 'spin 20s linear infinite',
      },

      // tailwind.config.js
keyframes: {
  'spark-wave': {
    '0%': { 'background-position': '0% 50%' },
    '50%': { 'background-position': '100% 0%' },
    '100%': { 'background-position': '0% 50%' },
  },
},
animation: {
  'spark-wave': 'spark-wave 5s ease-in-out infinite',
},

      boxShadow: {
        'main-card': '0 10px 25px rgba(212, 122, 232, 0.3)',
        'player-card': '0 10px 25px rgba(255, 123, 84, 0.3)',
        'creator-card': '0 10px 25px rgba(47, 164, 255, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
      },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  plugins: [
    function ({ addComponents, theme }) {
      const buttons = {
        '.btn-main': {
          background: theme('colors.main.100'),
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.xl'),
          fontWeight: '600',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('colors.main.50'),
            transform: 'scale(1.05)',
          },
        },
        '.btn-player': {
          background: theme('colors.player.200'),
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.xl'),
          fontWeight: '600',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('colors.player.50'),
            transform: 'scale(1.05)',
          },
        },
        '.btn-creator': {
          background: theme('colors.creator.200'),
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.xl'),
          fontWeight: '600',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('colors.creator.50'),
            transform: 'scale(1.05)',
          },
        },
      };

      addComponents(buttons);
    },
  ],
  safelist: [
  'bg-green-800', 'hover:text-green-400',
  'bg-blue-500', 'hover:text-blue-400',
  'border-4', 'border-green-500', 'border-orange-500', 
],
};


