// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
extend: {
  animation: {
    'zoom-in': 'zoomIn 0.8s ease-out both',
  },
  keyframes: {
    zoomIn: {
      '0%': {
        opacity: 0,
        transform: 'scale(0.8)',
      },
      '100%': {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  },
},

  },
  plugins: [],
};

export default config;
