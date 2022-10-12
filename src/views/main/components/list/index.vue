<script setup>
import { ref, watch } from "vue";
import { getPexlesList } from "@/api/pexels";
import Item from "./item.vue";
import WaterFall from "@/libs/WaterFall/index.vue";
import { isMobileTerminal } from "@/utils/flexible.js";
import Infinite from "@/libs/Infinite/index.vue";
import { useStore } from "vuex";

let query = {
  page: 1,
  size: 20
};

// 数据是否在加载中
const loading = ref(false);
// 数据是否全部加载完成
const isFinished = ref(false);
// 数据源
const pexelsList = ref([]);
const getPexlesData = async () => {
  console.log("load...");
  // 数据全部加载完成
  if (isFinished.value) {
    return;
  }
  // 完成第一次请求之后, 后续请求让page自增
  if (pexelsList.value.length) {
    query.page += 1;
  }

  // 触发请求
  const { list, total } = await getPexlesList(query);
  if (query.page === 1) {
    pexelsList.value = list;
  } else {
    pexelsList.value.push(...list);
  }
  // 判断诗句是否全部加载完成
  if (pexelsList.value.length === total) {
    isFinished.value = true;
  }

  // 修改loading, 表示一次请求完毕
  loading.value = false;
};

/**
 * 修改query, 重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelsList.value = [];
};

/**
 * 监听 currentCategory的变化
 */
const store = useStore();
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    });
  }
);

/**
 * 监听 searchText 变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    });
  }
);
</script>

<template>
  <div>
    <Infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexlesData"
    >
      <WaterFall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template #default="{ item, width }">
          <Item :data="item" :width="width" />
        </template>
      </WaterFall>
    </Infinite>
  </div>
</template>

<style lang="scss" scoped></style>
