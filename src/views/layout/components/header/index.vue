<script setup>
import {} from "vue";
import { useRouter } from "vue-router";
import HeaderSearch from "./headerSearch/index.vue";
import HeaderTheme from "./headerTheme.vue";
import HeaderMine from "./headerMine.vue";

const router = useRouter();
const onToHome = () => {
  router.push("/");
};
</script>

<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2 rounded-sm"
        src="https://avatars.githubusercontent.com/u/49738226?v=4"
        alt="wylyzyk"
        @click="onToHome"
      />
      <HeaderSearch />
      <HeaderTheme />
      <HeaderMine />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
