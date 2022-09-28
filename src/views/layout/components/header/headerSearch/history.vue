<script>
const EMITS_ITEM_CLICK = "itemClick";
</script>

<script setup>
import { useStore } from "vuex";
import { confirm } from "@/libs";

const emits = defineEmits([EMITS_ITEM_CLICK]);

const store = useStore();
/**
 * 删除全部
 */
const onDeleteAllClick = () => {
  confirm("title", "remove all", "no", "ok")
    .then(() => {
      console.log("click ok");
    })
    .catch(() => {
      console.log("click no");
    });
  // store.commit("search/deleteAllHistory");
};

/**
 * 单个删除
 */
const onDeleteClick = (index) => {
  store.commit("search/deleteHistory");
};

/**
 * 触发搜索
 */
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item);
};
</script>

<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最新搜索</span>
      <SvgIcon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      />
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="index"
        @click="onItemClick(item)"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold hover:bg-zinc-200 rounded-sm duration-300"
      >
        <span>{{ item }}</span>
        <SvgIcon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        />
      </div>
    </div>
  </div>
</template>
