<script>
const EMITS_CLOSE = "close";

// pc 配置对象
const pcOptions = {
  // 纵横比 1:1
  aspectRatio: 1
};

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布, 裁剪框不动
  dragMode: "move",
  // 裁剪纵横比1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整大小
  cropBoxResizable: false
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { isMobileTerminal } from "@/utils/flexible";

defineProps({
  blob: { type: String, required: true }
});

const emits = defineEmits([EMITS_CLOSE]);

let cropper = null;
const loading = ref(false);
const onConfirmClick = () => {
  loading.value = true;
  // 拿到裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    console.log(URL.createObjectURL(blob));
  });
};

const close = () => {
  console.log('close')
  emits(EMITS_CLOSE);
};

/**
 * 图片裁剪
 */
const imageTarget = ref(null);

onMounted(() => {
  cropper = new Cropper(imageTarget.value, isMobileTerminal.value ? mobileOptions : pcOptions);
});
</script>

<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <SvgIcon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    />
    <img ref="imageTarget" :src="blob" alt="" />

    <Button class="mt-4 w-[80%] xl:1/2" @click="onConfirmClick">确定</Button>
  </div>
</template>
