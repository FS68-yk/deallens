/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EEF7',
          100: '#C5D8EF',
          200: '#91B8E3',
          300: '#5C98D7',
          400: '#2B78CA',
          500: '#0A4D92', // Main primary color (blue)
          600: '#0A4D92', // Darker shade
          700: '#083A72',
          800: '#052751',
          900: '#021530',
        },
        secondary: {
          50: '#EBF5FE',
          100: '#D0E8FC',
          200: '#A1D1FA',
          300: '#73BAF7',
          400: '#44A3F5',
          500: '#1976D2',
          600: '#1668B2',
          700: '#0D4485',
          800: '#073058',
          900: '#031D2E',
        },
        accent: {
          50: '#EEF7FE',
          100: '#D6ECFC',
          200: '#AED9FA',
          300: '#85C5F8',
          400: '#64B5F6', // Main accent blue
          500: '#42A4F5',
          600: '#218FE6',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#071D3F',
        },
        success: {
          50: '#E6F7EF',
          100: '#C4EBD9',
          200: '#89D7B3',
          300: '#4DC28D',
          400: '#2EA86F',
          500: '#208B57',
          600: '#166E45',
          700: '#0E5132',
          800: '#073420',
          900: '#031A0F',
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFECBF',
          200: '#FFD980',
          300: '#FFC540',
          400: '#FFB100',
          500: '#E09600',
          600: '#B87800',
          700: '#8F5A00',
          800: '#663C00',
          900: '#3D2200',
        },
        error: {
          50: '#FCE9E9',
          100: '#F7C8C8',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
  plugins: [],
};