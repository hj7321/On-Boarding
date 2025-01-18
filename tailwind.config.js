/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: {
          basic: "#f472b6",
          hover: "#ec4899",
        },
      },
    },
  },
  plugins: [],
};
