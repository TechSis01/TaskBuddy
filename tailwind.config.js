/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-1': '#10002b',
        'purple-2': '#240046',
        'purple-3': '#3c096c',
        'purple-4': '#5a197a',
        'purple-5': '#7b2cbf',
        'purple-6': '#9d4edd',
        'purple-7': '#c77dff',
        'purple-8': '#e0aaff',
        'purple-9': '#ffc8fb',
        'twhite': '#fff',
        'white': '#f8f9fa',
        'gray-1': '#dee2e6',
        'gray-2': '#ced4da',
        'gray-3': '#adb5bd',
        'red': '#c1121f',
        'green': '#2a7221',
        'yellow': '#ffc71f',
        'yellow-2': '#fca311',
        'orange': '#e36414',
        'mint': '#2ec4b6',
        'blue': '#023e8a',
        'dark-gray': '#333333',
        'flag': '#2ACCCD',
        "deep-blue": '#183A5F',
        'olive': '#6A1B9A',
        'gold': '#FFD700',
        'orange-light': '#FFC075',
        'mint-dark': '#25817D',
        'dark-yellow': '#FFC700',
        'light-red': '#FFA09E'
      }
    },
  },
  plugins: [],
}

