/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        arb: {
          blue:    '#12AAFF',
          purple:  '#A855F7',
          pink:    '#EC4899',
          navy:    '#060B14',
          dark:    '#080E1A',
          card:    '#0D1525',
          cardHi:  '#111D30',
          border:  '#1E2D45',
          borderHi:'#2A3F5F',
          text:    '#E8F0FE',
          muted:   '#7B91B0',
          dim:     '#4A5C73',
          accent:  '#38BDF8',
          cyan:    '#06B6D4',
          green:   '#10B981',
          red:     '#EF4444',
          yellow:  '#F59E0B',
          neon:    '#00FFC2',
        }
      },
      backgroundImage: {
        'grid-pattern':   "linear-gradient(rgba(18,170,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,170,255,0.04) 1px, transparent 1px)",
        'hero-glow':      'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(168,85,247,0.25) 0%, transparent 60%)',
        'card-gradient':  'linear-gradient(135deg, rgba(18,170,255,0.05) 0%, rgba(168,85,247,0.05) 100%)',
        'btn-primary':    'linear-gradient(135deg, #12AAFF 0%, #A855F7 100%)',
        'btn-primary-hover': 'linear-gradient(135deg, #38BDF8 0%, #C084FC 100%)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      boxShadow: {
        'glow-blue':   '0 0 30px rgba(18,170,255,0.2), 0 0 60px rgba(18,170,255,0.08)',
        'glow-purple': '0 0 30px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.08)',
        'glow-sm':     '0 0 15px rgba(18,170,255,0.15)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(18,170,255,0.08)',
      },
      animation: {
        'float':       'float 5s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2.5s ease-in-out infinite',
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'spin-slow':   'spin 20s linear infinite',
        'shimmer':     'shimmer 2s infinite',
        'gradient':    'gradientShift 4s ease infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float:         { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow:     { '0%,100%': { boxShadow: '0 0 20px rgba(18,170,255,0.2)' }, '50%': { boxShadow: '0 0 50px rgba(18,170,255,0.5)' } },
        fadeUp:        { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:       { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        borderGlow:    { '0%,100%': { borderColor: 'rgba(18,170,255,0.3)' }, '50%': { borderColor: 'rgba(168,85,247,0.5)' } },
      },
    },
  },
  plugins: [],
}
