/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Бренд
        primary: {
          DEFAULT: '#0D3A22',   // главный акцент
          50:  '#EAF3EF',
          100: '#D6E7DF',
          200: '#AECFBE',
          300: '#86B79E',
          400: '#5F9E7D',
          500: '#3C7F60',
          600: '#2C634A',
          700: '#1F4A37',
          800: '#16362A',
          900: '#0F281F',
        },
        // Доп. подсветка при hover/фокусе (чуть светлее)
        primarySoft: '#145B36',
      },
    },
  },
  plugins: [],
}

