<script setup>
import {} from "vue";
import Popover from "@/libs/popover/index.vue";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "@/constants";

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
</script>

<template>
  <Popover placement="bottom-left">
    <template #reference>
      <SvgIcon
        fillClass="fill-zinc-900"
        name="theme-light"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
      />
    </template>
    <div
      v-for="item in themeArr"
      :key="item.id"
      class="w-[140px] overflow-hidden"
    >
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <SvgIcon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        />
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </Popover>
</template>

<style lang="scss" scoped></style>
