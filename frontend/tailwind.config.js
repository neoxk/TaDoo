/** @type {import('tailwindcss').Config} */

import { colorValues } from "./src/types/types";

const safeColours = colorValues.flatMap((color) => [
  `bg-${color}-500`,
  `border-${color}-400`,
  `bg-${color}-300`,
  `bg-${color}-700`,
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
