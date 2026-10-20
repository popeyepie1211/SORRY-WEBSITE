/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        persian: '#072AC8', dodger: '#1E96FC', icy: '#A2D6F9',
        lemon: '#FCE300', bus: '#FFC600',
      },
      fontFamily: { display: ['Cormorant Garamond', 'serif'], hand: ['Caveat', 'cursive'], body: ['Inter', 'sans-serif'] },
      borderRadius: { glass: '28px' },
      boxShadow: { glass: 'inset 0 1px 0 rgba(162,214,249,.18), 0 20px 60px rgba(7,42,200,.23), 0 0 40px rgba(30,150,252,.08)' },
      transitionTimingFunction: { cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
