<script setup>
import {} from "vue";
import Header from "./components/header/index.vue";
import Main from "./components/main.vue";
import Floating from "./components/floating.vue";
</script>

<template>
  <div class="h-screen">
    <Header class="h-header" />
    <Main class="h-main" />
    <Floating />
  </div>
</template>

<style lang="scss" scoped></style>
