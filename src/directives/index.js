/**
 * 指令的自动注册(vite)
 */

import lazy from "./modules/lazy";

/**
 * 全局注册指令
 */
export default {
  install(app) {
    // 使用globEager同步导入
    const directives = import.meta.globEager("./modules/*.js");
    for (const [key, value] of Object.entries(directives)) {
      // 获取指令名称
      const arr = key.split("/");
      const name = arr[arr.length - 1].replace(".js", "");
      // 注册指令
      app.directive(name, value.default);
    }
  }
};
