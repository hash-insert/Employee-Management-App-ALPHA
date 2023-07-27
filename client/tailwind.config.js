/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: ["hover"],
      margin: {
        "15%": "15%",
      },
      colors: {
        "text-color": "var(--text)",
        "background-color": "var(--background)",
        "primary-button": "var(--primary-button)",
        "secondary-button": "var(--secondary-button)",
        "accent-color": "var(--accent)",
      },
      boxShadow: {
        "primary-button": "0 20px 80px -10px var(--primary-button)",
      },
      width: {
        "100%": "100%",
      },
      screens: {
        mobile: {
          max: "400px",
        },
        tablet: {
          max: "768px",
        },
      },
    },
    plugins: [],
  },
};
