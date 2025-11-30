/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0b0f',
        foreground: '#e5e7eb',
        neon: {
          cyan: '#00e5ff',
          purple: '#a855f7',
          blue: '#3b82f6'
        }
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,229,255,0.35), 0 0 40px rgba(168,85,247,0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
