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
        edu: {
          dark: '#050a18',
          card: '#0c142b',
          border: 'rgba(56, 189, 248, 0.2)',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          gold: '#fbbf24',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
