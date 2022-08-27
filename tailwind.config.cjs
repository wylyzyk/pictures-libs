/** @type {import('tailwindcss').Config} */
module.exports = {
  // 让tailwindcss 应用于当前目录下的index.html, 以及src下的任意目录的.vue以及.js文件
  content: ["./index.html", "./src/**/*.{vue, js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
