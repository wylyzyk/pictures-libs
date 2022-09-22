<script setup>
import { computed, onMounted, ref, nextTick, watch, onUnmounted } from "vue";
import {
  getImageElements,
  getAllImage,
  onComplateImages,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from "./utils";

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要图片预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
});

// height of container = 最高列的高度
const containerHeight = ref(0);
// 记录每列高度的容器 key: 所在列, value: 列高
const columnHeightObj = ref({});
/**
 * 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {};
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0;
  }
};

// 容器实例
const containerTarget = ref(null);
// 容器总宽度 不包含padding margin border
const containerWidth = ref(0);
// 容器左边距 计算item的left
const containerLeft = ref(0);
/**
 * 计算容器总宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = window.getComputedStyle(
    containerTarget.value,
    null
  );
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft);
  // 容器宽度
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight);
};
// 列宽 = (容器宽 - 所有列间距宽) / 列
const columnWidth = ref(0);
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing;
});
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth();
  // 计算列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column;
};

onMounted(() => {
  // 计算列宽
  useColumnWidth();
});

// item 高度集合
let itemHeights = [];
/**
 * 监听图片加载完成
 */
const waitImgComplate = () => {
  itemHeights = [];
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName("m-waterfall-item")];
  // 获取到元素的 img 标签
  const imgElements = getImageElements(itemElements);
  // 获取所有img标签的图片
  const allImages = getAllImage(imgElements);
  // 等待图片加载完成
  onComplateImages(allImages).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight);
    });
    // 渲染位置
    useItemLocation();
  });
};

/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
  itemHeights = [];
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName("m-waterfall-item")];
  // 计算item高度
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight);
  });

  // 渲染位置
  useItemLocation();
};

/**
 * 渲染位置
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return;
    // 生成 _style属性
    item._style = {};
    // left
    item._style.left = getItemLeft();
    // top
    item._style.top = getItemTop();
    // 指定的列进行高度的自增
    increasingHeight(index);
  });

  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value);
};

/**
 * 在组建销毁的时候, 清除所有的_style
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style;
  });
});

/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value);
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  );
};

/**
 * 返回下一个的item的top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value);
};

/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value);
  // 使该列自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing;
};

/**
 * 触发计算
 */
watch(
  () => props.data,
  (val) => {
    nextTick(() => {
      // 第一次获取数据时, 构建高度记录容器
      const resetColumnHeight = val.every((item) => !item._style);
      if (resetColumnHeight) {
        // 构建
        useColumnHeightObj();
      }

      if (props.picturePreReading) {
        waitImgComplate();
      } else {
        useItemHeight();
      }
    });
  },
  { deep: true, immediate: true }
);

/**
 * 重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth();
    // 重置所有的定位数据
    props.data.forEach((item) => {
      item._style = null;
    });
  }, 150);
};

/**
 * 监听列数的变化
 */
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0;
    }
    reset();
  }
);
</script>

<template>
  <div
    ref="containerTarget"
    class="relative"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- // render data -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- loading -->
    <div v-else></div>
  </div>
</template>

<style lang="scss" scoped></style>
