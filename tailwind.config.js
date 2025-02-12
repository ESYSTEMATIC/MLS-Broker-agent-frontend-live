/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#171717",
          dark: "#181818",
        },
        boxDB: {
          light: "#171717",
          dark: "#252525",
        },
        "box-container": {
          light: "#fafbfb",
          dark: "#313131",
        },
        title: {
          light: "#0F2225",
          dark: "#fff",
        },
        text: {
          light: "#879192",
          dark: "#9FA7A8",
        },
        primary: "#ca0f26",
        error: "#CE1127",
        inputBg: {
          light: "#E7E9E9",
          dark: "#262626",
        },
        nav: {
          light: "#FAFBFB",
          dark: "#181818",
        },
        border: {
          light: "transparent",
          dark: "#2F2F37",
        },
        "sub-bg": "#272727",
      },
    },
    screens: {
      sm: "640px",
      md: "992px",
      lg: "1400px",
      xl: "1400px",
      "2xl": "1500px",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      Satoshi: ["Satoshi", "sans-serif"],
      Din: ["Din", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};
