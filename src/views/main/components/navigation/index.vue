<script setup>
import { ref } from "vue";
import { isMobileTerminal } from "@/utils/flexible";
import { getCategory } from "@/api/categary";
import Mobile from "./mobile/index.vue";
import Pc from "./pc/index.vue";

const categorys = ref([]);
const getCategoryData = async () => {
  const res = await getCategory();
  categorys.value = res.categorys;
};
getCategoryData();
</script>

<template>
  <div>
    <Mobile v-if="isMobileTerminal" :data="categorys" />
    <Pc v-else />
  </div>
</template>

<style lang="scss" scoped></style>
