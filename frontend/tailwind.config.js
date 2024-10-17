/** @type {import('tailwindcss').Config} */

import { colorValues } from "./src/types/color";

const safeColours = colorValues.flatMap((color) => [
  `bg-${color}-500`,
  `border-${color}-400`,
  `hover:bg-${color}-600`,
]);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [...safeColours],
  theme: {
    extend: {},
  },
  plugins: [],
};
