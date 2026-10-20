/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#05060F', indigo: '#0F1235', dusk: '#2A1B4D', plum: '#5B2A6E',
        rose: '#E8798A', roseGold: '#F2B8A2', sunrise: '#FFB88C', gold: '#FFD9A0',
        cream: '#FFF6EA', ink: '#3A2A2A', muted: '#B9A9C9',
      },
      fontFamily: { display: ['Cormorant Garamond', 'serif'], hand: ['Caveat', 'cursive'], body: ['Inter', 'sans-serif'] },
      borderRadius: { glass: '28px' },
      boxShadow: { glass: 'inset 0 1px 0 rgba(255,255,255,.18), 0 20px 60px rgba(13,6,33,.23), 0 0 40px rgba(232,121,138,.08)' },
      transitionTimingFunction: { cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
