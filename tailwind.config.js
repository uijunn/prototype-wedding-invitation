/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'landing-img': "url('assets/img/landing-img.jpg')",
        'male-img': "url('assets/img/aqua-hoshino.png')",
        'female-img': "url('assets/img/akane-kurokawa.jpeg')"
      },
      fontFamily: {
        notoSansJP: ['Noto Sans JP'],
        notoSerifDisp: ['Noto Serif Display'],
        lato: ['Lato'],
        greatVibes: ['Great Vibes'],
        sacramento: ['Sacramento'],
        arima: ['Arima']
      },
      colors: {
        greenPrimary: '#485F4F',
        whiteAccent: '#FAFAFA',
        goldAccent: '#EEDF7A',
        pinkAccent: '#ECBDC4'
      },
      animation: {
        slideIn: 'slideInTop 1s ease-in-out',
        slideLeft: 'slideToLR 2s ease-in-out infinite both',
        slideRight: 'slideToRL 2s ease-in-out infinite both',
        'rotating': 'rotating 4s linear infinite'
      },
      keyframes: {
        slideInTop: {
          '0%': { transform: 'translateY(100vh)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        slideToLR: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-25px)' },
          '100%': { transform: 'translateX(0px)' }
        },
        slideToRL: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(25px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        rotating: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}

