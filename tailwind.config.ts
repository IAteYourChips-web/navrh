import type { Config } from 'tailwindcss'

/**
 * Design tokens — single source of truth for the visual system.
 * Editorial dark theme: a characterful serif display (Fraunces) + a refined
 * grotesque body (Hanken Grotesk), one electric accent, generous type scale.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2.5rem', lg: '3.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        bg: '#07080C',
        surface: { DEFAULT: '#0E1019', 2: '#14161F' },
        line: 'rgba(255,255,255,0.08)',
        'line-strong': 'rgba(255,255,255,0.14)',
        ink: { DEFAULT: '#F1F2F7', muted: '#9AA3B2', faint: '#828B9B' },
        accent: { DEFAULT: '#5B8CFF', soft: '#7FA4FF', dim: '#3F63BF' },
        violet: { DEFAULT: '#9B7CFF', dim: '#6E5BBF' },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Generous editorial scale (bigger + more readable).
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.16em' }],
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        sm: ['0.9375rem', { lineHeight: '1.55' }],
        base: ['1.0625rem', { lineHeight: '1.65' }],
        lg: ['1.1875rem', { lineHeight: '1.7' }],
        xl: ['1.4375rem', { lineHeight: '1.5' }],
        '2xl': ['1.8125rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.18' }],
        '4xl': ['2.875rem', { lineHeight: '1.1' }],
        '5xl': ['3.625rem', { lineHeight: '1.04' }],
        '6xl': ['4.5rem', { lineHeight: '1.0' }],
        '7xl': ['5.75rem', { lineHeight: '0.98' }],
        '8xl': ['7.5rem', { lineHeight: '0.94' }],
        '9xl': ['9.5rem', { lineHeight: '0.92' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        eyebrow: '0.2em',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '28px',
        '2xl': '36px',
      },
      maxWidth: { content: '1280px', prose: '64ch' },
      boxShadow: {
        glow: '0 0 0 1px rgba(91,140,255,0.12), 0 18px 60px -18px rgba(91,140,255,0.30)',
        'glow-sm': '0 0 28px -8px rgba(91,140,255,0.32)',
        card: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 30px 60px -32px rgba(0,0,0,0.9)',
        'card-hover':
          'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(91,140,255,0.18), 0 40px 80px -36px rgba(0,0,0,0.92)',
        portrait: '0 40px 120px -32px rgba(91,140,255,0.28), inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      transitionTimingFunction: { premium: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      transitionDuration: { 250: '250ms', 400: '400ms', 600: '600ms' },
      keyframes: {
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: { 'float-soft': 'float-soft 7s ease-in-out infinite' },
    },
  },
  plugins: [],
} satisfies Config
