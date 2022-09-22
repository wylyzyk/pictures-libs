<script setup>
import {} from "vue";
import BaseHeader from "./components/header/index.vue";
import BaseMain from "./components/main.vue";
import Floating from "./components/floating.vue";
</script>

<template>
  <div class="h-screen">
    <BaseHeader class="h-header" />
    <div class="h-main">
      <BaseMain />
    </div>
    <Floating />
  </div>
</template>

<style lang="scss" scoped></style>
