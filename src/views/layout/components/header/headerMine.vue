<script setup>
import {} from "vue";
import Popover from "@/libs/popover/index.vue";
import SvgIcon from "../../../../libs/svgIcon/index.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { confirm } from "@/libs";

const router = useRouter();
const store = useStore();

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

/**
 * login
 */
const onToLogin = () => {
  // 移动端下跳转的类型
  store.commit("app/changeRouterType", "push");
  router.push("/login");
};

/**
 *
 */
const onItemClick = (item) => {
  if (item.id === 2) {
    // 退出登录
    confirm("确定退出登录吗").then(() => {
      store.dispatch("user/logout");
    });
    return;
  }
  store.commit("app/changeRouterType", "push");
  router.push(item.path);
};
</script>

<template>
  <div>
    <Popover class="flex items-center" placement="bottom-left">
      <template #reference>
        <div
          v-if="$store.getters.token"
          class="guide-mine relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <img
            v-lazy
            class="w-3 h-3 rounded-sm"
            src="https://avatars.githubusercontent.com/u/49738226?v=4"
            alt="wylyzyk"
          />
          <SvgIcon name="down-arrow" class="h-1.5 w-1.5 ml-0.5" fillClass="fill-zinc-900 dark:fill-zinc-300" />
          <SvgIcon
            v-if="$store.getters.userInfo?.vipLevel"
            name="vip"
            class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          />
        </div>
        <div v-else>
          <Button class="guide-mine" icon="profile" iconColor="#fff" @click="onToLogin"></Button>
        </div>
      </template>

      <!--气泡-->
      <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
        <div
          v-for="item in menuArr"
          :key="item.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onItemClick(item)"
        >
          <SvgIcon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300" />
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.title }}</span>
        </div>
      </div>
    </Popover>
  </div>
</template>
