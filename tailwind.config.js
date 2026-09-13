/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          900: '#060d1f',
          accent: '#00f0ff',
          purple: '#6e00ff',
        },
        pastel: {
          lavender: '#E8E5F8',
          lilac: '#E0D5F7',
          dustysky: '#D0E1F9',
          periwinkle: '#C9D6F3',
          softteal: '#C3E5E5',
          sage: '#D5E8D4',
          ivory: '#F7F5F0',
          warmgrey: '#F0EFEA'
        }
      },
      fontFamily: {
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 102, 255, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
