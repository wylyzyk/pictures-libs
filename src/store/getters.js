/**
 * 快捷访问
 */
export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  /**
   * category选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category选中项的下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    );
  },
  /**
   * 搜索历史
   */
  historys: (state) => state.search.historys,
  /**
   * 搜索文本
   */
  searchText: (state) => state.app.searchText
};
