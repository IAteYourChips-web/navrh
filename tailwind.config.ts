import type { Config } from 'tailwindcss'

/**
 * Design tokens — single source of truth for the visual system.
 * Dark-first "deep space" palette, one electric-blue accent, violet used
 * only inside gradients / glow. Edit colours, fonts, radii and shadows here.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Surfaces
        bg: '#07080C',
        surface: { DEFAULT: '#0E1019', 2: '#14161F' },
        // Hairline border
        line: 'rgba(255,255,255,0.08)',
        'line-strong': 'rgba(255,255,255,0.14)',
        // Text
        // faint is the tertiary text tier — kept AA-compliant (~5:1) on bg.
        ink: { DEFAULT: '#EDEFF5', muted: '#9AA3B2', faint: '#828B9B' },
        // Accent (electric blue) + secondary (violet — gradients/glow only)
        accent: { DEFAULT: '#5B8CFF', soft: '#7FA4FF', dim: '#3F63BF' },
        violet: { DEFAULT: '#9B7CFF', dim: '#6E5BBF' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Modular scale ~1.25, body 16–18px / ~1.6 leading
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        xs: ['0.78rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.375rem', { lineHeight: '1.45' }],
        '2xl': ['1.75rem', { lineHeight: '1.25' }],
        '3xl': ['2.1875rem', { lineHeight: '1.18' }],
        '4xl': ['2.75rem', { lineHeight: '1.08' }],
        '5xl': ['3.4375rem', { lineHeight: '1.02' }],
        '6xl': ['4.3125rem', { lineHeight: '0.98' }],
        '7xl': ['5.375rem', { lineHeight: '0.94' }],
        '8xl': ['6.75rem', { lineHeight: '0.92' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        eyebrow: '0.18em',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      maxWidth: { content: '1200px', prose: '68ch' },
      boxShadow: {
        // Layered soft glow built from the accent at low opacity
        glow: '0 0 0 1px rgba(91,140,255,0.12), 0 10px 40px -12px rgba(91,140,255,0.22)',
        'glow-sm': '0 0 24px -8px rgba(91,140,255,0.30)',
        'glow-violet': '0 0 40px -12px rgba(155,124,255,0.18)',
        card: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 24px 48px -28px rgba(0,0,0,0.85)',
        'card-hover':
          'inset 0 1px 0 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(91,140,255,0.18), 0 30px 60px -28px rgba(0,0,0,0.9)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: { 250: '250ms', 400: '400ms', 600: '600ms' },
      backgroundImage: {
        'radial-faint':
          'radial-gradient(60% 60% at 50% 0%, rgba(91,140,255,0.08) 0%, rgba(7,8,12,0) 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
