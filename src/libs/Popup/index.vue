<script setup>
import { watch } from "vue";
import { useScrollLock, useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
});

defineEmits(["update:modelValue"]);

// a reactive data
const isVisible = useVModel(props);

// 锁定滚动
const isLocked = useScrollLock(document.body);
watch(
  isVisible,
  (val) => {
    isLocked.value = val;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <teleport to="body">
      <!-- mask -->
      <Transition name="fade">
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </Transition>
      <!-- content -->
      <Transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入, 离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
