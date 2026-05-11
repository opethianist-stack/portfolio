import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#1a1f30',
          DEFAULT: '#292e41',
          mid: '#3a4156',
          soft: '#4d5468',
        },
        gray: {
          1: '#6b7588',
          2: '#8491a7',
          3: '#b8bfcc',
          4: '#d4d8e1',
          5: '#e9ecf1',
          6: '#f1f3f6',
        },
        bg: {
          DEFAULT: '#fafbfc',
          card: '#ffffff',
        },
        accent: {
          DEFAULT: '#4a6ea3',
          soft: '#8fa6c9',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-2': '-0.02em',
        'tight-3': '-0.025em',
        'tight-4': '-0.035em',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
