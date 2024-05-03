import defaultTheme from "tailwindcss/defaultTheme";
 
import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
import { backIn } from "framer-motion";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    "./src/**/*.{js,ts,jsx,tsx}",
    'components/ui/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {boxShadow: {
      input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      colors : {
        'login-background' : '#6A6A6A',
        'textorange' : '#ED741B',
      },
      extend: {
        fontFamily: {
          "saira": ["Saira Condensed", "sans-serif"],
        },
      },
      textShadow: {
        default: '0 5px 5px rgba(0, 0, 0, 0.5)',
      },
    },},
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}