<script setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
  // 控制开关
  modelValue: { type: Boolean, required: true },
  // 标题
  title: { type: String, default: "" },
  // 取消按钮文本
  cancelText: { type: String, default: "取消" },
  // 确定按钮文本
  confirmText: { type: String, default: "确定" },
  // 取消按钮点击事件
  cancelHandler: { type: Function },
  // 确定按钮点击事件
  confirmHandler: { type: Function },
  // 关闭回调
  close: { type: Function }
});

defineEmits(["update:modelValue"]);

/// 控制显示
const isVisible = useVModel(props);

const onCancelClick = () => {
  props.cancelHandler && props.cancelHandler();
  close();
};
const onConfirmClick = () => {
  props.confirmHandler && props.confirmHandler();
  close();
};

const close = () => {
  isVisible.value = false;
  props.close && props.close();
};
</script>

<template>
  <div>
    <!-- mask -->
    <Transition name="fade">
      <div v-if="isVisible" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close"></div>
    </Transition>
    <!-- content area -->
    <Transition name="up">
      <div
        v-if="isVisible"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800"
      >
        <!-- title -->
        <div v-if="title" class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- content -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- button -->
        <div v-if="cancelHandler || confirmHandler" class="flex justify-end">
          <Button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</Button>
          <Button type="primary" @click="onConfirmClick">{{ confirmText }}</Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
// fade animate
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

// 准备进入, 离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// fade animate
.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

// 准备进入, 离开完成
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
