<script setup>
import {} from "vue";
import Popover from "@/libs/popover/index.vue";
import SvgIcon from "../../../../libs/svgIcon/index.vue";

const menuArr = [
  {
    id: 0,
    title: "个人资料",
    icon: "profile",
    path: "/profile"
  },
  {
    id: 1,
    title: "升级 VIP",
    icon: "vip-profile",
    path: "/member"
  },
  {
    id: 2,
    title: "退出登录",
    icon: "logout"
  }
];
</script>

<template>
  <div>
    <Popover class="guide-mine flex items-center" placement="bottom-left">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <img
            v-lazy
            class="w-3 h-3 rounded-sm"
            src="https://avatars.githubusercontent.com/u/49738226?v=4"
            alt="wylyzyk"
          />
          <SvgIcon
            name="down-arrow"
            class="h-1.5 w-1.5 ml-0.5"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          />
          <SvgIcon
            name="vip"
            class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          />
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
        >
          <SvgIcon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          />
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.title
          }}</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<style lang="scss" scoped></style>
