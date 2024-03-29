<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from "vee-validate";
import { validatePassword, validateUsername } from "../validate";
import SliderCaptcha from "./SliderCaptcha.vue";
import { LOGIN_TYPE_USERNAME } from "@/constants";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const isSliderCaptchaVisible = ref(false);

// 表单校验 通过 后触发
const onSubmit = () => {
  isSliderCaptchaVisible.value = true;
};

// 行为验证通过
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false;
  // login
  handleLogin();
};

// 登录行为
const loading = ref(false);
const loginForm = ref({
  username: "",
  password: ""
});
const handleLogin = () => {
  loading.value = true;
  // 执行登录操作
  try {
    store.dispatch("user/login", {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    });
  } catch (err) {
  } finally {
    loading.value = false;
  }
  // 跳转到首页
  router.push("/");
};
</script>

<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!--pc -->
    <div class="hidden pt-5 h-8 xl:block">
      <!-- <img class="m-auto" src="https://avatars.githubusercontent.com/u/49738226?v=4" alt="" /> -->
    </div>
    <!--mobile-->
    <div class="h-[111px] xl:hidden">
      <!-- <img class="dark:hidden" src="https://res.lgdsunday.club/login-bg.png" alt="" />
      <img
        class="h-5 absolute top-[5%] left-[50%] translate-x-[50%]"
        src="https://avatars.githubusercontent.com/u/49738226?v=4"
        alt=""
      /> -->
    </div>
    <!--form area-->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3 class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">账号登录</h3>
      <!--form-->
      <VeeForm @submit="onSubmit">
        <!-- username -->
        <VeeField
          v-model="loginForm.username"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
        />
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="username" />
        <!-- password -->
        <VeeField
          v-model="loginForm.password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
        />
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="password" />
        <!-- goto button -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <!-- login button -->
        <Button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800" :isActiveAnim="false" :loading="loading"
          >登录</Button
        >
      </VeeForm>

      <!-- third login -->
      <div class="flex justify-around mt-4">
        <SvgIcon class="w-4 cursor-pointer" name="qq" />
        <SvgIcon class="w-4 cursor-pointer" name="wexin" />
      </div>
    </div>

    <SliderCaptcha v-if="isSliderCaptchaVisible" @close="isSliderCaptchaVisible = false" @success="onCaptchaSuccess" />
  </div>
</template>
