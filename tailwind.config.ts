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
        paper: {
          DEFAULT: '#F4EFE6',
          warm: '#EFE8DB',
          deep: '#E7DECB',
        },
        ink: {
          DEFAULT: '#0E0F11',
          soft: '#1C1E22',
          muted: '#2A2D33',
        },
        ember: {
          DEFAULT: '#C97B3A',
          deep: '#A85F23',
          glow: '#E89968',
        },
        sage: {
          DEFAULT: '#5E6B5A',
          deep: '#3F4A3D',
        },
        steel: { DEFAULT: '#27425F', dark: '#1B2F46' },
        ochre: '#C2771B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease-out both',
        'blob': 'blob 18s ease-in-out infinite',
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
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(14,15,17,0.04), 0 8px 24px -8px rgba(14,15,17,0.08)',
        'lift': '0 2px 4px rgba(14,15,17,0.04), 0 24px 60px -20px rgba(14,15,17,0.18)',
        'inset-border': 'inset 0 0 0 1px rgba(14,15,17,0.08)',
      },
    },
  },
  plugins: [typography],
}
export default config
