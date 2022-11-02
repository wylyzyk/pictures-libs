<script setup>
import {} from "vue";
import Pins from "./components/pins.vue";
</script>

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <Pins :id="$route.params?.id" />
  </div>
</template>
