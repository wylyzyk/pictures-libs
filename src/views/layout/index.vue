<script setup>
import {} from "vue";
import BaseHeader from "./components/header/index.vue";
import BaseMain from "./components/main.vue";
import Floating from "./components/floating.vue";
</script>

<template>
  <div class="h-screen">
    <BaseHeader class="h-header" />
    <BaseMain class="h-main" />
    <Floating />
  </div>
</template>

<style lang="scss" scoped></style>
