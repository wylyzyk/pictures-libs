<script setup>
import { ref, watch } from "vue";
import { getPexlesList } from "@/api/pexels";
import Item from "./item.vue";
import WaterFall from "@/libs/WaterFall/index.vue";
import { isMobileTerminal } from "@/utils/flexible.js";
import Infinite from "@/libs/Infinite/index.vue";
import { useStore } from "vuex";
import Pins from "@/views/pins/components/pins.vue";
import gsap from "gsap";

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

// 控制pins展示
const isVisiblePins = ref(false);
// 当前选中的pins属性
const currentPins = ref({});

/**
 * 进入 pins
 */
const onToPins = (item) => {
  console.log(item);
  // 修改浏览器的url
  history.pushState({}, null, `/pins/${item.id}`);
  isVisiblePins.value = true;

  currentPins.value = item;
};

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: "0 0",
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  });
};
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done
  });
};
const leave = (el) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY
  });
};
</script>

<template>
  <div>
    <Infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexlesData">
      <WaterFall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template #default="{ item, width }">
          <Item :data="item" :width="width" @click="onToPins" />
        </template>
      </WaterFall>
    </Infinite>

    <!-- 详情内容展示 -->
    <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <Pins v-if="isVisiblePins" :id="currentPins.id" />
    </Transition>
  </div>
</template>
