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
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  // 路由跳转类型, 进入组件, 退出组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val);
      if (!result) {
        throw Error(`router type is must ${ROUTER_TYPE_ENUM.join("、")}`);
      }
      return result;
    }
  },
  // 首页的组件名称
  mainComponentName: { type: String, required: true }
});

// 监听router的前置守卫
const router = useRouter();
const transitionName = ref("");
router.beforeEach((to, from) => {
  // 定义当前动画的名称
  transitionName.value = props.routerType;
});

const isAnimation = ref(false);
const onBeforeEnter = () => {
  isAnimation.value = true;
};
const onAfterLeave = () => {
  isAnimation.value = false;
};
</script>

<template>
  <RouterView #default="{ Component }">
    <Transition :name="transitionName" @beforeEnter="onBeforeEnter" @afterLeave="onAfterLeave">
      <KeepAlive>
        <Component
          :is="Component"
          :key="$route.fullPath"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
// push页面时, 新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}
// push页面时: 老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
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
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时: 即时展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.5s;
}
// 后退页面时, 后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.5s;
}
// 后退页面时: 即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时: 后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
