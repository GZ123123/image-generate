/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '26px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    borderRadius: {
      'none': '0',
      'sm': '.25rem',
      DEFAULT: '.375rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    boxShadow: {
      'none': 'none'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
