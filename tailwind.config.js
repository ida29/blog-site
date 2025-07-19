/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Atom One Dark theme colors
        atom: {
          bg: '#282c34',
          bgLight: '#2c313c',
          bgDark: '#21252b',
          fg: '#abb2bf',
          comment: '#5c6370',
          cyan: '#56b6c2',
          blue: '#61afef',
          purple: '#c678dd',
          green: '#98c379',
          red: '#e06c75',
          redDark: '#be5046',
          orange: '#d19a66',
          orangeDark: '#e5c07b',
          yellow: '#e5c07b',
          gray: '#828997',
          white: '#abb2bf',
          gutter: '#4b5263',
          selection: '#3e4451',
        },
        // Custom colors for better dark mode support
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0b0d',
        }
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}