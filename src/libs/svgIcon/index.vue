<script setup>
import { computed } from "vue";

const props = defineProps({
  // 显示的svg
  name: {
    type: String,
    required: true
  },
  // svg的颜色
  color: {
    type: String
  },
  // tailwind 指定svg颜色的类型
  fillClass: {
    type: String
  }
});

// 真是显示的图标
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped></style>
