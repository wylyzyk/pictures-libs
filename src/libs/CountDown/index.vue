<script>
// 倒计时结束
const EMITS_FINISH = "finish";
// 倒计时改变
const EMITS_CHANGE = "change";
// 倒计时时间间隔
const INTERVAL_COUNT = 1000;
</script>

<script setup>
import { computed, onUnmounted, ref, watchEffect } from "vue";
import dayjs from "./utils";

const props = defineProps({
  time: { type: Number, required: true },
  format: { type: String, default: "HH:mm:ss" }
});

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE]);

// 倒计时时长
const duration = ref(0);

/**
 * 开始倒计时
 */
let interval = null;
const start = () => {
  close();
  interval = setInterval(() => {
    durationFn();
  }, INTERVAL_COUNT);
};

/**
 * 倒计时的执行行为
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT;
  emits(EMITS_CHANGE);
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0;
    emits(EMITS_FINISH);
    close();
  }
};

/**
 * 倒计时结束
 */
const close = () => {
  if (interval) {
    clearInterval(interval);
  }
};

/**
 * 开始倒计时
 */
watchEffect(() => {
  duration.value = props.time;
  start();
});

/**
 * 组件销毁, 清楚倒计时J
 */
onUnmounted(() => {
  close();
});

/**
 * 显示的时间格式
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format);
});
</script>

<template>
  <div class="text-sm">
    <slot>
      <p>{{ showTime }}</p>
    </slot>
  </div>
</template>
