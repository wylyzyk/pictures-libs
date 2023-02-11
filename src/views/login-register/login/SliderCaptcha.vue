<script>
const EMITS_CLOSE = "close";
const EMITS_SUCCESS = "success";
</script>

<script setup>
import { onMounted } from "vue";
import "@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js";
import "@/vendor/SliderCaptcha/slidercaptcha.min.css";
import { getCaptcha } from "@/api/sys";

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS]);

/**
 * 人类行为验证
 * 1. 创建Captcha实例
 */
let captcha = null;
onMounted(() => {
  // eslint-disable-next-line no-undef
  captcha = sliderCaptcha({
    // render
    id: "captcha",
    // 拼图成功后
    async onSuccess(arr) {
      const res = await getCaptcha({ behavior: arr });
      if (res) {
        // TODO: 行为验证通过
        emits(EMITS_SUCCESS);
      }
    },
    // 拼图失败
    onFail() {
      console.log("fail");
    },
    // 默认验证
    verify() {
      return true;
    }
  });
});

const onReset = () => {
  captcha?.reset();
};
const onClose = () => {
  emits(EMITS_CLOSE);
};
</script>

<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl"
  >
    <!-- header -->
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <SvgIcon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      />
      <SvgIcon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      />
    </div>

    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>
