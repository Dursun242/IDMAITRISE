import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          DEFAULT: '#FAF7F0',
          warm: '#F4EEE1',
          deep: '#EAE2CF',
        },
        noir: {
          DEFAULT: '#211D17',
          soft: '#2E2922',
          mute: '#6B6356',
        },
        bronze: {
          DEFAULT: '#A87C50',
          deep: '#8A6238',
          light: '#C5A06F',
          pale: '#E9DFC9',
        },
        forest: {
          DEFAULT: '#44523F',
          deep: '#2F3A2C',
        },
        terra: {
          DEFAULT: '#B5552D',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease-out both',
        'aurora': 'aurora 18s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'spin-slow': 'spin 36s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(36px, -28px) scale(1.08)' },
          '66%': { transform: 'translate(-24px, 20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(33,29,23,0.05), 0 12px 32px -12px rgba(33,29,23,0.10)',
        'lift': '0 2px 4px rgba(33,29,23,0.05), 0 28px 64px -24px rgba(33,29,23,0.22)',
        'bronze': '0 12px 36px -12px rgba(168,124,80,0.45)',
      },
    },
  },
  plugins: [typography],
}
export default config
