import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bg: 'rgba(30, 30, 39, 1)',
        hrLine: '#313442',
        addCategoriesBtn: '#884DFE',
        categories: '#24252E',
        categoriesBorder: '#323443',
      },
      fontFamily: {
        sataoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
