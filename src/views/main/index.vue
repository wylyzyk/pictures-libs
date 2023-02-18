<script setup>
import {} from "vue";
import Navigation from "./components/navigation/index.vue";
import List from "./components/list/index.vue";
import { isMobileTerminal } from "@/utils/flexible";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const onMineClick = () => {
  store.commit("app/changeRouterType", "push");
  if (store.getters.token) {
    router.push("/profile");
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List />
    </div>

    <!-- mobile tabbar -->
    <TriggerMenu v-if="isMobileTerminal" class="fixed bottom-6 left-0 right-0 m-auto w-[220px]">
      <TriggerMenuItem icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">首页</TriggerMenuItem>
      <TriggerMenuItem
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVIPClick"
      >
        VIP
      </TriggerMenuItem>
      <TriggerMenuItem
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMineClick"
      >
        {{ $store.getters.token ? "我的" : "去登录" }}
      </TriggerMenuItem>
    </TriggerMenu>
  </div>
</template>
