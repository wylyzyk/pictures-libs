<script setup>
import {} from "vue";

defineEmits(["onItemClick"]);
</script>

<template>
  <div class="py-2 h-[75vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="({ id, name }, index) in $store.getters.categorys"
        :key="id"
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
        @click="$emit('onItemClick', index)"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
