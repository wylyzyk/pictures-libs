<script setup>
import { isMobileTerminal } from "@/utils/flexible";
import MobileNavigation from "./mobile/index.vue";
import PCNavigation from "./pc/index.vue";
import { useStore } from "vuex";

const store = useStore();
// 触发category获取数据
store.dispatch("category/useCategoryData");
</script>

<template>
  <div>
    <MobileNavigation v-if="isMobileTerminal" />
    <PCNavigation v-else />
    <h2>main</h2>
  </div>
</template>

<style lang="scss" scoped></style>
