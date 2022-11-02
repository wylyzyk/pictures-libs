<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/libs/Navbar/index.vue";
import { getPexlesFromId } from "@/api/pexels";
import { isMobileTerminal } from "@/utils/flexible";

const props = defineProps({
  id: { type: String, required: true }
});

const pexelData = ref([]);
const getPexelsData = async () => {
  const data = await getPexlesFromId(props.id);
  pexelData.value = data;
};
getPexelsData();

const router = useRouter();
const onPop = () => {
  router.back();
};
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-auto xl:p-2"
  >
    <!-- mobile -->
    <Navbar v-if="isMobileTerminal" sticky>
      {{ pexelData.title }}
      <template #right>
        <SvgIcon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </template>
    </Navbar>
    <!-- pc -->
    <SvgIcon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    />

    <!-- content -->
    <div v-if="pexelData.title" class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg" :src="pexelData.photo" alt="" />
      <div class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-tb-lg xl:p-3">
        <!-- 收藏, 分享 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <SvgIcon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover-zinc-800 duration-200 rounded"
          />
          <Button type="info" icon="heart" fillClass="fill-zinc-900 dark:fill-zinc-200" />
        </div>
        <!-- title -->
        <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ pexelData.title }}
        </p>
        <!-- author -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="pexelData.avatar" alt="" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ pexelData.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
