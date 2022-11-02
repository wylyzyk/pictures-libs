/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // 让tailwindcss 应用于当前目录下的index.html, 以及src下的任意目录的.vue以及.js文件
  content: ["./index.html", "./src/**/*.{vue, js}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.25rem", "0.35rem"],
        sm: ["0.35rem", "0.45rem"],
        base: ["0.42rem", "0.52rem"],
        lg: ["0.52rem", "0.65rem"],
        xl: ["0.65rem", "0.75rem"]
      },
      boxShadow: {
        "l-white": "-10px 0 10px white",
        "l-zinc": "-10px 0 10px #18181b"
      },
      height: {
        header: "72px",
        main: "calc(100vh - 72px)"
      },
      colors: {
        main: "#f44c58",
        "hover-main": "#f32836",
        "success-100": "#f2f9ec",
        "success-200": "#e4f2db",
        "success-300": "#7ec050",
        "warn-100": "#fcf6ed",
        "warn-200": "#f8ecda",
        "warn-300": "#dca550",
        "error-100": "#ed7456",
        "error-200": "#f3471c",
        "error-300": "#ffffff"
      },
      variants: {
        scrollbar: ["dark"]
      },
      backdropBlur: {
        "4xl": "240px"
      }
    }
  },
  plugins: [require("tailwind-scrollbar")]
};
