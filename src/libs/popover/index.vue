<script setup>
import { ref } from "vue";

const isVisible = ref(false);

// 移入
const onMouseenter = () => {
  isVisible.value = true;
};

// 移出
const onMouseleave = () => {
  isVisible.value = false;
};
</script>

<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div>
      <!-- 具名插槽, 触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <Transition name="slide">
      <div
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <!-- 匿名插槽, 弹出层视图中展示的内容 -->
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
