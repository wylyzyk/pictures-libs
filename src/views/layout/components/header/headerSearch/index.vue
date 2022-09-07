<script setup>
import { ref } from "vue";
import Search from "@/libs/search/index.vue";

const inputValue = ref("");
</script>

<template>
  <div class="w-full">
    <Search v-model="inputValue">
      <template #dropdown>dropdown</template>
    </Search>
  </div>
</template>

<style lang="scss" scoped></style>
