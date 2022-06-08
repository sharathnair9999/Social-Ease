module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeModal: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeModal: "fadeModal 0.2s ease-in-out",
      },
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
    skeletonScreen: {
      DEFAULT: {
        baseColor: "#c7c7c7",
        movingColor:
          "linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%)",
        duration: "1s",
        timing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@gradin/tailwindcss-skeleton-screen")],
  darkMode: "class",
};
