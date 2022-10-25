<script setup>
import { computed } from "vue";
import Popover from "@/libs/popover/index.vue";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "@/constants";
import { useStore } from "vuex";

const store = useStore();

const themeArr = [
  {
    id: "0",
    type: THEME_LIGHT,
    icon: "theme-light",
    name: "极简白"
  },
  {
    id: "1",
    type: THEME_DARK,
    icon: "theme-dark",
    name: "极夜黑"
  },
  {
    id: "2",
    type: THEME_SYSTEM,
    icon: "theme-system",
    name: "跟随系统"
  }
];

const onItemClick = (themeItem) => {
  store.commit("theme/changeThemeType", themeItem.type);
};

const svgIconName = computed(() => {
  const theme = themeArr.find((item) => item.type === store.getters.themeType);
  return theme?.icon;
});
</script>

<template>
  <Popover placement="bottom-left">
    <template #reference>
      <SvgIcon
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
      />
    </template>
    <div
      v-for="item in themeArr"
      :key="item.id"
      class="w-[140px] overflow-hidden"
      @click="onItemClick(item)"
    >
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <SvgIcon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </Popover>
</template>

<style lang="scss" scoped></style>
