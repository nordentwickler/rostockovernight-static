module.exports = {
  mode: 'jit',
  content: [
    './public/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue,scss}'
  ],
  theme: {
    fontFamily: {
      'sans': ['Syne', 'sans-serif']
    },
    fontSize: {
      'base': ['16px', '22px'],
      'lg' : ['24px', '32px'],
      'xl': ['36px', '42px'],
      '2xl': ['82px', '68px'],
    },
    container: {
      center: true
    },
    extend: {
      borderRadius: {
        'lg': '1.975rem',
      },
      colors: {
        'light-gray': {
          100: '#F5F5F5',
          200: '#E9E9E9'
        },
        'blue': {
          100: '#CDDCE8',
          400: '#346D8B'
        },
        'red': {
          100: '#F4DCDC',
          400: '#CE6464'
        },
        'yellow': {
          100: '#F0E8DD',
          400: '#EFC88A'
        },
        'teal': {
          100: '#DFEDEC',
          400: '#4A8281'
        }
      },
      aspectRatio: {
        '3/2': '3 / 2',
      },
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
