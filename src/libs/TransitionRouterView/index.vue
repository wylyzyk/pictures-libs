<script>
// 无
const NONE = "none";
// 进入
const ROUTER_TYPE_PUSH = "push";
// 退出
const ROUTER_TYPE_BACK = "back";

const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_BACK, ROUTER_TYPE_PUSH];
</script>

<script setup>
defineProps({
  // 路由跳转类型, 进入组件, 退出组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val);
      if (!result) {
        throw Error(`router type is must ${ROUTER_TYPE_ENUM.join("、")}`);
      }
    }
  },
  // 首页的组件名称
  mainComponentName: { type: String, required: true }
});
</script>

<template>
  <RouterView #default="{ Component }">
    <Transition :name-="transitionName">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
// push页面时, 新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时: 老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时: 新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes push-out {
  0% {
  }
  100% {
  }
}

// 后退页面时: 即时展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时, 后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时: 即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
  }
}
</style>
