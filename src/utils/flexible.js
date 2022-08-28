import { computed } from "vue";
import { PC_DEVICE_WIDTH } from "@/constants";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
/**
 * 判断当前是否为移动设备
 * 屏幕宽度是否小于一个指定宽度(1280)
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH;
  // return /Android|WebOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //   navigator.userAgent
  // );
});

/**
 * 动态指定rem的基准值, 最大不能超过40px
 * 根据用户屏幕宽度,进行金酸
 */
export const useREM = () => {
  // 最大fontsize
  const MAX_FONT_SIZE = 40;
  // 在html加载完成后处理, 监听domcontentloaded
  document.addEventListener("DOMContentLoaded", () => {
    // 获取html
    const html = document.querySelector("html");
    // 计算fontsize ==>  计算方法: 屏幕宽度 / 10 eg: 375 / 10 = 37.5
    let fontSize = width.value / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 赋值给html
    html.style.fontSize = fontSize + "px";
  });
};
