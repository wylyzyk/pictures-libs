<script setup>
// This starter template is using Vue 3 <script setup> SFCs

import { watch } from "vue";
import { useStore } from "vuex";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const store = useStore();
watch(
  () => store.getters.userInfo,
  (val) => {
    console.log(`user info changed ${val}`);
  }
);
</script>

<template>
  <!-- top level router export -->
  <div class="h-screen w-screen fixed top-0 left-0">
    <RouterView />
  </div>
</template>
