<script setup>
import { useScroll } from "@vueuse/core";
import { onBeforeUpdate, ref, watch } from "vue";
import Menu from "../../menu/index.vue";

// vite中不需要导入
// defineProps({
//   data: {
//     type: Array,
//     required: true
//   }
// });

// 滑块样式
const sliderStyle = ref({
  transform: "translateX(0px)",
  width: "60px"
});

// 选中的下标
const currentCategoryIndex = ref(0);
// 获取所有item
let itemRefs = [];
const setItemRef = (el) => {
  if (!el) return;
  itemRefs.push(el);
};

// 数据改变之后, dom变化之前
onBeforeUpdate(() => {
  // 更新之后, 清空数组
  itemRefs = [];
});

// 获取ul
const ulTarget = ref(null);
const { x: ulScrollLeft } = useScroll(ulTarget);

watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect();
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`
  };
});

// 点击后获取当前下标
const onItemClick = (index) => {
  currentCategoryIndex.value = index;
  isVisible.value = false;
};

const isVisible = ref(false);
const onShowPopup = () => {
  isVisible.value = true;
};
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- slide button -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>
      <!-- hamburger button -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-whit dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        :ref="setItemRef"
        @click="onItemClick(index)"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
      >
        {{ item.name }}
      </li>
    </ul>
    <Popup v-model="isVisible">
      <Menu @onItemClick="onItemClick" />
    </Popup>
  </div>
</template>
