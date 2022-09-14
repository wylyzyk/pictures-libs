import { ALL_CATEGORY_ITEM, CATEGORY_NORMAL_DATA } from "../../constants";
import { getCategory } from "@/api/category";

/**
 * 处理navigation bar 中的数据
 */
export default {
  // 标记独立作用域
  namespaced: true,
  state: () => ({
    categorys: CATEGORY_NORMAL_DATA
  }),
  mutations: {
    /**
     * 为categorys 赋值
     */
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys];
    }
  },
  actions: {
    /**
     * 获取category数据, 并自动保存到vuex中
     */
    async useCategoryData({ commit }) {
      const { categorys } = await getCategory();
      commit("setCategorys", categorys);
    }
  }
};
