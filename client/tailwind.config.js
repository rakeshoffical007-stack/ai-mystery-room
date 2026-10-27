/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#07090e',
          900: '#0c0f17',
          800: '#151a26',
          700: '#1f2738',
          600: '#2f3b52',
          500: '#485878'
        },
        crimson: {
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239'
        },
        amberGold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        cyanGlow: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(245, 158, 11, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(245, 158, 11, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
