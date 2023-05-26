/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'purple-1':'#10002b',
        'purple-2':'#240046',
        'purple-3':'#3c096c',
        'purple-4':'#5a189a',
        'purple-5':'#7b2cbf',
        'purple-6':'#9d4edd',
        'purple-7':'#c77dff',
        'purple-8':'#e0aaff',
        'white':'#f8f9fa',
        'gray-1':'#dee2e6',
        'gray-2':'#ced4da',
        'red':'#c1121f',
        'green':'#2a7221',
        'yellow':'#ffc71f'
      }
    },
  },
  plugins: [],
}

