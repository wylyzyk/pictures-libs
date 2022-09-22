/**
 * 从 itemElement 中抽离出所有的 imagElements
 */
export const getImageElements = (itemElements) => {
  const imgElements = [];
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName("img"));
  });
  return imgElements;
};

/**
 * 生成所有的图片链接
 */
export const getAllImage = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src;
  });
};

/**
 * 监听图片数组加载完成
 */
export const onComplateImages = (allImages) => {
  // promise 集合
  const promiseAll = [];
  // 循环imgs 构建promiseall
  allImages.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理img的加载情况
      const imageObj = new Image();
      imageObj.src = img;
      imageObj.onload = () => {
        resolve({
          img,
          index
        });
      };
    });
  });
  return Promise.all(promiseAll);
};

/**
 * 返回列高对象中最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.min(...columnHeightArr);
};

/**
 * 返回列高对象中最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.max(...columnHeightArr);
};

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj);
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight;
  });
};
