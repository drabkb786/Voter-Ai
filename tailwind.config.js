/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        muted: '#667085',
        line: '#E4E7EC',
        brand: '#175CD3',
        brandDark: '#0B3B8C',
        mint: '#12B76A',
        canvas: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16, 24, 40, 0.08)',
        card: '0 8px 30px rgba(16, 24, 40, 0.06)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
