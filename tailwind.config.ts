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
        void: {
          DEFAULT: '#04060B',
          deep: '#020409',
        },
        carbon: {
          DEFAULT: '#0A101A',
          soft: '#0E1622',
          edge: '#16202F',
        },
        holo: {
          DEFAULT: '#38E1FF',
          soft: '#7EF0FF',
          deep: '#0FB4D4',
          dim: '#1A7E96',
        },
        pulse: {
          DEFAULT: '#6F7CFF',
          deep: '#4853D8',
        },
        signal: {
          DEFAULT: '#FF8A3D',
          deep: '#E0641A',
        },
        ghost: {
          DEFAULT: '#E9F4FF',
          dim: '#9FB4C8',
          mute: '#5F7287',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 36s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease-out both',
        'aurora': 'aurora 16s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'flicker': 'flicker 5s linear infinite',
        'grid-pan': 'grid-pan 24s linear infinite',
        'spin-slow': 'spin 28s linear infinite',
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
          '33%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 24px) scale(0.94)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '88%': { opacity: '1' },
          '89%': { opacity: '0.4' },
          '90%': { opacity: '1' },
          '95%': { opacity: '0.65' },
          '96%': { opacity: '1' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-64px -64px' },
        },
      },
      boxShadow: {
        'glow': '0 0 28px -8px rgba(56,225,255,0.55)',
        'glow-lg': '0 0 64px -12px rgba(56,225,255,0.55)',
        'glow-signal': '0 0 28px -8px rgba(255,138,61,0.5)',
        'panel': '0 32px 80px -32px rgba(0,0,0,0.85)',
      },
    },
  },
  plugins: [typography],
}
export default config
