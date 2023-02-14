<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { isMobileTerminal } from "@/utils/flexible";
import { confirm } from "@/libs";
import { puProfile } from "@/api/sys";
import { message } from "@/libs/Message";

const store = useStore();
const router = useRouter();

const onNavbarLeftClick = () => {
  router.back();
};

const onLogoutClick = () => {
  confirm("确定要退出登录嘛").then(() => {
    store.dispatch("user/logout");
  });
};

const inputFileTarget = ref(null);
const onAvatarClick = () => {
  inputFileTarget.value.click();
};

const onSelectImgHandler = () => {};

const changeStoreUserInfo = (key, value) => {
  console.log(value);
  store.commit("user/setUserInfo", { ...store.getters.userInfo, [key]: value });
};

const loading = ref(false);
const onChangedProfile = async () => {
  loading.value = true;

  await puProfile(store.getters.userInfo);
  message("success", "用户信息修改成功");

  loading.value = false;
};
</script>

<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:broder-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- mobile -->
      <Navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">个人资料</Navbar>
      <!-- pc -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:text-center">
        <!-- avatar -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span class="w-8 inline-block mb-2 font-blod text-sm dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <!-- avatar image -->
            <img class="rounded-full w-full h-full xl:inline-block" :src="$store.getters.userInfo.avatar" alt="" />
            <!-- hover -->
            <div class="absolute top-0 rounded-full w-full h-full duration-300 bg-black/40 hidden xl:group-hover:block">
              <SvgIcon name="change-header-image" class="w-2 h-2 m-auto mt-2" />
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">点击更换头像</div>
            </div>
          </div>
          <!-- hidden area -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持jpg, png, jpeg, gif 格式大小1M以内的图片
          </p>
        </div>
        <!-- input info -->
        <!-- username -->
        <div class="py-1 xl:flex xl:item-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
          <!-- modelValue -->
          <!-- update:modelValue -->
          <CustomInput
            :modelValue="$store.getters.userInfo.nickname"
            class="w-full"
            max="20"
            @update:modelValue="changeStoreUserInfo('nickname', $event)"
          />
        </div>
        <!-- job -->
        <div class="py-1 xl:flex xl:item-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <CustomInput
            :modelValue="$store.getters.userInfo.title"
            class="w-full"
            @update:modelValue="changeStoreUserInfo('title', $event)"
          />
        </div>
        <!-- company -->
        <div class="py-1 xl:flex xl:item-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <CustomInput
            :modelValue="$store.getters.userInfo.company"
            class="w-full"
            @update:modelValue="changeStoreUserInfo('company', $event)"
          />
        </div>
        <!-- home page -->
        <div class="py-1 xl:flex xl:item-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <CustomInput
            :modelValue="$store.getters.userInfo.homePage"
            class="w-full"
            @update:modelValue="changeStoreUserInfo('homePage', $event)"
          />
        </div>
        <!-- user introduce -->
        <div class="py-1 xl:flex xl:item-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <CustomInput
            :modelValue="$store.getters.userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
            @update:modelValue="changeStoreUserInfo('introduction', $event)"
          />
        </div>

        <!-- save modify -->
        <Button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangedProfile"
        >
          保存修改
        </Button>

        <!-- logout button -->
        <Button
          v-if="isMobileTerminal"
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </Button>
      </div>
    </div>
  </div>
</template>
