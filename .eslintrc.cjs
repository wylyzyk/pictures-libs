module.exports = {
  root: true,

  env: {
    node: true
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "babel-eslint"
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],

  parserOptions: {
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
        modules: true
      },
      requireConfigFile: false,
      parser: "@babel/eslint-parser"
    }
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-before-function-paren": "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "main", "floating", "item"] //需要忽略的组件名
      }
    ]
  }
};
