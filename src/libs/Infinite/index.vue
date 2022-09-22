<script setup>
import { useIntersectionObserver, useVModel } from "@vueuse/core";
import { ref, defineEmits, watch } from "vue";

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["onLoad", "update:modelValue"]);

// 处理loading状态
const loading = useVModel(props);

// 滚动的元素
const loadingTarget = ref(null);
// 记录当前底部是否可见
const targetIsIntersecting = ref(false);
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting;
  emitLoad();
});

/**
 * 触发load事件
 */
const emitLoad = () => {
  setTimeout(() => {
    // 当加载更多的视图可见时, 同时loading和数据尚未加载完, 处理加载更多的逻辑
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      // 修改加载数据标记
      loading.value = true;
      // 触发加载更多的行为
      emits("onLoad");
    }
  }, 100);
};

/**
 * 监听loading的变化, 解决数据加载完毕之后, 首屏为铺满的问题
 */
watch(loading, () => {
  emitLoad();
});
</script>

<template>
  <div>
    <!-- content -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- load more -->
      <SvgIcon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      />
      <!-- all data loaded -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
