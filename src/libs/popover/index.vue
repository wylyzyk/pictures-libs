<script>
const DELAY_TIME = 100;
// 左上
const PORP_TOP_LEFT = "top-left";
// 右上
const PROP_TOP_RIGHT = "top-right";
// 左下
const PROP_BOTTOM_LEFT = "bottom-left";
// 右下
const PROP_BOTTOM_RIGHT = "bottom-right";

const placementEnum = [
  PORP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
];
</script>
<script setup>
import { nextTick, watch, ref } from "vue";

const props = defineProps({
  // 控制气泡弹出位置, 需要验证props
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val);
      if (!result) {
        throw new Error(`placement must which one ${placementEnum.join(", ")}`);
      }
      return result;
    }
  }
});

const isVisible = ref(false);

// 移入
const onMouseenter = () => {
  isVisible.value = true;
  if (timeout) {
    clearTimeout(timeout);
  }
};

// 移出
let timeout = null;
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false;
    timeout = null;
  }, DELAY_TIME);
};

/**
 * 计算元素尺寸
 */
const referenceTarget = ref(null);
const contentTarget = ref(null);
const useElementSize = (target) => {
  if (!target) return {};
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
};

/**
 * 气泡样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
});

// 气泡展示的时候进行计算
watch(isVisible, (val) => {
  if (!val) return;
  // 等待元素渲染
  // vue在数据改变之后, 需要等待一段事件 DOM才会变化
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PORP_TOP_LEFT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + "px";
        break;
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          useElementSize(contentTarget.value).width + "px";
        break;
    }
  });
});
</script>

<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽, 触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <Transition name="slide">
      <div
        v-show="isVisible"
        ref="contentTarget"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contentStyle"
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
