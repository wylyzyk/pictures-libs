import { createStore } from "vuex";
import getters from "./getters";

import category from "./modules/category";
import theme from "./modules/theme";
import app from "./modules/app";
import search from "./modules/search.js";
import user from "./modules/user";

import createPersistedState from "vuex-persistedstate";

const store = createStore({
  // state: () => ({}),
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      // 指定报存到storage中的key值
      key: "images-photos",
      paths: ["category", "theme", "search", "user"]
    })
  ]
});

export default store;
