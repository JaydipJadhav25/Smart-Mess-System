// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
extend: {
  animation: {
    'zoom-in': 'zoomIn 0.8s ease-out both',
  },
  backgroundImage: {
        'vibrant-gradient': 'linear-gradient(to top, #ebb125, #ff8d49, #ff6e78, #f962a7, #c56cce, #b96acc, #ad68c9, #a166c6, #c455a5, #d54b7e, #d64e58, #c85c34)',
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

  fontFamily: {
  sans: ["Inter", "sans-serif"],
},

},

  },
  
  plugins: [],
};

export default config;
