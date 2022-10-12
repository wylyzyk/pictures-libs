import ConfirmComponent from "./index.vue";
/**
 *
 * @param title 标题
 * @param content 内容
 * @param cancelText
 * @param confirmText
 */
import { h, render } from "vue";

export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = "";
    }

    const close = () => {
      // 3. 把渲染的vnode去掉
      render(null, document.body);
    };

    const cancelHandler = () => {
      reject(new Error("cancel click"));
    };

    const confirmHandler = () => {
      resolve();
    };

    // 1. 生成 vnode
    const vnode = h(ConfirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    });
    // 2. render 函数渲染
    render(vnode, document.body);
  });
};
