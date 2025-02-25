/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  extend: {
    colors: {
      primary: '#B9AB99', // Used for buttons and other primary elements
      secondary: '#612A22', // Used for the header background
      onPrimary: '#FFFFFF', // Text color on primary background
      onSecondary: '#FFFFFF', // Text color on secondary background
      background: '#F0E8E0', // Background color for sections
      surface: '#FFFFFF', // Surface color for cards and other elements
      onSurface: '#000000', // Text color on surface background
      accent: '#D9CEC5', // Accent color for highlights
      muted: '#E0D6CC', // Muted color for less prominent elements
      textPrimary: '#333333', // Primary text color
      textSecondary: '#666666', // Secondary text color
    },
  },
};
export const plugins = [require('flowbite/plugin'), require('daisyui')];