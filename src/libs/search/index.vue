<script>
// 双向绑定
const EMIT_UPDATE_MODELVALUE = "update:modelValue";
// 搜索
const EMIT_SEARCH = "search";
// 删除所有文本
const EMIT_CLEAR = "clear";
// 输入事件
const EMIT_INPUT = "input";
// 获取焦点
const EMIT_FOCUS = "focus";
// 失去焦点
const EMIT_BLUR = "blur";
</script>
<script setup>
import { ref, watch } from "vue";
import { onClickOutside, useVModel } from "@vueuse/core";
import Button from "../button/index.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_BLUR,
  EMIT_CLEAR,
  EMIT_FOCUS,
  EMIT_INPUT
]);

const inputValue = useVModel(props);
// 监听用户输入行为
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val);
});

// 删除文本
const onClearClick = () => {
  inputValue.value = "";
  emits(EMIT_CLEAR, "");
};
// 搜索
const onSearchHandler = () => {
  emits(EMIT_SEARCH, inputValue.value);
};

// input是否获取到焦点
const isFocus = ref(false);
const containerTarget = ref(null);

const onFocusHandler = () => {
  isFocus.value = true;
  emits(EMIT_FOCUS);
};

// 失去焦点
const onBlurHandler = () => {
  emits(EMIT_BLUR);
};

onClickOutside(containerTarget, () => {
  isFocus.value = false;
});
</script>

<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- icon -->
      <SvgIcon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      />
      <!-- input -->
      <input
        v-model="inputValue"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 text-sm tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 focus:border-red-300 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        type="text"
        placeholder="请输入关键字"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- delete button -->
      <SvgIcon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        @click="onClearClick"
      />
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: search button -->
      <Button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full duration-500 group-hover:opacity-100"
        icon="search"
        color="#fff"
        @click="onSearchHandler"
      />
    </div>
    <!-- pull section -->
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl dark:text-zinc-300"
      >
        <slot name="dropdown" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
