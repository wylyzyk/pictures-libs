import { watch } from "vue";
import store from "@/store";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "@/constants";

/**
 * 监听系统主题变更
 */
let matchMedia = null;
const watchSystemThemeChange = () => {
  // 仅需一次初始化
  if (matchMedia) return;
  matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM);
  };
};

const changeTheme = (theme) => {
  let themeClassName = "";

  switch (theme) {
    case THEME_LIGHT:
      themeClassName = "light";
      break;
    case THEME_DARK:
      themeClassName = "dark";
      break;
    case THEME_SYSTEM:
      watchSystemThemeChange();
      themeClassName = matchMedia.matches ? "dark" : "light";
      break;
    default:
      themeClassName = "";
  }

  // 修改html的class name
  document.querySelector("html").className = themeClassName;
};

/**
 * 根据vuex中保存主题, 修改html的class
 */
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      changeTheme(val);
    },
    { immediate: true }
  );
};
