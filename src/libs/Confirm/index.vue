<script setup>
import { onMounted, ref } from "vue";
import Button from "../Button/index.vue";

const props = defineProps({
  // 标题
  title: { type: String },
  // desc
  content: { type: String, required: true },
  // cancel text
  cancelText: { type: String, default: "取消" },
  // Confirm text
  confirmText: { type: String, default: "确定" },
  // cancel event
  cancelHandler: { type: Function },
  // Confirm event
  confirmHandler: { type: Function },
  // close Confirm modal callback
  close: { type: Function }
});

// 控制显示
const isVisible = ref(false);
const show = () => {
  isVisible.value = true;
};

onMounted(() => {
  show();
});

// 关闭动画的执行时间
const duration = "0.5s";

/**
 * 取消按钮的事件
 */
const onCancelClick = () => {
  props.cancelHandler && props.cancelHandler();
  close();
};

/**
 * 确定按钮的事件
 */
const onConfirmClick = () => {
  props.confirmHandler && props.confirmHandler();
  close();
};

/**
 * 关闭事件
 */
const close = () => {
  isVisible.value = false;
  // 延迟一段事件关闭
  setTimeout(() => {
    props.close && props.close();
  }, parseInt("" + duration.replace("0.", "").replace("s", "") * 100));
};
</script>

<template>
  <div>
    <!--mask-->
    <Transition name="fade">
      <div v-if="isVisible" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close"></div>
    </Transition>
    <!--content-->
    <Transition name="up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!--// title-->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!--text-->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!--button-->
        <div class="flex justify-end">
          <Button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }} </Button>
          <Button type="primary" @click="onConfirmClick">{{ confirmText }} </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
// fade animate
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

// 准备进入, 离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// fade animate
.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

// 准备进入, 离开完成
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
