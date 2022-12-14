<script setup>
import { computed, ref } from "vue";
import Button from "@/libs/Button/index.vue";
import { randomRGB } from "@/utils/color";
import { saveAs } from "file-saver";
import { useElementBounding, useFullscreen } from "@vueuse/core";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
});

const emits = defineEmits(["click"]);

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  saveAs(props.data?.photoDownLink);
};

/**
 * 生成全屏
 */
const imgTarget = ref(null);
const { enter: onImgFullScreen } = useFullscreen(imgTarget);

/**
 * pins跳转记录
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgTarget);
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2, 10),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2, 10)
  };
});

/**
 * 进入详情
 */
const onToPinsClick = () => {
  emits("click", {
    id: props.data.id,
    location: imgContainerCenter.value
  });
};
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ backgroundColor: randomRGB() }"
      @click="onToPinsClick"
    >
      <!-- image -->
      <img
        ref="imgTarget"
        v-lazy
        class="w-full rounded bg-transparent"
        :src="data.photo"
        alt="image"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- mask -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <Button class="absolute top-1.5 left-1.5">分享</Button>
        <Button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        >
          喜欢
        </Button>
        <Button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        >
          下载
        </Button>
        <Button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        >
          全屏
        </Button>
      </div>
    </div>
    <!-- title -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- author info -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="author" />
      <span class="text-sm text-zinc-300 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>
