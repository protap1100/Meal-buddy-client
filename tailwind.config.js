/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#012a4a",
        footer: "#0d3b66",
        primary: "#8ecae6",
        secondary: "#e4c1f9",
        success: "#ccff33",
        warning: "#d90429",
        button: "#3a86ff",
        hover: "#0582ca",
        info: "#17a2b8",
        light: "#f8f9fa",
        dark: "#000000",
        purple: "#6f42c1",
        pink: "#e83e8c",
      },
    },
  },
  plugins: [require("daisyui")],
};
