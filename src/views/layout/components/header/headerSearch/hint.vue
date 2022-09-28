<script>
const EMITS_ITEM_CLICK = "itemClick";
</script>
<script setup>
import { watch, ref } from "vue";
import { getHint } from "@/api/pexels";
import { watchDebounced } from "@vueuse/core";

const props = defineProps({
  /** 搜索文本 */
  searchText: {
    type: String,
    required: true
  }
});

const emits = defineEmits([EMITS_ITEM_CLICK]);

/**
 * 处理搜索提示数据获取
 */
const hintData = ref([]);
const getHintData = async () => {
  if (!props.searchText) return;
  const { result } = await getHint(props.searchText);
  hintData.value = result;
};

watchDebounced(() => props.searchText, getHintData, {
  debounce: 200,
  immediate: true
});

const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item);
};

/**
 * 处理关键词高亮
 */
const hightlightText = (text) => {
  // 生成高亮标签
  const hightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`;
  const reg = new RegExp(props.searchText, "gi");
  // 替换
  return text.replace(reg, hightlightStr);
};
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="hightlightText(item)"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
