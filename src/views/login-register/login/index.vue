<script setup>
console.log("login");
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
      <form>
        <!-- username -->
        <input
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
        />
        <!-- password -->
        <input
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="password"
          placeholder="密码"
          autocomplete="on"
        />
        <!-- goto button -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <!-- login button -->
        <Button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">登录</Button>
      </form>

      <!-- third login -->
      <div class="flex justify-around mt-4">
        <SvgIcon class="w-4 cursor-pointer" name="qq" />
        <SvgIcon class="w-4 cursor-pointer" name="wexin" />
      </div>
    </div>
  </div>
</template>
