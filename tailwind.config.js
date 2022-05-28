module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cta-dark": "hsl(335, 77%, 37%)",
        "cta-light": "hsl(335, 77%, 95%)",
        "accent-1": " hsl(217, 82%, 30%)",
        "accent-1-light": "hsl(217, 82%, 90%)",
        "light-1": "hsl(217,82%, 96%)",
        "accent-2": "hsl(202, 100%, 8%)",
        "accent-2-light": "hsl(210, 100%, 55%)",
        "dark-transparent": "hsla(0, 0%, 0%, 0.5)",
      },
      fontFamily: {
        satisfy: ["Satisfy", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
