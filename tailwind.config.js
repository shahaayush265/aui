/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          raised: 'var(--bg-raised)',
          sunken: 'var(--bg-sunken)'
        },
        ink: {
          DEFAULT: 'var(--ink)',
          strong: 'var(--ink-strong)'
        },
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)'
        },
        'invert-bg': 'var(--invert-bg)',
        'invert-fg': 'var(--invert-fg)',
        danger: 'var(--danger)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Archivo', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'ui-monospace', 'monospace'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        hud: '0.15em'
      },
      animation: {
        marquee: 'marquee-scroll 32s linear infinite'
      },
      keyframes: {
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    }
  },
  plugins: [
    // Custom plugin to add AUI utilities
    function ({ addUtilities, addComponents }) {
      addUtilities({
        '.hud-label': {
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontSize: '0.6875rem',
          fontWeight: '500',
          lineHeight: '1.2'
        },
        '.font-stretch-118': {
          fontStretch: '118%'
        }
      });
      addComponents({
        '.hairline-grid': {
          display: 'grid',
          gap: '1px',
          backgroundColor: 'var(--line)',
          border: '1px solid var(--line)',
          '& > *': {
            backgroundColor: 'var(--bg)'
          }
        }
      });
    }
  ]
};
