/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
];

export const theme = {
  extend: {
    colors: {
      primary: '#B9AB99',
      secondary: '#612A22',
      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',
      background: '#F0E8E0',
      surface: '#FFFFFF',
      onSurface: '#000000',
      accent: '#D9CEC5',
      muted: '#E0D6CC',
      textPrimary: '#333333',
      textSecondary: '#666666',
    },
  },
};

export const plugins = [
  require('flowbite/plugin'),
  require('daisyui'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/line-clamp'),
];
