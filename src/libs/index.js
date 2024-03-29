import { defineAsyncComponent } from "vue";
export { confirm } from "./Confirm/index.js";

export default {
  install(App) {
    // app.component("SvgIcon", svgIcon);
    // app.component("PopUp", popup);

    // 1. 获取当前目录中所有的index.vue
    const components = import.meta.glob("./*/index.vue");
    // 2. 遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = fullPath.replace("./", "").split("/")[0];
      // console.log(componentName);
      // console.log(defineAsyncComponent(fn));

      // 3. 利用 app.component进行注册
      App.component(componentName, defineAsyncComponent(fn));
    }
  }
};
