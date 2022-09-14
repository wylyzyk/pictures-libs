import { createStore } from "vuex";
import getters from "./getters";

import category from "./modules/category";

import createPersistedState from "vuex-persistedstate";

const store = createStore({
  // state: () => ({}),
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 指定报存到storage中的key值
      key: "images-photos",
      paths: ["category"]
    })
  ]
});

export default store;
