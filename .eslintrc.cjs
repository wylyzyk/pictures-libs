module.exports = {
  extends: ["alloy", "alloy/vue"],
  parserOptions: {
    // parser: {
    //   js: "@babel/eslint-parser",
    //   jsx: "@babel/eslint-parser"

    //   // Leave the template parser unspecified, so that it could be determined by `<script lang="...">`
    // },
    parser: "@babel/eslint-parser",
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"]
      }
    }
  },
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    "vue/no-duplicate-attributes": "off",
    "vue/v-on-event-hyphenation": "off"
  }
};
