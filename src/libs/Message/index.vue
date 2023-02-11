<script>
const SUCCESS = "success";
const WARN = "warn";
const ERROR = "error";

const typeEnum = [SUCCESS, WARN, ERROR];
</script>
<script setup>
import { onMounted, ref } from "vue";
import SvgIcon from "../SvgIcon/index.vue";

const props = defineProps({
  // message 类型
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val);
      if (!result) {
        throw new Error(`message type is require ${typeEnum.join(" ")} which one`);
      }
      return result;
    }
  },
  // 描述文本
  content: { type: String, required: true },
  // 展示时长
  duration: { type: Number },
  // 关闭的回调
  destory: { type: Function }
});

/**
 * 样式表数据
 */
const styles = {
  // 警告
  warn: {
    icon: "warn",
    fillClass: "fill-warn-300",
    textClass: "text-warn-300",
    containerClass: "bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100"
  },
  // 成功
  success: {
    icon: "success",
    fillClass: "fill-success-300",
    textClass: "text-success-300",
    containerClass: "bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100"
  },
  // 错误
  error: {
    icon: "error",
    fillClass: "fill-error-300",
    textClass: "text-error-300",
    containerClass: "bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100"
  }
};

// 控制展示
const isVisible = ref(false);

/**
 * 为了保证动画展示, 需要在mounted 之后展示
 */
onMounted(() => {
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
});
</script>

<template>
  <Transition name="down">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[-20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <SvgIcon :name="styles[type].icon" :fill-class="styles[type].fillClass" class="h-1.5 w-1.5 mr-1.5" />
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
