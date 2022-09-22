<script setup>
import { ref } from "vue";
import { getPexlesList } from "@/api/pexels";
import Item from "./item.vue";
import WaterFall from "@/libs/WaterFall/index.vue";
import { isMobileTerminal } from "@/utils/flexible.js";

const query = {
  page: 1,
  size: 20
};

const pexelsList = ref([]);
const getPexlesData = async () => {
  const { list } = await getPexlesList(query);
  pexelsList.value = list;
};
getPexlesData();
</script>

<template>
  <div>
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
  </div>
</template>

<style lang="scss" scoped></style>
